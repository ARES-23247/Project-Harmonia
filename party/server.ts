import type * as Party from "partykit/server";
import { onConnect } from "y-partykit/server";

export default class Server implements Party.Server {
  constructor(readonly room: Party.Room) {}

  onConnect(conn: Party.Connection, ctx: Party.ConnectionContext) {
    // This delegates all Yjs document synchronization to the y-partykit package.
    // It automatically handles syncing state, persisting it (if configured),
    // and managing the awareness protocol (remote cursors).
    onConnect(conn, this.room, {
      persist: true // Keeps the Y.Doc in memory/storage so late joiners get the state
    });
  }
}
