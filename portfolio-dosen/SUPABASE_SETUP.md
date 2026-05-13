# Supabase Setup untuk Portfolio Dosen

## 1. Buat Project di Supabase

1. Kunjungi https://supabase.com
2. Login dan buat project baru
3. Simpan **Project URL** dan **Anon/Public Key**

## 2. Setup Environment Variables

Buat file `.env` di root folder project:

```env
VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-key
```

## 3. Setup Database Schema

Jalankan SQL berikut di Supabase SQL Editor:

```sql
-- Enable UUID extension
create extension if not exists "uuid-ossp";

-- Create profiles table (extends auth.users)
create table public.profiles (
  id uuid references auth.users on delete cascade primary key,
  email text,
  full_name text,
  nidn text,
  role text default 'dosen' check (role in ('admin', 'dosen')),
  verified boolean default false,
  institution text,
  field_of_expertise text,
  bio text,
  education text,
  profile_image text,
  created_at timestamp with time zone default timezone('utc'::text, now()),
  updated_at timestamp with time zone default timezone('utc'::text, now())
);

-- Create portfolios table
create table public.portfolios (
  id uuid default uuid_generate_v4() primary key,
  user_id uuid references public.profiles(id) on delete cascade,
  title text not null,
  category text check (category in ('paper', 'book', 'hki', 'project', 'video', 'award', 'certification')),
  description text,
  file_url text,
  created_at timestamp with time zone default timezone('utc'::text, now()),
  updated_at timestamp with time zone default timezone('utc'::text, now())
);

-- Create contact_messages table
create table public.contact_messages (
  id uuid default uuid_generate_v4() primary key,
  name text not null,
  email text not null,
  subject text not null,
  message text not null,
  created_at timestamp with time zone default timezone('utc'::text, now())
);

-- Enable Row Level Security
alter table public.profiles enable row level security;
alter table public.portfolios enable row level security;
alter table public.contact_messages enable row level security;

-- Profiles policies
create policy "Public profiles are viewable by everyone"
  on public.profiles for select
  using (verified = true);

create policy "Users can view own profile"
  on public.profiles for select
  using (auth.uid() = id);

create policy "Users can update own profile"
  on public.profiles for update
  using (auth.uid() = id);

create policy "Insert profile on signup"
  on public.profiles for insert
  with check (auth.uid() = id);

-- Portfolios policies
create policy "Verified dosen portfolios are viewable by everyone"
  on public.portfolios for select
  using (
    exists (
      select 1 from public.profiles
      where profiles.id = portfolios.user_id
      and profiles.verified = true
    )
  );

create policy "Users can view own portfolios"
  on public.portfolios for select
  using (auth.uid() = user_id);

create policy "Users can insert own portfolios"
  on public.portfolios for insert
  with check (auth.uid() = user_id);

create policy "Users can update own portfolios"
  on public.portfolios for update
  using (auth.uid() = user_id);

create policy "Users can delete own portfolios"
  on public.portfolios for delete
  using (auth.uid() = user_id);

-- Contact messages policies
create policy "Anyone can insert contact messages"
  on public.contact_messages for insert
  with check (true);

create policy "Admins can view contact messages"
  on public.contact_messages for select
  using (
    exists (
      select 1 from public.profiles
      where profiles.id = auth.uid()
      and profiles.role = 'admin'
    )
  );

-- Function to handle new user signup
create or replace function public.handle_new_user()
returns trigger as $$
begin
  insert into public.profiles (id, email, full_name, nidn, role)
  values (
    new.id,
    new.email,
    new.raw_user_meta_data->>'full_name',
    new.raw_user_meta_data->>'nidn',
    'dosen'
  );
  return new;
end;
$$ language plpgsql security definer;

-- Trigger to create profile on signup
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();

-- Function to update updated_at timestamp
create or replace function public.update_updated_at_column()
returns trigger as $$
begin
  new.updated_at = now();
  return new;
end;
$$ language plpgsql;

-- Triggers for updated_at
create trigger update_profiles_updated_at before update on public.profiles
  for each row execute procedure public.update_updated_at_column();

create trigger update_portfolios_updated_at before update on public.portfolios
  for each row execute procedure public.update_updated_at_column();

-- Create initial admin user (ganti dengan email Anda)
-- Setelah signup, jalankan manual di Supabase dashboard:
-- UPDATE public.profiles SET role = 'admin', verified = true WHERE email = 'admin@example.com';
```

## 4. Setup Authentication

1. Di Supabase Dashboard, pergi ke **Authentication > Providers**
2. Pastikan **Email** provider enabled
3. Untuk development, disable email confirmation (Settings > Email Auth > Disable confirm email)

## 5. Storage Setup (Optional - untuk upload file)

```sql
-- Create storage bucket
insert into storage.buckets (id, name, public) values ('portfolios', 'portfolios', true);

-- Storage policies
create policy "Public Access"
  on storage.objects for select
  using (bucket_id = 'portfolios');

create policy "Authenticated users can upload"
  on storage.objects for insert
  with check (
    bucket_id = 'portfolios' 
    and auth.role() = 'authenticated'
  );

create policy "Users can update own files"
  on storage.objects for update
  using (bucket_id = 'portfolios' and auth.uid() = owner);

create policy "Users can delete own files"
  on storage.objects for delete
  using (bucket_id = 'portfolios' and auth.uid() = owner);
```

## 6. Menjalankan Development Server

```bash
cd portfolio-dosen
npm run dev
```

Server akan berjalan di http://localhost:5173

## 7. Membuat Admin User Pertama

Setelah aplikasi berjalan:

1. Daftar sebagai user biasa melalui halaman Register
2. Di Supabase Dashboard, buka **SQL Editor**
3. Jalankan query berikut (ganti dengan email Anda):

```sql
UPDATE public.profiles 
SET role = 'admin', verified = true 
WHERE email = 'email-anda@example.com';
```

4. Logout dan login kembali, sekarang Anda memiliki akses admin

## Struktur Fitur

### Public Pages:
- **Home**: Landing page dengan fitur dan statistik
- **About**: Penjelasan detail manfaat website
- **Portfolio**: Daftar dosen terverifikasi dengan karya mereka
- **Contact**: Form kontak dan informasi

### Authentication:
- **Login**: Halaman login untuk dosen/admin
- **Register**: Pendaftaran dosen baru (menunggu verifikasi admin)

### Dashboard Dosen:
- Edit CV lengkap (nama, NIDN, institusi, bidang keahlian, bio, pendidikan)
- Upload karya (paper, buku, HKI, proyek, video, penghargaan, sertifikasi)
- Lihat status verifikasi
- Manage portfolio karya

### Dashboard Admin:
- Verifikasi/tolak pendaftaran dosen baru
- Lihat semua dosen terdaftar
- Kelola konten yang dibuat dosen
- Lihat pesan kontak dari publik
