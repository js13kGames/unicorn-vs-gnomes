/**
 * @function
 * @name on
 * 
 * Adds event listeners to passed elements.
 * 
 * @param {HTMLElement|array} elements - single HTML element, array or NodeList
 * @param {string|array} events - Event name or array of events
 * @param {function} callback - Event handler
 */
export function on(elements, events, callback) {
    let els = Symbol.iterator in Object(elements) ? elements : [elements],
        evs = Array.isArray(events) ? events : [events];

    for(let el of els) {
        for(let e of evs) {
            el.addEventListener(e, callback);
        }
    }
}