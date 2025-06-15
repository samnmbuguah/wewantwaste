import React from 'react';
import Grid from '@mui/material/Grid';
import { SkipCard } from './SkipCard';
import type { Skip } from '../types/skip';

interface SkipGridProps {
    skips: Skip[];
    onSelectSkip: (skip: Skip) => void;
    selectedSkip: Skip | null;
}

export const SkipGrid: React.FC<SkipGridProps> = ({ skips, onSelectSkip, selectedSkip }) => {
    return (
        <Grid container spacing={3} justifyContent="center">
            {skips.map((skip) => (
                <Grid item xs={12} sm={6} md={4} key={skip.id}>
                    <SkipCard
                        skip={skip}
                        onSelect={onSelectSkip}
                        isSelected={selectedSkip?.id === skip.id}
                    />
                </Grid>
            ))}
        </Grid>
    );
}; 