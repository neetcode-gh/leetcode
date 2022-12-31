function copyRandomList(head: Node | null): Node | null {
    let hash = new Map<Node, Node>();

    let newHead = new Node(0);

    let itr = head;

    let itrN = newHead;

    while (itr !== null) {
        let newN = new Node(itr.val);
        itrN.next = newN;
        itrN = newN;
        hash.set(itr, newN);

        itr = itr.next;
    }

    itr = head;
    while (itr !== null) {
        let inNew = hash.get(itr);
        if (itr.random !== null) {
            let inNewRand = hash.get(itr.random);
            inNew.random = inNewRand;
        }
        itr = itr.next;
    }

    return newHead.next;
}
