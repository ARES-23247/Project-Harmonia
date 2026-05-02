import type { ConnectionProvider } from "./connectionManager";

export class BluetoothProvider implements ConnectionProvider {
  private device: BluetoothDevice | null = null;

  async connect(onStdout: (data: string) => void): Promise<boolean> {
    try {
      this.device = await navigator.bluetooth.requestDevice({
        acceptAllDevices: true,
        optionalServices: ['generic_access'] // Will map to Pybricks/XRP specifically later
      });
      
      onStdout("Bluetooth Device Selected: " + this.device.name + "\n");
      onStdout("Connecting...\n");
      
      // Simulate connection logic for MVP
      await new Promise(r => setTimeout(r, 1000));
      onStdout("Connected!\n");
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
  }

  async executePython(code: string): Promise<void> {
    console.log("Executing over Bluetooth:", code);
    // Real implementation will stream string over BLE characteristic
  }
}
