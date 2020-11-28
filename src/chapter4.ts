import _ from 'lodash';
import {existy, fail, doWhen} from './utils';

/**
 * Chapter 4
 * Higher-Order Function. is simply a function that takes an argument and return a brand new function.
 *
 */
interface Props {
  arr: any[];
  callback(arg: Object | number): number;
}

const max = (arr: any[], callback?: (arg: any) => number) => {
  return _.reduce(arr, (accu, curr) => {
    if (_.isObject(curr) && !_.isUndefined(callback)) {
      const initialValue = callback(curr);
      if (initialValue > accu) return initialValue;
      return accu;
    } else {
      if (curr > accu) return curr;
      return accu;
    }
  });
};

max([1, 2, 3, 4, 5]);
//=> 5

max(
  [
    {name: 'Vincent Llauderes', age: 23},
    {name: 'Kathryn Bernardo', age: 22},
  ],
  (item) => item.age
);
//=> {name: 'Vincent Llauderes', age: 23}

// function fnull(fun /*, defaults */) {
//   var defaults = _.rest(arguments);
//   return function (/* args */) {
//     var args = _.map(arguments, function (e, i) {
//       return existy(e) ? e : defaults[i];
//     });
//     return fun.apply(null, args);
//   };
// }

/**
 * Use functions not values
 *
 */
function repeatedly<T>(times: number, fun: () => T) {
  return _.map(_.range(times), fun);
}

console.log(repeatedly<number>(5, () => Math.floor(Math.random() * 10) + 1));
//=> [rnd, rnd, rnd, rnd, rnd]

function always<T>(VALUE: T) {
  return function () {
    return VALUE;
  };
}

const f = always(() => {});
const g = always(() => {});

console.log(f() === f());

function generateRandomString(len): string {
  return Math.random().toString(36).substr(2, len); // convert generated random number to ASCII base string..
}

console.log(
  repeatedly<string>(5, () => generateRandomString(1)).join('')
);
//=> outputs 5 random characters array then join them to single string...

/**
 * Used to invoke a function in a later time...
 *
 */
function invoker<T>(METHOD: (param?) => T, NAME: string) {
  return function (target, ...rest: any[]) {
    if (!existy(target)) fail('Must provide a target');
    var targetMethod = target[NAME];
    return doWhen(existy(targetMethod) && METHOD === targetMethod, function () {
      return targetMethod.apply(target, [...rest]);
    });
  };
}

const reverse = invoker<number[]>(
  Array.prototype.reverse,
  'reverse'
)([1, 2, 3, 4, 5]);

const multiplyByFive = invoker<number[]>(Array.prototype.map, 'map')(
  [1, 2, 3, 4, 5],
  (n: number) => n * n
);

console.log(reverse);
console.log(multiplyByFive);
