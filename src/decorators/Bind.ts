export function bind(
  target: any,
  name: string,
  descriptor: PropertyDescriptor
) {
  const originalMethod = descriptor.value;
  let newDescriptor: PropertyDescriptor;
  newDescriptor = {
    configurable: true,
    get() {
      return originalMethod.bind(this);
    },
  };
  return newDescriptor;
}
