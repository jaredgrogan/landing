// Toggle theme
const themeToggle = document.getElementById('theme-toggle');
const body = document.body;

themeToggle.addEventListener('change', function() {
  body.classList.toggle('dark-theme');
});

// Show/hide loading indicator
function showLoading() {
  document.getElementById('loading').style.display = 'block';
}

function hideLoading() {
  document.getElementById('loading').style.display = 'none';
}

// YouTube video control
function showOneScreen() {
  const youtubeContainer = document.getElementById('youtube-container');
  youtubeContainer.innerHTML = `
    <div class="youtube-embed">
      <iframe src="https://www.youtube.com/embed/VIDEO_ID_1" allowfullscreen></iframe>
      <button class="fullscreen-btn" onclick="openFullscreen('VIDEO_ID_1')">Fullscreen</button>
    </div>
  `;
}

function showTwoScreens() {
  const youtubeContainer = document.getElementById('youtube-container');
  youtubeContainer.innerHTML = `
    <div class="youtube-embed">
      <iframe src="https://www.youtube.com/embed/VIDEO_ID_1" allowfullscreen></iframe>
      <button class="fullscreen-btn" onclick="openFullscreen('VIDEO_ID_1')">Fullscreen</button>
    </div>
    <div class="youtube-embed">
      <iframe src="https://www.youtube.com/embed/VIDEO_ID_2" allowfullscreen></iframe>
      <button class="fullscreen-btn" onclick="openFullscreen('VIDEO_ID_2')">Fullscreen</button>
    </div>
  `;
}

function openFullscreen(videoId) {
  const iframe = document.querySelector(`iframe[src*="${videoId}"]`);
  if (iframe.requestFullscreen) {
    iframe.requestFullscreen();
  } else if (iframe.mozRequestFullScreen) {
    iframe.mozRequestFullScreen();
  } else if (iframe.webkitRequestFullscreen) {
    iframe.webkitRequestFullscreen();
  } else if (iframe.msRequestFullscreen) {
    iframe.msRequestFullscreen();
  }
}

// Search functionality
const searchInput = document.getElementById('search-input');
const searchButton = document.getElementById('search-button');

searchButton.addEventListener('click', function() {
  const query = searchInput.value.trim();
  if (query !== '') {
    showLoading();
    // Simulate search request
    setTimeout(function() {
      hideLoading();
      alert(`Search results for: ${query}`);
    }, 1000);
  }
});

searchInput.addEventListener('keyup', function(event) {
  if (event.key === 'Enter') {
    searchButton.click();
  }
});

// Notes functionality
const noteTextarea = document.getElementById('note-textarea');
const addNoteButton = document.getElementById('add-note-button');

addNoteButton.addEventListener('click', function() {
  const note = noteTextarea.value.trim();
  if (note !== '') {
    // Simulate saving note
    alert(`Note saved: ${note}`);
    noteTextarea.value = '';
  }
});

// Lazy loading for YouTube videos
document.addEventListener('DOMContentLoaded', function() {
  const lazyVideos = [].slice.call(document.querySelectorAll('iframe.lazy'));

  if ('IntersectionObserver' in window) {
    const lazyVideoObserver = new IntersectionObserver(function(entries, observer) {
      entries.forEach(function(video) {
        if (video.isIntersecting) {
          const src = video.dataset.src;
          video.src = src;
          video.classList.remove('lazy');
          lazyVideoObserver.unobserve(video.target);
        }
      });
    });

    lazyVideos.forEach(function(lazyVideo) {
      lazyVideoObserver.observe(lazyVideo);
    });
  }
});

// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function(e) {
    e.preventDefault();

    document.querySelector(this.getAttribute('href')).scrollIntoView({
      behavior: 'smooth'
    });
  });
});

// Keyboard shortcuts
document.addEventListener('keydown', function(event) {
  if (event.ctrlKey && event.key === 'k') {
    event.preventDefault();
    searchInput.focus();
  }

  if (event.ctrlKey && event.key === 'n') {
    event.preventDefault();
    noteTextarea.focus();
  }
});

// Accessibility improvements
document.querySelectorAll('button, a').forEach(function(element) {
  element.addEventListener('keyup', function(event) {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      element.click();
    }
  });
});

// PWA functionality
if ('serviceWorker' in navigator) {
  window.addEventListener('load', function() {
    navigator.serviceWorker.register('/service-worker.js')
      .then(function(registration) {
        console.log('Service Worker registered with scope:', registration.scope);
      })
      .catch(function(error) {
        console.log('Service Worker registration failed:', error);
      });
  });
}

// Offline functionality
window.addEventListener('offline', function() {
  alert('You are offline. Some features may not work properly.');
});

window.addEventListener('online', function() {
  alert('You are back online.');
});

// Analytics
function trackEvent(category, action, label) {
  // Implement your analytics tracking code here
  console.log(`Analytics event: ${category} - ${action} - ${label}`);
}

// Track button clicks
document.querySelectorAll('button').forEach(function(button) {
  button.addEventListener('click', function() {
    const buttonText = this.textContent.trim();
    trackEvent('Button', 'Click', buttonText);
  });
});
