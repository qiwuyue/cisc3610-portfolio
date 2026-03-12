function resizeCanvases() {
  const bgCanvas = document.getElementById("cartoonCanvas");
  const timeCanvas = document.getElementById("time");

  bgCanvas.width = window.innerWidth;
  bgCanvas.height = window.innerHeight;

  timeCanvas.width = window.innerWidth;
  timeCanvas.height = window.innerHeight;
}

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

  const time = hours + ":" + minutes + ":" + seconds;

  ctx.clearRect(0, 0, canvas.width, canvas.height);
  





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
  let grd = ctx.createLinearGradient(0, canvas.height - 100, 0, canvas.height);

  grd.addColorStop(0, "rgba(8, 161, 3, 0.49)");
  grd.addColorStop(0.5, "rgba(161, 98, 3, 0.74)");
  grd.addColorStop(1, "rgba(173, 107, 7, 0.84)");
  ctx.fillStyle = grd;
  ctx.fillRect(0, canvas.height - 100, canvas.width, 100);
  ctx.fillStyle = "rgba(255, 255, 255, 0.17)";
  ctx.fillRect(0, canvas.height - 100 - 5, canvas.width, 5);
  
}

function renderAll() {
  draw();
  drawTime();
  ground();
}

resizeCanvases();
renderAll();

window.addEventListener("resize", () => {
  resizeCanvases();
  renderAll();
});

setInterval(drawTime, 1000);