/**
 * @function
 * @name attr
 * 
 * Get / set attribute to HTML element.
 * 
 * @param {HTMLElement} el - HTML element
 * @param {string} attribute - Attribute name
 * @param {string} [value] - Attribute value to set
 * 
 * @return {string|undefined} - Attribute value (if value param not provided)
 */
export function attr(el, attribute, value = null) {
    return value !== null ? el.setAttribute(attribute, value) : el.getAttribute(attribute);
}