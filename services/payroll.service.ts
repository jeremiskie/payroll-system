import { prisma } from "@/lib/prisma"
import { CreatePayrollDTO, UpdatePayrollDTO } from "@/types/payroll-dto"

export class PayrollService {
    async createRecord (data: CreatePayrollDTO) {
        return prisma.payroll.create({ data })
    }

    async filterAllRecord () {
        return prisma.payroll.findMany()
    }

    async filterByEmployee (id: number) {
        return prisma.payroll.findUnique({ where: {id} })
    }

    async updateRecord (id: number, data: UpdatePayrollDTO) {
        return prisma.payroll.update({ where: {id}, data})
    }

    async deleteRecord (id: number) {
        return prisma.payroll.delete({ where: {id}})
    }
}

export const payrollService = new PayrollService();