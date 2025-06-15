import React from 'react';
import { Box, Typography, Button, Container } from '@mui/material';

interface PaymentProps {
    onBack: () => void;
    onContinue: (paymentDetails: any) => void;
}

export const Payment: React.FC<PaymentProps> = ({ onBack, onContinue }) => {
    return (
        <Container maxWidth="sm">
            <Box sx={{ textAlign: 'center', py: 4 }}>
                <Typography variant="h4" component="h1" gutterBottom>
                    Payment
                </Typography>
                <Typography variant="body1" color="text.secondary" paragraph>
                    Payment integration coming soon...
                </Typography>
                <Box sx={{ mt: 4, display: 'flex', gap: 2, justifyContent: 'center' }}>
                    <Button variant="outlined" onClick={onBack}>
                        Back
                    </Button>
                    <Button variant="contained" onClick={() => onContinue({})}>
                        Continue
                    </Button>
                </Box>
            </Box>
        </Container>
    );
}; 