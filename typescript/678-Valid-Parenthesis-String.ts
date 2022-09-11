function checkValidString(s: string): boolean {
    let leftMin = 0;
    let leftMax = 0;

    for (let c of s) {
        if (c === '(') {
            leftMin++;
            leftMax++;
        } else if (c === ')') {
            leftMin--;
            leftMax--;
        } else {
            leftMin--;
            leftMax++;
        }

        if (leftMax < 0) {
            return false;
        }

        if (leftMin < 0) {
            leftMin = 0;
        }
    }

    return leftMin === 0;
}
