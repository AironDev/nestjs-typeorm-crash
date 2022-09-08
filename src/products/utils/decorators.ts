export const enumerable = (props: { value: boolean }) => {
  return function (
    target: any,
    propertyKey: string,
    descriptor: PropertyDescriptor,
  ) {
    descriptor.enumerable = props.value;
  };
};
