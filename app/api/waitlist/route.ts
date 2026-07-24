import { createClient } from '@supabase/supabase-js';
import { NextResponse } from 'next/server';

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

let supabase: ReturnType<typeof createClient<any>> | undefined;
function getClient() {
  if (!supabase) {
    supabase = createClient<any>(process.env.SUPABASE_URL as string, process.env.SUPABASE_SERVICE_ROLE_KEY as string, {
      auth: { persistSession: false },
    });
  }
  return supabase;
}

export async function POST(req: Request) {
  const body = await req.json().catch(() => ({}) as Record<string, unknown>);
  const email = String((body as Record<string, unknown>).email ?? '').trim().toLowerCase();

  if (!EMAIL_RE.test(email)) {
    return NextResponse.json({ error: 'invalid_email' }, { status: 400 });
  }

  const { error } = await getClient().from('waitlist').insert({ email });

  // 23505 = unique_violation (ya registrado): tratamos como éxito, sin
  // revelar si el email ya existía.
  if (error && error.code !== '23505') {
    console.error('[waitlist] insert failed:', error);
    return NextResponse.json({ error: 'insert_failed' }, { status: 500 });
  }

  return NextResponse.json({ ok: true });
}
