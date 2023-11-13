// IconComponentProps.ts
import React from "react";

export interface IconComponentProps {
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
  className?: string;
  iconType: 'svg' | 'img';
  iconContent: string | React.ReactNode; // Ahora puede ser un string o un React Node
}
