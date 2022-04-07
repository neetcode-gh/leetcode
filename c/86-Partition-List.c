/**
 * Definition for singly-linked list.
 * struct ListNode {
 *     int val;
 *     struct ListNode *next;
 * };
 */
struct ListNode* partition(struct ListNode* head, int x) {
    if (head == NULL)
        return (NULL);
    int cache = 0;
    int size_right = 0;
    int size_left = 0;
    int nb_sup = 0;
    int nb_inf = 0;

    /*count numbers greater and lower than x*/
    for (struct ListNode *i = head; i != NULL; i = i->next) {
        if (i->val >= x)
            nb_sup++;
        else
            nb_inf++;
    }
    struct ListNode *sup = NULL;
    struct ListNode *inf = NULL;
    struct ListNode *sort_left = NULL;
    struct ListNode *result = head;
    struct ListNode *unsorted_list = NULL;

    /*init my two list */
    if (nb_sup > 0) {
        sup = (struct ListNode*)malloc(sizeof(struct ListNode));
        if(sup == NULL)
            return (NULL);
        unsorted_list = sup;
    }
    if (nb_inf > 0) {
        inf = (struct ListNode*)malloc(sizeof(struct ListNode));
        sort_left = inf;
        result = inf;
    }

    /*create two list sup -> with all val >= x and inf with all val < x*/
    for (struct ListNode *i = head; i != NULL; i = i->next) {
        if (i->val >= x) {
            size_right++;
            struct ListNode* test = (struct ListNode *)malloc(sizeof(struct ListNode));
            sup->val = i->val;
            size_right < nb_sup ? sup->next = test : (sup->next = NULL);
            sup = sup->next;
        }
        else {
            size_left++;
            struct ListNode* test = (struct ListNode *)malloc(sizeof(struct ListNode));
            inf->val = i->val;
            size_left < nb_inf ? inf->next = test : (inf->next = NULL);
            inf = inf->next;
        }
    }

    /*merge my two list*/
    if (sort_left != NULL) {
        for (; sort_left->next != NULL; sort_left = sort_left->next);
        sort_left->next = unsorted_list;
    }
    return (result);
}
