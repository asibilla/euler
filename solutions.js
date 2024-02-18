// Problem 1.
(function(min, max) {
    let sum = 0;
    for (let i = min; i<=max; i++) {
        if (i % 3 === 0 || i % 5 === 0) {
            sum += i;
        };
    };
    console.log(sum);
})(3, 999)

