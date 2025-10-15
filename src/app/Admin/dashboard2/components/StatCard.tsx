import {
  ChartBar,
  CircuitBoard,
  GraduationCap,
  LucideCircleDollarSign,
} from "lucide-react";

export default function StatCard() {
  return (
    <div className="relative  p-6">
      {/* Animated background grid */}
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

      {/* Foreground content */}
      <div className="relative z-10 flex flex-col sm:flex-row flex-wrap gap-6 ">
        {/* Total Students */}
        <div className="flex flex-row border justify-between items-center text-text bg-green-500/30 backdrop-blur-md rounded-2xl p-6 flex-1 min-w-[250px] shadow-lg hover:scale-105 transition-transform duration-300">
          <div>
            <div className="text-sm ">Total Students</div>
            <div className="text-2xl font-bold ">2330</div>
          </div>
          <GraduationCap className="text-green-400 text-4xl" />
        </div>

        {/* Total Employees */}
        <div className="flex flex-row justify-between items-center border bg-orange-500/30 text-text backdrop-blur-md rounded-2xl p-6 flex-1 min-w-[250px] shadow-lg hover:scale-105 transition-transform duration-300">
          <div>
            <div className="text-sm ">Total Employees</div>
            <div className="text-2xl font-bold ">53</div>
          </div>
          <CircuitBoard />
        </div>

        {/* Total Revenue */}
        <div className="flex flex-row justify-between border items-center bg-blue-500/30 text-text backdrop-blur-md rounded-2xl p-6 flex-1 min-w-[250px] shadow-lg hover:scale-105 transition-transform duration-300">
          <div>
            <div className="text-sm ">Total Revenue</div>
            <div className="text-2xl font-bold ">
              <span className="text-sm mr-1 ">Rs</span>233K
            </div>
          </div>
          <ChartBar className="text-blue-400 text-4xl" />
        </div>

        {/* Total Profit */}
        <div className="flex flex-row border justify-between items-center bg-green-500/30 text-text backdrop-blur-md rounded-2xl p-6 flex-1 min-w-[250px] shadow-lg hover:scale-105 transition-transform duration-300">
          <div>
            <div className="text-sm ">Total Profit</div>
            <div className="text-2xl font-bold ">
              <span className="text-sm mr-1 ">Rs</span>80K
            </div>
          </div>
          <LucideCircleDollarSign className="text-green-400 text-4xl" />
        </div>
      </div>
    </div>
  );
}
