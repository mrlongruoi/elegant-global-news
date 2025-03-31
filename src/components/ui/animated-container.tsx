
import React from "react";
import { cn } from "@/lib/utils";
import { motion, HTMLMotionProps } from "framer-motion";
import { 
  fadeAnimation, 
  scaleAnimation, 
  slideInAnimation,
  fadeVariants,
  scaleVariants,
  staggerContainerVariants,
  scrollFadeUpVariants
} from "@/lib/animations";

type AnimationType = "fade" | "scale" | "slide" | "stagger" | "scroll";
type Direction = "up" | "down" | "left" | "right" | "none";

// Using HTMLMotionProps<"div"> instead of extending both HTMLAttributes and MotionProps
interface AnimatedContainerProps extends HTMLMotionProps<"div"> {
  children: React.ReactNode;
  type?: AnimationType;
  direction?: Direction;
  duration?: number;
  delay?: number;
  staggerChildren?: boolean;
  staggerDelay?: number;
  once?: boolean;
  distance?: number;
  useTailwind?: boolean; // Whether to use Tailwind or Framer Motion for animations
  viewport?: {
    once?: boolean;
    margin?: string;
    amount?: "some" | "all" | number;
  };
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
  distance = 20,
  className,
  useTailwind = false, // By default, use Framer Motion
  viewport = { once: true, margin: "-100px" },
  ...props
}: AnimatedContainerProps) => {
  
  // For backwards compatibility with Tailwind animations
  const getTailwindAnimationClasses = () => {
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
  
  // Use Tailwind for animations if specified
  if (useTailwind) {
    // Handle staggered children with Tailwind
    const renderTailwindChildren = () => {
      if (!staggerChildren) return children;
      
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
      <div className={cn(getTailwindAnimationClasses())} {...props}>
        {staggerChildren ? renderTailwindChildren() : children}
      </div>
    );
  }
  
  // Use Framer Motion for animations
  const getMotionVariants = () => {
    switch (type) {
      case "fade":
        return fadeVariants(direction, distance);
      case "scale":
        return scaleVariants;
      case "stagger":
        return staggerContainerVariants;
      case "scroll":
        return scrollFadeUpVariants;
      default:
        return fadeVariants(direction, distance);
    }
  };

  const getTransition = () => {
    return {
      duration,
      delay,
      ease: "easeOut",
    };
  };
  
  // For staggered children with Framer Motion
  const renderFramerMotionChildren = () => {
    if (!staggerChildren) return children;
    
    return React.Children.map(children, (child, index) => {
      if (!React.isValidElement(child)) return child;
      
      // If child is already a motion component, just add variants
      if (child.type === motion.div) {
        return React.cloneElement(child, {
          ...child.props,
          variants: child.props.variants || fadeVariants(direction),
          custom: index,
        });
      }
      
      // Wrap non-motion components
      return (
        <motion.div
          key={index}
          variants={fadeVariants(direction)}
          custom={index}
          className={child.props.className}
        >
          {child}
        </motion.div>
      );
    });
  };
  
  // For scroll-triggered animations
  if (type === "scroll") {
    return (
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={viewport}
        variants={scrollFadeUpVariants}
        transition={getTransition()}
        className={cn(className)}
        {...props}
      >
        {children}
      </motion.div>
    );
  }
  
  // For staggered container with Framer Motion
  if (staggerChildren && type === "stagger") {
    return (
      <motion.div
        initial="hidden"
        animate="visible"
        variants={staggerContainerVariants}
        className={cn(className)}
        {...props}
      >
        {renderFramerMotionChildren()}
      </motion.div>
    );
  }
  
  // Default Framer Motion animation
  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={getMotionVariants()}
      transition={getTransition()}
      className={cn(className)}
      {...props}
    >
      {children}
    </motion.div>
  );
};

export { AnimatedContainer };
