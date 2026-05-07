import React, { createContext, useContext } from 'react';
import { useCollaboration } from '@/hooks/useCollaboration';

const CollaborationContext = createContext<ReturnType<typeof useCollaboration> | null>(null);

export function CollaborationProvider({ roomId, children }: { roomId: string, children: React.ReactNode }) {
  const collabState = useCollaboration({ roomId });
  return (
    <CollaborationContext.Provider value={collabState}>
      {children}
    </CollaborationContext.Provider>
  );
}

export function useSharedCollaboration() {
  const context = useContext(CollaborationContext);
  if (!context) {
    throw new Error('useSharedCollaboration must be used within a CollaborationProvider');
  }
  return context;
}
