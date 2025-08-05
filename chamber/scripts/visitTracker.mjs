// visitTracker.js

export function showVisitMessage() {
  const wrapper = document.getElementById('visitMessageWrapper');
  const visitMessageEl = document.getElementById('visitMessage');

  if (!wrapper || !visitMessageEl) return;

  const lastVisit = localStorage.getItem('lastVisit');
  const now = Date.now();

  let message = '';

  if (!lastVisit) {
    message = 'Welcome! Let us know if you have any questions.';
  } else {
    const daysSince = Math.floor((now - Number(lastVisit)) / (1000 * 60 * 60 * 24));
    if (daysSince === 0) {
      message = 'Back so soon! Awesome!';
    } else if (daysSince === 1) {
      message = 'You last visited 1 day ago.';
    } else {
      message = `You last visited ${daysSince} days ago.`;
    }
  }

  visitMessageEl.textContent = message;

  // Reset fade-out and show the wrapper
  wrapper.classList.remove('fade-out');

  // Fade out after 3 seconds
  setTimeout(() => {
    wrapper.classList.add('fade-out');
  }, 3000);

  // Update the last visit timestamp
  localStorage.setItem('lastVisit', now);
}


export function clearVisitData() {
  localStorage.removeItem('lastVisit');
}

