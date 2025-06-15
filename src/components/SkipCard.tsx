import React from 'react';
import { AlertTriangle, ArrowRight } from 'lucide-react';
import type { Skip } from '../types/skip';

interface SkipCardProps {
    skip: Skip;
    isSelected: boolean;
    onSelect: (skip: Skip) => void;
}

export const SkipCard: React.FC<SkipCardProps> = ({
    skip,
    isSelected,
    onSelect
}) => {
    return (
        <div
            className={`group relative rounded-lg border-2 p-4 md:p-6 transition-all
                ${isSelected
                    ? 'border-[#0037C1] bg-[#0037C1]/10'
                    : 'border-[#2A2A2A] hover:border-[#0037C1]/50'}
                bg-[#1C1C1C] text-white cursor-pointer`}
            onClick={() => onSelect(skip)}
        >
            {isSelected && (
                <div className="absolute top-3 right-3 md:top-4 md:right-4">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-check w-5 h-5 md:w-6 md:h-6 text-[#0037C1]">
                        <path d="M20 6 9 17l-5-5"></path>
                    </svg>
                </div>
            )}
            <div className="relative">
                <img
                    src={`https://yozbrydxdlcxghkphhtq.supabase.co/storage/v1/object/public/skips/skip-sizes/${skip.size}-yarder-skip.jpg`}
                    alt={`${skip.size} Yard Skip`}
                    className="w-full h-36 md:h-48 object-cover rounded-md mb-4"
                />
                <div className="absolute top-3 right-2 z-20 bg-[#0037C1] text-white px-3 py-1 rounded-full text-sm font-medium shadow-md">
                    {skip.size} Yards
                </div>
                {skip.size >= 10 && (
                    <div className="absolute bottom-3 left-2 z-20 space-y-2">
                        <div className="bg-black/90 backdrop-blur-sm px-3 py-1.5 rounded-lg flex items-center gap-2">
                            <AlertTriangle className="w-4 h-4 text-yellow-500 shrink-0" />
                            <span className="text-xs font-medium text-yellow-500">Not Allowed On The Road</span>
                        </div>
                    </div>
                )}
            </div>
            <h3 className="text-lg md:text-xl font-bold mb-2 text-white">{skip.size} Yard Skip</h3>
            <p className="text-sm text-gray-400 mb-4 md:mb-6">{skip.hire_period_days} day hire period</p>
            <div className="flex justify-between items-center mb-4">
                <div>
                    <span className="text-xl md:text-2xl font-bold text-[#0037C1]">
                        £{skip.price_before_vat + (skip.price_before_vat * skip.vat / 100)}
                    </span>
                </div>
            </div>
            <button
                className={`w-full py-2.5 md:py-3 px-4 rounded-md transition-all flex items-center justify-center space-x-2
                    ${isSelected
                        ? 'bg-[#0037C1] text-white hover:bg-[#002da1]'
                        : 'bg-[#2A2A2A] text-white hover:bg-[#3A3A3A] hover:border-[#0037C1]'}`}
            >
                <span>{isSelected ? 'Selected' : 'Select This Skip'}</span>
                {!isSelected && <ArrowRight className="w-4 h-4" />}
            </button>
        </div>
    );
}; 