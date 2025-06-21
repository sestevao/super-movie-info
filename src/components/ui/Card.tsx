import React from 'react';

interface CardProps {
  children: React.ReactNode;
  className?: string;
  darkMode?: boolean;
}

export function Card({ children, className = '', darkMode = false }: CardProps) {
  return (
    <div
      className={`
        rounded-lg shadow-md p-6
        ${darkMode ? 'bg-gray-800 text-white' : 'bg-white text-gray-900'}
        ${className}
      `}
    >
      {children}
    </div>
  );
}

export function CardHeader({ children, darkMode = false }: { children: React.ReactNode; darkMode?: boolean }) {
  return (
    <div className={`mb-4 flex justify-between items-center ${darkMode ? 'text-white' : ''}`}>
      {children}
    </div>
  );
}

export function CardTitle({ children, darkMode = false }: { children: React.ReactNode; darkMode?: boolean }) {
  return (
    <h2 className={`text-xl font-bold ${darkMode ? 'text-white' : ''}`}>
      {children}
    </h2>
  );
}

export function CardContent({ children, darkMode = false }: { children: React.ReactNode; darkMode?: boolean }) {
  return <div className={darkMode ? 'text-gray-300' : 'text-gray-700'}>{children}</div>;
}
