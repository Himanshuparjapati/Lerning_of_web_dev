const button = document.querySelector(".random");
const body = document.querySelector("body");
let count = 0;
console.log(button);
if (button) {
    button.addEventListener("click", (e) => {
        count += 1; // Corrected increment operation
        let color = getRandomHexColor();
        document.getElementById("box").style.backgroundColor = color;
        button.innerHTML = `Content-changed ${count} ${color}`;
        console.log(count,color);
    });
} else {
    console.error("Element with class 'random' not found.");
};

function getRandomHexColor() {
    let hex = "#" + Math.floor(Math.random() * 16777215).toString(16);
    return hex.padEnd(7, "0"); // Ensures the color always has 6 digits
}

console.log(getRandomHexColor());

// if(body){
// console.log(body);
// body.addEventListener("click",(e)=>{
//      count = 0;
//      let defaultColor = "aqua";
//      body.style.backgroundColor= defaultColor;
//      body.innerHTML=`Click`
//     console.log("reset the all value");
    
// });

// }else{
//     console.log("body is not found in whole html code");
    
// }
