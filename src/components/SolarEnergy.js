// components/SolarEnergy.js
import React, { useState } from 'react';
import { Box, Typography, TextField, Button, Slider, Paper, Grid, Card, CardContent } from '@mui/material';
import { WiSolarEclipse } from 'weather-icons-react';

const SolarEnergy = () => {
  const [area, setArea] = useState(100);
  const [efficiency, setEfficiency] = useState(18);
  const [sunlight, setSunlight] = useState(5);
  const [result, setResult] = useState(null);

  const calculateSolarEnergy = () => {
    // Simplified calculation
    const dailyEnergy = area * efficiency * sunlight * 0.01; // kWh per day
    const monthlyEnergy = dailyEnergy * 30;
    const annualEnergy = dailyEnergy * 365;
    
    setResult({
      daily: dailyEnergy.toFixed(2),
      monthly: monthlyEnergy.toFixed(2),
      annual: annualEnergy.toFixed(2),
      equivalent: (annualEnergy / 1500).toFixed(1) // Equivalent to number of households
    });
  };

  return (
    <Box sx={{ maxWidth: 800, margin: 'auto' }}>
      <Typography variant="h4" gutterBottom>
        Solar Energy Calculator
      </Typography>
      
      <Paper elevation={3} sx={{ p: 3, mb: 4 }}>
        <Grid container spacing={3}>
          <Grid item xs={12} sm={6}>
            <Typography gutterBottom>
              Solar Panel Area (m²)
            </Typography>
            <Slider
              value={area}
              onChange={(e, newValue) => setArea(newValue)}
              min={1}
              max={500}
              valueLabelDisplay="auto"
            />
            <TextField
              fullWidth
              type="number"
              value={area}
              onChange={(e) => setArea(e.target.value)}
              inputProps={{ min: 1, max: 500 }}
            />
          </Grid>
          
          <Grid item xs={12} sm={6}>
            <Typography gutterBottom>
              Panel Efficiency (%)
            </Typography>
            <Slider
              value={efficiency}
              onChange={(e, newValue) => setEfficiency(newValue)}
              min={5}
              max={25}
              valueLabelDisplay="auto"
            />
            <TextField
              fullWidth
              type="number"
              value={efficiency}
              onChange={(e) => setEfficiency(e.target.value)}
              inputProps={{ min: 5, max: 25 }}
            />
          </Grid>
          
          <Grid item xs={12} sm={6}>
            <Typography gutterBottom>
              Average Sunlight Hours
            </Typography>
            <Slider
              value={sunlight}
              onChange={(e, newValue) => setSunlight(newValue)}
              min={1}
              max={12}
              valueLabelDisplay="auto"
            />
            <TextField
              fullWidth
              type="number"
              value={sunlight}
              onChange={(e) => setSunlight(e.target.value)}
              inputProps={{ min: 1, max: 12 }}
            />
          </Grid>
          
          <Grid item xs={12}>
            <Button
              variant="contained"
              onClick={calculateSolarEnergy}
              fullWidth
              size="large"
            >
              Calculate Solar Potential
            </Button>
          </Grid>
        </Grid>
      </Paper>

      {result && (
        <Grid container spacing={3}>
          <Grid item xs={12} sm={4}>
            <Card>
              <CardContent sx={{ textAlign: 'center' }}>
                <WiSolarEclipse size={48} />
                <Typography variant="h6">Daily Energy</Typography>
                <Typography variant="h4">{result.daily} kWh</Typography>
              </CardContent>
            </Card>
          </Grid>
          
          <Grid item xs={12} sm={4}>
            <Card>
              <CardContent sx={{ textAlign: 'center' }}>
                <WiSolarEclipse size={48} />
                <Typography variant="h6">Monthly Energy</Typography>
                <Typography variant="h4">{result.monthly} kWh</Typography>
              </CardContent>
            </Card>
          </Grid>
          
          <Grid item xs={12} sm={4}>
            <Card>
              <CardContent sx={{ textAlign: 'center' }}>
                <WiSolarEclipse size={48} />
                <Typography variant="h6">Annual Energy</Typography>
                <Typography variant="h4">{result.annual} kWh</Typography>
              </CardContent>
            </Card>
          </Grid>
          
          <Grid item xs={12}>
            <Paper elevation={3} sx={{ p: 3, mt: 2 }}>
              <Typography variant="h6" gutterBottom>
                Environmental Impact
              </Typography>
              <Typography paragraph>
                This system could power approximately {result.equivalent} average households annually.
              </Typography>
              <Typography paragraph>
                Estimated CO2 reduction: {(result.annual * 0.4).toFixed(0)} kg per year.
              </Typography>
            </Paper>
          </Grid>
        </Grid>
      )}
    </Box>
  );
};

export default SolarEnergy;