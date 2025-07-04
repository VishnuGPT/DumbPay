export default function AnimatedSend() {
  return (
    <svg viewBox="0 0 64 64" className="w-12 h-12 text-cyan-400">
      <polygon
        points="2,32 62,2 32,62 30,38 2,32"
        fill="none"
        stroke="currentColor"
        strokeWidth="4"
        strokeDasharray="180"
        strokeDashoffset="180"
      >
        <animate
          attributeName="stroke-dashoffset"
          values="180;0;0;180"
          keyTimes="0;0.3;0.7;1"
          dur="4s"
          repeatCount="indefinite"
        />
      </polygon>
    </svg>
  );
}
