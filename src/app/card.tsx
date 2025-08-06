
'use client';

import {
  Card as CardRoot,
  CardHeader as CardHeaderRoot,
  CardFooter as CardFooterRoot,
  CardTitle as CardTitleRoot,
  CardDescription as CardDescriptionRoot,
  CardContent as CardContentRoot,
} from '@/components/ui/card';
import { cn } from '@/lib/utils';
import React from 'react';

const Card = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <CardRoot ref={ref} className={cn(className)} {...props} />
));
Card.displayName = 'Card';

const CardHeader = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <CardHeaderRoot ref={ref} className={cn(className)} {...props} />
));
CardHeader.displayName = 'CardHeader';

const CardFooter = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <CardFooterRoot ref={ref} className={cn(className)} {...props} />
));
CardFooter.displayName = 'CardFooter';

const CardTitle = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <CardTitleRoot
    ref={ref}
    className={cn(className)}
    {...props}
    suppressHydrationWarning
  />
));
CardTitle.displayName = 'CardTitle';

const CardDescription = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <CardDescriptionRoot
    ref={ref}
    className={cn(className)}
    {...props}
    suppressHydrationWarning
  />
));
CardDescription.displayName = 'CardDescription';

const CardContent = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <CardContentRoot ref={ref} className={cn(className)} {...props} />
));
CardContent.displayName = 'CardContent';

export {
  Card,
  CardHeader,
  CardFooter,
  CardTitle,
  CardDescription,
  CardContent,
};
