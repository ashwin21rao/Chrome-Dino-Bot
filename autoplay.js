"use strict";

const kill = () => Runner.instance_.gameOver();

const keyDown = (code) =>
  document.dispatchEvent(new KeyboardEvent("keydown", { keyCode: code }));

const keyUp = (code) =>
  document.dispatchEvent(new KeyboardEvent("keyup", { keyCode: code }));

const roundDown = (num) => Math.floor(num * 10) / 10;

const calcMaxJumpDistance = function (runner, player, obstacle) {
  const u = -1 * player.tRex.config.INIITAL_JUMP_VELOCITY;
  const g = player.tRex.config.GRAVITY;
  const h0 =
    runner.defaultDimensions.HEIGHT - runner.config.BOTTOM_PAD - obstacle.yPos;
  const t = roundDown((u + (u ** 2 - 2 * g * h0) ** 0.5) / g);

  let v = roundDown(player.currentSpeed);
  if (obstacle.typeConfig.speedOffset) v = roundDown(v + obstacle.speedOffset);
  return roundDown(
    v * t +
      (roundDown(player.currentSpeed) < player.config.MAX_SPEED ? 0.5 : 0) *
        player.config.ACCELERATION *
        t ** 2
  );
};

const autoPlay = function () {
  const instance = Runner.instance_;
  const obstacle = instance.horizon.obstacles.find(
    (obs) => obs.xPos > instance.tRex.xPos + Trex.config.WIDTH
  );

  if (instance.tRex.jumping || !obstacle);
  else {
    const buffer = 15;

    if (obstacle.typeConfig.type === "PTERODACTYL" && obstacle.yPos === 50);
    else if (
      obstacle.xPos + obstacle.width - instance.tRex.xPos <
      calcMaxJumpDistance(Runner, instance, obstacle) - buffer
    )
      keyDown(38), keyUp(38);
  }

  // if (instance.distanceMeter.getActualDistance(instance.distanceRan) === 99999)
  //   kill();

  requestAnimationFrame(autoPlay);
};

requestAnimationFrame(autoPlay);
