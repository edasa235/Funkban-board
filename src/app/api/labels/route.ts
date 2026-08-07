import {NextResponse} from "next/server";
import {createLabel, getLabels} from "@/services/labels";

export async function GET() {
    try {
        const labels = await getLabels();
        return NextResponse.json(labels);
    } catch (error) {
        console.error(error);
        return NextResponse.json(
            {
                error: "Failed to get labels"
            },
            {
                status: 500
            }
        );
    }
}

export async function POST(req: Request) {
    try {
        const body = await req.json();
        if (!body.name || typeof body.name !== "string") {
            return NextResponse.json(
                {
                    error: "Name is required"
                },
                {
                    status: 400
                }
            );
        }
        const label = await createLabel(body.name);
        return NextResponse.json(
            label,
            {
                status: 201
            }
        );
    } catch (error) {
        console.error(error);
        return NextResponse.json(
            {
                error: "Failed to create label"
            },
            {
                status: 500
            }
        );
    }
}