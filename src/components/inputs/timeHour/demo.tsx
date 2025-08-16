'use client';

import React, { useState } from 'react';
import { Box, Typography, Paper, Divider, Alert } from '@mui/material';
import TimeHourInput from './TimeHourInput';

export default function TimeHourInputDemo() {
  const [basicValue, setBasicValue] = useState('');
  const [validationValue, setValidationValue] = useState('');
  const [minDateValue, setMinDateValue] = useState('');
  const [validationError, setValidationError] = useState('');

  // Get today's date for minimum date example
  const today = new Date().toISOString().split('T')[0];
  
  // Get tomorrow's date
  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  const tomorrowString = tomorrow.toISOString().split('T')[0];

  const handleValidationChange = (value: string) => {
    setValidationValue(value);
    
    // Simple validation example
    if (value) {
      const selectedDate = new Date(value);
      const now = new Date();
      
      if (selectedDate < now) {
        setValidationError('Please select a future date and time');
      } else {
        setValidationError('');
      }
    } else {
      setValidationError('');
    }
  };

  return (
    <Box sx={{ p: 3, maxWidth: 800, margin: '0 auto' }}>
      <Typography variant="h4" component="h1" gutterBottom>
        Time Hour Input Component
      </Typography>
      
      <Typography variant="body1" color="text.secondary" sx={{ mb: 4 }}>
        A combined date and time input component that handles local time input and outputs UTC time.
      </Typography>

      {/* Basic Usage */}
      <Paper elevation={1} sx={{ p: 3, mb: 4 }}>
        <Typography variant="h6" gutterBottom>
          Basic Usage
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
          Simple date and time picker with UTC conversion
        </Typography>
        <TimeHourInput 
          value={basicValue}
          onChange={setBasicValue}
        />
        {basicValue && (
          <Alert severity="info" sx={{ mt: 2 }}>
            <Typography variant="body2">
              <strong>Local Input:</strong> {new Date(basicValue).toLocaleString()}<br />
              <strong>UTC Output:</strong> {basicValue}
            </Typography>
          </Alert>
        )}
      </Paper>

      <Divider sx={{ my: 3 }} />

      {/* With Validation */}
      <Paper elevation={1} sx={{ p: 3, mb: 4 }}>
        <Typography variant="h6" gutterBottom>
          With Validation
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
          Input with custom validation (must be a future date/time)
        </Typography>
        <TimeHourInput 
          value={validationValue}
          onChange={handleValidationChange}
          error={validationError}
        />
      </Paper>

      <Divider sx={{ my: 3 }} />

      {/* With Minimum Date */}
      <Paper elevation={1} sx={{ p: 3, mb: 4 }}>
        <Typography variant="h6" gutterBottom>
          With Minimum Date
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
          Input with minimum date restriction (tomorrow or later)
        </Typography>
        <TimeHourInput 
          value={minDateValue}
          onChange={setMinDateValue}
          minDate={tomorrowString}
        />
      </Paper>

      {/* Features */}
      <Paper elevation={1} sx={{ p: 3, mt: 4 }}>
        <Typography variant="h6" gutterBottom>
          Features
        </Typography>
        <Box component="ul" sx={{ pl: 2 }}>
          <li>Combined date and time input fields</li>
          <li>Automatic UTC conversion from local time</li>
          <li>Material-UI styled inputs with validation</li>
          <li>Minimum date restriction support</li>
          <li>Error handling and display</li>
          <li>24-hour time format</li>
          <li>Responsive design with connected inputs</li>
          <li>Custom CSS classes support</li>
        </Box>
      </Paper>

      {/* Technical Notes */}
      <Paper elevation={1} sx={{ p: 3, mt: 4 }}>
        <Typography variant="h6" gutterBottom>
          Technical Notes
        </Typography>
        <Box component="ul" sx={{ pl: 2 }}>
          <li><strong>Input:</strong> Local date and time</li>
          <li><strong>Output:</strong> ISO 8601 UTC string (YYYY-MM-DDTHH:mm:ss.sssZ)</li>
          <li><strong>Format:</strong> Uses en-US locale for time display</li>
          <li><strong>Timezone:</strong> Automatically handles timezone conversion</li>
        </Box>
      </Paper>
    </Box>
  );
}