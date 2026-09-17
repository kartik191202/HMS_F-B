type Props = React.InputHTMLAttributes<HTMLInputElement> & { label?: string };
export function TextInput({ label, ...props }: Props) {
  return (
    <label className="grid gap-1 text-sm font-medium">
      {label}
      <input className="rounded border px-3 py-2 font-normal" {...props} />
    </label>
  );
}
