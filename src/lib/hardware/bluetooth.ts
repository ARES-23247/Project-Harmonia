import type { ConnectionProvider } from "./connectionManager";
import { PYBRICKS_SHIM } from "./pybricksShim";

const NUS_SERVICE_UUID = "c5f50001-8280-46da-89f4-6d8051e4aeef";
const NUS_RX_CHAR_UUID = "c5f50002-8280-46da-89f4-6d8051e4aeef";
const NUS_TX_CHAR_UUID = "c5f50003-8280-46da-89f4-6d8051e4aeef";

export class BluetoothProvider implements ConnectionProvider {
  private device: BluetoothDevice | null = null;
  private rxCharacteristic: BluetoothRemoteGATTCharacteristic | null = null;
  private onStdoutCb: ((data: string) => void) | null = null;

  async connect(onStdout: (data: string) => void): Promise<boolean> {
    this.onStdoutCb = onStdout;
    try {
      this.device = await navigator.bluetooth.requestDevice({
        filters: [{ services: [NUS_SERVICE_UUID] }],
        optionalServices: [NUS_SERVICE_UUID]
      });
      
      onStdout("Connecting to " + this.device.name + "...\n");
      
      const server = await this.device.gatt?.connect();
      if (!server) throw new Error("Could not connect to GATT Server");

      const service = await server.getPrimaryService(NUS_SERVICE_UUID);
      this.rxCharacteristic = await service.getCharacteristic(NUS_RX_CHAR_UUID);
      const txCharacteristic = await service.getCharacteristic(NUS_TX_CHAR_UUID);

      await txCharacteristic.startNotifications();
      txCharacteristic.addEventListener('characteristicvaluechanged', (event: any) => {
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
      this.device.gatt.disconnect();
    }
    this.device = null;
    this.rxCharacteristic = null;
  }

  async executePython(code: string): Promise<void> {
    if (!this.rxCharacteristic) {
      this.onStdoutCb?.("Error: Not connected to a device.\n");
      return;
    }

    const fullCode = PYBRICKS_SHIM + code;
    this.onStdoutCb?.("Downloading script to Pybricks Hub...\n");

    try {
      // Enter raw REPL mode (Ctrl-A)
      await this.writeChunk(new Uint8Array([1]));
      
      const encoder = new TextEncoder();
      const codeBytes = encoder.encode(fullCode);
      
      // Pybricks requires writing in chunks of MTU size (usually 20 bytes for older BLE, let's use 64 or 100)
      // Nordic UART usually handles up to 20-244 depending on MTU negotiation.
      // Let's use 100 to be safe.
      const CHUNK_SIZE = 100;
      for (let i = 0; i < codeBytes.length; i += CHUNK_SIZE) {
        const chunk = codeBytes.slice(i, i + CHUNK_SIZE);
        await this.writeChunk(chunk);
        // Small delay to prevent overwhelming the BLE stack
        await new Promise(r => setTimeout(r, 10));
      }
      
      // Exit raw REPL and run (Ctrl-D)
      await this.writeChunk(new Uint8Array([4]));
      this.onStdoutCb?.("Download complete. Running...\n");
    } catch (e: any) {
      this.onStdoutCb?.("Error executing code: " + e.message + "\n");
    }
  }

  private async writeChunk(data: Uint8Array) {
    if (this.rxCharacteristic) {
      await this.rxCharacteristic.writeValueWithoutResponse(data.buffer as ArrayBuffer);
    }
  }
}
