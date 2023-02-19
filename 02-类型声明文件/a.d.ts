declare const a: number;
declare const b: string;
interface Point {
  x: number;
  y: number;
}
declare const c: Point;

type D = (point: Point) => void;

declare const d: D;

export { a, b, c, d, Point };
