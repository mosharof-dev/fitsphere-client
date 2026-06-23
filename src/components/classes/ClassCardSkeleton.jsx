export default function ClassCardSkeleton() {
  return (
    <div className="w-full bg-[#0B1120] border border-slate-800 rounded-2xl overflow-hidden flex flex-col animate-pulse">
      <div className="h-52 w-full bg-slate-800/50"></div>
      
      <div className="p-6 flex-grow flex flex-col justify-between">
        <div className="space-y-4">
          <div className="w-3/4 h-6 bg-slate-800 rounded-md"></div>
          
          <div className="space-y-2">
            <div className="w-full h-3 bg-slate-800 rounded-md"></div>
            <div className="w-4/5 h-3 bg-slate-800 rounded-md"></div>
          </div>

          <div className="flex items-center gap-4 pt-2">
            <div className="w-20 h-4 bg-slate-800 rounded-md"></div>
            <div className="w-20 h-4 bg-slate-800 rounded-md"></div>
          </div>
        </div>

        <div className="mt-6 pt-5 border-t border-slate-800 flex justify-between items-center">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-full bg-slate-800"></div>
            <div className="w-24 h-4 bg-slate-800 rounded-md"></div>
          </div>
          
          <div className="flex items-center gap-4">
            <div className="w-14 h-8 rounded-lg bg-slate-800"></div>
            <div className="w-10 h-10 rounded-full bg-slate-800"></div>
          </div>
        </div>
      </div>
    </div>
  );
}
