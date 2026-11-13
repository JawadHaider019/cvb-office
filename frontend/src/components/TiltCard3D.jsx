'use client';
import React, { useRef, useState } from 'react';
/**
 * High-performance 3D perspective tilt container with dynamic specular glare.
 * Responds to pointer movements with physical depth and momentum.
 */
export const TiltCard3D = ({ children, className = '', maxTilt = 7, glare = true, }) => {
    const cardRef = useRef(null);
    const [transform, setTransform] = useState('');
    const [glareStyle, setGlareStyle] = useState({ opacity: 0, x: 50, y: 50 });
    const handleMouseMove = (e) => {
        if (!cardRef.current)
            return;
        const rect = cardRef.current.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        const xPct = (x / rect.width - 0.5) * 2; // -1 to 1
        const yPct = (y / rect.height - 0.5) * 2; // -1 to 1
        const rotX = -yPct * maxTilt;
        const rotY = xPct * maxTilt;
        setTransform(`perspective(1000px) rotateX(${rotX.toFixed(2)}deg) rotateY(${rotY.toFixed(2)}deg) translateZ(6px)`);
        setGlareStyle({
            opacity: 0.18,
            x: (x / rect.width) * 100,
            y: (y / rect.height) * 100,
        });
    };
    const handleMouseLeave = () => {
        setTransform('perspective(1000px) rotateX(0deg) rotateY(0deg) translateZ(0px)');
        setGlareStyle((prev) => ({ ...prev, opacity: 0 }));
    };
    return (<div ref={cardRef} onMouseMove={handleMouseMove} onMouseLeave={handleMouseLeave} style={{
            transform,
            transition: 'transform 0.18s cubic-bezier(0.2, 0.8, 0.2, 1)',
            transformStyle: 'preserve-3d',
        }} className={`relative group ${className}`}>
      {children}

      {glare && (<div className="pointer-events-none absolute inset-0 rounded-[inherit] transition-opacity duration-300" style={{
                opacity: glareStyle.opacity,
                background: `radial-gradient(circle at ${glareStyle.x}% ${glareStyle.y}%, rgba(255,255,255,0.7) 0%, rgba(255,255,255,0) 65%)`,
            }}/>)}
    </div>);
};
