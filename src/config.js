module.exports = {
  // Primary email for main contact button
  email: 'morurisammy5@gmail.com',

  // Secondary email for alternative contact
  secondaryEmail: 'dev.sammy.n.m@gmail.com',

  socialMedia: [
    {
      name: 'GitHub',
      url: 'https://github.com/TheOneNyangweso',
    },
    {
      name: 'Linkedin',
      url: 'https://www.linkedin.com/in/sammymoruri-483364247',
    },
    {
      name: 'X', // Changed from Twitter to X
      url: 'https://x.com/dev_s_n_m',
    },
    {
      name: 'EmailPrimary',
      url: 'mailto:morurisammy5@gmail.com',
    },
    {
      name: 'EmailSecondary',
      url: 'mailto:dev.sammy.n.m@gmail.com',
    },
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
      name: 'Projects',
      url: '/#projects',
    },
    {
      name: 'Contact',
      url: '/#contact',
    },
  ],

  colors: {
    green: '#64ffda',
    navy: '#0a192f',
    darkNavy: '#020c1b',
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

  // Custom config for MLOps animations (we'll use this later)
  animeConfig: {
    // Stagger timing for technical skills
    skillsStagger: 100,
    // Smooth easing for professional feel
    easing: 'easeOutQuart',
    // Standard duration for most animations
    duration: 600,
  },
};
