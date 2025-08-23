import React, { useState } from 'react';
import { Box, Container, Typography, Card, CardContent, Avatar, Button, Chip, Divider, IconButton } from '@mui/material';
import { 
  Groups, 
  EmojiEmotions, 
  Handshake,
  Lightbulb,
  Favorite as Heart,
  Coffee,
  Pets,
  MusicNote,
  SportsBaseball,
  MenuBook,
  Camera,
  LocalFlorist,
  Recycling,
  VolunteerActivism,
  School,
  Close
} from '@mui/icons-material';

interface TeamMember {
  name: string;
  role: string;
  bio: string;
  personality: string;
  hobbies: string[];
  quote: string;
  funFact: string;
  workStyle: string;
}

interface Story {
  title: string;
  content: string;
  author: string;
  role: string;
  icon: React.ReactNode;
  color: string;
}

interface CommunityProject {
  title: string;
  description: string;
  impact: string;
  participants: number;
  category: string;
  icon: React.ReactNode;
}

export default function HumanAbout() {
  const [selectedMember, setSelectedMember] = useState<TeamMember | null>(null);
  const [activeStory, setActiveStory] = useState(0);

  const founderStory = {
    title: "The Spark That Started It All",
    content: `Back in 2018, I was sitting in my small apartment, frustrated with how disconnected the business world felt from real human needs. I had just left a corporate job where I spent more time in meetings about meetings than actually helping people. That evening, while helping my neighbor fix her computer, I realized something profound: technology should bring people together, not drive them apart.

That moment of connection - seeing the relief and gratitude in her eyes when her family photos were recovered - made me understand what I wanted to build. Not just another company, but a place where technology serves humanity, where every line of code, every strategic decision, and every client interaction is infused with genuine care and understanding.

We started with a simple belief: behind every business challenge is a human story waiting to be understood. When we truly listen to those stories and honor the people who live them, extraordinary solutions emerge naturally. This isn't just our business philosophy - it's how we live every day.`,
    author: "Maria Rodriguez",
    role: "Founder & CEO"
  };

  const teamMembers: TeamMember[] = [
    {
      name: "David Thompson",
      role: "Creative Director",
      bio: "David believes that great design comes from understanding people's emotions and creating experiences that feel like a warm hug.",
      personality: "The thoughtful listener who remembers everyone's birthday and always has the perfect movie recommendation.",
      hobbies: ["Photography", "Cooking", "Board Games"],
      quote: "Design isn't about making things pretty - it's about making people feel understood.",
      funFact: "Has a collection of over 200 vintage postcards from around the world.",
      workStyle: "David works best in the early morning with jazz music and always keeps a sketchbook nearby for sudden inspiration."
    },
    {
      name: "Priya Sharma",
      role: "Lead Developer",
      bio: "Priya writes code like poetry, believing that elegant solutions are found when you truly understand the problem from a human perspective.",
      personality: "The problem-solver who approaches challenges with curiosity and infectious optimism.",
      hobbies: ["Rock Climbing", "Meditation", "Volunteering"],
      quote: "Every bug is just a puzzle waiting to teach us something new about how humans think.",
      funFact: "Learned to code by building a website for her grandmother's knitting circle.",
      workStyle: "Priya codes best with plants around her desk and takes walking breaks to think through complex problems."
    },
    {
      name: "James Wilson",
      role: "Client Experience Lead",
      bio: "James has the rare gift of making everyone feel heard and valued, turning business relationships into genuine friendships.",
      personality: "The connector who remembers personal details and celebrates everyone's wins, big and small.",
      hobbies: ["Community Theater", "Gardening", "Coaching Youth Soccer"],
      quote: "Business is just people helping people solve problems together.",
      funFact: "Once drove 300 miles to attend a client's daughter's graduation because he had been talking about it for months.",
      workStyle: "James thrives on face-to-face conversations and always has healthy snacks to share with the team."
    },
    {
      name: "Elena Rodriguez",
      role: "Operations Manager",
      bio: "Elena keeps everything running smoothly while ensuring that our humanity never gets lost in processes and procedures.",
      personality: "The caring organizer who creates systems that work for people, not the other way around.",
      hobbies: ["Painting", "Learning Languages", "Animal Rescue"],
      quote: "Efficiency without empathy is just busy work.",
      funFact: "Speaks five languages and uses them to help team members feel welcome in their native tongue.",
      workStyle: "Elena starts each day by checking in on team members personally and ends by reviewing how processes can be more human-friendly."
    },
    {
      name: "Robert Kim",
      role: "Strategy Advisor",
      bio: "Robert brings decades of experience but never lost the excitement of helping businesses grow while staying true to their values.",
      personality: "The wise mentor who shares stories and insights while always making time for a good laugh.",
      hobbies: ["Fishing", "Woodworking", "Reading History"],
      quote: "The best strategies are the ones that make people's lives better.",
      funFact: "Built the conference room table himself and it's where all our best ideas are born.",
      workStyle: "Robert believes the best meetings happen over coffee and prefers handwritten notes to digital ones."
    },
    {
      name: "Sarah Chen",
      role: "Marketing Storyteller",
      bio: "Sarah finds and tells the human stories behind every project, making sure our clients' voices are heard authentically.",
      personality: "The empathetic storyteller who sees the extraordinary in everyday moments.",
      hobbies: ["Writing", "Hiking", "Local History"],
      quote: "Every company has a story worth telling - we just help them find their voice.",
      funFact: "Keeps a journal of interesting conversations she has with strangers while traveling.",
      workStyle: "Sarah writes best in cozy corners with natural light and always carries a notebook for capturing overheard conversations."
    }
  ];

  const valueStories: Story[] = [
    {
      title: "Authentic Connection",
      content: "When a small family bakery came to us overwhelmed by technology, instead of pitching complex solutions, our team spent an afternoon in their kitchen, learning their routines and understanding their real challenges. The website we built felt like their warm, flour-dusted shop because we took time to truly know them.",
      author: "The whole team",
      role: "Collective experience",
      icon: <Heart />,
      color: "#ef4444"
    },
    {
      title: "Collaborative Growth",
      content: "Every Friday, we have 'Learning Lunch' where team members teach each other new skills. Last month, David taught us photography basics, Priya shared meditation techniques, and James showed us community organizing strategies. We grow together because we believe everyone has something valuable to contribute.",
      author: "Elena Rodriguez",
      role: "Operations Manager",
      icon: <Groups />,
      color: "#3b82f6"
    },
    {
      title: "Joyful Excellence",
      content: "We celebrate everything - project launches with homemade cake, client wins with team high-fives, and even good debugging sessions with a group cheer. When Sarah's article was featured in a magazine, we turned the office into a newsroom theme party. Joy isn't separate from excellence - it's what makes excellence sustainable.",
      author: "James Wilson",
      role: "Client Experience Lead",
      icon: <EmojiEmotions />,
      color: "#10b981"
    },
    {
      title: "Intentional Innovation",
      content: "Before we build anything, we ask: 'Will this make someone's day better?' When developing an app for busy parents, Priya spent time at local playgrounds observing how families really interact with technology. The result was an intuitive design that parents described as 'finally understanding their chaos.'",
      author: "Priya Sharma",
      role: "Lead Developer",
      icon: <Lightbulb />,
      color: "#f59e0b"
    }
  ];

  const dayInLifeScenes = [
    {
      time: "8:30 AM",
      scene: "Morning Ritual",
      description: "David arrives with fresh flowers for the office vase, while Elena makes coffee for anyone who wants it. The day starts with genuine 'how are you?' conversations, not just polite greetings."
    },
    {
      time: "10:15 AM",
      scene: "Collaborative Problem-Solving",
      description: "The team gathers around Robert's handmade conference table, sketching ideas on a whiteboard while sharing snacks. When stuck on a problem, someone inevitably suggests 'Let's walk and talk,' leading to our best breakthroughs."
    },
    {
      time: "12:30 PM",
      scene: "Lunch and Learn",
      description: "Today James is teaching everyone his grandmother's recipe for empathy - asking better questions and really listening to answers. We practice on each other before using it with clients."
    },
    {
      time: "3:00 PM",
      scene: "Client Connection",
      description: "A video call with a client turns into a celebration when they share that our solution helped them hire three new employees. These moments remind us why we do this work."
    },
    {
      time: "5:30 PM",
      scene: "Wrap-up and Wind-down",
      description: "Before leaving, everyone shares one thing they're grateful for from the day. Priya mentions solving a tricky bug, Sarah celebrates a beautiful sentence she wrote, and David is grateful for the perfect lighting in this afternoon's client photos."
    }
  ];

  const communityProjects: CommunityProject[] = [
    {
      title: "Digital Literacy for Seniors",
      description: "Monthly workshops helping seniors connect with family through technology",
      impact: "180 grandparents now video call grandchildren regularly",
      participants: 12,
      category: "Education",
      icon: <School />
    },
    {
      title: "Local Business Tech Support",
      description: "Free website reviews and basic tech support for neighborhood small businesses",
      impact: "25 local businesses improved their online presence",
      participants: 8,
      category: "Economic Development",
      icon: <Handshake />
    },
    {
      title: "Environmental Awareness App",
      description: "Pro-bono development of app tracking community recycling efforts",
      impact: "Community recycling increased by 40% in six months",
      participants: 6,
      category: "Sustainability",
      icon: <Recycling />
    },
    {
      title: "Youth Mentorship Program",
      description: "Team members mentor local high school students interested in technology",
      impact: "15 students gained confidence in tech career paths",
      participants: 15,
      category: "Youth Development",
      icon: <VolunteerActivism />
    }
  ];

  const hobbyIcons = {
    Photography: <Camera />,
    Cooking: <Coffee />,
    "Board Games": <MenuBook />,
    "Rock Climbing": <SportsBaseball />,
    Meditation: <LocalFlorist />,
    Volunteering: <VolunteerActivism />,
    "Community Theater": <MusicNote />,
    Gardening: <LocalFlorist />,
    "Coaching Youth Soccer": <SportsBaseball />,
    Painting: <Camera />,
    "Learning Languages": <MenuBook />,
    "Animal Rescue": <Pets />,
    Fishing: <SportsBaseball />,
    Woodworking: <Coffee />,
    "Reading History": <MenuBook />,
    Writing: <MenuBook />,
    Hiking: <SportsBaseball />,
    "Local History": <MenuBook />
  };

  return (
    <Box sx={{ minHeight: '100vh', bgcolor: '#fefce8' }}>
      {/* Personal Hero Section */}
      <Box sx={{
        background: 'linear-gradient(135deg, #fef3c7 0%, #fde68a 50%, #f59e0b 100%)',
        py: { xs: 6, md: 10 }
      }}>
        <Container maxWidth="lg">
          <Box sx={{ textAlign: 'center', mb: 6 }}>
            <Box sx={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: 2,
              mb: 3,
              p: 2,
              bgcolor: 'rgba(255, 255, 255, 0.3)',
              borderRadius: '50px',
              backdropFilter: 'blur(10px)'
            }}>
              <Heart sx={{ color: '#dc2626', fontSize: '2rem' }} />
              <Typography variant="h6" sx={{ fontWeight: 600, color: '#92400e' }}>
                People First, Always
              </Typography>
            </Box>
            <Typography variant="h1" sx={{
              fontSize: { xs: '2.5rem', md: '4rem' },
              fontWeight: 'bold',
              color: '#92400e',
              mb: 3,
              fontFamily: '"Playfair Display", serif'
            }}>
              We&apos;re Real People Building for Real People
            </Typography>
            <Typography variant="h5" sx={{
              color: '#a16207',
              fontWeight: 300,
              maxWidth: '800px',
              mx: 'auto',
              mb: 4,
              lineHeight: 1.6
            }}>
              Every line of code, every design decision, and every client conversation 
              is infused with genuine care, understanding, and a belief that technology 
              should bring out the best in humanity
            </Typography>
          </Box>

          {/* Founder Story Card */}
          <Card sx={{
            maxWidth: '900px',
            mx: 'auto',
            borderRadius: 4,
            boxShadow: '0 20px 40px rgba(0,0,0,0.1)',
            bgcolor: 'rgba(255, 255, 255, 0.95)',
            backdropFilter: 'blur(10px)'
          }}>
            <CardContent sx={{ p: { xs: 4, md: 6 } }}>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 4 }}>
                <Avatar
                  src="placeholder-image.webp"
                  sx={{ width: 80, height: 80, mr: 3 }}
                />
                <Box>
                  <Typography variant="h4" sx={{ fontWeight: 'bold', color: '#92400e', mb: 1 }}>
                    {founderStory.title}
                  </Typography>
                  <Typography variant="h6" color="text.secondary">
                    A personal note from {founderStory.author}, {founderStory.role}
                  </Typography>
                </Box>
              </Box>
              <Typography variant="body1" sx={{
                fontSize: '1.1rem',
                lineHeight: 1.8,
                color: '#374151',
                '& strong': { color: '#92400e' }
              }}>
                {founderStory.content}
              </Typography>
            </CardContent>
          </Card>
        </Container>
      </Box>

      {/* Day in the Life Section */}
      <Container maxWidth="lg" sx={{ py: 8 }}>
        <Box sx={{ textAlign: 'center', mb: 6 }}>
          <Typography variant="h2" sx={{
            fontWeight: 'bold',
            color: '#92400e',
            mb: 3,
            fontFamily: '"Playfair Display", serif'
          }}>
            A Day in Our Life
          </Typography>
          <Typography variant="h6" color="text.secondary" sx={{ maxWidth: '600px', mx: 'auto' }}>
            Peek behind the scenes at how we work, collaborate, and create meaningful connections
          </Typography>
        </Box>

        <div className="space-y-8">
          {dayInLifeScenes.map((scene, index) => (
            <Box key={index} sx={{ display: 'flex', alignItems: 'flex-start', gap: 4 }}>
              <Box sx={{
                minWidth: '80px',
                textAlign: 'center',
                p: 2,
                bgcolor: '#fef3c7',
                borderRadius: 2,
                border: '2px solid #f59e0b'
              }}>
                <Typography variant="h6" sx={{ fontWeight: 'bold', color: '#92400e' }}>
                  {scene.time}
                </Typography>
              </Box>
              <Card sx={{
                flexGrow: 1,
                transition: 'transform 0.3s ease',
                '&:hover': { transform: 'translateY(-4px)' }
              }}>
                <CardContent sx={{ p: 4 }}>
                  <Typography variant="h5" sx={{ fontWeight: 'bold', mb: 2, color: '#dc2626' }}>
                    {scene.scene}
                  </Typography>
                  <Typography variant="body1" sx={{ lineHeight: 1.6, color: '#374151' }}>
                    {scene.description}
                  </Typography>
                </CardContent>
              </Card>
            </Box>
          ))}
        </div>
      </Container>

      {/* Values Through Stories */}
      <Box sx={{ bgcolor: '#f0fdf4', py: 8 }}>
        <Container maxWidth="lg">
          <Typography variant="h2" sx={{
            textAlign: 'center',
            fontWeight: 'bold',
            color: '#166534',
            mb: 6,
            fontFamily: '"Playfair Display", serif'
          }}>
            Our Values in Action
          </Typography>

          <Box sx={{ mb: 6 }}>
            <Box sx={{ display: 'flex', justifyContent: 'center', flexWrap: 'wrap', gap: 2, mb: 4 }}>
              {valueStories.map((story, index) => (
                <Button
                  key={index}
                  onClick={() => setActiveStory(index)}
                  variant={activeStory === index ? 'contained' : 'outlined'}
                  startIcon={story.icon}
                  sx={{
                    borderRadius: '25px',
                    px: 3,
                    py: 1.5,
                    bgcolor: activeStory === index ? story.color : 'transparent',
                    borderColor: story.color,
                    color: activeStory === index ? 'white' : story.color,
                    '&:hover': {
                      bgcolor: story.color,
                      color: 'white'
                    }
                  }}
                >
                  {story.title}
                </Button>
              ))}
            </Box>

            <Card sx={{
              border: `3px solid ${valueStories[activeStory].color}`,
              borderRadius: 4
            }}>
              <CardContent sx={{ p: 6 }}>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 4 }}>
                  <Box sx={{
                    p: 2,
                    borderRadius: '50%',
                    bgcolor: valueStories[activeStory].color,
                    color: 'white',
                    mr: 3
                  }}>
                    {valueStories[activeStory].icon}
                  </Box>
                  <Box>
                    <Typography variant="h4" sx={{ fontWeight: 'bold', color: valueStories[activeStory].color, mb: 1 }}>
                      {valueStories[activeStory].title}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Shared by {valueStories[activeStory].author}, {valueStories[activeStory].role}
                    </Typography>
                  </Box>
                </Box>
                <Typography variant="body1" sx={{
                  fontSize: '1.1rem',
                  lineHeight: 1.7,
                  color: '#374151'
                }}>
                  {valueStories[activeStory].content}
                </Typography>
              </CardContent>
            </Card>
          </Box>
        </Container>
      </Box>

      {/* Team Members - Human Side */}
      <Container maxWidth="lg" sx={{ py: 8 }}>
        <Typography variant="h2" sx={{
          textAlign: 'center',
          fontWeight: 'bold',
          color: '#dc2626',
          mb: 6,
          fontFamily: '"Playfair Display", serif'
        }}>
          Meet Our Human Family
        </Typography>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {teamMembers.map((member, index) => (
            <Card
              key={index}
              sx={{
                cursor: 'pointer',
                transition: 'all 0.3s ease',
                borderRadius: 3,
                '&:hover': {
                  transform: 'translateY(-8px)',
                  boxShadow: '0 20px 40px rgba(0,0,0,0.1)'
                }
              }}
              onClick={() => setSelectedMember(member)}
            >
              <CardContent sx={{ p: 4, textAlign: 'center' }}>
                <Avatar
                  src="placeholder-image.webp"
                  sx={{
                    width: 100,
                    height: 100,
                    mx: 'auto',
                    mb: 3,
                    border: '4px solid #fef3c7'
                  }}
                />
                <Typography variant="h5" sx={{ fontWeight: 'bold', mb: 1, color: '#92400e' }}>
                  {member.name}
                </Typography>
                <Typography variant="body1" color="primary" sx={{ mb: 2 }}>
                  {member.role}
                </Typography>
                <Typography variant="body2" color="text.secondary" sx={{ mb: 3, lineHeight: 1.5 }}>
                  {member.personality}
                </Typography>
                <Box sx={{ display: 'flex', justifyContent: 'center', flexWrap: 'wrap', gap: 1 }}>
                  {member.hobbies.slice(0, 3).map((hobby, idx) => (
                    <Chip
                      key={idx}
                      label={hobby}
                      size="small"
                      icon={hobbyIcons[hobby as keyof typeof hobbyIcons]}
                      sx={{ bgcolor: '#fef3c7', color: '#92400e' }}
                    />
                  ))}
                </Box>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Selected Member Details */}
        {selectedMember && (
          <Card sx={{
            mt: 4,
            border: '3px solid #f59e0b',
            borderRadius: 4,
            animation: 'slideIn 0.3s ease'
          }}>
            <CardContent sx={{ p: 6 }}>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 4 }}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 4 }}>
                  <Avatar
                    src="placeholder-image.webp"
                    sx={{ width: 100, height: 100 }}
                  />
                  <Box>
                    <Typography variant="h3" sx={{ fontWeight: 'bold', color: '#92400e', mb: 1 }}>
                      {selectedMember.name}
                    </Typography>
                    <Typography variant="h6" color="primary" sx={{ mb: 2 }}>
                      {selectedMember.role}
                    </Typography>
                    <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                      {selectedMember.hobbies.map((hobby, idx) => (
                        <Chip
                          key={idx}
                          label={hobby}
                          size="small"
                          icon={hobbyIcons[hobby as keyof typeof hobbyIcons]}
                          sx={{ bgcolor: '#fef3c7', color: '#92400e' }}
                        />
                      ))}
                    </Box>
                  </Box>
                </Box>
                <IconButton
                  onClick={() => setSelectedMember(null)}
                  sx={{ color: '#92400e' }}
                >
                  <Close />
                </IconButton>
              </Box>

              <Typography variant="body1" sx={{ mb: 4, lineHeight: 1.6, fontSize: '1.1rem' }}>
                {selectedMember.bio}
              </Typography>

              <Box sx={{ mb: 4, p: 3, bgcolor: '#fef3c7', borderRadius: 2, borderLeft: '4px solid #f59e0b' }}>
                <Typography variant="body2" sx={{ fontStyle: 'italic', color: '#92400e', fontSize: '1rem' }}>
                  &quot;{selectedMember.quote}&quot;
                </Typography>
              </Box>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Box>
                  <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 2, color: '#dc2626' }}>
                    Fun Fact
                  </Typography>
                  <Typography variant="body2" sx={{ lineHeight: 1.6 }}>
                    {selectedMember.funFact}
                  </Typography>
                </Box>
                <Box>
                  <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 2, color: '#dc2626' }}>
                    Work Style
                  </Typography>
                  <Typography variant="body2" sx={{ lineHeight: 1.6 }}>
                    {selectedMember.workStyle}
                  </Typography>
                </Box>
              </div>
            </CardContent>
          </Card>
        )}
      </Container>

      {/* Community Impact */}
      <Box sx={{ bgcolor: '#eff6ff', py: 8 }}>
        <Container maxWidth="lg">
          <Typography variant="h2" sx={{
            textAlign: 'center',
            fontWeight: 'bold',
            color: '#1e40af',
            mb: 3,
            fontFamily: '"Playfair Display", serif'
          }}>
            Our Community Heart
          </Typography>
          <Typography variant="h6" sx={{ textAlign: 'center', color: '#475569', mb: 6, maxWidth: '800px', mx: 'auto' }}>
            We believe success is measured not just in profit, but in the positive impact we create 
            in our community and the relationships we build along the way
          </Typography>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {communityProjects.map((project, index) => (
              <Card key={index} sx={{
                transition: 'transform 0.3s ease',
                '&:hover': { transform: 'translateY(-8px)' }
              }}>
                <CardContent sx={{ p: 4 }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
                    <Box sx={{
                      p: 2,
                      borderRadius: '50%',
                      bgcolor: '#dbeafe',
                      color: '#1e40af',
                      mr: 3
                    }}>
                      {project.icon}
                    </Box>
                    <Box>
                      <Typography variant="h6" sx={{ fontWeight: 'bold', color: '#1e40af', mb: 1 }}>
                        {project.title}
                      </Typography>
                      <Chip
                        label={project.category}
                        size="small"
                        sx={{ bgcolor: '#1e40af', color: 'white' }}
                      />
                    </Box>
                  </Box>
                  <Typography variant="body2" sx={{ mb: 3, lineHeight: 1.6 }}>
                    {project.description}
                  </Typography>
                  <Divider sx={{ my: 2 }} />
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <Box>
                      <Typography variant="body2" sx={{ fontWeight: 'bold', color: '#059669' }}>
                        Impact: {project.impact}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        {project.participants} team members involved
                      </Typography>
                    </Box>
                    <VolunteerActivism sx={{ color: '#059669', fontSize: '2rem' }} />
                  </Box>
                </CardContent>
              </Card>
            ))}
          </div>

          <Box sx={{ textAlign: 'center', mt: 6 }}>
            <Card sx={{
              display: 'inline-block',
              p: 4,
              bgcolor: '#1e40af',
              color: 'white',
              borderRadius: 3
            }}>
              <Typography variant="h4" sx={{ fontWeight: 'bold', mb: 1 }}>
                1,200+ Hours
              </Typography>
              <Typography variant="body1">
                Volunteered in our community this year
              </Typography>
            </Card>
          </Box>
        </Container>
      </Box>

      <style jsx>{`
        @keyframes slideIn {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </Box>
  );
}