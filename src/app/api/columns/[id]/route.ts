import {deletecolumn, getColumnById, updatecolumn} from "@/services/columns";
import {NextResponse} from "next/server";
export async function GET(
    req: Request,
    { params }: { params: Promise<{ columnId:string }> }
) {
    const {columnId } = await params;
    const columns = await getColumnById(columnId);
    return NextResponse.json(columns);
}
export async function PATCH ( req: Request,
                              { params }: { params: Promise<{ columnId:string }> }
) {
    const {columnId} = await params;
    const body = await req.json();
    const columns = await updatecolumn(
        columnId,
        body
    );
    return NextResponse.json(columns);
}
export async function DELETE(
    req: Request,
    { params }: { params: Promise<{ columnId:string }> }
) {
    const { columnId } = await params;

    const column = await deletecolumn(columnId);

    return NextResponse.json(column);
}