function updateDashboard() {
    const now = new Date();
    
    // 1. Get Time Components
    let hours = now.getHours();
    const minutes = String(now.getMinutes()).padStart(2, '0');
    const seconds = String(now.getSeconds()).padStart(2, '0');
    const ampm = hours >= 12 ? 'PM' : 'AM';
    
    // Convert to 12-hour format
    const displayHours = hours % 12 || 12;
    const timeString = `${displayHours}:${minutes}`;

    // 2. Update Clock Elements in HTML
    document.getElementById('time').textContent = timeString;
    document.getElementById('seconds').textContent = `:${seconds}`;
    document.getElementById('ampm').textContent = ampm;

    // 3. Logic for Greetings and Themes
    const body = document.body;
    const greetingElement = document.getElementById('greeting');
    let message = "";
    let themeClass = "";

    if (hours >= 5 && hours < 12) {
        message = "Good Morning, David! ☕";
        themeClass = "morning";
    } else if (hours >= 12 && hours < 17) {
        message = "Focus Mode: Afternoon 🚀";
        themeClass = "afternoon";
    } else if (hours >= 17 && hours < 21) {
        message = "Evening Vibes 🎨";
        themeClass = "evening";
    } else {
        message = "Late Night Chill 💻";
        themeClass = "night";
    }

    // 4. Apply the Dynamic Changes
    if (greetingElement.innerText !== message) {
        greetingElement.innerText = message;
    }
    
    // Only update class if it changed to prevent flickering
    if (body.className !== themeClass) {
        body.className = themeClass;
    }
}

// Update the dashboard every second (for the seconds counter)
setInterval(updateDashboard, 1000);

// Run immediately on page load
updateDashboard();
// Start it up
updateDashboard();
setInterval(updateDashboard, 1000);
// Grab the elements
const todoInput = document.getElementById('todo-input');
const addBtn = document.getElementById('add-btn');
const todoList = document.getElementById('todo-list');

// Function to add a task
function addTask() {
    const taskValue = todoInput.value.trim();

    if (taskValue === "") {
        alert("Enter a task first!");
        return;
    }

    // Create the task element
    const li = document.createElement('li');
    li.classList.add('todo-item');
    li.innerHTML = `
        <span>${taskValue}</span>
        <button class="delete-btn">×</button>
    `;

    // Add delete functionality
    li.querySelector('.delete-btn').addEventListener('click', () => {
        li.remove();
    });

    // Add to the list and clear input
    todoList.appendChild(li);
    todoInput.value = "";
}

// Listen for the button click
addBtn.addEventListener('click', addTask);

// Also listen for the "Enter" key
todoInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        addTask();
    }
});

// --- STEP 7: THE WEATHER LOGIC ---
async function getWeather() {
    const weatherDisplay = document.getElementById('weather');
    
    // 1. Show the user we are actually trying to fetch data
    weatherDisplay.innerText = "Looking out the window...";

    try {
        // This is a very reliable open API for weather
        const url = 'https://api.open-meteo.com/v1/forecast?latitude=6.5244&longitude=3.3792&current_weather=true';
        
        const response = await fetch(url);
        
        // If the internet request failed (like 404), stop here
        if (!response.ok) throw new Error("Network issues");

        const data = await response.json();
        const temp = data.current_weather.temperature;
        
        // 2. Update the screen with the real data
        weatherDisplay.innerText = `Lagos: ${temp}°C`;

    } catch (error) {
        // 3. If anything goes wrong, tell us why in the console
        weatherDisplay.innerText = "Weather unavailable";
        console.error("The error is: ", error);
    }
}
getWeather();