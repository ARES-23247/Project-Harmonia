import { HashRouter as Router, Routes, Route } from "react-router-dom"
import { Button } from "@/components/ui/button"

function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen flex flex-col bg-background text-foreground dark">
      <header className="border-b h-14 flex items-center px-4 justify-between bg-card">
        <h1 className="font-bold text-lg tracking-tight">Harmonia IDE</h1>
        <Button variant="outline" size="sm">Login</Button>
      </header>
      <main className="flex-1 overflow-auto">
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
      <Button>Get Started</Button>
    </div>
  )
}

export default function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<HomePage />} />
        </Routes>
      </Layout>
    </Router>
  )
}
