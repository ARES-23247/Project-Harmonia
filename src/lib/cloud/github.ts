import { Octokit } from "octokit";

export async function saveToGist(token: string, code: string, gistId?: string): Promise<string | null> {
  try {
    const octokit = new Octokit({ auth: token });
    
    if (gistId) {
      // Update existing gist
      await octokit.rest.gists.update({
        gist_id: gistId,
        files: {
          "harmonia_project.py": {
            content: code
          }
        }
      });
      return gistId;
    } else {
      // Create new gist
      const response = await octokit.rest.gists.create({
        description: "Project Harmonia Autosave",
        public: false,
        files: {
          "harmonia_project.py": {
            content: code
          }
        }
      });
      return response.data.id ?? null;
    }
  } catch (error) {
    console.error("Failed to save to GitHub:", error);
    return null;
  }
}
