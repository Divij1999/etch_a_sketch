//Creating the canvas
function createCanvas(num){
  const container=document.querySelector(".container");
  for(let i=0; i<num; i++){
    const row=document.createElement("div");
    row.classList.add("row");
    row.setAttribute("style", "display:flex");
    for(let i=0; i<num; i++){
        const div=document.createElement("div");
        div.setAttribute("style", `width:${560/num}px; height:${560/num}px`);  
        div.classList.add("pixel");
        row.appendChild(div);
    }
    container.appendChild(row);
  }
  const divs=document.querySelectorAll(".pixel");
  console.log(divs);
  divs.forEach(div=>div.addEventListener("mouseover", currentColour)); 

}
createCanvas(16);

//Adjusting the colours
function currentColour(e, colorType="none"){
  //If random button is pressed, add rgb class to the divs
  if(colorType==="random"){
    const divs=document.querySelectorAll(".pixel");
    divs.forEach(div=>div.classList.add("rgb"));
    divs.forEach(div=>div.classList.remove("opacity"));
  }
  else if(colorType==="opacity"){
    const divs=document.querySelectorAll(".pixel");
    divs.forEach(div=>div.classList.remove("rgb"));
    divs.forEach(div=>div.classList.add("opacity"));
    
  }
  else if(colorType==="black"){
    const divs=document.querySelectorAll(".pixel");
    divs.forEach(div=>div.classList.remove("rgb"));
  }

  //If the divs have rgb class 
  if(e.target.classList.value==="pixel rgb"){       
    let background=()=>{
      const hexa="0123456789ABCDEF";
      let color="#";
      for(let i=0;i<6; ++i){
        color+=hexa[Math.floor(Math.random()*16)];
      }
      return color;
    };
    e.target.style.background=background();
  }
  //If the user has clicked the opacity button
  else if(e.target.classList.value==="pixel opacity"){
    e.target.style.background="black";
    let alpha=+e.target.style.opacity;
    if(alpha<1)
      alpha+=0.1;
    e.target.style.opacity=`${alpha}`;

  }
  //If divs don't have rgb class
  else if(colorType==="none")
    e.target.style.background="black";
    }


//Clearing the canvas
function clearCanvas(e){
  const rows=document.querySelectorAll(".row");
  rows.forEach(row=>{row.remove()});
  const num=+prompt("Enter the no. of squares on one side");
  createCanvas(num);

}

//Event listeners for buttons
const clear=document.querySelector(".clear");
clear.addEventListener("click", clearCanvas);

const random=document.querySelector(".random");
random.addEventListener("click", (e)=>{currentColour(e, "random")});

const color=document.querySelector(".color");
color.addEventListener("click", (e)=>{currentColour(e, "black")});

const opacity=document.querySelector(".opacity");
opacity.addEventListener("click", (e)=>{currentColour(e, "opacity")});




