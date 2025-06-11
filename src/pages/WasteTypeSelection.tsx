import React, { useState } from 'react';
import {
    Box,
    Typography,
    Button,
    Stack,
    Paper,
    useTheme,
    IconButton,
    Drawer,
    List,
    ListItem,
    ListItemButton,
    ListItemIcon,
    ListItemText,
} from '@mui/material';
import InfoIcon from '@mui/icons-material/Info';
import HomeIcon from '@mui/icons-material/Home';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import CheckIcon from '@mui/icons-material/Check';
import { SkipSteps } from '../components/SkipSteps';
import MenuIcon from '@mui/icons-material/Menu';
import ArrowRightIcon from '@mui/icons-material/ArrowRightAlt';

interface WasteTypeSelectionProps {
    onBack: () => void;
    onContinue: (selectedWasteTypes: string[]) => void;
}

export const WasteTypeSelection: React.FC<WasteTypeSelectionProps> = ({
    onBack,
    onContinue
}) => {
    const theme = useTheme();
    const [selectedWasteTypes, setSelectedWasteTypes] = useState<string[]>([]);
    const [mobileOpen, setMobileOpen] = useState(false);

    const steps = [
        { name: 'Postcode', icon: <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-map-pin w-6 h-6"><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"></path><circle cx="12" cy="10" r="3"></circle></svg> },
        { name: 'Waste Type', icon: <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-trash2 w-6 h-6"><path d="M3 6h18"></path><path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"></path><path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"></path><line x1="10" x2="10" y1="11" y2="17"></line><line x1="14" x2="14" y1="11" y2="17"></line></svg> },
        { name: 'Select Skip', icon: <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-truck w-6 h-6"><path d="M14 18V6a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2v11a1 1 0 0 0 1 1h2"></path><path d="M15 18H9"></path><path d="M19 18h2a1 1 0 0 0 1-1v-3.65a1 1 0 0 0-.22-.624l-3.48-4.35A1 1 0 0 0 17.52 8H14"></path><circle cx="17" cy="18" r="2"></circle><circle cx="7" cy="18" r="2"></circle></svg> },
        { name: 'Permit Check', icon: <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-shield w-6 h-6"><path d="M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z"></path></svg> },
        { name: 'Choose Date', icon: <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-calendar w-6 h-6"><path d="M8 2v4"></path><path d="M16 2v4"></path><rect width="18" height="18" x="3" y="4" rx="2"></rect><path d="M3 10h18"></path></svg> },
        { name: 'Payment', icon: <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-credit-card w-6 h-6"><rect width="20" height="14" x="2" y="5" rx="2"></rect><line x1="2" x2="22" y1="10" y2="10"></line></svg> },
    ];

    const currentStep = 1; // Current step is 'Waste Type' (index 1, 0-indexed)

    const wasteTypes = [
        { name: 'Construction Waste', description: 'Building materials and renovation debris.', icon: <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-building2 w-6 h-6"><path d="M6 22V4a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v18Z"></path><path d="M6 12H4a2 2 0 0 0-2 2v6a2 2 0 0 0 2 2h2"></path><path d="M18 9h2a2 2 0 0 1 2 2v9a2 2 0 0 1-2 2h-2"></path><path d="M10 6h4"></path><path d="M10 10h4"></path><path d="M10 14h4"></path><path d="M10 18h4"></path></svg> },
        { name: 'Household Waste', description: 'General household items and furniture.', icon: <HomeIcon sx={{ fontSize: 24 }} /> },
        { name: 'Garden Waste', description: 'Green waste and landscaping materials', icon: <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-building w-6 h-6"><rect width="16" height="20" x="4" y="2" rx="2" ry="2"></rect><path d="M9 22v-4h6v4"></path><path d="M8 6h.01"></path><path d="M16 6h.01"></path><path d="M12 6h.01"></path><path d="M12 10h.01"></path><path d="M12 14h.01"></path><path d="M16 10h.01"></path><path d="M16 14h.01"></path><path d="M8 10h.01"></path><path d="M8 14h.01"></path></svg> },
        { name: 'Commercial Waste', description: 'Business and office clearance', icon: <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-building w-6 h-6"><rect width="16" height="20" x="4" y="2" rx="2" ry="2"></rect><path d="M9 22v-4h6v4"></path><path d="M8 6h.01"></path><path d="M16 6h.01"></path><path d="M12 6h.01"></path><path d="M12 10h.01"></path><path d="M12 14h.01"></path><path d="M16 10h.01"></path><path d="M16 14h.01"></path><path d="M8 10h.01"></path><path d="M8 14h.01"></path></svg> },
    ];

    const handleWasteTypeSelect = (type: string) => {
        setSelectedWasteTypes((prev) =>
            prev.includes(type) ? prev.filter((t) => t !== type) : [...prev, type]
        );
    };

    const handleDrawerToggle = () => {
        setMobileOpen(!mobileOpen);
    };

    const getSelectedWasteTypeText = () => {
        if (selectedWasteTypes.length === 0) return 'No waste types selected';
        return selectedWasteTypes.join(', ');
    };

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
                    mobileOpen={mobileOpen}
                    handleDrawerToggle={handleDrawerToggle}
                />

                <Box sx={{ maxWidth: '5xl', mx: 'auto', width: '100%' }}>
                    <Typography variant="h4" align="center" sx={{ mb: 8, fontWeight: 600 }}>
                        What type of waste are you disposing of?
                    </Typography>

                    <Box sx={{
                        bgcolor: 'primary.dark',
                        border: `1px solid ${theme.palette.primary.main}`,
                        borderRadius: 2,
                        p: 4,
                        mb: 8
                    }}>
                        <Stack direction="row" alignItems="flex-start" spacing={3}>
                            <InfoIcon sx={{ color: 'info.main', fontSize: 24, mt: 0.5 }} />
                            <Typography variant="body1" color="text.secondary">
                                Select all that apply
                            </Typography>
                        </Stack>
                    </Box>

                    <Box
                        sx={{
                            display: 'grid',
                            gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' },
                            gap: 3,
                        }}
                    >
                        {wasteTypes.map((type) => (
                            <Button
                                key={type.name}
                                onClick={() => handleWasteTypeSelect(type.name)}
                                sx={{
                                    width: '100%',
                                    textAlign: 'left',
                                    p: 6,
                                    borderRadius: 2,
                                    border: `2px solid ${selectedWasteTypes.includes(type.name) ? theme.palette.primary.main : theme.palette.divider}`,
                                    bgcolor: selectedWasteTypes.includes(type.name) ? theme.palette.primary.dark + '20' : theme.palette.background.paper,
                                    transition: 'all 0.2s',
                                    '&:hover': {
                                        borderColor: theme.palette.primary.main + '80',
                                        bgcolor: selectedWasteTypes.includes(type.name) ? theme.palette.primary.dark + '20' : theme.palette.action.hover,
                                    },
                                    position: 'relative',
                                    display: 'block'
                                }}
                            >
                                <Box sx={{ position: 'absolute', top: theme.spacing(4), right: theme.spacing(4) }}>
                                    <Box
                                        sx={{
                                            width: 20,
                                            height: 20,
                                            border: `2px solid ${selectedWasteTypes.includes(type.name) ? theme.palette.primary.main : theme.palette.divider}`,
                                            borderRadius: 1,
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                            bgcolor: selectedWasteTypes.includes(type.name) ? theme.palette.primary.main : 'transparent',
                                        }}
                                    >
                                        {selectedWasteTypes.includes(type.name) && (
                                            <CheckIcon sx={{ color: 'white', fontSize: 16 }} />
                                        )}
                                    </Box>
                                </Box>
                                <Stack direction="row" alignItems="flex-start" spacing={4}>
                                    <Box
                                        sx={{
                                            p: 3,
                                            borderRadius: '50%',
                                            bgcolor: 'background.paper',
                                            border: `1px solid ${theme.palette.divider}`,
                                            color: selectedWasteTypes.includes(type.name) ? theme.palette.primary.main : theme.palette.text.secondary
                                        }}
                                    >
                                        {type.icon}
                                    </Box>
                                    <Box sx={{ flex: 1 }}>
                                        <Typography variant="h6" sx={{ fontWeight: 600, mb: 2 }}>
                                            {type.name}
                                        </Typography>
                                        <Typography variant="body2" color="text.secondary">
                                            {type.description}
                                        </Typography>
                                    </Box>
                                </Stack>
                            </Button>
                        ))}
                    </Box>
                </Box>
            </Box>

            <Paper
                elevation={0}
                sx={{
                    position: 'fixed',
                    bottom: 0,
                    left: 0,
                    right: 0,
                    p: 3,
                    bgcolor: 'background.paper',
                    borderTop: `1px solid ${theme.palette.divider}`,
                    zIndex: 1000
                }}
            >
                <Box
                    sx={{
                        maxWidth: '1600px',
                        mx: 'auto',
                        px: { xs: 2, sm: 4, md: 6, lg: 8 },
                        display: 'flex',
                        flexDirection: { xs: 'column', lg: 'row' },
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        gap: { xs: 3, lg: 0 }
                    }}
                >
                    <Box sx={{ display: { xs: 'block', lg: 'none' }, width: '100%' }}>
                        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                            <Typography variant="subtitle1" fontWeight="medium">Selected Waste Types</Typography>
                            <Typography variant="body2" color="text.secondary" sx={{ maxWidth: '70%', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                                {getSelectedWasteTypeText()}
                            </Typography>
                        </Box>
                        <Stack direction="row" spacing={2} sx={{ width: '100%' }}>
                            <Button
                                variant="outlined"
                                onClick={onBack}
                                sx={{
                                    bgcolor: 'background.paper',
                                    color: 'white',
                                    '&:hover': {
                                        bgcolor: 'action.hover'
                                    },
                                    flex: 1
                                }}
                            >
                                Back
                            </Button>
                            <Button
                                variant="contained"
                                onClick={() => onContinue(selectedWasteTypes)}
                                disabled={selectedWasteTypes.length === 0}
                                sx={{
                                    bgcolor: 'primary.main',
                                    color: 'white',
                                    '&:hover': {
                                        bgcolor: 'primary.dark'
                                    },
                                    flex: 1
                                }}
                            >
                                Continue
                            </Button>
                        </Stack>
                    </Box>
                    <Box sx={{ display: { xs: 'none', lg: 'flex' }, alignItems: 'center', gap: 6 }}>
                        <Box>
                            <Typography variant="subtitle1" fontWeight="medium">Selected Waste Types</Typography>
                            <Typography variant="body2" color="text.secondary">
                                {getSelectedWasteTypeText()}
                            </Typography>
                        </Box>
                        <Stack direction="row" spacing={2} alignItems="center">
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
                                onClick={() => onContinue(selectedWasteTypes)}
                                disabled={selectedWasteTypes.length === 0}
                                sx={{
                                    bgcolor: 'primary.main',
                                    color: 'white',
                                    '&:hover': {
                                        bgcolor: 'primary.dark'
                                    },
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: 1
                                }}
                            >
                                Continue <ArrowRightIcon sx={{ fontSize: 16 }} />
                            </Button>
                        </Stack>
                    </Box>
                </Box>
            </Paper>
        </Box>
    );
}; 