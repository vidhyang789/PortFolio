import { useRef, useEffect, useState } from 'react';
import './CustomCursor.css';

export default function CustomCursor() {
  const dotRef  = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const [hidden, setHidden] = useState(false);

  useEffect(() => {
    // Hide on touch devices
    const isTouch = window.matchMedia('(pointer: coarse)').matches;
    if (isTouch) { setHidden(true); return; }

    const dot  = dotRef.current;
    const ring = ringRef.current;
    if (!dot || !ring) return;

    /* ── State ─────────────────────────────────────────────────── */
    let mx = -200, my = -200;   // raw mouse position
    let rx = -200, ry = -200;   // ring position (lagged)
    let isHover  = false;       // hovering an interactive element
    let isDown   = false;       // mouse pressed
    let rafId: number;

    /* ── Click ripple spawn ─────────────────────────────────────── */
    const spawnRipple = (x: number, y: number) => {
      const rip = document.createElement('div');
      rip.className = 'cursor__ripple';
      rip.style.left = `${x}px`;
      rip.style.top  = `${y}px`;
      document.body.appendChild(rip);
      rip.addEventListener('animationend', () => rip.remove(), { once: true });
    };

    /* ── Mouse events ───────────────────────────────────────────── */
    const onMove = (e: MouseEvent) => {
      mx = e.clientX;
      my = e.clientY;

      // Detect pointer/interactive element
      const el = document.elementFromPoint(mx, my) as HTMLElement | null;
      if (el) {
        const tag    = el.tagName.toLowerCase();
        const cursor = window.getComputedStyle(el).cursor;
        isHover = cursor === 'pointer' || tag === 'a' || tag === 'button' ||
                  el.getAttribute('role') === 'button' ||
                  !!el.closest('a, button, [role="button"]');
      }
    };

    const onDown  = () => { isDown = true; };
    const onUp    = (e: MouseEvent) => {
      isDown = false;
      spawnRipple(e.clientX, e.clientY);
    };
    const onLeave = () => { mx = -300; my = -300; };
    const onEnter = () => {};

    window.addEventListener('mousemove',   onMove);
    window.addEventListener('mousedown',   onDown);
    window.addEventListener('mouseup',     onUp);
    document.addEventListener('mouseleave', onLeave);
    document.addEventListener('mouseenter', onEnter);

    /* ── RAF render loop ────────────────────────────────────────── */
    const loop = () => {
      // Ring lags behind with lerp
      rx += (mx - rx) * 0.10;
      ry += (my - ry) * 0.10;

      // Dot: exact position
      dot.style.transform  = `translate(${mx - 5}px, ${my - 5}px) scale(${isDown ? 0.6 : 1})`;

      // Ring: lagged + morphs on hover
      const ringScale = isHover ? 1.6 : (isDown ? 0.8 : 1);
      ring.style.transform = `translate(${rx - 22}px, ${ry - 22}px) scale(${ringScale})`;
      ring.style.borderColor = isHover
        ? 'rgba(188,251,43,0.85)'
        : 'rgba(255,255,255,0.35)';
      ring.style.backgroundColor = isHover
        ? 'rgba(188,251,43,0.06)'
        : 'transparent';

      rafId = requestAnimationFrame(loop);
    };
    loop();

    /* ── Cleanup ────────────────────────────────────────────────── */
    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener('mousemove',   onMove);
      window.removeEventListener('mousedown',   onDown);
      window.removeEventListener('mouseup',     onUp);
      document.removeEventListener('mouseleave', onLeave);
      document.removeEventListener('mouseenter', onEnter);
    };
  }, []);

  if (hidden) return null;

  return (
    <>
      <div ref={dotRef}  className="cursor__dot"  aria-hidden="true" />
      <div ref={ringRef} className="cursor__ring" aria-hidden="true" />
    </>
  );
}
