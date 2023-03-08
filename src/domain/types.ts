/*
 *
 * This is basically an "assumption" type that will be used we're not sure 
 * if some entity is defined as `TEntity` type or is `null`
 */
export type Optional<TEntity> = TEntity | null;
