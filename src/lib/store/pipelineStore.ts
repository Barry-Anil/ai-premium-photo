import { create } from "zustand";

export type PipelineStepType = "upload" | "remove_bg" | "generate" | "upscale";

export interface PipelineStep {
  id: string;
  type: PipelineStepType;
  title: string;
  status: "idle" | "running" | "completed" | "error";
  config?: any;
}

interface PipelineState {
  steps: PipelineStep[];
  isProcessing: boolean;
  activeStepId: string | null;
  addStep: (step: PipelineStep) => void;
  updateStepConfig: (id: string, config: any) => void;
  setStepStatus: (id: string, status: PipelineStep["status"]) => void;
  runPipeline: () => Promise<void>;
}

const sleep = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

export const usePipelineStore = create<PipelineState>((set, get) => ({
  steps: [
    { id: "1", type: "upload", title: "Product Upload", status: "idle" },
    { id: "2", type: "remove_bg", title: "Background Removal", status: "idle", config: { highFidelity: true } },
    { id: "3", type: "generate", title: "Scene Generation", status: "idle", config: { prompt: "" } },
    { id: "4", type: "upscale", title: "Upscale Resolution", status: "idle", config: { scale: "2x" } },
  ],
  isProcessing: false,
  activeStepId: null,

  addStep: (step) => set((state) => ({ steps: [...state.steps, step] })),
  
  updateStepConfig: (id, config) => set((state) => ({
    steps: state.steps.map(s => s.id === id ? { ...s, config: { ...s.config, ...config } } : s)
  })),

  setStepStatus: (id, status) => set((state) => ({
    steps: state.steps.map(s => s.id === id ? { ...s, status } : s)
  })),

  runPipeline: async () => {
    set({ isProcessing: true });
    
    const steps = get().steps;
    
    for (const step of steps) {
      set({ activeStepId: step.id });
      get().setStepStatus(step.id, "running");
      
      // Simulate API/Job wait time
      await sleep(2000); 
      
      get().setStepStatus(step.id, "completed");
    }
    
    set({ isProcessing: false, activeStepId: null });
  }
}));
