const params = new URLSearchParams(window.location.search);
let cnt = 0;
const id = Number(params.get("level"));  // המרה למספר
// קוד להוספה בראש כל דף פנימי
const user = sessionStorage.getItem("currentUser");
console.log("Current User:", user);
if (!user) {
    alert("עליך להתחבר קודם!");
    window.location.href = "register.html";
}
console.log("Level ID:", id);
let gameLevels = [

    // שלב 1
    [
        { color: "red", start: { row: 0, col: 0 }, end: { row: 4, col: 1 } },
        { color: "blue", start: { row: 1, col: 2 }, end: { row: 4, col: 2 } },
        { color: "green", start: { row: 3, col: 1 }, end: { row: 0, col: 2 } },
        { color: "yellow", start: { row: 0, col: 4 }, end: { row: 3, col: 3 } },
        { color: "orange", start: { row: 1, col: 4 }, end: { row: 4, col: 3 } }
    ],
    // שלב 2 מתוך צילום המסך
    [
        { color: "yellow", start: { row: 0, col: 0 }, end: { row: 3, col: 4 } },
        { color: "green", start: { row: 2, col: 2 }, end: { row: 3, col: 1 } },
        { color: "blue", start: { row: 3, col: 0 }, end: { row: 4, col: 4 } },
        { color: "red", start: { row: 3, col: 2 }, end: { row: 4, col: 0 } }
    ],
    // Level 3
    [
        { color: "yellow", start: { row: 0, col: 1 }, end: { row: 3, col: 0 } },
        { color: "blue", start: { row: 0, col: 2 }, end: { row: 4, col: 0 } },
        { color: "green", start: { row: 0, col: 3 }, end: { row: 4, col: 3 } },
        { color: "red", start: { row: 1, col: 3 }, end: { row: 2, col: 2 } },
        { color: "orange", start: { row: 3, col: 3 }, end: { row: 4, col: 2 } }
    ],
    // Level 4
    [
        { color: "red", start: { row: 0, col: 3 }, end: { row: 1, col: 0 } },
        { color: "green", start: { row: 0, col: 4 }, end: { row: 4, col: 0 } },
        { color: "yellow", start: { row: 2, col: 2 }, end: { row: 4, col: 2 } },
        { color: "blue", start: { row: 3, col: 3 }, end: { row: 4, col: 1 } }
    ],
    // Level 5
    [
        { color: "red", start: { row: 0, col: 3 }, end: { row: 4, col: 2 } },
        { color: "green", start: { row: 0, col: 4 }, end: { row: 1, col: 3 } },
        { color: "yellow", start: { row: 1, col: 1 }, end: { row: 4, col: 4 } },
        { color: "blue", start: { row: 1, col: 2 }, end: { row: 3, col: 4 } }
    ],
    // Level 1 (image_f35240) - 6 חיבורים
    [
        { color: "blue", start: { row: 0, col: 6 }, end: { row: 6, col: 5 } },
        { color: "orange", start: { row: 1, col: 5 }, end: { row: 2, col: 1 } },
        { color: "red", start: { row: 1, col: 6 }, end: { row: 5, col: 4 } },
        { color: "green", start: { row: 3, col: 3 }, end: { row: 4, col: 2 } },
        { color: "cyan", start: { row: 3, col: 4 }, end: { row: 6, col: 6 } },
        { color: "yellow", start: { row: 4, col: 4 }, end: { row: 5, col: 5 } }
    ],
    // Level 2 (image_f35263) - 7 חיבורים
    [
        { color: "magenta", start: { row: 0, col: 1 }, end: { row: 6, col: 2 } },
        { color: "red", start: { row: 0, col: 2 }, end: { row: 6, col: 3 } },
        { color: "orange", start: { row: 1, col: 2 }, end: { row: 5, col: 2 } },
        { color: "blue", start: { row: 1, col: 3 }, end: { row: 1, col: 5 } },
        { color: "green", start: { row: 2, col: 2 }, end: { row: 3, col: 5 } },
        { color: "cyan", start: { row: 3, col: 2 }, end: { row: 4, col: 5 } },
        { color: "yellow", start: { row: 4, col: 3 }, end: { row: 4, col: 4 } }
    ],
    // Level 3 (image_f35284) - 8 חיבורים (מאתגר!)
    [
        { color: "cyan", start: { row: 0, col: 0 }, end: { row: 1, col: 6 } },
        { color: "yellow", start: { row: 1, col: 0 }, end: { row: 2, col: 6 } },
        { color: "magenta", start: { row: 2, col: 0 }, end: { row: 2, col: 3 } },
        { color: "orange", start: { row: 2, col: 4 }, end: { row: 4, col: 5 } },
        { color: "green", start: { row: 2, col: 5 }, end: { row: 3, col: 6 } },
        { color: "red", start: { row: 3, col: 3 }, end: { row: 4, col: 6 } },
        { color: "blue", start: { row: 4, col: 0 }, end: { row: 6, col: 6 } },
        { color: "brown", start: { row: 3, col: 0 }, end: { row: 5, col: 1 } }
    ],
    // Level 4 (image_f352b9) - 5 חיבורים
    [
        { color: "green", start: { row: 1, col: 0 }, end: { row: 6, col: 0 } },
        { color: "yellow", start: { row: 2, col: 2 }, end: { row: 3, col: 4 } },
        { color: "orange", start: { row: 4, col: 2 }, end: { row: 5, col: 4 } },
        { color: "blue", start: { row: 4, col: 4 }, end: { row: 5, col: 1 } },
        { color: "red", start: { row: 5, col: 0 }, end: { row: 5, col: 5 } }
    ],
    // Level 5 (image_f35568) - 6 חיבורים
    [
        { color: "cyan", start: { row: 0, col: 0 }, end: { row: 5, col: 1 } },
        { color: "blue", start: { row: 0, col: 1 }, end: { row: 3, col: 4 } },
        { color: "yellow", start: { row: 0, col: 2 }, end: { row: 2, col: 3 } },
        { color: "green", start: { row: 1, col: 5 }, end: { row: 4, col: 4 } },
        { color: "red", start: { row: 2, col: 1 }, end: { row: 4, col: 2 } },
        { color: "orange", start: { row: 3, col: 1 }, end: { row: 5, col: 6 } }
    ],
    // Level 1 (image_f3592b) - 9 חיבורים
    [
        { color: "red", start: { row: 1, col: 1 }, end: { row: 4, col: 4 } },
        { color: "cyan", start: { row: 1, col: 2 }, end: { row: 2, col: 3 } },
        { color: "blue", start: { row: 1, col: 3 }, end: { row: 2, col: 6 } },
        { color: "orange", start: { row: 2, col: 4 }, end: { row: 2, col: 5 } },
        { color: "magenta", start: { row: 3, col: 6 }, end: { row: 5, col: 1 } },
        { color: "green", start: { row: 4, col: 1 }, end: { row: 4, col: 3 } },
        { color: "yellow", start: { row: 5, col: 0 }, end: { row: 6, col: 1 } },
        { color: "brown", start: { row: 5, col: 6 }, end: { row: 7, col: 1 } },
        { color: "purple", start: { row: 5, col: 7 }, end: { row: 6, col: 0 } }
    ],
    // Level 2 (image_f3594a) - 8 חיבורים
    [
        { color: "blue", start: { row: 0, col: 0 }, end: { row: 3, col: 7 } },
        { color: "brown", start: { row: 0, col: 7 }, end: { row: 3, col: 0 } },
        { color: "red", start: { row: 3, col: 4 }, end: { row: 6, col: 2 } },
        { color: "magenta", start: { row: 3, col: 6 }, end: { row: 5, col: 6 } },
        { color: "green", start: { row: 4, col: 4 }, end: { row: 7, col: 4 } },
        { color: "cyan", start: { row: 4, col: 7 }, end: { row: 6, col: 5 } },
        { color: "orange", start: { row: 5, col: 1 }, end: { row: 6, col: 1 } },
        { color: "yellow", start: { row: 5, col: 4 }, end: { row: 7, col: 3 } }
    ],

    // Level 3 (image_f35969) - 7 חיבורים
    [
        { color: "green", start: { row: 0, col: 7 }, end: { row: 4, col: 8 } },
        { color: "blue", start: { row: 1, col: 2 }, end: { row: 4, col: 5 } },
        { color: "yellow", start: { row: 1, col: 3 }, end: { row: 3, col: 6 } },
        { color: "orange", start: { row: 2, col: 1 }, end: { row: 4, col: 3 } },
        { color: "magenta", start: { row: 3, col: 1 }, end: { row: 5, col: 8 } },
        { color: "red", start: { row: 3, col: 5 }, end: { row: 5, col: 5 } },
        { color: "cyan", start: { row: 5, col: 4 }, end: { row: 5, col: 8 } }
    ],
    // Level 4 (image_f35988) - 7 חיבורים
    [
        { color: "yellow", start: { row: 0, col: 0 }, end: { row: 3, col: 7 } },
        { color: "orange", start: { row: 0, col: 1 }, end: { row: 1, col: 3 } },
        { color: "cyan", start: { row: 0, col: 8 }, end: { row: 6, col: 4 } },
        { color: "green", start: { row: 1, col: 8 }, end: { row: 3, col: 4 } },
        { color: "red", start: { row: 3, col: 8 }, end: { row: 4, col: 4 } },
        { color: "blue", start: { row: 4, col: 8 }, end: { row: 7, col: 8 } },
        { color: "magenta", start: { row: 5, col: 8 }, end: { row: 6, col: 8 } }
    ]

];
let size;
let isDrawing = false;
if (id <= 5) size = 5;
else if (id <= 10) size = 7;
else size = 9;
let currentLevel = gameLevels[id - 1];
console.log(gameLevels);
console.log(currentLevel);
let gameBoard = document.getElementById("game-container");
gameBoard.style.gridTemplateColumns = `repeat(${size}, 1fr)`;
gameBoard.style.gridTemplateRows = `repeat(${size}, 1fr)`;



