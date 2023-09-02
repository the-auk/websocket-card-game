We are excited that you believe in our mission and consider it a possible home for you! This part of the interview process is designed to give you signal on the tech stack and the kind of problems we solve everyday, and for us to get signal on how you approach them, all while having fun with some code.

# The assignment

The goal of this assignment is to create a mini-game that involves two players drawing cards from a deck of 52 playing cards at random. This involves building a server as well as a client (you can either build for web using React or for mobile using React Native). In either case, GraphQL should be used as the API for server and client to talk to each other.

How the app should work:

- When a user opens the app (regardless of whether you chose to implement for web or mobile), it should ask if you want to play as Player A or Player B. For testing purposes since both players will be active at the same time, you would need to either open two different browsers (if you chose web) or two different phones / phone simulators (if you chose mobile).
- Each player will take turns drawing cards at random from a deck of 52 playing cards:
  - The player whose turn it is should see a button to draw a card.
  - The player whose turn it is _not_ has nothing to do, and they wait for the other player to draw.
  - The turn alternates until the deck is empty or a player wins.
- The UI should show these cards in order as they are being drawn (feel free to come up with what would make for a reasonable UI, but it should at least show the suit and rank).
- A player wins if they draw a card of the same rank as the previous card drawn by the opponent. For example: if Player B draws "Three of Clubs" after Player A draws "Three of Hearts", then Player B wins, and the game stops right there.
- If no player has won by the time all 52 cards are dealt, the game is a draw.

Things that are out of scope, unless you feel like going for extra credit:

- Server only needs to support one active game at a time
- Server does not need long term persistence. It is ok if server restart results in all data being lost. However, each of the two players' clients should be able to restart and resume from same spot in the game.
- Perf (this is a quick MVP after all)

Some things to think about:

- What state should be stored on the server to be able to support this game
- What GraphQL APIs (reads, writes, etc) should exist
- How do the two clients know its their turn
- How the code may be organized
- How the cards should appear in the UX

# Starting point

In order to get started, we have created a "server" directory with a basic Node + GraphQL server setup. And then we have a a "webclient" directory with a basic React app setup for web and a "mobileclient" directory with basic Expo + React-Native setup for mobile. You will most likely spend most of your time in the files that begin with CardDealer, but feel free to take a look and/or modify the rest of the skeleton code.

# Deliverables

Once finished:

- Commit your code to this repository (commit directly, no need to send a Pull Request)
- Schedule time with us to go over your approach afterwards: https://calendly.com/miorel-potrero/30min

# Logistics

- Aim to spend no more than 3 hours on the assignment. It's ok if it's not fully complete or polished.
- If you have questions, Miorel will be online at your pre-agreed upon time slot to answer them async. Feel free to send questions to Miorel over email and you should receive a quick reply.

# FAQs

**I spent too much time getting the basic setup working, does that count against the 3 hour time limit**
No. We recommend that the very first thing you do without actually starting is to make sure you can run the server and open the web or mobile demo app. Your 3 hour time limit should start at that point. Also, we don't want you to spend your entire time debugging setup-related issues. If you have been stuck for >15 mins, reach out and we will try to unblock you as soon as possible.

**What if I have questions about what the ideal product behavior should be?**
Feel free to make product assumptions that you think will make for a good user experience while keeping the technical complexity within reason. If you are truly blocked on a question, please feel free to ask over email.

**How much should I worry about design and look and feel of the app?**
Treat it as a low-fidelity early prototype of a feature. It should "feel" to the users that they are being dealt cars from a deck, the functionality should be simple and easy to use. It need not look super aesthetically pleasing.

**Can I change which frameworks are used or the tech stack?**
The tech stack provided is what we use, but we are totally fine with you using what you are most comfortable with, as long as the original intent of the deliverable is being met.

**Can I leverage and import useful modules as necessary?**
Yes
