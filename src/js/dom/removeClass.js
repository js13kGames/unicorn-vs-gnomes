/**
 * @function
 * @name removeClass
 * 
 * Remove class from element.
 * 
 * @param {HTMLElement} el - HTML element
 * @param {string|array} className - Classes to remove
 */
export function removeClass(el, ...classNames) {
    el.classList.remove(...classNames);
}