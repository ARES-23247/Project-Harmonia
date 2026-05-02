import * as Y from "yjs";
import YPartyKitProvider from "y-partykit/provider";
import { MonacoBinding } from "./y-monaco";

let provider: YPartyKitProvider | null = null;
let doc: Y.Doc | null = null;

export function initCollaboration(editor: any, roomId: string = "harmonia-global") {
  if (provider) {
    provider.disconnect();
  }

  doc = new Y.Doc();
  const type = doc.getText("monaco");

  // Connect to the PartyKit server (defaults to localhost:1999 in dev)
  provider = new YPartyKitProvider("localhost:1999", roomId, doc, {
    connect: true
  });

  // Bind the Yjs document to the Monaco editor
  const binding = new MonacoBinding(type, editor.getModel(), new Set([editor]), provider.awareness);

  return { provider, doc, binding };
}
