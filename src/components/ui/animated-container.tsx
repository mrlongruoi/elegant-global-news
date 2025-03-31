
import React from "react";
import { cn } from "@/lib/utils";
import { fadeAnimation, scaleAnimation, slideInAnimation } from "@/lib/animations";

type AnimationType = "fade" | "scale" | "slide";
type Direction = "up" | "down" | "left" | "right" | "none";

interface AnimatedContainerProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  type?: AnimationType;
  direction?: Direction;
  duration?: number;
  delay?: number;
  staggerChildren?: boolean;
  staggerDelay?: number;
  once?: boolean;
}

const AnimatedContainer = ({
  children,
  type = "fade",
  direction = "up",
  duration = 0.5,
  delay = 0,
  staggerChildren = false,
  staggerDelay = 0.1,
  once = true,
  className,
  ...props
}: AnimatedContainerProps) => {
  const getAnimationClasses = () => {
    switch (type) {
      case "fade":
        return fadeAnimation({ direction, duration, delay, className });
      case "scale":
        return scaleAnimation({ duration, delay, className });
      case "slide":
        return slideInAnimation({ direction, duration, delay, className });
      default:
        return className;
    }
  };

  // Handle staggered children
  const renderChildren = () => {
    if (!staggerChildren) {
      return children;
    }

    return React.Children.map(children, (child, index) => {
      if (!React.isValidElement(child)) return child;
      
      return React.cloneElement(child, {
        ...child.props,
        className: cn(
          child.props.className,
          type === "fade" 
            ? fadeAnimation({ direction, duration, delay: delay + index * staggerDelay }) 
            : type === "scale" 
              ? scaleAnimation({ duration, delay: delay + index * staggerDelay }) 
              : slideInAnimation({ direction, duration, delay: delay + index * staggerDelay })
        ),
      });
    });
  };

  return (
    <div className={cn(getAnimationClasses())} {...props}>
      {staggerChildren ? renderChildren() : children}
    </div>
  );
};

export { AnimatedContainer };
