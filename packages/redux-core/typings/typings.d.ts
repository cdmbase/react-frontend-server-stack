
  export function compose<A, B, R>(
    f1: (a: B) => R, f2: (a: A) => B,
    ...funcs: Function[]
  ): (...args: any[]) => R;


