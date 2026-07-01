// app/payroll/components/PayrollTable.tsx
"use client";

import { useState } from "react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { PayrollRecord } from "@/types/payroll";

interface TableProps {
  data: PayrollRecord[];
  onEdit: (record: PayrollRecord) => void;
  onDelete: (id: number) => void;
}

export default function PayrollTable({ data, onEdit, onDelete }: TableProps) {
  // 1. Setup Pagination State
  const [currentPage, setCurrentPage] = useState(1);
  const recordsPerPage = 10;

  if (data.length === 0) {
    return (
      <div className="p-8 text-center text-sm text-muted-foreground border border-dashed rounded-lg">
        No employee payroll records found.
      </div>
    );
  }

  // 2. Calculate Math for Slicing Data
  const totalPages = Math.ceil(data.length / recordsPerPage);
  const indexOfLastRecord = currentPage * recordsPerPage;
  const indexOfFirstRecord = indexOfLastRecord - recordsPerPage;
  
  // This is the array of exactly 10 items (or less) for the current page
  const currentRecords = data.slice(indexOfFirstRecord, indexOfLastRecord);

  return (
    <div className="space-y-4">
      {/* Table Container */}
      <div className="border rounded-lg bg-white shadow-sm">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Employee</TableHead>
              <TableHead>Department</TableHead>
              <TableHead>Salary</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {currentRecords.map((row) => (
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

      {/* 3. Pagination Controls (Only show if there's more than 1 page) */}
      {totalPages > 1 && (
        <div className="flex items-center justify-between px-2">
          <p className="text-sm text-muted-foreground">
            Page <strong>{currentPage}</strong> of {totalPages} ({data.length} total entries)
          </p>
          <div className="flex space-x-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
            >
              Previous
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
              disabled={currentPage === totalPages}
            >
              Next
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}