import React, { useState } from 'react';
import { TextField, Button, Box, Typography, Container, Paper, IconButton } from '@mui/material';
import { Email, Phone, LocationOn, LinkedIn, Twitter, Instagram } from '@mui/icons-material';
import { useForm } from 'react-hook-form';

interface ContactForm {
  name: string;
  email: string;
  subject: string;
  message: string;
}

export default function ModernContact() {
  const { register, handleSubmit, formState: { errors } } = useForm<ContactForm>();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const onSubmit = async (data: ContactForm) => {
    setIsSubmitting(true);
    await new Promise(resolve => setTimeout(resolve, 1000));
    console.log('Form submitted:', data);
    setIsSubmitting(false);
  };

  return (
    <Box sx={{ minHeight: '100vh', background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)' }}>
      <Container maxWidth="lg" sx={{ pt: 8, pb: 8 }}>
        <Typography 
          variant="h2" 
          component="h1" 
          sx={{ 
            textAlign: 'center', 
            mb: 6, 
            color: 'white',
            fontWeight: 'bold'
          }}
        >
          Get in Touch
        </Typography>

        <div className="flex flex-col lg:flex-row gap-8">
          <div className="lg:w-2/3">
            <Paper sx={{ p: 4, borderRadius: 3 }}>
              <Typography variant="h5" gutterBottom sx={{ fontWeight: 600, mb: 3 }}>
                Send us a message
              </Typography>
              
              <Box component="form" onSubmit={handleSubmit(onSubmit)}>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-6">
                  <TextField
                    fullWidth
                    label="Name"
                    {...register('name', { required: 'Name is required' })}
                    error={!!errors.name}
                    helperText={errors.name?.message}
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
                    variant="outlined"
                  />
                </div>
                
                <div className="mb-6">
                  <TextField
                    fullWidth
                    label="Subject"
                    {...register('subject', { required: 'Subject is required' })}
                    error={!!errors.subject}
                    helperText={errors.subject?.message}
                    variant="outlined"
                  />
                </div>
                
                <div className="mb-6">
                  <TextField
                    fullWidth
                    label="Message"
                    multiline
                    rows={5}
                    {...register('message', { required: 'Message is required' })}
                    error={!!errors.message}
                    helperText={errors.message?.message}
                    variant="outlined"
                  />
                </div>
                
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  disabled={isSubmitting}
                  sx={{
                    py: 2,
                    fontSize: '1.1rem',
                    borderRadius: 2,
                    background: 'linear-gradient(45deg, #667eea 30%, #764ba2 90%)',
                    '&:hover': {
                      background: 'linear-gradient(45deg, #5a67d8 30%, #6b46c1 90%)'
                    }
                  }}
                >
                  {isSubmitting ? 'Sending...' : 'Send Message'}
                </Button>
              </Box>
            </Paper>
          </div>

          <div className="lg:w-1/3">
            <Paper sx={{ p: 4, borderRadius: 3, height: 'fit-content' }}>
              <Typography variant="h5" gutterBottom sx={{ fontWeight: 600, mb: 3 }}>
                Contact Information
              </Typography>

              <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
                <Email sx={{ mr: 2, color: '#667eea' }} />
                <Box>
                  <Typography variant="body1" sx={{ fontWeight: 500 }}>Email</Typography>
                  <Typography variant="body2" color="text.secondary">
                    contact@company.com
                  </Typography>
                </Box>
              </Box>

              <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
                <Phone sx={{ mr: 2, color: '#667eea' }} />
                <Box>
                  <Typography variant="body1" sx={{ fontWeight: 500 }}>Phone</Typography>
                  <Typography variant="body2" color="text.secondary">
                    +1 (555) 123-4567
                  </Typography>
                </Box>
              </Box>

              <Box sx={{ display: 'flex', alignItems: 'center', mb: 4 }}>
                <LocationOn sx={{ mr: 2, color: '#667eea' }} />
                <Box>
                  <Typography variant="body1" sx={{ fontWeight: 500 }}>Address</Typography>
                  <Typography variant="body2" color="text.secondary">
                    123 Business St.<br />
                    City, Country 12345
                  </Typography>
                </Box>
              </Box>

              <Typography variant="h6" gutterBottom sx={{ fontWeight: 600, mb: 2 }}>
                Follow us
              </Typography>
              <Box sx={{ display: 'flex', gap: 1 }}>
                <IconButton sx={{ color: '#667eea' }}>
                  <LinkedIn />
                </IconButton>
                <IconButton sx={{ color: '#667eea' }}>
                  <Twitter />
                </IconButton>
                <IconButton sx={{ color: '#667eea' }}>
                  <Instagram />
                </IconButton>
              </Box>
            </Paper>
          </div>
        </div>
      </Container>
    </Box>
  );
}