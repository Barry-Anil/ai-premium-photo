"use client";

import { ThemeToggle } from "@/components/theme-toggle";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Coins, Bell } from "lucide-react";

export function Topbar() {
  return (
    <header className="h-14 border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 z-30 sticky top-0 px-6 flex items-center justify-between">
      <div className="flex-1" />
      
      <div className="flex items-center gap-4">
        {/* Credits */}
        <div className="flex items-center gap-1.5 text-sm font-medium text-muted-foreground bg-secondary/50 px-3 py-1.5 rounded-full border border-border/50">
          <Coins className="w-4 h-4 text-highlight" />
          <span>1,240</span>
        </div>

        <Button variant="ghost" size="icon" className="text-muted-foreground w-8 h-8 rounded-full">
          <Bell className="w-[1.2rem] h-[1.2rem]" />
        </Button>
        <ThemeToggle />
        
        <Avatar className="h-8 w-8 ml-2 cursor-pointer ring-1 ring-border shadow-sm">
          <AvatarImage src="https://i.pravatar.cc/150?u=a042581f4e29026704d" alt="User" />
          <AvatarFallback>VF</AvatarFallback>
        </Avatar>
      </div>
    </header>
  );
}
