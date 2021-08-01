import { useState } from "react";

export declare type PromiseExecutor<A, B> = (args: A) => Promise<B>;

export const usePromise = <A, B>(executor: PromiseExecutor<A, B>) => {
  const [state, setState] = useState({
    loading: false,
    data: undefined,
    error: undefined,
    executed: false,
  });

  const execute = (args: A) => {
    setState((prevState) => {
      return {
        ...prevState,
        loading: true,
      }
    });

    executor(args)
      .then((data) => {
        setState(() => {
          return {
            loading: false,
            data,
            error: undefined,
            executed: true
          }
        });
      })
      .catch((error) => {
        setState(() => {
          return {
            loading: false,
            data: undefined,
            error,
            executed: true
          }
        });
      })
  }

  return ({
    execute,
    ...state
  } as UsePromiseState<A, B>)
}

export interface UsePromiseState<A, B> {
  loading: boolean,
  data: B,
  error: Error,
  execute: (args: A) => void,
  executed: boolean
}
