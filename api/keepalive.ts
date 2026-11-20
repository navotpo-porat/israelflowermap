// Called once a day by a Vercel Cron Job (see vercel.json).
// The free Supabase plan pauses projects after about a week without database
// activity. The map no longer depends on Supabase, but flower identification,
// "add sighting" and image uploads still do, so we touch the database daily.
export async function GET(): Promise<Response> {
  const url = process.env.VITE_SUPABASE_URL;
  const key = process.env.VITE_SUPABASE_ANON_KEY;
  if (!url || !key) {
    return Response.json({ ok: false, error: 'Supabase env vars missing' }, { status: 500 });
  }
  const headers = { apikey: key, Authorization: `Bearer ${key}`, 'Content-Type': 'application/json' };
  const results: Record<string, number | string> = {};
  try {
    // Lists the public "sighting-images" bucket: a real query on storage.objects in Postgres.
    const storage = await fetch(`${url}/storage/v1/object/list/sighting-images`, {
      method: 'POST',
      headers,
      body: JSON.stringify({ prefix: '', limit: 1 }),
    });
    results.storage = storage.status;
  } catch (error) {
    results.error = (error as Error).message;
  }
  const ok = results.storage === 200;
  return Response.json({ ok, results, at: new Date().toISOString() }, { status: ok ? 200 : 502 });
}
