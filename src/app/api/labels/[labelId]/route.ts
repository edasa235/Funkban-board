import {NextResponse} from "next/server";
import {deleteLabel, getLabelById, updateLabel} from "@/services/labels";
import {corsResponse} from "@/lib/cors";

export async function GET(
    req: Request,
    {params}: { params: Promise<{ labelId: string }> }
) {
    const {labelId} = await params;
    const label = await getLabelById(labelId);

    if (!label) {
        return corsResponse(NextResponse.json(
            {
                error: "Label not found"
            },
            {
                status: 404
            }
        ));
    }

    return corsResponse(NextResponse.json(label));
}

export async function PATCH(
    req: Request,
    {params}: { params: Promise<{ labelId: string }> }
) {
    const {labelId} = await params;
    const body = await req.json();

    if (!body.name) {
        return corsResponse(NextResponse.json(
            {
                error: "Name is required"
            },
            {
                status: 400
            }
        ));
    }

    const label = await updateLabel(
        labelId,
        body.name
    );

    return corsResponse(NextResponse.json(label));
}

export async function DELETE(
    req: Request,
    {params}: { params: Promise<{ labelId: string }> }
) {
    const {labelId} = await params;
    const label = await deleteLabel(labelId);

    return corsResponse(NextResponse.json(label));
}