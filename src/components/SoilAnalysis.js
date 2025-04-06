// components/SoilAnalysis.js
import React, { useState } from 'react';
import { Box, Typography, TextField, Button, Select, MenuItem, FormControl, InputLabel, Paper, Grid, Divider } from '@mui/material';
import axios from 'axios';

const soilTypes = [
  { value: 'loamy', label: 'Loamy' },
  { value: 'clay', label: 'Clay' },
  { value: 'sandy', label: 'Sandy' },
  { value: 'silty', label: 'Silty' }
];

const SoilAnalysis = () => {
  const [soilType, setSoilType] = useState('loamy');
  const [phLevel, setPhLevel] = useState(6.5);
  const [results, setResults] = useState(null);
  const [loading, setLoading] = useState(false);

  const analyzeSoil = async () => {
    if (phLevel < 0 || phLevel > 14 || isNaN(phLevel)) {
      alert('Please enter a valid pH level between 0 and 14');
      return;
    }

    setLoading(true);
    
    try {
      const response = await axios.post('/api/soil/analyze/', {
        soil_type: soilType,
        ph_level: parseFloat(phLevel)
      });
      setResults(response.data);
    } catch (error) {
      console.error('Soil analysis error:', error);
      alert('Failed to analyze soil. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box sx={{ maxWidth: 1000, margin: 'auto' }}>
      <Typography variant="h4" gutterBottom>
        Soil Analysis
      </Typography>
      
      <Paper elevation={3} sx={{ p: 3, mb: 4 }}>
        <Grid container spacing={3}>
          <Grid item xs={12} md={6}>
            <FormControl fullWidth>
              <InputLabel>Soil Type</InputLabel>
              <Select
                value={soilType}
                label="Soil Type"
                onChange={(e) => setSoilType(e.target.value)}
              >
                {soilTypes.map((type) => (
                  <MenuItem key={type.value} value={type.value}>
                    {type.label}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField
              fullWidth
              label="pH Level"
              type="number"
              inputProps={{ min: 0, max: 14, step: 0.1 }}
              value={phLevel}
              onChange={(e) => setPhLevel(e.target.value)}
            />
          </Grid>
          <Grid item xs={12}>
            <Button
              variant="contained"
              onClick={analyzeSoil}
              disabled={loading}
              fullWidth
              size="large"
            >
              {loading ? 'Analyzing...' : 'Analyze Soil'}
            </Button>
          </Grid>
        </Grid>
      </Paper>

      {results && (
        <Paper elevation={3} sx={{ p: 3 }}>
          <Typography variant="h5" gutterBottom>
            Analysis Results
          </Typography>
          
          <Grid container spacing={3}>
            <Grid item xs={12} md={6}>
              <Typography variant="h6">Soil Characteristics</Typography>
              <Typography paragraph>
                <strong>Type:</strong> {results.soil_type.charAt(0).toUpperCase() + results.soil_type.slice(1)}
              </Typography>
              <Typography paragraph>
                <strong>Description:</strong> {results.description}
              </Typography>
              <Typography paragraph>
                <strong>Optimal pH Range:</strong> {results.optimal_ph.min} - {results.optimal_ph.max}
              </Typography>
              <Typography paragraph>
                <strong>Your pH Level:</strong> {results.ph_level}
              </Typography>
              <Typography paragraph>
                <strong>Moisture Retention:</strong> {results.moisture_retention}
              </Typography>
              
              <Divider sx={{ my: 2 }} />
              
              <Typography variant="h6">pH Recommendation</Typography>
              <Typography paragraph>
                {results.ph_advice}
              </Typography>
            </Grid>
            
            <Grid item xs={12} md={6}>
              <Typography variant="h6">Recommended Crops</Typography>
              {results.recommended_crops.length > 0 ? (
                <ul style={{ paddingLeft: 20 }}>
                  {results.recommended_crops.map((crop, index) => (
                    <li key={index}>
                      <Typography>
                        <strong>{crop.name}</strong>
                        <br />
                        Synthetic Fertilizer: {crop.fertilizer.synthetic}
                        <br />
                        Organic Fertilizer: {crop.fertilizer.organic}
                      </Typography>
                    </li>
                  ))}
                </ul>
              ) : (
                <Typography>No crops recommended for this soil type and pH level.</Typography>
              )}
            </Grid>
          </Grid>
        </Paper>
      )}
    </Box>
  );
};

export default SoilAnalysis;
