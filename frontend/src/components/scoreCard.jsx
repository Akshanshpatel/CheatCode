const ProgressRing = ({ solved, total, radius = 70, stroke = 8 }) => {
  const normalizedRadius = radius - stroke * 2;
  const circumference = normalizedRadius * 2 * Math.PI;
  const percent = solved / total;
  const strokeDashoffset = circumference - percent * circumference;

  return (
    <svg height={radius * 2} width={radius * 2}>
      {/* Background ring */}
      <circle
        stroke="#2a2a2a"
        fill="transparent"
        strokeWidth={stroke}
        r={normalizedRadius}
        cx={radius}
        cy={radius}
      />

      {/* Progress ring */}
      <circle
        stroke="#fbbf24"
        fill="transparent"
        strokeWidth={stroke}
        strokeLinecap="round"
        strokeDasharray={circumference}
        strokeDashoffset={strokeDashoffset}
        r={normalizedRadius}
        cx={radius}
        cy={radius}
        style={{ transition: "stroke-dashoffset 0.6s ease" }}
      />

      {/* Center text */}
      <text
        x="50%"
        y="45%"
        textAnchor="middle"
        className="fill-white text-xl font-bold"
      >
        {solved}
      </text>
      <text
        x="50%"
        y="58%"
        textAnchor="middle"
        className="fill-gray-400 text-xs"
      >
        /{total} Solved
      </text>
    </svg>
  );
};

export default function ScoreCard() {
  return (
    <div className="flex items-center justify-between bg-[#202225] rounded-xl p-6 w-full max-w-xl">
      {/* Left stats */}
      <div className="space-y-2 text-sm">
        <div className="flex gap-3">
          <span className="text-green-400 font-semibold">Easy</span>
          <span className="text-white">46/217</span>
        </div>
        <div className="flex gap-3">
          <span className="text-yellow-400 font-semibold">Med</span>
          <span className="text-white">21/562</span>
        </div>
        <div className="flex gap-3">
          <span className="text-red-400 font-semibold">Hard</span>
          <span className="text-white">1/137</span>
        </div>
      </div>

      {/* Progress ring */}
      <ProgressRing solved={68} total={916} />
    </div>
  );
}
