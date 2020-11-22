import _ from 'lodash';
import {existy} from 'utils';

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
//=>

function fnull(fun /*, defaults */) {
  var defaults = _.rest(arguments);
  return function (/* args */) {
    var args = _.map(arguments, function (e, i) {
      return existy(e) ? e : defaults[i];
    });
    return fun.apply(null, args);
  };
}
