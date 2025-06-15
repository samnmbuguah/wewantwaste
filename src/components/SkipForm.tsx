import React, { useState } from 'react';
import Grid from '@mui/material/Grid';
import {
    Box,
    Typography,
    TextField,
    Button,
    FormControlLabel,
    Checkbox,
    useTheme,
} from '@mui/material';
import type { Skip } from '../types/skip';
import { formatCurrency } from '../utils/formatters';

interface SkipFormProps {
    skip: Skip;
    onContinue: () => void;
    onBack: () => void;
}

export const SkipForm: React.FC<SkipFormProps> = ({ skip, onContinue, onBack }) => {
    const theme = useTheme();
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        address: '',
        postcode: '',
        agreeToTerms: false,
    });

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value, checked } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: name === 'agreeToTerms' ? checked : value,
        }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        console.log('Form submitted:', formData);
        onContinue();
    };

    return (
        <form onSubmit={handleSubmit} className="max-w-4xl mx-auto">
            <Typography variant="h5" sx={{ fontWeight: 600, mb: 3, textAlign: 'center' }}>
                Delivery Details
            </Typography>

            <Grid container spacing={3} justifyContent="center">
                <Grid item xs={12} md={6}>
                    <Box sx={{ maxWidth: '600px' }}>
                        <TextField
                            fullWidth
                            label="Full Name"
                            name="name"
                            value={formData.name}
                            onChange={handleInputChange}
                            required
                            margin="normal"
                            variant="outlined"
                        />
                        <TextField
                            fullWidth
                            label="Email"
                            name="email"
                            type="email"
                            value={formData.email}
                            onChange={handleInputChange}
                            required
                            margin="normal"
                            variant="outlined"
                        />
                        <TextField
                            fullWidth
                            label="Phone Number"
                            name="phone"
                            value={formData.phone}
                            onChange={handleInputChange}
                            required
                            margin="normal"
                            variant="outlined"
                        />
                    </Box>
                </Grid>

                <Grid item xs={12} md={6}>
                    <Box sx={{ maxWidth: '600px' }}>
                        <TextField
                            fullWidth
                            label="Address"
                            name="address"
                            value={formData.address}
                            onChange={handleInputChange}
                            required
                            margin="normal"
                            variant="outlined"
                            multiline
                            rows={3}
                        />
                        <TextField
                            fullWidth
                            label="Postcode"
                            name="postcode"
                            value={formData.postcode}
                            onChange={handleInputChange}
                            required
                            margin="normal"
                            variant="outlined"
                        />
                    </Box>
                </Grid>
            </Grid>

            <div className="mt-8">
                <FormControlLabel
                    control={
                        <Checkbox
                            name="agreeToTerms"
                            checked={formData.agreeToTerms}
                            onChange={handleInputChange}
                            required
                        />
                    }
                    label={
                        <Typography variant="body2" color="text.secondary">
                            I agree to the terms and conditions and confirm that I have read the privacy policy
                        </Typography>
                    }
                />
            </div>

            <div className="mt-8 flex justify-between items-center">
                <div className="text-2xl font-bold text-[#0037C1]">
                    Total: {formatCurrency(skip.price_before_vat + (skip.price_before_vat * skip.vat / 100))}
                </div>
                <div className="flex gap-4">
                    <Button
                        variant="outlined"
                        onClick={onBack}
                        className="text-white border-white hover:border-[#0037C1] hover:text-[#0037C1]"
                    >
                        Back
                    </Button>
                    <Button
                        type="submit"
                        variant="contained"
                        disabled={!formData.agreeToTerms}
                        className="bg-[#0037C1] text-white hover:bg-[#002a94]"
                    >
                        Continue to Payment
                    </Button>
                </div>
            </div>
        </form>
    );
}; 