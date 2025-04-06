import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import { AppBar, Toolbar, Typography, Container, Box, CssBaseline } from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';

// Create minimal component files if missing
const Dashboard = () => <div>Dashboard</div>;
const WeatherForecast = () => <div>Weather</div>;
const SoilAnalysis = () => <div>Soil</div>;
const FertilizerRecommendation = () => <div>Fertilizer</div>;
const SolarEnergy = () => <div>Solar</div>;
const Chatbot = () => <div>Chatbot</div>;

const theme = createTheme({
  palette: {
    primary: { main: '#4CAF50' },
    secondary: { main: '#8BC34A' },
    background: { default: '#f5f5f5' }
  }
});

export default function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        <AppBar position="static">
          <Toolbar>
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              Smart Agricultural Advisory System
            </Typography>
            <Box sx={{ display: 'flex', gap: 2 }}>
              <Link to="/" style={{ color: 'white', textDecoration: 'none' }}>Dashboard</Link>
              <Link to="/weather" style={{ color: 'white', textDecoration: 'none' }}>Weather</Link>
              <Link to="/soil" style={{ color: 'white', textDecoration: 'none' }}>Soil</Link>
              <Link to="/fertilizer" style={{ color: 'white', textDecoration: 'none' }}>Fertilizer</Link>
              <Link to="/solar" style={{ color: 'white', textDecoration: 'none' }}>Solar</Link>
              <Link to="/chatbot" style={{ color: 'white', textDecoration: 'none' }}>Chatbot</Link>
            </Box>
          </Toolbar>
        </AppBar>
        <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
        <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/weather" element={<WeatherForecast />} />
            <Route path="/soil" element={<SoilAnalysis />} />
            <Route path="/fertilizer" element={<FertilizerRecommendation />} />
            <Route path="/solar" element={<SolarEnergy />} />
            <Route path="/chatbot" element={<Chatbot />} />
          </Routes>
        </Container>
      </Router>
    </ThemeProvider>
  );
}