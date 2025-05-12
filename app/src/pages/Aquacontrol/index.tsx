import { useEffect } from "react";
import * as S from "./styles";

// Custom hook for boards data
import { useBoards } from "./useBoards";

// Components
import Table from "@/components/Table";
import { SectionTitle } from "@/components/SectionTitle";
import { Divider } from "@/components/Divider";
import TablePagination from "@/components/TablePagination"; // Import the new component

import { useTitle } from "@/contexts/TitleContext";

// Config
import { useColumnConfig } from "./tableConfig";

// Renderers
import {
  renderMonitoring,
  renderReservoir,
  renderChannels,
  renderInputs,
} from "./renderers";

const Boards = () => {
  const { setTitle } = useTitle();

  // Use our boards hook for data and pagination
  const {
    formattedEntities,
    totalPages,
    totalItems,
    itemsOnPage,
    currentPage,
    itemsPerPage,
    handlePageChange,
    handleItemsPerPageChange,
  } = useBoards();

  // Page title
  useEffect(() => {
    setTitle("Placas de Monitoramento");
  }, [setTitle]);

  // Map table data with rendered components
  const mappedTableData = formattedEntities.map((row: Record<string, any>) => ({
    ...row,
    monitoring: renderMonitoring(row),
    reservoir: renderReservoir(row),
    channels: renderChannels(row),
    inputs: renderInputs(row),
  }));

  return (
    <S.Container>
      <S.SectionSubtitle>
        <SectionTitle fontSize="var(--md)" title="Monitoramento de Água" />
      </S.SectionSubtitle>
      <Divider width="calc(100% + 8.8rem)" margin="0 0 0 -4.4rem" />

      <Table
        checkbox={false}
        data={mappedTableData}
        tableColumns={useColumnConfig()?.map((col) => ({
          ...col,
          alignrow: "left",
          aligncolumn: "left",
          widthpercentage: col.colWidth,
          renderHeader: col.headerRender,
        }))}
      />

      <TablePagination
        currentPage={currentPage}
        totalPages={totalPages}
        itemsPerPage={itemsPerPage}
        totalItems={totalItems}
        itemsOnPage={itemsOnPage}
        onPageChange={handlePageChange}
        onItemsPerPageChange={handleItemsPerPageChange}
      />
    </S.Container>
  );
};

export default Boards;
