document.addEventListener('DOMContentLoaded', () => {
  loadInteractiveTutorials();
  loadQuizBuilder();
  loadPerformanceAnalytics();
});

// Load Interactive Tutorials
function loadInteractiveTutorials() {
  const tutorials = [
    { title: "Quiz: AI Basics", content: "What is Machine Learning?" },
    { title: "Practice: AI Algorithms", content: "Implement a simple neural network." }
  ];
  
  const container = document.getElementById('interactive-tutorials');
  
  tutorials.forEach(tutorial => {
    const tutorialElement = document.createElement('div');
    tutorialElement.className = 'tutorial-widget';
    tutorialElement.innerHTML = `
      <h3>${tutorial.title}</h3>
      <p>${tutorial.content}</p>
      <button class="start-btn">Start Tutorial</button>
    `;
    container.appendChild(tutorialElement);
  });
  
  document.querySelectorAll('.start-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      alert('Starting tutorial...');
    });
  });
}

// Handle Personalized Learning Paths
document.getElementById('path-form').addEventListener('submit', function(event) {
  event.preventDefault();
  const selectedCourses = Array.from(document.getElementById('course-select').selectedOptions)
                              .map(option => option.value);
  console.log('Selected Courses:', selectedCourses);
});

// Load Quiz Builder
function loadQuizBuilder() {
  document.getElementById('quiz-builder').innerHTML = `
    <h3>Create a Quiz</h3>
    <form id="quiz-form">
      <label for="question">Question:</label>
      <input type="text" id="question" name="question" required>
      <label for="answers">Answers:</label>
      <input type="text" id="answers" name="answers" placeholder="Comma-separated" required>
      <label for="correct-answer">Correct Answer:</label>
      <input type="text" id="correct-answer" name="correct-answer" required>
      <button type="submit">Create Quiz</button>
    </form>
  `;
  
  document.getElementById('quiz-form').addEventListener('submit', function(event) {
    event.preventDefault();
    const question = document.getElementById('question').value;
    const answers = document.getElementById('answers').value.split(',');
    const correctAnswer = document.getElementById('correct-answer').value;
    console.log('Quiz Created:', { question, answers, correctAnswer });
  });
}

// Load Performance Analytics
function loadPerformanceAnalytics() {
  var ctx = document.getElementById('performance-chart').getContext('2d');
  new Chart(ctx, {
    type: 'bar',
    data: {
      labels: ['Quiz 1', 'Quiz 2', 'Quiz 3'],
      datasets: [{
        label: 'Scores',
        data: [85, 90, 80],
        backgroundColor: 'rgba(54, 162, 235, 0.2)',
        borderColor: 'rgba(54, 162, 235, 1)',
        borderWidth: 1
      }]
    },
    options: {
      scales: {
        y: {
          beginAtZero: true
        }
      }
    }
  });
}

// Language Switcher
document.getElementById('language-switcher').addEventListener('change', function() {
  i18next.changeLanguage(this.value, (err, t) => {
    if (err) return console.error(err);
    document.querySelectorAll('[data-i18n]').forEach(el => {
      el.textContent = i18next.t(el.getAttribute('data-i18n'));
    });
  });
});
