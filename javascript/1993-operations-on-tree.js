class LockingTree {
    /**
     * @param {number[]} parent
     */
    constructor(parent) {
        this.parent = parent;
        this.childHash = {};
        this.treeHash = {};
        for(let i = 0; i < parent.length; i++) {
            if(this.childHash[parent[i]]) {
                this.childHash[parent[i]].push(i);
            } else {
                this.childHash[parent[i]] = [i];
            }
        }
    }

    /** 
     * Time O(1) | Space O(1)
     * @param {number} num 
     * @param {number} user
     * @return {boolean}
     */
    lock(num, user) {
        // it will just lock a node for a given user if it's not already locked THAT'S IT!
        if(this.treeHash[num]) return false;
        this.treeHash[num] = user;
        return true;
    }

    /** 
     * Time O(1) | Space O(1)
     * @param {number} num 
     * @param {number} user
     * @return {boolean}
     */
    unlock(num, user) {
        // only unlock the node if it's locked by the same user 
        if(this.treeHash[num] === user) {
            delete this.treeHash[num];
            return true;
        }
        return false;
    }

    /** 
     * 
     * Time O(n) | Space O(n)
     * @param {number} num 
     * @param {number} user
     * @return {boolean}
     */
    upgrade(num, user) {
        // lock the node for a given user and unlock all of its descendants no matter who locked it.
        // 1. the given node should be unlocked
        // 2. the given node should have at least one locked node descendant by anyone
        // 3. the given node shouldn't have any locked ancestors    
        if(this.treeHash[num]) return false;
        if(!this.checkDescendants(num)) return false;
        if(!this.checkAncestors(num)) return false;

        // locking the given node
        this.treeHash[num] = user;
        this.unlockDescendants(num);
        return true;
    }

    /**
     * Helper method to unlock descendants
     * Time O(n) | Space O(n)
     * @param {number} index
     */
    unlockDescendants(index) {
        const stack = [];
        stack.push(index);
        while(stack.length) {
            const node = stack.pop();
            const children = this.childHash[node];
            for(let i = 0; i < (children && children.length); i++) {
                delete this.treeHash[children[i]];
                stack.push(children[i]);
            }
        }
    }

    /**
     * Helper method to check ancestors
     * Time O(n) | Space O(1)
     * @param {number} index
     * @return {boolean}
     */
    checkAncestors(index) {
        let node = this.parent[index];
        while(node !== -1) {
            if(this.treeHash[node]) return false;
            node = this.parent[node];
        }
        return true;
    }

    /**
     * Helper method to check descendants
     * Time O(n) | Space O(n)
     * @param {number} index
     * @return {boolean}
     */
    checkDescendants(index) {
        const stack = [];
        stack.push(index);
        while(stack.length) {
            const node = stack.pop();
            const children = this.childHash[node];
            for(let i = 0; i < (children && children.length); i++) {
                if(this.treeHash[children[i]]) return true;
                stack.push(children[i]);
            }
        }
        return false;
    }
}
