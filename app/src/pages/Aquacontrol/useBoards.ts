import { useEffect, useState } from "react";
import onAllBoardsAqua from "@/services/Boards/AllBoardsAqua";
import { useSocketManager } from "../../hooks/useSocketManager";

export const useBoards = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [currentBoards, setCurrentBoards] = useState([]);
  const [totalPages, setTotalPages] = useState(1);
  const [itemsOnPage, setItemsOnPage] = useState(0);
  const [totalItems, setTotalItems] = useState(0);

  const { formattedEntities, setFormattedEntities } =
    useSocketManager(currentBoards);

  const fetchBoards = async (page: number) => {
    try {
      const response = await onAllBoardsAqua(page, itemsPerPage);

      const boards = response?.entities ?? response ?? [];
      const totalCount = response?.totalCount ?? boards.length;
      const total = Math.max(1, Math.ceil(totalCount / itemsPerPage));

      setTotalPages(total);
      setTotalItems(totalCount);
      setCurrentBoards(boards);
      setItemsOnPage(boards.length);
      setFormattedEntities(boards);
    } catch (error) {
      console.error("Erro ao buscar projetos:", error);
      setTotalPages(1);
      setCurrentBoards([]);
      setItemsOnPage(0);
      setTotalItems(0);
      setFormattedEntities([]);
    }
  };

  useEffect(() => {
    fetchBoards(currentPage);
  }, [currentPage, itemsPerPage]);

  const handlePageChange = (newPage: number) => {
    setCurrentPage(newPage);
  };
  const handleItemsPerPageChange = (value: number) => {
    setItemsPerPage(value);
    setCurrentPage(1);
  };

  return {
    formattedEntities,
    currentBoards,
    totalPages,
    itemsOnPage,
    totalItems,
    handlePageChange,
    handleItemsPerPageChange,
    currentPage,
    itemsPerPage,
  };
};
