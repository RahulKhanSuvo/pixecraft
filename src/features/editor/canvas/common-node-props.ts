import type { KonvaEventObject } from "konva/lib/Node";

export interface CommonNodeProps {
  id: string;
  x: number;
  y: number;
  width: number;
  height: number;
  rotation: number;
  opacity: number;
  draggable: boolean;
  onClick: (e: KonvaEventObject<MouseEvent>) => void;
  onTap: (e: KonvaEventObject<TouchEvent>) => void;
  onDragStart: (e: KonvaEventObject<DragEvent>) => void;
  onDragMove: (e: KonvaEventObject<DragEvent>) => void;
  onDragEnd: (e: KonvaEventObject<DragEvent>) => void;
}
