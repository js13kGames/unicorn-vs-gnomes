import {attr} from '../dom/attr';
import {el} from '../dom/el';

/**
 * @function
 * @name addClass
 * 
 * Returns orbs neighboring orbs of last selected orb with the same color.
 * 
 * @return {array|null} - Neighboring orbs HTML elements
 */
export function getAvailableOrbs() {
	let lastOrb = selected.at(-1);
	if(!lastOrb)
		return [];
	let x = parseInt(attr(lastOrb, 'x')),
		y = parseInt(attr(lastOrb, 'y'));

	return el(`.orb[c="${selectedColor}"]:is([x="${x-1}"], [x="${x}"], [x="${x+1}"]):is([y="${y-1}"], [y="${y}"], [y="${y+1}"])`, 1, board);
}