import { NextResponse } from "next/server";
import { payrollService } from "@/services/payroll.service";

export async function POST (req: Request) {
    try {
        const body = await req.json()

        const payroll = await payrollService.createRecord(body)
        
        return NextResponse.json(payroll, { status: 201 })

    } catch (error) {
        return NextResponse.json({ message: "500 internal server error"}, { status: 500 })
    }
}

export async function GET () {
    try {
        const payroll = await payrollService.filterAllRecord()

        if (!payroll) {
            return NextResponse.json({ message: "Employee record doesn't exist"}, { status: 204})
        }

        return NextResponse.json(payroll, { status: 200 })
        
    } catch (error) {
        return NextResponse.json({ message: "500 internal server error"}, { status: 500})
    }
}