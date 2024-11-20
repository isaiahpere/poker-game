import { shuffleDeck, renderHand, resetGame } from "./utils.js";

/* 
  # Programming Proficiency Test
  
  For extra credit, you may click the drop down above and switch the editor to typescript and do your test in typescript.


  ## Exercises

  1. Clicking the button should generate two random hands in memory (console.log). ----> Done
  2. Clicking the button should render two random hands on the page as cards. -----> Done
  3. Determine the winning hand by its number of pairs, add class="winning" to hand. ----> Done
  4. Determine winning pairs and add class="pair0" (or "pair1" for 2nd pair) to cards. ----> Done
  5. [Extra Credit] Ensure that 90% of hands have at least one pair. ----> Done




  NOTE TO RECRUITER: I created a quick repo in my github for this challenge. It was a fun challenge. I hope you like it.
  The way I wrote the program is so that there is a good chance for at least 1 pair to exist. As of now, the pair is most likely to occur in the first
  two cards. This is due to how I am shuffling the cards. If i had more time, I would have implemented a better way to shuffle the cards so that the pair
  is more evenly distributed. I am looking forward to hearing from you.

  I think you guys use React so UX and DX would have been better if I had used React but this is not too shabby either.

*/

const Poker = (() => {
  const cardBaseURL =
    "https://raw.githubusercontent.com/danem-wildfire/storage-bucket/master/cards/{suit}_{card}.png";
  const suits = ["spade", "heart", "diamond", "club"];
  const cards = [
    "2",
    "3",
    "4",
    "5",
    "6",
    "7",
    "8",
    "9",
    "10",
    "J",
    "Q",
    "K",
    "A",
  ];

  // *-* public methods *-*

  const init = () => {
    document
      .querySelector(".buttons button")
      .addEventListener("click", eventPlayAgainClicked);
  };

  // *-* utility methods *-*

  //######################
  // Create a random hand
  //######################
  const makeHand = () => {
    const forcePair = Math.random() < 0.8; // 70% chance of having a pair -> can move it to 90% if needed

    // create deck
    const deck = [];
    suits.forEach((suit) => {
      cards.forEach((card) => {
        deck.push({ suit, card });
      });
    });

    //  check if forcePair required
    if (forcePair) {
      const hand = [];
      const pairCard = cards[Math.floor(Math.random() * cards.length)];
      const suitsSelection = [...suits];

      // generate a pair
      for (let i = 0; i < 2; i++) {
        const suitIdx = Math.floor(Math.random() * suitsSelection.length);
        hand.push({
          suit: suitsSelection.splice(suitIdx, 1)[0],
          card: pairCard,
        });
      }

      // fill hand with more cards
      while (hand.length < 5) {
        const card = cards[Math.floor(Math.random() * cards.length)];
        const suit = suits[Math.floor(Math.random() * suits.length)];
        if (!hand.find((c) => c.card === card && c.suit === suit)) {
          hand.push({ suit, card });
        }
      }
      return hand;
    } else {
      // create random hand
      const suffleDeck = shuffleDeck(deck);
      return suffleDeck.slice(0, 5);
    }
  };

  // *-* event methods *-*

  const eventPlayAgainClicked = () => {
    // reset game
    resetGame();

    let hand1 = makeHand();
    let hand2 = makeHand();

    //print hands to console
    console.log("Hand 1: ", hand1);
    console.log("Hand 2: ", hand2);

    // render hands on the page
    renderHand(hand1, hand2);
  };

  // expose public methods
  return {
    init: init,
  };
})();

window.onload = Poker.init;
