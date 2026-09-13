import {addClass} from '../dom/addClass';
import {el} from '../dom/el';

/**
 * @function
 * @name pauseGame
 * 
 * Pauses game.
 */
export function pauseGame() {
	addClass(game, 'paused');
	addEnemyTimer.pause();
	threatLevelTimer.pause();
	el('.content', 0, menuDialog).innerHTML = '';
}