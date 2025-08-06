module.exports = {
  email: 'morurisammy5@gmail.com',

  socialMedia: [
    {
      name: 'GitHub',
      url: 'https://github.com/sammymoruri', // Update with your actual GitHub username
    },
    {
      name: 'Linkedin',
      url: 'https://www.linkedin.com/in/sammymoruri-483364247',
    },
    {
      name: 'Twitter',
      url: 'https://twitter.com/sammymoruri', // Update if you have Twitter
    },
    // Add more platforms if needed:
    // {
    //   name: 'Instagram',
    //   url: 'https://www.instagram.com/sammymoruri',
    // },
  ],

  navLinks: [
    {
      name: 'About',
      url: '/#about',
    },
    {
      name: 'Experience',
      url: '/#jobs',
    },
    {
      name: 'Projects', // Changed from 'Work' to 'Projects'
      url: '/#projects',
    },
    {
      name: 'Contact',
      url: '/#contact',
    },
  ],

  colors: {
    green: '#64ffda', // Keep Brittany's signature cyan - works great for tech
    navy: '#0a192f', // Perfect professional navy
    darkNavy: '#020c1b', // Deep dark navy for backgrounds
  },

  // Enhanced animation config - we'll use this for our Anime.js integration
  srConfig: (delay = 200, viewFactor = 0.25) => ({
    origin: 'bottom',
    distance: '20px',
    duration: 500,
    delay,
    rotate: { x: 0, y: 0, z: 0 },
    opacity: 0,
    scale: 1,
    easing: 'cubic-bezier(0.645, 0.045, 0.355, 1)', // Smooth professional easing
    mobile: true,
    reset: false,
    useDelay: 'always',
    viewFactor,
    viewOffset: { top: 0, right: 0, bottom: 0, left: 0 },
  }),

  // Custom config for your MLOps animations (we'll use this later)
  animeConfig: {
    // Stagger timing for technical skills
    skillsStagger: 100,
    // Smooth easing for professional feel
    easing: 'easeOutQuart',
    // Standard duration for most animations
    duration: 600,
  },
};
