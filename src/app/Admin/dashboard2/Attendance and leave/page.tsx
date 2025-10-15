import AttendanceSection from "./components/AttendanceSection";
import LeaveApplications from "./components/LeaveApplication";

export default function Attendance() {
  return (
    <div className="relative min-h-screen p-6">
      <div className="absolute inset-0 opacity-20">
        <div className="absolute inset-0 bg-gradient-to-r from-cyan-400/10 to-purple-400/10"></div>
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `linear-gradient(cyan 1px, transparent 1px), linear-gradient(90deg, cyan 1px, transparent 1px)`,
            backgroundSize: "50px 50px",
            opacity: 0.1,
          }}
        ></div>
      </div>

      <div className="relative z-10 mt-10 space-y-12">
        <LeaveApplications />
        <AttendanceSection />
      </div>
    </div>
  );
}
