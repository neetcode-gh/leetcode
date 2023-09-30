; Time Complexity: O(n)
; Space Complexity: O(n)

(define/contract (contains-duplicate nums)
  (-> (listof exact-integer?) boolean?)
    (define num-map (make-hash))
    (define res #f)

    (for-each
      (lambda (num)
        (if (hash-has-key? num-map num)
          (set! res #t)
          (hash-set! num-map num #t)))
      nums)

    res
  )
