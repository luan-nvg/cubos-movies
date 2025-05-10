import api from "@/api/axios";

const onAllBoardsAqua = async (pageNumber = 1, pageSize = 10) => {
  const url = "/boards";
  const data = {
    queryParams: {
      filter: {
        id: "",
        name: "",
        online: "",
        status: "",
        type: "",
        username: "",
        category: "AQUA",
      },
      pageNumber: pageNumber,
      pageSize: pageSize,
      sortField: "id",
      sortOrder: "desc",
    },
  };

  try {
    const response = await api.post<any>(url, data);
    const boards: any = response?.data;
    console.log("boards:", boards);
    return boards;
  } catch (error) {
    console.error("API Error:", error);
    return null;
  }
};

export default onAllBoardsAqua;
