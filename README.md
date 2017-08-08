**Match Master v1.0**
**FSJS Final Project**
**07/20/2017**

To try out Match Master for yourself!
Match Master is a memory card/concentration style game built on the MEAN stack using Angular

**Instructions**
1. clone the repo - master branch is the most up to date version
2. cd into the project's root directory
3. run npm install to install dependencies (**THIS WILL TAKE FOREVER** because Angular)
4. Install MongoDB on your local machine
5. run mongod.exe on its default port 27017
6. spin up the server from the app's root directory by running "node server.js" in your terminal
7. point your browser to localhost:3000

**Gameplay**

Enter your initials, these will be saved to the top 10 with your final score (assuming your Match Mastery is high enough)
After the game board loads click 2 different tiles. Clicking a 3rd tile will hide the first two if they were not a match
Matches will remain face up until you've matched all the tiles

After matching all the tiles your final score will be displaced along with a leaderboard of up to the top 10 scores recorded to the database

**App Structure**

the front end code has been built from Angular source files into the dist folder. Built files are served via node using express
server.js lives in the root directory, and node modules it requires live in the server directory (also in the root)

the angular source files are included in src/app and are organized into directories per component plus a single services directory

**the most detailed comments are in ./src/app/game-board/game-board.component with comments for clarity throughout the other component, service, and server files**

**TODO** - in no particular order
1. Styling needs some work for better compatability with IE, right now there's a tile sizing bug in the game-board
2. There's bug in the view of the gameboard that caues an intermittant jitter or twitch when the tile's value is displayed - needs diagnosing and a fix
3. Enable replaying a saved board that corresponds to a leader-board score so you can try and best someone else at the exact same board
4. Tweak scoring so Hi scores are better, include a time component
5. Add a level system that adds progressively more tiles per level
6. ~~there are some unicodes that don't render as the correct font, the list needs to be cleaned up and pared down to more reliably font-valid values~~
7. **Current WiP** Add an admin layer for manually updating/changing the leaderboard