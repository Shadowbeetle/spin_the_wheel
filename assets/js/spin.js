import Alpine from "alpinejs";
import { Winwheel } from "../vendor/Winwheel";

let winWheel;

function getWinWheel() {
  return winWheel;
}

export function setupGameStore() {
  Alpine.data("game", (init) => {
    Alpine.store("game", init);
    return init;
  });
}

function drawTriangle(ctx) {
  // Get the canvas context the wheel uses.

  ctx.strokeStyle = "navy"; // Set line colour.
  ctx.fillStyle = "aqua"; // Set fill colour.
  ctx.lineWidth = 2;
  ctx.lineWidth = 2;
  ctx.beginPath(); // Begin path.
  ctx.moveTo(145, 5); // Move to initial position.
  ctx.lineTo(205, 5); // Draw lines to make the shape.
  ctx.lineTo(175, 40);
  ctx.lineTo(146, 5);
  ctx.stroke(); // Complete the path by stroking (draw lines).
  ctx.fill();
}

function afterSpin() {
  Alpine.store("game").displayedBalance = Alpine.store("game").balance;
  Alpine.store("game").displayedHiscore = Alpine.store("game").hiscore;
}

export const SpinHook = {
  mounted() {
    winWheel = new Winwheel(this.wheelOpts);
    drawTriangle(winWheel.ctx);
    this.handleEvent("spin", ({ result, newBalance, newHiscore }) => {
      Alpine.store("game").balance = newBalance;
      Alpine.store("game").hiscore = newHiscore;

      console.log(Alpine.store("game"));
      this.calculatePrize(result);
    });
  },
  wheelOpts: {
    numSegments: 12,
    outerRadius: 170,
    segments: [
      { fillStyle: "#89f26e", text: "Double" },
      { fillStyle: "#000000", textFillStyle: "#ffffff", text: "Bankrupt" },
      { fillStyle: "#7de6ef", text: "Keep" },
      { fillStyle: "#89f26e", text: "Double" },
      { fillStyle: "#000000", textFillStyle: "#ffffff", text: "Bankrupt" },
      { fillStyle: "#7de6ef", text: "Keep" },
      { fillStyle: "#89f26e", text: "Double" },
      { fillStyle: "#000000", textFillStyle: "#ffffff", text: "Bankrupt" },
      { fillStyle: "#7de6ef", text: "Keep" },
      { fillStyle: "#89f26e", text: "Double" },
      { fillStyle: "#000000", textFillStyle: "#ffffff", text: "Bankrupt" },
      { fillStyle: "#7de6ef", text: "Keep" },
    ],
    animation: {
      type: "spinToStop",
      duration: 5,
      spins: 8,
      callbackAfter: `${drawTriangle.name}(${getWinWheel.name}().ctx)`,
      callbackFinished: afterSpin,
    },
  },
  calculatePrize(prize) {
    winWheel = new Winwheel(this.wheelOpts);
    drawTriangle(winWheel.ctx);
    // We add padding to the actual border of the result to make it more obvious
    const ANGLE_PADDING = 5;
    const PRIZE_DEGREE = 30;

    const prizeToAngle = {
      double: 0 + ANGLE_PADDING,
      bankrupt: PRIZE_DEGREE + ANGLE_PADDING,
      keep: PRIZE_DEGREE * 2 + ANGLE_PADDING,
    };

    let stopAt =
      prizeToAngle[prize] +
      Math.floor(Math.random() * (PRIZE_DEGREE - ANGLE_PADDING));

    console.log(winWheel.animation);
    // Important thing is to set the stopAngle of the animation before stating the spin.
    winWheel.animation.stopAngle = stopAt;

    // May as well start the spin from here.
    winWheel.startAnimation();
  },
};
