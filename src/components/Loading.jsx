const Loading = () => {
  return (
    <div className="fixed inset-0 flex flex-col items-center justify-center bg-slate-50 dark:bg-slate-900">
      <div className="relative w-32 h-32">
        <svg className="w-full h-full" viewBox="0 0 100 100">
          <circle
            cx="50"
            cy="50"
            r="48"
            fill="none"
            stroke="#3b82f6"
            strokeWidth="4"
            className="opacity-20"
          />
          <circle
            cx="50"
            cy="50"
            r="48"
            fill="none"
            stroke="url(#gradient)"
            strokeWidth="4"
            strokeDasharray="30 270"
            className="animate-spin-slow"
            strokeLinecap="round"
          />
          <defs>
            <linearGradient id="gradient">
              <stop offset="0%" stopColor="#336dff" />
              <stop offset="50%" stopColor="#336dff" />
              <stop offset="100%" stopColor="#336dff" />
            </linearGradient>
          </defs>
        </svg>
      </div>
      <p className="mt-4 text-xl font-medium text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-blue-600 dark:from-blue-200 dark:to-blue-300 animate-pulse">
        Loading
      </p>
      <style jsx>{`
        @keyframes spin-slow {
          0% {
            transform: rotate(0deg);
          }
          100% {
            transform: rotate(360deg);
          }
        }
        .animate-spin-slow {
          animation: spin-slow 1.5s linear infinite;
          transform-origin: center;
        }
      `}</style>
    </div>
  );
};

export default Loading;
