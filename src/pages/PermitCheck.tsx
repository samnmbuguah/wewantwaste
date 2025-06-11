import React, { useState } from 'react';
import {
    Box,
    Button,
    Typography,
    useTheme,
    Paper,
    Stack,
    IconButton
} from '@mui/material';
import HomeIcon from '@mui/icons-material/Home';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import { SkipSteps } from '../components/SkipSteps';
import type { Skip } from '../types/skip';

interface PermitCheckProps {
    selectedSkip: Skip;
    onBack: () => void;
    onContinue: (location: 'private' | 'public') => void;
}

export const PermitCheck: React.FC<PermitCheckProps> = ({
    selectedSkip,
    onBack,
    onContinue
}) => {
    const theme = useTheme();
    const [selectedLocation, setSelectedLocation] = useState<'private' | 'public' | null>(null);

    const steps = [
        { name: 'Postcode', icon: <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-map-pin w-6 h-6"><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"></path><circle cx="12" cy="10" r="3"></circle></svg> },
        { name: 'Waste Type', icon: <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-trash2 w-6 h-6"><path d="M3 6h18"></path><path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"></path><path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"></path><line x1="10" x2="10" y1="11" y2="17"></line><line x1="14" x2="14" y1="11" y2="17"></line></svg> },
        { name: 'Select Skip', icon: <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-truck w-6 h-6"><path d="M14 18V6a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2v11a1 1 0 0 0 1 1h2"></path><path d="M15 18H9"></path><path d="M19 18h2a1 1 0 0 0 1-1v-3.65a1 1 0 0 0-.22-.624l-3.48-4.35A1 1 0 0 0 17.52 8H14"></path><circle cx="17" cy="18" r="2"></circle><circle cx="7" cy="18" r="2"></circle></svg> },
        { name: 'Permit Check', icon: <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-shield w-6 h-6"><path d="M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z"></path></svg> },
        { name: 'Choose Date', icon: <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-calendar w-6 h-6"><path d="M8 2v4"></path><path d="M16 2v4"></path><rect width="18" height="18" x="3" y="4" rx="2"></rect><path d="M3 10h18"></path></svg> },
        { name: 'Payment', icon: <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-credit-card w-6 h-6"><rect width="20" height="14" x="2" y="5" rx="2"></rect><line x1="2" x2="22" y1="10" y2="10"></line></svg> },
    ];

    const currentStep = 3; // Current step is 'Permit Check' (index 3, 0-indexed)

    return (
        <Box
            sx={{
                minHeight: '100vh',
                backgroundColor: theme.palette.background.default,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                width: '100%',
                overflow: 'hidden'
            }}
        >
            <Box
                sx={{
                    width: '100%',
                    maxWidth: '1600px',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    gap: 3,
                    px: { xs: 2, sm: 4, md: 6, lg: 8 }
                }}
            >
                <SkipSteps
                    steps={steps}
                    currentStep={currentStep}
                    mobileOpen={false}
                    handleDrawerToggle={() => { }}
                />

                <Box sx={{ maxWidth: '2xl', mx: 'auto', width: '100%' }}>
                    <Box sx={{ mb: 6 }}>
                        <Typography variant="h4" align="center" sx={{ mb: 3, fontWeight: 600 }}>
                            Where will the skip be placed?
                        </Typography>
                        <Typography variant="body1" align="center" color="text.secondary">
                            This helps us determine if you need a permit for your skip
                        </Typography>
                    </Box>

                    <Stack
                        direction={{ xs: 'column', md: 'row' }}
                        spacing={3}
                        sx={{ mb: 8 }}
                    >
                        <Paper
                            elevation={0}
                            sx={{
                                p: 6,
                                borderRadius: 2,
                                border: `2px solid ${selectedLocation === 'private' ? theme.palette.primary.main : theme.palette.divider}`,
                                bgcolor: 'background.paper',
                                cursor: 'pointer',
                                '&:hover': {
                                    borderColor: theme.palette.primary.main + '80'
                                },
                                flex: 1
                            }}
                            onClick={() => setSelectedLocation('private')}
                        >
                            <Stack direction="row" spacing={3} sx={{ mb: 4 }}>
                                <Box
                                    sx={{
                                        p: 3,
                                        borderRadius: '50%',
                                        bgcolor: 'background.paper',
                                        border: `1px solid ${theme.palette.divider}`
                                    }}
                                >
                                    <HomeIcon sx={{ color: 'primary.main', fontSize: 24 }} />
                                </Box>
                                <Box>
                                    <Typography variant="h6" sx={{ fontWeight: 600 }}>
                                        Private Property
                                    </Typography>
                                    <Typography variant="body2" color="text.secondary">
                                        Driveway or private land
                                    </Typography>
                                </Box>
                            </Stack>
                            <Typography variant="body2" color="text.secondary">
                                No permit required when placed on your private property
                            </Typography>
                        </Paper>

                        <Paper
                            elevation={0}
                            sx={{
                                p: 6,
                                borderRadius: 2,
                                border: `2px solid ${selectedLocation === 'public' ? theme.palette.primary.main : theme.palette.divider}`,
                                bgcolor: 'background.paper',
                                cursor: 'pointer',
                                '&:hover': {
                                    borderColor: theme.palette.primary.main + '80'
                                },
                                flex: 1
                            }}
                            onClick={() => setSelectedLocation('public')}
                        >
                            <Stack direction="row" spacing={3} sx={{ mb: 4 }}>
                                <Box
                                    sx={{
                                        p: 3,
                                        borderRadius: '50%',
                                        bgcolor: 'background.paper',
                                        border: `1px solid ${theme.palette.divider}`
                                    }}
                                >
                                    <LocalShippingIcon sx={{ color: 'primary.main', fontSize: 24 }} />
                                </Box>
                                <Box>
                                    <Typography variant="h6" sx={{ fontWeight: 600 }}>
                                        Public Road
                                    </Typography>
                                    <Typography variant="body2" color="text.secondary">
                                        Council or public property
                                    </Typography>
                                </Box>
                            </Stack>
                            <Typography variant="body2" color="text.secondary">
                                Permit required for placement on public roads
                            </Typography>
                        </Paper>
                    </Stack>

                    <Stack
                        direction="row"
                        spacing={2}
                        justifyContent="center"
                    >
                        <Button
                            variant="outlined"
                            onClick={onBack}
                            sx={{
                                bgcolor: 'background.paper',
                                color: 'white',
                                '&:hover': {
                                    bgcolor: 'action.hover'
                                }
                            }}
                        >
                            Back
                        </Button>
                        <Button
                            variant="contained"
                            disabled={!selectedLocation}
                            onClick={() => selectedLocation && onContinue(selectedLocation)}
                            sx={{
                                bgcolor: 'primary.main',
                                color: 'white',
                                '&:hover': {
                                    bgcolor: 'primary.dark'
                                }
                            }}
                        >
                            Continue
                        </Button>
                    </Stack>
                </Box>
            </Box>
        </Box>
    );
}; 