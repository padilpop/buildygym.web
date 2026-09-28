<?php

namespace Database\Seeders;

use App\Models\Branch;
use App\Models\Facility;
use App\Models\Faq;
use App\Models\Gallery;
use App\Models\Membership;
use App\Models\PersonalTrainer;
use App\Models\Testimonial;
use Illuminate\Database\Seeder;

class InitialGymDataSeeder extends Seeder
{
    public function run(): void
    {
        // 1. Branches
        if (Branch::count() === 0) {
            Branch::create([
                'name' => 'BUILDY GYM — Cabang Mempawah',
                'slug' => 'cabang-mempawah',
                'address' => 'Jl. Raden Kusno No. 45, Terusan, Mempawah Hilir',
                'city' => 'Mempawah',
                'phone' => '081234567891',
                'whatsapp' => '6281234567891',
                'opening_hours' => 'Senin - Sabtu: 06:00 - 22:00 | Minggu: 07:00 - 20:00',
                'google_maps_url' => 'https://maps.google.com/?q=Mempawah',
                'image_url' => 'https://images.unsplash.com/photo-1540497077202-7c8a3999166f?q=80&w=800',
                'description' => 'Cabang pusat dengan area free weights dan mesin isolasi lengkap.',
                'is_active' => true,
                'display_order' => 1,
            ]);

            Branch::create([
                'name' => 'BUILDY GYM — Cabang Desa Kapur',
                'slug' => 'cabang-desa-kapur',
                'address' => 'Jl. Raya Desa Kapur, Kompleks Niaga Blok B, Kubu Raya',
                'city' => 'Kubu Raya',
                'phone' => '081234567892',
                'whatsapp' => '6281234567892',
                'opening_hours' => 'Senin - Sabtu: 06:00 - 22:00 | Minggu: 07:00 - 20:00',
                'google_maps_url' => 'https://maps.google.com/?q=Desa+Kapur+Kubu+Raya',
                'image_url' => 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?q=80&w=800',
                'description' => 'Fasilitas plate-loaded lengkap dan area dumbbell zone yang lapang.',
                'is_active' => true,
                'display_order' => 2,
            ]);

            Branch::create([
                'name' => 'BUILDY GYM — Cabang Kuala Dua',
                'slug' => 'cabang-kuala-dua',
                'address' => 'Jl. Raya Kuala Dua No. 18, Depan Lapangan Bola',
                'city' => 'Kuala Dua',
                'phone' => '081234567893',
                'whatsapp' => '6281234567893',
                'opening_hours' => 'Senin - Sabtu: 06:00 - 22:00 | Minggu: 07:00 - 20:00',
                'google_maps_url' => 'https://maps.google.com/?q=Kuala+Dua',
                'image_url' => 'https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?q=80&w=800',
                'description' => 'Suasana latihan fokus dan bersahabat dengan akses parkir luas.',
                'is_active' => true,
                'display_order' => 3,
            ]);
        }

        // 2. Memberships
        if (Membership::count() === 0) {
            Membership::create([
                'name' => 'Paket Bulanan (1 Bulan)',
                'price' => 200000,
                'duration_months' => 1,
                'duration_label' => '1 Bulan',
                'description' => 'Pilihan fleksibel tanpa komitmen jangka panjang, cocok bagi yang baru memulai rutin gym.',
                'benefits' => [
                    'Akses penuh seluruh area beban & kardio',
                    'Fasilitas loker pribadi & kamar mandi shower',
                    '1x Sesi pengenalan alat & form dasar',
                    'Bebas biaya pendaftaran (Admin Rp 0)',
                ],
                'is_popular' => false,
                'is_active' => true,
                'display_order' => 1,
            ]);

            Membership::create([
                'name' => 'Paket Kuartal (3 Bulan)',
                'price' => 525000,
                'duration_months' => 3,
                'duration_label' => '3 Bulan',
                'description' => 'Paket favorit untuk membangun konsistensi latihan dan melihat transformasi fisik nyata.',
                'benefits' => [
                    'Akses penuh seluruh area beban & kardio',
                    'Akses ke seluruh cabang BUILDY GYM',
                    'Fasilitas loker & shower setiap sesi',
                    '1x Evaluasi komposisi tubuh berkala',
                    'Lebih hemat dibanding bayar per bulan',
                ],
                'is_popular' => true,
                'is_active' => true,
                'display_order' => 2,
            ]);

            Membership::create([
                'name' => 'Paket Semester (6 Bulan)',
                'price' => 950000,
                'duration_months' => 6,
                'duration_label' => '6 Bulan',
                'description' => 'Komitmen terstruktur untuk target kebugaran jangka panjang dengan harga lebih ekonomis.',
                'benefits' => [
                    'Akses penuh seluruh area & seluruh cabang',
                    'Fasilitas loker, shower, & free parking',
                    '2x Konsultasi program latihan personal',
                    'Hak cuti membership (Freeze) hingga 14 hari',
                    'Diskon merchandise & suplemen resmi',
                ],
                'is_popular' => false,
                'is_active' => true,
                'display_order' => 3,
            ]);

            Membership::create([
                'name' => 'Paket Tahunan (12 Bulan)',
                'price' => 1650000,
                'duration_months' => 12,
                'duration_label' => '12 Bulan',
                'description' => 'Paket paling hemat untuk gaya hidup bugar berkelanjutan sepanjang tahun.',
                'benefits' => [
                    'Akses tak terbatas ke seluruh cabang 365 hari',
                    'Prioritas loker & fasilitas eksklusif',
                    'Hak cuti membership (Freeze) hingga 30 hari',
                    'Free 1 sesi Personal Trainer intensif',
                    'Nilai investasi bulanan paling terjangkau',
                ],
                'is_popular' => false,
                'is_active' => true,
                'display_order' => 4,
            ]);
        }

        // 3. Facilities
        if (Facility::count() === 0) {
            Facility::create([
                'name' => 'Free Weight & Power Rack Station',
                'description' => 'Lantai rubber shock-absorbing dengan set barbel Olimpiade, plat beban calibrated, dan power cage aman untuk squat, bench press, serta deadlift.',
                'image_url' => 'https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?q=80&w=800',
                'icon_name' => 'dumbbell',
                'is_featured' => true,
                'is_active' => true,
                'display_order' => 1,
            ]);

            Facility::create([
                'name' => 'Dumbbell Zone (2kg - 50kg)',
                'description' => 'Rak dumbbell berpasangan lengkap dengan kenaikan berat teratur, dilengkapi beberapa bangku adjustable (flat, incline, decline).',
                'image_url' => 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?q=80&w=800',
                'icon_name' => 'dumbbell',
                'is_featured' => true,
                'is_active' => true,
                'display_order' => 2,
            ]);

            Facility::create([
                'name' => 'Pin-Selected & Cable Machines',
                'description' => 'Mesin isolasi otot multifungsi: Dual Adjustable Pulley, Lat Pulldown, Leg Press, Leg Extension, dan Seated Cable Row.',
                'image_url' => 'https://images.unsplash.com/photo-1540497077202-7c8a3999166f?q=80&w=800',
                'icon_name' => 'dumbbell',
                'is_featured' => true,
                'is_active' => true,
                'display_order' => 3,
            ]);

            Facility::create([
                'name' => 'Cardio Deck & Treadmills',
                'description' => 'Treadmill komersial, stationary bikes, dan elliptical machine dengan monitor detak jantung untuk latihan kardiovaskular.',
                'image_url' => 'https://images.unsplash.com/photo-1576678927484-cc907957088c?q=80&w=800',
                'icon_name' => 'heart-pulse',
                'is_featured' => false,
                'is_active' => true,
                'display_order' => 4,
            ]);

            Facility::create([
                'name' => 'Ruangan Berpendingin Udara (AC)',
                'description' => 'Sistem penyejuk udara dan sirkulasi ventilasi yang dioptimalkan untuk menjaga suhu ruangan tetap sejuk selama sesi latihan intensif.',
                'image_url' => 'https://images.unsplash.com/photo-1518611012118-696072aa579a?q=80&w=800',
                'icon_name' => 'snowflake',
                'is_featured' => false,
                'is_active' => true,
                'display_order' => 5,
            ]);

            Facility::create([
                'name' => 'Locker Pribadi & Ruang Ganti Bersih',
                'description' => 'Loker penyimpanan barang berharga, ruang ganti privat, dan toilet higienis yang dibersihkan secara terjadwal setiap hari.',
                'image_url' => 'https://images.unsplash.com/photo-1593079831268-3381b0db4a77?q=80&w=800',
                'icon_name' => 'lockers',
                'is_featured' => false,
                'is_active' => true,
                'display_order' => 6,
            ]);
        }

        // 4. Personal Trainers
        if (PersonalTrainer::count() === 0) {
            PersonalTrainer::create([
                'name' => 'Rian Pratama',
                'photo_url' => 'https://images.unsplash.com/photo-1567013127542-490d757e51fc?q=80&w=800',
                'specialization' => 'Hypertrophy & Strength Training',
                'experience_years' => 6,
                'certifications' => ['Certified Fitness Coach (APKI)', 'Biomechanics & Form Correction'],
                'bio' => 'Fokus pada teknik pengangkatan yang aman, pemrograman hipertrofi progresif, dan pembentukan massa otot berbasis data.',
                'contact_whatsapp' => '6281234567890',
                'is_active' => true,
                'display_order' => 1,
            ]);

            PersonalTrainer::create([
                'name' => 'Budi Santoso',
                'photo_url' => 'https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?q=80&w=800',
                'specialization' => 'Fat Loss & Functional Conditioning',
                'experience_years' => 5,
                'certifications' => ['Certified Personal Trainer', 'Sports Nutrition Specialist'],
                'bio' => 'Membantu member pemula dan intermediate menurunkan kadar lemak tubuh melalui kombinasi weight training dan panduan nutrisi harian.',
                'contact_whatsapp' => '6281234567890',
                'is_active' => true,
                'display_order' => 2,
            ]);

            PersonalTrainer::create([
                'name' => 'Dimas Aditya',
                'photo_url' => 'https://images.unsplash.com/photo-1548690312-e3b507d8c110?q=80&w=800',
                'specialization' => 'Powerlifting & Core Stability',
                'experience_years' => 7,
                'certifications' => ['Powerlifting Coach Level 1', 'Injury Prevention & Mobility'],
                'bio' => 'Menguasai tiga angkatan utama (Squat, Bench, Deadlift) dengan perhatian mendalam pada mobilitas sendi dan pencegahan cedera.',
                'contact_whatsapp' => '6281234567890',
                'is_active' => true,
                'display_order' => 3,
            ]);
        }

        // 5. Testimonials
        if (Testimonial::count() === 0) {
            Testimonial::create([
                'member_name' => 'Bambang Irawan',
                'member_role' => 'Member sejak Februari 2024',
                'content' => 'Suasana latihannya enak banget, nggak berisik musik yang bikin pusing. Alat bebannya lengkap terutama dumbbell dan rak squat-nya kokoh. Ruangannya juga ber-AC dan bersih.',
                'rating' => 5,
                'is_published' => true,
                'display_order' => 1,
            ]);

            Testimonial::create([
                'member_name' => 'Siti Nurhaliza',
                'member_role' => 'Member 6 Bulan, Cabang Mempawah',
                'content' => 'Awalnya canggung karena baru pertama kali masuk gym, tapi coach di BUILDY GYM ramah dan mau ngajarin cara pakai mesin isolasi yang benar. Bebas biaya admin tersembunyi juga.',
                'rating' => 5,
                'is_published' => true,
                'display_order' => 2,
            ]);

            Testimonial::create([
                'member_name' => 'Feri Gunawan',
                'member_role' => 'Member Tahunan',
                'content' => 'Pilihan membership tahunannya sangat worth it. Fleksibel bisa latihan di cabang mana saja pas lagi dinas kerja. Lokernya aman dan showernya selalu bersih.',
                'rating' => 5,
                'is_published' => true,
                'display_order' => 3,
            ]);
        }

        // 6. Gallery
        if (Gallery::count() === 0) {
            Gallery::create([
                'title' => 'Area Barbel & Dumbbell Set',
                'category' => 'Peralatan & Beban',
                'image_url' => 'https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?q=80&w=800',
                'is_active' => true,
                'display_order' => 1,
            ]);

            Gallery::create([
                'title' => 'Suasana Sesi Latihan Malam',
                'category' => 'Suasana Gym',
                'image_url' => 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?q=80&w=800',
                'is_active' => true,
                'display_order' => 2,
            ]);

            Gallery::create([
                'title' => 'Mesin Isolasi & Cable Cross',
                'category' => 'Peralatan & Beban',
                'image_url' => 'https://images.unsplash.com/photo-1540497077202-7c8a3999166f?q=80&w=800',
                'is_active' => true,
                'display_order' => 3,
            ]);

            Gallery::create([
                'title' => 'Treadmill & Cardio Deck Ber-AC',
                'category' => 'Suasana Gym',
                'image_url' => 'https://images.unsplash.com/photo-1576678927484-cc907957088c?q=80&w=800',
                'is_active' => true,
                'display_order' => 4,
            ]);

            Gallery::create([
                'title' => 'Area Peregangan & Matras',
                'category' => 'Studio & Kelas',
                'image_url' => 'https://images.unsplash.com/photo-1518611012118-696072aa579a?q=80&w=800',
                'is_active' => true,
                'display_order' => 5,
            ]);

            Gallery::create([
                'title' => 'Locker Room & Ruang Ganti',
                'category' => 'Suasana Gym',
                'image_url' => 'https://images.unsplash.com/photo-1593079831268-3381b0db4a77?q=80&w=800',
                'is_active' => true,
                'display_order' => 6,
            ]);
        }

        // 7. FAQs
        if (Faq::count() === 0) {
            Faq::create([
                'category' => 'Membership',
                'question' => 'Apakah ada biaya pendaftaran (admin fee) tambahan saat pertama kali join?',
                'answer' => 'Tidak ada. Di BUILDY GYM tidak ada biaya pendaftaran atau biaya administrasi tersembunyi. Biaya yang Anda bayarkan murni sesuai harga paket membership yang dipilih.',
                'is_active' => true,
                'display_order' => 1,
            ]);

            Faq::create([
                'category' => 'Membership',
                'question' => 'Apakah satu kartu membership bisa digunakan di seluruh cabang BUILDY GYM?',
                'answer' => 'Ya, paket membership reguler (3, 6, dan 12 bulan) otomatis memberikan hak akses penuh (All-Club Access) ke seluruh jaringan cabang BUILDY GYM tanpa biaya tambahan.',
                'is_active' => true,
                'display_order' => 2,
            ]);

            Faq::create([
                'category' => 'Fasilitas & Jam Operasional',
                'question' => 'Kapan jam operasional gym dibuka?',
                'answer' => 'Seluruh cabang BUILDY GYM beroperasi dari hari Senin hingga Sabtu pukul 06:00 - 22:00, dan hari Minggu pukul 07:00 - 20:00.',
                'is_active' => true,
                'display_order' => 3,
            ]);

            Faq::create([
                'category' => 'Personal Trainer',
                'question' => 'Apakah pemula wajib menyewa Personal Trainer?',
                'answer' => 'Tidak wajib. Bagi pemula yang baru pertama kali bergabung, staf instruktur kami akan memberikan sesi orientasi dasar mengenai cara pemakaian alat dengan aman. Namun jika Anda membutuhkan bimbingan intensif dan program latihan terukur, Anda dapat mengambil sesi Personal Trainer resmi kami.',
                'is_active' => true,
                'display_order' => 4,
            ]);

            Faq::create([
                'category' => 'Umum',
                'question' => 'Apa saja perlengkapan yang wajib dibawa saat berlatih?',
                'answer' => 'Anda wajib mengenakan pakaian olahraga yang nyaman, sepatu olahraga/sneakers bertali yang bersih (dilarang menggunakan sandal/telanjang kaki di area beban), dan disarankan membawa handuk kecil pribadi.',
                'is_active' => true,
                'display_order' => 5,
            ]);
        }
    }
}
