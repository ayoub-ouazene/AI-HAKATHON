import * as React from "react";
import * as SliderPrimitive from "@radix-ui/react-slider";
import { cn } from "@/lib/utils";

interface DualRangeSliderProps
    extends React.ComponentPropsWithoutRef<typeof SliderPrimitive.Root> {
    className?: string;
    label?: (value: number) => string;
}

const DualRangeSlider = React.forwardRef<
    React.ElementRef<typeof SliderPrimitive.Root>,
    DualRangeSliderProps
>(({ className, label, onValueChange, ...props }, ref) => {
    return (
        <SliderPrimitive.Root
            ref={ref}
            className={cn(
                "relative flex w-full touch-none select-none items-center",
                className
            )}
            onValueChange={onValueChange}
            {...props}
        >
            <SliderPrimitive.Track className="relative h-1.5 w-full grow overflow-hidden rounded-full bg-border">
                <SliderPrimitive.Range className="absolute h-full bg-primary" />
            </SliderPrimitive.Track>
            {props.value?.map((_, index) => (
                <SliderPrimitive.Thumb
                    key={index}
                    className="block h-6 w-6 rounded-full border border-primary/20 bg-background shadow-lg ring-offset-background transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 hover:scale-110"
                />
            ))}
        </SliderPrimitive.Root>
    );
});
DualRangeSlider.displayName = SliderPrimitive.Root.displayName;

export { DualRangeSlider };
