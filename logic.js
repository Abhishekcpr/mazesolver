


var cellCode = "b";

const numberOfRows = 40
const numberOfColumns = 80
var table = document.querySelector('#board')
var targetSet = false
var sourceSet = false
var currentMode = "" ;
var sourceIndex = [] ;
var targetIndex = [] ;
const INT_MAX  = 1000000 ;
var pathFound = false ;
const colorDefinition = {
    source : "#f5e642",
    target : "#42f59c" ,
    obstacle: "#303240",
    visitPath : "#9bd9e3",
    shortestPath : "#e34fd2"
}

class Queue {
    constructor() {
      this.elements = {};
      this.front = 0;
      this.back = 0;
    }
    enqueue(element) {
      this.elements[this.back] = element;
      this.back++;
    }
    dequeue() {
      const item = this.elements[this.front];
      delete this.elements[this.front];
      this.front++;
      return item;
    }
    peek() {
      return this.elements[this.front];
    }
     qlength() {
      return this.back - this.front;
    }
     qisEmpty() {
      return this.length === 0;
    }
  }

  let boardMatrix  ,distanceMatrix ;

 


  function initializeMatrix() {
    boardMatrix = new Array(numberOfRows);
    distanceMatrix = new Array(numberOfRows) ;
    for (let i = 0; i < numberOfRows; i++) {
      boardMatrix[i] = new Array(numberOfColumns).fill(0); 
      distanceMatrix[i] = new Array(numberOfColumns).fill(INT_MAX) ;
    }

    // console.log(boardMatrix) ;
  }

  initializeMatrix()

function makeTable()
{

    for(i = 0 ; i < numberOfRows ; i++)
    {
        const newRow = document.createElement("tr")
        for(j = 0 ; j < numberOfColumns ; j++)
        {
            const newCell = document.createElement("td")

            var giveIdy = "" + i
            var giveIdx = "" + j
           
            newCell.id = cellCode + giveIdy + "-" +giveIdx ;
            
            // newCell.textContent = cellCode + i + "-" + j ;
            newCell.textContent = ""

            newRow.appendChild(newCell) ;
        }
        table.appendChild(newRow)
    }


}

makeTable() ;


function makeId(i,j)
{
  return cellCode + i + "-" + j ;
}

document.querySelector(".control-buttons").addEventListener("click",(event)=>{
    const getId = event.target.id ;

    if(event.target.tagName == "BUTTON")
    {
        if(getId == "source" )
        {
            currentMode = "setSource"

        }
        else  if(getId == "target" )
        {
            currentMode = "setTarget"

        }
        else if(getId == "obstacle")
        currentMode = "setObstacle"

      
    }
    
})

function getIndices(x)
{
  // x = toString(x) ;
  a = "" ;
  b = "" ;
  next = false ;
  for(i = 1 ; i < x.length ; i++)
  {
    if(x[i] != '-' && !next)
    {
     a += x[i] ;
    }
    else if(x[i] == '-')
    {
      next = true ;
    }
    else if(next)
    {
      b += x[i] ;
    }
  }

  // console.log([a,b]) ;
  return [parseInt(a),parseInt(b)] ;
}


var cellData = document.getElementById("board")

cellData.addEventListener("click",(event)=>{

  if(event.target.tagName == "TD")
  {
    const id = event.target.id ;
    const [i,j] = getIndices(id) ;
     
    var element =  document.getElementById(id) ;

    if(currentMode == "setSource" && sourceSet == false)
    {
        sourceSet = true ;
        element.style.backgroundColor = colorDefinition.source ;
        element.innerText = "🐭"

       
        sourceIndex[0] = i ;
        sourceIndex[1] = j ;
        distanceMatrix[i][j] = 0 ;
    }
    else if(currentMode == "setTarget" && !targetSet)
    {
        targetSet = true ;
        targetIndex[0] = i ;
        targetIndex[1] = j ;
        element.style.backgroundColor =colorDefinition.target;
        element.innerText = "🧀"
    }

    // else if(currentMode == "setObstacle")
    // {
       
    //     element.style.backgroundColor =colorDefinition.obstacle;
    // }
    console.log("value received...")
  }


})


// set obstacles in board

const myTable = document.getElementById("board");
const cells = myTable.getElementsByTagName("td");

let isMouseDown = false;

myTable.addEventListener("mousedown", () => {
  isMouseDown = true;
});

document.addEventListener("mouseup", () => {
  isMouseDown = false;
});

myTable.addEventListener("mouseover", (event) => {
  if (isMouseDown && event.target.tagName === "TD" && currentMode == "setObstacle") {
    const cell = event.target;
    const id = event.target.id ;

    const [i,j] = getIndices(id) ;
    // console.log([i,j]);

   
    // console.log(boardMatrix[i][j]  + " ->")
    boardMatrix[i][j] = 1 ;
    cell.style.backgroundColor = colorDefinition.obstacle;

  }
});


// REMOVE THE OBSTACLES IF REQUIRED : 

// myTable.addEventListener("mouseout", (event) => {
//   if (isMouseDown && event.target.tagName === "TD") {
//     const cell = event.target;
//     // cell.style.backgroundColor = ""; // Reset to default background color
//   }
// });


