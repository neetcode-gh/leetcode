use v6.c;

class Node {
    has $.key;
    has $.value;

    has Node $.prev is rw is built(False);
    has Node $.next is rw is built(False);
}

class LRUCache {
    has Int:D $.capacity is required;
    has Node %!cache;

    has $!head = Node.new(key => Nil, value => Nil);
    has $!tail = Node.new(key => Nil, value => Nil);

    submethod TWEAK() {
        $!head.next = $!tail;
        $!tail.prev = $!head;
    }
    
    method put(Int:D $key, $value --> Nil) {
        if %!cache{$key}:exists {
            self!remove: %!cache{$key}
        }

        %!cache{$key} = Node.new(:$key, :$value);
        self!insert: %!cache{$key};

        if %!cache.elems > $!capacity {
            my $lru = $!tail.prev;
            self!remove: $lru;
            %!cache{$lru.key}:delete;
        }
    }

    method get(Int:D $key --> Int:D) {
        if %!cache{$key}:exists {
            self!remove(%!cache{$key});
            self!insert(%!cache{$key});
            return %!cache{$key}.value;
        }
        else {
            return -1
        }
    }

    method !remove(Node:D $node) {
        my $prev = $node.prev;
        my $next = $node.next;
        $prev.next = $next;
        $next.prev = $prev;
    }

    method !insert(Node:D $node) {
        my $prev = $!head;
        my $next = $!head.next;

        $prev.next = $node;
        $next.prev = $node;
        $node.prev = $prev;
        $node.next = $next;
    }
}
