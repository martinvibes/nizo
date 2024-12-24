import React from "react";
import { PieChart, Pie, Cell, Tooltip } from "recharts";

const COLORS = ["#FFBC66", "#645BE2", "#66FFEF", "#B6689E", "#538434"]; // Colors for each segment

type ChartData = {
  name: string;
  value: number | number | string | null;
}[];

interface DonutChartProps {
  data: ChartData;
  //total: number;
}

const DonutChart: React.FC<DonutChartProps> = ({ data }) => {
  return (
    <div
      className="w-full bg-[#645BE2]"
      style={{
        textAlign: "center",
        color: "#fff",
        padding: "1rem",
        borderRadius: "8px",
      }}
    >
      {/* <div className="flex justify-between items-center font-normal text-[18px] text-white capitalize">
        <h4>Total Amount</h4>
        <h2>{total.toLocaleString()} SOL</h2>
      </div> */}
      <div className="flex justify-between items-center">
        <PieChart width={200} height={200}>
          <Pie
            data={data}
            dataKey="value"
            nameKey="name"
            cx="50%"
            cy="50%"
            innerRadius={50}
            outerRadius={70}
            fill="#8884d8"
            stroke="none"
            animationEasing="ease-in-out"
          >
            {data.map((entry, index) => (
              <Cell
                key={`cell-${index}`}
                fill={COLORS[index % COLORS.length]}
              />
            ))}
          </Pie>
          <Tooltip />
        </PieChart>
        <ul
          style={{
            listStyle: "none",
            padding: 0,
            marginTop: "1rem",
            textAlign: "left",
          }}
        >
          {data.map((entry, index) => (
            <li
              className="flex items-center gap-1 font-normal text-base"
              key={entry.name}
              style={{
                fontSize: "0.9rem",
              }}
            >
              <div
                className="w-[6px] h-[6px] rounded-full"
                style={{
                  background: COLORS[index % COLORS.length],
                }}
              />
              {entry.name} - {entry.value}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default DonutChart;
