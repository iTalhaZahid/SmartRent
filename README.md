# SmartRent setup

## Supabase

1. Create a Supabase project.
2. Copy `.env.example` to `.env.local` and add the project URL and publishable key from **Project Settings → API**.
3. Apply `supabase/migrations/20260823120000_initial_schema.sql` with `supabase db push`, or paste it into the Supabase SQL editor.
4. In **Authentication → URL Configuration**, set the site URL and allowed redirect URLs for each deployed environment.
5. Create admin users through a trusted process, then set their `profiles.role` to `ADMIN`. Public registration intentionally permits only `RENTER` and `OWNER`.

The migration creates the database types/tables, indexes, RLS policies, auth profile trigger, booking consistency triggers, initial amenities, and image buckets. Store property images under `<property-id>/<filename>` and profile images under `<user-id>/<filename>` so storage policies can authorize them.

## UI and application libraries

The project uses Tailwind CSS 4 and shadcn/ui with the `new-york` style. Add another component with:

```bash
npx shadcn@latest add <component>
```

Installed application libraries include Supabase SSR, Zod, React Hook Form, Recharts, Lucide, Sonner, and date-fns. Browser code should import `createClient` from `@/lib/supabase/client`; Server Components, Server Actions, and Route Handlers should import it from `@/lib/supabase/server`.
