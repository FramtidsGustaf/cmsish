import { createContext, useCallback, useContext, useSyncExternalStore } from 'hono/jsx';
import { JSX } from 'hono/jsx/jsx-runtime';

export const createFastContext = <FastContext,>(initialState: FastContext) => {
  const useFastContextData = (): {
    get: () => FastContext;
    set: (value: Partial<FastContext>) => void;
    subscribe: (callback: () => void) => () => void;
  } => {
    let store = initialState;

    const get = useCallback(() => store, []);

    const subscribers = new Set<() => void>();

    const set = useCallback((value: Partial<FastContext>) => {
      store = { ...store, ...value };
      for (const subscriber of subscribers) {
        subscriber()
      }
    }, []);

    const subscribe = useCallback((callback: () => void) => {
      subscribers.add(callback);
      return () => subscribers.delete(callback);
    }, []);

    return {
      get,
      set,
      subscribe,
    };
  };

  type UseFastContextDataReturnType = ReturnType<typeof useFastContextData>;

  const FastContext = createContext<UseFastContextDataReturnType | null>(null);

  const FastContextProvider = ({ children }: Readonly<{ children: JSX.Element }>) => {
    return <FastContext.Provider value={useFastContextData()}>{children}</FastContext.Provider>;
  };

  const useFastContext = <SelectorOutput,>(
    selector: (store: FastContext) => SelectorOutput,
  ): [SelectorOutput, (value: Partial<FastContext>) => void] => {
    const fastContext = useContext(FastContext);

    if (!fastContext) {
      throw new Error('Store not found');
    }

    const state = useSyncExternalStore(
      fastContext.subscribe,
      () => selector(fastContext.get()),
      () => selector(initialState),
    );

    return [state, fastContext.set];
  };

  const useFastContextFields = <SelectorOutput,>(
    fieldNames: string[],
  ): {
    [key: string]: { get: SelectorOutput; set: (value: any) => void };
  } => {
    const gettersAndSetters: { [key: string]: { get: SelectorOutput; set: (value: any) => void } } =
      {};
    for (const fieldName of fieldNames) {
      const [getter, setter] = useFastContext(
        (fc) => (fc as Record<string, SelectorOutput>)[fieldName],
      );
      gettersAndSetters[fieldName] = {
        get: getter,
        set: (value: any) => setter({ [fieldName]: value } as Partial<FastContext>),
      };
    }

    return gettersAndSetters;
  };

  return {
    FastContextProvider,
    useFastContextFields,
  };
};
