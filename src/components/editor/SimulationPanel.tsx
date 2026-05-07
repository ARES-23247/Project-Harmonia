import { useEffect, useRef } from "react";
import Matter from "matter-js";

export default function SimulationPanel() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const engineRef = useRef<Matter.Engine | null>(null);
  const robotRef = useRef<Matter.Body | null>(null);

  useEffect(() => {
    if (!canvasRef.current) return;

    // module aliases
    const Engine = Matter.Engine,
          Render = Matter.Render,
          Runner = Matter.Runner,
          Bodies = Matter.Bodies,
          Composite = Matter.Composite;

    // create an engine
    const engine = Engine.create();
    engineRef.current = engine;
    
    // disable gravity for top-down view
    engine.world.gravity.y = 0;
    engine.world.gravity.x = 0;

    // create a renderer
    const render = Render.create({
      canvas: canvasRef.current,
      engine: engine,
      options: {
        width: 800,
        height: 600,
        wireframes: false,
        background: 'transparent',
      }
    });

    // create robot body
    const robot = Bodies.rectangle(400, 300, 40, 60, {
      frictionAir: 0.1, // Dampen movement to simulate friction
      render: { fillStyle: '#3b82f6' } // blue-500
    });
    robotRef.current = robot;

    // add all of the bodies to the world
    Composite.add(engine.world, [robot]);

    // run the renderer
    Render.run(render);

    // create runner
    const runner = Runner.create();
    Runner.run(runner, engine);

    // Listen for events from the simulation provider
    const onSimulationCmd = (e: any) => {
      const data = e.detail;
      if (data.cmd === "drive" && robotRef.current) {
        // Differential drive kinematics
        const left = data.left;
        const right = data.right;
        
        const speed = (left + right) / 2;
        const rotation = (right - left) / 2; // Right > Left turns left (negative angle in CSS/Matter depending on setup. Let's say right>left -> counterclockwise rotation)
        
        // Tuning constants
        const forceMagnitude = speed * 0.0001; 
        const torqueMagnitude = rotation * 0.00005;

        // Calculate force vector based on current angle (up is -y)
        const angle = robotRef.current.angle;
        // matter.js angle 0 is pointing right. Let's assume pointing up is -PI/2.
        // Wait, if we rendered a rectangle, we usually drive it along its local Y axis.
        // Let's apply force along its local "forward" vector (which is UP when angle=0 if we treat it that way, or we can use standard trig).
        // Let's assume it points UP by default. UP is (0, -1) when angle = 0.
        // Rotated by `angle`:
        // x_force = forceMagnitude * sin(angle)
        // y_force = -forceMagnitude * cos(angle)
        const fx = forceMagnitude * Math.sin(angle);
        const fy = -forceMagnitude * Math.cos(angle);
        
        Matter.Body.applyForce(robotRef.current, robotRef.current.position, {
          x: fx,
          y: fy
        });
        
        Matter.Body.setAngularVelocity(robotRef.current, robotRef.current.angularVelocity + torqueMagnitude);
      }
    };

    window.addEventListener("simulation_cmd", onSimulationCmd);

    return () => {
      window.removeEventListener("simulation_cmd", onSimulationCmd);
      Render.stop(render);
      Runner.stop(runner);
      Engine.clear(engine);
    };
  }, []);

  return (
    <div className="w-full h-full flex flex-col overflow-hidden bg-card">
      <div className="h-9 flex items-center px-3 border-b bg-muted/10 shrink-0">
        <span className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">Simulation</span>
        <Button 
          variant="ghost" 
          size="icon" 
          className="h-6 w-6 ml-auto hover:bg-primary/10 transition-colors" 
          onClick={() => togglePopOut("simulation")}
          title="Pop Out"
        >
          <ExternalLink className="w-3 h-3 text-primary" />
        </Button>
      </div>
      <div id="simulation-panel" className="flex-1 flex items-center justify-center overflow-hidden p-4">
        <canvas ref={canvasRef} className="max-w-full max-h-full border border-border rounded-xl shadow-2xl bg-zinc-950/20 backdrop-blur-sm" />
      </div>
    </div>
  );
}
