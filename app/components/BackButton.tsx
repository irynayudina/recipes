'use client';

interface BackButtonProps {
  children: React.ReactNode;
  className?: string;
  fallbackHref?: string; // Optional fallback if no history to go back to
}

export default function BackButton({ children, className = '', fallbackHref }: BackButtonProps) {
  const handleBack = () => {
    if (typeof window !== 'undefined' && window.history.length > 1) {
      window.history.back();
    } else if (fallbackHref) {
      window.location.href = fallbackHref;
    }
  };

  return (
    <button 
      onClick={handleBack}
      className={`inline-flex items-center px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors ${className}`}
    >
      <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
      </svg>
      {children}
    </button>
  );
} 