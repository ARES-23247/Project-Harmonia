import { useEffect, useRef } from "react";
import Matter from "matter-js";

export function SimulationPanel() {
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
        background: '#18181b', // zinc-950
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
        // Apply force based on left/right speed.
        // For simplicity, we just apply a forward force if both are positive.
        const speed = (data.left + data.right) / 2;
        const forceMagnitude = speed * 0.0005; 
        
        Matter.Body.applyForce(robotRef.current, robotRef.current.position, {
          x: 0,
          y: -forceMagnitude // Move "up"
        });
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
    <div className="w-full h-full flex items-center justify-center bg-zinc-950 overflow-hidden">
      <canvas ref={canvasRef} className="border border-zinc-800 rounded-lg shadow-xl" />
    </div>
  );
}
