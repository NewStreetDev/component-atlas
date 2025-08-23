import React, { useState } from 'react';
import { TextField, Button, Box, Typography, Container } from '@mui/material';
import { useForm } from 'react-hook-form';

interface ContactForm {
  name: string;
  email: string;
  message: string;
}

export default function MinimalContact() {
  const { register, handleSubmit, formState: { errors } } = useForm<ContactForm>();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const onSubmit = async (data: ContactForm) => {
    setIsSubmitting(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    console.log('Form submitted:', data);
    setIsSubmitting(false);
  };

  return (
    <Box sx={{ minHeight: '100vh', display: 'flex', alignItems: 'center', bgcolor: '#f8fafc' }}>
      <Container maxWidth="sm">
        <Box sx={{ textAlign: 'center', mb: 4 }}>
          <Typography variant="h3" component="h1" gutterBottom sx={{ fontWeight: 300, color: '#1f2937' }}>
            Contact Us
          </Typography>
          <Typography variant="body1" color="text.secondary" sx={{ fontSize: '1.1rem' }}>
            We'd love to hear from you. Send us a message and we'll respond soon.
          </Typography>
        </Box>

        <Box 
          component="form" 
          onSubmit={handleSubmit(onSubmit)}
          sx={{ 
            bgcolor: 'white', 
            p: 4, 
            borderRadius: 2, 
            boxShadow: '0 1px 3px rgba(0,0,0,0.1)' 
          }}
        >
          <TextField
            fullWidth
            label="Full Name"
            {...register('name', { required: 'Name is required' })}
            error={!!errors.name}
            helperText={errors.name?.message}
            sx={{ mb: 3 }}
            variant="outlined"
          />

          <TextField
            fullWidth
            label="Email"
            type="email"
            {...register('email', { 
              required: 'Email is required',
              pattern: {
                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                message: 'Invalid email'
              }
            })}
            error={!!errors.email}
            helperText={errors.email?.message}
            sx={{ mb: 3 }}
            variant="outlined"
          />

          <TextField
            fullWidth
            label="Message"
            multiline
            rows={4}
            {...register('message', { required: 'Message is required' })}
            error={!!errors.message}
            helperText={errors.message?.message}
            sx={{ mb: 3 }}
            variant="outlined"
          />

          <Button
            type="submit"
            fullWidth
            variant="contained"
            disabled={isSubmitting}
            sx={{
              py: 1.5,
              fontSize: '1rem',
              bgcolor: '#3b82f6',
              '&:hover': {
                bgcolor: '#2563eb'
              }
            }}
          >
            {isSubmitting ? 'Sending...' : 'Send Message'}
          </Button>
        </Box>
      </Container>
    </Box>
  );
}