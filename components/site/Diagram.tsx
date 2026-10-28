import type { Diagram as Spec, DiagramEdge, DiagramNode } from "@/lib/diagrams";

const C = {
  ink: "#0c0c5c",
  olive: "#474306",
  face: "#FDFCDF",
  paper: "#fefbe0",
  sun: "#FFD93D",
  amber: "#FFB82E",
  mint: "#9CFB9F",
  muted: "rgba(12,12,92,0.4)",
};

const framed = new Set(["system", "secure", "model", "box", "blocked"]);
const shadow: Partial<Record<DiagramNode["kind"], string>> = {
  system: C.sun,
  secure: C.amber,
  model: C.mint,
};

// Poppins averages a little under 0.6em per character.
const textW = (s: string, size: number) => s.length * size * 0.56;

function half(n: DiagramNode) {
  if (framed.has(n.kind)) {
    const w =
      n.w ?? Math.max(textW(n.label, 15), textW(n.sub ?? "", 12)) + 40;
    return { hw: w / 2, hh: n.sub ? 32 : 25 };
  }
  if (n.kind === "note") return { hw: textW(n.label, 14) / 2, hh: 12 };
  return { hw: 26, hh: 28 };
}

/** Icon nodes carry their label underneath; arrows must clear it. */
function bounds(n: DiagramNode) {
  const { hw, hh } = half(n);
  if (framed.has(n.kind) || n.kind === "note")
    return { left: hw, right: hw, top: hh, bottom: hh };
  const lw = Math.max(textW(n.label, 14), textW(n.sub ?? "", 12)) / 2;
  return { left: hw, right: hw, top: hh, bottom: n.sub ? 72 : 54, lw };
}

/** Where a ray from the node centre towards (tx, ty) leaves its box. */
function exit(n: DiagramNode, tx: number, ty: number, pad: number) {
  const b = bounds(n);
  const dx = tx - n.x;
  const dy = ty - n.y;
  const ex = dx > 0 ? b.right : b.left;
  const ey = dy > 0 ? b.bottom : b.top;
  let t = Math.min(
    dx ? (ex + pad) / Math.abs(dx) : Infinity,
    dy ? (ey + pad) / Math.abs(dy) : Infinity,
  );
  // Leaving through the label band: widen to the label's width.
  if ("lw" in b && b.lw && dy > 0 && dy * t > b.top) {
    const tl = Math.min(
      dx ? (Math.max(b.lw, ex) + pad) / Math.abs(dx) : Infinity,
      (ey + pad) / Math.abs(dy),
    );
    t = Math.max(t, tl);
  }
  return { x: n.x + dx * t, y: n.y + dy * t };
}

function edgeGeom(e: DiagramEdge, a: DiagramNode, b: DiagramNode) {
  const mx = (a.x + b.x) / 2;
  const my = (a.y + b.y) / 2;
  const len = Math.hypot(b.x - a.x, b.y - a.y) || 1;
  const cx = mx + (-(b.y - a.y) / len) * (e.curve ?? 0);
  const cy = my + ((b.x - a.x) / len) * (e.curve ?? 0);
  const p = exit(a, cx, cy, 8);
  const q = exit(b, cx, cy, 10);
  const d = e.curve
    ? `M${p.x},${p.y} Q${cx},${cy} ${q.x},${q.y}`
    : `M${p.x},${p.y} L${q.x},${q.y}`;
  const lx = e.curve ? 0.25 * p.x + 0.5 * cx + 0.25 * q.x : (p.x + q.x) / 2;
  const ly = e.curve ? 0.25 * p.y + 0.5 * cy + 0.25 * q.y : (p.y + q.y) / 2;
  // A label wider than its line would hide the line: lift it off instead.
  let ox = 0;
  let oy = 0;
  if (!e.curve && e.label && e.lx === undefined && e.ly === undefined) {
    const dx = Math.abs(q.x - p.x);
    const dy = Math.abs(q.y - p.y);
    const lw = textW(e.label, 12.5) + 16;
    if (dx >= dy && lw > dx - 36) oy = -20;
    else if (dy > dx && dy < 60) ox = lw / 2 + 6;
  }
  return { d, lx: lx + (e.lx ?? ox), ly: ly + (e.ly ?? oy) };
}

