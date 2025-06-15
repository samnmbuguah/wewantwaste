import React, { useState } from 'react';
import {
    Box,
    Typography,
    TextField,
    Button,
    Container,
} from '@mui/material';

interface PostcodeEntryProps {
    onContinue: (postcode: string) => void;
}

export const PostcodeEntry: React.FC<PostcodeEntryProps> = ({ onContinue }) => {
    const [postcode, setPostcode] = useState('');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (postcode.trim()) {
            onContinue(postcode.trim());
        }
    };

    return (
        <Container maxWidth="sm">
            <Box
                component="form"
                onSubmit={handleSubmit}
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    gap: 3,
                    alignItems: 'center',
                }}
            >
                <Typography variant="h4" component="h1" sx={{ textAlign: 'center', mb: 2 }}>
                    Enter Your Postcode
                </Typography>
                <Typography variant="body1" color="text.secondary" sx={{ textAlign: 'center', mb: 4 }}>
                    We'll check if we can deliver to your area
                </Typography>

                <TextField
                    fullWidth
                    label="Postcode"
                    value={postcode}
                    onChange={(e) => setPostcode(e.target.value)}
                    placeholder="e.g. SW1A 1AA"
                    sx={{ mb: 2 }}
                />

                <Button
                    type="submit"
                    variant="contained"
                    size="large"
                    fullWidth
                    disabled={!postcode.trim()}
                    sx={{
                        mt: 2,
                        py: 1.5,
                    }}
                >
                    Continue
                </Button>
            </Box>
        </Container>
    );
}; 