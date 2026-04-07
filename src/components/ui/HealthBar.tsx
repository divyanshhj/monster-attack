const HealthBar = ({
  label,
  health,
  color,
}: {
  label: string;
  health: number;
  color: string;
}) => (
  <div className="text-center w-full">
    <p className="font-bold text-gray-600 mb-2 uppercase text-xs tracking-widest">
      {label}
    </p>
    <div className="w-full bg-gray-200 h-6 rounded-full overflow-hidden border border-gray-300 shadow-inner">
      <div
        className={`${color} h-full transition-all duration-500 ease-out`}
        style={{ width: `${health}%` }}
      />
    </div>
    <p className="text-sm font-black mt-2 text-gray-700">{health}%</p>
  </div>
);

export default HealthBar;
