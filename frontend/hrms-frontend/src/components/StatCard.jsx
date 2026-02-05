export default function StatCard({ label, value, icon: Icon, color }) {
  return (
    <div
      className="
  bg-white
  rounded-2xl
  p-6
  border-t-4
  border
  border-[#f0f0f0]
  shadow-[0_10px_30px_rgba(0,0,0,0.04)]
  transition-all
  hover:-translate-y-1
  fade-stagger
"

      style={{ borderColor: color }}
    >
      <div className="flex items-center gap-4">
        <div
          className="p-3 rounded-xl"
          style={{ backgroundColor: `${color}22`, color }}
        >
          <Icon size={22} />
        </div>

        <div>
          <p className="text-slate-500 text-sm">{label}</p>
          <h3 className="serif text-2xl text-slate-800">
            {value}
          </h3>
        </div>
      </div>
    </div>
  );
}
