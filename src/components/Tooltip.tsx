import clsx from "clsx";
import React, { useRef, useEffect, ReactElement } from "react";

export const TOOLTIP_ALIGN = {
  BOTTOM_CENTER: "BOTTOM_CENTER",
  BOTTOM_LEFT: "BOTTOM_LEFT",
  BOTTOM_RIGHT: "BOTTOM_RIGHT",
  TOP_CENTER: "TOP_CENTER",
  TOP_LEFT: "TOP_LEFT",
  TOP_RIGHT: "TOP_RIGHT",
} as const;

export const BODY_OFFSET = {
  SPACE_6_NEGATIVE: "-24px",
  SPACE_5_NEGATIVE: "-20px",
  SPACE_4_NEGATIVE: "-16px",
  SPACE_3_NEGATIVE: "-12px",
  SPACE_2_NEGATIVE: "-8px",
  SPACE_1_NEGATIVE: "-4px",
  NO_OFFSET: "0px",
  SPACE_1: "4px",
  SPACE_2: "8px",
  SPACE_3: "12px",
  SPACE_4: "16px",
  SPACE_5: "20px",
  SPACE_6: "24px",
} as const;

type TObjectValues<T> = T[keyof T];

export type TTooltipAlign = TObjectValues<typeof TOOLTIP_ALIGN>;
export type TBodyOffset = TObjectValues<typeof BODY_OFFSET>;

export default function Tooltip({
  align = TOOLTIP_ALIGN.BOTTOM_CENTER,
  bodyOffsetY = BODY_OFFSET.NO_OFFSET,
  bodyOffsetX = BODY_OFFSET.NO_OFFSET,
  detachBody = false,
  fullWidth = false,
  isOpen = false,
  onClose,
  children,
}: {
  align?: TTooltipAlign;
  bodyOffsetY?: TBodyOffset;
  bodyOffsetX?: TBodyOffset;
  detachBody?: boolean;
  fullWidth?: boolean;
  isOpen: boolean;
  onClose: () => void;
  children: ReactElement[];
}) {
  const containerRef = useRef<HTMLDivElement>(null);

  const bodyOffsetStyle = () => {
    switch (align) {
      case TOOLTIP_ALIGN.BOTTOM_CENTER:
        return { top: `calc(100% + ${bodyOffsetY})` };
      case TOOLTIP_ALIGN.BOTTOM_LEFT:
        return { top: `calc(100% + ${bodyOffsetY})`, left: `${bodyOffsetX}` };
      case TOOLTIP_ALIGN.BOTTOM_RIGHT:
        return { top: `calc(100% + ${bodyOffsetY})`, right: `${bodyOffsetX}` };
      case TOOLTIP_ALIGN.TOP_CENTER:
        return { bottom: `calc(100% + ${bodyOffsetY})` };
      case TOOLTIP_ALIGN.TOP_LEFT:
        return {
          bottom: `calc(100% + ${bodyOffsetY})`,
          left: `${bodyOffsetX}`,
        };
      case TOOLTIP_ALIGN.TOP_RIGHT:
        return {
          bottom: `calc(100% + ${bodyOffsetY})`,
          right: `${bodyOffsetX}`,
        };
      default:
        return {};
    }
  };

  useEffect(() => {
    const handleOutsideClick = (e: Event) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(e.target as Node)
      ) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener("click", handleOutsideClick);
    }

    return () => {
      document.removeEventListener("click", handleOutsideClick);
    };
  }, [isOpen, onClose]);

  return (
    <div ref={containerRef} className={detachBody ? "static" : "relative"}>
      {children[0]}
      {isOpen && (
        <div
          className={clsx(
            "shadow-40 absolute z-40 h-fit rounded-lg bg-white p-3 text-start text-sm font-medium text-gray-900 shadow-lg ring-1 ring-black/5",
            fullWidth ? "w-full" : "w-[200px]",
            {
              "left-1/2 -translate-x-1/2":
                align === TOOLTIP_ALIGN.BOTTOM_CENTER ||
                align === TOOLTIP_ALIGN.TOP_CENTER,
              "-left-4":
                align === TOOLTIP_ALIGN.BOTTOM_LEFT ||
                align === TOOLTIP_ALIGN.TOP_LEFT,
              "-right-4":
                align === TOOLTIP_ALIGN.BOTTOM_RIGHT ||
                align === TOOLTIP_ALIGN.TOP_RIGHT,
            },
          )}
          style={bodyOffsetStyle()}
        >
          {children[1]}
        </div>
      )}
    </div>
  );
}
