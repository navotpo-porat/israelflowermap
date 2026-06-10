INSERT INTO storage.buckets (id, name, public) VALUES ('sighting-images', 'sighting-images', true);

CREATE POLICY "Public read access" ON storage.objects FOR SELECT TO public USING (bucket_id = 'sighting-images');
