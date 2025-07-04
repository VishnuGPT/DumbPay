export default function AnimatedGraph() {
  return (
    <svg viewBox="0 0 64 64" className="w-12 h-12 text-purple-400">
      <polyline
        points="8,56 20,40 32,48 44,24 56,32"
        fill="none"
        stroke="currentColor"
        strokeWidth="4"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeDasharray="120"
        strokeDashoffset="120"
      >
        <animate
          attributeName="stroke-dashoffset"
          values="120;0;0;120"
          keyTimes="0;0.3;0.7;1"
          dur="4s"
          repeatCount="indefinite"
        />
      </polyline>
    </svg>
  );
}
