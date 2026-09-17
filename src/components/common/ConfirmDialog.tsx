export function ConfirmDialog({ message }: { message: string }) {
  return (
    <div className="rounded border border-amber-200 bg-amber-50 p-3 text-sm">
      {message}
    </div>
  );
}
