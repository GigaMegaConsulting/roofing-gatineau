import { NextResponse } from "next/server";
import { whisperTwiml } from "@/lib/voice";

const xmlHeaders = { "Content-Type": "text/xml; charset=utf-8" };
export async function POST() { return new NextResponse(whisperTwiml(), { headers: xmlHeaders }); }
export async function GET() { return new NextResponse(whisperTwiml(), { headers: xmlHeaders }); }
