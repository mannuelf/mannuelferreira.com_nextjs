export const defined = <T>(maybe: T): maybe is NonNullable<T> =>
  maybe !== undefined && maybe !== null;
