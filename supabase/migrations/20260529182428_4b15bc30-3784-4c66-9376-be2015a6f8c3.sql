
revoke execute on function public.handle_new_user() from public, anon, authenticated;
revoke execute on function public.set_updated_at() from public, anon, authenticated;

drop policy if exists "Service role manages tickets pdf" on storage.objects;
