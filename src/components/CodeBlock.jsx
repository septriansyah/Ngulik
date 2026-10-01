import { highlight } from '../lib/highlight.js';

export default function CodeBlock({ code, children }) {
  if (children) return <pre className="code">{children}</pre>;
  return <pre className="code" dangerouslySetInnerHTML={{ __html: highlight(code) }} />;
}

export function Output({ text }) {
  return <div className="out"><span className="out-label">Keluaran</span>{text}</div>;
}
