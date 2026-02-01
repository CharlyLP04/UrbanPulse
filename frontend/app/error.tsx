"use client";

export default function Error({
  error,
  reset,
}: {
  error: Error;
  reset: () => void;
}) {
  return (
    <main role="alert" aria-labelledby="title-error">
      <h1 id="title-error">Ocurrió un error</h1>
      <p>Algo salió mal. Intenta nuevamente.</p>
      <button onClick={reset}>Reintentar</button>
    </main>
  );
}
