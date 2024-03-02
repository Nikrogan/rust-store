import { NextResponse } from "next/server";


const protectedRoute = ['/profile'];
const adminRoute = ['/admin']

export default function MiddleWare (req: any) {
    const session = req.cookies.get('session');

    if(!session && protectedRoute.includes(req.nextUrl.pathname)) {
        const absoluite = new URL('/', req.nextUrl.origin)
        return NextResponse.redirect(absoluite.toString())
    }
    const role = req.cookies.get('role');
    if(!role && adminRoute.includes(req.nextUrl.pathname)) {
        const absoluite = new URL('/', req.nextUrl.origin)
        return NextResponse.redirect(absoluite.toString())
    }
}