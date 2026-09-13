/**
 * @function
 * @name el
 * 
 * Select HTML element / elements by query selector.
 * @param {string} selector - Query selector
 * @param {bool|number} [all=0] - Select all flag
 * @param {HTMLElement|null} [parent=document]- parent element
 * 
 * @return {HTMLElement|array|null} - Selected HTML element/-s
 */
export function el(selector, all, parent = document) {
    return parent['querySelector' + (all ? 'All' : '')](selector);
}