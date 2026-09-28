<?php

namespace App\Http\Controllers\Api\Admin;

use App\Http\Controllers\Controller;
use App\Models\Facility;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class FacilityController extends Controller
{
    public function index(Request $request): JsonResponse
    {
        $query = Facility::query();

        if ($request->has('search')) {
            $search = $request->input('search');
            $query->where('name', 'like', "%{$search}%");
        }

        if ($request->has('is_active')) {
            $query->where('is_active', filter_var($request->input('is_active'), FILTER_VALIDATE_BOOLEAN));
        }

        if ($request->has('is_featured')) {
            $query->where('is_featured', filter_var($request->input('is_featured'), FILTER_VALIDATE_BOOLEAN));
        }

        $facilities = $query->orderBy('display_order', 'asc')->get();

        return response()->json([
            'data' => $facilities,
        ]);
    }

    public function store(Request $request): JsonResponse
    {
        $validated = $request->validate([
            'name' => ['required', 'string', 'max:255'],
            'description' => ['nullable', 'string'],
            'icon_name' => ['nullable', 'string', 'max:100'],
            'image_url' => ['nullable', 'string', 'max:500'],
            'is_featured' => ['boolean'],
            'is_active' => ['boolean'],
            'display_order' => ['integer'],
        ]);

        $facility = Facility::create($validated);

        return response()->json([
            'message' => 'Fasilitas berhasil ditambahkan.',
            'data' => $facility,
        ], 201);
    }

    public function show($id): JsonResponse
    {
        $facility = Facility::findOrFail($id);

        return response()->json([
            'data' => $facility,
        ]);
    }

    public function update(Request $request, $id): JsonResponse
    {
        $facility = Facility::findOrFail($id);

        $validated = $request->validate([
            'name' => ['sometimes', 'required', 'string', 'max:255'],
            'description' => ['nullable', 'string'],
            'icon_name' => ['nullable', 'string', 'max:100'],
            'image_url' => ['nullable', 'string', 'max:500'],
            'is_featured' => ['boolean'],
            'is_active' => ['boolean'],
            'display_order' => ['integer'],
        ]);

        $facility->update($validated);

        return response()->json([
            'message' => 'Fasilitas berhasil diperbarui.',
            'data' => $facility,
        ]);
    }

    public function destroy($id): JsonResponse
    {
        $facility = Facility::findOrFail($id);
        $facility->delete();

        return response()->json([
            'message' => 'Fasilitas berhasil dihapus.',
        ]);
    }

    public function toggleStatus($id): JsonResponse
    {
        $facility = Facility::findOrFail($id);
        $facility->is_active = ! $facility->is_active;
        $facility->save();

        return response()->json([
            'message' => 'Status fasilitas berhasil diubah.',
            'data' => $facility,
        ]);
    }
}
