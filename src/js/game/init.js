import {addEnemy} from './addEnemy';
import {fillBoard} from './fillBoard';
import {increaseThreatLevel} from './increaseThreatLevel';
import {matchOrbs} from './matchOrbs';
import {startGame} from './startGame';
import {pauseGame} from './pauseGame';
import {resumeGame} from './resumeGame';
import {scheduleAddEnemy} from './scheduleAddEnemy';
import {updateColorValues} from './updateColorValues';

import {attr} from '../dom/attr';
import {el} from '../dom/el';
import {hasClass} from '../dom/hasClass';
import {on} from '../dom/on';

import {Timer} from '../util/timer';

/**
 * @function
 * @name init
 * 
 * Initialize game.
 */
export function init() {
	// html elements
	window.game = el('.game');
	window.board = el('.board');
	window.progress = {
		red: el('.progress[c="red"]'),
		orange: el('.progress[c="orange"]'),
		yellow: el('.progress[c="yellow"]'),
		green: el('.progress[c="green"]'),
		blue: el('.progress[c="blue"]'),
		purple: el('.progress[c="purple"]')
	};
	window.menuDialog = el('#menu-dialog');
	window.orbSelectConfirmOptions = el('input[name="option-orb-selection"]', 1);
	window.sfxOptions = el('input[name="option-sfx"]', 1);

	// audio
	window.actx = new AudioContext();
	window.mainGain = actx.createGain();
	window.compressor = actx.createDynamicsCompressor();
	mainGain.connect(compressor);
	compressor.connect(actx.destination);

	// set game constants
	// rainbow colors
	window.colors = ['red', 'orange', 'yellow', 'green', 'blue', 'purple'];
	// enemy stats
	window.enemies = {
		gnome: { a: 1, hp: 1}, // attack speed 5, delay 10
		thief: { a: 1, hp: 2 }, // attack speed 3, delay 5
		warrior: { a: 2, hp: 3 }, // attack speed 4, delay 8
		wizzard: { a: 2, hp: 3 }, // attack speed 5, delay 10
		knight: { a: 3, hp: 4 }, // attack speed 5, delay 10
	};
	// enemy pool used to pick new enemy (depends on threatLevel value)
	window.enemyPool = [
		'gnome',
		'gnome',
		'thief',
		'warrior',
		'warrior',
		'wizzard',
		'knight'
	];
	

	// game variables
	// determines which enemy type can be picket from enemyPool
	window.threatLevel = 0;
	// array of selected orbs
	window.selected = [];
	// last touched orb used in touch custom event
	window.lastTouchedOrb = 0;
	// current selected color
	window.selectedColor = 0;
	// array of available orbs (neighborin last selected orb with the same color)
	window.availableOrbs = 0;
	// pointer down flag
	window.pointerDown = 0;
	// target color value to reach win condition
	window.cTargetValue = 30;
	// current color values
	window.cValues = {
		red: 0,
		orange: 0,
		yellow: 0,
		green: 0,
		blue: 0,
		purple: 0
	}
	// confirm orb selection option
	// 1 - mouse / touch release
	// 2 - match button
	window.orbSelectConfirm = 1;

	// game timers
	window.addEnemyTimer = new Timer(scheduleAddEnemy, 10000);
	window.threatLevelTimer = new Timer(increaseThreatLevel, 30000);

	// bind pointerDown flag
	on(board, 'pointerdown', () => {
		pointerDown = 1;
	});

	on(window, ['pointerup', 'touchend'], () => {
		pointerDown = 0;
		lastTouchedOrb = 0;

		if(orbSelectConfirm == 1 && !hasClass(game, 'game-over') && !hasClass(game, 'paused'))
			matchOrbs();

	});

	// bind custom touch enter event
	on(board, 'touchmove', (e) => {
		let target = document.elementFromPoint(e.touches[0].clientX, e.touches[0].clientY);

		if(target === lastTouchedOrb)
			return;

		if(hasClass(target, 'orb')) {
			let event = new CustomEvent('customTouchEnter');
			target.dispatchEvent(event);

			lastTouchedOrb = target;
			return;
		}

		lastTouchedOrb = 0;
	});

	// bind confirm orb selection options
	on(orbSelectConfirmOptions, 'change', (e) => {
		orbSelectConfirm = e.target.value;
	});

	// bind sfx options
	on(sfxOptions, 'change', (e) => {
		mainGain.gain.value = e.target.value;
	});

	// bind button commands
	el('[cmd]', 1).forEach((btn) => {
		let commands = attr(btn, 'cmd').split(',');

		commands.forEach((command) => {
			switch(command) {
				// start game
				case 'start-game':
					on(btn, 'click', startGame);
					break;
				// pause game
				case 'pause-game':
					on(btn, 'click', pauseGame);
					break;
				// resume game
				case 'resume-game':
					on(btn, 'click', resumeGame);
					break;
				// match selected orbs
				case 'match':
					on(btn, 'click', matchOrbs);
					break;
				// refresh board
				case 'refresh':
					on(btn, 'click', () => {
						let canRefresh = 1;
						
						for(let color in cValues) {
							if(cValues[color] < 2){
								canRefresh = 0;
								break;
							}
						}

						if(canRefresh) {
							for(let color in cValues) {
								cValues[color] -= 1;
							}

							updateColorValues();
							fillBoard();
							refreshOrbIndexes();
						}
					});
					break;
				// close parent dialog element
				case 'close-dialog':
					on(btn, 'click', () => {
						btn.closest('dialog').close();
					});
					break;
				// close parent dialog element
				case 'open-menu':
					on(btn, 'click', () => {
						menuDialog.showModal();
					});
					break;
			}
		});
	});

	// show main menu on start
	menuDialog.showModal();
}