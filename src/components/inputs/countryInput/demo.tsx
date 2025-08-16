'use client';

import React, { useState } from 'react';
import { Box, Typography } from '@mui/material';
import PhoneInput from './CountryInput';

export default function PhoneInputDemo() {
  const [phoneNumber, setPhoneNumber] = useState<string>('');

  return (
    <Box className="space-y-3! mt-2! bg-none!">
      <Typography variant="h5" component="h5" className="text-xl!">
        Phone Input Component
      </Typography>
      
      <div className="space-y-4">
        <PhoneInput
          value={phoneNumber}
          onChange={setPhoneNumber}
          label="Enter your phone number"
        />
        {phoneNumber && (
          <Typography variant="body2" color="text.secondary">
            Phone Number: {phoneNumber}
          </Typography>
        )}
      </div>
    </Box>
  );
}