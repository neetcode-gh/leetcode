function addBinary(a: string, b: string): string {
    let res = ""
    let carry = 0

    a = a.split('').reverse().join('')
    b = b.split('').reverse().join('')

    for (let i = 0; i < (Math.max(a.length, b.length)); i++) {
        let digitA: number = i < a.length ? +a[i] : 0;
        let digitB: number = i < b.length ? +b[i] : 0;

        let total = digitA + digitB + carry;
        let char = `${total % 2}`;
        res = char + res;
        carry = Math.floor(total / 2);
    }
    if (carry) {
        res = "1" + res;
    }
    return res;
};
