type DeepKeys<T, P extends string = ''> = {
    [K in keyof T]-?: K extends string
      ? P extends ''
        ? `${K}` | `${K}.${DeepKeys<T[K], K>}`
        : `${P}.${K}.${DeepKeys<T[K], P & K>}`
      : never
  }[keyof T]

  type PathValue<T, P> = P extends `${infer K}.${infer Rest}`
    ? K extends keyof T
      ? Rest extends DeepKeys<T[K]>
        ? PathValue<T[K], Rest>
        : never
      : never
    : P extends keyof T
    ? T[P]
    : never

  export type ObjectPathValue<T extends object, P extends Paths<T>> = PathValue<
    T,
    P
  >

  type Join<K, P> = K extends string | number
    ? P extends string | number
      ? `${K}${'' extends P ? '' : '.'}${P}`
      : never
    : never

  type Prev = [
    never,
    0,
    1,
    2,
    3,
    4,
    5,
    6,
    7,
    8,
    9,
    10,
    11,
    12,
    13,
    14,
    15,
    16,
    17,
    18,
    19,
    20,
    ...0[],
  ]

  export type Paths<T, D extends number = 10> = [D] extends [never]
    ? never
    : T extends object
    ? {
        [K in keyof T]-?: K extends string | number
          ? `${K}` | Join<K, Paths<T[K], Prev[D]>>
          : never
      }[keyof T]
    : ''
