import type * as Party from "partykit/server";
import { onConnect } from "y-partykit";

export default class YjsServer implements Party.Server {
  constructor(public party: Party.Party) {}

  onConnect(conn: Party.Connection, ctx: Party.ConnectionContext) {
    // This connects the Yjs instance to the PartyKit room
    onConnect(conn, this.party, {
      persist: true, // You can configure persistence here (e.g., to D1 or KV) later
    });
  }
}
