import React, { useState, useEffect, useRef } from 'react';
import { Box, Container, Typography, Card, CardContent, Button, Chip, IconButton, Fade, Slide } from '@mui/material';
import { 
  PlayArrow, 
  Code, 
  Security, 
  Speed, 
  Cloud, 
  Psychology, 
  AutoAwesome,
  ChevronLeft,
  ChevronRight,
  LocationOn,
  Verified,
  TrendingUp,
  DeviceHub
} from '@mui/icons-material';

interface ProcessStep {
  id: number;
  title: string;
  description: string;
  details: string;
  icon: React.ReactNode;
  color: string;
}

interface TeamMember {
  id: number;
  name: string;
  role: string;
  expertise: string[];
  bio: string;
  specialization: string;
}

interface Technology {
  name: string;
  category: string;
  description: string;
  proficiency: number;
  icon: React.ReactNode;
}

export default function TechAbout() {
  const [activeStep, setActiveStep] = useState(0);
  const [selectedMember, setSelectedMember] = useState<TeamMember | null>(null);
  const [currentTechIndex, setCurrentTechIndex] = useState(0);
  const [isVisible, setIsVisible] = useState<Record<string, boolean>>({});
  const [particlePositions, setParticlePositions] = useState<Array<{x: number, y: number, delay: number}>>([]);
  
  const heroRef = useRef<HTMLDivElement>(null);
  const processRef = useRef<HTMLDivElement>(null);

  const processSteps: ProcessStep[] = [
    {
      id: 1,
      title: 'Discovery & Analysis',
      description: 'Deep dive into your business ecosystem',
      details: 'We conduct comprehensive analysis using advanced analytics tools, stakeholder interviews, and market research to understand your unique challenges and opportunities.',
      icon: <Psychology />,
      color: '#8b5cf6'
    },
    {
      id: 2,
      title: 'Strategic Design',
      description: 'Architect innovative solutions',
      details: 'Our team designs scalable, future-proof solutions using cutting-edge technologies and best practices, ensuring optimal performance and user experience.',
      icon: <Code />,
      color: '#06b6d4'
    },
    {
      id: 3,
      title: 'Agile Development',
      description: 'Build with precision and speed',
      details: 'Implementation using modern development methodologies, continuous integration, and rigorous testing to deliver high-quality solutions on time.',
      icon: <Speed />,
      color: '#10b981'
    },
    {
      id: 4,
      title: 'Deployment & Optimization',
      description: 'Launch and continuously improve',
      details: 'Seamless deployment with ongoing monitoring, performance optimization, and support to ensure your solution evolves with your business needs.',
      icon: <TrendingUp />,
      color: '#f59e0b'
    }
  ];

  const teamMembers: TeamMember[] = [
    {
      id: 1,
      name: 'Alex Rivera',
      role: 'Lead Software Architect',
      expertise: ['System Design', 'Cloud Architecture', 'AI/ML'],
      bio: 'Alex specializes in designing scalable distributed systems and has led the architecture of platforms serving millions of users.',
      specialization: 'Enterprise-scale system architecture and performance optimization'
    },
    {
      id: 2,
      name: 'Maya Patel',
      role: 'UX Innovation Director',
      expertise: ['Design Systems', 'User Research', 'Prototyping'],
      bio: 'Maya combines human psychology with cutting-edge design to create intuitive experiences that users love.',
      specialization: 'Human-centered design and emerging interaction paradigms'
    },
    {
      id: 3,
      name: 'Jordan Kim',
      role: 'DevOps Engineering Lead',
      expertise: ['Infrastructure', 'Security', 'Automation'],
      bio: 'Jordan ensures our solutions are secure, scalable, and maintainable through innovative infrastructure solutions.',
      specialization: 'Cloud-native infrastructure and security automation'
    },
    {
      id: 4,
      name: 'Sam Chen',
      role: 'Data Science Director',
      expertise: ['Machine Learning', 'Analytics', 'AI Strategy'],
      bio: 'Sam transforms complex data into actionable insights and intelligent automation solutions.',
      specialization: 'Advanced analytics and artificial intelligence implementation'
    }
  ];

  const technologies: Technology[] = [
    { name: 'React Ecosystem', category: 'Frontend', description: 'Modern web applications', proficiency: 95, icon: <Code /> },
    { name: 'Node.js & Python', category: 'Backend', description: 'Scalable server solutions', proficiency: 92, icon: <DeviceHub /> },
    { name: 'AWS & Azure', category: 'Cloud', description: 'Enterprise cloud infrastructure', proficiency: 88, icon: <Cloud /> },
    { name: 'AI/ML Platforms', category: 'Intelligence', description: 'Intelligent automation', proficiency: 85, icon: <AutoAwesome /> },
    { name: 'Security Frameworks', category: 'Security', description: 'Enterprise-grade security', proficiency: 90, icon: <Security /> },
    { name: 'DevOps Tools', category: 'Operations', description: 'Automated deployment', proficiency: 93, icon: <Speed /> }
  ];

  const certifications = [
    'AWS Solutions Architect Professional',
    'Google Cloud Professional',
    'Microsoft Azure Expert',
    'Certified Kubernetes Administrator',
    'ISO 27001 Security',
    'Agile & Scrum Master'
  ];

  const locations = [
    { city: 'San Francisco', country: 'USA', type: 'Headquarters', employees: 120 },
    { city: 'London', country: 'UK', type: 'European Hub', employees: 85 },
    { city: 'Singapore', country: 'Singapore', type: 'Asia Pacific', employees: 95 },
    { city: 'Toronto', country: 'Canada', type: 'Innovation Lab', employees: 45 }
  ];

  useEffect(() => {
    // Generate particle positions
    const particles = Array.from({ length: 20 }, (_, i) => ({
      x: Math.random() * 100,
      y: Math.random() * 100,
      delay: i * 0.2
    }));
    setParticlePositions(particles);

    // Intersection Observer for animations
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(prev => ({
              ...prev,
              [entry.target.id]: true
            }));
          }
        });
      },
      { threshold: 0.1 }
    );

    const elements = document.querySelectorAll('[data-animate]');
    elements.forEach(el => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  const nextTech = () => {
    setCurrentTechIndex((prev) => (prev + 1) % Math.ceil(technologies.length / 3));
  };

  const prevTech = () => {
    setCurrentTechIndex((prev) => (prev - 1 + Math.ceil(technologies.length / 3)) % Math.ceil(technologies.length / 3));
  };

  return (
    <Box sx={{ minHeight: '100vh', bgcolor: '#0f172a', color: 'white', overflow: 'hidden' }}>
      {/* Cinematic Hero Section */}
      <Box ref={heroRef} sx={{ 
        position: 'relative',
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        background: 'linear-gradient(135deg, #0f172a 0%, #1e293b 50%, #334155 100%)',
        overflow: 'hidden'
      }}>
        {/* Animated Background Particles */}
        {particlePositions.map((particle, index) => (
          <Box
            key={index}
            sx={{
              position: 'absolute',
              left: `${particle.x}%`,
              top: `${particle.y}%`,
              width: '4px',
              height: '4px',
              bgcolor: '#3b82f6',
              borderRadius: '50%',
              opacity: 0.6,
              animation: `float 4s ease-in-out infinite ${particle.delay}s`,
              '@keyframes float': {
                '0%, 100%': { transform: 'translateY(0px) scale(1)' },
                '50%': { transform: 'translateY(-20px) scale(1.2)' }
              }
            }}
          />
        ))}

        {/* Geometric Shapes */}
        <Box sx={{
          position: 'absolute',
          top: '20%',
          right: '10%',
          width: '200px',
          height: '200px',
          background: 'linear-gradient(45deg, #3b82f6, #8b5cf6)',
          borderRadius: '30% 70% 70% 30% / 30% 30% 70% 70%',
          opacity: 0.1,
          animation: 'morphing 8s ease-in-out infinite',
          '@keyframes morphing': {
            '0%': { borderRadius: '30% 70% 70% 30% / 30% 30% 70% 70%' },
            '25%': { borderRadius: '58% 42% 75% 25% / 76% 46% 54% 24%' },
            '50%': { borderRadius: '50% 50% 33% 67% / 55% 27% 73% 45%' },
            '75%': { borderRadius: '33% 67% 58% 42% / 63% 68% 32% 37%' },
            '100%': { borderRadius: '30% 70% 70% 30% / 30% 30% 70% 70%' }
          }
        }} />

        <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 2 }}>
          <Fade in timeout={1000}>
            <Box>
              <Typography variant="h1" sx={{ 
                fontSize: { xs: '3rem', md: '5rem' },
                fontWeight: 'bold',
                mb: 3,
                background: 'linear-gradient(45deg, #3b82f6, #8b5cf6, #06b6d4)',
                backgroundClip: 'text',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                textAlign: 'center'
              }}>
                Innovation Unleashed
              </Typography>
            </Box>
          </Fade>
          
          <Slide direction="up" in timeout={1500}>
            <Typography variant="h4" sx={{ 
              textAlign: 'center',
              mb: 6,
              fontWeight: 300,
              opacity: 0.9,
              maxWidth: '800px',
              mx: 'auto'
            }}>
              We craft tomorrow&apos;s technology today, pushing the boundaries of what&apos;s possible 
              through innovative solutions and cutting-edge engineering excellence
            </Typography>
          </Slide>

          <Box sx={{ textAlign: 'center' }}>
            <Button
              variant="contained"
              size="large"
              startIcon={<PlayArrow />}
              sx={{
                background: 'linear-gradient(45deg, #3b82f6, #8b5cf6)',
                px: 6,
                py: 2,
                fontSize: '1.2rem',
                borderRadius: '50px',
                boxShadow: '0 8px 32px rgba(59, 130, 246, 0.3)',
                '&:hover': {
                  transform: 'translateY(-2px)',
                  boxShadow: '0 12px 40px rgba(59, 130, 246, 0.4)'
                },
                transition: 'all 0.3s ease'
              }}
            >
              Explore Our Process
            </Button>
          </Box>
        </Container>
      </Box>

      {/* Interactive Process Visualization */}
      <Container maxWidth="lg" sx={{ py: 8 }}>
        <Box id="process" data-animate sx={{ mb: 8 }}>
          <Typography variant="h2" sx={{ 
            textAlign: 'center', 
            mb: 6, 
            fontWeight: 'bold',
            background: 'linear-gradient(45deg, #3b82f6, #8b5cf6)',
            backgroundClip: 'text',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent'
          }}>
            Our Innovation Process
          </Typography>
        </Box>

        {/* Process Flow */}
        <Box sx={{ mb: 8 }}>
          <Box sx={{ 
            display: 'flex', 
            justifyContent: 'center',
            mb: 6,
            flexWrap: 'wrap',
            gap: 2
          }}>
            {processSteps.map((step, index) => (
              <Button
                key={step.id}
                onClick={() => setActiveStep(index)}
                variant={activeStep === index ? 'contained' : 'outlined'}
                sx={{
                  minWidth: '200px',
                  py: 1.5,
                  px: 3,
                  borderRadius: '25px',
                  bgcolor: activeStep === index ? step.color : 'transparent',
                  borderColor: step.color,
                  color: activeStep === index ? 'white' : step.color,
                  '&:hover': {
                    bgcolor: step.color,
                    color: 'white'
                  }
                }}
              >
                <Box sx={{ mr: 1 }}>{step.icon}</Box>
                Step {step.id}
              </Button>
            ))}
          </Box>

          {/* Active Step Details */}
          <Fade in timeout={500} key={activeStep}>
            <Card sx={{
              background: `linear-gradient(135deg, ${processSteps[activeStep].color}15, ${processSteps[activeStep].color}05)`,
              border: `2px solid ${processSteps[activeStep].color}`,
              borderRadius: 4
            }}>
              <CardContent sx={{ p: 6 }}>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
                  <Box sx={{ 
                    p: 2, 
                    borderRadius: '50%', 
                    bgcolor: processSteps[activeStep].color,
                    color: 'white',
                    mr: 3
                  }}>
                    {processSteps[activeStep].icon}
                  </Box>
                  <Box>
                    <Typography variant="h4" sx={{ fontWeight: 'bold', mb: 1 }}>
                      {processSteps[activeStep].title}
                    </Typography>
                    <Typography variant="h6" sx={{ opacity: 0.8 }}>
                      {processSteps[activeStep].description}
                    </Typography>
                  </Box>
                </Box>
                <Typography variant="body1" sx={{ fontSize: '1.1rem', lineHeight: 1.6 }}>
                  {processSteps[activeStep].details}
                </Typography>
              </CardContent>
            </Card>
          </Fade>
        </Box>
      </Container>

      {/* Team Showcase */}
      <Box sx={{ bgcolor: '#1e293b', py: 8 }}>
        <Container maxWidth="lg">
          <Typography variant="h2" sx={{ 
            textAlign: 'center', 
            mb: 6, 
            fontWeight: 'bold',
            background: 'linear-gradient(45deg, #06b6d4, #10b981)',
            backgroundClip: 'text',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent'
          }}>
            Innovation Team
          </Typography>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {teamMembers.map((member) => (
              <Card
                key={member.id}
                sx={{
                  background: 'linear-gradient(135deg, #334155, #475569)',
                  border: selectedMember?.id === member.id ? '2px solid #3b82f6' : 'none',
                  cursor: 'pointer',
                  transition: 'all 0.3s ease',
                  '&:hover': {
                    transform: 'translateY(-8px)',
                    boxShadow: '0 20px 40px rgba(0,0,0,0.3)'
                  }
                }}
                onClick={() => setSelectedMember(member)}
              >
                <CardContent sx={{ p: 3, textAlign: 'center' }}>
                  <Box sx={{
                    width: 80,
                    height: 80,
                    mx: 'auto',
                    mb: 2,
                    borderRadius: '50%',
                    background: 'linear-gradient(45deg, #3b82f6, #8b5cf6)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '2rem'
                  }}>
                    {member.name.charAt(0)}
                  </Box>
                  <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 1 }}>
                    {member.name}
                  </Typography>
                  <Typography variant="body2" sx={{ color: '#06b6d4', mb: 2 }}>
                    {member.role}
                  </Typography>
                  <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5, justifyContent: 'center' }}>
                    {member.expertise.slice(0, 2).map((skill, idx) => (
                      <Chip 
                        key={idx} 
                        label={skill} 
                        size="small" 
                        sx={{ 
                          bgcolor: 'rgba(59, 130, 246, 0.2)',
                          color: '#3b82f6',
                          fontSize: '0.7rem'
                        }} 
                      />
                    ))}
                  </Box>
                </CardContent>
              </Card>
            ))}
          </div>

          {selectedMember && (
            <Fade in timeout={500}>
              <Card sx={{
                background: 'linear-gradient(135deg, #334155, #475569)',
                border: '2px solid #3b82f6'
              }}>
                <CardContent sx={{ p: 6 }}>
                  <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: 4, mb: 4 }}>
                    <Box sx={{
                      width: 100,
                      height: 100,
                      borderRadius: '50%',
                      background: 'linear-gradient(45deg, #3b82f6, #8b5cf6)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: '2.5rem',
                      fontWeight: 'bold'
                    }}>
                      {selectedMember.name.charAt(0)}
                    </Box>
                    <Box sx={{ flexGrow: 1 }}>
                      <Typography variant="h4" sx={{ fontWeight: 'bold', mb: 1 }}>
                        {selectedMember.name}
                      </Typography>
                      <Typography variant="h6" sx={{ color: '#06b6d4', mb: 2 }}>
                        {selectedMember.role}
                      </Typography>
                      <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, mb: 3 }}>
                        {selectedMember.expertise.map((skill, idx) => (
                          <Chip 
                            key={idx} 
                            label={skill} 
                            sx={{ 
                              bgcolor: 'rgba(59, 130, 246, 0.2)',
                              color: '#3b82f6'
                            }} 
                          />
                        ))}
                      </Box>
                    </Box>
                    <Button
                      onClick={() => setSelectedMember(null)}
                      variant="outlined"
                      sx={{ color: '#06b6d4', borderColor: '#06b6d4' }}
                    >
                      Close
                    </Button>
                  </Box>
                  
                  <Typography variant="body1" sx={{ mb: 3, lineHeight: 1.6 }}>
                    {selectedMember.bio}
                  </Typography>
                  
                  <Box sx={{ 
                    p: 3, 
                    borderRadius: 2,
                    background: 'rgba(6, 182, 212, 0.1)',
                    borderLeft: '4px solid #06b6d4'
                  }}>
                    <Typography variant="body2" sx={{ fontWeight: 'bold', mb: 1, color: '#06b6d4' }}>
                      Specialization:
                    </Typography>
                    <Typography variant="body2">
                      {selectedMember.specialization}
                    </Typography>
                  </Box>
                </CardContent>
              </Card>
            </Fade>
          )}
        </Container>
      </Box>

      {/* Technology Showcase Carousel */}
      <Container maxWidth="lg" sx={{ py: 8 }}>
        <Typography variant="h2" sx={{ 
          textAlign: 'center', 
          mb: 6, 
          fontWeight: 'bold',
          background: 'linear-gradient(45deg, #f59e0b, #ef4444)',
          backgroundClip: 'text',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent'
        }}>
          Technology Excellence
        </Typography>

        <Box sx={{ position: 'relative', mb: 6 }}>
          <Box sx={{ 
            display: 'flex', 
            alignItems: 'center', 
            justifyContent: 'space-between',
            mb: 4 
          }}>
            <IconButton 
              onClick={prevTech}
              sx={{ 
                color: '#3b82f6',
                bgcolor: 'rgba(59, 130, 246, 0.1)',
                '&:hover': { bgcolor: 'rgba(59, 130, 246, 0.2)' }
              }}
            >
              <ChevronLeft />
            </IconButton>
            
            <Typography variant="h5" sx={{ fontWeight: 'bold' }}>
              Core Technologies & Expertise
            </Typography>
            
            <IconButton 
              onClick={nextTech}
              sx={{ 
                color: '#3b82f6',
                bgcolor: 'rgba(59, 130, 246, 0.1)',
                '&:hover': { bgcolor: 'rgba(59, 130, 246, 0.2)' }
              }}
            >
              <ChevronRight />
            </IconButton>
          </Box>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {technologies.slice(currentTechIndex * 3, (currentTechIndex + 1) * 3).map((tech, index) => (
              <Card key={tech.name} sx={{
                background: 'linear-gradient(135deg, #1e293b, #334155)',
                border: '1px solid rgba(59, 130, 246, 0.3)',
                transition: 'all 0.3s ease',
                '&:hover': {
                  transform: 'translateY(-8px)',
                  border: '1px solid #3b82f6'
                }
              }}>
                <CardContent sx={{ p: 4 }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                    <Box sx={{ color: '#3b82f6', mr: 2 }}>
                      {tech.icon}
                    </Box>
                    <Box>
                      <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
                        {tech.name}
                      </Typography>
                      <Chip 
                        label={tech.category} 
                        size="small" 
                        sx={{ bgcolor: 'rgba(59, 130, 246, 0.2)', color: '#3b82f6' }}
                      />
                    </Box>
                  </Box>
                  <Typography variant="body2" sx={{ mb: 3, opacity: 0.8 }}>
                    {tech.description}
                  </Typography>
                  <Box sx={{ mb: 1 }}>
                    <Typography variant="body2" sx={{ mb: 1 }}>
                      Proficiency: {tech.proficiency}%
                    </Typography>
                    <Box sx={{ 
                      width: '100%', 
                      height: 6, 
                      bgcolor: 'rgba(59, 130, 246, 0.2)', 
                      borderRadius: 3,
                      overflow: 'hidden'
                    }}>
                      <Box sx={{
                        width: `${tech.proficiency}%`,
                        height: '100%',
                        background: 'linear-gradient(90deg, #3b82f6, #06b6d4)',
                        borderRadius: 3,
                        transition: 'width 1s ease'
                      }} />
                    </Box>
                  </Box>
                </CardContent>
              </Card>
            ))}
          </div>
        </Box>

        {/* Certifications */}
        <Box sx={{ textAlign: 'center' }}>
          <Typography variant="h5" sx={{ mb: 4, fontWeight: 'bold' }}>
            Industry Certifications
          </Typography>
          <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2, justifyContent: 'center' }}>
            {certifications.map((cert, index) => (
              <Chip
                key={index}
                label={cert}
                icon={<Verified />}
                sx={{
                  bgcolor: 'rgba(16, 185, 129, 0.2)',
                  color: '#10b981',
                  border: '1px solid rgba(16, 185, 129, 0.3)',
                  '&:hover': {
                    bgcolor: 'rgba(16, 185, 129, 0.3)'
                  }
                }}
              />
            ))}
          </Box>
        </Box>
      </Container>

      {/* Global Presence */}
      <Box sx={{ bgcolor: '#1e293b', py: 8 }}>
        <Container maxWidth="lg">
          <Typography variant="h2" sx={{ 
            textAlign: 'center', 
            mb: 6, 
            fontWeight: 'bold',
            background: 'linear-gradient(45deg, #8b5cf6, #ec4899)',
            backgroundClip: 'text',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent'
          }}>
            Global Innovation Network
          </Typography>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {locations.map((location, index) => (
              <Card key={index} sx={{
                background: 'linear-gradient(135deg, #334155, #475569)',
                textAlign: 'center',
                transition: 'all 0.3s ease',
                '&:hover': {
                  transform: 'translateY(-8px)',
                  boxShadow: '0 20px 40px rgba(0,0,0,0.3)'
                }
              }}>
                <CardContent sx={{ p: 4 }}>
                  <LocationOn sx={{ fontSize: '3rem', color: '#8b5cf6', mb: 2 }} />
                  <Typography variant="h5" sx={{ fontWeight: 'bold', mb: 1 }}>
                    {location.city}
                  </Typography>
                  <Typography variant="body1" sx={{ color: '#06b6d4', mb: 1 }}>
                    {location.country}
                  </Typography>
                  <Chip 
                    label={location.type} 
                    size="small" 
                    sx={{ 
                      bgcolor: 'rgba(139, 92, 246, 0.2)',
                      color: '#8b5cf6',
                      mb: 2
                    }} 
                  />
                  <Typography variant="h4" sx={{ fontWeight: 'bold', color: '#10b981' }}>
                    {location.employees}
                  </Typography>
                  <Typography variant="body2" sx={{ opacity: 0.8 }}>
                    Team Members
                  </Typography>
                </CardContent>
              </Card>
            ))}
          </div>
        </Container>
      </Box>
    </Box>
  );
}