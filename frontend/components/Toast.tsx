'use client';
import { useEffect, useState } from 'react';

export type ToastType = 'success' | 'error' | 'info';

export interface ToastMessage {
  id: number;
  message: string;
  type: ToastType;
}

interface ToastProps {
  toasts: ToastMessage[];
  removeToast: (id: number) => void;
}

export function Toast({ toasts, removeToast }: ToastProps) {
  return (
    <div style={{ position: 'fixed', bottom: 24, right: 24, zIndex: 9999, display: 'flex', flexDirection: 'column', gap: 10 }}>
      {toasts.map(toast => (
        <div key={toast.id} style={{
          background: toast.type === 'success' ? '#166534' : toast.type === 'error' ? '#991b1b' : '#1B4FDB',
          color: '#fff', padding: '12px 18px', borderRadius: 10, fontSize: 14, fontWeight: 500,
          display: 'flex', alignItems: 'center', gap: 10, minWidth: 220, maxWidth: 320,
          boxShadow: '0 4px 16px rgba(0,0,0,0.15)',
          animation: 'slideIn 0.3s ease'
        }}>
          <span>{toast.type === 'success' ? '✅' : toast.type === 'error' ? '❌' : 'ℹ️'}</span>
          <span style={{ flex: 1 }}>{toast.message}</span>
          <button onClick={() => removeToast(toast.id)} style={{ background: 'none', border: 'none', color: '#fff', cursor: 'pointer', fontSize: 16, opacity: 0.7, padding: 0 }}>×</button>
        </div>
      ))}
      <style>{`@keyframes slideIn { from { opacity: 0; transform: translateX(20px); } to { opacity: 1; transform: translateX(0); } }`}</style>
    </div>
  );
}

export function useToast() {
  const [toasts, setToasts] = useState<ToastMessage[]>([]);

  const addToast = (message: string, type: ToastType = 'info') => {
    const id = Date.now();
    setToasts(prev => [...prev, { id, message, type }]);
    setTimeout(() => removeToast(id), 3000);
  };

  const removeToast = (id: number) => {
    setToasts(prev => prev.filter(t => t.id !== id));
  };

  return { toasts, addToast, removeToast };
}
