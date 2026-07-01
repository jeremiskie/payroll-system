// app/payroll/components/PayrollTable.tsx
"use client";

import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { PayrollRecord } from "@/types/payroll";

interface TableProps {
  data: PayrollRecord[];
  onEdit: (record: PayrollRecord) => void;
  onDelete: (id: number) => void;
}

export default function PayrollTable({ data, onEdit, onDelete }: TableProps) {
  if (data.length === 0) {
    return (
      <div className="p-8 text-center text-sm text-muted-foreground border border-dashed rounded-lg">
        No employee payroll records found.
      </div>
    );
  }

  return (
    <div className="border rounded-lg bg-white shadow-sm">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Employee</TableHead>
            <TableHead>Department</TableHead>
            <TableHead>Salary</TableHead>
            <TableHead>Status</TableHead>
            <TableHead className="text-center">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data.map((row) => (
            <TableRow key={row.id}>
              <TableCell>
                <div className="font-medium">{row.employee_name}</div>
                <div className="text-xs text-muted-foreground">{row.employee_email}</div>
              </TableCell>
              <TableCell>{row.department}</TableCell>
              <TableCell>${row.salary.toLocaleString()}</TableCell>
              <TableCell>
                <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium ${
                  row.status === "Active" ? "bg-green-100 text-green-800" : "bg-gray-100 text-gray-800"
                }`}>
                  {row.status}
                </span>
              </TableCell>
              <TableCell className="text-right space-x-2">
                <Button variant="outline" size="sm" onClick={() => onEdit(row)}>
                  Edit
                </Button>
                <Button variant="destructive" size="sm" onClick={() => onDelete(row.id)}>
                  Delete
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}