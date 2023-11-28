const title = document.querySelector(".result");
const restaBtn = document.querySelector('#resBtn');
let boxes = Array.from(document.querySelectorAll(".box"));
let selectedBox = Array(9).fill(null);
let o = 'o';
let x = 'x';
let moves = 0;
let currentPlayer = x;

boxes.forEach((box)=>{
    box.addEventListener('click',boxAdd);
});

restaBtn.addEventListener('click',restartBtn);

function boxAdd(e){
    let id = e.target.id;
    if(!selectedBox[id]){
    selectedBox[id] = currentPlayer;
    boxes[id].innerHTML = currentPlayer;
    currentPlayer == x ? currentPlayer = o : currentPlayer = x;
    moves++;
    }

    if(winningCheck() != false){
        currentPlayer == x ? currentPlayer = o : currentPlayer = x;
        title.textContent = `${currentPlayer.toUpperCase()} as Won The Game`;
        let winedCom = winningCheck();
        for(let i=0; i<=winedCom.length-1; i++){
        let selBox = boxes[winedCom[i]];
        selBox.style.background = "#00ffcc";
        selBox.style.color = "#111";
        }
        boxes.forEach((box)=>{
            box.removeEventListener('click',boxAdd);
        });
    }else if(moves===9){
        title.textContent = "Its a Draw";
        boxes.forEach((box)=>{
            box.removeEventListener('click',boxAdd);
        });
    }

}

function restartBtn(){
    boxes.forEach((box)=>{
        box.addEventListener('click',boxAdd);
    });
    let valli = "Tic Toe Game";
    title.innerHTML = valli;
    currentPlayer = x;
    moves = 0;
    window.location.reload();
}

const winCombo = [
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6]
];

function winningCheck(){
    for(const condition of winCombo){
        let [a,b,c] = condition;

        if(selectedBox[a] && (selectedBox[a] == selectedBox[b] && selectedBox[a] == selectedBox[c])){
            return [a,b,c];
        }
    }
    return false;
}
