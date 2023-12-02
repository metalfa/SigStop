document.addEventListener("DOMContentLoaded", updateCounter);

let intervalId; // Variable to store the interval ID for updating the countdown

function postponeCigarette() {
    // Clear any existing interval
    clearInterval(intervalId);

    // Get the current timestamp
    const currentTime = new Date().getTime();

    // Add 10 seconds (in milliseconds) to the current time for testing
    const newTime = currentTime ;

    // Store the new timestamp in local storage
    localStorage.setItem("lastPostponedTime", newTime);

    // Update the counter display immediately
    updateCounter();

    // Set up a new interval to update the countdown every second
    intervalId = setInterval(updateCounter, 1000);
}

function updateCounter() {
    // Get the last postponed timestamp from local storage
    const lastPostponedTime = localStorage.getItem("lastPostponedTime");

    if (lastPostponedTime) {
        // Calculate the time difference in seconds
        const currentTime = new Date().getTime();
        const timeDiff = Math.floor((currentTime - lastPostponedTime) / 1000);

        // Calculate remaining seconds
        const remainingSeconds = Math.max(0, 10 - timeDiff);

        // Update the counter display
        document.getElementById("counter").innerText = `${remainingSeconds} seconds`;

        // Check if 10 seconds have passed
        if (timeDiff >= 10) {
            showSuccessSound();

            // Clear the interval after playing the success sound
            clearInterval(intervalId);
        }
    } else {
        // If no previous postponed time, display 0 seconds
        document.getElementById("counter").innerText = "0 seconds";
    }
}

function showSuccessSound() {
    // Create an Audio object and set the source to the success sound file
    const successSound = new Audio("success.mp3");

    // Play the success sound
    successSound.play()
        .catch(error => {
            console.error('Error playing audio:', error.message);
        });
}

