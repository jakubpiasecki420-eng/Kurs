/** Współczynnik kontrastu WCAG 2.x dla dwóch kolorów w zapisie #RRGGBB. */

function kanal(v: number): number {
  const s = v / 255;
  return s <= 0.04045 ? s / 12.92 : Math.pow((s + 0.055) / 1.055, 2.4);
}

export function luminancja(hex: string): number {
  const h = hex.replace('#', '');
  const r = parseInt(h.slice(0, 2), 16);
  const g = parseInt(h.slice(2, 4), 16);
  const b = parseInt(h.slice(4, 6), 16);
  return 0.2126 * kanal(r) + 0.7152 * kanal(g) + 0.0722 * kanal(b);
}

export function kontrast(a: string, b: string): number {
  const [jasny, ciemny] = [luminancja(a), luminancja(b)].sort((x, y) => y - x);
  return (jasny + 0.05) / (ciemny + 0.05);
}
