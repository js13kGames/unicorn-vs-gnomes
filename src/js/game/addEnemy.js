import {addOrb} from './addOrb';
import {refreshOrbIndexes} from './refreshOrbIndexes';
import {updateColorValues} from './updateColorValues';
import {playNote} from './playNote';

import {addClass} from '../dom/addClass';
import {attr} from '../dom/attr';
import {el} from '../dom/el';
import {on} from '../dom/on';

import {rand} from '../math/rand';

/**
 * @function
 * @name addEnemy
 * 
 * Creates new enemy.
 */
export function addEnemy() {
	// check if there's empty slot
	let slots = el('.right .slot:not(:has(.enemy))', 1);

	if(!slots.length)
		return;

	/*
	 * get:
	 * - random color
	 * - random enemy type from enemy pool, based on threat level
	 * - enemy type's data
	 * - random free slot
	 */  
	let c = colors[rand(0, 5)],
		t = enemyPool[rand(0 + threatLevel, 2 + threatLevel)],
		enemy = enemies[t],
		slot = slots[rand(0, slots.length - 1)];

	// inset enemy's HTML into slot element
	slot.insertAdjacentHTML('afterbegin', `<button class="enemy" t="${t}" c="${c}"><span></span></button>`);

	// bind button
	let btn = el('.enemy', 0, slot);

	on(btn, 'click', () => {
		if(cValues[c] <= enemy.hp) {
			return;
		}

		cValues[c] -= enemy.hp;
		updateColorValues();

		addClass(btn, 'remove');

		playNote(392, 293.66, 0, .3, 'sawtooth', .5, .01, .3, .2, .1);
	});

	// bind animations
	on(btn, 'animationend', (e) => {
		switch(e.animationName) {
			// start attack after apearing
			case 'enemy-appear':
				addClass(btn, 'attack');
				break;
			// remove enemy HTML after death animation
			case 'enemy-remove':
				e.target.remove();
				break;
		}
	});
	
	on(btn, 'animationiteration', (e) => {
		// attack
		if(e.animationName == 'enemy-attack') {
			let t = attr(btn, 't'),
				enemy = enemies[t],
				c = colors[rand(0, 5)];
			cValues[c] = Math.max(0, cValues[c] - enemy.a);

			updateColorValues();

			// play note
			playNote(130.81, 65.41, 0, .3, 'sine', .8, .01, .3, .3, .1);

			// thief - steal random orb 
			if(t == 'thief') {
				let orbs = el('.orb:not(:is(.selected, .removed))', 1, board),
					orb = orbs[rand(0, orbs.length - 1)];
				addOrb(orb.closest('.col'));
				addClass(orb, 'remove');
				refreshOrbIndexes();
			}

			// wizzard - block random orb
			else if(t == 'wizzard') {
				let orbs = el('.orb:not(:is(.selected, .removed, .disabled))', 1, board),
					orb = orbs[rand(0, orbs.length - 1)];
				addClass(orb, 'disabled');
			}
		}
	});
}