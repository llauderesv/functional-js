import _ from 'lodash';

/**
 *
 * Chapter 3.
 * Closures:
 * JavaScript closure is way to hide your data from the outside world by encapsulating them in them in function
 * and thru lexical scoping.
 *
 * By below example we can accessed the `FACTOR` argument in inner function by mapping the values and
 * returning a brand new array multiplying n to FACTOR.
 *
 */
const createScaleFunction = (FACTOR: number) => {
  return (arr: any[]) => {
    return _.map(arr, (item) => item * FACTOR);
  };
};

const scale10 = createScaleFunction(10);

scale10([1, 2, 3]);
//=> [10, 20, 30]

/**
 *
 * Example no. 2
 *
 */
const plucker = (FIELD: string) => {
  return (obj: Object) => obj && obj[FIELD];
};

const best = {title: 'Infinite Jest', author: 'DFW'};
const getTitle = plucker('title');

getTitle(best);
//=> {title: 'Infinite Jest'}