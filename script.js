// Timer functionality
let timeLeft = localStorage.getItem('timeLeft') ? parseInt(localStorage.getItem('timeLeft')) : 60 * 60; // Set the timer duration to 60 minutes in seconds
const timerElement = document.getElementById('timer');

// Function to update the timer
const updateTimer = () => {
    if (timeLeft <= 0) {
        clearInterval(countdown);
        alert("Time's up!"); // Notify when time is up
    } else {
        const minutes = Math.floor(timeLeft / 60);
        const seconds = timeLeft % 60;
        timerElement.textContent = `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
        timeLeft--;
        localStorage.setItem('timeLeft', timeLeft); // Save remaining time in local storage
    }
};

// Start the countdown
const countdown = setInterval(updateTimer, 1000);

// Preventing the default form submission behavior
document.getElementById('uploadForm').addEventListener('submit', function (event) {
    event.preventDefault(); // Prevent form from submitting normally

    // Collect form data
    const formData = new FormData();
    formData.append('name', document.getElementById('name').value);
    formData.append('message', document.getElementById('message').value);
    
    const mediaInput = document.getElementById('media');
    if (mediaInput.files.length > 0) {
        formData.append('media', mediaInput.files[0]);
    }

    // Log the data to check
    console.log([...formData.entries()]);

    // Example AJAX request to send the form data to the server
    fetch('https://backend-bingo.vercel.app/submit-form', {
    method: 'POST',
    body: formData,
    mode: 'no-cors' 
})
    .then(response => response.json())
    .then(data => {
        if (data.error) {
            alert('Error submitting the form: ' + data.error);
        } else {
            alert('Form submitted successfully!');
        }
    })
    .catch(error => {
        console.error('Error:', error);
        alert('An error occurred while submitting the form.');
    });
});

// Clear local storage when the page is closed or reloaded
window.addEventListener('beforeunload', function () {
    localStorage.removeItem('timeLeft');
});

// Add event listeners to each cell for task management
let previouslyClickedCell = null;

document.querySelectorAll('.cell').forEach((cell) => {
    cell.addEventListener('click', function () {
        if (previouslyClickedCell && previouslyClickedCell !== this) {
            previouslyClickedCell.classList.remove('revealed');
            const prevTaskText = previouslyClickedCell.querySelector('.task-text');
            if (prevTaskText) {
                prevTaskText.remove();
            }
        }

        this.classList.toggle('revealed');
        previouslyClickedCell = this.classList.contains('revealed') ? this : null;

        const task = this.getAttribute('data-task');
        let taskText = this.querySelector('.task-text');
        if (!taskText) {
            taskText = document.createElement('div');
            taskText.classList.add('task-text');
            taskText.textContent = task;
            this.appendChild(taskText);
        } else {
            taskText.style.display = taskText.style.display === 'none' ? 'block' : 'none';
        }
    });
});




