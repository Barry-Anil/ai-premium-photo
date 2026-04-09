"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Plus, LayoutGrid, PackageOpen, Settings, LifeBuoy, Sparkles, Image } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button, buttonVariants } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";

const mainNav = [
  { title: "Dashboard", href: "/", icon: LayoutGrid },
  { title: "Pipeline Builder", href: "/pipeline", icon: PackageOpen },
  { title: "Output Viewer", href: "/outputs", icon: Image },
];

const mockProjects = [
  { id: 1, name: "Cyperpunk Sneakers", href: "/project/1" },
  { id: 2, name: "Summer Drink Ad", href: "/project/2" },
  { id: 3, name: "Minimalist Watch", href: "/project/3" },
];

export function Sidebar() {
  const pathname = usePathname();

  return (
    <div className="w-64 border-r border-border bg-card/50 flex flex-col h-full flex-shrink-0">
      {/* Brand */}
      <div className="h-14 flex items-center px-6 border-b border-border/50">
        <div className="flex items-center gap-2 text-primary font-semibold text-lg tracking-tight">
          <div className="w-6 h-6 rounded bg-primary/20 flex items-center justify-center">
            <Sparkles className="w-4 h-4 text-primary" />
          </div>
          VisualForge
        </div>
      </div>

      {/* Main Nav */}
      <div className="p-4 space-y-1">
        <Link href="/pipeline" className={cn(buttonVariants({ variant: "secondary" }), "w-full justify-start mb-4 shadow-sm")}>
          <Plus className="w-4 h-4 mr-2" />
          New Project
        </Link>
        {mainNav.map((item) => (
          <Link
            key={item.title}
            href={item.href}
            className={cn(
              buttonVariants({ variant: pathname === item.href ? "secondary" : "ghost" }),
              "w-full justify-start",
              pathname === item.href ? "bg-secondary text-secondary-foreground" : "text-muted-foreground"
            )}
          >
            <item.icon className="w-4 h-4 mr-2" />
            {item.title}
          </Link>
        ))}
      </div>

      {/* Projects */}
      <div className="flex-1 px-4 py-2 overflow-hidden flex flex-col">
        <div className="text-xs font-semibold text-muted-foreground mb-2 px-2 uppercase tracking-wider">
          Recent Projects
        </div>
        <ScrollArea className="flex-1 -mx-2 px-2">
          <div className="space-y-1">
             {mockProjects.map((project) => (
               <Link
                 key={project.id}
                 href={project.href}
                 className={cn(
                   buttonVariants({ variant: "ghost" }),
                   "w-full justify-start text-sm text-muted-foreground h-9 font-normal px-2 truncate"
                 )}
               >
                 {project.name}
               </Link>
             ))}
          </div>
        </ScrollArea>
      </div>

      {/* Footer Nav */}
      <div className="p-4 border-t border-border/50 space-y-1">
        <Button variant="ghost" className="w-full justify-start text-muted-foreground">
           <Settings className="w-4 h-4 mr-2" />
           Settings
        </Button>
        <Button variant="ghost" className="w-full justify-start text-muted-foreground">
           <LifeBuoy className="w-4 h-4 mr-2" />
           Help & Support
        </Button>
      </div>
    </div>
  );
}
