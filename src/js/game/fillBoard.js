import {addOrb} from './addOrb';

import {addClass} from '../dom/addClass';
import {el} from '../dom/el';

import {rand} from '../math/rand';

/**
 * @function
 * @name fillBoard
 * 
 * Fills board with new orbs.
 */
export function fillBoard() {
	el('.orb', 1, board)
		.forEach((orb) => addClass(orb, 'remove'));

	el('.col', 1, board)
		.forEach((col) => {
			for(let i=0; i++ < 6;) {
				addOrb(col);
			}
		});
}