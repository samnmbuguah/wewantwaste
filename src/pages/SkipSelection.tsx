import React, { useState, useEffect } from 'react';
import type { Skip } from '../types/skip';
import { getSkipsByLocation } from '../services/skipService';

interface SkipSelectionProps {
    onBack: () => void;
    onContinue: (skip: Skip) => void;
}

export const SkipSelection: React.FC<SkipSelectionProps> = ({
    onBack,
    onContinue
}) => {
    const [skips, setSkips] = useState<Skip[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [selectedSkip, setSelectedSkip] = useState<Skip | null>(null);

    useEffect(() => {
        const fetchSkips = async () => {
            try {
                setLoading(true);
                // TODO: Replace with actual postcode and area
                const response = await getSkipsByLocation('SW1A 1AA', 'London');
                setSkips(response);
            } catch (err) {
                setError('Failed to load skips. Please try again later.');
                console.error('Error fetching skips:', err);
            } finally {
                setLoading(false);
            }
        };

        fetchSkips();
    }, []);

    const handleSkipSelect = (skip: Skip) => {
        setSelectedSkip(skip);
    };

    const handleContinue = () => {
        if (selectedSkip) {
            onContinue(selectedSkip);
        }
    };

    return (
        <div>
            <h2 className="text-2xl font-bold text-center mb-4">Choose Your Skip Size</h2>
            <p className="text-gray-400 text-center mb-8">Select the skip size that best suits your needs</p>

            {loading ? (
                <div className="text-center">Loading skips...</div>
            ) : error ? (
                <div className="text-red-500 text-center">{error}</div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
                    {skips.map((skip) => (
                        <div
                            key={skip.id}
                            className={`group relative rounded-lg border-2 p-4 md:p-6 transition-all
                                ${selectedSkip?.id === skip.id
                                    ? 'border-[#0037C1] bg-[#0037C1]/10'
                                    : 'border-[#2A2A2A] hover:border-[#0037C1]/50'}
                                bg-[#1C1C1C] text-white cursor-pointer`}
                            onClick={() => handleSkipSelect(skip)}
                        >
                            {selectedSkip?.id === skip.id && (
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
                                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-alert-triangle w-4 h-4 text-yellow-500 shrink-0">
                                                <path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z"></path>
                                                <path d="M12 9v4"></path>
                                                <path d="M12 17h.01"></path>
                                            </svg>
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
                                    ${selectedSkip?.id === skip.id
                                        ? 'bg-[#0037C1] text-white hover:bg-[#002da1]'
                                        : 'bg-[#2A2A2A] text-white hover:bg-[#3A3A3A] hover:border-[#0037C1]'}`}
                            >
                                <span>{selectedSkip?.id === skip.id ? 'Selected' : 'Select This Skip'}</span>
                                {selectedSkip?.id !== skip.id && (
                                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-arrow-right w-4 h-4">
                                        <path d="M5 12h14"></path>
                                        <path d="m12 5 7 7-7 7"></path>
                                    </svg>
                                )}
                            </button>
                        </div>
                    ))}
                </div>
            )}

            <div className="fixed bottom-0 left-0 right-0 bg-[#1C1C1C] border-t border-[#2A2A2A] p-4 animate-slideUp z-50">
                <div className="max-w-7xl mx-auto">
                    <div className="mb-3 text-xs text-gray-400 text-center leading-snug">
                        Imagery and information shown throughout this website may not reflect the exact shape or size specification, colours may vary, options and/or accessories may be featured at additional cost.
                    </div>
                    <div className="lg:hidden">
                        <div className="flex items-center justify-between mb-4">
                            <h3 className="font-medium">{selectedSkip ? `${selectedSkip.size} Yard Skip` : 'Select a Skip'}</h3>
                            {selectedSkip && (
                                <div>
                                    <span className="text-xl font-bold text-[#0037C1]">
                                        £{selectedSkip.price_before_vat + (selectedSkip.price_before_vat * selectedSkip.vat / 100)}
                                    </span>
                                    <span className="text-sm text-gray-400 ml-2">{selectedSkip.hire_period_days} days</span>
                                </div>
                            )}
                        </div>
                        <div className="grid grid-cols-2 gap-3">
                            <button
                                onClick={onBack}
                                className="btn-secondary w-full"
                            >
                                Back
                            </button>
                            <button
                                onClick={handleContinue}
                                disabled={!selectedSkip}
                                className="btn-primary w-full"
                            >
                                Continue
                            </button>
                        </div>
                    </div>
                    <div className="hidden lg:flex items-center justify-between">
                        <div className="flex items-center gap-6">
                            <div>
                                <p className="text-sm text-gray-400">
                                    {selectedSkip ? `${selectedSkip.size} Yard Skip` : 'Select a Skip'}
                                </p>
                            </div>
                            {selectedSkip && (
                                <div>
                                    <span className="text-2xl font-bold text-[#0037C1]">
                                        £{selectedSkip.price_before_vat + (selectedSkip.price_before_vat * selectedSkip.vat / 100)}
                                    </span>
                                    <span className="text-sm text-gray-400 ml-2">{selectedSkip.hire_period_days} day hire</span>
                                </div>
                            )}
                        </div>
                        <div className="flex items-center gap-4">
                            <button
                                onClick={onBack}
                                className="btn-secondary"
                            >
                                Back
                            </button>
                            <button
                                onClick={handleContinue}
                                disabled={!selectedSkip}
                                className="btn-primary flex items-center gap-2"
                            >
                                Continue
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-arrow-right w-4 h-4">
                                    <path d="M5 12h14"></path>
                                    <path d="m12 5 7 7-7 7"></path>
                                </svg>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}; 