import React from 'react';
import { MapPin, Trash2, Truck, Shield, Calendar, CreditCard, Menu } from 'lucide-react';
import {
    Box,
    Typography,
    Stack,
    IconButton,
    Drawer,
    List,
    ListItem,
    ListItemButton,
    ListItemIcon,
    ListItemText,
    useTheme,
    Container,
} from '@mui/material';

interface Step {
    name: string;
    icon: React.ReactNode;
}

interface SkipStepsProps {
    steps: Step[];
    currentStep: number;
    mobileOpen: boolean;
    handleDrawerToggle: () => void;
}

export const SkipSteps: React.FC<SkipStepsProps> = ({
    steps,
    currentStep,
    mobileOpen,
    handleDrawerToggle
}) => {
    const theme = useTheme();

    const defaultSteps = [
        { name: 'Postcode', icon: <MapPin className="w-6 h-6" /> },
        { name: 'Waste Type', icon: <Trash2 className="w-6 h-6" /> },
        { name: 'Select Skip', icon: <Truck className="w-6 h-6" /> },
        { name: 'Permit Check', icon: <Shield className="w-6 h-6" /> },
        { name: 'Choose Date', icon: <Calendar className="w-6 h-6" /> },
        { name: 'Payment', icon: <CreditCard className="w-6 h-6" /> },
    ];

    const displaySteps = steps || defaultSteps;

    return (
        <Box sx={{ width: '100%', bgcolor: 'background.paper', borderBottom: `1px solid ${theme.palette.divider}` }}>
            <Container maxWidth="xl" sx={{ px: { xs: 2, sm: 3, md: 4 } }}>
                <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', py: 2 }}>
                    <IconButton
                        color="inherit"
                        aria-label="open drawer"
                        edge="start"
                        onClick={handleDrawerToggle}
                        sx={{ mr: 2, display: { sm: 'none' } }}
                    >
                        <Menu className="w-6 h-6" />
                    </IconButton>
                    <Stack
                        direction="row"
                        spacing={2}
                        sx={{
                            display: { xs: 'none', sm: 'flex' },
                            width: '100%',
                            justifyContent: 'center',
                            alignItems: 'center',
                        }}
                    >
                        {displaySteps.map((step, index) => (
                            <Box
                                key={step.name}
                                sx={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    flex: 1,
                                    maxWidth: '200px',
                                }}
                            >
                                <Box
                                    sx={{
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        width: '100%',
                                        position: 'relative',
                                    }}
                                >
                                    <Box
                                        sx={{
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                            width: 40,
                                            height: 40,
                                            borderRadius: '50%',
                                            bgcolor: index <= currentStep ? 'primary.main' : 'background.paper',
                                            color: index <= currentStep ? 'white' : 'text.secondary',
                                            border: `2px solid ${index <= currentStep ? 'primary.main' : theme.palette.divider}`,
                                            zIndex: 1,
                                        }}
                                    >
                                        {step.icon}
                                    </Box>
                                    {index < displaySteps.length - 1 && (
                                        <Box
                                            sx={{
                                                position: 'absolute',
                                                top: '50%',
                                                left: '50%',
                                                width: '100%',
                                                height: 2,
                                                bgcolor: index < currentStep ? 'primary.main' : theme.palette.divider,
                                                transform: 'translateY(-50%)',
                                                zIndex: 0,
                                            }}
                                        />
                                    )}
                                </Box>
                                <Typography
                                    variant="body2"
                                    sx={{
                                        position: 'absolute',
                                        top: '100%',
                                        left: '50%',
                                        transform: 'translateX(-50%)',
                                        mt: 1,
                                        color: index <= currentStep ? 'primary.main' : 'text.secondary',
                                        fontWeight: index === currentStep ? 600 : 400,
                                        whiteSpace: 'nowrap',
                                        textAlign: 'center',
                                        width: 'max-content',
                                    }}
                                >
                                    {step.name}
                                </Typography>
                            </Box>
                        ))}
                    </Stack>
                </Box>
            </Container>
            <Drawer
                variant="temporary"
                anchor="left"
                open={mobileOpen}
                onClose={handleDrawerToggle}
                ModalProps={{
                    keepMounted: true,
                }}
                sx={{
                    display: { xs: 'block', sm: 'none' },
                    '& .MuiDrawer-paper': { boxSizing: 'border-box', width: 240 },
                }}
            >
                <List>
                    {displaySteps.map((step, index) => (
                        <ListItem key={step.name} disablePadding>
                            <ListItemButton>
                                <ListItemIcon
                                    sx={{
                                        color: index <= currentStep ? 'primary.main' : 'text.secondary',
                                    }}
                                >
                                    {step.icon}
                                </ListItemIcon>
                                <ListItemText
                                    primary={step.name}
                                    sx={{
                                        color: index <= currentStep ? 'primary.main' : 'text.secondary',
                                    }}
                                />
                            </ListItemButton>
                        </ListItem>
                    ))}
                </List>
            </Drawer>
        </Box>
    );
}; 