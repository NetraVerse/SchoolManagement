import { BriefcaseBusiness, GraduationCap } from "lucide-react";

export default function LeaveApplications() {
  return (
    <div className="space-y-12">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold bg-gradient-to-r from-cyan-400 to-emerald-400 bg-clip-text text-transparent uppercase tracking-[0.2em] relative">
          Leave Applications
          <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-32 h-0.5 bg-gradient-to-r from-cyan-400 to-emerald-400 animate-pulse"></div>
        </h2>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Student Unit */}
        <div className="relative hover:scale-105 transition-transform">
          <div className="relative bg-background text-text backdrop-blur-sm p-8 rounded-2xl border border-cyan-400/30 hover:bg-gradient-to-r hover:from-cyan-900/20 hover:to-cyan-950/10">
            <div className="flex items-center justify-center gap-3 mb-6">
              <div className="p-2 bg-cyan-400/20 rounded-full">
                <GraduationCap className="w-6 h-6 text-cyan-400" />
              </div>
              <h3 className="text-lg font-bold text-cyan-400 tracking-wider">
                STUDENT UNIT
              </h3>
            </div>
            <div className="grid grid-cols-2 gap-6">
              <div className="text-center">
                <div className="bg-white/10 rounded-xl p-4 border border-cyan-400/20">
                  <p className="text-xs uppercase tracking-wide mb-1">
                    Requested
                  </p>
                  <p className="text-2xl font-mono font-bold text-cyan-400 animate-pulse">
                    0
                  </p>
                </div>
                <div className="bg-white/10 rounded-xl p-4 border border-cyan-400/20 mt-2">
                  <p className="text-xs uppercase tracking-wide mb-1">
                    Approved
                  </p>
                  <p className="text-2xl font-mono font-bold text-emerald-400">
                    0
                  </p>
                </div>
              </div>
              <div className="text-center">
                <div className="bg-white/10 rounded-xl p-4 border border-cyan-400/20">
                  <p className="text-xs uppercase tracking-wide mb-1">
                    Pending
                  </p>
                  <p className="text-2xl font-mono font-bold text-gray-400">
                    0
                  </p>
                </div>
                <div className="bg-white/10 rounded-xl p-4 border border-cyan-400/20 mt-2">
                  <p className="text-xs uppercase tracking-wide mb-1">
                    Rejected
                  </p>
                  <p className="text-2xl font-mono font-bold text-red-400">0</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Employee Unit */}
        <div className="relative hover:scale-105 transition-transform">
          <div className="relative bg-background text-text backdrop-blur-sm p-8 rounded-2xl border border-emerald-400/30 hover:bg-gradient-to-r hover:from-emerald-900/20 hover:to-emerald-950/10">
            <div className="flex items-center justify-center gap-3 mb-6">
              <div className="p-2 bg-emerald-400/20 rounded-full">
                <BriefcaseBusiness className="w-6 h-6 text-emerald-400" />
              </div>
              <h3 className="text-lg font-bold text-emerald-400 tracking-wider">
                EMPLOYEE UNIT
              </h3>
            </div>
            <div className="grid grid-cols-2 gap-6">
              <div className="text-center">
                <div className="bg-white/10 rounded-xl p-4 border border-emerald-400/20">
                  <p className="text-xs uppercase tracking-wide mb-1">
                    Requested
                  </p>
                  <p className="text-2xl font-mono font-bold text-cyan-400 animate-pulse">
                    0
                  </p>
                </div>
                <div className="bg-white/10 rounded-xl p-4 border border-emerald-400/20 mt-2">
                  <p className="text-xs uppercase tracking-wide mb-1">
                    Approved
                  </p>
                  <p className="text-2xl font-mono font-bold text-emerald-400">
                    0
                  </p>
                </div>
              </div>
              <div className="text-center">
                <div className="bg-white/10 rounded-xl p-4 border border-emerald-400/20">
                  <p className="text-xs uppercase tracking-wide mb-1">
                    Pending
                  </p>
                  <p className="text-2xl font-mono font-bold text-gray-400">
                    0
                  </p>
                </div>
                <div className="bg-white/10 rounded-xl p-4 border border-emerald-400/20 mt-2">
                  <p className="text-xs uppercase tracking-wide mb-1">
                    Rejected
                  </p>
                  <p className="text-2xl font-mono font-bold text-red-400">0</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
