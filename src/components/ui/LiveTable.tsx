import { useState, useRef, useEffect } from "react";

export interface TableColumn {
  key: string;
  label: string;
}

export interface TableCell {
  text: string;
  tooltip?: string;
  highlight?: "low" | "medium" | "high";
}

export interface TableRow {
  label: string;
  cells: Record<string, TableCell>;
}

interface LiveTableProps {
  columns: TableColumn[];
  rows: TableRow[];
}

const highlightClass: Record<string, string> = {
  low: "text-text-muted",
  medium: "text-text-secondary",
  high: "text-accent-primary font-semibold",
};

const Tooltip = ({
  text,
  anchorRef,
}: {
  text: string;
  anchorRef: React.RefObject<HTMLElement | null>;
}) => {
  const [pos, setPos] = useState<{ top: number; left: number } | null>(null);

  useEffect(() => {
    const updatePosition = () => {
      if (!anchorRef.current) return;
      const rect = anchorRef.current.getBoundingClientRect();
      setPos({ top: rect.bottom + 6, left: rect.left + rect.width / 2 });
    };

    updatePosition();

    window.addEventListener("resize", updatePosition);
    window.addEventListener("scroll", updatePosition, true);

    return () => {
      window.removeEventListener("resize", updatePosition);
      window.removeEventListener("scroll", updatePosition, true);
    };
  }, [anchorRef, text]);

  if (!pos) return null;

  return (
    <div
      role="tooltip"
      className="pointer-events-none fixed z-50 max-w-xs rounded border border-border-subtle bg-bg-surface px-3 py-2 text-xs text-text-secondary shadow-lg"
      style={{ top: pos.top, left: pos.left, transform: "translateX(-50%)" }}
    >
      {text}
    </div>
  );
};

export const LiveTable = ({ columns, rows }: LiveTableProps) => {
  const [hoveredCell, setHoveredCell] = useState<{
    row: number;
    col: string;
  } | null>(null);
  const [hoveredRow, setHoveredRow] = useState<number | null>(null);
  const cellRef = useRef<HTMLElement | null>(null);
  const prefersReducedMotion =
    typeof window !== "undefined" &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  const activeTooltip =
    hoveredCell &&
    rows[hoveredCell.row]?.cells[hoveredCell.col]?.tooltip;

  return (
    <div
      data-testid="live-table"
      className="overflow-hidden rounded-xl border border-border-subtle"
    >
      {!prefersReducedMotion && (
        <style>{`
          @keyframes scanline-sweep {
            0% { transform: translateY(-100%); }
            100% { transform: translateY(100%); }
          }
        `}</style>
      )}
      <table className="w-full border-collapse font-mono text-sm">
        <thead>
          <tr className="bg-bg-surface">
            <th className="border-b border-border-subtle px-6 py-4 text-left text-xs font-semibold uppercase tracking-[0.1em] text-accent-primary">
              {/* row label header — empty */}
            </th>
            {columns.map((col) => (
              <th
                key={col.key}
                className="border-b border-border-subtle px-6 py-4 text-left text-xs font-semibold uppercase tracking-[0.1em] text-accent-primary"
              >
                {col.label}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, rowIdx) => {
            const isHovered = hoveredRow === rowIdx;
            return (
              <tr
                key={rowIdx}
                className={`relative transition-colors duration-200 ${
                  rowIdx % 2 === 0 ? "bg-bg-card" : "bg-bg-surface"
                } ${isHovered ? "border-accent-primary" : ""}`}
                onMouseEnter={() => setHoveredRow(rowIdx)}
                onMouseLeave={() => {
                  setHoveredRow(null);
                  setHoveredCell(null);
                }}
              >
                {/* Scanline overlay */}
                {isHovered && !prefersReducedMotion && (
                  <td
                    aria-hidden
                    className="pointer-events-none absolute inset-0"
                    style={{ padding: 0, border: "none" }}
                  >
                    <div
                      className="absolute inset-0 overflow-hidden"
                      style={{
                        boxShadow: "inset 0 0 12px var(--glow-primary)",
                      }}
                    >
                      <div
                        className="absolute left-0 h-[2px] w-full bg-accent-primary/30"
                        style={{
                          animation: "scanline-sweep 1.5s ease-in-out infinite",
                        }}
                      />
                    </div>
                  </td>
                )}

                {/* Row label */}
                <td
                  className={`border-b border-border-subtle px-6 py-4 font-semibold ${
                    isHovered ? "text-accent-primary" : "text-text-primary"
                  }`}
                >
                  {row.label}
                </td>

                {/* Data cells */}
                {columns.map((col) => {
                  const cell = row.cells[col.key];
                  if (!cell) return <td key={col.key} className="border-b border-border-subtle px-6 py-4" />;

                  const isThisCellHovered =
                    hoveredCell?.row === rowIdx && hoveredCell?.col === col.key;

                  const colorClass = cell.highlight
                    ? highlightClass[cell.highlight]
                    : isHovered
                      ? "text-text-primary"
                      : "text-text-secondary";

                  return (
                    <td
                      key={col.key}
                      ref={isThisCellHovered ? (cellRef as React.RefObject<HTMLTableCellElement>) : undefined}
                      className={`border-b border-border-subtle px-6 py-4 ${colorClass} ${
                        cell.tooltip ? "cursor-help" : ""
                      }`}
                      onMouseEnter={() => {
                        if (cell.tooltip) {
                          setHoveredCell({ row: rowIdx, col: col.key });
                        }
                      }}
                      onMouseLeave={() => setHoveredCell(null)}
                    >
                      {cell.text}
                      {cell.tooltip && (
                        <span className="ml-1 text-text-muted" aria-label="info">
                          ⓘ
                        </span>
                      )}
                    </td>
                  );
                })}
              </tr>
            );
          })}
        </tbody>
      </table>

      {activeTooltip && (
        <Tooltip text={activeTooltip} anchorRef={cellRef} />
      )}
    </div>
  );
};
