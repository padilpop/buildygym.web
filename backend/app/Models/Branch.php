<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Branch extends Model
{
    use HasFactory;

    protected $fillable = [
        'name',
        'slug',
        'address',
        'city',
        'phone',
        'whatsapp',
        'opening_hours',
        'google_maps_url',
        'latitude',
        'longitude',
        'image_url',
        'description',
        'is_active',
        'display_order',
    ];

    protected function casts(): array
    {
        return [
            'latitude' => 'decimal:8',
            'longitude' => 'decimal:8',
            'is_active' => 'boolean',
            'display_order' => 'integer',
        ];
    }
}
