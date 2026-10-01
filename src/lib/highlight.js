const esc = (s) => String(s).replace(/[&<>"]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));

/** Pewarna sintaks Python sederhana. Mengembalikan HTML yang sudah di-escape. */
export function highlight(src) {
  const re = /(f?"[^"\n]*"|f?'[^'\n]*')|(#.*)|\b(\d+(?:\.\d+)?)\b|\b(if|elif|else|for|in|True|False|and|or|not)\b|\b(print|input|int|range|float|str|len|round)\b/g;
  let out = '';
  let last = 0;
  let m;
  while ((m = re.exec(src))) {
    out += esc(src.slice(last, m.index));
    const cls = m[1] ? 's' : m[2] ? 'c' : m[3] ? 'n' : m[4] ? 'k' : 'b';
    out += `<span class="${cls}">${esc(m[0])}</span>`;
    last = re.lastIndex;
  }
  return out + esc(src.slice(last));
}

export const escapeHtml = esc;
