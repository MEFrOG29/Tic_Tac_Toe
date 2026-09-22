const gameBoard = (onSectionClick) => {
  const showGrid = (sections, grid) => {
    sections.forEach((sect) => {
      const section = document.createElement("div");
      section.classList.add("section");
      section.dataset.id = sect;
      section.addEventListener("click", (e) => {
        onSectionClick(section);
      });
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
  const player1 = createPlayer(prompt("Введите имя первого игрока"), "X");
  const player2 = createPlayer(prompt("Введите имя второго игрока"), "O");
  let currentPlayer = player1;
  const winningCombinations = [
    [1, 2, 3],
    [3, 4, 5],
    [7, 8, 9],
    [1, 4, 7],
    [2, 5, 8],
    [3, 6, 9],
    [1, 5, 9],
    [3, 5, 7],
  ];

  const sectionClick = (sect) => {
    if (currentPlayer == player1) {
      sect.classList.add("active-1");
    } else {
      sect.classList.add("active-2");
    }

    if (checkWin(currentPlayer.marker)) {
      alert(`Победил игрок ${currentPlayer.name}!`);
      currentPlayer.addScore();
      if (currentPlayer === player1) {
        updatePlayer1(currentPlayer.getScore());
      } else {
        updatePlayer2(currentPlayer.getScore());
      }
      newGame();
    } else if (checkDraw()) {
      alert("Ничья");
      restart();
    }

    currentPlayer = currentPlayer === player1 ? player2 : player1;
  };

  const checkWin = (marker) => {
    const playerMoves = [];
    const allSections = document.querySelectorAll(".section");
    allSections.forEach((section) => {
      const targetClass = marker === "X" ? "active-1" : "active-2";
      if (section.classList.contains(targetClass)) {
        playerMoves.push(Number(section.dataset.id));
      }
    });

    return winningCombinations.some((combination) => {
      return combination.every((index) => playerMoves.includes(index));
    });
  };

  const checkDraw = () => {
    const allSections = document.querySelectorAll(".section");
    const isBoardFull = Array.from(allSections).every(
      (sect) =>
        sect.classList.contains("active-1") ||
        sect.classList.contains("active-2"),
    );
    return isBoardFull;
  };

  const restart = () => {
    allSections = document.querySelectorAll(".section");
    allSections.forEach((sect) => {
      if (sect.classList.contains("active-1")) {
        sect.classList.remove("active-1");
      }
      if (sect.classList.contains("active-2")) {
        sect.classList.remove("active-2");
      }
    });
  };

  const newGameDialog = () => {
    const body = document.querySelector("body");
    const dialog = document.querySelector(".new_game_dialog");
  };

  const board = gameBoard(sectionClick);
  board.showGrid(sections, grid);
  const updatePlayer1 = board.showPlayer(player1, playersContainer);
  const updatePlayer2 = board.showPlayer(player2, playersContainer);
  return {};
};

gameLogic();
