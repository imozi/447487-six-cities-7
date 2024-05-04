export type Callbacks = {
  part: (...args: unknown[]) => unknown;
  end: (...args: unknown[]) => unknown;
};
