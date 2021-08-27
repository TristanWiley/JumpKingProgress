const img = document.getElementById("map");
let freeze = false;

const maps = {
  original: {
    displayName: "Original",
    image: "map.jpeg",
  },
  nbplus: {
    displayName: "New Babe+",
    image: "nbplus.jpeg",
  },
  boa: {
    displayName: "Babe Of Ascension",
    image: "boa.png",
  },
};

let currentMap = getCookie("CURRENT_MAP") || "original";

updateMap(currentMap);

document.getElementById("maps").innerHTML = Object.entries(maps)
  .map(
    ([id, details]) =>
      `<option ${id === currentMap ? "selected" : ""} value="${id}">${
        details.displayName
      }</option>`
  )
  .join("");

document.getElementById("maps").onchange = (e) => {
  setCookie("CURRENT_MAP", e.target.value, 360);
  updateMap(e.target.value);
};

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

function updateMap(mapID) {
  document.getElementById("map").src = maps[mapID].image;
  document.getElementById("percentage").innerText = "Hover on image";
  freeze = false;
  document.getElementById("frozen").innerText = "freeze";
}

// Cookie helper functions
function getCookie(cname) {
  let name = cname + "=";
  let decodedCookie = decodeURIComponent(document.cookie);
  let ca = decodedCookie.split(";");
  for (let i = 0; i < ca.length; i++) {
    let c = ca[i];
    while (c.charAt(0) == " ") {
      c = c.substring(1);
    }
    if (c.indexOf(name) == 0) {
      return c.substring(name.length, c.length);
    }
  }
  return "";
}

function setCookie(cname, cvalue, exdays) {
  const d = new Date();
  d.setTime(d.getTime() + exdays * 24 * 60 * 60 * 1000);
  let expires = "expires=" + d.toUTCString();
  document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
}
