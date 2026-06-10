import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-lg text-sm font-medium ring-offset-background transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground hover:bg-primary/90 shadow-soft hover:shadow-medium active:scale-[0.98]",
        destructive: "bg-destructive text-destructive-foreground hover:bg-destructive/90 shadow-soft",
        outline: "border-2 border-primary bg-transparent text-primary hover:bg-primary hover:text-primary-foreground",
        secondary: "bg-secondary text-secondary-foreground hover:bg-secondary/80 shadow-soft",
        ghost: "hover:bg-accent hover:text-accent-foreground",
        link: "text-primary underline-offset-4 hover:underline",
        nature: "bg-primary text-primary-foreground shadow-nature hover:bg-primary/90 hover:shadow-lg active:scale-[0.98] transition-all",
        sunrise: "bg-gradient-sunrise text-white shadow-medium hover:shadow-lg active:scale-[0.98] transition-all",
        hero: "bg-primary text-primary-foreground shadow-nature hover:bg-primary/90 hover:shadow-lg px-8 py-4 text-lg font-semibold active:scale-[0.98]",
        heroOutline: "border-2 border-primary/30 bg-card/50 backdrop-blur-sm text-foreground hover:bg-card hover:border-primary shadow-soft px-8 py-4 text-lg font-medium",
        action: "bg-card text-foreground shadow-medium hover:shadow-lg border border-border hover:border-primary/30 active:scale-[0.98]",
        fab: "rounded-full bg-primary text-primary-foreground shadow-nature hover:bg-primary/90 hover:shadow-lg p-4",
        glass: "bg-card/70 backdrop-blur-md text-foreground shadow-soft hover:bg-card/90 border border-border/50",
      },
      size: {
        default: "h-10 px-4 py-2",
        sm: "h-9 rounded-md px-3",
        lg: "h-12 rounded-lg px-6 text-base",
        xl: "h-14 rounded-xl px-8 text-lg",
        icon: "h-10 w-10",
        iconLg: "h-14 w-14",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return <Comp className={cn(buttonVariants({ variant, size, className }))} ref={ref} {...props} />;
  },
);
Button.displayName = "Button";

export { Button, buttonVariants };
