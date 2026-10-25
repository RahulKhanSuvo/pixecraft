import { create } from "zustand";

interface EditingStore {
  editingId: string | null;
  startEditing: (id: string) => void;
  stopEditing: () => void;
}

export const useEditingStore = create<EditingStore>((set) => ({
  editingId: null,
  startEditing: (id) => set({ editingId: id }),
  stopEditing: () => set({ editingId: null }),
}));