let cells = [];
for (let i = 0; i < size; i++) {
    cells[i] = [];
    for (let j = 0; j < size; j++) {
        let cell = document.createElement("div");
        cell.style.border = "1px solid #ccc";
        cell.style.width = "50px";
        cell.style.height = "50px";
        gameBoard.appendChild(cell);
        cell.dataset.row = i;
        cell.dataset.col = j;
        cells[i][j] = cell;
    }
}

// צובע את נקודות ההתחלה והסיום של כל צבע
for (let colorObj of currentLevel) {
    let { start, end, color } = colorObj;
    cells[start.row][start.col].style.backgroundColor = color;
    cells[start.row][start.col].style.border = "3px solid black"; 
    cells[end.row][end.col].style.backgroundColor = color;
    cells[end.row][end.col].style.border = "3px solid black"; 
}
let c1 = null, c2 = null;

for (let i = 0; i < gameBoard.children.length; i++) {
    gameBoard.children[i].addEventListener("click", handleMouseDown);
    gameBoard.children[i].addEventListener("mouseover", handleMouseEnter);

}
let seconds = 0;   // המשתנה ששומר את מספר השניות
let timer = null;  // המשתנה שיחזיק את ה-Interval כדי שנוכל לעצור אותו
start();
function start() {
    // בדיקה שמונעת הפעלה של כמה טיימרים במקביל (שלא ירוץ מהר מדי)
    if (timer !== null) return; 

    timer = setInterval(() => {
        seconds++; // הוספת שנייה
        document.getElementById('seconds-counter').innerText = seconds;
    }, 1000); // ביצוע הפעולה כל 1000 מילי-שניות (שנייה אחת)
}

