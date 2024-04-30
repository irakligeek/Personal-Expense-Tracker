export default function CircleProgressBar({ percentage, width, strokeColor, children }) {
  const strokeWidth = width / 20;
  const radius = width / 2 - strokeWidth / 2;
  const dashArray = radius * Math.PI * 2;

  return (
    <>
      <svg width={width} height={width} viewBox={`0 0 ${width} ${width}`}>
        <circle
          cx={width / 2}
          cy={width / 2}
          strokeWidth={strokeWidth}
          r={radius}
          className="text-gray-200 fill-none stroke-transparent"
        />
        <circle
          cx={width / 2}
          cy={width / 2}
          strokeWidth={strokeWidth}
          r={radius}
          className={`text-gray-200 fill-none`}
          style={{
            strokeDasharray: dashArray,
            strokeDashoffset: dashArray - (dashArray * percentage) / 100,
            stroke: strokeColor,
            transition: "stroke-dashoffset 0.3s",
          }}
          transform={`rotate(-90, ${width / 2}, ${width / 2})`}
        />
        <text
          x={width / 2}
          y={width / 2}
          dy=".3em"
          textAnchor="middle"
          className="text-sm flex justify-center items-center"
        >
          <tspan>{children}</tspan>
        </text>
      </svg>
    </>
  );
}
