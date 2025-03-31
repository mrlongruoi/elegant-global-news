
import { cn } from "@/lib/utils";
import { MotionProps, Variant, Variants } from "framer-motion";

type FadeDirection = "up" | "down" | "left" | "right" | "none";

interface AnimationProps {
  direction?: FadeDirection;
  duration?: number;
  delay?: number;
  className?: string;
}

// For Tailwind classes (legacy)
export const fadeAnimation = ({
  direction = "up",
  duration = 0.5,
  delay = 0,
  className = "",
}: AnimationProps = {}) => {
  const directionStyles = {
    up: "motion-safe:translate-y-4",
    down: "motion-safe:-translate-y-4",
    left: "motion-safe:translate-x-4",
    right: "motion-safe:-translate-x-4",
    none: "",
  };

  return cn(
    "motion-safe:animate-in motion-safe:fade-in",
    directionStyles[direction],
    `motion-safe:duration-${duration * 100}`,
    delay > 0 && `motion-safe:delay-${delay * 100}`,
    className
  );
};

export const scaleAnimation = ({
  duration = 0.3,
  delay = 0,
  className = "",
}: Omit<AnimationProps, "direction"> = {}) => {
  return cn(
    "motion-safe:animate-in motion-safe:fade-in motion-safe:zoom-in-95",
    `motion-safe:duration-${duration * 100}`,
    delay > 0 && `motion-safe:delay-${delay * 100}`,
    className
  );
};

export const slideInAnimation = ({
  direction = "right",
  duration = 0.3,
  delay = 0,
  className = "",
}: AnimationProps = {}) => {
  const directionStyles = {
    up: "motion-safe:slide-in-from-bottom",
    down: "motion-safe:slide-in-from-top",
    left: "motion-safe:slide-in-from-right",
    right: "motion-safe:slide-in-from-left",
    none: "",
  };

  return cn(
    "motion-safe:animate-in motion-safe:fade-in",
    directionStyles[direction],
    `motion-safe:duration-${duration * 100}`,
    delay > 0 && `motion-safe:delay-${delay * 100}`,
    className
  );
};

// Framer Motion variants
export const fadeVariants = (
  direction: FadeDirection = "up",
  distance: number = 20
): Variants => {
  const directionMap = {
    up: { y: distance },
    down: { y: -distance },
    left: { x: distance },
    right: { x: -distance },
    none: {},
  };

  return {
    hidden: {
      opacity: 0,
      ...directionMap[direction],
    },
    visible: {
      opacity: 1,
      x: 0,
      y: 0,
      transition: {
        duration: 0.5,
        ease: "easeOut",
      },
    },
  };
};

export const scaleVariants: Variants = {
  hidden: {
    opacity: 0,
    scale: 0.95,
  },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      duration: 0.4,
      ease: "easeOut",
    },
  },
};

export const staggerContainerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.1,
    },
  },
};

export const imageHoverVariants: Variants = {
  initial: { scale: 1 },
  hover: { scale: 1.05, transition: { duration: 0.5, ease: "easeOut" } },
};

export const cardHoverVariants: Variants = {
  initial: { y: 0, boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1)" },
  hover: { 
    y: -5, 
    boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.1)", 
    transition: { duration: 0.3, ease: "easeOut" } 
  },
};

export const pageTransitionVariants: Variants = {
  initial: { opacity: 0 },
  animate: { opacity: 1, transition: { duration: 0.5 } },
  exit: { opacity: 0, transition: { duration: 0.3 } },
};

// For custom scroll-triggered animations
export const scrollFadeUpVariants: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: { 
    opacity: 1, 
    y: 0, 
    transition: {
      duration: 0.6,
      ease: "easeOut"
    }
  }
};

// For button hover effects
export const buttonHoverVariants: Variants = {
  initial: { scale: 1 },
  hover: { scale: 1.05, transition: { duration: 0.2 } },
  tap: { scale: 0.98, transition: { duration: 0.1 } },
};
