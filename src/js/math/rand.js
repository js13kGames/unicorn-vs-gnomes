/**
 * @function
 * @name rand
 * 
 * Generate a random number in provided scope.
 * 
 * @param {number} min - Minimal value
 * @param {number} max - Maximal value
 * 
 * @return {number} - Random number
 */
export function rand(min, max) {
    return min + Math.min(Math.floor(Math.random() * (max - min + 1), max));
}