import * as TooltipPrimitive from "@radix-ui/react-tooltip";
import React from "react";

export const Tooltip = ({ content, children, ...props }) => {
  return (
    <TooltipPrimitive.Provider>
      <TooltipPrimitive.Root>
        <TooltipPrimitive.Trigger asChild>
          <span>{children}</span>
        </TooltipPrimitive.Trigger>
        <TooltipPrimitive.Content
          side="top"
          align="center"
          sideOffset={4}
          className="bg-gray-800 text-white px-2 py-1 rounded shadow-lg"
          {...props}
        >
          {content}
          <TooltipPrimitive.Arrow className="fill-current text-gray-800" />
        </TooltipPrimitive.Content>
      </TooltipPrimitive.Root>
    </TooltipPrimitive.Provider>
  );
};
