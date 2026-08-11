export default function Loading() {
  return (
    <div className="mx-auto max-w-6xl animate-pulse px-4 pt-8 sm:px-6">
      <div className="h-3 w-48 rounded bg-card-hi" />
      <div className="mt-5 h-9 w-80 max-w-full rounded-lg bg-card-hi" />
      <div className="mt-3 h-4 w-64 rounded bg-card" />
      <div className="mt-6 grid gap-4 lg:grid-cols-4">
        {[0, 1, 2, 3].map((i) => (
          <div key={i} className="card h-64" />
        ))}
      </div>
      <div className="card mt-4 h-96" />
    </div>
  );
}