function stop() {
    clearInterval(timer); // עוצר את הריצה
    timer = null;         // מאפס את המשתנה כדי שנוכל להפעיל שוב
}



function handleMouseDown(event) {
    const row = parseInt(event.target.dataset.row);
    const col = parseInt(event.target.dataset.col);

    if (c1 === null) {
        // בחירת נקודה ראשונה
        if (event.target.style.backgroundColor !== "" && isPoint(row, col)) {
            c1 = event.target;
            c1.style.border = "2px solid black";
            isDrawing = true;
           
        }
    } 
    else {
        // בחירת נקודה שניה
        // 1. האם זו נקודה? האם היא שונה מהראשונה? האם הצבע זהה?
        if (isPoint(row, col) && event.target !== c1 && event.target.style.backgroundColor === c1.style.backgroundColor) {

            if (checkOtherSide(event)) {
                cnt++;
                event.target.style.border = "2px solid black";
                console.log("Path valid! Current count:", cnt);

                if (cnt === currentLevel.length && checkWin()) {

                    addtoHistory();
                    alert("winner");
                    stop();
                    window.location.href = "opening.html";
                }
            } else {
                clearCurrentPath(); // פונקציית עזר לניקוי
            }
        } else {
            clearCurrentPath();
        }

        // איפוס חובה של c1 רק אחרי הניסיון לחיבור
        if (c1) c1.style.border = "1px solid #ccc";
        isDrawing = false;
        c1 = null;
    }

    // ניקוי c2 (התא האחרון מהגרירה)
    if (c2 != null) {
        c2.style.border = "1px solid #ccc";
        c2 = null;
    }
}
function checkWin() {
   for(let i = 0; i < size; i++) {
       for(let j = 0; j < size; j++) {
           if (cells[i][j].style.backgroundColor === "" && !isPoint(i, j)) {
               return false;
           }
       }
   }
   return true;
}

