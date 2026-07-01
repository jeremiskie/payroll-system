// app/payroll/page.tsx
"use client";

import { useState, useEffect } from "react";
import PayrollForm from "@/components/PayrollForm";
import PayrollTable from "@/components/PayrollTable";
import { PayrollRecord } from "@/types/payroll";

export default function PayrollDashboard() {
  const [records, setRecords] = useState<PayrollRecord[]>([]);
  const [editingPayroll, setEditingPayroll] = useState<PayrollRecord | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  // Fetch data from API
  const loadPayrollRecords = async () => {
    try {
      setLoading(true);
      const res = await fetch("/api/payroll");
      if (res.status === 200) {
        const data = await res.json();
        setRecords(data);
      } else {
        setRecords([]);
      }
    } catch (err) {
      console.error("Could not fetch database records:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadPayrollRecords();
  }, []);

  // API Call: Delete Record
  const handleRecordDelete = async (id: number) => {
    if (!confirm("Are you sure you want to permanently delete this worker entry?")) return;
    
    try {
      const res = await fetch(`/api/payroll/${id}`, { method: "DELETE" });
      if (res.ok) {
        loadPayrollRecords();
        if (editingPayroll?.id === id) setEditingPayroll(null); // Reset form if deleting current active item
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="max-w-7xl mx-auto p-6 md:p-10 space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight text-gray-900">Payroll System</h1>
        <p className="text-sm text-muted-foreground mt-1">
          Manage corporate worker lists, departmental categorization, and compensation updates.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
        {/* Left Hand: Create / Edit Module */}
        <div className="lg:col-span-1">
          <PayrollForm
            editingPayroll={editingPayroll}
            onSuccess={() => {
              loadPayrollRecords();
              setEditingPayroll(null);
            }}
            onCancel={() => setEditingPayroll(null)}
          />
        </div>

        {/* Right Hand: Directory View Module */}
        <div className="lg:col-span-2">
          {loading ? (
            <div className="p-8 text-center text-sm text-muted-foreground animate-pulse">
              Syncing backend records...
            </div>
          ) : (
            <PayrollTable
              data={records}
              onEdit={(record) => setEditingPayroll(record)}
              onDelete={handleRecordDelete}
            />
          )}
        </div>
      </div>
    </div>
  );
}