window.scrollTo(0, document.body.scrollHeight);

window.onbeforeunload = function () {
    window.scrollTo(0, document.body.scrollHeight);
};

const img = document.getElementById("map");
let freeze = false;

img.onmousemove = (e) => {
  if (freeze) return;
  const clickY = e.pageY - img.offsetTop;

  const percentYImg = (clickY * 100) / img.height;
  const progress = Math.round((100 - percentYImg + Number.EPSILON) * 100) / 100;
  document.getElementById("percentage").innerText =
    Math.max(0, Math.min(progress, 100)) + "%";
};

img.onclick = () => {
  freeze = !freeze;

  document.getElementById("frozen").innerText = freeze ? "unfreeze" : "freeze";
};
