import React from 'react';
import {
    Box,
    CircularProgress,
    Alert,
    Typography,
    useTheme,
} from '@mui/material';
import { SkipCard } from './SkipCard';
import type { Skip } from '../types/skip';

interface SkipGridProps {
    skips: Skip[];
    loading: boolean;
    error: string | null;
    handleSkipSelect: (skip: Skip) => void;
}

export const SkipGrid: React.FC<SkipGridProps> = ({
    skips,
    loading,
    error,
    handleSkipSelect,
}) => {

    if (loading) {
        return (
            <Box display="flex" justifyContent="center" alignItems="center" minHeight="60vh">
                <CircularProgress />
            </Box>
        );
    }

    if (error) {
        return (
            <Box sx={{ mt: 4 }}>
                <Alert severity="error">{error}</Alert>
            </Box>
        );
    }

    return (
        <>
            {skips && skips.length > 0 ? (
                <Box
                    sx={{
                        width: '100%',
                        display: 'flex',
                        flexWrap: 'wrap',
                        gap: 3,
                        justifyContent: 'center'
                    }}
                >
                    {skips.map((skip) => (
                        <Box
                            key={skip.id}
                            sx={{
                                flexBasis: {
                                    xs: '100%',
                                    sm: 'calc(50% - 12px)',
                                    md: 'calc(33.333% - 16px)',
                                    lg: 'calc(25% - 18px)'
                                },
                                minWidth: {
                                    xs: '100%',
                                    sm: '300px',
                                    md: '280px',
                                    lg: '260px'
                                },
                                maxWidth: {
                                    xs: '100%',
                                    sm: 'calc(50% - 12px)',
                                    md: 'calc(33.333% - 16px)',
                                    lg: 'calc(25% - 18px)'
                                }
                            }}
                        >
                            <SkipCard skip={skip} onSelect={handleSkipSelect} />
                        </Box>
                    ))}
                </Box>
            ) : (
                <Typography variant="h6" align="center" mt={4}>
                    No skips available for this location.
                </Typography>
            )}
        </>
    );
}; 