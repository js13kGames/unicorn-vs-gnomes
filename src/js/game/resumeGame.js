import {removeClass} from '../dom/removeClass';

/**
 * @function
 * @name resumeGame
 * 
 * Resume game.
 */
export function resumeGame() {
	removeClass(game, 'paused');
	addEnemyTimer.resume();
	threatLevelTimer.resume();
}