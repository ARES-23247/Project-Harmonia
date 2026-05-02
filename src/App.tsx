import { HashRouter as Router, Routes, Route, Link } from "react-router-dom"
import { Button } from "@/components/ui/button"
import { Workspace } from "@/components/editor/Workspace"

function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen flex flex-col bg-background text-foreground dark">
      <header className="border-b h-14 flex items-center px-4 justify-between bg-card shrink-0">
        <Link to="/" className="font-bold text-lg tracking-tight hover:text-primary transition-colors">
          Harmonia IDE
        </Link>
        <Button variant="outline" size="sm">Login</Button>
      </header>
      <main className="flex-1 overflow-hidden">
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
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/editor" element={<Workspace />} />
        </Routes>
      </Layout>
    </Router>
  )
}