// start the game :


function delay(milliseconds) {
  return new Promise((resolve) => {
    setTimeout(resolve, milliseconds);
  });
}

async function findShortestPath()
{
   var q = new Queue() ;

  q.enqueue([sourceIndex[0],sourceIndex[1], 1]) ;

  while(!q.qisEmpty())
  {

    
   var front = q.peek() ;
   console.log(front)

    q.dequeue() ;

    i = front[0]
    j = front[1]
    dis = front[2]

    // console.log("running...");
    
 
     await delay(2) ;
    if(i == targetIndex[0] && j == targetIndex[1])
    {
      pathFound  = true ;
     alert("shortest distance is " + dis) ;
    console.log(dis + "reached...");
     return ;
    }
    if(i <  numberOfRows-1 && distanceMatrix[i+1][j] == INT_MAX && boardMatrix[i+1][j]==0)
    {

       id = makeId(i+1,j) ;
       takeId = document.getElementById(id)
       {
        if(takeId !== null )
        {
          takeId.style.backgroundColor = colorDefinition.visitPath ;
        }
       }
      
      distanceMatrix[i+1][j]= dis + 1 ;
        q.enqueue([i+1, j , dis+1]) ;
    }

     if(i > 0  && distanceMatrix[i-1][j] == INT_MAX && boardMatrix[i-1][j]==0)
    {

      id = makeId(i-1,j) ;
      takeId = document.getElementById(id)
      {
       if(takeId !== null )
       {
         takeId.style.backgroundColor = colorDefinition.visitPath ;
       }
      }

      distanceMatrix[i-1][j]= dis + 1 ;
        q.enqueue([i-1, j , dis+1]) ;
    }

     if(j <  numberOfColumns-1 && distanceMatrix[i][j+1] == INT_MAX && boardMatrix[i][j+1]==0)
    {

      id = makeId(i,j+1) ;
      takeId = document.getElementById(id)
       {
        if(takeId !== null )
        {
          takeId.style.backgroundColor = colorDefinition.visitPath ;
        }
       }

      distanceMatrix[i][j+1]= dis + 1 ;
        q.enqueue([i, j+1 , dis+1]) ;
    }

     if(j > 0 && distanceMatrix[i][j-1] == INT_MAX && boardMatrix[i][j-1]==0)
    {
      id = makeId(i,j-1) ;
      takeId = document.getElementById(id)
       {
        if(takeId !== null )
        {
          takeId.style.backgroundColor = colorDefinition.visitPath ;
        }
       }

      distanceMatrix[i][j-1]= dis + 1 ;
        q.enqueue([i, j-1 , dis+1]) ;
    }

  }

  if(q.qisEmpty())
alert("No path found")


}

async function moveToTheTarget()
{
  let i = targetIndex[0] ;
  let j = targetIndex[1] ;

  let counter = distanceMatrix[i][j] ;

  var I=0

  let targetId = makeId(i,j)
  document.getElementById(targetId).style.backgroundColor = colorDefinition.shortestPath ;
  while(i!= sourceIndex[0] ||  j!= sourceIndex[1] && I<1000 )
  {
    I++;
    console.log("running...");



    if(i < numberOfRows -1 && distanceMatrix[i+1][j] == counter-1)
    {
       let takeId = makeId(i+1,j) ;
       let element = document.getElementById(takeId) ;
       element.style.backgroundColor = colorDefinition.shortestPath ;
       distanceMatrix[i+1][j] = 0 ;
       counter-- ;
       i = i+1 ;

       await delay(10) ;
    }

    if(j < numberOfColumns -1 && distanceMatrix[i][j+1] == counter-1)
    {
       let takeId = makeId(i,j+1) ;
       let element = document.getElementById(takeId) ;
       element.style.backgroundColor = colorDefinition.shortestPath ;
       distanceMatrix[i][j+1] = 0 ;
       counter-- ;
      j = j + 1 ;

      await delay(10) ;
    }

    if(i > 0  && distanceMatrix[i-1][j] == counter-1)
    {
       let takeId = makeId(i-1,j) ;
       let element = document.getElementById(takeId) ;
       element.style.backgroundColor = colorDefinition.shortestPath ;
       distanceMatrix[i-1][j] = 0 ;
       counter-- ;
       i = i-1 ;

       await delay(10) ;
    }

    if(j > 0  && distanceMatrix[i][j-1] == counter-1)
    {
       let takeId = makeId(i,j-1) ;
       let element = document.getElementById(takeId) ;
       element.style.backgroundColor = colorDefinition.shortestPath ;
       distanceMatrix[i][j-1]  = 0 ;
       counter-- ;
      j = j - 1 ;

      await delay(10) ;
    }


  }



}


document.querySelector("#start").addEventListener("click",(event)=>{

    if(targetSet == true && sourceSet == true)
    {
      findShortestPath() ;


      
      console.log(distanceMatrix)  
       console.log(boardMatrix)  
       
    }
})

document.querySelector("#findPath").addEventListener("click",(event)=>{

  if(targetSet == true && sourceSet == true && pathFound == true)
  {
    moveToTheTarget() ;
     
  }
})





