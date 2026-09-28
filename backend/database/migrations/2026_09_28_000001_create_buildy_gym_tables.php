<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        // 1. Memberships Table
        Schema::create('memberships', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->decimal('price', 12, 2);
            $table->integer('duration_months')->default(1);
            $table->string('duration_label');
            $table->text('description')->nullable();
            $table->json('benefits')->nullable();
            $table->boolean('is_popular')->default(false);
            $table->boolean('is_active')->default(true);
            $table->integer('display_order')->default(0);
            $table->timestamps();
        });

        // 2. Personal Trainers Table
        Schema::create('personal_trainers', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->string('photo_url', 500)->nullable();
            $table->string('specialization');
            $table->text('bio')->nullable();
            $table->integer('experience_years')->default(0);
            $table->json('certifications')->nullable();
            $table->string('contact_whatsapp', 50)->nullable();
            $table->boolean('is_active')->default(true);
            $table->integer('display_order')->default(0);
            $table->timestamps();
        });

        // 3. Branches Table
        Schema::create('branches', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->string('slug')->unique();
            $table->text('address');
            $table->string('city', 100);
            $table->string('phone', 50)->nullable();
            $table->string('whatsapp', 50);
            $table->string('opening_hours');
            $table->text('google_maps_url')->nullable();
            $table->decimal('latitude', 10, 8)->nullable();
            $table->decimal('longitude', 11, 8)->nullable();
            $table->string('image_url', 500)->nullable();
            $table->text('description')->nullable();
            $table->boolean('is_active')->default(true);
            $table->integer('display_order')->default(0);
            $table->timestamps();
        });

        // 4. Facilities Table
        Schema::create('facilities', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->text('description')->nullable();
            $table->string('icon_name', 100)->nullable();
            $table->string('image_url', 500)->nullable();
            $table->boolean('is_featured')->default(false);
            $table->boolean('is_active')->default(true);
            $table->integer('display_order')->default(0);
            $table->timestamps();
        });

        // 5. Testimonials Table
        Schema::create('testimonials', function (Blueprint $table) {
            $table->id();
            $table->string('member_name');
            $table->string('member_role', 100)->nullable();
            $table->string('avatar_url', 500)->nullable();
            $table->text('content');
            $table->integer('rating')->default(5);
            $table->boolean('is_published')->default(true);
            $table->integer('display_order')->default(0);
            $table->timestamps();
        });

        // 6. Gallery Table
        Schema::create('gallery', function (Blueprint $table) {
            $table->id();
            $table->string('title')->nullable();
            $table->string('image_url', 500);
            $table->string('category', 100)->default('General');
            $table->boolean('is_active')->default(true);
            $table->integer('display_order')->default(0);
            $table->timestamps();
        });

        // 7. FAQs Table
        Schema::create('faqs', function (Blueprint $table) {
            $table->id();
            $table->text('question');
            $table->text('answer');
            $table->string('category', 100)->default('General');
            $table->boolean('is_active')->default(true);
            $table->integer('display_order')->default(0);
            $table->timestamps();
        });

        // 8. Website Settings Table
        Schema::create('website_settings', function (Blueprint $table) {
            $table->id();
            $table->string('brand_name')->default('BUILDY GYM');
            $table->string('tag_line')->nullable();
            $table->string('logo_url', 500)->nullable();
            $table->string('favicon_url', 500)->nullable();
            $table->text('hero_headline')->nullable();
            $table->text('hero_subheadline')->nullable();
            $table->string('contact_whatsapp', 50)->nullable();
            $table->string('contact_email')->nullable();
            $table->string('social_instagram')->nullable();
            $table->string('social_tiktok')->nullable();
            $table->text('footer_text')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('website_settings');
        Schema::dropIfExists('faqs');
        Schema::dropIfExists('gallery');
        Schema::dropIfExists('testimonials');
        Schema::dropIfExists('facilities');
        Schema::dropIfExists('branches');
        Schema::dropIfExists('personal_trainers');
        Schema::dropIfExists('memberships');
    }
};
