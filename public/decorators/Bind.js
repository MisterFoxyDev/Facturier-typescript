export function bind(target, name, descriptor) {
    const originalMethod = descriptor.value;
    let newDescriptor;
    newDescriptor = {
        configurable: true,
        get() {
            return originalMethod.bind(this);
        },
    };
    return newDescriptor;
}
