export default function AnimatedLock() {
  return (
    <svg viewBox="0 0 64 64" className="w-12 h-12 text-red-400">
      <rect
        x="16"
        y="28"
        width="32"
        height="28"
        fill="none"
        stroke="currentColor"
        strokeWidth="4"
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
      </rect>
      <path
        d="M20 28 V20 A12 12 0 0 1 44 20 V28"
        fill="none"
        stroke="currentColor"
        strokeWidth="4"
        strokeDasharray="80"
        strokeDashoffset="80"
      >
        <animate
          attributeName="stroke-dashoffset"
          values="80;0;0;80"
          keyTimes="0;0.3;0.7;1"
          dur="4s"
          repeatCount="indefinite"
        />
      </path>
    </svg>
  );
}
