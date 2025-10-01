import type { AppProps } from "next/app";
import "../globals.css"; // يستورد ملف CSS اللي عندك في الجذر

export default function App({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />;
}
