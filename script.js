


document.getElementById('uploadForm').addEventListener('submit', function (event) {
    event.preventDefault(); // Prevent form from submitting normally

    // Collect form data
    const formData = new FormData();
    formData.append('name', document.getElementById('name').value);
    formData.append('message', document.getElementById('message').value);
    
    const photoInput = document.getElementById('photo');
    if (photoInput.files.length > 0) {
        formData.append('photo', photoInput.files[0]);
    }

    // Log the data to check
    console.log([...formData.entries()]);

    // Example AJAX request to send the form data to the server
    fetch('https://bingo-game-production.up.railway.app/submit-form', {
      method: 'POST',
      body: formData
  })
  
    .then(response => response.json())
    .then(data => {
        alert('Error submitting the form.');
    })
    .catch(error => {
        alert('Form submitted successfully!');

        
        console.error('Error:', error);
    });
});



// Variable to store the previously clicked cell
let previouslyClickedCell = null;

// Add event listeners to each cell
document.querySelectorAll('.cell').forEach((cell) => {
  cell.addEventListener('click', function () {
    // If there is a previously clicked cell, hide its task text
    if (previouslyClickedCell && previouslyClickedCell !== this) {
      // Remove 'revealed' class from the previously clicked cell
      previouslyClickedCell.classList.remove('revealed');

      // Remove the task text of the previously clicked cell
      const prevTaskText = previouslyClickedCell.querySelector('.task-text');
      if (prevTaskText) {
        prevTaskText.remove(); // Remove the task text element instead of just hiding it
      }
    }

    // Toggle the 'revealed' class to show the task for the current cell
    this.classList.toggle('revealed');

    // Update the previously clicked cell
    previouslyClickedCell = this.classList.contains('revealed') ? this : null;

    // Get the task description from the data attribute
    const task = this.getAttribute('data-task');

    // Check if the task text already exists; if not, create it
    let taskText = this.querySelector('.task-text');
    if (!taskText) {
      taskText = document.createElement('div');
      taskText.classList.add('task-text');
      taskText.textContent = task;
      this.appendChild(taskText);
    } else {
      // Toggle visibility of the task text
      taskText.style.display = taskText.style.display === 'none' ? 'block' : 'none';
    }
  });
});

let timeLeft = 60 * 60; // Set the timer duration to 50 minutes in seconds
const timerElement = document.getElementById('timer'); // Ensure you have an element with this ID in your HTML

const countdown = setInterval(() => {
    if (timeLeft <= 0) {
        clearInterval(countdown);
        alert("Time's up!"); // Notify when time is up
    } else {
        const minutes = Math.floor(timeLeft / 60); // Calculate remaining minutes
        const seconds = timeLeft % 60; // Calculate remaining seconds
        timerElement.textContent = `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`; // Format time
        timeLeft--;
    }
}, 1000);

