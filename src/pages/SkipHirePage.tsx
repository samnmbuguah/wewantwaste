import React, { useState } from 'react';
import { Container, Typography, Box } from '@mui/material';
import Grid from '@mui/material/Grid';
import { SkipCard } from '../components/SkipCard';
import type { Skip } from '../types/skip';
import { skipData } from '../data/skipData';

export const SkipHirePage: React.FC = () => {
  const [selectedSkip, setSelectedSkip] = useState<Skip | null>(null);

  const handleSkipSelect = (skip: Skip) => {
    setSelectedSkip(skip);
  };

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Box sx={{ mb: 4 }}>
        <Typography variant="h3" component="h1" gutterBottom>
          Skip Hire Services
        </Typography>
        <Typography variant="subtitle1" color="text.secondary">
          Choose the perfect skip size for your waste disposal needs
        </Typography>
      </Box>

      <Grid container spacing={3} justifyContent="center">
        {skipData.map((skip: Skip) => (
          <Grid item xs={12} sm={6} md={4} key={skip.id} sx={{ display: 'flex', flexDirection: 'column' }}>
            <Box sx={{ maxWidth: '400px', mx: 'auto' }}>
              <SkipCard
                skip={skip}
                onSelect={handleSkipSelect}
                isSelected={selectedSkip?.id === skip.id}
              />
            </Box>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
}; 