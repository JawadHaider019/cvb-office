'use client';
import React, { useEffect, useState } from 'react';
import { motion, useMotionValue, useSpring } from 'motion/react';
export const CustomCursor = () => {
    const [isVisible, setIsVisible] = useState(false);
    const [cursorType, setCursorType] = useState('default');
    const [isTouchDevice, setIsTouchDevice] = useState(true);
    // Exact mouse coordinate tracking
    const mouseX = useMotionValue(-100);
    const mouseY = useMotionValue(-100);
    // Tightly coupled spring for the inner pinpoint dot
    const dotSpringConfig = { damping: 45, stiffness: 1000, mass: 0.1 };
    const dotX = useSpring(mouseX, dotSpringConfig);
    const dotY = useSpring(mouseY, dotSpringConfig);
    // Gracefully lagged spring for the outer architectural following ring
    const ringSpringConfig = { damping: 26, stiffness: 280, mass: 0.4 };
    const ringX = useSpring(mouseX, ringSpringConfig);
    const ringY = useSpring(mouseY, ringSpringConfig);
    useEffect(() => {
        // Only enable on desktop pointer devices
        const checkPointer = () => {
            const hasFinePointer = window.matchMedia('(hover: hover) and (pointer: fine)').matches;
            setIsTouchDevice(!hasFinePointer);
        };
        checkPointer();
        window.addEventListener('resize', checkPointer);
        const handleMouseMove = (e) => {
            if (isTouchDevice)
                return;
            mouseX.set(e.clientX);
            mouseY.set(e.clientY);
            if (!isVisible)
                setIsVisible(true);
            // Check hovered element
            const target = e.target;
            if (!target)
                return;
            const ctaElement = target.closest('button, a, [role="button"], input[type="submit"], input[type="button"], .cursor-pointer');
            if (ctaElement) {
                // Check if it's a primary CTA button
                const isPrimaryCta = ctaElement.classList.contains('tech-cta-primary') ||
                    ctaElement.textContent?.includes('buchen') ||
                    ctaElement.textContent?.includes('anfragen') ||
                    ctaElement.textContent?.includes('testen') ||
                    ctaElement.tagName === 'BUTTON';
                setCursorType(isPrimaryCta ? 'cta' : 'hover');
            }
            else {
                setCursorType('default');
            }
        };
        const handleMouseDown = () => {
            setCursorType('click');
        };
        const handleMouseUp = (e) => {
            const target = e.target;
            const ctaElement = target?.closest('button, a, [role="button"], .cursor-pointer');
            setCursorType(ctaElement ? 'cta' : 'default');
        };
        const handleMouseLeave = () => {
            setIsVisible(false);
        };
        const handleMouseEnter = () => {
            setIsVisible(true);
        };
        window.addEventListener('mousemove', handleMouseMove, { passive: true });
        window.addEventListener('mousedown', handleMouseDown);
        window.addEventListener('mouseup', handleMouseUp);
        document.documentElement.addEventListener('mouseleave', handleMouseLeave);
        document.documentElement.addEventListener('mouseenter', handleMouseEnter);
        return () => {
            window.removeEventListener('resize', checkPointer);
            window.removeEventListener('mousemove', handleMouseMove);
            window.removeEventListener('mousedown', handleMouseDown);
            window.removeEventListener('mouseup', handleMouseUp);
            document.documentElement.removeEventListener('mouseleave', handleMouseLeave);
            document.documentElement.removeEventListener('mouseenter', handleMouseEnter);
        };
    }, [isTouchDevice, isVisible, mouseX, mouseY]);
    // Don't render on touch screens or when hidden outside viewport
    if (isTouchDevice || !isVisible) {
        return null;
    }
    // Ring dimensions and styles based on CVB palette
    const ringVariants = {
        default: {
            width: 32,
            height: 32,
            borderWidth: 1,
            borderColor: 'rgba(160, 144, 72, 0.45)', // Gold
            backgroundColor: 'rgba(160, 144, 72, 0.05)',
            boxShadow: '0 0 0px 0px rgba(160, 144, 72, 0)',
            scale: 1,
        },
        hover: {
            width: 48,
            height: 48,
            borderWidth: 1.5,
            borderColor: 'rgba(136, 144, 40, 0.85)', // Olive green
            backgroundColor: 'rgba(136, 144, 40, 0.12)',
            boxShadow: '0 0 20px 2px rgba(136, 144, 40, 0.25)',
            scale: 1.15,
        },
        cta: {
            width: 62,
            height: 62,
            borderWidth: 2,
            borderColor: 'rgba(56, 72, 8, 0.95)', // Dark olive green
            backgroundColor: 'rgba(160, 144, 72, 0.2)',
            boxShadow: '0 0 25px 3px rgba(56, 72, 8, 0.35)',
            scale: 1.25,
        },
        click: {
            width: 26,
            height: 26,
            borderWidth: 2,
            borderColor: '#384808',
            backgroundColor: 'rgba(56, 72, 8, 0.35)',
            boxShadow: '0 0 12px 2px rgba(56, 72, 8, 0.4)',
            scale: 0.85,
        },
    };
    const dotVariants = {
        default: {
            scale: 1,
            backgroundColor: '#889028', // Olive green
            opacity: 1,
        },
        hover: {
            scale: 1.4,
            backgroundColor: '#A09048', // Gold
            opacity: 1,
        },
        cta: {
            scale: 1.8,
            backgroundColor: '#384808', // Dark olive
            opacity: 1,
        },
        click: {
            scale: 0.6,
            backgroundColor: '#384808',
            opacity: 1,
        },
    };
    return (<div className="pointer-events-none fixed inset-0 z-[9999] overflow-hidden">
      {/* 1. Outer Following Ring */}
      <motion.div className="fixed top-0 left-0 rounded-full pointer-events-none -translate-x-1/2 -translate-y-1/2 will-change-transform" style={{
            x: ringX,
            y: ringY,
        }} variants={ringVariants} animate={cursorType} transition={{
            type: 'spring',
            stiffness: 420,
            damping: 28,
        }}/>

      {/* 2. Inner Precision Center Dot */}
      <motion.div className="fixed top-0 left-0 w-2 h-2 rounded-full pointer-events-none -translate-x-1/2 -translate-y-1/2 shadow-xs will-change-transform" style={{
            x: dotX,
            y: dotY,
        }} variants={dotVariants} animate={cursorType} transition={{
            type: 'spring',
            stiffness: 550,
            damping: 24,
        }}/>
    </div>);
};
