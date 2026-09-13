/**
 * @function
 * @name rand
 * 
 * Returns value limited by min and max value.
 * 
 * @param {number} val - Clamped value
 * @param {number} min - Minimal value
 * @param {number} max - Maximal value
 * 
 * @return {number} - Random number
 */
export function clamp(val, min, max) {
    return Math.min(Math.max(val, min), max);
}