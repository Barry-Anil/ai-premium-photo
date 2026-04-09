"use client";

import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Button, buttonVariants } from "@/components/ui/button";
import { Plus, MoreHorizontal } from "lucide-react";
import { motion } from "framer-motion";
import Link from "next/link";
import { cn } from "@/lib/utils";

const mockProjects = [
  { id: 1, name: "Cyperpunk Sneakers", status: "Active", updated: "2h ago", image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&q=80&w=400&h=300" },
  { id: 2, name: "Summer Drink Ad", status: "Draft", updated: "1d ago", image: "https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?auto=format&fit=crop&q=80&w=400&h=300" },
  { id: 3, name: "Minimalist Watch", status: "Completed", updated: "3d ago", image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&q=80&w=400&h=300" },
];

export default function Dashboard() {
  return (
    <div className="space-y-8 pb-12">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div className="space-y-1.5">
          <h1 className="text-3xl font-semibold tracking-tight">Projects</h1>
          <p className="text-muted-foreground text-base max-w-lg">
            Manage your generative visual workflows and creative assets in one unified workspace.
          </p>
        </div>
        <div className="flex items-center gap-3">
          <Button variant="secondary" className="px-6 rounded-full">
            Import Metadata
          </Button>
          <Link href="/pipeline" className={cn(buttonVariants(), "px-6 rounded-full bg-primary hover:bg-primary/90 text-primary-foreground shadow-[0_0_20px_rgba(99,102,241,0.3)] transition-all")}>
            <Plus className="w-4 h-4 mr-2" />
            New Project
          </Link>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        <motion.div
          whileHover={{ y: -4, scale: 1.02 }}
          transition={{ duration: 0.2 }}
        >
          <Link href="/pipeline" className="block h-full">
            <Card className="h-full min-h-[300px] border-dashed border-2 flex flex-col items-center justify-center bg-card/50 hover:bg-card/80 transition-colors cursor-pointer group rounded-2xl">
              <div className="w-12 h-12 rounded-full bg-secondary text-secondary-foreground flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <Plus className="w-6 h-6" />
              </div>
              <CardTitle className="text-lg">Start Your First Project</CardTitle>
              <p className="text-sm text-muted-foreground mt-2 text-center px-6">
                Begin building your visual AI pipeline with our modular tools.
              </p>
              <span className="mt-4 text-primary text-sm font-medium hover:underline">
                View Templates &rarr;
              </span>
            </Card>
          </Link>
        </motion.div>

        {mockProjects.map((project, i) => (
          <motion.div
            key={project.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: i * 0.1 }}
            whileHover={{ y: -4, scale: 1.02 }}
            className="flex"
          >
            <Link href={`/project/${project.id}`} className="w-full">
              <Card className="w-full h-full flex flex-col overflow-hidden rounded-2xl bg-card border-border/50 shadow-sm hover:shadow-xl transition-all cursor-pointer">
              <div className="h-48 overflow-hidden relative">
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent z-10" />
                <img 
                  src={project.image} 
                  alt={project.name} 
                  className="object-cover w-full h-full transform hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute bottom-3 left-4 z-20 flex gap-2">
                  <span className="text-[10px] font-semibold tracking-wider uppercase px-2 py-0.5 rounded-full bg-black/50 text-white backdrop-blur-sm border border-white/10">
                    {project.status}
                  </span>
                </div>
              </div>
              <CardHeader className="pt-4 pb-2">
                <div className="flex justify-between items-start">
                  <CardTitle className="text-lg leading-tight line-clamp-1">{project.name}</CardTitle>
                  <Button variant="ghost" size="icon" className="h-6 w-6 -mr-2 text-muted-foreground">
                    <MoreHorizontal className="w-4 h-4" />
                  </Button>
                </div>
                <CardDescription className="text-xs uppercase tracking-wider">{project.updated}</CardDescription>
              </CardHeader>
              <CardContent className="mt-auto pt-4 pb-5 flex items-center gap-2">
                <div className="flex -space-x-2">
                   <div className="w-6 h-6 rounded-full border-2 border-background bg-secondary flex items-center justify-center text-[10px] font-medium">+2</div>
                </div>
                <span className="text-xs text-muted-foreground ml-2">12 nodes &bull; 4 outputs</span>
              </CardContent>
            </Card>
            </Link>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
