import React from 'react';
import { ShieldAlert, X, ArrowLeft } from 'lucide-react';

interface AccessDeniedModalProps {
  actionName: string | null;
  onClose: () => void;
  onSwitchToAdmin: () => void;
}

export const AccessDeniedModal: React.FC<AccessDeniedModalProps> = ({
  actionName,
  onClose,
  onSwitchToAdmin
}) => {
  if (!actionName) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/70 backdrop-blur-xs">
      <div className="bg-white rounded-lg max-w-lg w-full p-6 shadow-2xl border border-red-200 space-y-4">
        <div className="flex items-start justify-between">
          <div className="w-12 h-12 rounded-full bg-red-100 text-red-600 flex items-center justify-center">
            <ShieldAlert className="w-6 h-6" />
          </div>
          <button
            onClick={onClose}
            className="text-slate-400 hover:text-slate-600 p-1"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div>
          <div className="text-xs font-bold uppercase tracking-wider text-red-600">
            HTTP 403 &bull; Access Denied (Spring Security)
          </div>
          <h2 className="text-xl font-bold text-slate-900 mt-1">
            Unauthorized Administrative Action
          </h2>
          <p className="text-sm text-slate-600 mt-2">
            Your current authenticated session has the role <strong className="text-blue-700">ROLE_USER</strong>. 
            The requested operation <span className="font-semibold text-slate-900">"{actionName}"</span> is protected 
            by server-side <code className="bg-slate-100 text-red-700 px-1.5 py-0.5 rounded font-mono text-xs">@PreAuthorize("hasRole('ADMIN')")</code>.
          </p>
        </div>

        <div className="p-3.5 bg-slate-50 border border-slate-200 rounded-md text-xs text-slate-600 space-y-1">
          <div className="font-semibold text-slate-800">Spring Security RBAC Rules:</div>
          <div>&bull; <strong>ADMIN</strong>: Full CRUD permissions (Add, Update, Delete records &amp; departments).</div>
          <div>&bull; <strong>USER</strong>: Read-Only permissions (View directory, dashboard, search &amp; filter).</div>
        </div>

        <div className="pt-3 border-t border-slate-100 flex items-center justify-between gap-3">
          <button
            onClick={onClose}
            className="inline-flex items-center gap-1 px-4 py-2 text-sm font-semibold text-slate-700 bg-white border border-slate-300 rounded-md hover:bg-slate-50"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Return to Safe View</span>
          </button>

          <button
            onClick={() => {
              onClose();
              onSwitchToAdmin();
            }}
            className="px-4 py-2 text-sm font-semibold text-white bg-red-600 hover:bg-red-700 rounded-md shadow-xs transition-colors"
          >
            Switch to ADMIN Role
          </button>
        </div>
      </div>
    </div>
  );
};
