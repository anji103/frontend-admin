import * as React from "react";

import { cn } from "@/lib/utils";

/**
 * Card — standard elevated surface.
 * GlassCard — glassmorphism surface used on auth pages.
 *
 * Both share the same sub-components (CardHeader, CardContent, etc.)
 * so you can swap the wrapper without changing the interior.
 */

/* ------------------------------------------------------------------ */
/*  Card                                                                */
/* ------------------------------------------------------------------ */

function Card({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card"
      className={cn("bg-card text-card-foreground flex flex-col rounded-xl shadow-md", className)}
      {...props}
    />
  );
}

/* ------------------------------------------------------------------ */
/*  GlassCard                                                           */
/*  Glassmorphism surface matching the Figma login card:               */
/*  white/20 fill, backdrop-blur-xl, brand-blue border, rounded-2xl.   */
/* ------------------------------------------------------------------ */

function GlassCard({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card"
      data-variant="glass"
      className={cn(
        "glass",
        "flex flex-col",
        "rounded-[1rem] border border-[var(--brand-blue)]",
        "bg-[rgba(255,255,255,0.2)] p-[3.75rem] shadow-[0px_0px_2px_0px_rgba(0,0,0,0.15)]",
        "text-card-foreground backdrop-blur-[20px]",
        className
      )}
      {...props}
    />
  );
}

/* ------------------------------------------------------------------ */
/*  Shared sub-components                                               */
/* ------------------------------------------------------------------ */

function CardHeader({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div data-slot="card-header" className={cn("flex flex-col gap-1.5", className)} {...props} />
  );
}

function CardTitle({ className, ...props }: React.ComponentProps<"h3">) {
  return (
    <h3
      data-slot="card-title"
      className={cn("text-2xl leading-tight font-bold tracking-tight", className)}
      {...props}
    />
  );
}

function CardDescription({ className, ...props }: React.ComponentProps<"p">) {
  return (
    <p
      data-slot="card-description"
      className={cn("text-muted-foreground text-sm leading-normal", className)}
      {...props}
    />
  );
}

function CardContent({ className, ...props }: React.ComponentProps<"div">) {
  return <div data-slot="card-content" className={cn("", className)} {...props} />;
}

function CardFooter({ className, ...props }: React.ComponentProps<"div">) {
  return <div data-slot="card-footer" className={cn("flex items-center", className)} {...props} />;
}

export { Card, GlassCard, CardHeader, CardFooter, CardTitle, CardDescription, CardContent };
