// Set canvas size to fill the window
function resizeCanvases() {
  const bgCanvas = document.getElementById("cartoonCanvas");
  const timeCanvas = document.getElementById("time");

  bgCanvas.width = window.innerWidth;
  bgCanvas.height = window.innerHeight;

  timeCanvas.width = window.innerWidth;
  timeCanvas.height = window.innerHeight;
}
//background gradient and sun
function draw() {
  const canvas = document.getElementById("cartoonCanvas");
  const ctx = canvas.getContext("2d");

  let grd = ctx.createLinearGradient(0, canvas.height, canvas.width, 0);

  grd.addColorStop(0, "rgb(163, 215, 241)");
  grd.addColorStop(0.5, "#2595d1");
  grd.addColorStop(1, "rgb(242, 247, 250)");

  ctx.fillStyle = grd;
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  // sun glow
  const glow = ctx.createRadialGradient(
    canvas.width - 180, 180, 20,
    canvas.width - 180, 180, 110
  );

  glow.addColorStop(0, "rgba(184, 103, 27, 0.33)");
  glow.addColorStop(0.5, "rgba(211, 51, 40, 0.64)");
  glow.addColorStop(1, "rgba(255, 179, 0, 0)");

  ctx.beginPath();
  ctx.arc(canvas.width - 180, 180, 110, 0, Math.PI * 2);
  ctx.fillStyle = glow;
  ctx.fill();
}
//fill 0 to single digit numbers for better time display
function pad(n) {
  return n < 10 ? "0" + n : n;
}

