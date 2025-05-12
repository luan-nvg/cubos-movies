import api from "@/api/axios";

const onAllProjects = async (pageNumber = 1, pageSize = 10, params: any) => {
  const idBoardFilter = params.id_board ? { id_board: params.id_board } : {};
  const endDateFilter = params.end_date ? { end_date: params.end_date } : {};
  const startDateFilter = params.start_date
    ? { start_date: params.start_date }
    : {};
  const typeFilter = params.type ? { type: params.type.split(",") } : {};
  const moduleValueFilter = params.module_value
    ? { module_value: params.module_value.split(",") }
    : {};

  const url = "/drives";
  const data = {
    queryParams: {
      ...idBoardFilter,
      ...endDateFilter,
      ...startDateFilter,
      ...typeFilter,
      ...moduleValueFilter,
      filter: {
        id: "",
        name: "",
        online: "",
        status: "",
        type: "",
        username: "",
      },
      pageNumber: pageNumber,
      pageSize: pageSize,
      sortField: "id",
      sortOrder: "desc",
    },
  };

  const response = await api.post<any>(url, data);
  const boards: any = response?.data;
  return boards;
};

export default onAllProjects;
