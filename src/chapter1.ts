import _ from 'lodash';
import {fail, note, warn} from 'utils';

/**
 *
 * Chapter 1.
 * Functions as Unit of Abstraction
 *
 * The better approach in functional programming is to abstract your data structure using functions
 * Lets consider a canonical example
 * Let's say you have a function that parsing a person age parsingAge that look like this.
 *
 * The function below is worked as expected. But a better approach is to abstract the notion of errors,
 * information and warnings into functions:
 * */
const parseAge = (age: string | any) => {
  if (!_.isString(age)) throw new Error('Expecting a string.');
  let a: number;

  console.log('Attempting to parse an age.');

  a = parseInt(age, 10);

  if (_.isNaN(a)) {
    console.log(['Could not parse age:', age].join(' '));
    a = 0;
  }

  return a;
};

parseAge('42');
//=> 42

parseAge(42);
//=> 42

/**
 * Revising parseAge above by abstracting the error message and handling them gracefully.
 * In this way you can change the default implementation of it in the future if you decided.
 *
 */
const parseAge1 = (age: string | any) => {
  if (!_.isString(age)) fail('Expecting a string.');
  let a: number;

  note('Attempting to parse an age.');

  a = parseInt(age, 10);

  if (_.isNaN(a)) {
    warn(['Could not parse age:', age].join(' '));
    a = 0;
  }

  return a;
};

parseAge1('52');

/**
 * Chapter 1.
 * Functions as Unit of Behavior
 *
 * Abstracting behavior using functions remove side effects in your applications
 *
 * Take for example below we accessed the element of array we could do this by using array index.
 * But we could do better by abstracting it using a function and provide some additional error handler
 * if index is not exists.
 */
const letters: string[] = ['a', 'b', 'c'];

letters[1];
//=> b

// Checked if the passed is indexable...
const isIndexed = (data: any[] | string) => {
  return _.isArray(data) || _.isString(data);
};

/**
 * Functions used to accessed an element in array by providing index.
 *
 * With this approach we elegantly created a function that gracefully handling error
 * and safety accessing index.
 *
 * @param arr Array
 * @param index number
 */
const nth = (arr: any[], index: number) => {
  if (!_.isNumber(index)) fail('Expected a number as the index.');
  if (!isIndexed(arr)) fail('Not supported on non-indexable type.');
  if (index < 0 || index > arr.length - 1)
    fail('Index value is Out of Bounds.');

  return arr[index];
};

nth(letters, 1);
//=> b

nth(letters, 3);
//=> Error: Index value is Out of Bounds.
