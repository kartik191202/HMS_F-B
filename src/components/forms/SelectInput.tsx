type Props = React.SelectHTMLAttributes<HTMLSelectElement> & {
  label?: string;
  options?: string[];
};
export function SelectInput({
  label,
  options = [],
  children,
  ...props
}: Props) {
  return (
    <label className="grid gap-1 text-sm font-medium">
      {label}
      <select className="rounded border px-3 py-2 font-normal" {...props}>
        {children ??
          options.map((option) => <option key={option}>{option}</option>)}
      </select>
    </label>
  );
}
