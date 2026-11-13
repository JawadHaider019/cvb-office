'use client';
import React from 'react';
import { motion } from 'motion/react';
export const ScrollReveal = ({ children, delay = 0, direction = 'up', distance = 24, duration = 0.6, className = '', once = true, }) => {
    const getInitialPosition = () => {
        switch (direction) {
            case 'up':
                return { y: distance, x: 0 };
            case 'down':
                return { y: -distance, x: 0 };
            case 'left':
                return { x: distance, y: 0 };
            case 'right':
                return { x: -distance, y: 0 };
            case 'none':
            default:
                return { x: 0, y: 0 };
        }
    };
    const initial = {
        opacity: 0,
        ...getInitialPosition(),
    };
    return (<motion.div initial={initial} whileInView={{ opacity: 1, x: 0, y: 0 }} viewport={{ once, margin: '-40px' }} transition={{
            duration,
            delay,
            ease: [0.21, 0.47, 0.32, 0.98],
        }} className={className}>
      {children}
    </motion.div>);
};
export const StaggerContainer = ({ children, className = '', staggerDelay = 0.12, delay = 0 }) => {
    const containerVariants = {
        hidden: { opacity: 0 },
        show: {
            opacity: 1,
            transition: {
                staggerChildren: staggerDelay,
                delayChildren: delay,
            },
        },
    };
    return (<motion.div variants={containerVariants} initial="hidden" whileInView="show" viewport={{ once: true, margin: '-60px' }} className={className}>
      {children}
    </motion.div>);
};
export const StaggerItem = ({ children, className = '', yOffset = 28 }) => {
    const itemVariants = {
        hidden: { opacity: 0, y: yOffset },
        show: {
            opacity: 1,
            y: 0,
            transition: {
                duration: 0.65,
                ease: [0.21, 0.47, 0.32, 0.98],
            },
        },
    };
    return (<motion.div variants={itemVariants} className={className}>
      {children}
    </motion.div>);
};
