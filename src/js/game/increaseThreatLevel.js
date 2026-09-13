/**
 * @function
 * @name increaseThreatLevel
 * 
 * Increase threatLevel and restarts it's timer.
 */
export function increaseThreatLevel() {
	if(threatLevel < 4) {
		threatLevel++;
		threatLevelTimer.start();
	}
}