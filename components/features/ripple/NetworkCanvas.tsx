'use client';

import React, { useRef, useEffect } from 'react';
import { MotionValue } from 'framer-motion';

interface NetworkCanvasProps {
  density: MotionValue<number>;
}

export default function NetworkCanvas({ density }: NetworkCanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let width = canvas.width = window.innerWidth;
    let height = canvas.height = window.innerHeight;

    const nodes: {x: number, y: number, vx: number, vy: number}[] = [];
    
    // Create Nodes
    for(let i=0; i<100; i++) {
        nodes.push({
            x: Math.random() * width,
            y: Math.random() * height,
            vx: (Math.random() - 0.5) * 0.5,
            vy: (Math.random() - 0.5) * 0.5
        });
    }

    let animationId: number;
    
    const draw = () => {
        const currentDensity = density.get();
        
        if (currentDensity > 0) {
            ctx.clearRect(0, 0, width, height);
            ctx.fillStyle = 'white';
            ctx.strokeStyle = `rgba(45, 212, 191, ${currentDensity * 0.5})`; // Teal color

            nodes.forEach((node, i) => {
                // Move
                node.x += node.vx;
                node.y += node.vy;
                
                // Bounce
                if (node.x < 0 || node.x > width) node.vx *= -1;
                if (node.y < 0 || node.y > height) node.vy *= -1;

                // Draw Node
                ctx.globalAlpha = currentDensity;
                ctx.beginPath();
                ctx.arc(node.x, node.y, 2, 0, Math.PI * 2);
                ctx.fill();

                // Draw Connections
                for(let j=i+1; j<nodes.length; j++) {
                    const other = nodes[j];
                    const dx = node.x - other.x;
                    const dy = node.y - other.y;
                    const dist = Math.sqrt(dx*dx + dy*dy);

                    if (dist < 150) {
                        ctx.lineWidth = (1 - dist/150) * currentDensity;
                        ctx.beginPath();
                        ctx.moveTo(node.x, node.y);
                        ctx.lineTo(other.x, other.y);
                        ctx.stroke();
                    }
                }
            });
        } else {
            // Optimization: Don't draw if not visible
            ctx.clearRect(0, 0, width, height); 
        }

        animationId = requestAnimationFrame(draw);
    };
    
    draw();

    const resize = () => {
        width = canvas.width = window.innerWidth;
        height = canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', resize);
    return () => {
        window.removeEventListener('resize', resize);
        cancelAnimationFrame(animationId);
    };
  }, [density]);

  return <canvas ref={canvasRef} className="fixed inset-0 w-full h-full pointer-events-none z-15" />;
}

