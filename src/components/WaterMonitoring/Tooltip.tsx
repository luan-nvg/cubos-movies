import React, { useState, useRef, ReactElement, ReactNode } from "react";

// Define interface for Tooltip props
interface TooltipProps {
  children: ReactNode;
  id: string;
  className?: string;
}

// Simple Tooltip component that doesn't rely on styled-components
export function Tooltip({
  children,
  id,
  className = "",
}: TooltipProps): ReactElement {
  return (
    <div
      role="tooltip"
      id={id}
      className={`tooltip ${className}`}
      style={{
        zIndex: 99999999,
        backgroundColor: "rgba(97, 97, 97, 0.9)",
        color: "white",
        padding: "6px 10px",
        borderRadius: "4px",
        fontSize: "0.875rem",
        maxWidth: "200px",
        pointerEvents: "none",
      }}
    >
      {children}
    </div>
  );
}

// Define types for placement
type TooltipPlacement = "top" | "bottom" | "left" | "right";

// Define interface for OverlayTrigger props
interface OverlayTriggerProps {
  overlay: ReactElement;
  placement?: TooltipPlacement;
  children: ReactElement;
  delayShow?: number;
  delayHide?: number;
}

// Define types for position and arrow styles
interface PositionStyle {
  top?: string | number;
  bottom?: string | number;
  left?: string | number;
  right?: string | number;
  transform?: string;
}

interface ArrowStyle {
  top?: string;
  bottom?: string;
  left?: string;
  right?: string;
  marginLeft?: string;
  marginTop?: string;
  borderWidth?: string;
  borderColor?: string;
}

export function OverlayTrigger({
  overlay,
  placement = "top",
  children,
  delayShow = 0,
  delayHide = 0,
}: OverlayTriggerProps): ReactElement {
  const [show, setShow] = useState<boolean>(false);
  const [tooltipPosition, setTooltipPosition] = useState<PositionStyle>({});
  const [arrowStyle, setArrowStyle] = useState<ArrowStyle>({});
  const timeout = useRef<NodeJS.Timeout | null>(null);
  const triggerRef = useRef<HTMLElement | null>(null);
  const tooltipId = `tooltip-${Math.random().toString(36).substring(2, 9)}`;

  const handleShow = (): void => {
    if (timeout.current) {
      clearTimeout(timeout.current);
    }
    timeout.current = setTimeout(() => {
      calculatePosition();
      setShow(true);
    }, delayShow);
  };

  const handleHide = (): void => {
    if (timeout.current) {
      clearTimeout(timeout.current);
    }
    timeout.current = setTimeout(() => setShow(false), delayHide);
  };

  // Function to calculate tooltip position
  const calculatePosition = (): void => {
    if (!triggerRef.current) return;

    const triggerRect = triggerRef.current.getBoundingClientRect();
    const position: PositionStyle = {};
    const arrow: ArrowStyle = {};

    switch (placement) {
      case "top":
        position.bottom = window.innerHeight - triggerRect.top + 8;
        position.left = triggerRect.left + triggerRect.width / 2;
        position.transform = "translateX(-50%)";

        arrow.top = "100%";
        arrow.left = "50%";
        arrow.marginLeft = "-6px";
        arrow.borderWidth = "6px 6px 0 6px";
        arrow.borderColor =
          "rgba(97, 97, 97, 0.9) transparent transparent transparent";
        break;

      case "bottom":
        position.top = triggerRect.bottom + 8;
        position.left = triggerRect.left + triggerRect.width / 2;
        position.transform = "translateX(-50%)";

        arrow.bottom = "100%";
        arrow.left = "50%";
        arrow.marginLeft = "-6px";
        arrow.borderWidth = "0 6px 6px 6px";
        arrow.borderColor =
          "transparent transparent rgba(97, 97, 97, 0.9) transparent";
        break;

      case "left":
        position.right = window.innerWidth - triggerRect.left + 8;
        position.top = triggerRect.top + triggerRect.height / 2;
        position.transform = "translateY(-50%)";

        arrow.top = "50%";
        arrow.right = "-6px";
        arrow.marginTop = "-6px";
        arrow.borderWidth = "6px 0 6px 6px";
        arrow.borderColor =
          "transparent transparent transparent rgba(97, 97, 97, 0.9)";
        break;

      case "right":
      default:
        position.left = triggerRect.right + 8;
        position.top = triggerRect.top + triggerRect.height / 2;
        position.transform = "translateY(-50%)";

        arrow.top = "50%";
        arrow.left = "-6px";
        arrow.marginTop = "-6px";
        arrow.borderWidth = "6px 6px 6px 0";
        arrow.borderColor =
          "transparent rgba(97, 97, 97, 0.9) transparent transparent";
        break;
    }

    setTooltipPosition(position);
    setArrowStyle(arrow);
  };

  // Clone the child element with our event handlers
  const child = React.Children.only(children);
  const childProps = {
    ref: triggerRef,
    onFocus: (e: React.FocusEvent): void => {
      if (child.props.onFocus) child.props.onFocus(e);
      handleShow();
    },
    onBlur: (e: React.FocusEvent): void => {
      if (child.props.onBlur) child.props.onBlur(e);
      handleHide();
    },
    onMouseEnter: (e: React.MouseEvent): void => {
      if (child.props.onMouseEnter) child.props.onMouseEnter(e);
      handleShow();
    },
    onMouseLeave: (e: React.MouseEvent): void => {
      if (child.props.onMouseLeave) child.props.onMouseLeave(e);
      handleHide();
    },
    "aria-describedby": show ? tooltipId : undefined,
  };

  // Create tooltip style
  const tooltipStyle: React.CSSProperties = {
    ...tooltipPosition,
    position: "fixed", // Use fixed positioning for more reliable placement
    opacity: show ? 1 : 0,
    transition: "opacity 0.15s ease-in-out",
  };

  return (
    <>
      {React.cloneElement(child, childProps)}
      {show && (
        <div style={tooltipStyle}>
          {React.cloneElement(overlay, {
            id: tooltipId,
            children: (
              <>
                {overlay.props.children}
                <div
                  style={{
                    position: "absolute",
                    borderStyle: "solid",
                    ...arrowStyle,
                  }}
                />
              </>
            ),
          })}
        </div>
      )}
    </>
  );
}
