const DEFAULT_INTERVAL = 500;

async function sleep(time: number) {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(undefined);
    }, time);
  });
}

type Listener<T> = (data: T) => void;

export function pipify<T>(
  promiseCreator: () => Promise<T>,
  interval = DEFAULT_INTERVAL
) {
  const listeners: Listener<T>[] = [];

  let shouldRepeat = true;

  const subscribe = (listener: Listener<T>) => {
    listeners.push(listener);
  };

  const start = async () => {
    while (shouldRepeat) {
      const [data] = await Promise.all([promiseCreator(), sleep(interval)]);

      listeners.forEach((listener) => {
        listener(data);
      });
    }
  };

  const close = () => {
    shouldRepeat = false;
  };

  return {
    subscribe,
    start,
    close,
  };
}
