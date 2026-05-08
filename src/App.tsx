import { HashRouter as Router, Routes, Route, Link, useNavigate } from "react-router-dom"
import { Button } from "@/components/ui/button"
import { Workspace } from "@/components/editor/Workspace"
import { TeacherDashboard } from "@/components/dashboard/TeacherDashboard"
import { useEffect, useState } from "react"
import { startGamepadPolling, stopGamepadPolling } from "@/lib/hardware/gamepad"
import { useThemeStore } from "@/store/themeStore"
import { Sun, Moon, Contrast } from "lucide-react"
import { JoinClassroomModal } from "@/components/dashboard/JoinClassroomModal"

function ThemeToggle() {
  const { theme, toggleTheme } = useThemeStore();
  
  return (
    <Button variant="ghost" size="sm" onClick={toggleTheme} aria-label="Toggle Theme">
      {theme === 'light' && <Sun className="h-4 w-4" />}
      {theme === 'dark' && <Moon className="h-4 w-4" />}
      {theme === 'high-contrast' && <Contrast className="h-4 w-4" />}
      <span className="ml-2 capitalize">{theme.replace('-', ' ')}</span>
    </Button>
  );
}

function Layout({ children }: { children: React.ReactNode }) {
  const { theme } = useThemeStore();
  
  return (
    <div className={`h-screen w-screen flex flex-col bg-background text-foreground ${theme} overflow-hidden`}>
      <header className="border-b h-14 flex items-center px-4 justify-between glass sticky top-0 z-50 shrink-0">
        <Link to="/" className="font-bold text-xl tracking-tight hover:text-primary transition-all hover:scale-105 active:scale-95">
          Harmonia IDE
        </Link>
        <div className="flex gap-2 items-center">
          <ThemeToggle />
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
  const [isJoinModalOpen, setIsJoinModalOpen] = useState(false);
  const navigate = useNavigate();

  const handleJoin = (classroom: any) => {
    // Navigate to the editor with the classroom's join code as the room ID
    navigate(`/editor/${classroom.joinCode}`);
  };

  return (
    <div className="p-8 flex flex-col items-center justify-center h-full gap-4 relative">
      <h2 className="text-4xl font-bold font-outfit mb-2">Project Harmonia</h2>
      <p className="text-muted-foreground text-lg mb-8">Universal Robotics Learning Platform</p>
      
      <div className="flex gap-4">
        <Link to="/editor">
          <Button variant="outline" size="lg" className="w-40">Single Player</Button>
        </Link>
        <Button onClick={() => setIsJoinModalOpen(true)} size="lg" className="w-40">Join Classroom</Button>
      </div>

      <JoinClassroomModal 
        isOpen={isJoinModalOpen} 
        onClose={() => setIsJoinModalOpen(false)} 
        onJoin={handleJoin} 
      />
    </div>
  )
}

export default function App() {
  const { theme } = useThemeStore();

  useEffect(() => {
    startGamepadPolling();
    return () => stopGamepadPolling();
  }, []);

  useEffect(() => {
    // Sync theme with document element for Tailwind dark mode and portal support
    const root = window.document.documentElement;
    root.classList.remove('light', 'dark', 'high-contrast');
    root.classList.add(theme);
  }, [theme]);

  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/editor/:roomId?" element={<Workspace />} />
          <Route path="/dashboard" element={<TeacherDashboard />} />
        </Routes>
      </Layout>
    </Router>
  )
}

