import { useState } from 'react';
import { Info, Check, ArrowRight } from 'lucide-react';
import type { WasteType } from '../types/waste';

const wasteTypes: WasteType[] = [
    {
        id: 'general',
        name: 'General Waste',
        description: 'Household waste, furniture, and non-hazardous materials',
        icon: '🏠',
    },
    {
        id: 'construction',
        name: 'Construction Waste',
        description: 'Building materials, rubble, and construction debris',
        icon: '🏗️',
    },
    {
        id: 'garden',
        name: 'Garden Waste',
        description: 'Green waste, branches, and garden debris',
        icon: '🌳',
    },
];

interface WasteTypeSelectionProps {
    onContinue: () => void;
    onBack: () => void;
}

export default function WasteTypeSelection({ onContinue, onBack }: WasteTypeSelectionProps) {
    const [selectedType, setSelectedType] = useState<string | null>(null);

    const handleTypeSelect = (typeId: string) => {
        setSelectedType(typeId);
    };

    const handleContinue = () => {
        if (selectedType) {
            onContinue();
        }
    };

    return (
        <div className="max-w-4xl mx-auto px-4 py-8">
            <div className="text-center mb-8">
                <h1 className="text-3xl font-bold text-white mb-4">What type of waste do you have?</h1>
                <p className="text-gray-400">Select the type of waste you need to dispose of</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
                {wasteTypes.map((type) => (
                    <div
                        key={type.id}
                        className={`p-6 rounded-lg border cursor-pointer transition-all ${selectedType === type.id
                            ? 'bg-[#0037C1] border-[#0037C1]'
                            : 'bg-[#1C1C1C] border-[#2A2A2A] hover:border-[#0037C1]'
                        }`}
                        onClick={() => handleTypeSelect(type.id)}
                    >
                        <div className="flex items-center gap-4 mb-4">
                            <span className="text-4xl">{type.icon}</span>
                            <div>
                                <h3 className={`text-lg font-semibold ${selectedType === type.id ? 'text-white' : 'text-white'}`}>
                                    {type.name}
                                </h3>
                                <p className={`text-sm ${selectedType === type.id ? 'text-blue-200' : 'text-gray-400'}`}>
                                    {type.description}
                                </p>
                            </div>
                        </div>
                        {selectedType === type.id && (
                            <div className="flex items-center gap-2 text-blue-200">
                                <Check className="w-5 h-5" />
                                <span>Selected</span>
                            </div>
                        )}
                    </div>
                ))}
            </div>

            <div className="flex justify-center gap-4">
                <button
                    onClick={onBack}
                    className="flex items-center gap-2 px-6 py-3 rounded-lg font-semibold transition-all bg-[#2A2A2A] text-white hover:bg-[#3A3A3A]"
                >
                    Back
                </button>
                <button
                    onClick={handleContinue}
                    disabled={!selectedType}
                    className={`flex items-center gap-2 px-6 py-3 rounded-lg font-semibold transition-all ${selectedType
                        ? 'bg-[#0037C1] text-white hover:bg-[#002a94]'
                        : 'bg-gray-600 text-gray-400 cursor-not-allowed'
                    }`}
                >
                    Continue
                    <ArrowRight className="w-5 h-5" />
                </button>
            </div>

            <div className="mt-8 p-4 bg-yellow-500/10 rounded-lg border border-yellow-500/20">
                <div className="flex items-start gap-3">
                    <Info className="w-5 h-5 text-yellow-500 mt-0.5" />
                    <div>
                        <h3 className="text-lg font-semibold text-white mb-1">Important Information</h3>
                        <p className="text-gray-400">
                            Different waste types may require different skip sizes and have specific disposal requirements.
                            Please ensure you select the correct waste type for your needs.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
} 