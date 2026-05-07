import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';

interface JoinClassroomModalProps {
  isOpen: boolean;
  onClose: () => void;
  onJoin: (classroom: any) => void;
}

export function JoinClassroomModal({ isOpen, onClose, onJoin }: JoinClassroomModalProps) {
  const [joinCode, setJoinCode] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleJoin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!joinCode || joinCode.length !== 6) {
      setError('Please enter a valid 6-digit code');
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const res = await fetch('/api/classrooms/join', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ joinCode }),
      });

      const data = await res.json();
      if (!data.success) {
        throw new Error(data.error || 'Failed to join classroom');
      }

      onJoin(data.classroom);
      setJoinCode('');
      onClose();
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="bg-zinc-900 border border-zinc-700 rounded-lg shadow-xl p-6 w-full max-w-md relative glass"
          >
            <button
              onClick={onClose}
              className="absolute top-4 right-4 text-zinc-400 hover:text-white"
            >
              <X size={20} />
            </button>
            <h2 className="text-2xl font-bold text-white mb-4">Join Classroom</h2>
            <p className="text-zinc-400 mb-6">
              Enter the 6-digit code provided by your teacher to join the classroom.
            </p>

            <form onSubmit={handleJoin}>
              <div className="mb-4">
                <input
                  type="text"
                  value={joinCode}
                  onChange={(e) => setJoinCode(e.target.value)}
                  placeholder="e.g. 123456"
                  maxLength={6}
                  className="w-full bg-zinc-950 border border-zinc-800 text-white p-3 rounded text-center text-2xl tracking-widest focus:outline-none focus:border-blue-500"
                />
              </div>

              {error && (
                <p className="text-red-400 text-sm mb-4">{error}</p>
              )}

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-blue-600 hover:bg-blue-500 text-white font-medium py-3 rounded disabled:opacity-50 transition-colors"
              >
                {loading ? 'Joining...' : 'Join Classroom'}
              </button>
            </form>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
