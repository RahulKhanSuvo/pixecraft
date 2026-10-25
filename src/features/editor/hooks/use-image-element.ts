import { useEffect, useState } from "react";
import { loadImage } from "../lib/image-loader";

type ImageStatus = "loading" | "loaded" | "error";

interface ImageState {
  image?: HTMLImageElement;
  status: ImageStatus;
}

export function useImageElement(src: string): ImageState {
  const [state, setState] = useState<ImageState>({ status: "loading" });

  useEffect(() => {
    let cancelled = false;
    setState({ status: "loading" });

    loadImage(src).then(
      (image) => {
        if (!cancelled) setState({ image, status: "loaded" });
      },
      () => {
        if (!cancelled) setState({ status: "error" });
      },
    );

    return () => {
      cancelled = true;
    };
  }, [src]);

  return state;
}
