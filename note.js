// UniversitasAI JavaScript

document.addEventListener('DOMContentLoaded', function() {
  // Get DOM elements
  const newNoteButton = document.querySelector('.new-note-button');
  const newTaskButton = document.querySelector('.new-task-button');
  const newProjectButton = document.querySelector('.new-project-button');
  const notesContainer = document.querySelector('.notes-container');
  const tasksContainer = document.querySelector('.tasks-container');
  const projectsContainer = document.querySelector('.projects-container');

  // Sample data
  let notes = [];
  let tasks = [];
  let projects = [];

  // Handle new note creation
  newNoteButton.addEventListener('click', function() {
    const newNote = {
      id: Date.now(),
      title: 'New Note',
      content: ''
    };
    notes.push(newNote);
    renderNotes();
  });

  // Handle new task creation
  newTaskButton.addEventListener('click', function() {
    const newTask = {
      id: Date.now(),
      content: 'New Task',
      completed: false
    };
    tasks.push(newTask);
    renderTasks();
  });

  // Handle new project creation
  newProjectButton.addEventListener('click', function() {
    const newProject = {
      id: Date.now(),
      name: 'New Project',
      tasks: [],
      notes: []
    };
    projects.push(newProject);
    renderProjects();
  });

  // Render notes
  function renderNotes() {
    notesContainer.innerHTML = '';
    notes.forEach(function(note) {
      const noteElement = document.createElement('div');
      noteElement.textContent = note.title;
      notesContainer.appendChild(noteElement);
    });
  }

  // Render tasks
  function renderTasks() {
    tasksContainer.innerHTML = '';
    tasks.forEach(function(task) {
      const taskElement = document.createElement('div');
      taskElement.textContent = task.content;
      tasksContainer.appendChild(taskElement);
    });
  }

  // Render projects
  function renderProjects() {
    projectsContainer.innerHTML = '';
    projects.forEach(function(project) {
      const projectElement = document.createElement('div');
      projectElement.textContent = project.name;
      projectsContainer.appendChild(projectElement);
    });
  }

  // Initial render
  renderNotes();
  renderTasks();
  renderProjects();
});
