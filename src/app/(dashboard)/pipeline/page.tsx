"use client";

import { usePipelineStore } from "@/lib/store/pipelineStore";
import { Button } from "@/components/ui/button";
import { Play } from "lucide-react";
import { StepCard } from "@/components/pipeline/step-card";
import { motion } from "framer-motion";

export default function PipelineBuilder() {
  const { steps, isProcessing, runPipeline } = usePipelineStore();

  return (
    <div className="max-w-3xl mx-auto py-8">
      <div className="mb-8 flex items-center justify-between">
        <div>
          <div className="text-xs font-semibold text-primary uppercase tracking-wider mb-1 flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
            Project Alpha
          </div>
          <h1 className="text-3xl font-semibold tracking-tight">Build Pipeline</h1>
          <p className="text-muted-foreground mt-2">
            Construct your creative sequence. VisualForge uses tiered neural engines to process each step in high-fidelity.
          </p>
        </div>
        <Button 
          size="lg" 
          onClick={runPipeline} 
          disabled={isProcessing}
          className="rounded-full shadow-[0_0_20px_rgba(99,102,241,0.2)] hover:shadow-[0_0_30px_rgba(99,102,241,0.4)] transition-all"
        >
          <Play className="w-4 h-4 mr-2" />
          {isProcessing ? "Processing..." : "Run Pipeline"}
        </Button>
      </div>

      <div className="relative pl-6">
        <div className="absolute left-[27px] top-4 bottom-0 w-[2px] bg-border/50 -z-10" />
        
        <div className="space-y-6">
          {steps.map((step, index) => (
            <StepCard key={step.id} step={step} index={index + 1} />
          ))}
        </div>
      </div>
    </div>
  );
}
