// IconComponentProps.ts
import React from "react";

export interface IconComponentProps {
  onClick?: (e: React.MouseEvent<HTMLElement>) => void;
  className?: string;
  iconType: 'svg' | 'img';
  iconContent: string | React.ReactNode; // Ahora puede ser un string o un React Node
}
