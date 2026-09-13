/**
 * @function
 * @name hasClass
 * 
 * Checks if element has class.
 * 
 * @param {HTMLElement} el - HTML element
 * @param {string} className - Class to check
 * 
 * @return {bool}
 */
export function hasClass(el, className) {
    return el.classList.contains(className);
}