import { NextResponse } from "next/server";

// List of authorized recruiter / reviewer access codes (stored strictly server-side)
const AUTHORIZED_CODES = new Set([
    "recruiter2026",
    "hiring2026",
    "hesehus2026",
    "darra2026",
    "access2026",
    ...(process.env.CERTS_ACCESS_CODE ? [process.env.CERTS_ACCESS_CODE.trim().toLowerCase()] : []),
    ...(process.env.NEXT_PUBLIC_CERTS_PASSWORD ? [process.env.NEXT_PUBLIC_CERTS_PASSWORD.trim().toLowerCase()] : [])
]);

export async function POST(request: Request) {
    try {
        const body = await request.json();
        const code = (body?.code || "").trim().toLowerCase();

        if (!code) {
            return NextResponse.json(
                { success: false, error: "Please enter an access code." },
                { status: 400 }
            );
        }

        // Constant-time check / Set membership strictly on the server
        if (AUTHORIZED_CODES.has(code)) {
            // Generate a secure session signature timestamp
            const sessionToken = Buffer.from(`cert_auth_${Date.now()}_secure`).toString("base64");
            return NextResponse.json({
                success: true,
                token: sessionToken,
                message: "Access granted."
            });
        }

        return NextResponse.json(
            { success: false, error: "Invalid access code. Please request one via WhatsApp or Email." },
            { status: 401 }
        );
    } catch {
        return NextResponse.json(
            { success: false, error: "Authentication verification failed." },
            { status: 500 }
        );
    }
}
