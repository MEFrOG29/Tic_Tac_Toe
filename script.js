const gameBoard = () => {
  const showGrid = (sections, grid) => {
    sections.forEach((sect) => {
      const section = document.createElement("div");
      section.classList.add("section");
      section.dataset.id = sect;
      section.addEventListener("click", (e) => {
        gameLogic.sectionClick(e.currentTarget);
      });
      grid.append(section);
    });
  };
  return { showGrid };
};

const createPlayer = (name, marker) => {
  let score = 0;
  const getScore = () => score;
  const addScore = () => score++;

  return { name, marker, getScore, addScore };
};

const gameLogic = () => {
  const sections = [1, 2, 3, 4, 5, 6, 7, 8, 9];
  const grid = document.querySelector(".grid");
  gameBoard.showGrid(sections, grid);
  const player1 = createPlayer("Вовчик", "X");
  const player2 = createPlayer("Вась", "O");
  let isFirstPlayer = true;
  const sectionClick = (sect) => {
    if (isFirstPlayer) {
      sect.classList.add("active-1");
      isFirstPlayer = !isFirstPlayer;
    } else {
      sect.classList.add("active-2");
      isFirstPlayer = !isFirstPlayer;
    }
  };

  const isWin = () => {};
  return { sectionClick };
};

gameLogic();
