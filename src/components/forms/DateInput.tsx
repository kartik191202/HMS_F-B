import { TextInput } from "./TextInput";
export function DateInput(
  props: Omit<React.ComponentProps<typeof TextInput>, "type">,
) {
  return <TextInput type="date" {...props} />;
}
