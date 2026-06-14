'use client';
import { useEffect, useState } from 'react';

interface ProgressBarProps {
  loading: boolean;
}

export function ProgressBar({ loading }: ProgressBarProps) {
  const [progress, setProgress] = useState(0);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (loading) {
      setVisible(true);
      setProgress(0);
      const interval = setInterval(() => {
        setProgress(prev => {
          if (prev >= 85) { clearInterval(interval); return 85; }
          return prev + Math.random() * 15;
        });
      }, 400);
      return () => clearInterval(interval);
    } else {
      setProgress(100);
      setTimeout(() => { setVisible(false); setProgress(0); }, 400);
    }
  }, [loading]);

  if (!visible) return null;

  return (
    <div style={{ position: 'fixed', top: 0, left: 0, right: 0, zIndex: 9999, height: 3, background: 'transparent' }}>
      <div style={{
        height: '100%', background: '#1B4FDB',
        width: `${progress}%`,
        transition: progress === 100 ? 'width 0.2s ease, opacity 0.3s ease' : 'width 0.4s ease',
        opacity: progress === 100 ? 0 : 1,
        boxShadow: '0 0 8px #1B4FDB'
      }} />
    </div>
  );
}
