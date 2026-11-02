CREATE TABLE public.launches (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL DEFAULT auth.uid(),
  author_name text NOT NULL DEFAULT '',
  name text NOT NULL CHECK (char_length(name) BETWEEN 1 AND 80),
  tagline text NOT NULL CHECK (char_length(tagline) BETWEEN 1 AND 160),
  description text NOT NULL DEFAULT '' CHECK (char_length(description) <= 2000),
  website_url text NOT NULL DEFAULT '',
  category text NOT NULL DEFAULT 'Other',
  launch_date date NOT NULL,
  created_at timestamptz NOT NULL DEFAULT now()
);
GRANT SELECT ON public.launches TO anon;
GRANT SELECT, INSERT, UPDATE, DELETE ON public.launches TO authenticated;
GRANT ALL ON public.launches TO service_role;
ALTER TABLE public.launches ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Anyone can view launches" ON public.launches FOR SELECT TO anon, authenticated USING (true);
CREATE POLICY "Users create own launches" ON public.launches FOR INSERT TO authenticated WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users update own launches" ON public.launches FOR UPDATE TO authenticated USING (auth.uid() = user_id) WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users delete own launches" ON public.launches FOR DELETE TO authenticated USING (auth.uid() = user_id);

CREATE TABLE public.backings (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  backer_id uuid NOT NULL DEFAULT auth.uid(),
  launch_id uuid NOT NULL REFERENCES public.launches(id) ON DELETE CASCADE,
  created_at timestamptz NOT NULL DEFAULT now(),
  UNIQUE (backer_id, launch_id)
);
GRANT SELECT ON public.backings TO anon;
GRANT SELECT, INSERT, DELETE ON public.backings TO authenticated;
GRANT ALL ON public.backings TO service_role;
ALTER TABLE public.backings ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Anyone can view backings" ON public.backings FOR SELECT TO anon, authenticated USING (true);
CREATE POLICY "Users back as themselves" ON public.backings FOR INSERT TO authenticated
  WITH CHECK (auth.uid() = backer_id AND NOT EXISTS (SELECT 1 FROM public.launches l WHERE l.id = launch_id AND l.user_id = auth.uid()));
CREATE POLICY "Users remove own backings" ON public.backings FOR DELETE TO authenticated USING (auth.uid() = backer_id);