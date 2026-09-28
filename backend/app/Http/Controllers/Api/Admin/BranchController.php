<?php

namespace App\Http\Controllers\Api\Admin;

use App\Http\Controllers\Controller;
use App\Models\Branch;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Str;

class BranchController extends Controller
{
    public function index(Request $request): JsonResponse
    {
        $query = Branch::query();

        if ($request->has('search')) {
            $search = $request->input('search');
            $query->where('name', 'like', "%{$search}%")
                  ->orWhere('city', 'like', "%{$search}%")
                  ->orWhere('address', 'like', "%{$search}%");
        }

        if ($request->has('is_active')) {
            $query->where('is_active', filter_var($request->input('is_active'), FILTER_VALIDATE_BOOLEAN));
        }

        $branches = $query->orderBy('display_order', 'asc')->get();

        return response()->json([
            'data' => $branches,
        ]);
    }

    public function store(Request $request): JsonResponse
    {
        $validated = $request->validate([
            'name' => ['required', 'string', 'max:255'],
            'slug' => ['nullable', 'string', 'max:255', 'unique:branches,slug'],
            'address' => ['required', 'string'],
            'city' => ['required', 'string', 'max:100'],
            'phone' => ['nullable', 'string', 'max:50'],
            'whatsapp' => ['required', 'string', 'max:50'],
            'opening_hours' => ['required', 'string', 'max:255'],
            'google_maps_url' => ['nullable', 'string'],
            'latitude' => ['nullable', 'numeric'],
            'longitude' => ['nullable', 'numeric'],
            'image_url' => ['nullable', 'string', 'max:500'],
            'description' => ['nullable', 'string'],
            'is_active' => ['boolean'],
            'display_order' => ['integer'],
        ]);

        if (empty($validated['slug'])) {
            $validated['slug'] = Str::slug($validated['name']);
        }

        $branch = Branch::create($validated);

        return response()->json([
            'message' => 'Cabang berhasil ditambahkan.',
            'data' => $branch,
        ], 201);
    }

    public function show($id): JsonResponse
    {
        $branch = Branch::findOrFail($id);

        return response()->json([
            'data' => $branch,
        ]);
    }

    public function update(Request $request, $id): JsonResponse
    {
        $branch = Branch::findOrFail($id);

        $validated = $request->validate([
            'name' => ['sometimes', 'required', 'string', 'max:255'],
            'slug' => ['sometimes', 'required', 'string', 'max:255', 'unique:branches,slug,' . $id],
            'address' => ['sometimes', 'required', 'string'],
            'city' => ['sometimes', 'required', 'string', 'max:100'],
            'phone' => ['nullable', 'string', 'max:50'],
            'whatsapp' => ['sometimes', 'required', 'string', 'max:50'],
            'opening_hours' => ['sometimes', 'required', 'string', 'max:255'],
            'google_maps_url' => ['nullable', 'string'],
            'latitude' => ['nullable', 'numeric'],
            'longitude' => ['nullable', 'numeric'],
            'image_url' => ['nullable', 'string', 'max:500'],
            'description' => ['nullable', 'string'],
            'is_active' => ['boolean'],
            'display_order' => ['integer'],
        ]);

        $branch->update($validated);

        return response()->json([
            'message' => 'Cabang berhasil diperbarui.',
            'data' => $branch,
        ]);
    }

    public function destroy($id): JsonResponse
    {
        $branch = Branch::findOrFail($id);
        $branch->delete();

        return response()->json([
            'message' => 'Cabang berhasil dihapus.',
        ]);
    }

    public function toggleStatus($id): JsonResponse
    {
        $branch = Branch::findOrFail($id);
        $branch->is_active = ! $branch->is_active;
        $branch->save();

        return response()->json([
            'message' => 'Status cabang berhasil diubah.',
            'data' => $branch,
        ]);
    }
}
