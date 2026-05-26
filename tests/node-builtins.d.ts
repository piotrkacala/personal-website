declare module "node:test" {
  export default function test(
    name: string,
    fn: () => void | Promise<void>,
  ): void;
}

declare module "node:assert/strict" {
  interface Assert {
    deepEqual(actual: unknown, expected: unknown, message?: string): void;
    doesNotMatch(string: string, regexp: RegExp, message?: string): void;
    fail(message?: string): never;
    match(string: string, regexp: RegExp, message?: string): void;
    ok(value: unknown, message?: string): asserts value;
  }

  const assert: Assert;

  export default assert;
}

declare module "node:fs" {
  export function readFileSync(path: string, encoding: "utf8"): string;
}
