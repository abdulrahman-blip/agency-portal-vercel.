import type { AppProps } from "next/app";
import "../globals.css"; // عندك globals.css جاهز؛ لو نقلته لاحقاً حدّث المسار

export default function App({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />;
}
