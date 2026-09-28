<?php

namespace Database\Seeders;

use App\Models\WebsiteSetting;
use Illuminate\Database\Seeder;

class WebsiteSettingSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        WebsiteSetting::updateOrCreate(
            ['id' => 1],
            [
                'brand_name' => 'BUILDY GYM',
                'tag_line' => 'Station & Equipment',
                'hero_headline' => 'BANGUN TUBUH & CAPAI TARGET FITNESS ANDA BERSAMA BUILDY GYM',
                'hero_subheadline' => 'Pusat kebugaran lengkap, bersih, dan berstandar tinggi. Tersedia di berbagai cabang dengan pelatih profesional.',
                'contact_whatsapp' => '6280000000000', // Template default, admin dapat memperbarui via CMS
                'contact_email' => 'info@buildygym.com',
                'social_instagram' => 'buildygym',
                'social_tiktok' => 'buildygym',
                'footer_text' => 'Pusat kebugaran fisik berstandar tinggi yang berfokus pada pengalaman latihan optimal, peralatan lengkap, dan kenyamanan seluruh member.',
            ]
        );
    }
}
