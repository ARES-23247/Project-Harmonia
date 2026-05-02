import { useState } from "react";
import { useEditorStore } from "@/store/editorStore";
import { Octokit } from "octokit";

interface StudentAssignment {
  id: string;
  url: string;
  owner: string;
  updatedAt: string;
}

export function TeacherDashboard() {
  const { githubToken } = useEditorStore();
  const [tag, setTag] = useState("harmonia-assignment");
  const [assignments, setAssignments] = useState<StudentAssignment[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchAssignments = async () => {
    if (!githubToken) {
      setError("Please login with GitHub first.");
      return;
    }
    
    setLoading(true);
    setError(null);
    try {
      const octokit = new Octokit({ auth: githubToken });
      // Search for gists with the specific tag in their description
      // GitHub doesn't have a direct gist search endpoint by description in Octokit easily without listing all or using search,
      // But we can fetch the user's gists. In a real classroom, the teacher would use a GitHub App.
      // For this MVP, we fetch the authenticated user's gists and filter them.
      const response = await octokit.rest.gists.list();
      
      const filtered = response.data
        .filter(g => g.description?.includes(`#${tag}`))
        .map(g => ({
          id: g.id,
          url: g.html_url,
          owner: g.owner?.login || "Unknown",
          updatedAt: new Date(g.updated_at).toLocaleString()
        }));

      setAssignments(filtered);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full h-full p-8 bg-background flex flex-col items-center">
      <div className="max-w-4xl w-full">
        <h1 className="text-3xl font-bold mb-2 text-zinc-100">Teacher Dashboard</h1>
        <p className="text-zinc-400 mb-8">View student assignments submitted via GitHub Gists.</p>

        <div className="flex gap-4 mb-8">
          <input 
            type="text" 
            value={tag}
            onChange={e => setTag(e.target.value)}
            className="flex-1 bg-zinc-900 border border-zinc-700 rounded p-2 text-zinc-100"
            placeholder="Assignment Tag (e.g. harmonia-hw1)"
          />
          <button 
            onClick={fetchAssignments}
            disabled={loading}
            className="bg-blue-600 hover:bg-blue-500 text-white rounded px-4 py-2 disabled:opacity-50"
          >
            {loading ? "Searching..." : "Search"}
          </button>
        </div>

        {error && (
          <div className="bg-red-900/50 border border-red-500 text-red-200 p-4 rounded mb-8">
            {error}
          </div>
        )}

        <div className="bg-zinc-900 border border-zinc-800 rounded shadow overflow-hidden">
          <table className="w-full text-left text-zinc-300">
            <thead className="bg-zinc-950 border-b border-zinc-800">
              <tr>
                <th className="p-4 font-semibold">Student (Owner)</th>
                <th className="p-4 font-semibold">Last Updated</th>
                <th className="p-4 font-semibold">Gist Link</th>
              </tr>
            </thead>
            <tbody>
              {assignments.length === 0 ? (
                <tr>
                  <td colSpan={3} className="p-8 text-center text-zinc-500">
                    No assignments found for #{tag}
                  </td>
                </tr>
              ) : (
                assignments.map(a => (
                  <tr key={a.id} className="border-b border-zinc-800 hover:bg-zinc-800/50 transition-colors">
                    <td className="p-4">{a.owner}</td>
                    <td className="p-4 text-zinc-400">{a.updatedAt}</td>
                    <td className="p-4">
                      <a href={a.url} target="_blank" rel="noreferrer" className="text-blue-400 hover:text-blue-300 underline">
                        View Code
                      </a>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
