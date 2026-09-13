import {checkGameStatus} from './checkGameStatus';

/**
 * @function
 * @name updateColorValues
 * 
 * Updates color prgress bars values.
 */
export function updateColorValues() {
	for(let c in cValues) {
		progress[c].style.setProperty('--cValue', cValues[c]);
	}

	checkGameStatus();
}