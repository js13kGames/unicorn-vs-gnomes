import {addClass} from '../dom/addClass';
import {el} from '../dom/el';

/**
 * @function
 * @name checkGameStatus
 * 
 * Checks win / loose conditions
 */
export function checkGameStatus() {
	// get lowest color value
	let minCValue = 100;

	for(let color in cValues) {
		minCValue = Math.min(minCValue, cValues[color]);
	}

	// game over - one or more colors value fell to 0
	if(minCValue <= 0) {
		el('.content', 0, menuDialog).innerHTML = '<h2>Game over</h2>';
		addClass(game,'game-over');
		addEnemyTimer.pause();
		threatLevelTimer.pause();
		menuDialog.showModal();
	}
	// win condition - all colors reach cTargetValue (30)
	else if(minCValue >= cTargetValue) {
		el('.content', 0, menuDialog).innerHtml('<h2>Rainbow restored</h2>');
		addClass(game,'game-over');
		addEnemyTimer.pause();
		threatLevelTimer.pause();
		menuDialog.showModal();
	}
}