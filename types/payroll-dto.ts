export interface CreatePayrollDTO {
    employee_name: string;
    employee_gender: string;
    employee_email: string;
    department: string;
    salary: number;
    status: string;
}

export interface UpdatePayrollDTO {
    employee_name?: string;
    employee_gender?: string;
    employee_email?: string;
    department?: string;
    salary?: number;
    status?: string;
}