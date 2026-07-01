// types/payroll.ts

export interface PayrollRecord {
  id: number;
  employee_name: string;
  employee_gender: string;
  employee_email: string;
  department: string;
  salary: number;
  status: string;
}

export type PayrollFormState = Omit<PayrollRecord, "id">;