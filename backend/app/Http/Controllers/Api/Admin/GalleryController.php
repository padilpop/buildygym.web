<?php

namespace App\Http\Controllers\Api\Admin;

use App\Http\Controllers\Controller;
use App\Models\Gallery;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class GalleryController extends Controller
{
    public function index(Request $request): JsonResponse
    {
        $query = Gallery::query();

        if ($request->has('category')) {
            $query->where('category', $request->input('category'));
        }

        if ($request->has('is_active')) {
            $query->where('is_active', filter_var($request->input('is_active'), FILTER_VALIDATE_BOOLEAN));
        }

        $items = $query->orderBy('display_order', 'asc')->get();

        return response()->json([
            'data' => $items,
        ]);
    }

    public function store(Request $request): JsonResponse
    {
        $validated = $request->validate([
            'title' => ['nullable', 'string', 'max:255'],
            'image_url' => ['required', 'string', 'max:500'],
            'category' => ['nullable', 'string', 'max:100'],
            'is_active' => ['boolean'],
            'display_order' => ['integer'],
        ]);

        $item = Gallery::create($validated);

        return response()->json([
            'message' => 'Foto galeri berhasil ditambahkan.',
            'data' => $item,
        ], 201);
    }

    public function show($id): JsonResponse
    {
        $item = Gallery::findOrFail($id);

        return response()->json([
            'data' => $item,
        ]);
    }

    public function update(Request $request, $id): JsonResponse
    {
        $item = Gallery::findOrFail($id);

        $validated = $request->validate([
            'title' => ['nullable', 'string', 'max:255'],
            'image_url' => ['sometimes', 'required', 'string', 'max:500'],
            'category' => ['nullable', 'string', 'max:100'],
            'is_active' => ['boolean'],
            'display_order' => ['integer'],
        ]);

        $item->update($validated);

        return response()->json([
            'message' => 'Foto galeri berhasil diperbarui.',
            'data' => $item,
        ]);
    }

    public function destroy($id): JsonResponse
    {
        $item = Gallery::findOrFail($id);
        $item->delete();

        return response()->json([
            'message' => 'Foto galeri berhasil dihapus.',
        ]);
    }

    public function toggleStatus($id): JsonResponse
    {
        $item = Gallery::findOrFail($id);
        $item->is_active = ! $item->is_active;
        $item->save();

        return response()->json([
            'message' => 'Status foto berhasil diubah.',
            'data' => $item,
        ]);
    }
}
