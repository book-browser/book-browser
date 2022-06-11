import { useCallback, useEffect, useState } from 'react';

export declare type PromiseExecutor<A, B> = (args: A) => Promise<B>;

export declare type EmptyPromiseExecutor<B> = () => Promise<B>;

export const usePromise = <A, B>(executor: PromiseExecutor<A, B>) => {
  const [promise, setPromise] = useState<Promise<B>>();
  const [state, setState] = useState({
    loading: false,
    data: undefined,
    error: undefined,
    executed: false
  });

  useEffect(() => {
    if (promise) {
      const currentPromise = promise;
      currentPromise
        .then((data) => {
          if (currentPromise === promise) {
            setState(() => {
              return {
                loading: false,
                data,
                error: undefined,
                executed: true
              };
            });
          }
        })
        .catch((error) => {
          if (currentPromise === promise) {
            setState(() => {
              return {
                loading: false,
                data: undefined,
                error,
                executed: true
              };
            });
          }
        });
    }
  }, [promise]);

  const execute = useCallback(
    (args: A) => {
      setState((prevState) => {
        return {
          ...prevState,
          loading: true,
          executed: false
        };
      });
      setPromise(executor(args));
    },
    [executor]
  );

  return {
    execute,
    ...state
  } as UsePromiseState<A, B>;
};

export declare type UsePromiseState<A, B> = {
  loading: boolean;
  data?: B;
  error?: Error;
  execute: (args: A) => void;
  executed: boolean;
};

export const useEmptyPromise = <B>(executor: EmptyPromiseExecutor<B>) => {
  const [promise, setPromise] = useState<Promise<B>>();
  const [state, setState] = useState({
    loading: false,
    data: undefined,
    error: undefined,
    executed: false
  });

  useEffect(() => {
    if (promise) {
      const currentPromise = promise;
      currentPromise
        .then((data) => {
          if (promise === currentPromise) {
            setState(() => {
              return {
                loading: false,
                data,
                error: undefined,
                executed: true
              };
            });
          }
        })
        .catch((error) => {
          if (promise === currentPromise) {
            setState(() => {
              return {
                loading: false,
                data: undefined,
                error,
                executed: true
              };
            });
          }
        });
    }
  }, [promise]);

  const execute = useCallback(() => {
    setState((prevState) => {
      return {
        ...prevState,
        loading: true,
        executed: false
      };
    });

    setPromise(executor());
  }, [executor]);

  return {
    execute,
    ...state
  } as UseEmptyPromiseState<B>;
};

export declare type UseEmptyPromiseState<B> = {
  loading: boolean;
  data?: B;
  error?: Error;
  execute: () => void;
  executed: boolean;
};
