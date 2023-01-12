class BrowserHistory {
    constructor(homepage) {
        this.history = [homepage];
        this.current = 0;
    }

    /**
     * @param {string} url
     * @return {void}
     */

    visit(url) {
        this.history[++this.current] = url;
        this.history.length = this.current + 1;
    }

    /**
     * @param {number} steps
     * @return {string}
     */
    back(steps) {
        this.current = Math.max(this.current - steps, 0);
        return this.history[this.current];
    }

    /**
     * @param {number} steps
     * @return {string}
     */
    forward(steps) {
        this.current = Math.min(this.current + steps, this.history.length - 1);
        return this.history[this.current];
    }
}
