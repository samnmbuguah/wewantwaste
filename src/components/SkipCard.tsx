import React from 'react';
import {
    Card,
    CardContent,
    Typography,
    Button,
    Box,
    Chip,
    useTheme,
} from '@mui/material';
import type { Skip } from '../types/skip';
import WarningIcon from '@mui/icons-material/Warning';

interface SkipCardProps {
    skip: Skip;
    onSelect: (skip: Skip) => void;
    selected?: boolean;
}

export const SkipCard: React.FC<SkipCardProps> = ({ skip, onSelect, selected }) => {
    const theme = useTheme();
    const calculateTotalPrice = () => {
        const basePrice = skip.price_before_vat;
        const vatAmount = (basePrice * skip.vat) / 100;
        return basePrice + vatAmount;
    };

    return (
        <Card
            sx={{
                maxWidth: 345,
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
                transition: 'transform 0.2s, box-shadow 0.2s',
                '&:hover': {
                    transform: 'translateY(-4px)',
                    boxShadow: 3,
                },
                border: selected ? `2px solid ${theme.palette.primary.main}` : `2px solid ${theme.palette.background.paper}`,
                bgcolor: selected ? theme.palette.primary.main + '0D' : theme.palette.background.paper,
                color: theme.palette.text.primary,
                position: 'relative',
            }}
        >
            {selected && (
                <Box
                    sx={{
                        position: 'absolute',
                        top: 12,
                        right: 12,
                        color: theme.palette.primary.main,
                    }}
                >
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                    >
                        <path d="M20 6 9 17l-5-5" />
                    </svg>
                </Box>
            )}

            <CardContent sx={{ flexGrow: 1 }}>
                <Box sx={{ position: 'relative', mb: 2 }}>
                    <img
                        src={`https://yozbrydxdlcxghkphhtq.supabase.co/storage/v1/object/public/skips/skip-sizes/${skip.size}-yarder-skip.jpg`}
                        alt={`${skip.size} Yard Skip`}
                        style={{
                            width: '100%',
                            height: '192px',
                            objectFit: 'cover',
                            borderRadius: '8px',
                        }}
                    />
                    <Chip
                        label={`${skip.size} Yards`}
                        sx={{
                            position: 'absolute',
                            top: 12,
                            right: 8,
                            bgcolor: theme.palette.primary.main,
                            color: theme.palette.primary.contrastText,
                            fontWeight: 500,
                        }}
                    />
                    {!skip.allowed_on_road && (
                        <Box
                            sx={{
                                position: 'absolute',
                                bottom: 12,
                                left: 8,
                                bgcolor: 'rgba(0, 0, 0, 0.9)',
                                backdropFilter: 'blur(4px)',
                                borderRadius: '8px',
                                p: 1.5,
                                display: 'flex',
                                alignItems: 'center',
                                gap: 1,
                            }}
                        >
                            <WarningIcon sx={{ color: '#FFB800', fontSize: 16 }} />
                            <Typography
                                variant="caption"
                                sx={{ color: '#FFB800', fontWeight: 500 }}
                            >
                                Not Allowed On The Road
                            </Typography>
                        </Box>
                    )}
                </Box>

                <Typography variant="h6" gutterBottom>
                    {skip.size} Yard Skip
                </Typography>
                <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                    {skip.hire_period_days} day hire period
                </Typography>

                <Box sx={{ mb: 2 }}>
                    <Typography variant="h5" color={theme.palette.primary.main} fontWeight="bold">
                        £{calculateTotalPrice().toFixed(2)}
                    </Typography>
                </Box>

                <Button
                    variant={selected ? "contained" : "outlined"}
                    fullWidth
                    onClick={() => onSelect(skip)}
                    sx={{
                        bgcolor: selected ? theme.palette.primary.main : theme.palette.background.default,
                        color: selected ? theme.palette.primary.contrastText : theme.palette.text.primary,
                        '&:hover': {
                            bgcolor: selected ? theme.palette.primary.dark : theme.palette.background.paper,
                        },
                        py: 1.5,
                        borderRadius: 1,
                    }}
                >
                    {selected ? 'Selected' : 'Select This Skip'}
                    {!selected && (
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            style={{ marginLeft: 8 }}
                        >
                            <path d="M5 12h14" />
                            <path d="m12 5 7 7-7 7" />
                        </svg>
                    )}
                </Button>
            </CardContent>
        </Card>
    );
}; 