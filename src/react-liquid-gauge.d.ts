declare module "react-liquid-gauge" {
  import React from "react";

  interface LiquidFillGaugeProps {
    width?: number;
    height?: number;
    value?: number;
    percent?: string | React.ReactNode;
    textSize?: number;
    textOffsetX?: number;
    textOffsetY?: number;
    textRenderer?: (props: {
      value: number;
      height: number;
      width: number;
      textSize: number;
      percent: React.ReactNode;
    }) => React.ReactNode;
    riseAnimation?: boolean;
    waveAnimation?: boolean;
    waveFrequency?: number;
    waveAmplitude?: number;
    gradient?: boolean;
    gradientStops?: Array<{
      key: string;
      stopColor: string;
      stopOpacity: number;
      offset: string;
    }>;
    circleStyle?: React.CSSProperties;
    waveStyle?: React.CSSProperties;
    textStyle?: React.CSSProperties;
    waveTextStyle?: React.CSSProperties;
    onClick?: () => void;
  }

  const LiquidFillGauge: React.FC<LiquidFillGaugeProps>;
  export default LiquidFillGauge;
}
