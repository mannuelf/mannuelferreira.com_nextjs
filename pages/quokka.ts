// Explicit rejection
/*
const rejectPromise = new Promise((resolve, reject) => {
  reject(new Error('👩‍🚒 An error happened'));
});

rejectPromise.catch((err) => {
  console.log('Rejected');
  console.log(err);
});
*/

/**
 * Traditional try/catch
 */
/*
const getData = () => {
  let timestamp = performance.now();
  try {
    console.log('🆗 getting data');
  } catch (error) {
    console.log('🔥 error:', error);
  } finally {
    console.log('getData took:', performance.now() - timestamp);
  }
};

getData();*/

/**
 * Use catch/then to mimic catch/finally
 */
/*const getData = () => {
  let dataPromise;
  let timestamp = performance.now();

  dataPromise = new Promise((resolve, reject) => {
    // some action
    throw new Error('Unexpected problem');
  });

  dataPromise
    .catch((err) => {
      // do not rethrow error
      console.log('err', err);
    })
    .then(() => {
      console.log('getData took:', performance.now() - timestamp);
    });

  // return dataPromise instead of catch/then tail to propagate rejection
  return dataPromise;
};

getData();*/

/**
 * Using the iterable interface of an array
 */
/*
const numbersArr = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
const iterator = numbersArr[Symbol.iterator]();
iterator.next();
iterator.next();
*/

/*
let a = 0;
let b = 1;

const fib = () => {
  b = a + b;
  a = b - a;
  return b;
};

let i;
for (i = 0; i < 5; i++) {
  console.log(fib());
}
*/

/**
 * FIbonacci sequence using generators
 **/
/*function* fib() {
  let a = 0;
  let b = 1;

  while (true) {
    yield a + b;
    b = a + b;
    a = b + a;
  }
}
let i;
let result;
let iterator = fib();
for (i = 0; i < 10; i++) {
  result = iterator.next();
  console.log(result.value);
}*/

/**
 * Generators: https://itnext.io/a-quick-practical-use-case-for-es6-generators-building-an-infinitely-repeating-array-49d74f555666
 * @param arr
 */
/*
function* repeatedArray(arr: string[]) {
  let index = 0;
  while (true) {
    yield arr[index++ % arr.length];
  }
}

const lifts = ['squat', 'bench', 'deadlift', 'press'];
const nextLiftGenerator = repeatedArray(lifts);

const numWeeks = 3;
const daysPerWeek = 6;

const totalNumSessions = numWeeks * daysPerWeek;

// This creates an empty array of totalNumSessions length
// for me to map over
const cycle = [...Array(totalNumSessions)].map(() => ({
  lift: nextLiftGenerator.next().value,
}));

cycle;
*/

/*function* counter() {
  let count = 0;
  let increment = 1;
  while (true) {
    count = count + increment;
    increment = (yield count) || increment;
  }
}

let iterator = counter();
console.log(iterator.next().value);
console.log(iterator.next().value);
console.log(iterator.next(2).value);
console.log(iterator.next().value);
console.log(iterator.next().value);
*/

/*
type Animal = {
  type: string;
  legs: number;
};

function* match(objects: Animal[], propname: string, value: number) {
  let i;
  let obj: Animal;
  for (i = 0; i < objects.length; i++) {
    obj = objects[i];
    if (obj[propname] === value) yield obj;
  }
}

let animals = [
  { type: 'bird', legs: 2 },
  { type: 'dog', legs: 4 },
  { type: 'cat', legs: 4 },
  { type: 'reptile', legs: 4 },
  { type: 'horse', legs: 4 },
];

let iterator = match(animals, 'legs', 4);
let result;
while ((result = iterator.next()).done !== true) {
  console.log(result.value);
}
*/

// let p1, p2;
// p1 = Promise.resolve();
// p2 = p1.then(() => {
//   console.log('p1 then...');
// });

// console.log('p1 and p2 are different objects: ', p1 !== p2);

// Promise.resolve('ta-da!')
//   .then(function step2(result) {
//     console.log('Step 2 received ' + result);
//     return 'Greetings from step 2';
//   })
//   .then(function step3(result) {
//     console.log('Step 3 received ' + result);
//   })
//   .then(function step4(result) {
//     console.log('Step 4 received ' + result);
//     return Promise.resolve('fullfilled value');
//   })
//   .then(function step5(result) {
//     console.log('Step 5 received ' + result);
//   });

// let myPromise = new Promise(function (resolve, reject) {
//   console.log('Inside the resolver function');
//   resolve('myPromise resolved');
// });

// myPromise.then(function () {
//   console.log('Inside the onFulfilled handler');
// });

// console.log('Last line');

export {};
