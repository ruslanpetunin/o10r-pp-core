/* eslint-disable @typescript-eslint/no-explicit-any */
export interface EventManager <
  M extends Record<string, (...args: any[]) => void>
> {
  on: Subscribe<M>;
  off: Unsubscribe<M>;
  emit: Emit<M>;
}

export type EventHandlers <
  M extends Record<string, (...args: any[]) => void>
> = Partial<{
  [K in keyof M]: M[K][];
}>;

export type Subscribe <
  M extends Record<string, (...args: any[]) => void>
> = <K extends keyof M> (
  eventName: K,
  handler: M[K]
) => void;

export type Unsubscribe <
  M extends Record<string, (...args: any[]) => void>
> = <K extends keyof M> (
  eventName: K,
  handler: M[K]
) => void;

export type Emit <
  M extends Record<string, (...args: any[]) => void>
> = <K extends keyof M>(
  eventName: K,
  ...args: Parameters<M[K]>
) => void;
/* eslint-enable @typescript-eslint/no-explicit-any */
