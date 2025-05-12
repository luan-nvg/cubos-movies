import { color } from "d3-color";
// Start of Selection
import { interpolateRgb } from "d3-interpolate";
import React from "react";
import LiquidFillGauge from "react-liquid-gauge";

export function WaterMonitoring({ value }: { value: number }) {
  const radius = 35;
  const positiveValue = Math.abs(value); // Torna o valor positivo

  const interpolate = interpolateRgb("#0074E4", "#004CB2");
  const fillColor = interpolate(positiveValue / 100);

  // Create color object once and handle null case
  const fillColorObj = color(fillColor);
  const darkerColor = fillColorObj
    ? fillColorObj.darker(0.5).toString()
    : "#0074E4";
  const brighterColor = fillColorObj
    ? fillColorObj.brighter(0.5).toString()
    : "#004CB2";

  const gradientStops = [
    {
      key: "0%",
      stopColor: darkerColor,
      stopOpacity: 1,
      offset: "0%",
    },
    {
      key: "50%",
      stopColor: fillColor,
      stopOpacity: 0.75,
      offset: "50%",
    },
    {
      key: "100%",
      stopColor: brighterColor,
      stopOpacity: 0.5,
      offset: "100%",
    },
  ];

  // Handle null case for text colors
  const textColor = color("#444")?.toString() || "#444";
  const waveTextColor = color("#fff")?.toString() || "#fff";

  return (
    <div style={{ marginLeft: "10%" }}>
      <LiquidFillGauge
        width={radius * 2}
        height={radius * 2}
        value={positiveValue}
        percent="%"
        textSize={1}
        textOffsetX={0}
        textOffsetY={5}
        textRenderer={(props: {
          value: number;
          height: number;
          width: number;
          textSize: number;
          percent: React.ReactNode;
        }) => {
          const radius = Math.min(props.height / 2, props.width / 2);
          const textPixels = (props.textSize * radius) / 2;
          const valueStyle = {
            fontSize: textPixels,
          };
          const percentStyle = {
            fontSize: textPixels * 0.6,
          };

          return (
            <tspan>
              <tspan className="value" style={valueStyle}>
                {value}
              </tspan>
              <tspan style={percentStyle}>{props.percent}</tspan>
            </tspan>
          );
        }}
        riseAnimation
        waveAnimation
        waveFrequency={2}
        waveAmplitude={1}
        gradient
        gradientStops={gradientStops}
        circleStyle={{
          fill: fillColor,
        }}
        waveStyle={{
          fill: fillColor,
        }}
        textStyle={{
          fill: textColor,
          fontFamily: "Arial",
        }}
        waveTextStyle={{
          fill: waveTextColor,
          fontFamily: "Arial",
        }}
        onClick={() => {
          // Seu código de manipulação de clique aqui
        }}
      />
    </div>
  );
}
