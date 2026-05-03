import type { ConnectionProvider } from "./connectionManager";
import { PYBRICKS_SHIM } from "./pybricksShim";

// Nordic UART Service (NUS) for terminal I/O
const NUS_SERVICE_UUID = "6e400001-b5a3-f393-e0a9-e50e24dcca9e";
const NUS_RX_CHAR_UUID = "6e400002-b5a3-f393-e0a9-e50e24dcca9e";
const NUS_TX_CHAR_UUID = "6e400003-b5a3-f393-e0a9-e50e24dcca9e";

// Pybricks Proprietary Service for Command/Event
const PYBRICKS_SERVICE_UUID = "c5f50001-8280-46da-89f4-6d8051e4aeef";
const PYBRICKS_CMD_CHAR_UUID = "c5f50002-8280-46da-89f4-6d8051e4aeef";

export class BluetoothProvider implements ConnectionProvider {
  private device: BluetoothDevice | null = null;
  private nusRxCharacteristic: BluetoothRemoteGATTCharacteristic | null = null;
  private pybricksCmdCharacteristic: BluetoothRemoteGATTCharacteristic | null = null;
  private onStdoutCb: ((data: string) => void) | null = null;

  async connect(onStdout: (data: string) => void): Promise<boolean> {
    this.onStdoutCb = onStdout;
    try {
      this.device = await navigator.bluetooth.requestDevice({
        filters: [{ services: [PYBRICKS_SERVICE_UUID] }],
        optionalServices: [NUS_SERVICE_UUID]
      });
      
      onStdout("Connecting to " + this.device.name + "...\n");
      
      const server = await this.device.gatt?.connect();
      if (!server) throw new Error("Could not connect to GATT Server");

      // 1. Setup Pybricks Command Service
      const pybricksService = await server.getPrimaryService(PYBRICKS_SERVICE_UUID);
      this.pybricksCmdCharacteristic = await pybricksService.getCharacteristic(PYBRICKS_CMD_CHAR_UUID);
      
      await this.pybricksCmdCharacteristic.startNotifications();
      this.pybricksCmdCharacteristic.addEventListener('characteristicvaluechanged', (event: any) => {
        const view = new DataView(event.target.value.buffer);
        // Pybricks Event Types: 0x00 is Status Report
        if (view.getUint8(0) === 0x00) {
           // const flags = view.getUint32(1, true); // Little endian
           // Bit 1 is user program running
           // We could surface this state to the UI in the future.
        }
      });

      // 2. Setup Nordic UART Service for stdout/stdin
      const nusService = await server.getPrimaryService(NUS_SERVICE_UUID);
      this.nusRxCharacteristic = await nusService.getCharacteristic(NUS_RX_CHAR_UUID);
      const nusTxCharacteristic = await nusService.getCharacteristic(NUS_TX_CHAR_UUID);

      await nusTxCharacteristic.startNotifications();
      nusTxCharacteristic.addEventListener('characteristicvaluechanged', (event: any) => {
        const value = new TextDecoder().decode(event.target.value);
        this.onStdoutCb?.(value);
      });

      onStdout("Connected successfully!\n");
      return true;
    } catch (e: any) {
      console.error(e);
      onStdout("Bluetooth Connection Failed: " + e.message + "\n");
      return false;
    }
  }

  async disconnect(): Promise<void> {
    if (this.device?.gatt?.connected) {
      // Send Stop User Program command (0x00) before disconnecting
      if (this.pybricksCmdCharacteristic) {
        try {
          await this.pybricksCmdCharacteristic.writeValueWithoutResponse(new Uint8Array([0x00]));
        } catch (e) { /* ignore */ }
      }
      this.device.gatt.disconnect();
    }
    this.device = null;
    this.nusRxCharacteristic = null;
    this.pybricksCmdCharacteristic = null;
  }

  async executePython(code: string): Promise<void> {
    if (!this.nusRxCharacteristic || !this.pybricksCmdCharacteristic) {
      this.onStdoutCb?.("Error: Not fully connected to Pybricks device.\n");
      return;
    }

    const fullCode = PYBRICKS_SHIM + code;
    this.onStdoutCb?.("Stopping any running programs...\n");

    try {
      // 1. Stop User Program (0x00)
      await this.pybricksCmdCharacteristic.writeValueWithoutResponse(new Uint8Array([0x00]));
      await new Promise(r => setTimeout(r, 500)); // Wait for stop to process

      // 2. Start User Program execution via NUS REPL
      // Enter raw REPL mode (Ctrl-A)
      await this.writeNusChunk(new Uint8Array([1]));
      
      const encoder = new TextEncoder();
      const codeBytes = encoder.encode(fullCode);
      
      const CHUNK_SIZE = 100;
      for (let i = 0; i < codeBytes.length; i += CHUNK_SIZE) {
        const chunk = codeBytes.slice(i, i + CHUNK_SIZE);
        await this.writeNusChunk(chunk);
        await new Promise(r => setTimeout(r, 10)); // Chunking delay
      }
      
      // Exit raw REPL and run (Ctrl-D)
      await this.writeNusChunk(new Uint8Array([4]));
      this.onStdoutCb?.("Download complete. Running...\n");
    } catch (e: any) {
      this.onStdoutCb?.("Error executing code: " + e.message + "\n");
    }
  }

  private async writeNusChunk(data: Uint8Array) {
    if (this.nusRxCharacteristic) {
      await this.nusRxCharacteristic.writeValueWithoutResponse(data.buffer as ArrayBuffer);
    }
  }
}
