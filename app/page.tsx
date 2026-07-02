// app/payroll/page.tsx
"use client"

import { useState, useEffect } from "react"
import PayrollForm from "@/components/PayrollForm"
import PayrollTable from "@/components/PayrollTable"
import { Input } from "@/components/ui/input" // Import Shadcn Input
import { PayrollRecord } from "@/types/payroll"

export default function PayrollDashboard() {
  const [records, setRecords] = useState<PayrollRecord[]>([])
  const [editingPayroll, setEditingPayroll] = useState<PayrollRecord | null>(
    null
  )
  const [loading, setLoading] = useState<boolean>(true)

  // 1. Add Search Query State
  const [searchQuery, setSearchQuery] = useState<string>("")

  const loadPayrollRecords = async () => {
    try {
      setLoading(true)
      const res = await fetch("/api/payroll")
      if (res.status === 200) {
        const data = await res.json()
        setRecords(data)
      } else {
        setRecords([])
      }
    } catch (err) {
      console.error("Could not fetch database records:", err)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    const loadPayrollRecords = async () => {
      try {
        setLoading(true)
        const res = await fetch("/api/payroll")
        if (res.status === 200) {
          const data = await res.json()
          setRecords(data)
        } else {
          setRecords([])
        }
      } catch (err) {
        console.error("Could not fetch database records:", err)
      } finally {
        setLoading(false)
      }
    }

    loadPayrollRecords()
  }, []) // Now empty [] is perfectly valid and won't show red!

  const handleRecordDelete = async (id: number) => {
    if (
      !confirm("Are you sure you want to permanently delete this worker entry?")
    )
      return
    try {
      const res = await fetch(`/api/payroll/${id}`, { method: "DELETE" })
      if (res.ok) {
        loadPayrollRecords()
        if (editingPayroll?.id === id) setEditingPayroll(null)
      }
    } catch (err) {
      console.error(err)
    }
  }

  // 2. Filter records instantly as the user types
  const filteredRecords = records.filter((employee) =>
    employee.employee_name.toLowerCase().includes(searchQuery.toLowerCase())
  )

  return (
    <div className="mx-auto max-w-7xl space-y-6 p-6 md:p-10">
      <div>
        <h1 className="text-3xl font-bold tracking-tight text-gray-900">
          Payroll System
        </h1>
        <p className="mt-1 text-sm text-muted-foreground">
          Manage corporate worker lists, departmental categorization, and
          compensation updates.
        </p>
      </div>

      <div className="grid grid-cols-1 items-start gap-8 lg:grid-cols-3">
        {/* Left Hand Side: Form + Search Widget Box */}
        <div className="space-y-6 lg:col-span-1">
          {/* 3. The Live Search Input Box right under the Form */}
          <div className="space-y-2 rounded-xl border bg-white p-5 shadow-sm">
            <label className="text-sm font-bold text-gray-900">
              Quick Search Directory
            </label>
            <Input
              type="text"
              placeholder="Type name to filter list instantly..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)} // Updates state on every single keystroke
            />
            {searchQuery && (
              <p className="text-xs text-muted-foreground">
                Found {filteredRecords.length} matching results
              </p>
            )}
          </div>

          <PayrollForm
            key={editingPayroll ? editingPayroll.id : "new-record"}
            editingPayroll={editingPayroll}
            onSuccess={() => {
              loadPayrollRecords()
              setEditingPayroll(null)
            }}
            onCancel={() => setEditingPayroll(null)}
          />
        </div>

        {/* Right Hand Side: Table View */}
        <div className="lg:col-span-2">
          {loading ? (
            <div className="animate-pulse p-8 text-center text-sm text-muted-foreground">
              Syncing backend records...
            </div>
          ) : (
            /* 4. Pass filteredRecords instead of raw records */
            <PayrollTable
              data={filteredRecords}
              onEdit={(record) => setEditingPayroll(record)}
              onDelete={handleRecordDelete}
            />
          )}
        </div>
      </div>
    </div>
  )
}
