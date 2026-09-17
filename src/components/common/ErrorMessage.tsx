export function ErrorMessage({
  message = "Something went wrong.",
}: {
  message?: string;
}) {
  return (
    <p className="rounded bg-red-50 p-3 text-sm text-red-700">{message}</p>
  );
}
