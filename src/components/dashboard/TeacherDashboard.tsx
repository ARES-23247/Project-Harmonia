import { useState, useEffect } from "react";
import { Plus, Users } from "lucide-react";

interface Classroom {
  id: string;
  name: string;
  joinCode: string;
  createdAt: string;
}

export function TeacherDashboard() {
  const [classrooms, setClassrooms] = useState<Classroom[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [newClassName, setNewClassName] = useState("");
  const [creating, setCreating] = useState(false);

  useEffect(() => {
    fetchClassrooms();
  }, []);

  const fetchClassrooms = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/classrooms/teacher");
      const data = await res.json();
      if (data.classrooms) {
        setClassrooms(data.classrooms);
      }
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleCreateClassroom = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newClassName.trim()) return;

    setCreating(true);
    try {
      const res = await fetch("/api/classrooms/create", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: newClassName }),
      });
      const data = await res.json();
      if (data.success) {
        setClassrooms([...classrooms, data.classroom]);
        setNewClassName("");
      } else {
        throw new Error(data.error);
      }
    } catch (err: any) {
      setError(err.message);
    } finally {
      setCreating(false);
    }
  };

  return (
    <div className="w-full h-full p-8 bg-background flex flex-col items-center overflow-y-auto">
      <div className="max-w-5xl w-full">
        <div className="flex justify-between items-end mb-8">
          <div>
            <h1 className="text-3xl font-bold text-zinc-100 font-outfit">Teacher Dashboard</h1>
            <p className="text-zinc-400 mt-2">Manage your classrooms and track student progress.</p>
          </div>
          
          <form onSubmit={handleCreateClassroom} className="flex gap-2">
            <input 
              type="text" 
              value={newClassName}
              onChange={e => setNewClassName(e.target.value)}
              className="bg-zinc-900 border border-zinc-700 rounded px-3 py-2 text-zinc-100 focus:border-blue-500 focus:outline-none"
              placeholder="New Class Name"
            />
            <button 
              type="submit"
              disabled={creating || !newClassName.trim()}
              className="bg-blue-600 hover:bg-blue-500 text-white rounded px-4 py-2 flex items-center gap-2 disabled:opacity-50 transition-colors"
            >
              <Plus size={18} />
              {creating ? "Creating..." : "Create"}
            </button>
          </form>
        </div>

        {error && (
          <div className="bg-red-900/30 border border-red-500/50 text-red-300 p-4 rounded-lg mb-8 glass">
            {error}
          </div>
        )}

        {loading ? (
          <div className="text-zinc-500 animate-pulse">Loading classrooms...</div>
        ) : classrooms.length === 0 ? (
          <div className="text-center py-20 bg-zinc-900/50 border border-zinc-800 rounded-xl glass">
            <Users className="mx-auto h-12 w-12 text-zinc-600 mb-4" />
            <h3 className="text-xl font-medium text-zinc-300 mb-2">No classrooms yet</h3>
            <p className="text-zinc-500">Create your first classroom to get started.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {classrooms.map(c => (
              <div key={c.id} className="bg-zinc-900/80 border border-zinc-700/50 rounded-xl p-6 glass hover:border-blue-500/50 transition-colors group">
                <h3 className="text-xl font-bold text-white mb-2 font-outfit">{c.name}</h3>
                
                <div className="bg-zinc-950 rounded p-3 mb-4 flex items-center justify-between border border-zinc-800">
                  <span className="text-zinc-500 text-sm">Join Code:</span>
                  <span className="text-2xl font-mono tracking-widest text-blue-400 font-bold">{c.joinCode}</span>
                </div>
                
                <div className="flex justify-between items-center text-sm">
                  <span className="text-zinc-400 flex items-center gap-1">
                    <Users size={14} />
                    Active Session
                  </span>
                  <a href={`#/editor/${c.joinCode}`} className="text-blue-400 hover:text-blue-300 transition-colors opacity-0 group-hover:opacity-100">
                    Observe →
                  </a>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
