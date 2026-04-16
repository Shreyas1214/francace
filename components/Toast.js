'use client';
import { useApp } from '../context/AppContext';

export function Toast() {
  const { toasts, removeToast } = useApp();

  return (
    <div id="toast-container" className="toast-container">
      {toasts.map((t) => (
        <div key={t.id} className={`toast ${t.type}`} onClick={() => removeToast(t.id)}>
          {t.message}
        </div>
      ))}
    </div>
  );
}
