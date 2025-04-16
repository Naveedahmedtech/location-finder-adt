'use client';

import { X, XCircle } from 'lucide-react';

const TripErrorAlert = ({ error, onClear }: { error: string; onClear: () => void }) => (
    <div className="max-w-3xl mx-auto mt-4 bg-error text-white px-4 py-3 rounded-lg shadow-md flex items-center justify-between animate-fadeIn">
        <div className="flex items-center gap-2">
            <XCircle className="w-6 h-6" />
            <span>{error}</span>
        </div>
        <button onClick={onClear} className="hover:opacity-80">
            <X className="w-5 h-5" />
        </button>
    </div>
);

export default TripErrorAlert;
