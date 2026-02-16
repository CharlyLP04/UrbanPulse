"use client";

import Link from "next/link";
import { useEffect } from "react";

type ErrorPageProps = {
  error: Error & { digest?: string };
  reset: () => void;
};

export default function ErrorPage({ error, reset }: ErrorPageProps) {
  useEffect(() => {
    console.error("Error capturado en error.tsx:", error);
  }, [error]);

  return (
    <section className="min-h-[70vh] px-4 py-12">
      <div className="mx-auto flex max-w-2xl justify-center">
        <div className="w-full rounded-xl border border-red-200 bg-white p-8 text-center shadow-sm">
          <p className="text-sm font-semibold uppercase tracking-wide text-red-600">
            Error 500
          </p>

          <h1 className="mt-2 text-3xl font-bold text-gray-900">
            Ocurrio un error inesperado
          </h1>

          <p className="mt-4 text-gray-600">
            No pudimos completar tu solicitud. Puedes intentar nuevamente o
            volver al inicio.
          </p>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:justify-center">
            <button
              type="button"
              onClick={() => reset()}
              className="rounded-lg bg-red-600 px-5 py-2.5 font-semibold text-white transition-colors hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-600 focus:ring-offset-2"
            >
              Reintentar
            </button>

            <Link
              href="/"
              className="rounded-lg border border-gray-300 px-5 py-2.5 font-semibold text-gray-700 transition-colors hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2"
            >
              Volver al inicio
            </Link>
          </div>

          {error.digest ? (
            <p className="mt-6 text-xs text-gray-500">
              Referencia del error: {error.digest}
            </p>
          ) : null}
        </div>
      </div>
    </section>
  );
}
