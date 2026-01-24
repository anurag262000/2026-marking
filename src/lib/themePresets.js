// Theme preset configurations for the animated footer
export const themePresets = {
  noir: {
    name: 'Film Noir',
    sky: {
      top: '#0a0a0a',
      middle: '#1a1410',
      bottom: '#2a2416',
    },
    sun: {
      color: '#f0d856',
      glow: '#ffd700',
      position: 0.35,
      size: 80,
    },
    atmosphere: {
      fog: 'rgba(240, 216, 86, 0.1)',
      particles: '#f0d856',
      particleCount: 30,
    },
    grain: 0.15,
    vignette: 0.6,
  },

  retro: {
    name: 'Retro Sunset',
    sky: {
      top: '#1a0a3e',
      middle: '#6b2d5c',
      bottom: '#ff6b35',
    },
    sun: {
      color: '#ff9a56',
      glow: '#ff6b35',
      position: 0.4,
      size: 100,
    },
    atmosphere: {
      fog: 'rgba(255, 155, 86, 0.15)',
      particles: '#ffd89b',
      particleCount: 40,
    },
    grain: 0.08,
    vignette: 0.4,
  },

  synthwave: {
    name: 'Synthwave',
    sky: {
      top: '#0d0221',
      middle: '#200444',
      bottom: '#01cdfe',
    },
    sun: {
      color: '#ff71ce',
      glow: '#b967ff',
      position: 0.38,
      size: 90,
    },
    atmosphere: {
      fog: 'rgba(255, 113, 206, 0.12)',
      particles: '#ff71ce',
      particleCount: 50,
    },
    grain: 0.05,
    vignette: 0.5,
  },

  dream: {
    name: 'Dream State',
    sky: {
      top: '#fef5e7',
      middle: '#fad7a0',
      bottom: '#f8b4d9',
    },
    sun: {
      color: '#fff9e6',
      glow: '#fff4d6',
      position: 0.42,
      size: 110,
    },
    atmosphere: {
      fog: 'rgba(255, 255, 230, 0.2)',
      particles: '#ffffff',
      particleCount: 60,
    },
    grain: 0.03,
    vignette: 0.2,
  },
};

// Get array of theme names for random selection
export const themeNames = Object.keys(themePresets);

// Helper to get random theme different from current
export const getRandomTheme = (currentTheme) => {
  const availableThemes = themeNames.filter(name => name !== currentTheme);
  return availableThemes[Math.floor(Math.random() * availableThemes.length)];
};
