import React, { useState } from 'react';
import { TextField, Button, Box, Typography, Container, Card, CardContent, Avatar, Chip } from '@mui/material';
import { Rocket, Code, Speed, Favorite } from '@mui/icons-material';
import { useForm } from 'react-hook-form';

interface ContactForm {
  name: string;
  email: string;
  startup: string;
  stage: string;
  idea: string;
  timeline: string;
  message: string;
}

export default function StartupContact() {
  const { register, handleSubmit, formState: { errors } } = useForm<ContactForm>();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const onSubmit = async (data: ContactForm) => {
    setIsSubmitting(true);
    await new Promise(resolve => setTimeout(resolve, 1000));
    console.log('Form submitted:', data);
    setIsSubmitting(false);
  };

  const stages = [
    'Idea/Concept',
    'Prototype',
    'MVP',
    'Beta',
    'Launch',
    'Growth'
  ];

  const timelines = [
    '1-3 months',
    '3-6 months',
    '6-12 months',
    '12+ months'
  ];

  return (
    <Box sx={{ minHeight: '100vh', bgcolor: '#0f172a' }}>
      {/* Hero Section */}
      <Box sx={{ 
        background: 'linear-gradient(135deg, #0f172a 0%, #1e293b 50%, #334155 100%)',
        color: 'white',
        py: 8,
        position: 'relative',
        overflow: 'hidden'
      }}>
        {/* Animated background elements */}
        <Box sx={{ position: 'absolute', top: '20%', right: '10%', opacity: 0.1 }}>
          <Rocket sx={{ fontSize: '12rem' }} />
        </Box>
        <Box sx={{ position: 'absolute', bottom: '10%', left: '5%', opacity: 0.05 }}>
          <Code sx={{ fontSize: '8rem' }} />
        </Box>

        <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 1 }}>
          <div className="flex flex-col md:flex-row items-center gap-8">
            <div className="md:w-1/2">
              <Typography variant="h2" component="h1" gutterBottom sx={{ fontWeight: 'bold' }}>
                Build the Future
              </Typography>
              <Typography variant="h5" sx={{ opacity: 0.9, mb: 4, fontWeight: 300 }}>
                We turn disruptive ideas into products that change the world
              </Typography>
              <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
                <Chip label="Agile Development" sx={{ bgcolor: '#3b82f6', color: 'white' }} />
                <Chip label="MVP in 30 days" sx={{ bgcolor: '#10b981', color: 'white' }} />
                <Chip label="Scalable" sx={{ bgcolor: '#f59e0b', color: 'white' }} />
              </Box>
            </div>
            <div className="md:w-1/2">
              <div className="grid grid-cols-2 gap-4">
                <Card sx={{ bgcolor: 'rgba(59, 130, 246, 0.1)', border: '1px solid rgba(59, 130, 246, 0.2)' }}>
                  <CardContent sx={{ textAlign: 'center', color: 'white' }}>
                    <Speed sx={{ fontSize: '2rem', mb: 1 }} />
                    <Typography variant="h4" sx={{ fontWeight: 'bold' }}>50+</Typography>
                    <Typography variant="body2">Startups Launched</Typography>
                  </CardContent>
                </Card>
                <Card sx={{ bgcolor: 'rgba(16, 185, 129, 0.1)', border: '1px solid rgba(16, 185, 129, 0.2)' }}>
                  <CardContent sx={{ textAlign: 'center', color: 'white' }}>
                    <Favorite sx={{ fontSize: '2rem', mb: 1 }} />
                    <Typography variant="h4" sx={{ fontWeight: 'bold' }}>98%</Typography>
                    <Typography variant="body2">Satisfaction</Typography>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </Container>
      </Box>

      {/* Form Section */}
      <Container maxWidth="md" sx={{ py: 8 }}>
        <Card sx={{ 
          borderRadius: 4,
          background: 'linear-gradient(145deg, #1e293b, #334155)',
          border: '1px solid rgba(148, 163, 184, 0.1)',
          boxShadow: '0 25px 50px rgba(0,0,0,0.3)'
        }}>
          <CardContent sx={{ p: 6 }}>
            <Box sx={{ textAlign: 'center', mb: 6 }}>
              <Avatar sx={{ 
                bgcolor: '#3b82f6', 
                width: 64, 
                height: 64, 
                mx: 'auto', 
                mb: 2 
              }}>
                <Rocket sx={{ fontSize: '2rem' }} />
              </Avatar>
              <Typography variant="h4" gutterBottom sx={{ fontWeight: 'bold', color: 'white' }}>
                Let&apos;s launch your startup!
              </Typography>
              <Typography variant="body1" sx={{ color: 'rgba(255,255,255,0.8)' }}>
                Tell us your vision and we&apos;ll help make it reality
              </Typography>
            </Box>

            <Box component="form" onSubmit={handleSubmit(onSubmit)}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <TextField
                  fullWidth
                  label="Your name"
                  {...register('name', { required: 'Name is required' })}
                  error={!!errors.name}
                  helperText={errors.name?.message}
                  variant="outlined"
                  sx={{
                    '& .MuiOutlinedInput-root': {
                      bgcolor: 'rgba(255,255,255,0.05)',
                      '& fieldset': { borderColor: 'rgba(148, 163, 184, 0.3)' },
                      '&:hover fieldset': { borderColor: 'rgba(59, 130, 246, 0.5)' },
                    },
                    '& .MuiInputLabel-root': { color: 'rgba(255,255,255,0.7)' },
                    '& .MuiInputBase-input': { color: 'white' }
                  }}
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
                  sx={{
                    '& .MuiOutlinedInput-root': {
                      bgcolor: 'rgba(255,255,255,0.05)',
                      '& fieldset': { borderColor: 'rgba(148, 163, 184, 0.3)' },
                      '&:hover fieldset': { borderColor: 'rgba(59, 130, 246, 0.5)' },
                    },
                    '& .MuiInputLabel-root': { color: 'rgba(255,255,255,0.7)' },
                    '& .MuiInputBase-input': { color: 'white' }
                  }}
                />
              </div>
              
              <div className="mb-6">
                <TextField
                  fullWidth
                  label="Your startup name"
                  {...register('startup', { required: 'Startup name is required' })}
                  error={!!errors.startup}
                  helperText={errors.startup?.message}
                  variant="outlined"
                  sx={{
                    '& .MuiOutlinedInput-root': {
                      bgcolor: 'rgba(255,255,255,0.05)',
                      '& fieldset': { borderColor: 'rgba(148, 163, 184, 0.3)' },
                      '&:hover fieldset': { borderColor: 'rgba(59, 130, 246, 0.5)' },
                    },
                    '& .MuiInputLabel-root': { color: 'rgba(255,255,255,0.7)' },
                    '& .MuiInputBase-input': { color: 'white' }
                  }}
                />
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <TextField
                  fullWidth
                  select
                  label="Current stage"
                  SelectProps={{ native: true }}
                  {...register('stage', { required: 'Select a stage' })}
                  error={!!errors.stage}
                  helperText={errors.stage?.message}
                  variant="outlined"
                  sx={{
                    '& .MuiOutlinedInput-root': {
                      bgcolor: 'rgba(255,255,255,0.05)',
                      '& fieldset': { borderColor: 'rgba(148, 163, 184, 0.3)' },
                      '&:hover fieldset': { borderColor: 'rgba(59, 130, 246, 0.5)' },
                    },
                    '& .MuiInputLabel-root': { color: 'rgba(255,255,255,0.7)' },
                    '& .MuiInputBase-input': { color: 'white' }
                  }}
                >
                  <option value="">Select stage</option>
                  {stages.map((stage) => (
                    <option key={stage} value={stage} style={{ backgroundColor: '#1e293b', color: 'white' }}>
                      {stage}
                    </option>
                  ))}
                </TextField>
                <TextField
                  fullWidth
                  select
                  label="Expected timeline"
                  SelectProps={{ native: true }}
                  {...register('timeline', { required: 'Select a timeline' })}
                  error={!!errors.timeline}
                  helperText={errors.timeline?.message}
                  variant="outlined"
                  sx={{
                    '& .MuiOutlinedInput-root': {
                      bgcolor: 'rgba(255,255,255,0.05)',
                      '& fieldset': { borderColor: 'rgba(148, 163, 184, 0.3)' },
                      '&:hover fieldset': { borderColor: 'rgba(59, 130, 246, 0.5)' },
                    },
                    '& .MuiInputLabel-root': { color: 'rgba(255,255,255,0.7)' },
                    '& .MuiInputBase-input': { color: 'white' }
                  }}
                >
                  <option value="">Select timeline</option>
                  {timelines.map((timeline) => (
                    <option key={timeline} value={timeline} style={{ backgroundColor: '#1e293b', color: 'white' }}>
                      {timeline}
                    </option>
                  ))}
                </TextField>
              </div>
              
              <div className="mb-6">
                <TextField
                  fullWidth
                  label="Your big idea"
                  placeholder="Describe the problem you solve, your unique value proposition..."
                  multiline
                  rows={3}
                  {...register('idea', { required: 'Describe your idea' })}
                  error={!!errors.idea}
                  helperText={errors.idea?.message}
                  variant="outlined"
                  sx={{
                    '& .MuiOutlinedInput-root': {
                      bgcolor: 'rgba(255,255,255,0.05)',
                      '& fieldset': { borderColor: 'rgba(148, 163, 184, 0.3)' },
                      '&:hover fieldset': { borderColor: 'rgba(59, 130, 246, 0.5)' },
                    },
                    '& .MuiInputLabel-root': { color: 'rgba(255,255,255,0.7)' },
                    '& .MuiInputBase-input': { color: 'white' }
                  }}
                />
              </div>
              
              <div className="mb-6">
                <TextField
                  fullWidth
                  label="Additional message"
                  placeholder="Budget, preferred technologies, current team..."
                  multiline
                  rows={3}
                  {...register('message')}
                  variant="outlined"
                  sx={{
                    '& .MuiOutlinedInput-root': {
                      bgcolor: 'rgba(255,255,255,0.05)',
                      '& fieldset': { borderColor: 'rgba(148, 163, 184, 0.3)' },
                      '&:hover fieldset': { borderColor: 'rgba(59, 130, 246, 0.5)' },
                    },
                    '& .MuiInputLabel-root': { color: 'rgba(255,255,255,0.7)' },
                    '& .MuiInputBase-input': { color: 'white' }
                  }}
                />
              </div>

              <Box sx={{ textAlign: 'center', mt: 4 }}>
                <Button
                  type="submit"
                  variant="contained"
                  disabled={isSubmitting}
                  startIcon={<Rocket />}
                  sx={{
                    px: 6,
                    py: 2,
                    fontSize: '1.2rem',
                    borderRadius: 3,
                    background: 'linear-gradient(45deg, #3b82f6, #1d4ed8)',
                    boxShadow: '0 4px 20px rgba(59, 130, 246, 0.4)',
                    '&:hover': {
                      background: 'linear-gradient(45deg, #2563eb, #1e40af)',
                      boxShadow: '0 6px 25px rgba(59, 130, 246, 0.6)',
                      transform: 'translateY(-2px)'
                    },
                    transition: 'all 0.3s ease'
                  }}
                >
                  {isSubmitting ? 'Sending...' : 'Let\'s take off together! 🚀'}
                </Button>
                <Typography variant="body2" sx={{ color: 'rgba(255,255,255,0.6)', mt: 2 }}>
                  We&apos;ll contact you within 24 hours
                </Typography>
              </Box>
            </Box>
          </CardContent>
        </Card>
      </Container>
    </Box>
  );
}