function updateClock() {
    const now = new Date();

    document.getElementById("clock").innerText =
        now.toLocaleDateString() + " " + now.toLocaleTimeString();
}

setInterval(updateClock, 1000);