const identifyWinner = (hand1, hand2) => {
  let hand1Section = document.getElementById("player1");
  let hand2Section = document.getElementById("player2");

  const hand1Pairs = countHandPairs(hand1);
  const hand2Pairs = countHandPairs(hand2);

  // Print out the number of pairs for each hand
  console.log("Hand 1 Pairs", hand1Pairs);
  console.log("Hand 2 Pairs", hand2Pairs);

  if (hand1Pairs > hand2Pairs) {
    hand1Section.classList.add("winning");
  } else if (hand2Pairs > hand1Pairs) {
    hand2Section.classList.add("winning");
  } else {
    hand1Section.classList.add("tie");
    hand2Section.classList.add("tie");
  }
};

const processPairs = (container) => {
  // Extract card values from `alt` attributes
  const cards = Array.from(container.querySelectorAll(".card"));
  const cardValues = cards.map((card) => card.alt.split(" ")[0]); // get values of hand [2, J, 4, 5, K]

  // Count occurrences of each card value
  const valueCounts = {};
  cardValues.forEach((value, index) => {
    if (!valueCounts[value]) valueCounts[value] = [];
    valueCounts[value].push(cards[index]);
  });

  let pairCount = 0;
  for (const [value, elements] of Object.entries(valueCounts)) {
    if (elements.length === 2) {
      const pairClass = `pair${pairCount}`;
      elements.forEach((element) => element.classList.add(pairClass));
      pairCount++;
      if (pairCount >= 2) break; // Stop after two pairs
    }
  }
};

const countHandPairs = (hand) => {
  const cardCounts = {};

  hand.forEach(({ card }) => {
    cardCounts[card] = (cardCounts[card] || 0) + 1;
  });

  let pairs = 0;
  Object.values(cardCounts).forEach((count) => {
    if (count === 2) {
      pairs++;
    }
  });

  return pairs;
};

export const shuffleDeck = (deck) => {
  // add more "randomness" to the game
  for (let i = deck.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [deck[i], deck[j]] = [deck[j], deck[i]];
  }
  return deck;
};

const generateHandCards = (hand, playerContainer) => {
  const cardBaseURL =
    "https://raw.githubusercontent.com/danem-wildfire/storage-bucket/master/cards/{suit}_{card}.png";

  hand.forEach((card) => {
    let cardImage = document.createElement("img");
    cardImage.src = cardBaseURL
      .replace("{suit}", card.suit)
      .replace("{card}", card.card);
    cardImage.alt = `${card.card} of ${card.suit}s`;
    cardImage.classList.add("card");

    playerContainer.append(cardImage);
  });
};

export const renderHand = (hand1, hand2) => {
  let player1Container = document.querySelector(".player1");
  let player2Container = document.querySelector(".player2");

  generateHandCards(hand1, player1Container);
  generateHandCards(hand2, player2Container);

  processPairs(player1Container);
  processPairs(player2Container);

  identifyWinner(hand1, hand2);

  console.log("--------------------"); // Add a separator between hands
};

export const resetGame = () => {
  document.getElementById("player1").classList.remove("winning", "tie");
  document.getElementById("player2").classList.remove("winning", "tie");
  document.querySelector(".player1").innerHTML = "";
  document.querySelector(".player2").innerHTML = "";
  return;
};
