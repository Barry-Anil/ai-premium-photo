"use client";

import { motion } from "framer-motion";
import { Download, Maximize2 } from "lucide-react";
import { Button } from "@/components/ui/button";

const mockOutputs = [
  { id: 1, url: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&q=80&w=800", span: "row-span-2 col-span-2" },
  { id: 2, url: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&q=80&w=600", span: "row-span-1 col-span-1" },
  { id: 3, url: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&q=80&w=600", span: "row-span-1 col-span-1" },
  { id: 4, url: "https://images.unsplash.com/photo-1572635196237-14b3f281503f?auto=format&fit=crop&q=80&w=600", span: "row-span-1 col-span-2" },
  { id: 5, url: "https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?auto=format&fit=crop&q=80&w=600", span: "row-span-1 col-span-1" },
];

export default function OutputViewer() {
  return (
    <div className="space-y-8 pb-12">
      <div className="space-y-1.5">
        <h1 className="text-3xl font-semibold tracking-tight">Recent Outputs</h1>
        <p className="text-muted-foreground text-base max-w-lg">
          Your generated high-fidelity assets ready for deployment.
        </p>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 grid-rows-auto gap-4 auto-rows-[200px]">
        {mockOutputs.map((output, i) => (
          <motion.div
            key={output.id}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.4, delay: i * 0.1 }}
            className={`relative group overflow-hidden rounded-2xl bg-card border border-border/50 shadow-sm ${output.span}`}
          >
            <img 
              src={output.url} 
              alt="Generated asset" 
              className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
            />
            
            {/* Hover overlay */}
            <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-4 backdrop-blur-[2px]">
              <Button size="icon" variant="secondary" className="rounded-full w-10 h-10 shadow-lg translate-y-4 group-hover:translate-y-0 transition-all duration-300">
                <Maximize2 className="w-4 h-4" />
              </Button>
              <Button size="icon" className="rounded-full w-10 h-10 bg-primary hover:bg-primary/90 text-primary-foreground shadow-lg translate-y-4 group-hover:translate-y-0 transition-all duration-300 delay-50">
                <Download className="w-4 h-4" />
              </Button>
            </div>
            
            <div className="absolute bottom-3 left-4 z-20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 delay-100 flex gap-2">
              <span className="text-[10px] font-semibold tracking-wider uppercase px-2 py-0.5 rounded-full bg-black/50 text-white backdrop-blur-sm border border-white/10">
                4K Ultra
              </span>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
