
import React, { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface PixelCardProps {
  className?: string;
  children: ReactNode;
  onClick?: () => void;
  isSelected?: boolean;
  activeColor?: string;
  variant?: "default" | "shadow" | "bordered";
}

export const PixelCard = ({
  className,
  children,
  onClick,
  isSelected,
  activeColor = "rgba(255,255,255,0.2)",
  variant = "default",
}: PixelCardProps) => {
  return (
    <div
      onClick={onClick}
      className={cn(
        "group relative cursor-pointer overflow-hidden rounded-xl bg-black p-0.5 transition-all duration-300",
        isSelected && "ring-2 ring-offset-2",
        isSelected && activeColor && `ring-[${activeColor}]`,
        variant === "shadow" && "shadow-xl",
        variant === "bordered" && "border border-white/10",
        className
      )}
    >
      <div className="absolute inset-0 z-10 opacity-20 filter blur-xl transition-all duration-300 group-hover:opacity-30">
        <div className="pixel-corner-tl" />
        <div className="pixel-corner-tr" />
        <div className="pixel-corner-bl" />
        <div className="pixel-corner-br" />
      </div>
      
      <div className="relative z-20 overflow-hidden rounded-[10px] bg-black p-4">
        {children}
      </div>
      
      <div className="absolute inset-0 z-0 overflow-hidden rounded-xl">
        <div className="pixel-grid"></div>
      </div>
    </div>
  );
};
