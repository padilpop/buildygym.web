<?php

namespace App\Http\Controllers\Api\Admin;

use App\Http\Controllers\Controller;
use App\Models\Testimonial;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class TestimonialController extends Controller
{
    public function index(Request $request): JsonResponse
    {
        $query = Testimonial::query();

        if ($request->has('search')) {
            $search = $request->input('search');
            $query->where('member_name', 'like', "%{$search}%")
                  ->orWhere('content', 'like', "%{$search}%");
        }

        if ($request->has('is_published')) {
            $query->where('is_published', filter_var($request->input('is_published'), FILTER_VALIDATE_BOOLEAN));
        }

        $testimonials = $query->orderBy('display_order', 'asc')->get();

        return response()->json([
            'data' => $testimonials,
        ]);
    }

    public function store(Request $request): JsonResponse
    {
        $validated = $request->validate([
            'member_name' => ['required', 'string', 'max:255'],
            'member_role' => ['nullable', 'string', 'max:100'],
            'avatar_url' => ['nullable', 'string', 'max:500'],
            'content' => ['required', 'string'],
            'rating' => ['required', 'integer', 'between:1,5'],
            'is_published' => ['boolean'],
            'display_order' => ['integer'],
        ]);

        $testimonial = Testimonial::create($validated);

        return response()->json([
            'message' => 'Testimoni berhasil ditambahkan.',
            'data' => $testimonial,
        ], 201);
    }

    public function show($id): JsonResponse
    {
        $testimonial = Testimonial::findOrFail($id);

        return response()->json([
            'data' => $testimonial,
        ]);
    }

    public function update(Request $request, $id): JsonResponse
    {
        $testimonial = Testimonial::findOrFail($id);

        $validated = $request->validate([
            'member_name' => ['sometimes', 'required', 'string', 'max:255'],
            'member_role' => ['nullable', 'string', 'max:100'],
            'avatar_url' => ['nullable', 'string', 'max:500'],
            'content' => ['sometimes', 'required', 'string'],
            'rating' => ['sometimes', 'required', 'integer', 'between:1,5'],
            'is_published' => ['boolean'],
            'display_order' => ['integer'],
        ]);

        $testimonial->update($validated);

        return response()->json([
            'message' => 'Testimoni berhasil diperbarui.',
            'data' => $testimonial,
        ]);
    }

    public function destroy($id): JsonResponse
    {
        $testimonial = Testimonial::findOrFail($id);
        $testimonial->delete();

        return response()->json([
            'message' => 'Testimoni berhasil dihapus.',
        ]);
    }

    public function togglePublish($id): JsonResponse
    {
        $testimonial = Testimonial::findOrFail($id);
        $testimonial->is_published = ! $testimonial->is_published;
        $testimonial->save();

        return response()->json([
            'message' => 'Status publikasi testimoni berhasil diubah.',
            'data' => $testimonial,
        ]);
    }
}
