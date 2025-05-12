import * as S from "./styles";
import { WaterMonitoring } from "@/components/WaterMonitoring/WaterMonitoring";
import { ReservoirLevel } from "@/components/WaterMonitoring/ReservoirLevel";
import { RenderChannels } from "@/modules/RenderChannels";
import { RenderInputs } from "@/modules/RenderInputs";

/**
 * Renders the monitoring column content
 */
export const renderMonitoring = (row: any) => (
  <S.TitleContainer>
    <WaterMonitoring value={row?.N_cx ?? 0} />
  </S.TitleContainer>
);

/**
 * Renders the reservoir column content
 */
export const renderReservoir = (row: any) => (
  <ReservoirLevel
    value={row.N_res ?? "-Min"}
    widthAq="100%"
    heightAq="100%"
    widthQd="50px"
    borderRadius={"12px"}
  />
);
export const renderChannels = (row: unknown) => {
  return RenderChannels(row);
};

export const renderInputs = (row: unknown) => {
  return RenderInputs(row);
};
