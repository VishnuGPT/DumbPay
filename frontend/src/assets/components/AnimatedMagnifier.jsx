export default function AnimatedMagnifier() {
  return (
    <svg viewBox="0 0 64 64" className="w-12 h-12 text-blue-400">
      <circle
        cx="27"
        cy="27"
        r="16"
        fill="none"
        stroke="currentColor"
        strokeWidth="4"
        strokeDasharray="100"
        strokeDashoffset="100"
      >
        <animate
          attributeName="stroke-dashoffset"
          values="100;0;0;100"
          keyTimes="0;0.3;0.7;1"
          dur="4s"
          repeatCount="indefinite"
        />
      </circle>
      <line
        x1="41"
        y1="41"
        x2="58"
        y2="58"
        stroke="white"
        strokeWidth="4"
        strokeDasharray="24"
        strokeDashoffset="24"
      >
        <animate
          attributeName="stroke-dashoffset"
          values="24;0;0;24"
          keyTimes="0;0.3;0.7;1"
          dur="4s"
          repeatCount="indefinite"
        />
      </line>
    </svg>
  );
}
