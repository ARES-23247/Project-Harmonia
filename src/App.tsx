import { HashRouter as Router, Routes, Route, Link } from "react-router-dom"
import { Button } from "@/components/ui/button"
import { Workspace } from "@/components/editor/Workspace"
import { TeacherDashboard } from "@/components/dashboard/TeacherDashboard"
import { useEffect } from "react"
import { startGamepadPolling, stopGamepadPolling } from "@/lib/hardware/gamepad"

function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="h-screen w-screen flex flex-col bg-background text-foreground dark overflow-hidden">
      <header className="border-b h-14 flex items-center px-4 justify-between bg-card shrink-0">
        <Link to="/" className="font-bold text-lg tracking-tight hover:text-primary transition-colors">
          Harmonia IDE
        </Link>
        <div className="flex gap-2">
          <Link to="/dashboard">
            <Button variant="ghost" size="sm">Dashboard</Button>
          </Link>
          <Button variant="outline" size="sm">Login</Button>
        </div>
      </header>
      <main className="flex-1 flex flex-col overflow-hidden">
        {children}
      </main>
    </div>
  )
}

function HomePage() {
  return (
    <div className="p-8 flex flex-col items-center justify-center h-full gap-4">
      <h2 className="text-2xl font-bold">Welcome to Project Harmonia</h2>
      <p className="text-muted-foreground">Universal Robotics IDE</p>
      <Link to="/editor">
        <Button>Open Editor</Button>
      </Link>
    </div>
  )
}

export default function App() {
  useEffect(() => {
    startGamepadPolling();
    return () => stopGamepadPolling();
  }, []);

  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/editor" element={<Workspace />} />
          <Route path="/dashboard" element={<TeacherDashboard />} />
        </Routes>
      </Layout>
    </Router>
  )
}
