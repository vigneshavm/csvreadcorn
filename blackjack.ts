// blackjack.ts

import readline from 'readline';

// ----- Types -----
type Suit = 'S' | 'H' | 'D' | 'C'; // Spades, Hearts, Diamonds, Clubs
type Value = 'A' | '2' | '3' | '4' | '5' | '6' | '7' | '8' | '9' | 'T' | 'J' | 'Q' | 'K';
type Card = `${Value}${Suit}`;

// ----- Readline setup -----
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

function questionAsync(query: string): Promise<string> {
  return new Promise(resolve => rl.question(query, resolve));
}

// ----- Create and shuffle deck -----
function createDeck(): Card[] {
  const suits: Suit[] = ['S', 'H', 'D', 'C'];
  const values: Value[] = ['A','2','3','4','5','6','7','8','9','T','J','Q','K'];
  const deck: Card[] = [];
  for (const suit of suits) {
    for (const value of values) {
      deck.push(`${value}${suit}`);
    }
  }
  return deck;
}

function shuffle(deck: Card[]): Card[] {
  for (let i = deck.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [deck[i], deck[j]] = [deck[j], deck[i]];
  }
  return deck;
}

// ----- Compute card value -----
function getCardValue(card: Card): number {
  const value = card[0];
  if (value === 'A') return 11;
  if (['T','J','Q','K'].includes(value)) return 10;
  return parseInt(value);
}

// ----- Calculate hand total -----
function calculateHand(hand: Card[]): number {
  let total = 0;
  let aces = 0;

  for (const card of hand) {
    total += getCardValue(card);
    if (card[0] === 'A') aces++;
  }

  while (total > 21 && aces > 0) {
    total -= 10;
    aces--;
  }

  return total;
}

// ----- Display hand -----
function displayHand(player: string, hand: Card[]): void {
  console.log(`${player} Hand: ${hand.join(', ')} (Total: ${calculateHand(hand)})`);
}

// ----- Deal hand -----
function dealHand(deck: Card[], n: number): Card[] {
  if (n > deck.length) throw new Error('Not enough cards in deck');
  return deck.splice(0, n);
}

// ----- Main game loop -----
async function blackjack(): Promise<void> {
  const deck = shuffle(createDeck());
  const playerHand: Card[] = dealHand(deck, 2);
  const dealerHand: Card[] = dealHand(deck, 2);

  displayHand('Player', playerHand);
  console.log(`Dealer shows: ${dealerHand[0]}`);

  // Player turn
  while (true) {
    const total = calculateHand(playerHand);
    if (total > 21) {
      console.log('Player busts! Dealer wins.');
      rl.close();
      return;
    }

    const action = await questionAsync('Hit or Stand? (h/s): ');
    if (action.toLowerCase() === 'h') {
      playerHand.push(deck.shift()!);
      displayHand('Player', playerHand);
    } else {
      break;
    }
  }

  // Dealer turn
  displayHand('Dealer', dealerHand);
  while (calculateHand(dealerHand) < 17) {
    dealerHand.push(deck.shift()!);
    displayHand('Dealer', dealerHand);
  }

  const playerTotal = calculateHand(playerHand);
  const dealerTotal = calculateHand(dealerHand);

  if (dealerTotal > 21) console.log('Dealer busts! Player wins!');
  else if (playerTotal > dealerTotal) console.log('Player wins!');
  else if (playerTotal < dealerTotal) console.log('Dealer wins!');
  else console.log("Push! It's a tie.");

  rl.close();
}

// ----- Start Game -----
blackjack();
