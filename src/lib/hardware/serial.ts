import type { ConnectionProvider } from "./connectionManager";

export class SerialProvider implements ConnectionProvider {
  type = "serial" as const;
  private port: SerialPort | null = null;

  async connect(onStdout: (data: string) => void): Promise<boolean> {
    try {
      this.port = await navigator.serial.requestPort();
      await this.port.open({ baudRate: 115200 });
      
      onStdout("Serial Port Selected and Opened.\n");
      onStdout("Connected!\n");
      return true;
    } catch (e: unknown) {
      console.error(e);
      const msg = e instanceof Error ? e.message : String(e);
      onStdout("Serial Connection Failed: " + msg + "\n");
      return false;
    }
  }

  async disconnect(): Promise<void> {
    if (this.port) {
      await this.port.close();
    }
    this.port = null;
  }

  async executePython(code: string): Promise<void> {
    console.log("Executing over Serial:", code);
    // Real implementation will stream string over Serial stream
  }
}
