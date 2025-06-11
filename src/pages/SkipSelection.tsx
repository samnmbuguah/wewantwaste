import React, { useEffect, useState } from 'react';
import {
    Box,
    useTheme,
} from '@mui/material';
import { getSkipsByLocation } from '../services/skipService';
import type { Skip } from '../types/skip';
import { SkipSelectionHeader } from '../components/SkipSelectionHeader';
import { SkipSteps } from '../components/SkipSteps';
import { SkipGrid } from '../components/SkipGrid';
import { SkipSummary } from '../components/SkipSummary';

export const SkipSelection: React.FC = () => {
    const [skips, setSkips] = useState<Skip[]>([]);
    const [selectedSkip, setSelectedSkip] = useState<Skip | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [mobileOpen, setMobileOpen] = useState(false);
    const theme = useTheme();

    const currentStep = 2; // Current step is 'Select Skip' (index 2, 0-indexed)

    const steps = [
        { name: 'Postcode', icon: <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-map-pin w-6 h-6"><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"></path><circle cx="12" cy="10" r="3"></circle></svg> },
        { name: 'Waste Type', icon: <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-trash2 w-6 h-6"><path d="M3 6h18"></path><path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"></path><path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"></path><line x1="10" x2="10" y1="11" y2="17"></line><line x1="14" x2="14" y1="11" y2="17"></line></svg> },
        { name: 'Select Skip', icon: <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-truck w-6 h-6"><path d="M14 18V6a2 0 0 0-2-2H4a2 0 0 0-2 2v11a1 1 0 0 0 1 1h2"></path><path d="M15 18H9"></path><path d="M19 18h2a1 1 0 0 0 1-1v-3.65a1 1 0 0 0-.22-.624l-3.48-4.35A1 1 0 0 0 17.52 8H14"></path><circle cx="17" cy="18" r="2"></circle><circle cx="7" cy="18" r="2"></circle></svg> },
        { name: 'Permit Check', icon: <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-shield w-6 h-6"><path d="M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z"></path></svg> },
        { name: 'Choose Date', icon: <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-calendar w-6 h-6"><path d="M8 2v4"></path><path d="M16 2v4"></path><rect width="18" height="18" x="3" y="4" rx="2"></rect><path d="M3 10h18"></path></svg> },
        { name: 'Payment', icon: <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-credit-card w-6 h-6"><rect width="20" height="14" x="2" y="5" rx="2"></rect><line x1="2" x2="22" y1="10" y2="10"></line></svg> },
    ];

    useEffect(() => {
        const fetchSkips = async () => {
            try {
                const response = await getSkipsByLocation('NR32', 'Lowestoft');
                console.log('Response from getSkipsByLocation:', response);
                setSkips(Array.isArray(response) ? response : []);
                setError(null);
            } catch (err) {
                console.error('Failed to load skip options:', err);
                setError('Failed to load skip options. Please try again later.');
                setSkips([]);
            } finally {
                setLoading(false);
            }
        };

        fetchSkips();
    }, []);

    const handleSkipSelect = (skip: Skip) => {
        setSelectedSkip(skip);
    };

    const handleDrawerToggle = () => {
        setMobileOpen(!mobileOpen);
    };

    const calculateTotalPrice = (skip: Skip) => {
        const basePrice = skip.price_before_vat;
        const vatAmount = (basePrice * skip.vat) / 100;
        return basePrice + vatAmount;
    };

    return (
        <Box
            sx={{
                minHeight: '100vh',
                backgroundColor: theme.palette.background.default,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center'
            }}
        >
            <Box sx={{ width: '100%', maxWidth: '1440px', px: { xs: 2, sm: 3, md: 4 } }}>
                <SkipSteps
                    steps={steps}
                    currentStep={currentStep}
                    mobileOpen={mobileOpen}
                    handleDrawerToggle={handleDrawerToggle}
                />
                <SkipSelectionHeader />
                <SkipGrid
                    skips={skips}
                    loading={loading}
                    error={error}
                    handleSkipSelect={handleSkipSelect}
                />
            </Box>
            {selectedSkip && (
                <SkipSummary
                    selectedSkip={selectedSkip}
                    calculateTotalPrice={calculateTotalPrice}
                    setSelectedSkip={setSelectedSkip}
                />
            )}
        </Box>
    );
}; 