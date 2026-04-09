"use client";

import { usePipelineStore, PipelineStep } from "@/lib/store/pipelineStore";
import { Card } from "@/components/ui/card";
import { CloudUpload, Eraser, Sparkles, Maximize, CheckCircle2, Loader2 } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";

const stepIcons = {
  upload: CloudUpload,
  remove_bg: Eraser,
  generate: Sparkles,
  upscale: Maximize,
};

export function StepCard({ step, index }: { step: PipelineStep; index: number }) {
  const { updateStepConfig, activeStepId } = usePipelineStore();
  const Icon = stepIcons[step.type];
  const isRunning = step.status === "running";
  const isActive = activeStepId === step.id;
  const isCompleted = step.status === "completed";

  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: index * 0.1 }}
      className="relative flex items-start group"
    >
      <div className="absolute -left-12 top-6 flex items-center justify-center bg-background py-2">
        <div className={`w-8 h-8 rounded-full border-2 flex items-center justify-center text-sm font-semibold transition-colors
          ${isCompleted ? "border-primary bg-primary text-primary-foreground" : 
            isRunning ? "border-primary text-primary shadow-[0_0_10px_rgba(99,102,241,0.5)]" : 
            "border-border text-muted-foreground bg-card"}
        `}>
          {isCompleted ? <CheckCircle2 className="w-5 h-5" /> : index}
        </div>
      </div>

      <Card className={`w-full transition-all duration-300 ${isActive ? "ring-2 ring-primary border-transparent shadow-lg scale-[1.01]" : "hover:border-primary/30"}`}>
        <div className="p-6">
          <div className="flex items-center gap-4 mb-4">
            <div className={`p-3 rounded-xl ${isRunning ? "bg-primary/20 text-primary animate-pulse" : isCompleted ? "bg-primary/10 text-primary" : "bg-secondary text-muted-foreground"}`}>
              {isRunning ? <Loader2 className="w-5 h-5 animate-spin" /> : <Icon className="w-5 h-5" />}
            </div>
            <div>
              <h3 className="text-lg font-medium tracking-tight">{step.title}</h3>
              <p className="text-sm text-muted-foreground uppercase tracking-widest text-[10px] mt-1">
                {step.type.replace("_", " ")}
              </p>
            </div>
            {isCompleted && (
              <div className="ml-auto flex items-center text-sm text-primary">
                <CheckCircle2 className="w-4 h-4 mr-1" />
                Done
              </div>
            )}
          </div>

          <div className="pl-[52px]">
            {/* Step specific UI */}
            {step.type === "upload" && (
              <div className="border-2 border-dashed border-border/60 rounded-xl p-8 flex flex-col items-center justify-center text-center bg-card/30 hover:bg-card/80 transition-colors cursor-pointer">
                <CloudUpload className="w-8 h-8 text-muted-foreground mb-3" />
                <p className="text-sm font-medium">Click or drag and drop raw photography</p>
                <p className="text-xs text-muted-foreground mt-1">Supports RAW, PNG, JPEG up to 50MB</p>
              </div>
            )}

            {step.type === "remove_bg" && (
              <div className="flex items-center justify-between p-4 bg-secondary/30 rounded-lg border border-border/50">
                <div>
                  <p className="text-sm font-medium">High-Fidelity Masking</p>
                  <p className="text-xs text-muted-foreground mt-0.5">Use neural refinement to preserve intricate details.</p>
                </div>
                <Switch 
                  checked={step.config?.highFidelity} 
                  onCheckedChange={(c) => updateStepConfig(step.id, { highFidelity: c })} 
                  disabled={isRunning || isCompleted}
                />
              </div>
            )}

            {step.type === "generate" && (
              <div className="space-y-4">
                <div>
                  <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2 block">Composition Prompt</label>
                  <Textarea 
                    placeholder="Describe the environment (e.g., luxury studio lighting, soft shadows, marble podium)..."
                    className="resize-none bg-secondary/30 h-24"
                    value={step.config?.prompt || ""}
                    onChange={(e) => updateStepConfig(step.id, { prompt: e.target.value })}
                    disabled={isRunning || isCompleted}
                  />
                </div>
                <div className="grid grid-cols-3 gap-3">
                  {["Editorial Minimalism", "Cyberpunk Neon", "Luxury Studio"].map(preset => (
                    <div key={preset} className="h-16 rounded-lg border border-border/50 bg-secondary/30 flex items-center justify-center text-xs font-medium text-muted-foreground hover:bg-secondary cursor-pointer transition-colors">
                      {preset}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {step.type === "upscale" && (
              <div className="grid grid-cols-2 gap-4">
                {["2x", "4x"].map(scale => (
                  <div 
                    key={scale}
                    onClick={() => !isRunning && !isCompleted && updateStepConfig(step.id, { scale })}
                    className={`p-4 rounded-xl border flex flex-col items-center justify-center cursor-pointer transition-all ${step.config?.scale === scale ? "border-primary bg-primary/5 ring-1 ring-primary/50" : "border-border/50 bg-secondary/30 hover:bg-secondary"}`}
                  >
                    <span className="text-xl font-bold">{scale}</span>
                    <span className="text-xs text-muted-foreground mt-1">
                      {scale === "2x" ? "Standard HD" : "Ultra 4K"}
                    </span>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </Card>
    </motion.div>
  );
}