function Icon({ n }: { n: DiagramNode }) {
  const { x, y } = n;
  const s = { fill: C.face, stroke: C.olive, strokeWidth: 1.75 };
  if (n.kind === "actor")
    return (
      <g {...s} strokeLinecap="round">
        <circle cx={x} cy={y - 13} r={10} fill={C.sun} />
        <path d={`M${x - 20},${y + 24} Q${x - 20},${y + 2} ${x},${y + 2} Q${x + 20},${y + 2} ${x + 20},${y + 24}`} />
      </g>
    );
  if (n.kind === "store")
    return (
      <g {...s}>
        <path d={`M${x - 22},${y - 18} V${y + 18} A22,7 0 0 0 ${x + 22},${y + 18} V${y - 18}`} />
        <ellipse cx={x} cy={y - 18} rx={22} ry={7} fill={C.sun} />
        <path d={`M${x - 22},${y - 4} A22,7 0 0 0 ${x + 22},${y - 4} M${x - 22},${y + 7} A22,7 0 0 0 ${x + 22},${y + 7}`} fill="none" />
      </g>
    );
  // doc
  return (
    <g {...s} strokeLinejoin="round">
      <path d={`M${x - 19},${y - 25} H${x + 8} L${x + 19},${y - 14} V${y + 25} H${x - 19} Z`} />
      <path d={`M${x + 8},${y - 25} V${y - 14} H${x + 19}`} fill={C.sun} />
      <path d={`M${x - 11},${y - 3} H${x + 11} M${x - 11},${y + 5} H${x + 11} M${x - 11},${y + 13} H${x + 4}`} strokeWidth={1.25} />
    </g>
  );
}

function Node({ n }: { n: DiagramNode }) {
  if (n.kind === "note")
    return (
      <text x={n.x} y={n.y + 5} textAnchor="middle" fontSize={14} fontWeight={500} fill={C.ink} opacity={0.75}>
        {n.label}
      </text>
    );

  if (!framed.has(n.kind))
    return (
      <g>
        <Icon n={n} />
        <text x={n.x} y={n.y + 48} textAnchor="middle" fontSize={14} fontWeight={600} fill={C.ink}>
          {n.label}
        </text>
        {n.sub && (
          <text x={n.x} y={n.y + 66} textAnchor="middle" fontSize={12} fill={C.ink} opacity={0.6}>
            {n.sub}
          </text>
        )}
      </g>
    );

  const { hw, hh } = half(n);
  const blocked = n.kind === "blocked";
  const tone = shadow[n.kind];
  const ty = n.sub ? n.y - 3 : n.y + 5;
  return (
    <g>
      {tone && (
        <rect x={n.x - hw + 5} y={n.y - hh + 6} width={hw * 2} height={hh * 2} rx={6} fill={tone} />
      )}
      <rect
        x={n.x - hw}
        y={n.y - hh}
        width={hw * 2}
        height={hh * 2}
        rx={6}
        fill={blocked ? "none" : C.face}
        stroke={blocked ? C.muted : C.olive}
        strokeWidth={blocked ? 1.25 : 1.5}
        strokeDasharray={blocked ? "5 5" : undefined}
      />
      <text
        x={n.x}
        y={ty}
        textAnchor="middle"
        fontSize={n.kind === "system" || n.kind === "secure" ? 16 : 15}
        fontWeight={n.kind === "system" || n.kind === "secure" ? 700 : 600}
        fill={blocked ? C.muted : C.ink}
      >
        {n.label}
      </text>
      {n.sub && (
        <text x={n.x} y={n.y + 17} textAnchor="middle" fontSize={12} fill={C.ink} opacity={0.6}>
          {n.sub}
        </text>
      )}
    </g>
  );
}

