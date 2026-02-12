function createLevels(containerId, colorClass) {
    const grid = document.getElementById(containerId);

    for (let i = 1; i <= 30; i++) {
        const level = document.createElement("div");
        level.classList.add("level", colorClass);
        level.textContent = i;

        level.addEventListener("click", () => {
            level.classList.toggle("completed");
            console.log("Start level", i);
        });

        grid.appendChild(level);
    }
}

createLevels("grid5", "red");
createLevels("grid6", "green");
createLevels("grid7", "blue");
