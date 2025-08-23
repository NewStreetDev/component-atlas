import React, { useState, useEffect } from 'react';
import { Box, Container, Typography, Card, CardContent, Avatar, Button, LinearProgress, Chip } from '@mui/material';
import { Business, TrendingUp, Groups, Public, ChevronRight, PlayArrow, ExpandMore } from '@mui/icons-material';

interface TimelineItem {
  year: string;
  title: string;
  description: string;
  details: string;
}

interface Leader {
  name: string;
  position: string;
  bio: string;
  expertise: string[];
  philosophy: string;
}

interface Stat {
  number: number;
  label: string;
  suffix: string;
  icon: React.ReactNode;
}

export default function CorporateAbout() {
  const [expandedTimeline, setExpandedTimeline] = useState<string | null>(null);
  const [selectedLeader, setSelectedLeader] = useState<Leader | null>(null);
  const [animatedStats, setAnimatedStats] = useState<Record<string, number>>({});

  const timeline: TimelineItem[] = [
    {
      year: '2010',
      title: 'Foundation & Vision',
      description: 'Company established with a clear mission to transform industries',
      details: 'Founded by visionary entrepreneurs who saw the potential to revolutionize how businesses operate. Started with a small team of 5 dedicated professionals in a modest office space, but with ambitious dreams and unwavering determination.'
    },
    {
      year: '2015',
      title: 'Market Expansion',
      description: 'Expanded operations to serve global markets',
      details: 'Achieved significant milestone by expanding internationally, establishing partnerships across 15 countries. Introduced innovative service offerings that set new industry standards and gained recognition from leading industry publications.'
    },
    {
      year: '2018',
      title: 'Technology Innovation',
      description: 'Launched cutting-edge platform solutions',
      details: 'Invested heavily in R&D to develop proprietary technology that transformed client experiences. Secured multiple patents and received innovation awards from prestigious technology organizations worldwide.'
    },
    {
      year: '2021',
      title: 'Industry Leadership',
      description: 'Recognized as market leader with record growth',
      details: 'Achieved unprecedented growth while maintaining quality standards. Expanded team to over 500 professionals and established offices in major business hubs globally. Received numerous industry accolades for excellence.'
    },
    {
      year: '2024',
      title: 'Future Vision',
      description: 'Pioneering next-generation solutions',
      details: 'Launching revolutionary AI-powered solutions that will define the future of our industry. Committed to sustainable growth and social responsibility while maintaining our position as innovation leaders.'
    }
  ];

  const leaders: Leader[] = [
    {
      name: 'Sarah Johnson',
      position: 'Chief Executive Officer',
      bio: 'Sarah brings over 20 years of strategic leadership experience, having previously led transformational initiatives at Fortune 500 companies.',
      expertise: ['Strategic Planning', 'Global Operations', 'Digital Transformation'],
      philosophy: 'Success is measured not just in profits, but in the positive impact we create for our clients and communities.'
    },
    {
      name: 'Michael Chen',
      position: 'Chief Technology Officer',
      bio: 'Michael is a technology visionary with extensive experience in emerging technologies and innovation management.',
      expertise: ['Technology Innovation', 'AI & Machine Learning', 'Product Development'],
      philosophy: 'Technology should solve real problems and create meaningful value for users and businesses alike.'
    },
    {
      name: 'Emily Rodriguez',
      position: 'Chief Operations Officer',
      bio: 'Emily excels in operational excellence and process optimization, ensuring seamless delivery of services to clients worldwide.',
      expertise: ['Operations Management', 'Process Optimization', 'Quality Assurance'],
      philosophy: 'Excellence in execution is what transforms great ideas into exceptional results.'
    }
  ];

  const stats: Stat[] = [
    { number: 14, label: 'Years of Excellence', suffix: '+', icon: <Business /> },
    { number: 500, label: 'Satisfied Clients', suffix: '+', icon: <Groups /> },
    { number: 1200, label: 'Projects Delivered', suffix: '+', icon: <TrendingUp /> },
    { number: 25, label: 'Countries Served', suffix: '', icon: <Public /> }
  ];

  const values = [
    {
      title: 'Innovation Excellence',
      description: 'We continuously push boundaries to deliver cutting-edge solutions',
      example: 'Our R&D team dedicates 20% of their time to exploring emerging technologies, resulting in 12 patents filed last year alone.'
    },
    {
      title: 'Client Partnership',
      description: 'We build lasting relationships based on trust and mutual success',
      example: 'Our average client relationship spans over 5 years, with 95% of clients rating our partnership as exceptional.'
    },
    {
      title: 'Integrity First',
      description: 'Ethical practices guide every decision we make',
      example: 'We maintain transparent communication with all stakeholders and have never compromised on our ethical standards.'
    },
    {
      title: 'Sustainable Growth',
      description: 'We balance business success with environmental responsibility',
      example: 'Achieved carbon neutrality in 2023 and committed to net-zero emissions by 2030.'
    }
  ];

  useEffect(() => {
    const timer = setTimeout(() => {
      stats.forEach((stat, index) => {
        setTimeout(() => {
          let current = 0;
          const increment = stat.number / 50;
          const counter = setInterval(() => {
            current += increment;
            if (current >= stat.number) {
              current = stat.number;
              clearInterval(counter);
            }
            setAnimatedStats(prev => ({
              ...prev,
              [stat.label]: Math.floor(current)
            }));
          }, 30);
        }, index * 200);
      });
    }, 500);

    return () => clearTimeout(timer);
  }, []);

  return (
    <Box sx={{ minHeight: '100vh' }}>
      {/* Hero Section */}
      <Box sx={{ 
        background: 'linear-gradient(135deg, #1e3a8a 0%, #3b82f6 100%)',
        color: 'white',
        py: { xs: 8, md: 12 },
        position: 'relative',
        overflow: 'hidden'
      }}>
        <Container maxWidth="lg">
          <Box sx={{ textAlign: 'center', position: 'relative', zIndex: 2 }}>
            <Typography variant="h1" sx={{ 
              fontSize: { xs: '2.5rem', md: '4rem' },
              fontWeight: 'bold',
              mb: 3,
              textShadow: '2px 2px 4px rgba(0,0,0,0.3)'
            }}>
              Transforming Tomorrow, Today
            </Typography>
            <Typography variant="h4" sx={{ 
              fontWeight: 300,
              mb: 4,
              opacity: 0.9,
              maxWidth: '800px',
              mx: 'auto'
            }}>
              We are industry pioneers dedicated to delivering excellence through innovation, 
              integrity, and unwavering commitment to our clients&apos; success
            </Typography>
            <Button
              variant="contained"
              size="large"
              startIcon={<PlayArrow />}
              sx={{
                bgcolor: 'rgba(255,255,255,0.2)',
                backdropFilter: 'blur(10px)',
                border: '1px solid rgba(255,255,255,0.3)',
                px: 4,
                py: 2,
                fontSize: '1.1rem',
                '&:hover': {
                  bgcolor: 'rgba(255,255,255,0.3)',
                }
              }}
            >
              Our Story
            </Button>
          </Box>
        </Container>
      </Box>

      {/* Interactive Timeline */}
      <Container maxWidth="lg" sx={{ py: 8 }}>
        <Typography variant="h2" sx={{ textAlign: 'center', mb: 6, fontWeight: 'bold' }}>
          Our Journey of Excellence
        </Typography>
        
        <Box sx={{ position: 'relative' }}>
          {/* Timeline Line */}
          <Box sx={{
            position: 'absolute',
            left: { xs: '20px', md: '50%' },
            top: 0,
            bottom: 0,
            width: '2px',
            bgcolor: '#e5e7eb',
            transform: { md: 'translateX(-50%)' }
          }} />
          
          {timeline.map((item, index) => (
            <Box key={item.year} sx={{ 
              position: 'relative',
              mb: 6,
              pl: { xs: 6, md: 0 }
            }}>
              {/* Timeline Dot */}
              <Box sx={{
                position: 'absolute',
                left: { xs: '11px', md: '50%' },
                top: '20px',
                width: '20px',
                height: '20px',
                bgcolor: '#3b82f6',
                borderRadius: '50%',
                transform: { md: 'translateX(-50%)' },
                border: '4px solid white',
                boxShadow: '0 0 0 4px #e5e7eb'
              }} />
              
              {/* Content */}
              <Box sx={{
                ml: { md: index % 2 === 0 ? 0 : 'auto' },
                mr: { md: index % 2 === 0 ? 'auto' : 0 },
                maxWidth: { md: '45%' },
                mb: 2
              }}>
                <Card sx={{
                  cursor: 'pointer',
                  transition: 'all 0.3s ease',
                  '&:hover': {
                    transform: 'translateY(-4px)',
                    boxShadow: '0 8px 25px rgba(0,0,0,0.1)'
                  }
                }}
                onClick={() => setExpandedTimeline(
                  expandedTimeline === item.year ? null : item.year
                )}
                >
                  <CardContent sx={{ p: 3 }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                      <Chip
                        label={item.year}
                        color="primary"
                        sx={{ fontWeight: 'bold', mr: 2 }}
                      />
                      <ExpandMore sx={{
                        transition: 'transform 0.3s ease',
                        transform: expandedTimeline === item.year ? 'rotate(180deg)' : 'none'
                      }} />
                    </Box>
                    <Typography variant="h5" sx={{ fontWeight: 600, mb: 1 }}>
                      {item.title}
                    </Typography>
                    <Typography variant="body1" color="text.secondary" sx={{ mb: 2 }}>
                      {item.description}
                    </Typography>
                    
                    {expandedTimeline === item.year && (
                      <Box sx={{ 
                        mt: 2, 
                        pt: 2, 
                        borderTop: '1px solid #e5e7eb',
                        animation: 'fadeIn 0.3s ease'
                      }}>
                        <Typography variant="body2" sx={{ lineHeight: 1.6 }}>
                          {item.details}
                        </Typography>
                      </Box>
                    )}
                  </CardContent>
                </Card>
              </Box>
            </Box>
          ))}
        </Box>
      </Container>

      {/* Company Values */}
      <Box sx={{ bgcolor: '#f8fafc', py: 8 }}>
        <Container maxWidth="lg">
          <Typography variant="h2" sx={{ textAlign: 'center', mb: 6, fontWeight: 'bold' }}>
            Our Core Values
          </Typography>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {values.map((value, index) => (
              <Card key={index} sx={{
                height: '100%',
                transition: 'transform 0.3s ease',
                '&:hover': {
                  transform: 'translateY(-8px)',
                  boxShadow: '0 12px 30px rgba(0,0,0,0.1)'
                }
              }}>
                <CardContent sx={{ p: 4, height: '100%', display: 'flex', flexDirection: 'column' }}>
                  <Typography variant="h5" sx={{ fontWeight: 600, mb: 2, color: '#1e40af' }}>
                    {value.title}
                  </Typography>
                  <Typography variant="body1" sx={{ mb: 3, flexGrow: 1 }}>
                    {value.description}
                  </Typography>
                  <Box sx={{ 
                    p: 2, 
                    bgcolor: '#eff6ff', 
                    borderRadius: 2, 
                    borderLeft: '4px solid #3b82f6' 
                  }}>
                    <Typography variant="body2" color="text.secondary" sx={{ fontStyle: 'italic' }}>
                      <strong>In Practice:</strong> {value.example}
                    </Typography>
                  </Box>
                </CardContent>
              </Card>
            ))}
          </div>
        </Container>
      </Box>

      {/* Leadership Team */}
      <Container maxWidth="lg" sx={{ py: 8 }}>
        <Typography variant="h2" sx={{ textAlign: 'center', mb: 6, fontWeight: 'bold' }}>
          Leadership Excellence
        </Typography>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {leaders.map((leader, index) => (
            <Card key={index} sx={{
              textAlign: 'center',
              cursor: 'pointer',
              transition: 'all 0.3s ease',
              '&:hover': {
                transform: 'translateY(-8px)',
                boxShadow: '0 12px 30px rgba(0,0,0,0.1)'
              }
            }}
            onClick={() => setSelectedLeader(leader)}
            >
              <CardContent sx={{ p: 4 }}>
                <Avatar
                  src="placeholder-image.webp"
                  sx={{ 
                    width: 120, 
                    height: 120, 
                    mx: 'auto', 
                    mb: 3,
                    border: '4px solid #e5e7eb'
                  }}
                />
                <Typography variant="h5" sx={{ fontWeight: 600, mb: 1 }}>
                  {leader.name}
                </Typography>
                <Typography variant="body1" color="primary" sx={{ mb: 2 }}>
                  {leader.position}
                </Typography>
                <Button
                  variant="outlined"
                  endIcon={<ChevronRight />}
                  size="small"
                >
                  View Profile
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        {selectedLeader && (
          <Card sx={{ 
            mt: 4,
            border: '2px solid #3b82f6',
            animation: 'fadeIn 0.3s ease'
          }}>
            <CardContent sx={{ p: 4 }}>
              <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: 4, mb: 3 }}>
                <Avatar
                  src="placeholder-image.webp"
                  sx={{ width: 80, height: 80 }}
                />
                <Box sx={{ flexGrow: 1 }}>
                  <Typography variant="h4" sx={{ fontWeight: 600, mb: 1 }}>
                    {selectedLeader.name}
                  </Typography>
                  <Typography variant="h6" color="primary" sx={{ mb: 2 }}>
                    {selectedLeader.position}
                  </Typography>
                  <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, mb: 2 }}>
                    {selectedLeader.expertise.map((skill, idx) => (
                      <Chip key={idx} label={skill} size="small" color="primary" variant="outlined" />
                    ))}
                  </Box>
                </Box>
                <Button
                  onClick={() => setSelectedLeader(null)}
                  variant="outlined"
                  size="small"
                >
                  Close
                </Button>
              </Box>
              
              <Typography variant="body1" sx={{ mb: 3, lineHeight: 1.6 }}>
                {selectedLeader.bio}
              </Typography>
              
              <Box sx={{ 
                p: 3, 
                bgcolor: '#f8fafc', 
                borderRadius: 2,
                borderLeft: '4px solid #3b82f6'
              }}>
                <Typography variant="body2" sx={{ fontStyle: 'italic', color: '#374151' }}>
                  <strong>Leadership Philosophy:</strong> &apos;{selectedLeader.philosophy}&apos;
                </Typography>
              </Box>
            </CardContent>
          </Card>
        )}
      </Container>

      {/* Statistics Section */}
      <Box sx={{ bgcolor: '#1e40af', color: 'white', py: 8 }}>
        <Container maxWidth="lg">
          <Typography variant="h2" sx={{ textAlign: 'center', mb: 6, fontWeight: 'bold' }}>
            Excellence in Numbers
          </Typography>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {stats.map((stat, index) => (
              <Box key={index} sx={{ textAlign: 'center' }}>
                <Box sx={{ 
                  mb: 2, 
                  color: '#60a5fa',
                  '& svg': { fontSize: '3rem' }
                }}>
                  {stat.icon}
                </Box>
                <Typography variant="h2" sx={{ 
                  fontWeight: 'bold', 
                  mb: 1,
                  fontSize: { xs: '2.5rem', md: '3.5rem' }
                }}>
                  {animatedStats[stat.label] || 0}{stat.suffix}
                </Typography>
                <Typography variant="h6" sx={{ opacity: 0.9 }}>
                  {stat.label}
                </Typography>
              </Box>
            ))}
          </div>
        </Container>
      </Box>

      {/* Testimonials */}
      <Container maxWidth="lg" sx={{ py: 8 }}>
        <Typography variant="h2" sx={{ textAlign: 'center', mb: 6, fontWeight: 'bold' }}>
          Client Success Stories
        </Typography>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {[
            {
              quote: "Their strategic approach and innovative solutions transformed our business operations completely. The results exceeded our expectations.",
              author: "Jennifer Martinez",
              position: "CEO, TechVision Corp",
              company: "Fortune 500 Technology Company"
            },
            {
              quote: "The level of professionalism and expertise they bring is unmatched. They truly understand our industry challenges.",
              author: "Robert Chen",
              position: "Director of Operations",
              company: "Global Manufacturing Leader"
            }
          ].map((testimonial, index) => (
            <Card key={index} sx={{
              height: '100%',
              background: 'linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%)',
              border: '1px solid #e2e8f0'
            }}>
              <CardContent sx={{ p: 4 }}>
                <Typography variant="body1" sx={{ 
                  fontSize: '1.2rem', 
                  lineHeight: 1.6, 
                  mb: 3,
                  fontStyle: 'italic'
                }}>
                  &quot;{testimonial.quote}&quot;
                </Typography>
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  <Avatar 
                    src="placeholder-image.webp"
                    sx={{ width: 50, height: 50, mr: 2 }}
                  />
                  <Box>
                    <Typography variant="h6" sx={{ fontWeight: 600 }}>
                      {testimonial.author}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {testimonial.position}
                    </Typography>
                    <Typography variant="body2" color="primary">
                      {testimonial.company}
                    </Typography>
                  </Box>
                </Box>
              </CardContent>
            </Card>
          ))}
        </div>
      </Container>

      <style jsx>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </Box>
  );
}