import React, { useState } from 'react';
import { TextField, Button, Box, Typography, Container, Card, CardContent } from '@mui/material';
import { Send, Star, Lightbulb, Rocket } from '@mui/icons-material';
import { useForm } from 'react-hook-form';

interface ContactForm {
  name: string;
  email: string;
  project: string;
  message: string;
}

export default function CreativeContact() {
  const { register, handleSubmit, formState: { errors } } = useForm<ContactForm>();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const onSubmit = async (data: ContactForm) => {
    setIsSubmitting(true);
    await new Promise(resolve => setTimeout(resolve, 1000));
    console.log('Form submitted:', data);
    setIsSubmitting(false);
  };

  return (
    <Box sx={{ 
      minHeight: '100vh', 
      background: 'radial-gradient(ellipse at top, #f59e0b, #ef4444, #8b5cf6)',
      position: 'relative',
      overflow: 'hidden'
    }}>
      {/* Floating shapes */}
      <Box sx={{ position: 'absolute', top: '10%', left: '10%', opacity: 0.1 }}>
        <Star sx={{ fontSize: '8rem', color: 'white' }} />
      </Box>
      <Box sx={{ position: 'absolute', bottom: '15%', right: '15%', opacity: 0.1 }}>
        <Lightbulb sx={{ fontSize: '6rem', color: 'white' }} />
      </Box>
      <Box sx={{ position: 'absolute', top: '60%', left: '5%', opacity: 0.1 }}>
        <Rocket sx={{ fontSize: '7rem', color: 'white' }} />
      </Box>

      <Container maxWidth="md" sx={{ pt: 6, pb: 6, position: 'relative', zIndex: 1 }}>
        <Box sx={{ textAlign: 'center', mb: 6 }}>
          <Typography 
            variant="h2" 
            component="h1"
            sx={{ 
              color: 'white',
              fontWeight: 'bold',
              textShadow: '2px 2px 4px rgba(0,0,0,0.3)',
              mb: 2
            }}
          >
            Let&apos;s build something amazing together!
          </Typography>
          <Typography 
            variant="h5" 
            sx={{ 
              color: 'rgba(255,255,255,0.9)',
              fontWeight: 300,
              textShadow: '1px 1px 2px rgba(0,0,0,0.2)'
            }}
          >
            Tell us your idea and we&apos;ll make it reality
          </Typography>
        </Box>

        <Card sx={{ 
          borderRadius: 4,
          boxShadow: '0 25px 50px rgba(0,0,0,0.2)',
          background: 'rgba(255,255,255,0.95)',
          backdropFilter: 'blur(10px)'
        }}>
          <CardContent sx={{ p: 5 }}>
            <Box component="form" onSubmit={handleSubmit(onSubmit)}>
              <Box sx={{ mb: 4 }}>
                <Typography variant="h6" gutterBottom sx={{ fontWeight: 600, color: '#374151' }}>
                  What&apos;s your name?
                </Typography>
                <TextField
                  fullWidth
                  placeholder="Your full name"
                  {...register('name', { required: 'Name is required' })}
                  error={!!errors.name}
                  helperText={errors.name?.message}
                  variant="outlined"
                  sx={{
                    '& .MuiOutlinedInput-root': {
                      borderRadius: 3,
                      bgcolor: 'rgba(249,250,251,0.8)'
                    }
                  }}
                />
              </Box>

              <Box sx={{ mb: 4 }}>
                <Typography variant="h6" gutterBottom sx={{ fontWeight: 600, color: '#374151' }}>
                  What&apos;s your email?
                </Typography>
                <TextField
                  fullWidth
                  placeholder="you@email.com"
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
                  sx={{
                    '& .MuiOutlinedInput-root': {
                      borderRadius: 3,
                      bgcolor: 'rgba(249,250,251,0.8)'
                    }
                  }}
                />
              </Box>

              <Box sx={{ mb: 4 }}>
                <Typography variant="h6" gutterBottom sx={{ fontWeight: 600, color: '#374151' }}>
                  What type of project do you have in mind?
                </Typography>
                <TextField
                  fullWidth
                  placeholder="Website, mobile app, system, etc."
                  {...register('project', { required: 'Project type is required' })}
                  error={!!errors.project}
                  helperText={errors.project?.message}
                  variant="outlined"
                  sx={{
                    '& .MuiOutlinedInput-root': {
                      borderRadius: 3,
                      bgcolor: 'rgba(249,250,251,0.8)'
                    }
                  }}
                />
              </Box>

              <Box sx={{ mb: 4 }}>
                <Typography variant="h6" gutterBottom sx={{ fontWeight: 600, color: '#374151' }}>
                  Tell us more details
                </Typography>
                <TextField
                  fullWidth
                  placeholder="Describe your idea, goals, budget, important dates..."
                  multiline
                  rows={4}
                  {...register('message', { required: 'Message is required' })}
                  error={!!errors.message}
                  helperText={errors.message?.message}
                  variant="outlined"
                  sx={{
                    '& .MuiOutlinedInput-root': {
                      borderRadius: 3,
                      bgcolor: 'rgba(249,250,251,0.8)'
                    }
                  }}
                />
              </Box>

              <Button
                type="submit"
                fullWidth
                variant="contained"
                disabled={isSubmitting}
                startIcon={<Send />}
                sx={{
                  py: 2,
                  px: 4,
                  fontSize: '1.2rem',
                  borderRadius: 3,
                  background: 'linear-gradient(45deg, #f59e0b, #ef4444)',
                  boxShadow: '0 4px 20px rgba(245,158,11,0.4)',
                  '&:hover': {
                    background: 'linear-gradient(45deg, #d97706, #dc2626)',
                    boxShadow: '0 6px 25px rgba(245,158,11,0.6)',
                    transform: 'translateY(-2px)'
                  },
                  transition: 'all 0.3s ease'
                }}
              >
                {isSubmitting ? 'Sending your message...' : 'Send my idea!'}
              </Button>
            </Box>
          </CardContent>
        </Card>
      </Container>
    </Box>
  );
}