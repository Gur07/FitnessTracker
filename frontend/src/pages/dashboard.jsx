import { useEffect, useState } from "react";
import DashboardLayout from "../components/Layout/DashboardLayout";
import SummaryCards from "../components/dashboard/SummaryCards";
import WeeklyChart from "../components/dashboard/WeeklyChart";
import ActivityPie from "../components/dashboard/ActivityPie";
import {
  getSummary,
  getWeeklySummary,
  getActivityBreakdown,
} from "../api/dashboard";
import RecentActivities from "../components/dashboard/RecentActivities";

const Dashboard = () => {
  const [summary, setSummary] = useState({});
  const [weekly, setWeekly] = useState([]);
  const [breakdown, setBreakdown] = useState([]);
  const fetchData = async () => {
      try {
        const summaryRes = await getSummary();
        const weeklyRes = await getWeeklySummary();
        const breakdownRes = await getActivityBreakdown();

        setSummary(summaryRes.data?.data || {});
        setWeekly(weeklyRes.data?.data || []);
        setBreakdown(breakdownRes.data?.data || []);
      } catch (error) {
        console.error("Error fetching dashboard data:", error);
      }
    };
  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    console.log("Updated state:", { summary, weekly, breakdown });
  }, [summary, weekly, breakdown]);

  return (
    <DashboardLayout>
      <SummaryCards summary={summary} />
      <div className="grid md:grid-cols-2 gap-6">
        <WeeklyChart data={weekly} />
        <ActivityPie data={breakdown} />
      </div>
      <RecentActivities refresh={fetchData} />
    </DashboardLayout>
  );
};

export default Dashboard;