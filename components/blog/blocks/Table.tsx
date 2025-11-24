import type { TableBlock } from "../../../types/blogContent.ts";

export function Table({ headers, rows }: TableBlock) {
  return (
    <div className="my-6 overflow-hidden rounded-xl border border-dc-200">
      <table className="w-full text-left border-collapse border-spacing-0">
        <thead className="bg-dc-100">
          <tr>
            {headers.map((header, i) => (
              <th
                key={i}
                className="text-dc-800 font-semibold text-sm px-4 py-3 border-b border-dc-200 text-left whitespace-nowrap"
              >
                {header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="bg-white">
          {rows.map((row, i) => (
            <tr
              key={i}
              className="hover:bg-dc-50 transition-colors"
            >
              {row.map((cell, j) => (
                <td
                  key={j}
                  className={`px-4 py-3 ${
                    i === rows.length - 1 ? "" : "border-b"
                  } border-dc-100 text-dc-600 text-[16px] align-middle leading-[1.5]`}
                >
                  {cell}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

