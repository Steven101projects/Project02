(() => {
  const cvs = document.getElementById("gameCanvas"),
        ctx = cvs.getContext("2d"),
        ga = document.getElementById("gamearea"),
        r  = ga.getBoundingClientRect(),
        sc = window.devicePixelRatio || 1;
  
  // Hi-DPI setup
  cvs.width  = r.width * sc;
  cvs.height = r.height * sc;
  cvs.style.cssText = `width:${r.width}px;height:${r.height}px`;
  ctx.scale(sc, sc);
  
  const cw = cvs.width / sc,
        ch = cvs.height / sc,
        midX = cw / 2,
        midY = ch / 2;
  
  let started = false,
      paused  = false,
      keys    = {};
  
  // Paddle factory
  const mkPad = x => ({ x, y: midY-30, w:10, h:60, s:6 });
  const player = mkPad(20),
        ai     = mkPad(cw - 30);
  
  // Ball state
  const ball = { x:midX, y:midY, s:8, dx:4, dy:4 };
  
  // Input
  window.onkeydown = e => {
    if (!started && e.key === "Enter") started = true;
    else if (started && (e.key==="p"||e.key==="P")) paused = !paused;
    else keys[e.key] = 1;
  };
  window.onkeyup = e => { keys[e.key] = 0; };
  
  // Reset ball toward `dir` (1=right, -1=left)
  const reset = dir => {
    ball.x = midX; ball.y = midY;
    ball.dx = (dir|| (Math.random()<.5 ? -1:1)) * 4;
    ball.dy = (Math.random()*2-1)*4;
  };
  
  // Draw any full-screen message
  const msg = t => {
    ctx.fillStyle = "black"; ctx.fillRect(0,0,cw,ch);
    ctx.fillStyle = "white";
    ctx.font = "10px 'Press Start 2P'";
    ctx.textAlign = "center";
    ctx.fillText(t, midX, midY);
  };
  
  // Main loop
  (function loop() {
    if (!started) {
      msg("Press Enter to Start");
    }
    else if (paused) {
      msg("Paused - Press P to Resume");
    }
    else {
      // --- Update ---
      if (keys["w"]||keys["W"]) player.y -= player.s;
      if (keys["s"]||keys["S"]) player.y += player.s;
      player.y = Math.max(0, Math.min(ch-player.h, player.y));
      
      // Simple AI
      ai.y += ball.y < ai.y+ai.h/2 ? -ai.s : ball.y > ai.y+ai.h/2 ? ai.s : 0;
      ai.y = Math.max(0, Math.min(ch-ai.h, ai.y));
      
      // Ball physics
      ball.x += ball.dx; ball.y += ball.dy;
      if (ball.y <= 0 || ball.y >= ch-ball.s) ball.dy *= -1;
      
      // Paddle collisions
      if (ball.x <= player.x+player.w
        && ball.y+ball.s >= player.y
        && ball.y <= player.y+player.h) {
        ball.dx *= -1; ball.x = player.x+player.w;
      }
      if (ball.x+ball.s >= ai.x
        && ball.y+ball.s >= ai.y
        && ball.y <= ai.y+ai.h) {
        ball.dx *= -1; ball.x = ai.x - ball.s;
      }
      
      // Score?
      if (ball.x < 0 || ball.x > cw) reset(ball.x<0?1:-1);
      
      // --- Draw ---
      ctx.fillStyle = "black"; ctx.fillRect(0,0,cw,ch);
      ctx.fillStyle = "gray";
      for (let y=0; y<ch; y+=15) ctx.fillRect(midX-1, y, 2, 10);
      ctx.fillStyle = "white";
      ctx.fillRect(player.x, player.y, player.w, player.h);
      ctx.fillRect(ai.x, ai.y, ai.w, ai.h);
      ctx.fillStyle = "yellow";
      ctx.fillRect(ball.x, ball.y, ball.s, ball.s);
    }
    requestAnimationFrame(loop);
  })();
  
  reset();  
})();