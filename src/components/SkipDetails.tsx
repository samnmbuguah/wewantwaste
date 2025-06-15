import React from 'react';
import { Truck, Clock, AlertTriangle } from 'lucide-react';
import type { Skip } from '../types/skip';

interface SkipDetailsProps {
    skip: Skip;
}

export const SkipDetails: React.FC<SkipDetailsProps> = ({ skip }) => {
    return (
        <div className="bg-[#1C1C1C] rounded-lg p-6 border border-[#2A2A2A]">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="flex items-start gap-4">
                    <div className="bg-[#0037C1]/10 p-3 rounded-lg">
                        <Truck className="w-6 h-6 text-[#0037C1]" />
                    </div>
                    <div>
                        <h3 className="text-lg font-semibold text-white mb-1">Skip Size</h3>
                        <p className="text-gray-400">{skip.size} Yard Skip</p>
                    </div>
                </div>

                <div className="flex items-start gap-4">
                    <div className="bg-[#0037C1]/10 p-3 rounded-lg">
                        <Clock className="w-6 h-6 text-[#0037C1]" />
                    </div>
                    <div>
                        <h3 className="text-lg font-semibold text-white mb-1">Hire Period</h3>
                        <p className="text-gray-400">{skip.hire_period_days} days</p>
                    </div>
                </div>

                {skip.size >= 10 && (
                    <div className="flex items-start gap-4 md:col-span-2">
                        <div className="bg-yellow-500/10 p-3 rounded-lg">
                            <AlertTriangle className="w-6 h-6 text-yellow-500" />
                        </div>
                        <div>
                            <h3 className="text-lg font-semibold text-white mb-1">Road Restrictions</h3>
                            <p className="text-gray-400">This skip size is not allowed on the road. Please ensure you have a suitable location for delivery.</p>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}; 