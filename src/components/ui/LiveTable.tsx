import { useState } from "react";

export interface TableCell {
  text: string;
  highlight?: boolean;
}

export interface TableRow {
  cells: TableCell[];
}

interface LiveTableProps {
  columns: string[];
  rows: TableRow[];
}

export const LiveTable: React.FC<LiveTableProps> = ({ columns, rows }) => {
  const [hoveredRow, setHoveredRow] = useState<number | null>(null);

  return (
    <div
      data-testid="live-table"
      className="overflow-hidden rounded-xl border border-border-subtle"
    >
      <style>{`
        @keyframes scanline-sweep {
          0% { background-position: -100% 0; }
          100% { background-position: 200% 0; }
        }
      `}</style>
      <table className="w-full border-collapse font-mono text-[0.85rem]">
        <thead>
          <tr className="bg-bg-surface">
            {columns.map((col, i) => (
              <th
                key={i}
                className="border-b border-border-subtle px-6 py-4 text-left text-xs font-semibold uppercase tracking-[0.1em] text-accent-primary"
              >
                {col}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, rowIdx) => (
            <tr
              key={rowIdx}
              className="transition-colors duration-200"
              style={
                hoveredRow === rowIdx
                  ? {
                      backgroundColor: "var(--glow-primary)",
                      backgroundImage:
                        "linear-gradient(90deg, transparent 0%, rgba(0,255,65,0.08) 50%, transparent 100%)",
                      backgroundSize: "200% 100%",
                      animation: "scanline-sweep 1.5s ease-in-out infinite",
                    }
                  : undefined
              }
              onMouseEnter={() => setHoveredRow(rowIdx)}
              onMouseLeave={() => setHoveredRow(null)}
            >
              {row.cells.map((cell, cellIdx) => (
                <td
                  key={cellIdx}
                  className={`border-b border-border-subtle px-6 py-4 ${
                    cell.highlight
                      ? "font-semibold text-accent-primary"
                      : hoveredRow === rowIdx
                        ? "text-text-primary"
                        : "text-text-secondary"
                  }`}
                >
                  {cell.text}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
