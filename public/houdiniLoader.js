/* ========================================
   HOUDINI PAINT WORKLET LOADER
   Loads particle and noise effects
   ======================================== */

// Check for Houdini Paint API support
if (typeof CSS !== 'undefined' && 'paintWorklet' in CSS) {

  // Load ring particles worklet
  try {
    CSS.paintWorklet.addModule(
      'https://unpkg.com/css-houdini-ringparticles/dist/ringparticles.js'
    );
    console.log('✨ Ring particles worklet loaded');
  } catch (error) {
    console.warn('Failed to load ring particles worklet:', error);
  }

  // Load confetti/noise worklet
  try {
    CSS.paintWorklet.addModule(
      'https://unpkg.com/@georgedoescode/houdini-paint-worklets@0.0.1/dist/extra-confetti/extra-confetti.js'
    );
    console.log('✨ Noise/confetti worklet loaded');
  } catch (error) {
    console.warn('Failed to load confetti worklet:', error);
  }

} else {
  console.warn('🎨 CSS Houdini Paint API not supported in this browser');
}

// Mouse tracker for interactive ring effect
export function initializeParticleTracking(elementId) {
  const element = document.getElementById(elementId);
  if (!element) return;

  let isInteractive = false;

  element.addEventListener('pointermove', (e) => {
    if (!isInteractive) {
      element.classList.add('interactive');
      isInteractive = true;
    }

    const x = (e.clientX / window.innerWidth) * 100;
    const y = (e.clientY / window.innerHeight) * 100;

    element.style.setProperty('--ring-x', x);
    element.style.setProperty('--ring-y', y);
    element.style.setProperty('--ring-interactive', '1');
  });

  element.addEventListener('pointerleave', () => {
    element.classList.remove('interactive');
    isInteractive = false;
    element.style.setProperty('--ring-x', '50');
    element.style.setProperty('--ring-y', '50');
    element.style.setProperty('--ring-interactive', '0');
  });
}

// Auto-init on load
if (typeof window !== 'undefined') {
  window.addEventListener('DOMContentLoaded', () => {
    initializeParticleTracking('welcome');
  });
}
