
import { cn } from "@/lib/utils";

type FadeDirection = "up" | "down" | "left" | "right" | "none";

interface AnimationProps {
  direction?: FadeDirection;
  duration?: number;
  delay?: number;
  className?: string;
}

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
