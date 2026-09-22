const gameBoard = (onSectionClick) => {
  const showGrid = (sections, grid) => {
    sections.forEach((sect) => {
      const section = document.createElement("div");
      section.classList.add("section");
      section.dataset.id = sect;
      section.addEventListener("click", () => onSectionClick(section));
      grid.append(section);
    });
  };

  const showPlayer = (player, container) => {
    const printPlayer = document.createElement("p");
    printPlayer.classList.add("player");
    printPlayer.textContent = `${player.name}: ${player.getScore()}`;
    container.append(printPlayer);

    return (newScore) => {
      printPlayer.textContent = `${player.name}: ${newScore}`;
    };
  };

  return { showGrid, showPlayer };
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
  const playersContainer = document.querySelector(".players_container");
  const whoWinText = document.querySelector(".who_win");

  const restartDialog = document.querySelector(".restart_game_dialog");
  const newGameDialog = document.querySelector(".new_game_dialog");
  const form = document.querySelector(".new_game_form");
  const restartBtn = document.querySelector(".restart_btn");
  const newGameBtn = document.querySelector(".restart_new_btn");

  let player1;
  let player2;
  let updatePlayer1;
  let updatePlayer2;
  let currentPlayer;

  const winningCombinations = [
    [1, 2, 3],
    [4, 5, 6],
    [7, 8, 9],
    [1, 4, 7],
    [2, 5, 8],
    [3, 6, 9],
    [1, 5, 9],
    [3, 5, 7],
  ];

  const sectionClick = (sect) => {
    const currentClass = currentPlayer === player1 ? "active-1" : "active-2";
    sect.classList.add(currentClass);

    if (checkWin(currentPlayer.marker)) {
      whoWinText.textContent = `Победил ${currentPlayer.name}`;
      currentPlayer.addScore();

      if (currentPlayer === player1) {
        updatePlayer1(currentPlayer.getScore());
      } else {
        updatePlayer2(currentPlayer.getScore());
      }

      restartDialog.showModal();
      return;
    }

    if (checkDraw()) {
      whoWinText.textContent = "Ничья";
      restartDialog.showModal();
      return;
    }

    currentPlayer = currentPlayer === player1 ? player2 : player1;
  };

  const checkWin = (marker) => {
    const targetClass = marker === "X" ? "active-1" : "active-2";
    const allSections = document.querySelectorAll(".section");
    const playerMoves = [];

    allSections.forEach((section) => {
      if (section.classList.contains(targetClass)) {
        playerMoves.push(Number(section.dataset.id));
      }
    });

    return winningCombinations.some((combination) =>
      combination.every((index) => playerMoves.includes(index)),
    );
  };

  const checkDraw = () => {
    const allSections = document.querySelectorAll(".section");
    return Array.from(allSections).every(
      (sect) =>
        sect.classList.contains("active-1") ||
        sect.classList.contains("active-2"),
    );
  };

  const clearGrid = () => {
    const allSections = document.querySelectorAll(".section");
    allSections.forEach((sect) =>
      sect.classList.remove("active-1", "active-2"),
    );
  };

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const formData = new FormData(form);

    player1 = createPlayer(formData.get("first_player_name"), "X");
    player2 = createPlayer(formData.get("second_player_name"), "O");
    currentPlayer = player1;

    playersContainer.replaceChildren();
    updatePlayer1 = board.showPlayer(player1, playersContainer);
    updatePlayer2 = board.showPlayer(player2, playersContainer);

    clearGrid();
    newGameDialog.close();
  });

  restartBtn.addEventListener("click", () => {
    clearGrid();
    currentPlayer = player1;
    restartDialog.close();
  });

  newGameBtn.addEventListener("click", () => {
    restartDialog.close();
    form.reset();
    newGameDialog.showModal();
  });

  const board = gameBoard(sectionClick);
  board.showGrid(sections, grid);
  newGameDialog.showModal();

  return {};
};

gameLogic();
