/**
 * @class Timer
 * 
 * Wrapper for setTimeout function.
 * Allows to start, pause and resume function multiple times. 
 */
export class Timer {

    /**
     * Constructs a new instance.
     * @constructor
     * 
     * @param {Function} callback - Callback function
     * @param {number} delay - Delay time in ms.
     */
    constructor(callback, delay) {
        this.id;
        this.startTime = 0;
        this.delay = delay;
        this.remaining = delay;
        this.callback = callback;
    }

    /**
     * Starts / restarts timer.
     * 
     * @param {number} [val] - New delay time
     */
    start(delay) {
        if(delay)
            this.delay = delay;
        this.pause();
        this.remaining = this.delay;
        this.resume();
    }

    /**
     * Pause timer
     */
    pause() {
        clearTimeout(this.id);
        this.id = null;
        this.remaining -= performance.now() - this.startTime;
    };

    /**
     * Resumes timer from remaining time.
     */
    resume() {
        if(this.id) {
            return;
        }

        this.startTime = performance.now();
        this.id = setTimeout(this.callback, this.remaining);
    };
};