// פונקציית עזר לניקוי המסלול של הצבע הנוכחי
function clearCurrentPath() {
    if (!c1) return;
    const colorToClear = c1.style.backgroundColor;
    for (let i = 0; i < size; i++) {
        for (let j = 0; j < size; j++) {
            if (cells[i][j].style.backgroundColor === colorToClear && !isPoint(i, j)) {
                cells[i][j].style.backgroundColor = "";
                cells[i][j].style.border = "1px solid #ccc";
                let p = cells[i][j].querySelector('.path');
                if (p) p.remove();
            }
        }
    }
}

function checkOtherSide(event) {
    const row = parseInt(event.target.dataset.row);
    const col = parseInt(event.target.dataset.col);
    const color = c1.style.backgroundColor;

    // הגדרת 4 השכנים (למעלה, למטה, שמאל, ימין)
    const neighbors = [
        [row - 1, col], [row + 1, col],
        [row, col - 1], [row, col + 1]
    ];

    for (let [r, c] of neighbors) {
        // בדיקה שהשכן בכלל קיים במטריצה (לא חורג מהגבולות)
        if (r >= 0 && r < size && c >= 0 && c < size) {
            // בדיקה אם השכן צבוע באותו צבע של הקו שהתחלנו
            if (cells[r][c].style.backgroundColor === color) {
                return true;
            }
        }
    }
    return false;
}
function handleMouseEnter(event) {


    
    const row = parseInt(event.target.dataset.row);
    const col = parseInt(event.target.dataset.col);
     isPainted(row, col);
     let prev = c2 || c1;



    if (checkMove(event.target, prev) && !isPoint(row, col)) {
        if (c1 != null) {


           
            if (event.target.style.backgroundColor === "" || isPoint(row, col)) {
                c2 = event.target;
                c2.style.border = "2px solid black";

                event.target.style.backgroundColor = c1.style.backgroundColor;
                c2.classList.add("cell-filled"); // מפעיל את ה-Glow מה-CSS הקודם

                // 2. יצירת אפקט ה-Path (הקו שצומח)
                const path = document.createElement("div");
                path.className = "path visible";
                path.style.backgroundColor = c1.style.backgroundColor;

                c2.appendChild(path);
            }
        }
    }



}


