import { useEffect, useState } from "react";
import api from "@/api/axios";

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";

// Supondo que 'data' venha do back já no formato processado
// Cada item tem: { timeLabel, timestamp, values: { temp_1: { min, max, avg } } }
interface TemperatureData {
  timeLabel: string;
  timestamp: number;
  values: {
    temp_1: {
      min: number;
      max: number;
      avg: number;
    };
  };
}

const TemperatureComponent = ({ data }: { data: TemperatureData[] }) => {
  // Transforma os dados para facilitar o gráfico
  const formattedData = data.map((item: TemperatureData) => ({
    time: item.timeLabel,
    min: item.values?.temp_1?.min || null,
    max: item.values?.temp_1?.max || null,
    avg: item.values?.temp_1?.avg || null,
  }));

  return (
    <ResponsiveContainer width="100%" height={400}>
      <LineChart data={formattedData}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="time" />
        <YAxis domain={["auto", "auto"]} />
        <Tooltip />
        <Legend />
        <Line type="monotone" dataKey="min" stroke="#8884d8" name="Mínima" />
        <Line type="monotone" dataKey="avg" stroke="#82ca9d" name="Média" />
        <Line type="monotone" dataKey="max" stroke="#ff7300" name="Máxima" />
      </LineChart>
    </ResponsiveContainer>
  );
};

interface TemperatureChartProps {
  params: {
    id_board?: string;
    end_date?: string;
    start_date?: string;
    type?: string;
    module_value?: string;
  };
}

const TemperatureChart: React.FC<TemperatureChartProps> = ({ params }) => {
  const [chartData, setChartData] = useState([]);

  useEffect(() => {
    const fetchTemperatureData = async () => {
      const idBoardFilter = params.id_board
        ? { id_board: params.id_board }
        : {};
      const endDateFilter = params.end_date
        ? { end_date: "2023-09-30 23:59:00" }
        : {};
      const startDateFilter = params.start_date
        ? { start_date: "2023-09-01 00:00:00" }
        : {};
      const typeFilter = params.type ? { type: params.type.split(",") } : {};
      const moduleValueFilter = params.module_value
        ? { module_value: params.module_value.split(",") }
        : {};

      const url = "/drives/countemperature";
      const data = {
        queryParams: {
          ...idBoardFilter,
          ...endDateFilter,
          ...startDateFilter,
          ...typeFilter,
          ...moduleValueFilter,
          filter: {},
          sortField: "id",
          sortOrder: "desc",
        },
      };

      const response = await api.post(url, data);
      setChartData(response.data.data);
    };

    fetchTemperatureData();
  }, []);

  return (
    <div>
      <h2>Gráfico de Temperatura</h2>
      <TemperatureComponent data={chartData} />
    </div>
  );
};

export default TemperatureChart;
