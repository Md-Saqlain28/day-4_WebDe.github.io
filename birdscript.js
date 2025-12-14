let bird = $("#bird");
let birdY = 200;
let gravity = 2;
let score = 0;

function createPipe() {
  let gap = 140;
  let pipeTopHeight = Math.random() * 200 + 50;
  let pipeBottomHeight = 600 - (pipeTopHeight + gap);

  let pipeTop = $("<div class='pipe'></div>");
  pipeTop.css({ left: "100%", top: 0, height: pipeTopHeight });

  let pipeBottom = $("<div class='pipe'></div>");
  pipeBottom.css({
    left: "100%",
    top: pipeTopHeight + gap,
    height: pipeBottomHeight,
  });

  $("body").append(pipeTop, pipeBottom);
  pipeTop.animate({ left: "-100px" }, 3000, "linear", function () {
    $(this).remove();
    score++;
    $("#scorebox").text("Score: " + score);
  });

  pipeBottom.animate({ left: "-100px" }, 3000, "linear", function () {
    $(this).remove();
  });

  let checkcollison = setInterval(function () {
    let birPop = bird[0].getBoundingClientRect();
    let topPop = pipeTop[0].getBoundingClientRect();
    let bottomPop = pipeBottom[0].getBoundingClientRect();

    if (
      (birPop.left < topPop.right &&
        birPop.right > topPop.left &&
        birPop.top < topPop.bottom) ||
      (birPop.left < bottomPop.right &&
        birPop.right > bottomPop.left &&
        birPop.bottom > bottomPop.top)
    ) {
      alert("The Game is over Dear! Your Score is: " + score);
      location.reload();
    }
  }, 30);
}

setInterval(function () {
  birdY += gravity;
  bird.css("top", birdY + "px");
}, 30);
$(document).keydown(function (e) {
  if (e.key === " ") {
    birdY -= 50;
  }
});

setInterval(createPipe, 2500);
