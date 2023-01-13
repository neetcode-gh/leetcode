class BrowserHistory {
    history: string[];
    current: number;

    constructor(homepage: string) {
        this.history = [homepage];
        this.current = 0;
    }

    visit(url: string): void {
        this.history[++this.current] = url;
        this.history.length = this.current + 1;
    }

    back(steps: number): string {
        this.current = Math.max(this.current - steps, 0);
        return this.history[this.current];
    }

    forward(steps: number): string {
        this.current = Math.min(this.current + steps, this.history.length - 1);
        return this.history[this.current];
    }
}
