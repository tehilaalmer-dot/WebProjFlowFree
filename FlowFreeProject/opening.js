
const user = sessionStorage.getItem("currentUser");
if (!user) {
    alert("עליך להתחבר קודם!");
    window.location.href = "register.html";
}
let cnt=1;
function createLevels(containerId, colorClass) {
    const grid = document.getElementById(containerId);
    

    for (let i = 1; i <= 5; i++) {
        const level = document.createElement("div");
        level.classList.add("level", colorClass);
        level.textContent = i;
        level.id=cnt.toString();
        cnt++;

        level.addEventListener("click", () => {

            console.log("Start level", i);
            goToPage(event.target.id);
        });

        grid.appendChild(level);
    }
}

function goToPage(id) {
    window.location.href = "game.html?level=" + id;
}


createLevels("grid5", "red");
createLevels("grid6", "green");
createLevels("grid7", "blue");
function logout() {
    sessionStorage.removeItem("currentUser");
    window.location.href = "register.html";
}
function updateHistoryTable() {
    const tableBody = document.getElementById('history-table-body');
    if (!tableBody) return; // הגנה: שלא ירוץ אם אין טבלה בדף הנוכחי

    // 1. שליפת האימייל של המשתמש המחובר
    const currentUserEmail = sessionStorage.getItem("currentUser");
    
    // 2. שליפת רשימת כל המשתמשים מה-localStorage
    const allUsers = JSON.parse(localStorage.getItem("users")) || {};
    
    // 3. שליפת הנתונים של המשתמש הספציפי
    const userData = allUsers[currentUserEmail];

    tableBody.innerHTML = ""; // איפוס הטבלה

    // 4. בדיקה קריטית: האם המשתמש קיים והאם יש לו היסטוריה?
    if (!userData || !userData.history) {
        console.log("No history found for this user");
        tableBody.innerHTML = `<tr><td colspan="3">אין היסטוריה זמינה</td></tr>`;
        return;
    }

    // 5. עכשיו אפשר להריץ forEach בבטחה
    userData.history.forEach(item => {
        const row = document.createElement('tr');

        const dateObj = new Date(item.date);
        const dateString = dateObj.toLocaleDateString('he-IL'); 
        const timeString = dateObj.toLocaleTimeString('he-IL', { hour: '2-digit', minute: '2-digit' });

        row.innerHTML = `
            <td>${item.level}</td>
            <td>${dateString}</td>
            <td>${timeString}</td>
        `;

        tableBody.appendChild(row);
    });
}
updateHistoryTable();
document.addEventListener("DOMContentLoaded", () => {
    const toggleBtn = document.getElementById('toggle-history-btn');
    const sidebar = document.getElementById('history-sidebar');

    toggleBtn.addEventListener('click', () => {
        // מחליף בין הצגה להסתרה
        sidebar.classList.toggle('hidden');
        
        // שינוי טקסט הכפתור בהתאם למצב
        if (sidebar.classList.contains('hidden')) {
            toggleBtn.innerText = "📜 הצג היסטוריה";
        } else {
            toggleBtn.innerText = "❌ סגור היסטוריה";
            // בכל פעם שפותחים, כדאי לרענן את הנתונים
            updateHistoryTable(); 
        }
    });
});