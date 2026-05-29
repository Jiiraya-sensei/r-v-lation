-- Table for audition submissions
CREATE TABLE public.audition_submissions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  first_name text NOT NULL,
  last_name text NOT NULL,
  age integer NOT NULL,
  phone text NOT NULL,
  email text NOT NULL,
  discipline text NOT NULL,
  bio text,
  video_path text,
  video_link text,
  parent_name text,
  parent_consent boolean DEFAULT false,
  created_at timestamptz NOT NULL DEFAULT now()
);

GRANT INSERT ON public.audition_submissions TO anon;
GRANT INSERT ON public.audition_submissions TO authenticated;
GRANT ALL ON public.audition_submissions TO service_role;

ALTER TABLE public.audition_submissions ENABLE ROW LEVEL SECURITY;

-- Anyone can submit
CREATE POLICY "Anyone can submit an audition"
ON public.audition_submissions
FOR INSERT
TO anon, authenticated
WITH CHECK (true);

-- Storage bucket (private) for videos
INSERT INTO storage.buckets (id, name, public)
VALUES ('audition-videos', 'audition-videos', false)
ON CONFLICT (id) DO NOTHING;

-- Anyone can upload to the bucket
CREATE POLICY "Anyone can upload audition videos"
ON storage.objects
FOR INSERT
TO anon, authenticated
WITH CHECK (bucket_id = 'audition-videos');
