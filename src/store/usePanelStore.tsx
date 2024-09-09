import { create } from "zustand";

type PanelState = {
   leftPanel: boolean;
   rightPanel: boolean;
   setLeftPanel: (q: boolean) => void;
   setRightPanel: (q: boolean) => void;
};

export const usePanelStore = create<PanelState>((set) => ({
   leftPanel: false,
   rightPanel: false,
   setLeftPanel: (q) => set({ leftPanel: q }),
   setRightPanel: (q) => set({ rightPanel: q }),
}));
