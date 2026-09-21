const gameBoard = (() => {
  const sections = [1, 2, 3, 4, 5, 6, 7, 8, 9];
  let isFirstPlayer = true;
  const grid = document.querySelector(".grid");

  sections.forEach((sect) => {
    const section = document.createElement("div");
    section.classList.add("section");
    section.dataset.id = sect;
    section.addEventListener("click", (e) => {
      if (isFirstPlayer) {
        e.currentTarget.classList.add("active-1");
        isFirstPlayer = !isFirstPlayer;
      } else {
        e.currentTarget.classList.add("active-2");
        isFirstPlayer = !isFirstPlayer;
      }
    });
    grid.append(section);
  });
})();

function Player(name) {
  let userName = name;
  let score = 0;

  const getScore = () => score;
  const addScore = () => {
    score++;
  };

  return { userName, getScore, addScore };
}
