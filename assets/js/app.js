// We import the CSS which is extracted to its own file by esbuild.
// Remove this line if you add a your own CSS build pipeline (e.g postcss).
import "../css/app.css";

// If you want to use Phoenix channels, run `mix help phx.gen.channel`
// to get started and then uncomment the line below.
// import "./user_socket.js"

// You can include dependencies in two ways.
//
// The simplest option is to put them in assets/vendor and
// import them using relative paths:
//
//     import "../vendor/some-package.js"
//
// Alternatively, you can `npm install some-package --prefix assets` and import
// them using a path starting with the package name:
//
//     import "some-package"
//

// Include phoenix_html to handle method=PUT/DELETE in forms and buttons.
import "phoenix_html";
// Establish Phoenix Socket and LiveView configuration.
import { Socket } from "phoenix";
import { LiveSocket } from "phoenix_live_view";
import topbar from "../vendor/topbar";
import { Winwheel } from "../vendor/Winwheel";

let csrfToken = document
  .querySelector("meta[name='csrf-token']")
  .getAttribute("content");
let liveSocket = new LiveSocket("/live", Socket, {
  params: { _csrf_token: csrfToken },
});

// Show progress bar on live navigation and form submits
topbar.config({ barColors: { 0: "#29d" }, shadowColor: "rgba(0, 0, 0, .3)" });
window.addEventListener("phx:page-loading-start", (info) => topbar.show());
window.addEventListener("phx:page-loading-stop", (info) => topbar.hide());

// connect if there are any LiveViews on the page
liveSocket.connect();

// expose liveSocket on window for web console debug logs and latency simulation:
// >> liveSocket.enableDebug()
// >> liveSocket.enableLatencySim(1000)  // enabled for duration of browser session
// >> liveSocket.disableLatencySim()
window.liveSocket = liveSocket;

const wheelOpts = {
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
    callbackAfter: "drawTriangle()",
    callbackFinished: alertPrize,
  },
};

// Called when the animation has finished.
function alertPrize(indicatedSegment) {
  // Do basic alert of the segment text.
  alert("You have won " + indicatedSegment.text);
}

function drawTriangle() {
  // Get the canvas context the wheel uses.
  let ctx = theWheel.ctx;

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

window.calculatePrize = function (prize) {
  const theWheel = new Winwheel(wheelOpts);
  drawTriangle();
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

  console.log(theWheel.animation);
  // Important thing is to set the stopAngle of the animation before stating the spin.
  theWheel.animation.stopAngle = stopAt;

  // May as well start the spin from here.
  theWheel.startAnimation();
};

const theWheel = new Winwheel(wheelOpts);
drawTriangle();
