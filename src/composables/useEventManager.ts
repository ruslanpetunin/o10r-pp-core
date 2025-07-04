import type {
  EventHandlers,
  Subscribe,
  Unsubscribe,
  Emit,
  EventManager,
} from './../types/event';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default function <M extends Record<string, (...args: any[]) => void>>(): EventManager<M> {
  const handlers: EventHandlers<M> = {};

  const on: Subscribe<M> = (eventName, handler) => {
    handlers[eventName] = handlers[eventName] || [];
    handlers[eventName].push(handler);
  };

  const off: Unsubscribe<M> = (eventName, handler) => {
    if (handlers[eventName]) {
      handlers[eventName] = handlers[eventName].filter(h => h !== handler);
    }
  };

  const emit: Emit<M> = (eventName, ...args) => {
    if (handlers[eventName]) {
      handlers[eventName].forEach(handler => handler(...args));
    }
  };

  return {
    on,
    off,
    emit
  };
}
