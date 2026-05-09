
-- Roles
create type public.app_role as enum ('admin', 'user');

create table public.user_roles (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  role public.app_role not null,
  created_at timestamptz not null default now(),
  unique (user_id, role)
);

alter table public.user_roles enable row level security;

create or replace function public.has_role(_user_id uuid, _role public.app_role)
returns boolean
language sql
stable
security definer
set search_path = public
as $$
  select exists (
    select 1 from public.user_roles
    where user_id = _user_id and role = _role
  )
$$;

create policy "user_roles readable by self"
on public.user_roles for select
to authenticated
using (user_id = auth.uid());

-- Projects
create table public.projects (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  description text not null default '',
  image_url text,
  tech text[] not null default '{}',
  github_url text,
  demo_url text,
  sort_order int not null default 0,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

alter table public.projects enable row level security;

create policy "projects are publicly readable"
on public.projects for select
using (true);

create policy "admins can insert projects"
on public.projects for insert
to authenticated
with check (public.has_role(auth.uid(), 'admin'));

create policy "admins can update projects"
on public.projects for update
to authenticated
using (public.has_role(auth.uid(), 'admin'))
with check (public.has_role(auth.uid(), 'admin'));

create policy "admins can delete projects"
on public.projects for delete
to authenticated
using (public.has_role(auth.uid(), 'admin'));

create or replace function public.set_updated_at()
returns trigger language plpgsql as $$
begin new.updated_at = now(); return new; end; $$;

create trigger projects_set_updated_at
before update on public.projects
for each row execute function public.set_updated_at();

-- Seed initial projects
insert into public.projects (title, description, tech, sort_order) values
('ERP System Development', 'Developed an ERP system to manage organizational data and streamline workflows efficiently.', array['Python','Database Management','UI Design'], 1),
('Restaurant KOT System', 'Designed a Kitchen Order Ticket system that improves communication between restaurant staff and kitchen teams.', array['Python','UI Design','System Management'], 2),
('UI / UX Design Project', 'Created modern user-friendly interface designs focused on usability, accessibility, and user experience.', array['Figma','UI/UX Design'], 3),
('AI YouTube Script Generator', 'AI-powered system that generates engaging Telugu YouTube scripts automatically using trending topics.', array['AI Tools','Python','Automation'], 4);
