"use client";

import { useDocumentStore } from "../stores/document-store";
import { NodeRenderer } from "./node-renderer";

export function NodesLayer() {
  const nodes = useDocumentStore((s) => s.nodes);
  return (
    <>
      {nodes.map((node) => (
        <NodeRenderer key={node.id} node={node} />
      ))}
    </>
  );
}
