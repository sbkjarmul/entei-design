"use client";

import { useEffect, useRef, useState } from "react";

const CURSOR_SIZE = 24;
const CURSOR_COLOR = "#ff2400";
const SMOOTHING = 0.18; // 0 = instant, 1 = no movement
const SCALE_SMOOTHING = 0.2;
const HOVER_SCALE = 1.6;
const GLOW = `0 0 8px 1px ${CURSOR_COLOR}99, 0 0 4px ${CURSOR_COLOR}, inset 0 0 8px 1px ${CURSOR_COLOR}99, inset 0 0 4px ${CURSOR_COLOR}`;

export default function Cursor() {
  const ringRef = useRef<HTMLDivElement>(null);
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    // Only enable for devices with a precise pointer (mouse / trackpad).
    if (!window.matchMedia("(pointer: fine)").matches) return;

    setEnabled(true);

    const target = { x: window.innerWidth / 2, y: window.innerHeight / 2 };
    const current = { ...target };
    let scale = 1;
    let targetScale = 1;
    let frame = 0;
    let visible = false;
    let hovering = false;

    const isClickable = (x: number, y: number) => {
      const el = document.elementFromPoint(x, y);
      return !!el && window.getComputedStyle(el).cursor === "pointer";
    };

    const handleMove = (event: MouseEvent) => {
      target.x = event.clientX;
      target.y = event.clientY;

      const nextHovering = isClickable(target.x, target.y);
      if (nextHovering !== hovering) {
        hovering = nextHovering;
        targetScale = hovering ? HOVER_SCALE : 1;
        if (ringRef.current) {
          // Hover: enlarge + kill the glow. No fill, no border change.
          ringRef.current.style.boxShadow = hovering ? "none" : GLOW;
        }
      }

      if (!visible) {
        visible = true;
        current.x = target.x;
        current.y = target.y;
        if (ringRef.current) ringRef.current.style.opacity = "1";
      }
    };

    const handleLeave = () => {
      visible = false;
      if (ringRef.current) ringRef.current.style.opacity = "0";
    };

    const render = () => {
      current.x += (target.x - current.x) * SMOOTHING;
      current.y += (target.y - current.y) * SMOOTHING;
      scale += (targetScale - scale) * SCALE_SMOOTHING;

      if (ringRef.current) {
        ringRef.current.style.transform = `translate3d(${
          current.x - CURSOR_SIZE / 2
        }px, ${current.y - CURSOR_SIZE / 2}px, 0) scale(${scale})`;
      }

      frame = requestAnimationFrame(render);
    };

    window.addEventListener("mousemove", handleMove);
    document.documentElement.addEventListener("mouseleave", handleLeave);
    frame = requestAnimationFrame(render);

    return () => {
      window.removeEventListener("mousemove", handleMove);
      document.documentElement.removeEventListener("mouseleave", handleLeave);
      cancelAnimationFrame(frame);
    };
  }, []);

  if (!enabled) return null;

  return (
    <div
      ref={ringRef}
      aria-hidden="true"
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: CURSOR_SIZE,
        height: CURSOR_SIZE,
        borderRadius: "9999px",
        border: `2px solid ${CURSOR_COLOR}`,
        backgroundColor: "transparent",
        boxShadow: GLOW,
        pointerEvents: "none",
        zIndex: 9999,
        opacity: 0,
        willChange: "transform",
        transition: "box-shadow 0.2s ease",
      }}
    />
  );
}
