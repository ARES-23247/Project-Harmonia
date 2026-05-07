import { useEffect, useState } from 'react';
import * as Y from 'yjs';
import YPartyKitProvider from 'y-partykit/provider';

interface UseCollaborationProps {
  roomId: string;
}

export function useCollaboration({ roomId }: UseCollaborationProps) {
  const [doc, setDoc] = useState<Y.Doc | null>(null);
  const [provider, setProvider] = useState<YPartyKitProvider | null>(null);
  const [connected, setConnected] = useState(false);

  useEffect(() => {
    const ydoc = new Y.Doc();
    setDoc(ydoc);

    const host = window.location.hostname === 'localhost' 
      ? 'localhost:1999' 
      : window.location.host; 
      
    const yprovider = new YPartyKitProvider(
      host,
      roomId,
      ydoc
    );

    setProvider(yprovider);

    yprovider.on('status', ({ status }: { status: string }) => {
      setConnected(status === 'connected');
    });

    return () => {
      yprovider.disconnect();
      ydoc.destroy();
    };
  }, [roomId]);

  const ymonaco = doc?.getText('monaco');
  const yblockly = doc?.getText('blockly');

  return { doc, provider, connected, ymonaco, yblockly };
}
