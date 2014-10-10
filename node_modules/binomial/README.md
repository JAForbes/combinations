## binomial.js

binomial.js is a simple module for creating binomial coefficients.  It includes memoization by default.  

Usage with memoization:

```javascript
var n_choose_k = binomial.get(n, k);
```


Usage without memoization:

```javascript
var n_choose_k = binomial.get_no_memo(n, k);
```
