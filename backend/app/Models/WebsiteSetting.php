<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class WebsiteSetting extends Model
{
    use HasFactory;

    protected $fillable = [
        'brand_name',
        'tag_line',
        'logo_url',
        'favicon_url',
        'hero_headline',
        'hero_subheadline',
        'contact_whatsapp',
        'contact_email',
        'social_instagram',
        'social_tiktok',
        'footer_text',
    ];
}