function drawTime() {
  const canvas = document.getElementById("time");
  const ctx = canvas.getContext("2d");

  const now = new Date();
  const hours = pad(now.getHours());
  const minutes = pad(now.getMinutes());
  const seconds = pad(now.getSeconds());
  //format time as HH:MM:SS
  const time = hours + ":" + minutes + ":" + seconds;

  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // Set font and style for time display
  ctx.font = "bold 100px serif";
  ctx.textAlign = "center";
  ctx.fillStyle = "black";
  ctx.strokeStyle = "rgba(10, 1, 1, 0.8)";
  ctx.lineWidth = 2;
  ctx.strokeText(time, canvas.width / 2, 300);  
}
function ground(){
  const canvas = document.getElementById("cartoonCanvas");
  const ctx = canvas.getContext("2d");

  //ground gradient
  let grd = ctx.createLinearGradient(0, canvas.height - 100, 0, canvas.height);

  grd.addColorStop(0, "rgba(8, 161, 3, 0.49)");
  grd.addColorStop(0.5, "rgba(161, 98, 3, 0.74)");
  grd.addColorStop(1, "rgba(173, 107, 7, 0.84)");
  ctx.fillStyle = grd;
  //ground
  ctx.fillRect(0, canvas.height - 100, canvas.width, 100);
  ctx.fillStyle = "rgba(255, 255, 255, 0.17)";
  ctx.fillRect(0, canvas.height - 100 - 5, canvas.width, 5);
  
}
function drawhouse(){
  const canvas = document.getElementById("cartoonCanvas");
  const ctx = canvas.getContext("2d");

  //wall
  let wall = ctx.createLinearGradient(canvas.width/2-250, canvas.height - 500, canvas.width/2+250, canvas.height - 100);

  wall.addColorStop(0, "rgb(255, 255, 255)");
  wall.addColorStop(1, "rgba(173, 111, 111, 0.98)");

  ctx.fillStyle = wall;
  ctx.fillRect(canvas.width/2-250, canvas.height - 500, 500, 400);

  //roof
  ctx.beginPath();
  ctx.moveTo(canvas.width/2-300, canvas.height - 500);
  ctx.lineTo(canvas.width/2-200, canvas.height -700);
  ctx.lineTo(canvas.width/2+50, canvas.height - 750);
  ctx.lineTo(canvas.width/2+100, canvas.height - 500);
  ctx.closePath();
  ctx.fillStyle = "rgba(238, 188, 97, 0.8)";
  ctx.fill();
  ctx.lineWidth = 2;
  ctx.strokeStyle = "rgba(0, 0, 0, 0.12)";
  ctx.stroke();

  ctx.beginPath();
  ctx.moveTo(canvas.width/2+100, canvas.height - 500);
  ctx.lineTo(canvas.width/2+300, canvas.height - 500);
  ctx.lineTo(canvas.width/2+50, canvas.height -748);
  ctx.closePath();
  ctx.fillStyle = "rgba(236, 166, 35, 0.79)";
  ctx.fill();
  ctx.lineWidth = 3;
  ctx.strokeStyle = "rgba(0, 0, 0, 0)";
  ctx.stroke();
  ctx.fillStyle = "rgba(0, 0, 0, 0.10)";
  ctx.fillRect(canvas.width/2-250, canvas.height - 500, 500, 8);
  //door
  let door = ctx.createLinearGradient(canvas.width/2-150, canvas.height - 400,canvas.width/2, canvas.height - 100);

  door.addColorStop(0, "rgba(190, 125, 28, 0.98)");
  door.addColorStop(1, "rgba(139, 95, 13, 0.21)");
  ctx.fillStyle = door;
  ctx.fillRect(canvas.width/2-150, canvas.height -400, 150, 300);

  ctx.strokeStyle = "rgba(0, 0, 0, 0.24)";
  ctx.lineWidth = 2;
  ctx.strokeRect(canvas.width/2-150, canvas.height -400, 150, 300);
    //hand of the door
  ctx.beginPath();
  ctx.arc(canvas.width/2-130, canvas.height - 250, 10, 0, Math.PI * 2);
  ctx.strokeStyle = "rgba(199, 128, 21, 0.94)";
  ctx.stroke();
  ctx.fillStyle = "rgb(216, 219, 19)";
  ctx.fill();

  //window
  ctx.fillStyle = "rgba(189, 215, 223, 0.93)";
  ctx.fillRect(canvas.width/2+50, canvas.height - 370, 150, 150);

  ctx.strokeStyle = "rgba(0, 0, 0, 0.94)";
  ctx.lineWidth = 2;
  ctx.strokeRect(canvas.width/2+50, canvas.height - 370, 150, 150);
  ctx.beginPath();
  ctx.moveTo(canvas.width/2+125, canvas.height - 370);
  ctx.lineTo(canvas.width/2+125, canvas.height - 220);
  ctx.moveTo(canvas.width/2+50, canvas.height - 295);
  ctx.lineTo(canvas.width/2+200, canvas.height - 295);
  ctx.strokeStyle = "rgba(0, 0, 0, 0.94)";
  ctx.lineWidth = 2;
  ctx.stroke();
  //highlight the window
  ctx.fillStyle = "rgba(255, 255, 255, 0.51)";
  ctx.beginPath();
  ctx.moveTo(canvas.width/2+60, canvas.height - 340);
  ctx.lineTo(canvas.width/2+60, canvas.height -360);
  ctx.lineTo(canvas.width/2+80, canvas.height -360);
  ctx.closePath();
  ctx.fill();
}
function drawFence(){
  const canvas = document.getElementById("cartoonCanvas");
  const ctx = canvas.getContext("2d");
  
  //fence post dimensions and gap
  const postWidth = 20;
  const postHeight = 80;
  const gap = 40;
  

  ctx.save();
  ctx.translate(0, canvas.height - 180);

  //draw fence posts and rails
  for (let x = 0; x < canvas.width/gap; x++) {
    ctx.fillStyle = "rgba(255, 255, 255, 0.8)";
    ctx.fillRect(0,0,postWidth, postHeight);
    ctx.fillRect(0, postHeight/2 - 30, postWidth+gap, 10);
    ctx.fillRect(0, postHeight/2 - 10, postWidth+gap, 10);
    ctx.translate(gap, 0);
}
  ctx.restore();
}


function renderAll() {
  draw();
  drawTime();
  ground();
  drawhouse();
  drawFence();
}

resizeCanvases();
renderAll();

window.addEventListener("resize", () => {
  resizeCanvases();
  renderAll();
});
//update time every second
setInterval(drawTime, 1000);