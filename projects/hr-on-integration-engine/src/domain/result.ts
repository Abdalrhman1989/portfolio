/**
 * Type-Safe Functional Programming Result Type
 * Inspired by Rust & fp-ts
 * Solves: Unhandled runtime exceptions, forcing explicit domain error handling.
 */

export type Ok<T> = { readonly _tag: 'Ok'; readonly value: T };
export type Err<E> = { readonly _tag: 'Err'; readonly error: E };
export type Result<T, E = Error> = Ok<T> | Err<E>;

export const ok = <T>(value: T): Ok<T> => ({ _tag: 'Ok', value });
export const err = <E>(error: E): Err<E> => ({ _tag: 'Err', error });

export const isOk = <T, E>(result: Result<T, E>): result is Ok<T> => result._tag === 'Ok';
export const isErr = <T, E>(result: Result<T, E>): result is Err<E> => result._tag === 'Err';

export const map = <T, E, U>(result: Result<T, E>, fn: (val: T) => U): Result<U, E> => {
    return isOk(result) ? ok(fn(result.value)) : result;
};

export const flatMap = <T, E, U>(result: Result<T, E>, fn: (val: T) => Result<U, E>): Result<U, E> => {
    return isOk(result) ? fn(result.value) : result;
};

export const unwrapOr = <T, E>(result: Result<T, E>, fallback: T): T => {
    return isOk(result) ? result.value : fallback;
};
