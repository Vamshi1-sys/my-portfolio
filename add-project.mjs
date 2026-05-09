import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  'https://lenhxbqmmabaxyiwdmqm.supabase.co',
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImdxYWltaHBhbWFuZm5nY3dyZ2t6Iiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc3ODI5OTgwNywiZXhwIjoyMDkzODc1ODA3fQ.qS1hm7hsVH5V3BxaXP7rL1x9OklehiO6zMVrlzymXfk'
);

const project = {
  title: 'AQI Testing and Prediction',
  description: 'Machine learning system that tests and predicts future Air Quality Index using AI-powered forecasting models.',
  image_url: '/project-5.png',
  tech: ['Python', 'Machine Learning', 'AI', 'Data Analysis'],
  github_url: '#',
  demo_url: '#',
  sort_order: 5
};

const { data, error } = await supabase
  .from('projects')
  .insert([project])
  .select();

if (error) {
  console.error('Error:', error);
} else {
  console.log('Project added successfully:', data);
}
