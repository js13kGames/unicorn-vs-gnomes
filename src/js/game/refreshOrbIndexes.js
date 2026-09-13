import {attr} from '../dom/attr';
import {el} from '../dom/el';

/**
 * @function
 * @name refreshOrbIndexes
 * 
 * Set orbs new coordinates on board.
 */
export function refreshOrbIndexes() {
	let cols = el('.col', 1, board),
	x = 1;
	
	for(let col of cols) {
		let orbs = el('.orb:not(.remove)', 1, col);
		let y = 1;
		
		for(let orb of orbs) {
			attr(orb, 'x', x);
			attr(orb, 'y', y++);
		}
		x++;
	}
}