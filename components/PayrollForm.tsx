// components/PayrollForm.tsx
"use client"

import { useState } from "react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { PayrollRecord, PayrollFormState } from "@/types/payroll"

interface FormProps {
  editingPayroll: PayrollRecord | null
  onSuccess: () => void
  onCancel: () => void
}

const initialFormState: PayrollFormState = {
  employee_name: "",
  employee_gender: "Male",
  employee_email: "",
  department: "",
  salary: 0,
  status: "Active",
}

export default function PayrollForm({
  editingPayroll,
  onSuccess,
  onCancel,
}: FormProps) {
  // Directly seed initial state using the item passed down by the parent key
  const [formData, setFormData] = useState<PayrollFormState>(
    editingPayroll || initialFormState
  )

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    const isEditing = !!editingPayroll
    const url = isEditing
      ? `/api/payroll/${editingPayroll?.id}`
      : "/api/payroll"
    const method = isEditing ? "PUT" : "POST"

    try {
      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...formData,
          salary: Number(formData.salary), // Ensure type safety for Prisma backend
        }),
      })

      if (res.ok) {
        setFormData(initialFormState)
        onSuccess()
      }
    } catch (err) {
      console.error("Failed to submit form:", err)
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-4 rounded-xl border bg-white p-5 shadow-sm"
    >
      <h2 className="text-lg font-bold text-gray-900">
        {editingPayroll ? "Update Employee" : "Add New Employee"}
      </h2>

      <div className="space-y-1">
        <label className="text-sm font-medium">Full Name</label>
        <Input
          type="text"
          required
          value={formData.employee_name}
          onChange={(e) =>
            setFormData({ ...formData, employee_name: e.target.value })
          }
          placeholder="John Doe"
        />
      </div>

      <div className="space-y-1">
        <label className="text-sm font-medium">Email Address</label>
        <Input
          type="email"
          required
          value={formData.employee_email}
          onChange={(e) =>
            setFormData({ ...formData, employee_email: e.target.value })
          }
          placeholder="johndoe@company.com"
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-1">
          <label className="text-sm font-medium">Gender</label>
          <Select
            value={formData.employee_gender}
            onValueChange={(value) =>
              setFormData({ ...formData, employee_gender: value })
            }
          >
            <SelectTrigger>
              <SelectValue placeholder="Select gender" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Male">Male</SelectItem>
              <SelectItem value="Female">Female</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-1">
          <label className="text-sm font-medium">Department</label>
          <Input
            type="text"
            required
            value={formData.department}
            onChange={(e) =>
              setFormData({ ...formData, department: e.target.value })
            }
            placeholder="Engineering"
          />
        </div>
      </div>

      <div className="space-y-1">
        <label className="text-sm font-medium">Monthly Salary</label>
        <Input
          type="number"
          required
          value={formData.salary || ""}
          onChange={(e) =>
            setFormData({ ...formData, salary: Number(e.target.value) })
          }
          placeholder="5000"
        />
      </div>

      <div className="space-y-1">
        <label className="text-sm font-medium">Employment Status</label>
        <Select
          value={formData.status}
          onValueChange={(value) => setFormData({ ...formData, status: value })}
        >
          <SelectTrigger>
            <SelectValue placeholder="Select status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="Active">Active</SelectItem>
            <SelectItem value="Inactive">Inactive</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="flex flex-col-reverse gap-2 border-t pt-2 sm:flex-row sm:justify-end">
        {editingPayroll && (
          <Button
            type="button"
            variant="ghost"
            onClick={onCancel}
            className="w-full sm:w-auto"
          >
            Cancel
          </Button>
        )}
        <Button type="submit" className="w-full sm:w-auto">
          {editingPayroll ? "Save Changes" : "Create Record"}
        </Button>
      </div>
    </form>
  )
}
