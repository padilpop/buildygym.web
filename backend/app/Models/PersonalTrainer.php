<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class PersonalTrainer extends Model
{
    use HasFactory;

    protected $fillable = [
        'name',
        'photo_url',
        'specialization',
        'bio',
        'experience_years',
        'certifications',
        'contact_whatsapp',
        'is_active',
        'display_order',
    ];

    protected function casts(): array
    {
        return [
            'experience_years' => 'integer',
            'certifications' => 'array',
            'is_active' => 'boolean',
            'display_order' => 'integer',
        ];
    }
}
