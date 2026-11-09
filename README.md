# luckZone

luckZone is a simple game of luck wherby your 
major duty is to move a set of soldiers which
have been programmed to move randomly in a canvas
on click of corresponding buttons for each soldier 
to a red zone at the middle of the canvas. The soldiers
move with a generated random number hence what really
then makes it a game of luck.

# how to play

Open `index.html` in a browser, enter a nickname, press submit,
then press Play. An empty nickname shows an alert and Play stays visible.

The clock runs from 02:00 down to 00:00. Click the button for
each soldier repeatedly to move it to a random cell. Each soldier
has its own center cell in the red zone (soldier 1, 2, 3 and 4 use
the cells `image1`, `image2`, `image3` and `image4`).

- When a soldier lands on its own center cell it stays there, its
  button is disabled and its text changes to "locked".
- A cell that already holds a soldier is never a landing spot, so two
  soldiers never share a cell.
- When the fourth soldier locks, the guru line shows immediately and
  the clock stops.
- If the clock reaches 00:00 first, the clock stops, all four move
  buttons are disabled, and a loss line shows if any soldier is
  outside its cell.
