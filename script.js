const filters = {
  brightness: { value: 100, min: 0, max: 200 },
  contrast: { value: 100, min: 0, max: 200 },
  saturate: { value: 100, min: 0, max: 200 },
  hueRotate: { value: 0, min: 0, max: 360 },
  blur: { value: 0, min: 0, max: 20 },
  grayscale: { value: 0, min: 0, max: 100 },
  sepia: { value: 0, min: 0, max: 100 },
  opacity: { value: 100, min: 0, max: 100 },
  invert: { value: 0, min: 0, max: 100 },
};

const presetValues = {
  drama: {
    brightness: 110,
    contrast: 140,
    saturate: 130,
    hueRotate: 0,
    blur: 0,
    grayscale: 0,
    sepia: 0,
    opacity: 100,
    invert: 0,
  },
  vintage: {
    brightness: 105,
    contrast: 110,
    saturate: 80,
    hueRotate: 0,
    blur: 0,
    grayscale: 0,
    sepia: 40,
    opacity: 100,
    invert: 0,
  },
  oldschool: {
    brightness: 100,
    contrast: 120,
    saturate: 70,
    hueRotate: 0,
    blur: 0,
    grayscale: 30,
    sepia: 20,
    opacity: 100,
    invert: 0,
  },
  cyberpunk: {
    brightness: 120,
    contrast: 150,
    saturate: 160,
    hueRotate: 270,
    blur: 0,
    grayscale: 0,
    sepia: 0,
    opacity: 100,
    invert: 0,
  },
  softglow: {
    brightness: 110,
    contrast: 105,
    saturate: 110,
    hueRotate: 0,
    blur: 2,
    grayscale: 0,
    sepia: 0,
    opacity: 100,
    invert: 0,
  },
  faded: {
    brightness: 105,
    contrast: 90,
    saturate: 80,
    hueRotate: 0,
    blur: 0,
    grayscale: 10,
    sepia: 0,
    opacity: 100,
    invert: 0,
  },
};

const img = document.getElementById("preview");
const placeholder = document.querySelector(".placeholder");
const filtersBox = document.querySelector(".filters");
const inputImg = document.getElementById("imageInput");

function applyFilters() {
  img.style.filter = `
    brightness(${filters.brightness.value}%)
    contrast(${filters.contrast.value}%)
    saturate(${filters.saturate.value}%)
    hue-rotate(${filters.hueRotate.value}deg)
    blur(${filters.blur.value}px)
    grayscale(${filters.grayscale.value}%)
    sepia(${filters.sepia.value}%)
    opacity(${filters.opacity.value}%)
    invert(${filters.invert.value}%)
  `;
}

function createFilter(name, data) {
  const div = document.createElement("div");
  div.className = "filter-container";

  const label = document.createElement("p");
  label.innerText = name;

  const input = document.createElement("input");
  input.type = "range";
  input.min = data.min;
  input.max = data.max;
  input.value = data.value;
  input.id = name;

  input.oninput = () => {
    data.value = input.value;
    applyFilters();
  };

  div.append(label, input);
  filtersBox.appendChild(div);
}

Object.keys(filters).forEach((key) => createFilter(key, filters[key]));

inputImg.onchange = (e) => {
  img.src = URL.createObjectURL(e.target.files[0]);
  img.style.display = "block";
  placeholder.style.display = "none";
  applyFilters();
};

document.querySelectorAll(".presets button").forEach((btn) => {
  btn.onclick = () => {
    const preset = presetValues[btn.dataset.preset];
    Object.keys(preset).forEach((key) => {
      filters[key].value = preset[key];
      document.getElementById(key).value = preset[key];
    });
    applyFilters();
  };
});

document.getElementById("reset-btn").onclick = () => location.reload();

document.getElementById("download-btn").onclick = () => {
  if (!img.src) return alert("Choose image first");

  const canvas = document.createElement("canvas");
  const ctx = canvas.getContext("2d");

  canvas.width = img.naturalWidth;
  canvas.height = img.naturalHeight;

  ctx.filter = img.style.filter;
  ctx.drawImage(img, 0, 0);

  const link = document.createElement("a");
  link.download = "edited-image.png";
  link.href = canvas.toDataURL();
  link.click();
};

const imageBox = document.querySelector(".bottom");

imageBox.addEventListener("mousemove", (e) => {
  const rect = imageBox.getBoundingClientRect();
  const x = e.clientX - rect.left;
  const y = e.clientY - rect.top;

  const centerX = rect.width / 2;
  const centerY = rect.height / 2;

  const rotateX = -(y - centerY) / 25;
  const rotateY = (x - centerX) / 25;

  img.style.transform = `
    rotateX(${rotateX}deg)
    rotateY(${rotateY}deg)
    scale(1.03)
  `;
});

imageBox.addEventListener("mouseleave", () => {
  img.style.transform = "rotateX(0) rotateY(0) scale(1)";
});
