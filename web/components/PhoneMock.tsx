export function PhoneMock() {
  return (
    <div className="mx-auto w-full max-w-[320px]">
      <div className="relative rounded-[42px] border-[10px] border-ink bg-ink p-3 shadow-card">
        <div className="absolute left-1/2 top-2 h-5 w-24 -translate-x-1/2 rounded-full bg-black" />
        <div className="overflow-hidden rounded-[28px] bg-[#fafcfc] text-[#1c1e26]">
          <div className="px-4 pb-3 pt-8">
            <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-[#3877f2]">GradMate</p>
            <h3 className="font-display text-2xl leading-tight">Today</h3>
          </div>
          <div className="space-y-2 px-3 pb-4">
            <div className="rounded-2xl bg-white p-3 shadow-sm ring-1 ring-black/5">
              <p className="text-[11px] text-[#7c7e85]">Resume engine</p>
              <p className="text-sm font-semibold">Export ATS PDF · 1 tap</p>
            </div>
            <div className="rounded-2xl bg-white p-3 shadow-sm ring-1 ring-black/5">
              <p className="text-[11px] text-[#7c7e85]">Focus</p>
              <p className="flex items-end justify-between text-sm font-semibold">
                Pomodoro <span className="font-display text-2xl text-[#3877f2]">24:12</span>
              </p>
            </div>
            <div className="rounded-2xl bg-white p-3 shadow-sm ring-1 ring-black/5">
              <p className="text-[11px] text-[#7c7e85]">Due today</p>
              <p className="text-sm font-semibold">Cover letter · internships</p>
            </div>
            <div className="rounded-2xl bg-[#3877f2] p-3 text-white">
              <p className="text-[11px] text-white/80">Peer chat</p>
              <p className="text-sm font-semibold">Maya: library 6pm?</p>
            </div>
          </div>
          <div className="grid grid-cols-4 border-t border-black/5 bg-white py-2 text-center text-[10px] text-[#7c7e85]">
            <span className="font-semibold text-[#3877f2]">Home</span>
            <span>Plan</span>
            <span>Focus</span>
            <span>Chat</span>
          </div>
        </div>
      </div>
    </div>
  );
}
