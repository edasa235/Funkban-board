import {deletecolumn, getColumnById, updatecolumn} from "@/services/columns";
import {NextResponse} from "next/server";
import {corsResponse} from "@/lib/cors";

export async function GET(
    req: Request,
    {params}: { params: Promise<{ columnId: string }> }
) {
    const {columnId} = await params;
    const columns = await getColumnById(columnId);
    return corsResponse(NextResponse.json(columns));
}

export async function PATCH(req: Request,
                            {params}: { params: Promise<{ columnId: string }> }
) {
    const {columnId} = await params;
    const body = await req.json();
    const columns = await updatecolumn(
        columnId,
        body
    );
    return corsResponse(NextResponse.json(columns));
}

export async function DELETE(
    req: Request,
    {params}: { params: Promise<{ columnId: string }> }
) {
    const {columnId} = await params;

    const column = await deletecolumn(columnId);

    return corsResponse(NextResponse.json(column));
}