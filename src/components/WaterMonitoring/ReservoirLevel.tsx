import { useEffect, useState } from "react";
import { CSSProperties } from "react";

interface LabelType {
  name: string;
  labelColor: string;
  activeBarColor: string;
  value: number;
}

const Labels: LabelType[] = [
  {
    name: "-Min",
    labelColor: "#ff2900",
    activeBarColor: "#ff2900",
    value: 0,
  },
  {
    name: "Min",
    labelColor: "#f4ab44",
    activeBarColor: "#f4ab44",
    value: 19,
  },
  {
    name: "Nulo",
    labelColor: "#cbcf00",
    activeBarColor: "#cbcf00",
    value: 50,
  },
  {
    name: "Nulo",
    labelColor: "#cbcf00",
    activeBarColor: "#cbcf00",
    value: 50,
  },
  {
    name: "-Max",
    labelColor: "#cbcf00",
    activeBarColor: "#cbcf00",
    value: 79,
  },
  {
    name: "Max",
    labelColor: "#32D736",
    activeBarColor: "#32D736",
    value: 100,
  },
];

const calculateLabelColor = (value: string): string => {
  let labelColor = "";
  if (value) {
    for (const key in Labels) {
      const element = Labels[key];
      if (element.name === value) {
        labelColor = element.labelColor;
        break; // Exit the loop once a match is found
      }
    }
  }
  return labelColor;
};

interface ReservoirLevelProps {
  value: string;
  widthAq: number | string;
  heightAq: number | string;
  widthQd: number | string;
  borderRadius: number | string;
}

export function ReservoirLevel({
  value,
  widthAq,
  heightAq,
  widthQd,
  borderRadius,
}: ReservoirLevelProps): JSX.Element {
  const [labelColor, setLabelColor] = useState<string>("#cbcf00"); // Default

  useEffect(() => {
    const color = calculateLabelColor(value);
    setLabelColor(color);
  }, [value]);

  const reservoirStyle: CSSProperties = {
    width: widthQd,
    height: widthQd,
    borderRadius: borderRadius,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.5)",
    background: `linear-gradient(to top, #fff ${value}%, ${labelColor} ${value}%)`,
    color: "white",
    fontSize: "18px",
    fontWeight: "bold",
  };

  const waterStyle: CSSProperties = {
    width: widthAq,
    height: heightAq,
    backgroundColor: labelColor,
    borderRadius: "10px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    overflow: "hidden",
    position: "relative" as const,
  };

  const rippleStyle: CSSProperties = {
    position: "absolute" as const,
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    background:
      "linear-gradient(to bottom, transparent, rgba(255, 255, 255, 0.7), transparent)",
    animation: "ripple 1s infinite",
  };

  const styles = `
    @keyframes ripple {
      0% {
        transform: translateY(0);
      }
      50% {
        transform: translateY(-5px); // Adjust ripple height as needed
      }
      100% {
        transform: translateY(0);
      }
    }
  `;

  return (
    <div
      style={{
        margin: "5px auto",
        ...reservoirStyle,
      }}
    >
      <style>{styles}</style>
      <div style={waterStyle}>
        <div style={rippleStyle}></div>
      </div>
    </div>
  );
}
