// components/WeatherForecast.js
import React, { useState, useEffect } from 'react';
import { Box, TextField, Button, Typography, Card, CardContent, Grid, CircularProgress } from '@mui/material';
import axios from 'axios';
import { WiDaySunny, WiRain, WiCloudy, WiDayCloudy, WiThunderstorm } from 'weather-icons-react';

const WeatherForecast = () => {
  const [location, setLocation] = useState('');
  const [forecast, setForecast] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const getWeatherIcon = (condition) => {
    const size = 48;
    switch (condition.toLowerCase()) {
      case 'sunny':
        return <WiDaySunny size={size} />;
      case 'rainy':
        return <WiRain size={size} />;
      case 'cloudy':
        return <WiCloudy size={size} />;
      case 'partly cloudy':
        return <WiDayCloudy size={size} />;
      case 'stormy':
        return <WiThunderstorm size={size} />;
      default:
        return <WiDaySunny size={size} />;
    }
  };

  const fetchWeather = async () => {
    if (!location.trim()) {
      setError('Please enter a location');
      return;
    }

    setLoading(true);
    setError('');
    
    try {
      const response = await axios.get(`/api/weather/?location=${location}`);
      setForecast(response.data);
    } catch (err) {
      setError('Failed to fetch weather data. Please try again.');
      console.error('Weather API error:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box sx={{ maxWidth: 1000, margin: 'auto' }}>
      <Typography variant="h4" gutterBottom>
        Weather Forecast
      </Typography>
      
      <Box sx={{ display: 'flex', gap: 2, mb: 4 }}>
        <TextField
          fullWidth
          label="Location"
          variant="outlined"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          placeholder="Enter city or coordinates"
        />
        <Button 
          variant="contained" 
          onClick={fetchWeather}
          disabled={loading}
          sx={{ minWidth: 150 }}
        >
          {loading ? <CircularProgress size={24} /> : 'Get Forecast'}
        </Button>
      </Box>

      {error && (
        <Typography color="error" sx={{ mb: 2 }}>
          {error}
        </Typography>
      )}

      {forecast && (
        <>
          <Typography variant="h6" gutterBottom>
            {forecast.location} - {forecast.current.condition}
          </Typography>
          
          <Grid container spacing={3}>
            {forecast.daily.slice(0, 5).map((day, index) => (
              <Grid item xs={12} sm={6} md={4} lg={2.4} key={index}>
                <Card>
                  <CardContent sx={{ textAlign: 'center' }}>
                    <Typography variant="subtitle1">
                      {new Date(day.date).toLocaleDateString('en-US', { weekday: 'short' })}
                    </Typography>
                    <Box sx={{ my: 2 }}>
                      {getWeatherIcon(day.condition)}
                    </Box>
                    <Typography variant="h6">
                      {day.temperature}°C
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {day.condition}
                    </Typography>
                    <Typography variant="body2">
                      Humidity: {day.humidity}%
                    </Typography>
                    <Typography variant="body2">
                      Rain: {day.rain_chance}%
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>

          <Box sx={{ mt: 4 }}>
            <Typography variant="h6" gutterBottom>
              Agricultural Advice
            </Typography>
            <Typography variant="body1" paragraph>
              {forecast.advice}
            </Typography>
          </Box>
        </>
      )}
    </Box>
  );
};

export default WeatherForecast;