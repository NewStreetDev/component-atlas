import React, { useState } from 'react';
import { TextField, Button, Box, Typography, Container, Paper, Divider, Chip } from '@mui/material';
import { Business, Schedule, Groups, TrendingUp } from '@mui/icons-material';
import { useForm } from 'react-hook-form';

interface ContactForm {
  company: string;
  name: string;
  position: string;
  email: string;
  phone: string;
  service: string;
  budget: string;
  message: string;
}

export default function CorporateContact() {
  const { register, handleSubmit, formState: { errors } } = useForm<ContactForm>();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const onSubmit = async (data: ContactForm) => {
    setIsSubmitting(true);
    await new Promise(resolve => setTimeout(resolve, 1000));
    console.log('Form submitted:', data);
    setIsSubmitting(false);
  };

  const services = [
    'Strategic Consulting',
    'Software Development',
    'Digital Transformation',
    'Data Analytics',
    'Cybersecurity',
    'Cloud Computing'
  ];

  const budgetRanges = [
    '$10,000 - $50,000',
    '$50,000 - $100,000',
    '$100,000 - $250,000',
    '$250,000+'
  ];

  return (
    <Box sx={{ minHeight: '100vh', bgcolor: '#f8fafc' }}>
      {/* Header Section */}
      <Box sx={{ bgcolor: '#1e293b', color: 'white', py: 6 }}>
        <Container maxWidth="lg">
          <Typography variant="h2" component="h1" gutterBottom sx={{ fontWeight: 'bold' }}>
            Enterprise Solutions
          </Typography>
          <Typography variant="h5" sx={{ opacity: 0.9, fontWeight: 300 }}>
            We transform your vision into measurable results
          </Typography>
        </Container>
      </Box>

      {/* Stats Section */}
      <Container maxWidth="lg" sx={{ py: 4 }}>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
          <Paper sx={{ p: 3, textAlign: 'center', borderRadius: 2 }}>
            <Groups sx={{ fontSize: '3rem', color: '#3b82f6', mb: 1 }} />
            <Typography variant="h4" sx={{ fontWeight: 'bold', color: '#1e293b' }}>500+</Typography>
            <Typography variant="body2" color="text.secondary">Clients</Typography>
          </Paper>
          <Paper sx={{ p: 3, textAlign: 'center', borderRadius: 2 }}>
            <TrendingUp sx={{ fontSize: '3rem', color: '#10b981', mb: 1 }} />
            <Typography variant="h4" sx={{ fontWeight: 'bold', color: '#1e293b' }}>95%</Typography>
            <Typography variant="body2" color="text.secondary">Satisfaction</Typography>
          </Paper>
          <Paper sx={{ p: 3, textAlign: 'center', borderRadius: 2 }}>
            <Schedule sx={{ fontSize: '3rem', color: '#f59e0b', mb: 1 }} />
            <Typography variant="h4" sx={{ fontWeight: 'bold', color: '#1e293b' }}>15</Typography>
            <Typography variant="body2" color="text.secondary">Years Experience</Typography>
          </Paper>
          <Paper sx={{ p: 3, textAlign: 'center', borderRadius: 2 }}>
            <Business sx={{ fontSize: '3rem', color: '#8b5cf6', mb: 1 }} />
            <Typography variant="h4" sx={{ fontWeight: 'bold', color: '#1e293b' }}>24/7</Typography>
            <Typography variant="body2" color="text.secondary">Support</Typography>
          </Paper>
        </div>

        {/* Contact Form */}
        <Paper sx={{ p: 6, borderRadius: 3, boxShadow: '0 4px 20px rgba(0,0,0,0.08)' }}>
          <Typography variant="h4" gutterBottom sx={{ fontWeight: 'bold', color: '#1e293b', mb: 1 }}>
            Request a Free Consultation
          </Typography>
          <Typography variant="body1" color="text.secondary" sx={{ mb: 4 }}>
            Complete the form and one of our specialists will contact you within 24 hours.
          </Typography>

          <Box component="form" onSubmit={handleSubmit(onSubmit)}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <TextField
                fullWidth
                label="Company"
                {...register('company', { required: 'Company is required' })}
                error={!!errors.company}
                helperText={errors.company?.message}
                variant="outlined"
              />
              <TextField
                fullWidth
                label="Full Name"
                {...register('name', { required: 'Name is required' })}
                error={!!errors.name}
                helperText={errors.name?.message}
                variant="outlined"
              />
              <TextField
                fullWidth
                label="Position/Title"
                {...register('position', { required: 'Position is required' })}
                error={!!errors.position}
                helperText={errors.position?.message}
                variant="outlined"
              />
              <TextField
                fullWidth
                label="Corporate Email"
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
              <TextField
                fullWidth
                label="Phone"
                {...register('phone', { required: 'Phone is required' })}
                error={!!errors.phone}
                helperText={errors.phone?.message}
                variant="outlined"
              />
              <TextField
                fullWidth
                select
                label="Service of Interest"
                SelectProps={{ native: true }}
                {...register('service', { required: 'Select a service' })}
                error={!!errors.service}
                helperText={errors.service?.message}
                variant="outlined"
              >
                <option value="">Select a service</option>
                {services.map((service) => (
                  <option key={service} value={service}>
                    {service}
                  </option>
                ))}
              </TextField>
            </div>
            
            <div className="mb-6">
              <Typography variant="subtitle1" gutterBottom sx={{ fontWeight: 600, color: '#374151' }}>
                Estimated Budget
              </Typography>
              <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, mb: 2 }}>
                {budgetRanges.map((range) => (
                  <Chip 
                    key={range} 
                    label={range} 
                    variant="outlined"
                    sx={{ 
                      cursor: 'pointer',
                      '&:hover': { bgcolor: '#f1f5f9' }
                    }}
                  />
                ))}
              </Box>
              <TextField
                fullWidth
                select
                SelectProps={{ native: true }}
                {...register('budget', { required: 'Select a budget range' })}
                error={!!errors.budget}
                helperText={errors.budget?.message}
                variant="outlined"
              >
                <option value="">Select a range</option>
                {budgetRanges.map((range) => (
                  <option key={range} value={range}>
                    {range}
                  </option>
                ))}
              </TextField>
            </div>
            
            <div className="mb-6">
              <TextField
                fullWidth
                label="Project Description"
                multiline
                rows={4}
                placeholder="Describe your objectives, current challenges and expected results..."
                {...register('message', { required: 'Description is required' })}
                error={!!errors.message}
                helperText={errors.message?.message}
                variant="outlined"
              />
            </div>

            <Divider sx={{ my: 4 }} />

            <Box sx={{ textAlign: 'center' }}>
              <Button
                type="submit"
                variant="contained"
                disabled={isSubmitting}
                sx={{
                  px: 6,
                  py: 2,
                  fontSize: '1.1rem',
                  borderRadius: 2,
                  bgcolor: '#1e293b',
                  '&:hover': {
                    bgcolor: '#334155'
                  }
                }}
              >
                {isSubmitting ? 'Sending Request...' : 'Request Free Consultation'}
              </Button>
              <Typography variant="body2" color="text.secondary" sx={{ mt: 2 }}>
                Your data is protected and will only be used to contact you.
              </Typography>
            </Box>
          </Box>
        </Paper>
      </Container>
    </Box>
  );
}