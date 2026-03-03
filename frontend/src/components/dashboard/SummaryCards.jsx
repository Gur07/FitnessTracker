import { Flame, Clock, Activity } from "lucide-react";

const Card = ({ title, value, icon }) => (
  <div className="bg-white rounded-2xl shadow-md p-6 flex justify-between items-center">
    <div>
      <p className="text-gray-500 text-sm">{title}</p>
      <h2 className="text-2xl font-semibold mt-1">{value}</h2>
    </div>
    <div className="bg-blue-100 p-3 rounded-full">{icon}</div>
  </div>
);

const SummaryCards = ({ summary }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
      <Card
        title="Total Workouts"
        value={summary.totalWorkouts}
        icon={<Activity className="text-blue-600" />}
      />
      <Card
        title="Total Calories"
        value={summary.totalCalories}
        icon={<Flame className="text-red-500" />}
      />
      <Card
        title="Total Duration (mins)"
        value={summary.totalDuration}
        icon={<Clock className="text-green-600" />}
      />
    </div>
  );
};

export default SummaryCards;