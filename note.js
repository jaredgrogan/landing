// script.js

document.addEventListener('DOMContentLoaded', function() {
  const newNoteButton = document.querySelector('.new-note-button');
  const newTaskButton = document.querySelector('.new-task-button');
  const newProjectButton = document.querySelector('.new-project-button');
  const saveNoteButton = document.getElementById('save-note-button');
  const chatInput = document.getElementById('chat-input');
  const sendMessageButton = document.getElementById('send-message-button');
  const noteTitle = document.getElementById('note-title');
  const noteContent = document.getElementById('note-content');
  const tagInput = document.getElementById('tag-input');
  const projectFolderList = document.querySelector('.project-folder-list');
  const notesList = document.querySelector('.notes-list');
  const taskList = document.querySelector('.task-list');
  const eventList = document.querySelector('.event-list');
  const chatHistory = document.querySelector('.chat-history');
  const expandNoteButton = document.getElementById('expand-note-button');
  const viewCalendarButton = document.getElementById('view-calendar-button');

  let notes = [];
  let tasks = [];
  let projects = [];
  let events = [];
  let messages = [];

  newNoteButton.addEventListener('click', function() {
    const newNote = {
      id: Date.now(),
      title: 'New Note',
      content: '',
      tags: []
    };
    notes.push(newNote);
    renderNotes();
  });

  newTaskButton.addEventListener('click', function() {
    const newTask = {
      id: Date.now(),
      content: 'New Task',
      completed: false
    };
    tasks.push(newTask);
    renderTasks();
  });

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

  saveNoteButton.addEventListener('click', function() {
    const currentNote = notes.find(note => note.id === parseInt(noteTitle.dataset.noteId));
    if (currentNote) {
      currentNote.title = noteTitle.value;
      currentNote.content = noteContent.value;
      currentNote.tags = tagInput.value.split(',').map(tag => tag.trim());
      renderNotes();
      alert('Note saved successfully!');
    }
  });

  sendMessageButton.addEventListener('click', function() {
    const message = chatInput.value.trim();
    if (message !== '') {
      messages.push({ type: 'user', content: message });
      renderMessages();
      chatInput.value = '';

      setTimeout(function() {
        const reply = { type: 'ai', content: `AI response to: ${message}` };
        messages.push(reply);
        renderMessages();
      }, 1000);
    }
  });

  expandNoteButton.addEventListener('click', function() {
    const noteArea = document.querySelector('.note-area');
    noteArea.classList.toggle('expanded');
  });

  viewCalendarButton.addEventListener('click', function() {
    alert('Displaying full calendar...');
  });

  function renderProjects() {
    projectFolderList.innerHTML = '';
    projects.forEach(function(project) {
      const projectElement = document.createElement('div');
      projectElement.textContent = project.name;
      projectFolderList.appendChild(projectElement);
    });
  }

  function renderNotes() {
    notesList.innerHTML = '';
    notes.forEach(function(note) {
      const noteElement = document.createElement('div');
      noteElement.textContent = note.title;
      noteElement.addEventListener('click', function() {
        noteTitle.value = note.title;
        noteTitle.dataset.noteId = note.id;
        noteContent.value = note.content;
        tagInput.value = note.tags.join(', ');
      });
      notesList.appendChild(noteElement);
    });
  }

  function renderTasks() {
    taskList.innerHTML = '';
    tasks.forEach(function(task) {
      const taskElement = document.createElement('div');
      taskElement.textContent = task.content;
      taskList.appendChild(taskElement);
    });
  }

  function renderEvents() {
    eventList.innerHTML = '';
    events.forEach(function(event) {
      const eventElement = document.createElement('div');
      eventElement.textContent = event.title;
      eventList.appendChild(eventElement);
    });
  }

  function renderMessages() {
    chatHistory.innerHTML = '';
    messages.forEach(function(message) {
      const messageElement = document.createElement('div');
      messageElement.textContent = message.content;
      messageElement.classList.add(message.type);
      chatHistory.appendChild(messageElement);
    });
    chatHistory.scrollTop = chatHistory.scrollHeight;
  }

  renderProjects();
  renderNotes();
  renderTasks();
  renderEvents();
  renderMessages();
});
