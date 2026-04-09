"use client";

import { use } from "react";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Play, Settings } from "lucide-react";
import Link from "next/link";
import { usePipelineStore } from "@/lib/store/pipelineStore";
import { StepCard } from "@/components/pipeline/step-card";

export default function ProjectOverview({ params }: { params: Promise<{ id: string }> }) {
  const unwrappedParams = use(params);
  const projectId = unwrappedParams.id;
  const { steps, isProcessing, runPipeline } = usePipelineStore();

  return (
    <div className="max-w-4xl mx-auto py-8">
      {/* Header */}
      <div className="flex items-center gap-4 mb-8">
        <Link href="/">
          <Button variant="ghost" size="icon" className="w-10 h-10 rounded-full">
            <ArrowLeft className="w-5 h-5 text-muted-foreground" />
          </Button>
        </Link>
        <div>
          <div className="text-xs font-semibold tracking-wider uppercase text-primary mb-1">
            Project ID: {projectId}
          </div>
          <h1 className="text-3xl font-semibold tracking-tight">Cyperpunk Sneakers</h1>
        </div>
        <div className="ml-auto flex gap-3">
          <Button variant="outline" size="sm" className="rounded-full shadow-sm">
            <Settings className="w-4 h-4 mr-2" />
            Config
          </Button>
          <Button 
            size="sm" 
            onClick={runPipeline} 
            disabled={isProcessing}
            className="rounded-full shadow-[0_0_15px_rgba(99,102,241,0.2)] hover:shadow-[0_0_20px_rgba(99,102,241,0.3)] transition-all"
          >
            <Play className="w-4 h-4 mr-2" />
            {isProcessing ? "Processing..." : "Run Active Pipeline"}
          </Button>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Left Col: Pipeline Preview */}
        <div className="md:col-span-1">
          <h2 className="text-sm font-semibold tracking-wide uppercase text-muted-foreground mb-4">Pipeline Sequence</h2>
          <div className="relative pl-14">
            <div className="absolute left-[23px] top-4 bottom-0 w-[2px] bg-border/50 -z-10" />
            <div className="space-y-4">
              {steps.map((step, index) => (
                <StepCard key={step.id} step={step} index={index + 1} />
              ))}
            </div>
          </div>
        </div>

        {/* Right Col: Output Preview & Details */}
        <div className="md:col-span-2 space-y-6">
          <div className="bg-card/50 border border-border/50 rounded-2xl p-6">
             <h2 className="text-lg font-medium tracking-tight mb-4 flex items-center justify-between">
                Latest Output
                <span className="text-[10px] uppercase bg-secondary px-2 py-0.5 rounded-full text-secondary-foreground font-semibold">Active</span>
             </h2>

             <div className="aspect-video w-full rounded-xl overflow-hidden relative border border-border/50">
               <img src="https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&q=80&w=800" alt="Output preview" className="object-cover w-full h-full" />
             </div>
             
             <div className="mt-4 grid grid-cols-2 gap-4 text-sm">
               <div className="bg-background rounded-lg p-3">
                 <span className="block text-muted-foreground text-xs uppercase mb-1 tracking-wider">Resolution</span>
                 <span className="font-medium">4K Ultra (3840×2160)</span>
               </div>
               <div className="bg-background rounded-lg p-3">
                 <span className="block text-muted-foreground text-xs uppercase mb-1 tracking-wider">Generation Time</span>
                 <span className="font-medium">0.4s</span>
               </div>
             </div>
          </div>
        </div>
      </div>
    </div>
  );
}
