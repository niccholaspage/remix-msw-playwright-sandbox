/**
 * By default, Remix will handle hydrating your app on the client for you.
 * You are free to delete this file if you'd like to, but if you ever want it revealed again, you can run `npx remix reveal` ✨
 * For more information, see https://remix.run/file-conventions/entry.client
 */

import { RemixBrowser } from "@remix-run/react";
import { startTransition, StrictMode } from "react";
import { hydrateRoot } from "react-dom/client";

async function prepareApp() {
  if (import.meta.env.VITE_ENABLE_MOCKING === "true") {
    const { worker } = await import("./mocks/browser");
    return worker.start();
  }

  return Promise.resolve();
}

prepareApp().then(() =>
  startTransition(() => {
    hydrateRoot(
      document,
      <StrictMode>
        <RemixBrowser />
      </StrictMode>
    );
  })
);
