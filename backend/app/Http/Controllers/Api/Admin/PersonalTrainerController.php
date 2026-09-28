<?php

namespace App\Http\Controllers\Api\Admin;

use App\Http\Controllers\Controller;
use App\Models\PersonalTrainer;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class PersonalTrainerController extends Controller
{
    public function index(Request $request): JsonResponse
    {
        $query = PersonalTrainer::query();

        if ($request->has('search')) {
            $search = $request->input('search');
            $query->where('name', 'like', "%{$search}%")
                  ->orWhere('specialization', 'like', "%{$search}%");
        }

        if ($request->has('is_active')) {
            $query->where('is_active', filter_var($request->input('is_active'), FILTER_VALIDATE_BOOLEAN));
        }

        $trainers = $query->orderBy('display_order', 'asc')->get();

        return response()->json([
            'data' => $trainers,
        ]);
    }

    public function store(Request $request): JsonResponse
    {
        $validated = $request->validate([
            'name' => ['required', 'string', 'max:255'],
            'photo_url' => ['nullable', 'string', 'max:500'],
            'specialization' => ['required', 'string', 'max:255'],
            'bio' => ['nullable', 'string'],
            'experience_years' => ['integer', 'min:0'],
            'certifications' => ['nullable', 'array'],
            'certifications.*' => ['string'],
            'contact_whatsapp' => ['nullable', 'string', 'max:50'],
            'is_active' => ['boolean'],
            'display_order' => ['integer'],
        ]);

        $trainer = PersonalTrainer::create($validated);

        return response()->json([
            'message' => 'Data pelatih berhasil ditambahkan.',
            'data' => $trainer,
        ], 201);
    }

    public function show($id): JsonResponse
    {
        $trainer = PersonalTrainer::findOrFail($id);

        return response()->json([
            'data' => $trainer,
        ]);
    }

    public function update(Request $request, $id): JsonResponse
    {
        $trainer = PersonalTrainer::findOrFail($id);

        $validated = $request->validate([
            'name' => ['sometimes', 'required', 'string', 'max:255'],
            'photo_url' => ['nullable', 'string', 'max:500'],
            'specialization' => ['sometimes', 'required', 'string', 'max:255'],
            'bio' => ['nullable', 'string'],
            'experience_years' => ['integer', 'min:0'],
            'certifications' => ['nullable', 'array'],
            'certifications.*' => ['string'],
            'contact_whatsapp' => ['nullable', 'string', 'max:50'],
            'is_active' => ['boolean'],
            'display_order' => ['integer'],
        ]);

        $trainer->update($validated);

        return response()->json([
            'message' => 'Data pelatih berhasil diperbarui.',
            'data' => $trainer,
        ]);
    }

    public function destroy($id): JsonResponse
    {
        $trainer = PersonalTrainer::findOrFail($id);
        $trainer->delete();

        return response()->json([
            'message' => 'Data pelatih berhasil dihapus.',
        ]);
    }

    public function toggleStatus($id): JsonResponse
    {
        $trainer = PersonalTrainer::findOrFail($id);
        $trainer->is_active = ! $trainer->is_active;
        $trainer->save();

        return response()->json([
            'message' => 'Status pelatih berhasil diubah.',
            'data' => $trainer,
        ]);
    }
}
