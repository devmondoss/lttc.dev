const { createClient } = require('@supabase/supabase-js');

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

let supabase;
function getClient() {
  if (!supabase) {
    supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_SERVICE_ROLE_KEY, {
      auth: { persistSession: false },
    });
  }
  return supabase;
}

module.exports = async function handler(req, res) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return res.status(405).json({ error: 'method_not_allowed' });
  }

  const email = String(req.body?.email || '').trim().toLowerCase();
  if (!EMAIL_RE.test(email)) {
    return res.status(400).json({ error: 'invalid_email' });
  }

  const { error } = await getClient().from('waitlist').insert({ email });

  if (error && error.code !== '23505') {
    console.error('[waitlist] insert failed:', error);
    return res.status(500).json({ error: 'insert_failed' });
  }

  // 23505 = unique_violation (ya registrado): tratamos como éxito, sin
  // revelar si el email ya existía.
  return res.status(200).json({ ok: true });
};
