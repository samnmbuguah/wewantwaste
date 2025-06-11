import * as React from 'react';
import {
    Box,
    Typography,
    Button,
    Stack,
    IconButton,
    Drawer,
    List,
    ListItem,
    ListItemButton,
    ListItemIcon,
    ListItemText,
    useTheme,
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';

interface SkipStepsProps {
    steps: { name: string; icon: React.ReactNode }[];
    currentStep: number;
    mobileOpen: boolean;
    handleDrawerToggle: () => void;
}

export const SkipSteps: React.FC<SkipStepsProps> = ({
    steps,
    currentStep,
    mobileOpen,
    handleDrawerToggle,
}) => {
    const theme = useTheme();

    return (
        <>
            {/* Desktop Steps */}
            <Box sx={{ display: { xs: 'none', sm: 'flex' }, justifyContent: 'center', mb: 4, overflowX: 'auto', pt: { xs: 1, sm: 2, md: 3, lg: 4 } }}>
                <Stack direction="row" spacing={2} alignItems="center">
                    {steps.map((step, index) => (
                        <React.Fragment key={step.name}>
                            <Button
                                sx={{
                                    display: 'flex',
                                    flexDirection: 'column',
                                    alignItems: 'center',
                                    whiteSpace: 'nowrap',
                                    transition: 'color 0.2s',
                                    color: index <= currentStep ? theme.palette.primary.main : 'rgba(255, 255, 255, 0.6)',
                                    cursor: index <= currentStep ? 'pointer' : 'not-allowed',
                                    opacity: index <= currentStep ? 1 : 0.5,
                                    padding: theme.spacing(1, 2),
                                }}
                                disabled={index > currentStep}
                            >
                                {step.icon}
                                <Typography mt={0.5} sx={{ color: 'white', fontSize: '0.8rem' }}>{step.name}</Typography>
                            </Button>
                            {index < steps.length - 1 && (
                                <Box
                                    sx={{
                                        width: '32px',
                                        height: '2px',
                                        backgroundColor: index < currentStep ? theme.palette.primary.main : '#2A2A2A',
                                    }}
                                ></Box>
                            )}
                        </React.Fragment>
                    ))}
                </Stack>
            </Box>

            {/* Mobile Menu Icon */}
            <Box sx={{ display: { xs: 'flex', sm: 'none' }, justifyContent: 'flex-end', mb: 2, pt: { xs: 1, sm: 2, md: 3, lg: 4 } }}>
                <IconButton
                    color="inherit"
                    aria-label="open drawer"
                    edge="start"
                    onClick={handleDrawerToggle}
                    sx={{ color: theme.palette.text.primary }}
                >
                    <MenuIcon />
                </IconButton>
            </Box>

            {/* Mobile Drawer */}
            <Drawer
                variant="temporary"
                anchor="right"
                open={mobileOpen}
                onClose={handleDrawerToggle}
                ModalProps={{
                    keepMounted: true,
                }}
                sx={{
                    display: { xs: 'block', sm: 'none' },
                    '& .MuiDrawer-paper': {
                        boxSizing: 'border-box',
                        width: 240,
                        backgroundColor: theme.palette.background.paper,
                        color: theme.palette.text.primary,
                    },
                }}
            >
                <List>
                    {steps.map((step, index) => (
                        <ListItem key={step.name} disablePadding>
                            <ListItemButton
                                sx={{ color: index <= currentStep ? theme.palette.primary.main : theme.palette.text.primary }}
                                disabled={index > currentStep}
                                onClick={handleDrawerToggle}
                            >
                                <ListItemIcon sx={{ color: index <= currentStep ? theme.palette.primary.main : theme.palette.text.secondary }}>
                                    {step.icon}
                                </ListItemIcon>
                                <ListItemText primary={step.name} />
                            </ListItemButton>
                        </ListItem>
                    ))}
                </List>
            </Drawer>
        </>
    );
}; 