function checkMove(target1, c3) {

    let p1, p2;
    for (let i = 0; i < cells.length; i++) {
        for (let j = 0; j < cells[i].length; j++) {
            if (cells[i][j] == c3)
                p1 = { row: i, col: j };
            if (cells[i][j] == target1)
                p2 = { row: i, col: j };
        }
    }
    if (!p1 || !p2) return false;
    if (p1.col == p2.col && Math.abs(p1.row - p2.row) == 1)
        return true;
    if (p1.row == p2.row && Math.abs(p1.col - p2.col) == 1)
        return true;

    return false;

}


window.addEventListener("beforeunload", function () {
    localStorage.removeItem("currentUser");
});
// פונקצית עיצוב לטיפול באינטראקציה עם תאי המשחק (למשל, כאשר המשתמש מצייר קו בין שתי נקודות)
function handleCellInteraction(cell) {
    if (!isDrawing || cell === lastCell) return;

    // צביעת הרקע של המשבצת באותו צבע (בשקיפות נמוכה אם רוצים)
    cell.style.backgroundColor = currentColor.replace(')', ', 0.2)').replace('rgb', 'rgba');

    // מציאת או יצירת הקו בתוך המשבצת
    let path = cell.querySelector('.path');
    if (!path) {
        path = document.createElement("div");
        path.className = "path";
        cell.appendChild(path);
    }

    // הגדרת הצבע והפעלת האנימציה
    path.style.backgroundColor = currentColor;

    // timeout קטן גורם ל-transition לעבוד בצורה חלקה
    setTimeout(() => {
        path.classList.add("visible");
    }, 10);

    lastCell = cell;
}
function isPoint(i, j) {
    for (let colorObj of currentLevel) {
        if ((colorObj.start.row === i && colorObj.start.col === j) || (colorObj.end.row === i && colorObj.end.col === j)) {


            return true;
        }

    }
    return false;
}
function addtoHistory() {
    let users = JSON.parse(localStorage.getItem("users")) || {};
    let currentUserEmail = sessionStorage.getItem("currentUser");
    if (users[currentUserEmail]) {
        let userData = users[currentUserEmail];
        userData.history.push({ level: id, date: new Date().toISOString() });
        localStorage.setItem("users", JSON.stringify(users));
    }
}
function isPainted(i, j) {
    let targetCell = cells[i][j];
    let currentColor="";
    if(!c1&&!isDrawing)    return;
    if(c1!=null)
     {
        currentColor = c1.style.backgroundColor;

     } 

    // מקרה 1: עלינו על צבע אחר - מוחק את כל המסלול האחר
    if (targetCell.style.backgroundColor !== "" && targetCell.style.backgroundColor !== currentColor) {
        let colorToClear = targetCell.style.backgroundColor;
        for (let r = 0; r < size; r++) {
            for (let c = 0; c < size; c++) {
                if (cells[r][c].style.backgroundColor === colorToClear && !isPoint(r, c)) {
                   
                    cells[r][c].style.backgroundColor = "";
                    cells[r][c].style.border = "1px solid #ccc";
                    let path = cells[r][c].querySelector('.path');
                    if (path) path.remove();

                }
            }
        }
        cnt--;
    }

   
  // מקרה 2: עלינו על אותו צבע (חזרה אחורה)
else if (targetCell.style.backgroundColor === currentColor) {
   
    if (targetCell === c1) {
       
        if (c2 && !isPoint(parseInt(c2.dataset.row), parseInt(c2.dataset.col))) {
            clearCell(c2);
           
        }
        c2 = null; 
         
    }
    
    // אם חזרנו אחורה למשבצת שהיא לא c1 אבל היא בתוך המסלול
    else if (targetCell !== c2 && !isPoint(i, j)) {
        if (c2 && !isPoint(parseInt(c2.dataset.row), parseInt(c2.dataset.col))) {
            clearCell(c2);
        }
        c2 = targetCell; // הקצה החדש הוא המשבצת שחזרנו אליה
    }
}


}
function clearCell(cell) {
    cell.style.backgroundColor = "";
    cell.style.border = "1px solid #ccc";
    let path = cell.querySelector('.path');
    if (path) path.remove();
}
