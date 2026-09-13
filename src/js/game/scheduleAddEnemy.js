import {addEnemy} from './addEnemy';

import {rand} from '../math/rand';

/**
 * @function
 * @name scheduleAddEnemy
 * 
 * Adds enemy and restarts it's timer.
 */
export function scheduleAddEnemy() {
	addEnemy();
	addEnemyTimer.delay = 5000 + rand(0, 5000);
	addEnemyTimer.start();
}