function Canvas({
  id,
  w,
  h,
  alt,
  nodes,
  edges: specEdges,
  className,
}: {
  id: string;
  w: number;
  h: number;
  alt: string;
  nodes: DiagramNode[];
  edges: DiagramEdge[];
  className: string;
}) {
  const byId = new Map(nodes.map((n) => [n.id, n]));
  const head = `arrow-${id}`;
  const tail = `arrow-start-${id}`;
  const edges = specEdges.flatMap((e) => {
    const a = byId.get(e.from);
    const b = byId.get(e.to);
    return a && b ? [{ e, ...edgeGeom(e, a, b) }] : [];
  });

  return (
    <svg viewBox={`0 0 ${w} ${h}`} role="img" aria-label={alt} className={className}>
      <defs>
        <marker id={head} viewBox="0 0 10 10" refX={9} refY={5} markerWidth={7} markerHeight={7} orient="auto">
          <path d="M1,1 L9,5 L1,9" fill="none" stroke={C.olive} strokeWidth={1.6} strokeLinecap="round" strokeLinejoin="round" />
        </marker>
        <marker id={tail} viewBox="0 0 10 10" refX={1} refY={5} markerWidth={7} markerHeight={7} orient="auto">
          <path d="M9,1 L1,5 L9,9" fill="none" stroke={C.olive} strokeWidth={1.6} strokeLinecap="round" strokeLinejoin="round" />
        </marker>
      </defs>

      {edges.map(({ e, d }) => (
        <path
          key={`${e.from}-${e.to}`}
          d={d}
          fill="none"
          stroke={e.blocked ? C.muted : C.olive}
          strokeWidth={1.5}
          strokeDasharray={e.blocked ? "5 5" : undefined}
          markerEnd={e.blocked ? undefined : `url(#${head})`}
          markerStart={e.both ? `url(#${tail})` : undefined}
        />
      ))}

      {nodes.map((n) => (
        <Node key={n.id} n={n} />
      ))}

      {edges.map(({ e, lx, ly }) =>
        e.blocked ? (
          <g key={`l-${e.from}-${e.to}`}>
            <circle cx={lx} cy={ly} r={11} fill={C.paper} stroke={C.muted} strokeWidth={1.25} />
            <path d={`M${lx - 4},${ly - 4} L${lx + 4},${ly + 4} M${lx + 4},${ly - 4} L${lx - 4},${ly + 4}`} stroke={C.ink} strokeWidth={1.6} strokeLinecap="round" opacity={0.6} />
            {e.label && (
              <text x={lx} y={ly + 30} textAnchor="middle" fontSize={12.5} fill={C.ink} opacity={0.6}>
                {e.label}
              </text>
            )}
          </g>
        ) : e.label ? (
          <g key={`l-${e.from}-${e.to}`}>
            <rect
              x={lx - textW(e.label, 12.5) / 2 - 8}
              y={ly - 12}
              width={textW(e.label, 12.5) + 16}
              height={24}
              rx={12}
              fill={C.paper}
            />
            <text x={lx} y={ly + 4.5} textAnchor="middle" fontSize={12.5} fontWeight={500} fill={C.ink} opacity={0.8}>
              {e.label}
            </text>
          </g>
        ) : null,
      )}
    </svg>
  );
}

export function Diagram({ id, spec }: { id: string; spec: Spec }) {
  const portrait =
    spec.mw && spec.mh && spec.nodes.every((n) => n.m)
      ? {
          nodes: spec.nodes.map((n) => ({ ...n, x: n.m![0], y: n.m![1] })),
          // Label nudges are tuned for the landscape layout.
          edges: spec.edges.map(({ mlx, mly, ...e }) => ({ ...e, lx: mlx, ly: mly })),
        }
      : null;

  if (!portrait)
    return (
      <Canvas
        id={id}
        w={spec.w}
        h={spec.h}
        alt={spec.alt}
        nodes={spec.nodes}
        edges={spec.edges}
        className="block h-auto w-full min-w-[620px] font-sans"
      />
    );

  return (
    <>
      <Canvas
        id={id}
        w={spec.w}
        h={spec.h}
        alt={spec.alt}
        nodes={spec.nodes}
        edges={spec.edges}
        className="hidden h-auto w-full font-sans md:block"
      />
      <Canvas
        id={`${id}-m`}
        w={spec.mw!}
        h={spec.mh!}
        alt={spec.alt}
        nodes={portrait.nodes}
        edges={portrait.edges}
        className="mx-auto block h-auto w-full max-w-[420px] font-sans md:hidden"
      />
    </>
  );
}
