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
    cells[end.row][end.col].style.backgroundColor = color;
}
let c1 = null, c2 = null;

for (let i = 0; i < gameBoard.children.length; i++) {
    gameBoard.children[i].addEventListener("click", handleMouseDown);
    gameBoard.children[i].addEventListener("mouseover", handleMouseEnter);

}
function handleMouseDown(event) {
    if (c1 == null) {
        if (event.target.style.backgroundColor != "") {
            c1 = event.target;


            c1.style.border = "2px solid black";


        }

    }
    else if (c2 != null) {
        const row = parseInt(event.target.dataset.row);
        const col = parseInt(event.target.dataset.col);
        if (isPoint(parseInt(row), parseInt(col)) && (row != c1.dataset.row && col != c1.dataset.col) && event.target.style.backgroundColor === c1.style.backgroundColor) {
            cnt++;
            event.target.style.border = "2px solid black";
            if (cnt === currentLevel.length - 1) {
                alert("winner")
            }


        }
        c1 = null;
        c2.style.border = "1px solid #ccc";
        c2 = null;

    }


}
function handleMouseEnter(event) {


    let prev = c2 || c1;
    const row = parseInt(event.target.dataset.row);
    const col = parseInt(event.target.dataset.col);


     
    if (checkMove(event.target, prev) && !isPoint(row, col)) {
        if (c1 != null) {

          
             isPainted(row, col);
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


// function checkStep() {

// }
// function checkWin() {
//     for (let colorObj of currentLevel) {
//         let { end, color } = colorObj;
//         if (cells[end.row][end.col].style.backgroundColor != color)
//             return false;
//     }
//     return true;
// }
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
// function isPainted(i, j) {
//     if (cells[i][j].style.backgroundColor === c2.style.backgroundColor) {
//         cells[i][j].style.backgroundColor = "";
//     }
//     else {
//         if (cells[i][j].style.backgroundColor != "") {
//             let color1 = cells[i][j].style.backgroundColor;
//             for (let ind = 0; ind < size; ind++) {
//                 for (let cind = 0; cind < size; cind++) {
//                     if (cells[ind][cind].style.backgroundColor === color1) {
//                         cells[ind][cind].style.backgroundColor = "";
//                         let path = cells[ind][cind].querySelector('.path');
//                     if (path) {
//                         path.remove(); 
//                     }
                    
//                     // 3. החזרת הגבול למצב רגיל
//                     cells[ind][cind].style.border = "1px solid #ccc";
//                         cnt--;
//                     }
//                 }
//             }
//         }
//     }
// }
function isPainted(i, j) {
    let targetCell = cells[i][j];
    let currentColor = c1.style.backgroundColor;

    // מקרה 1: עלינו על צבע אחר (מה ששאלת קודם) - מוחק את כל המסלול האחר
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

    // מקרה 2: עלינו על אותו צבע של המסלול הנוכחי (תיקון מסלול)
    // אם התא כבר צבוע בצבע שלנו והוא לא נקודת ההתחלה
    else if (targetCell.style.backgroundColor === currentColor && !isPoint(i, j)) {
        // מוחקים את הצבע והעיצוב מהתא הזה כדי "לפנות" אותו
        targetCell.style.backgroundColor = "";
        targetCell.style.border = "1px solid #ccc";
        let path = targetCell.querySelector('.path');
        if (path) path.remove();
        
        // כאן אפשר להוסיף לוגיקה שתעדכן את c2 להיות התא הקודם ברצף
    }
}
// // for (let row = 0; row < cells.length; row++) {
// //                 for (let col = 0; col < cells[row].length; col++) {
// //                     if (cells[row][col].style.backgroundColor == colorObj.color) {//cells[row][col].style.backgroundColor="";
// //                         cells[row][col].classList.remove("cell-filled");
// //                     }
// //                 }
// //             }
// --- הגדרות ראשוניות וטעינת שלב ---
// --- נתוני השלבים ---
