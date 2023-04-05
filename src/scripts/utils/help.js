// find #back-button, onclick redirect to index.html
const backButton = document.querySelector("#back-button");
backButton.addEventListener("click", () => {
  window.open("index.html", "_self");
});