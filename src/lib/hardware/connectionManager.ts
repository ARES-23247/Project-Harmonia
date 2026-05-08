export interface ConnectionProvider {
  type: "bluetooth" | "serial" | "simulation";
  connect: (onStdout: (data: string) => void) => Promise<boolean>;
  disconnect: () => Promise<void>;
  executePython: (code: string) => Promise<void>;
}

export let activeConnection: ConnectionProvider | null = null;

export function setActiveConnection(connection: ConnectionProvider | null) {
  activeConnection = connection;
}
