import { NextResponse } from "next/server";
import { payrollService } from "@/services/payroll.service";

export async function GET (req: Request, { params }: { params: Promise<{id: string}> }) {
    try {
        const {id} = await params;

        const payroll = await payrollService.filterByEmployee(Number(id))

        if (!payroll) {
            return NextResponse.json({ message: "Employee record doesn't exist"}, { status: 204})
        }

        return NextResponse.json(payroll, { status: 200 })
        
    } catch (error) {
        return NextResponse.json({ message: "500 internal server error" }, { status: 500})
    }
}

export async function PUT (req: Request, { params }: { params: Promise<{id: string}>}) {
    try {
        const {id} = await params;

        const body = await req.json()

        const payroll = await payrollService.updateRecord(Number(id), body)

        if (!payroll) {
            return NextResponse.json({ message: "Employee record doesn't exist"}, { status: 204})
        }

        return NextResponse.json(payroll, { status: 201 })

    } catch (error) {
        return NextResponse.json({ message: "500 internal server error" }, { status: 500 })
    }
}

export async function DELETE (req: Request, { params }: { params: Promise<{id: string}>}) {
    try {
        const {id} = await params;

        const payroll = await payrollService.deleteRecord(Number(id))

        if (!payroll) {
            return NextResponse.json({ message: "Employee record doesn't exist"}, { status: 204})
        }

        return NextResponse.json({ message: `${id} has been deleted successfully`})
        
    } catch (error) {
        return NextResponse.json({ message: "500 internal server error" }, { status: 500 })
    }
}