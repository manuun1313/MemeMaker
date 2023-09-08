const imageFileInput = document.querySelector("#imageFileInput");
const canvas = document.querySelector("#meme");
const topTextInput = document.querySelector("#topTextInput");
const bottomTextInput = document.querySelector("#bottomTextInput");
const SpongebobTextInput = document.querySelector("#SpongebobTextInput");

let image;

imageFileInput.addEventListener("change", (e) => {
  const imageDataUrl = URL.createObjectURL(e.target.files[0]);

  image = new Image();
  image.src = imageDataUrl;

  image.addEventListener(
    "load",
    () => {
      updateMemeCanvas(
        canvas,
        image,
        topTextInput.value,
        bottomTextInput.value,
        SpongebobTextInput.value // Pass the Spongebob Mock text
      );
    },
    { once: true }
  );
});

topTextInput.addEventListener("change", () => {
  updateMemeCanvas(canvas, image, topTextInput.value, bottomTextInput.value, SpongebobTextInput.value);
});

bottomTextInput.addEventListener("change", () => {
  updateMemeCanvas(canvas, image, topTextInput.value, bottomTextInput.value, SpongebobTextInput.value);
});

SpongebobTextInput.addEventListener("change", () => {
  updateMemeCanvas(canvas, image, topTextInput.value, bottomTextInput.value, SpongebobTextInput.value);
});

function updateMemeCanvas(canvas, image, topText, bottomText, spongebobText) {
  const ctx = canvas.getContext("2d");
  const width = image.width;
  const height = image.height;
  const fontSize = Math.floor(width / 10);
  const yOffset = height / 25;

  // Update canvas background
  canvas.width = width;
  canvas.height = height;
  ctx.drawImage(image, 0, 0);

  // Prepare text
  ctx.strokeStyle = "black";
  ctx.lineWidth = Math.floor(fontSize / 4);
  ctx.fillStyle = "white";
  ctx.textAlign = "center";
  ctx.lineJoin = "round";
  ctx.font = `${fontSize}px sans-serif`;

  // Add top text
  ctx.textBaseline = "top";
  ctx.strokeText(topText, width / 2, yOffset);
  ctx.fillText(topText, width / 2, yOffset);

  // Add bottom text
  ctx.textBaseline = "bottom";
  ctx.strokeText(bottomText, width / 2, height - yOffset);
  ctx.fillText(bottomText, width / 2, height - yOffset);

  // Add Spongebob Mock text with randomized letter case
  ctx.textBaseline = "middle";
  ctx.font = `${fontSize}px sans-serif`;
  const spongebobMockedText = randomizeLetterCase(spongebobText);
  ctx.strokeText(spongebobMockedText, width / 2, height / 2);
  ctx.fillText(spongebobMockedText, width / 2, height / 2);
}

function randomizeLetterCase(text) {
  // Helper function to randomize letter case in a string
  return text
    .split("")
    .map((char) => (Math.random() < 0.5 ? char.toUpperCase() : char.toLowerCase()))
    .join("");
}
