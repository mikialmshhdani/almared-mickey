import { useState } from "react";

export function GenieAvatar() {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div 
      className="relative cursor-pointer"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Outer glow ring */}
      <div 
        className={`
          absolute inset-0 rounded-full
          transition-all duration-500
          ${isHovered ? 'opacity-100 scale-110' : 'opacity-60 scale-100'}
        `}
        style={{
          background: 'radial-gradient(circle, rgba(34, 211, 238, 0.4) 0%, transparent 70%)',
          filter: 'blur(8px)',
        }}
      />
      
      {/* Avatar container */}
      <div 
        className={`
          relative w-14 h-14 rounded-full overflow-hidden
          transition-transform duration-300
          ${isHovered ? 'scale-110' : 'scale-100'}
          bg-gradient-to-br from-cyan-500 via-blue-600 to-indigo-700
          border-2 border-cyan-400
          shadow-lg shadow-cyan-500/50
        `}
      >
        {/* Genie SVG */}
        <svg 
          viewBox="0 0 100 100" 
          className="w-full h-full"
          style={{ filter: 'drop-shadow(0 0 4px rgba(34, 211, 238, 0.8))' }}
        >
          {/* Genie body */}
          <ellipse cx="50" cy="55" rx="28" ry="32" fill="url(#genieGradient)" />
          
          {/* Genie head */}
          <circle cx="50" cy="30" r="22" fill="url(#genieGradient)" />
          
          {/* Eyes */}
          <ellipse cx="42" cy="28" rx="4" ry="5" fill="#0f172a" />
          <ellipse cx="58" cy="28" rx="4" ry="5" fill="#0f172a" />
          
          {/* Eye glow */}
          <circle cx="42" cy="28" r="2" fill="#22d3ee" className={isHovered ? 'animate-pulse' : ''} />
          <circle cx="58" cy="28" r="2" fill="#22d3ee" className={isHovered ? 'animate-pulse' : ''} />
          
          {/* Smile */}
          <path d="M 40 38 Q 50 46 60 38" stroke="#22d3ee" strokeWidth="2" fill="none" />
          
          {/* Smoke wisps */}
          <path d="M 25 75 Q 20 85 25 95" stroke="#22d3ee" strokeWidth="3" fill="none" opacity="0.6" />
          <path d="M 75 75 Q 80 85 75 95" stroke="#22d3ee" strokeWidth="3" fill="none" opacity="0.6" />
          
          {/* Gradient definition */}
          <defs>
            <linearGradient id="genieGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#0891b2" />
              <stop offset="50%" stopColor="#1d4ed8" />
              <stop offset="100%" stopColor="#4338ca" />
            </linearGradient>
          </defs>
        </svg>
      </div>

      {/* Animated ping effect */}
      {isHovered && (
        <div className="absolute inset-0 rounded-full animate-ping opacity-30 bg-cyan-400" />
      )}
    </div>
  );
}