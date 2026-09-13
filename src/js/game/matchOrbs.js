import {addOrb} from './addOrb';
import {refreshOrbIndexes} from './refreshOrbIndexes';
import {updateColorValues} from './updateColorValues';
import {playNote} from './playNote';

import {addClass} from '../dom/addClass';
import {removeClass} from '../dom/removeClass';
import {attr} from '../dom/attr';

import {clamp} from '../math/clamp';

/**
 * @function
 * @name matchOrbs
 * 
 * Handle selected orbs.
 */
export function matchOrbs() {
	// check if 3 or more orbs were selected
	if(selected.length < 3) {
		selected.forEach((item) => removeClass(item, "selected"));
		selected.forEach((item) => removeClass(item.parentNode, "dn", "dne", "de", "dse", "ds", "dsw", "dw", "dsw"));
	}
	// get new color values and remove selected orbs
	else {
		cValues[selectedColor] = clamp(cValues[selectedColor] + selected.length, 0, 30);

		// play note
		let note = 220,
			i = 0;
		selected.forEach((item) => {
			addOrb(item.closest('.col'));
			addClass(item, 'remove');
			playNote(261.63 + 40 * i, 440 + 40 * i, i * .2, .1, 'sine');
			i++;
		});

		refreshOrbIndexes();
	}

	// clear selection and update color values
	selected = [];
	selectedColor = 0;
	availableOrbs = 0;
	attr(board, 'c', '');
	updateColorValues();
}