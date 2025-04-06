import React, { useState, useEffect } from 'react';
import {
  Box,
  Typography,
  TextField,
  Button,
  Card,
  CardContent,
  Grid,
  Divider,
  CircularProgress,
  Alert,
  List,
  ListItem,
  ListItemText,
  Chip
} from '@mui/material';
import axios from 'axios';

const FertilizerRecommendation = () => {
  const [crop, setCrop] = useState('');
  const [soilType, setSoilType] = useState('');
  const [recommendations, setRecommendations] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [popularCrops, setPopularCrops] = useState([]);

  // Common crops for quick selection
  const commonCrops = [
    'Tomatoes', 'Corn', 'Wheat', 'Rice', 'Potatoes',
    'Soybeans', 'Cotton', 'Barley', 'Oats', 'Sorghum'
  ];

  const soilTypes = [
    'Loamy', 'Clay', 'Sandy', 'Silty', 'Peaty', 'Chalky'
  ];

  useEffect(() => {
    // Load popular crops (could be from API)
    setPopularCrops(commonCrops);
  }, []);

  const fetchRecommendations = async () => {
    if (!crop.trim() || !soilType) {
      setError('Please select both crop and soil type');
      return;
    }

    setLoading(true);
    setError(null);

    try {
      // In a real app, this would call your backend API
      // const response = await axios.get(`/api/fertilizer/?crop=${encodeURIComponent(crop)}&soil=${encodeURIComponent(soilType)}`);
      
      // Mock response - replace with actual API call
      const mockRecommendations = {
        crop,
        soilType,
        synthetic: getSyntheticFertilizer(crop, soilType),
        organic: getOrganicFertilizer(crop, soilType),
        applicationTips: getApplicationTips(crop, soilType),
        schedule: getFertilizerSchedule(crop)
      };

      setRecommendations(mockRecommendations);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to fetch recommendations');
      console.error('API Error:', err);
    } finally {
      setLoading(false);
    }
  };

  // Helper functions (replace with your actual logic or API calls)
  const getSyntheticFertilizer = (crop, soilType) => {
    const recommendations = {
      'Tomatoes': { 'Loamy': '10-10-10', 'Clay': '5-10-10', 'Sandy': '15-5-10' },
      'Corn': { 'Loamy': '16-16-8', 'Clay': '12-12-12', 'Sandy': '20-10-10' },
      'Wheat': { 'Loamy': '15-15-15', 'Clay': '10-20-10', 'Sandy': '20-10-10' }
    };
    return recommendations[crop]?.[soilType] || '10-10-10 (General Purpose)';
  };

  const getOrganicFertilizer = (crop, soilType) => {
    const recommendations = {
      'Tomatoes': { 'Loamy': 'Compost + Bone Meal', 'Clay': 'Well-rotted Manure', 'Sandy': 'Fish Emulsion' },
      'Corn': { 'Loamy': 'Composted Chicken Manure', 'Clay': 'Green Manure', 'Sandy': 'Seaweed Extract' },
      'Wheat': { 'Loamy': 'Alfalfa Meal', 'Clay': 'Compost Tea', 'Sandy': 'Kelp Meal' }
    };
    return recommendations[crop]?.[soilType] || 'Compost (General Purpose)';
  };

  const getApplicationTips = (crop, soilType) => {
    const tips = {
      'Clay': 'Apply in smaller quantities more frequently to prevent nutrient leaching',
      'Sandy': 'Split applications to prevent nutrient loss through rapid drainage',
      'Loamy': 'Standard application rates work well',
      'Silty': 'Moderate application frequency'
    };
    return tips[soilType] || 'Apply according to standard guidelines';
  };

  const getFertilizerSchedule = (crop) => {
    const schedules = {
      'Tomatoes': [
        { stage: 'Pre-planting', recommendation: 'Apply 1/3 of nitrogen and full phosphorus' },
        { stage: 'Flowering', recommendation: 'Apply remaining nitrogen in split doses' },
        { stage: 'Fruit set', recommendation: 'Supplement with potassium' }
      ],
      'Corn': [
        { stage: 'Pre-planting', recommendation: 'Apply all phosphorus and 1/3 nitrogen' },
        { stage: 'V6 stage', recommendation: 'Side-dress with remaining nitrogen' }
      ],
      'Wheat': [
        { stage: 'Pre-planting', recommendation: 'Apply complete fertilizer' },
        { stage: 'Tillering', recommendation: 'Top-dress with nitrogen' }
      ]
    };
    return schedules[crop] || [
      { stage: 'General', recommendation: 'Apply balanced fertilizer at planting and mid-season' }
    ];
  };

  const handleCropSelect = (selectedCrop) => {
    setCrop(selectedCrop);
  };

  return (
    <Box sx={{ maxWidth: 1000, margin: 'auto', p: 3 }}>
      <Typography variant="h4" gutterBottom sx={{ mb: 3, fontWeight: 'bold' }}>
        Fertilizer Recommendation
      </Typography>

      <Grid container spacing={4}>
        <Grid item xs={12} md={6}>
          <Card sx={{ mb: 3 }}>
            <CardContent>
              <Typography variant="h6" gutterBottom sx={{ fontWeight: 'bold' }}>
                Crop Information
              </Typography>
              
              <TextField
                fullWidth
                label="Enter Crop Name"
                variant="outlined"
                value={crop}
                onChange={(e) => setCrop(e.target.value)}
                sx={{ mb: 2 }}
                placeholder="e.g., Tomatoes, Corn, Wheat"
              />

              <Typography variant="subtitle2" sx={{ mb: 1 }}>
                Or select common crops:
              </Typography>
              
              <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, mb: 3 }}>
                {popularCrops.map((cropName) => (
                  <Chip
                    key={cropName}
                    label={cropName}
                    onClick={() => handleCropSelect(cropName)}
                    color={crop === cropName ? 'primary' : 'default'}
                    variant={crop === cropName ? 'filled' : 'outlined'}
                  />
                ))}
              </Box>

              <TextField
                select
                fullWidth
                label="Select Soil Type"
                variant="outlined"
                value={soilType}
                onChange={(e) => setSoilType(e.target.value)}
                SelectProps={{
                  native: true,
                }}
              >
                <option value=""></option>
                {soilTypes.map((type) => (
                  <option key={type} value={type}>
                    {type}
                  </option>
                ))}
              </TextField>
            </CardContent>
          </Card>

          <Button
            fullWidth
            variant="contained"
            onClick={fetchRecommendations}
            disabled={loading || !crop || !soilType}
            size="large"
            sx={{ height: 56 }}
          >
            {loading ? <CircularProgress size={24} color="inherit" /> : 'Get Recommendations'}
          </Button>
        </Grid>

        <Grid item xs={12} md={6}>
          {error && (
            <Alert severity="error" sx={{ mb: 3 }}>
              {error}
            </Alert>
          )}

          {recommendations && (
            <Card>
              <CardContent>
                <Typography variant="h6" gutterBottom sx={{ fontWeight: 'bold' }}>
                  Recommendations for {recommendations.crop} in {recommendations.soilType} Soil
                </Typography>

                <Grid container spacing={2} sx={{ mb: 2 }}>
                  <Grid item xs={12} sm={6}>
                    <Typography variant="subtitle2">Synthetic Fertilizer:</Typography>
                    <Typography variant="body1" sx={{ fontWeight: 'medium' }}>
                      {recommendations.synthetic}
                    </Typography>
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <Typography variant="subtitle2">Organic Fertilizer:</Typography>
                    <Typography variant="body1" sx={{ fontWeight: 'medium' }}>
                      {recommendations.organic}
                    </Typography>
                  </Grid>
                </Grid>

                <Divider sx={{ my: 2 }} />

                <Typography variant="subtitle2" gutterBottom>
                  Application Tips:
                </Typography>
                <Typography variant="body1" paragraph>
                  {recommendations.applicationTips}
                </Typography>

                <Typography variant="subtitle2" gutterBottom>
                  Fertilization Schedule:
                </Typography>
                <List dense>
                  {recommendations.schedule.map((item, index) => (
                    <ListItem key={index} sx={{ py: 0.5 }}>
                      <ListItemText
                        primary={item.stage}
                        secondary={item.recommendation}
                      />
                    </ListItem>
                  ))}
                </List>
              </CardContent>
            </Card>
          )}

          {!recommendations && !loading && (
            <Card>
              <CardContent>
                <Typography variant="body1" color="text.secondary">
                  Enter a crop and soil type to get fertilizer recommendations.
                </Typography>
              </CardContent>
            </Card>
          )}
        </Grid>
      </Grid>
    </Box>
  );
};

export default FertilizerRecommendation;