"use client";

import { AgGridReact } from "ag-grid-react";
import type { ColDef } from "ag-grid-community";
import { themeQuartz } from "ag-grid-community";

export function DataTable<T extends Record<string, unknown>>({
  rows,
  columns,
}: {
  rows: T[];
  columns: (keyof T)[];
}) {
  const columnDefs: ColDef<T>[] = columns.map((column) => ({
    field: String(column) as ColDef<T>["field"],
    headerName: String(column),
    flex: 1,
    minWidth: 140,
  }));

  return (
    <div className="overflow-hidden rounded border bg-white">
      <AgGridReact<T>
        rowData={rows}
        columnDefs={columnDefs}
        theme={themeQuartz}
        domLayout="autoHeight"
        defaultColDef={{ sortable: true, filter: true, resizable: true }}
      />
    </div>
  );
}
