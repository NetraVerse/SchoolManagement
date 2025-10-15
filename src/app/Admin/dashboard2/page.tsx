import StatCard from "./components/StatCard";
import ChartsSection from "./components/ChartSection";
import Attendance from "./Attendance and leave/page";
import SchoolInfoCard from "./components/SchoolCard";
// import TitleHeader from "@/components/TitleHeader";
export default function Dashboard() {
  return (
    <div className="flex h-screen">
      <div className="flex-1  ">
        <SchoolInfoCard />
        <StatCard />
        <ChartsSection />
        <Attendance />
      </div>
    </div>
  );
}
