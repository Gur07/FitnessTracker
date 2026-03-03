import {
  PieChart,
  Pie,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const COLORS = ["#3B82F6", "#10B981", "#F59E0B", "#EF4444", "#8B5CF6"];

// Custom slice renderer
const renderCustomShape = (props) => {
  const {
    cx,
    cy,
    midAngle,
    innerRadius,
    outerRadius,
    startAngle,
    endAngle,
    fill,
    percent,
    index,
  } = props;

  const RADIAN = Math.PI / 180;
  const radius = outerRadius;
  const x = cx + radius * Math.cos(-midAngle * RADIAN);
  const y = cy + radius * Math.sin(-midAngle * RADIAN);

  return (
    <g>
      <path
        d={`
          M ${cx} ${cy}
          L ${cx + outerRadius * Math.cos(-startAngle * RADIAN)}
            ${cy + outerRadius * Math.sin(-startAngle * RADIAN)}
          A ${outerRadius} ${outerRadius} 0 0 1
            ${cx + outerRadius * Math.cos(-endAngle * RADIAN)}
            ${cy + outerRadius * Math.sin(-endAngle * RADIAN)}
          Z
        `}
        fill={COLORS[index % COLORS.length]}
      />
      {percent > 0.05 && (
        <text
          x={x}
          y={y}
          fill="#fff"
          textAnchor="middle"
          dominantBaseline="central"
          fontSize={12}
        >
          {(percent * 100).toFixed(0)}%
        </text>
      )}
    </g>
  );
};

const ActivityPie = ({ data }) => {
  return (
    <div className="bg-white rounded-2xl shadow-md p-6">
      <h3 className="text-lg font-semibold mb-4">
        Activity Breakdown
      </h3>

      <ResponsiveContainer width="100%" height={300}>
        <PieChart>
          <Pie
            data={data}
            dataKey="workouts"
            nameKey="type"
            outerRadius={100}
            shape={renderCustomShape}
          />
          <Tooltip />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
};

export default ActivityPie;