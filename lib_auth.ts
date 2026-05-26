import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';

export async function GET() {
  const cookieStore = await cookies();
  const session = cookieStore.get('session'); // Replace 'session' with your cookie name

  // 1. Check if session cookie exists
  if (!session) {
    return new NextResponse('Unauthorized', { status: 401 });
  }

  // 2. Validate the session (e.g., decrypt or check in database)
  const isValid = await verifySession(session.value); 
  if (!isValid) {
    return new NextResponse('Forbidden', { status: 403 });
  }

  // 3. Return protected data
  return NextResponse.json({ data: 'Sensitive market information' });
}
// lib/auth.ts
import { cookies } from 'next/headers';

export interface UserSession {
  userId: string;
  roles: string[];
}

export async function verifySession(): Promise<UserSession | null> {
  const cookieStore = await cookies();
  const sessionCookie = cookieStore.get('session');

  if (!sessionCookie) return null;

  try {
    // Replace with your actual decryption logic if you are encrypting cookies
    return JSON.parse(sessionCookie.value) as UserSession;
  } catch (e) {
    return null;
  }
}
// app/api/data/route.ts
import { verifySession } from '@/lib/auth';
import { NextResponse } from 'next/server';

export async function GET() {
  const session = await verifySession();

  if (!session || !session.roles.includes('YOUR_VERIFIED_ROLE_ID')) {
    return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
  }

  return NextResponse.json({ data: 'Protected institutional market data' });
}
import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const code = searchParams.get('code');

  // 1. Exchange code for access_token (use fetch to Discord API)
  // ... (token exchange logic)

  // 2. Fetch User Membership in Trading Flood
  const memberResponse = await fetch(`https://discord.com/api/users/@me/guilds/YOUR_GUILD_ID/member`, {
    headers: { Authorization: `Bearer ${tokenData.access_token}` },
  });
  const memberData = await memberResponse.json();

  // 3. Verify Role and Set Session Cookie
  if (memberData.roles.includes('YOUR_VERIFIED_ROLE_ID')) {
    const sessionData = { userId: memberData.user.id, roles: memberData.roles };
    
    // Create the response object
    const response = NextResponse.redirect(new URL('/dashboard', request.url));
    
    // Set the secure, HttpOnly cookie
    response.cookies.set('session', JSON.stringify(sessionData), {
      httpOnly: true,
      secure: true, // Requires HTTPS, essential for Vercel deployment
      sameSite: 'lax',
      path: '/',
      maxAge: 60 * 60 * 24 * 7, // 1 week
    });

    return response;
  }

  return NextResponse.json({ error: 'Access Denied' }, { status: 403 });
}
