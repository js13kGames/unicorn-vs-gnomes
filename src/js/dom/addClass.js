/**
 * @function
 * @name addClass
 * 
 * Add classes from element.
 * 
 * @param {HTMLElement} el - HTML element
 * @param {string|array} className - Classes to add
 */
export function addClass(el, ...classNames) {
    el.classList.add(...classNames);
}