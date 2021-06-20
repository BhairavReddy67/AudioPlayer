let canvas = document.getElementById("mycanvas")
let canvas1 = document.getElementById("mycanvas1")
let content=canvas.getContext('2d')
let content1=canvas1.getContext('2d')
let audio=document.querySelector("audio")
let startingSong=false
let button=document.getElementById("btn")
let fastForward=document.getElementById("fastForward")
let volumeStatus=true
let volume=document.getElementById("volume")

// Designing canvas by Bar Chart

let barLength=[0]
for(let i=0;i<500;i++){
    barLength.push(Math.floor(Math.random()*100)+10)
}
function render(event){
    let len_bar=2;
    let X_axies=0;
    for(let i=0;i<barLength.length;i++){
        let height=barLength[i]
        content.fillRect(X_axies,canvas.height-height,len_bar,height);
        content1.fillRect(X_axies,height-canvas.height,len_bar,height+height/2);
        X_axies+=len_bar+2 
        X_axies<event?(content.fillStyle="rgb(245, 181, 62)",content1.fillStyle="rgb(245, 181, 62)"):(content.fillStyle="rgb(214, 210, 210)",content1.fillStyle="rgb(214, 210, 210)");
    }
    
}
render(0)

// disiging tag for Random color
var arr=["Introduction","Mode","control","sentis"]
    var X_codi=200
    var Y_codi=80
    for(var i=0;i<arr.length;i++){
        let color=`rgb(${Math.floor(Math.random()*255)},${Math.floor(Math.random()*255)},${Math.floor(Math.random()*255)})`
        content.fillStyle = color;
        content.fillRect(X_codi, Y_codi, 60, 14);
        content.fillStyle = "white";
        content.fillText(arr[i], X_codi+5, Y_codi+10);
        content.beginPath();
        content.moveTo(X_codi, Y_codi);
        content.lineTo(X_codi, 150);
        content.strokeStyle =color;
        content.stroke();
        content.fillStyle = color;
        content.beginPath();
        content.arc(X_codi, 150, 5, 0, Math.PI * 2, false);
        content.closePath();
        content.fill();
        X_codi+=180;
        i<2?Y_codi-=10:Y_codi=82
        
    }
// Moving forward when it Playing
function dataTime(){
    if(audio.currentTime==audio.duration){
        startingSong=false
        button.innerHTML=`<i class="fa fa-play"></i>`
    }
    render(audio.currentTime*(800/audio.duration))
}


// Pointing the Mouse in Canvas
function getMousePosition(canvas, event) {
    let rect = canvas.getBoundingClientRect();
    let x = event.clientX - rect.left;
    audio.currentTime=(x/800)*audio.duration
    audio.play()
    startingSong=true
    button.innerHTML=`<i class="fa fa-pause"></i>`
}
canvas.addEventListener("mousedown",e=>{
    getMousePosition(canvas, e);
});
canvas1.addEventListener("mousedown",e=>{
    getMousePosition(canvas1, e);
});


// Playing Pause the Song Function
button.addEventListener("click",()=>{
    !startingSong?(button.innerHTML=`<i class="fa fa-pause"></i>`,audio.play(),startingSong=true):
    (button.innerHTML=`<i class="fa fa-play"></i>`,audio.pause(),startingSong=false)
})


// Mute and Unmute for Song
volume.addEventListener("click",()=>{
    volumeStatus?(volume.innerHTML=`<i class="fa fa-volume-off"></i>`,audio.muted=volumeStatus,volumeStatus=false):
    (volume.innerHTML=`<i class="fa fa-volume-up"></i>`,audio.muted=volumeStatus,volumeStatus=true)
})

// fast Forword Song Function
fastForward.addEventListener("click",()=>{
    audio.currentTime+=10
    audio.play()
    startingSong=true
    button.innerHTML=`<i class="fa fa-pause"></i>`
})