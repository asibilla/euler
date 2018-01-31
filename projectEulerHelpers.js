var ProjectEulerHelpers = function() {};

ProjectEulerHelpers.prototype = {

  constructor: ProjectEulerHelpers,

  returnFactorial : function(n) {
    if (n === 0) {
        return 1;
    }
    return n * this.returnFactorial(n - 1);
  },

  isPrime : function(n) {
    var divisors = [];
    if (n === 1 || n === 0) return false;
    if ([2, 3, 5, 7].indexOf(n) > -1) return true;
    if ((n % 2 === 0 || n % 3 === 0 || n % 5 === 0 || n % 7 === 0)) return false;
    var sqroot = Math.ceil(Math.sqrt(n));
    for (var i = 1; i <= sqroot; i++) {
      if (n % i === 0) {
        divisors.push(i);
      }
    }
    return divisors.length === 1;
  },

  // Build array of prime numbers up to n.
  returnPrimes : function(limit) {
    var primes = [];

    for (var i = 2; i <= limit; (i === 2) ? i++ : i += 2) {
      if (this.isPrime(i)) {
        primes.push(i);
      }
    }

    return primes;
  },

  // Return an array containing all divisors of n.
  returnDivisors(n) {
    var divisors = [];
    var limit = Math.ceil(Math.sqrt(n));
    for (var i = 1; i < limit; i++) {
      if (n % i === 0) {
        divisors.push(i);
        divisors.push(n / i);
      }
    }
    return divisors;
  },

  // Return all possible permutations of group size r for an array.
  returnPermutations : function(inputArr, r) {
    var results = [];
    r = inputArr.length - (r || inputArr.length);

    function permutate(arr, previous = []) {
      for (var i = 0; i < arr.length; i++) {
        let cur = arr.splice(i, 1);

        if (arr.length === r) {
          var result = previous.concat(cur);
          results.push(result);
        }

        permutate(arr, previous.concat(cur));
        arr.splice(i, 0, cur[0]);
      }
      return results;
    }
    return permutate(inputArr);
  },

  // Return all possible comginations of group size r for an array.
  returnCombinations : function(inputArr, r) {
    var results = [];

    function createCombinations(arr, previous = []) {
      if (previous.length === r) {
        results.push(previous);
      }
      else {
        for (var i = 0; i < arr.length; i++) {
          var cur = arr.slice(i, i + 1).concat(previous);
          var rem = arr.slice(i + 1);

          if (cur.length + rem.length >= r) {
            createCombinations(rem, cur);
          }
        }
      }
      return results;
    }
    return createCombinations(inputArr)
  },

  // Convert n in base 10 to a string of binary.
  returnBinaryString : function(n) {
    var binaryStr = '';

    function divideQuotient(q) {
      binaryStr = q % 2 + binaryStr;
      if (q === 1) {
        return binaryStr;
      }
      return divideQuotient(Math.floor(q / 2));
    }
    return divideQuotient(n);
  },

  isPalindrome : function(str) {
    if (str.length <= 1) {
        return true;
    }
    if (str.slice(0, 1) !== str.slice(-1)) {
        return false;
    }
    return this.isPalindrome(str.slice(1, -1));
  },

  reverse : function(n) {
    return Number(n.toString().split('').reverse().join(''));
  },

  // Return each digit of a number as an array item.
  numToArray : function(num) {
    return num.toString().split('').map(n => Number(n));
  },

  // Add two arrays of single digit numbers as if each array were a single, multi-digit number.
  // Useful for large numbers that js would display in scientific notation.
  longAddition : function(a1, a2) {
    function addZeros(a, num) {
      for (var i = 0; i < num; i++) {
        a.unshift(0);
      }
    }

    // Make sure our arrays are of equal length.
    if (a1.length > a2.length) {
      addZeros(a2, a1.length - a2.length);
    }
    else if (a2.length > a1.length) {
      addZeros(a1, a2.length - a1.length);
    }

    var result = [];
    var add = 0;

    for (var i = a1.length - 1; i >= 0; i--) {
      var sum = (a1[i] + a2[i] + add).toString();
      add = Number(sum.slice(0, -1));
      n = Number(sum.substr(sum.length - 1, 1));
      result.unshift(n);
    }

    if (add > 0) {
      result.unshift(add);
    }

    return result;
  },

  // Same as above, but for multiplication.
  longMultiplication(a1, a2) {
    var results = [];
    for (var i = a1.length - 1; i >= 0; i--) {
      var add = 0;
      var result = [];
      for (var j = a2.length - 1; j >= 0; j--) {
        var prod = (a1[i] * a2[j] + add).toString();
        add = Number(prod.slice(0, -1));
        n = Number(prod.substr(prod.length - 1, 1));
        result.unshift(n);
      }
      if (add > 0) {
        result.unshift(add);
      }
      for (var k = a1.length - 1; k > i; k--) {
        result.push(0);
      }
      results.push(result);
    }
    var sum = results[0];
    for (var i = 1; i < results.length; i++) {
      sum = this.longAddition(sum, results[i]);
    }

    return sum;
  }
};


var helpers = new ProjectEulerHelpers();
