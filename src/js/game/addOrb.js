import {getAvailableOrbs} from './getAvailableOrbs';

import {addClass} from '../dom/addClass';
import {removeClass} from '../dom/removeClass';
import {hasClass} from '../dom/hasClass';
import {attr} from '../dom/attr';
import {on} from '../dom/on';

import {rand} from '../math/rand';

/**
 * @function
 * @name addOrb
 * 
 * Creates new enemy in provided column
 * 
 * @param {HTMLElement} col - Column orb will be added.
 */
export function addOrb(col) {
	let c = colors[rand(0, 5)];
	// inset orbs's HTML into column
	col.insertAdjacentHTML('afterbegin', `<div class="item"><button class="orb" c="${c}"></button></div>`);

	// select created button
	let btn = col.querySelector('.orb'),
		// callback function selecting / deselecting orb
		callback = () => {

		// deselect orb
		if(hasClass(btn, 'selected')) {
			if(selected.at(-1) === btn || !selected.length) {
				selected.pop();
				removeClass(btn, "selected");
				removeClass(btn.parentNode, "dn", "dne", "de", "dse", "ds", "dsw", "dw", "dnw");
			}
		}
		// select orb
		else if(!availableOrbs || Array.from(availableOrbs).includes(btn)) {
			selected.push(btn);
			addClass(btn, "selected");

			if(!selectedColor) {
				selectedColor = attr(btn, 'c');
				attr(board, 'c', selectedColor);
			}

			// add line connecting it with previous orb
			if(selected.length > 1) {
				let prevBtn = selected.at(-2),
					dx = attr(prevBtn, 'x') - attr(btn, 'x') + 1,
					dy = attr(prevBtn, 'y') - attr(btn, 'y') + 1,
					x = ['w', '', 'e'][dx],
					y = ['n', '', 's'][dy];

				addClass(btn.parentNode, "d" + y + x);
			}
		}

		// highlight currently selected color
		if(selected.length) {
			availableOrbs = getAvailableOrbs();
		}
		// clear selection
		else {
			selectedColor = 0;
			availableOrbs = 0;
			attr(board, 'c', '');
		}
	}

	// select on click
	on(btn, 'pointerdown', () => {
		lastTouchedOrb = btn;
		callback();
	});

	// select on dragging pointer
	on(btn, 'pointerenter', () => {
		if(!pointerDown)
			return;
		callback();
	});

	// select on custom touch move
	on(btn, 'customTouchEnter', () => {
		callback();
	});

	// bind animations
	on(btn.parentNode, 'animationend', (e) => {
		// remove orb HTML after match animation
		if(e.animationName === 'remove-item')
			e.target.remove();

		// remove "disabled" effect
		else if(e.animationName === 'disable-orb')
			removeClass(e.target, 'disabled');
	});
}