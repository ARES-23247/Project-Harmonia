import React from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { motion } from "framer-motion";
import { Shield, Sparkles, Cpu, Globe } from "lucide-react";

interface AboutUsModalProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
}

export function AboutUsModal({ isOpen, onOpenChange }: AboutUsModalProps) {
  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-3xl overflow-hidden bg-background/95 backdrop-blur-md border-primary/20">
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-primary via-accent to-secondary" />
        
        <DialogHeader className="mb-6">
          <div className="flex items-center gap-3 mb-2">
            <div className="p-2 rounded-xl bg-primary/10 border border-primary/20">
              <Shield className="w-6 h-6 text-primary" />
            </div>
            <DialogTitle className="text-3xl font-bold tracking-tight">Project Harmonia</DialogTitle>
          </div>
          <DialogDescription className="text-lg text-muted-foreground italic">
            "Where the strength of ARES meets the elegance of Aphrodite."
          </DialogDescription>
        </DialogHeader>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 py-4">
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 }}
            className="space-y-4"
          >
            <section>
              <h3 className="text-sm font-semibold uppercase tracking-wider text-primary mb-2 flex items-center gap-2">
                <Sparkles className="w-4 h-4" /> The Mythology
              </h3>
              <p className="text-sm leading-relaxed text-muted-foreground">
                In Greek mythology, <strong>Harmonia</strong> is the daughter of <strong>Ares</strong>, the god of war, and <strong>Aphrodite</strong>, the goddess of love. She represents the perfect union of strength and beauty, of discipline and passion.
              </p>
              <p className="text-sm leading-relaxed text-muted-foreground mt-2">
                <strong>Project Harmonia</strong> embodies this balance. We bridge the gap between the complex, "battle-hardened" world of professional robotics and the intuitive, creative spirit of education.
              </p>
            </section>

            <section>
              <h3 className="text-sm font-semibold uppercase tracking-wider text-primary mb-2 flex items-center gap-2">
                <Globe className="w-4 h-4" /> The Vision
              </h3>
              <p className="text-sm leading-relaxed text-muted-foreground">
                Created by <strong>ARES FTC Team 23247</strong>, our goal is to provide a truly universal robotics IDE. We believe that learning shouldn't be limited by the hardware you own. 
              </p>
            </section>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="space-y-6"
          >
            <div className="relative aspect-video rounded-2xl overflow-hidden border border-border group">
              <img 
                src="/harmonia_branding_hero_1778255321517.png" 
                alt="Harmonia Branding"
                className="object-cover w-full h-full transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent" />
              <div className="absolute bottom-4 left-4">
                <span className="text-xs font-mono text-white/70">ARES FTC 23247 • MILAN, OH</span>
              </div>
            </div>

            <section>
              <h3 className="text-sm font-semibold uppercase tracking-wider text-primary mb-3 flex items-center gap-2">
                <Cpu className="w-4 h-4" /> Technical Innovation
              </h3>
              <ul className="grid grid-cols-1 gap-3">
                {[
                  { title: "Universal Driver", desc: "Write once, run on Lego, XRP, or REV." },
                  { title: "Dual-Sync Editor", desc: "Real-time Block to Python synchronization." },
                  { title: "Integrated Sim", desc: "Test code in high-fidelity physics environments." },
                ].map((item, i) => (
                  <li key={i} className="flex flex-col p-3 rounded-lg bg-accent/50 border border-border/50">
                    <span className="text-xs font-bold text-foreground">{item.title}</span>
                    <span className="text-[11px] text-muted-foreground">{item.desc}</span>
                  </li>
                ))}
              </ul>
            </section>
          </motion.div>
        </div>

        <div className="mt-6 pt-6 border-t border-border/50 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center text-[10px] font-bold text-primary-foreground shadow-lg shadow-primary/20">
              ARES
            </div>
            <span className="text-xs font-medium text-muted-foreground">Team 23247</span>
          </div>
          <p className="text-[10px] text-muted-foreground font-mono uppercase tracking-widest">
            v1.3.0 • Stabilizing Parity
          </p>
        </div>
      </DialogContent>
    </Dialog>
  );
}
