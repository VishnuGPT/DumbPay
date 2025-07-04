export default function AnimatedDevice() {
  return (
    <svg viewBox="0 0 64 64" className="w-12 h-12 text-pink-400">
      <rect
        x="16"
        y="8"
        width="32"
        height="48"
        rx="4"
        ry="4"
        fill="none"
        stroke="currentColor"
        strokeWidth="4"
        strokeDasharray="160"
        strokeDashoffset="160"
      >
        <animate
          attributeName="stroke-dashoffset"
          values="160;0;0;160"
          keyTimes="0;0.3;0.7;1"
          dur="4s"
          repeatCount="indefinite"
        />
      </rect>
      <circle cx="32" cy="50" r="2" fill="white" />
    </svg>
  );
}
