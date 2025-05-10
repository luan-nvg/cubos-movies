import { useState, useCallback } from "react";
import onAllBoardsAqua from "@/services/Boards/AllBoardsAqua";

export const useBoardsData = (initialPage: number, itemsPerPage: number) => {
  console.log(initialPage);
  const [currentBoards, setCurrentBoards] = useState([]);
  const [totalPages, setTotalPages] = useState(1);
  const [totalItems, setTotalItems] = useState(0);
  const [itemsOnPage, setItemsOnPage] = useState(0);

  // Update boards and manage data fetching
  const updateBoards = useCallback(
    async (page: number | undefined) => {
      try {
        console.log(`Buscando dados para página ${page}`);
        const response = await onAllBoardsAqua(page, itemsPerPage);

        let projects = [];
        let totalCount = 0;

        if (response && response.entities && Array.isArray(response.entities)) {
          projects = response.entities;
          totalCount = response.totalCount || projects.length;
        } else if (Array.isArray(response)) {
          projects = response;
          totalCount = response.length;
        }

        const total = Math.max(1, Math.ceil(totalCount / itemsPerPage));
        setTotalPages(total);
        setTotalItems(totalCount);
        setCurrentBoards(projects);
        setItemsOnPage(projects.length);

        return projects;
      } catch (error) {
        console.error("Erro ao buscar projetos:", error);
        setTotalPages(1);
        setCurrentBoards([]);
        setItemsOnPage(0);
        setTotalItems(0);
        return [];
      }
    },
    [itemsPerPage]
  );

  return {
    currentBoards,
    totalPages,
    totalItems,
    itemsOnPage,
    updateBoards,
  };
};
