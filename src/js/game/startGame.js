import {fillBoard} from './fillBoard';
import {refreshOrbIndexes} from './refreshOrbIndexes';
import {updateColorValues} from './updateColorValues';
import {el} from '../dom/el';
import {removeClass} from '../dom/removeClass';
//import {scheduleAddEnemy} from './scheduleAddEnemy';

/**
 * @function
 * @name startGame
 * 
 * Starts new game.
 */
export function startGame() {
	// reset game variables
	selected = [],
	selectedColor = 0,
	availableOrbs = 0,
	pointerDown = 0;
	cValues = {
		red: 1,
		orange: 1,
		yellow: 1,
		green: 1,
		blue: 1,
		purple: 1
	},
	threatLevel = 0;

	// clear enemies
	el('.enemy', 1).forEach((e) => e.remove());

	// generate new board
	fillBoard();
	refreshOrbIndexes();
	// updates color progress bars
	updateColorValues();
	// Restart timers
	addEnemyTimer.start();
	threatLevelTimer.start();
	// remove classes pausing game
	removeClass(game, 'hide-game-area', 'paused', 'game-over');
}