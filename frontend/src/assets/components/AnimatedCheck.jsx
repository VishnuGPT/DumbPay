export default function AnimatedCheck() {
  return (
    <svg viewBox="0 0 52 52" className="w-12 h-12 text-green-400">
      <circle
        cx="26"
        cy="26"
        r="25"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeDasharray="166"
        strokeDashoffset="166"
      >
        <animate
          attributeName="stroke-dashoffset"
          values="166;0;0;166"
          keyTimes="0;0.3;0.7;1"
          dur="4s"
          repeatCount="indefinite"
        />
      </circle>
      <path
        d="M14 27l7 7 17-17"
        fill="none"
        stroke="white"
        strokeWidth="4"
        strokeLinecap="round"
        strokeDasharray="48"
        strokeDashoffset="48"
      >
        <animate
          attributeName="stroke-dashoffset"
          values="48;0;0;48"
          keyTimes="0;0.3;0.7;1"
          dur="4s"
          repeatCount="indefinite"
        />
      </path>
    </svg>
  );
}
