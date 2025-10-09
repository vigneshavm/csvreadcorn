"use strict";
// blackjack.ts
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g = Object.create((typeof Iterator === "function" ? Iterator : Object).prototype);
    return g.next = verb(0), g["throw"] = verb(1), g["return"] = verb(2), typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
var readline_1 = require("readline");
// ----- Readline setup -----
var rl = readline_1.default.createInterface({
    input: process.stdin,
    output: process.stdout
});
function questionAsync(query) {
    return new Promise(function (resolve) { return rl.question(query, resolve); });
}
// ----- Create and shuffle deck -----
function createDeck() {
    var suits = ['S', 'H', 'D', 'C'];
    var values = ['A', '2', '3', '4', '5', '6', '7', '8', '9', 'T', 'J', 'Q', 'K'];
    var deck = [];
    for (var _i = 0, suits_1 = suits; _i < suits_1.length; _i++) {
        var suit = suits_1[_i];
        for (var _a = 0, values_1 = values; _a < values_1.length; _a++) {
            var value = values_1[_a];
            deck.push("".concat(value).concat(suit));
        }
    }
    return deck;
}
function shuffle(deck) {
    var _a;
    for (var i = deck.length - 1; i > 0; i--) {
        var j = Math.floor(Math.random() * (i + 1));
        _a = [deck[j], deck[i]], deck[i] = _a[0], deck[j] = _a[1];
    }
    return deck;
}
// ----- Compute card value -----
function getCardValue(card) {
    var value = card[0];
    if (value === 'A')
        return 11;
    if (['T', 'J', 'Q', 'K'].includes(value))
        return 10;
    return parseInt(value);
}
// ----- Calculate hand total -----
function calculateHand(hand) {
    var total = 0;
    var aces = 0;
    for (var _i = 0, hand_1 = hand; _i < hand_1.length; _i++) {
        var card = hand_1[_i];
        total += getCardValue(card);
        if (card[0] === 'A')
            aces++;
    }
    while (total > 21 && aces > 0) {
        total -= 10;
        aces--;
    }
    return total;
}
// ----- Display hand -----
function displayHand(player, hand) {
    console.log("".concat(player, " Hand: ").concat(hand.join(', '), " (Total: ").concat(calculateHand(hand), ")"));
}
// ----- Deal hand -----
function dealHand(deck, n) {
    if (n > deck.length)
        throw new Error('Not enough cards in deck');
    return deck.splice(0, n);
}
// ----- Main game loop -----
function blackjack() {
    return __awaiter(this, void 0, void 0, function () {
        var deck, playerHand, dealerHand, total, action, playerTotal, dealerTotal;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    deck = shuffle(createDeck());
                    playerHand = dealHand(deck, 2);
                    dealerHand = dealHand(deck, 2);
                    displayHand('Player', playerHand);
                    console.log("Dealer shows: ".concat(dealerHand[0]));
                    _a.label = 1;
                case 1:
                    if (!true) return [3 /*break*/, 3];
                    total = calculateHand(playerHand);
                    if (total > 21) {
                        console.log('Player busts! Dealer wins.');
                        rl.close();
                        return [2 /*return*/];
                    }
                    return [4 /*yield*/, questionAsync('Hit or Stand? (h/s): ')];
                case 2:
                    action = _a.sent();
                    if (action.toLowerCase() === 'h') {
                        playerHand.push(deck.shift());
                        displayHand('Player', playerHand);
                    }
                    else {
                        return [3 /*break*/, 3];
                    }
                    return [3 /*break*/, 1];
                case 3:
                    // Dealer turn
                    displayHand('Dealer', dealerHand);
                    while (calculateHand(dealerHand) < 17) {
                        dealerHand.push(deck.shift());
                        displayHand('Dealer', dealerHand);
                    }
                    playerTotal = calculateHand(playerHand);
                    dealerTotal = calculateHand(dealerHand);
                    if (dealerTotal > 21)
                        console.log('Dealer busts! Player wins!');
                    else if (playerTotal > dealerTotal)
                        console.log('Player wins!');
                    else if (playerTotal < dealerTotal)
                        console.log('Dealer wins!');
                    else
                        console.log("Push! It's a tie.");
                    rl.close();
                    return [2 /*return*/];
            }
        });
    });
}
// ----- Start Game -----
blackjack();
