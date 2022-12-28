//check if current state is valid
const isStateValid = (state: number[], n: number) => {
    //if there are n queens inserted the state is valid
    return state.length === n;
};

//convert given state(valid) to correct answer format(a string)
const stateToString = (state: number[]) => {
    let arrs = state.map((col) => {
        let newArr = new Array(state.length).fill('.');
        newArr[col] = 'Q';
        return newArr.join('');
    });

    return arrs;
};

//recursive step
const searchRec = (state: number[], n: number, solutions: string[][]) => {
    //if current state is valid, add it to the solutions array and return, we go back to previous states (DFS)
    if (isStateValid(state, n)) return solutions.push(stateToString(state));

    //get new possible candidates (the column in which to place current queen) to add to current State, start with every column
    let candidates = new Set([...Array(n).keys()]);

    //the row in which next queen will be added
    let rowToAdd = state.length;

    //iterates previous not empty rows to discard candidates before exploring them
    for (let row = 0; row < state.length; row++) {
        //the column in which is placed the queen at current row
        let col = state[row];
        let dist = rowToAdd - row;
        //discard the whole column where queen inserte in "row" is
        candidates.delete(col);
        //right diagonal intersection of queen inserted in "row" with the row where to add new queen(new queen cannot be here)
        candidates.delete(col + dist);
        //left diagonal intersection of queen inserted in "row" with the row where to add new queen(new queen cannot be here)
        candidates.delete(col - dist);
    }

    candidates.forEach((cand) => {
        //temporarly add candidate to state
        state.push(cand);
        //explore new state with that candidate
        searchRec(state, n, solutions);
        //explored, remove the candidate to return at previous state
        state.pop();
    });

    return;
};

function solveNQueens(n: number): string[][] {
    let solutions = [];
    let start = [];

    //explore starting from empty state
    searchRec(start, n, solutions);

    return solutions;
}
