import { create } from "zustand";
import { revokeAllObjectUrls } from "../lib/object-url-registry";
import type { DocumentSnapshot, EditorNode } from "../types/editor-node";

interface DocumentStore extends DocumentSnapshot {
  past: DocumentSnapshot[];
  future: DocumentSnapshot[];
  tx: { before: DocumentSnapshot } | null;

  undo: () => void;
  redo: () => void;
  beginTransaction: () => void;
  endTransaction: () => void;
  cancelTransaction: () => void;

  addNode: (node: EditorNode, index?: number) => void;
  updateNode: (id: string, patch: Partial<EditorNode>) => void;
  removeNodes: (ids: string[]) => void;
  reorderNode: (id: string, toIndex: number) => void;
  setBackground: (color: string) => void;
  setDocumentSize: (width: number, height: number) => void;
  reset: (init?: Partial<DocumentSnapshot>) => void;
}

const takeSnapshot = (s: DocumentSnapshot): DocumentSnapshot => ({
  width: s.width,
  height: s.height,
  background: s.background,
  nodes: s.nodes.map((n) => ({ ...n })),
});

const defaults: DocumentSnapshot = {
  width: 1080,
  height: 1080,
  background: "#ffffff",
  nodes: [],
};

export const useDocumentStore = create<DocumentStore>((set, get) => ({
  ...defaults,
  past: [],
  future: [],
  tx: null,

  beginTransaction: () => {
    if (get().tx) return;
    set({ tx: { before: takeSnapshot(get()) } });
  },

  endTransaction: () => {
    const { tx, past } = get();
    if (!tx) return;
    set({ past: [...past, tx.before], future: [], tx: null });
  },

  cancelTransaction: () => {
    const { tx } = get();
    if (!tx) return;
    set({ ...tx.before, tx: null });
  },

  undo: () =>
    set((s) => {
      if (s.past.length === 0) return s;
      const previous = s.past[s.past.length - 1];
      return {
        ...previous,
        past: s.past.slice(0, -1),
        future: [takeSnapshot(s), ...s.future],
        tx: null,
      };
    }),

  redo: () =>
    set((s) => {
      if (s.future.length === 0) return s;
      const [next, ...rest] = s.future;
      return {
        ...next,
        past: [...s.past, takeSnapshot(s)],
        future: rest,
        tx: null,
      };
    }),

  addNode: (node, index) =>
    set((s) => {
      const nodes = [...s.nodes];
      if (index === undefined) nodes.push(node);
      else nodes.splice(index, 0, node);
      return { past: [...s.past, takeSnapshot(s)], future: [], nodes };
    }),

  updateNode: (id, patch) =>
    set((s) => ({
      nodes: s.nodes.map((n) =>
        n.id === id ? ({ ...n, ...patch } as EditorNode) : n,
      ),
    })),

  removeNodes: (ids) =>
    set((s) => ({
      past: [...s.past, takeSnapshot(s)],
      future: [],
      nodes: s.nodes.filter((n) => !ids.includes(n.id)),
    })),

  reorderNode: (id, toIndex) =>
    set((s) => {
      const from = s.nodes.findIndex((n) => n.id === id);
      if (from === -1) return s;
      const nodes = [...s.nodes];
      const [node] = nodes.splice(from, 1);
      nodes.splice(toIndex, 0, node);
      return { past: [...s.past, takeSnapshot(s)], future: [], nodes };
    }),

  setBackground: (color) =>
    set((s) => ({
      past: [...s.past, takeSnapshot(s)],
      future: [],
      background: color,
    })),

  setDocumentSize: (width, height) =>
    set((s) => ({
      past: [...s.past, takeSnapshot(s)],
      future: [],
      width,
      height,
    })),

  reset: (init) => {
    revokeAllObjectUrls();
    set({ ...defaults, ...init, past: [], future: [], tx: null });
  },
}));
