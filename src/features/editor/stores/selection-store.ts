import { create } from "zustand";

interface SelectionStore {
  selectedIds: string[];
  hoveredId: string | null;
  select: (id: string) => void;
  selectMany: (ids: string[]) => void;
  toggle: (id: string) => void;
  clear: () => void;
  setHovered: (id: string | null) => void;
}

export const useSelectionStore = create<SelectionStore>((set) => ({
  selectedIds: [],
  hoveredId: null,
  select: (id) => set({ selectedIds: [id] }),
  selectMany: (ids) => set({ selectedIds: ids }),
  toggle: (id) =>
    set((s) => ({
      selectedIds: s.selectedIds.includes(id)
        ? s.selectedIds.filter((x) => x !== id)
        : [...s.selectedIds, id],
    })),
  clear: () => set({ selectedIds: [] }),
  setHovered: (id) => set({ hoveredId: id }),
}));
