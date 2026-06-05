import { useId } from "react";

const BadgeGemini = ({ label = "Powered by Gemini", size = "md" }) => {
  const uid = useId().replace(/:/g, "");
  const gradId = `gemini-grad-${uid}`;

  const iconSize = size === "sm" ? 13 : size === "lg" ? 20 : 15;

  return (
    <div className={`gemini-badge gemini-badge-${size}`}>
      <svg
        className="gemini-star"
        width={iconSize}
        height={iconSize}
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
      >
        <defs>
          <linearGradient id={gradId} x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%"   stopColor="#4285F4" />
            <stop offset="50%"  stopColor="#9333EA" />
            <stop offset="100%" stopColor="#EC4899" />
          </linearGradient>
        </defs>
        <path
          d="M12 2C12.5 6 15.5 9 22 12C15.5 15 12.5 18 12 22C11.5 18 8.5 15 2 12C8.5 9 11.5 6 12 2Z"
          fill={`url(#${gradId})`}
        />
      </svg>
      <span>{label}</span>
    </div>
  );
};

export default BadgeGemini;
