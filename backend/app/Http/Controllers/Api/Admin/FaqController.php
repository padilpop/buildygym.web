<?php

namespace App\Http\Controllers\Api\Admin;

use App\Http\Controllers\Controller;
use App\Models\Faq;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class FaqController extends Controller
{
    public function index(Request $request): JsonResponse
    {
        $query = Faq::query();

        if ($request->has('search')) {
            $search = $request->input('search');
            $query->where('question', 'like', "%{$search}%")
                  ->orWhere('answer', 'like', "%{$search}%");
        }

        if ($request->has('category')) {
            $query->where('category', $request->input('category'));
        }

        if ($request->has('is_active')) {
            $query->where('is_active', filter_var($request->input('is_active'), FILTER_VALIDATE_BOOLEAN));
        }

        $faqs = $query->orderBy('display_order', 'asc')->get();

        return response()->json([
            'data' => $faqs,
        ]);
    }

    public function store(Request $request): JsonResponse
    {
        $validated = $request->validate([
            'question' => ['required', 'string'],
            'answer' => ['required', 'string'],
            'category' => ['required', 'string', 'max:100'],
            'is_active' => ['boolean'],
            'display_order' => ['integer'],
        ]);

        $faq = Faq::create($validated);

        return response()->json([
            'message' => 'FAQ berhasil ditambahkan.',
            'data' => $faq,
        ], 201);
    }

    public function show($id): JsonResponse
    {
        $faq = Faq::findOrFail($id);

        return response()->json([
            'data' => $faq,
        ]);
    }

    public function update(Request $request, $id): JsonResponse
    {
        $faq = Faq::findOrFail($id);

        $validated = $request->validate([
            'question' => ['sometimes', 'required', 'string'],
            'answer' => ['sometimes', 'required', 'string'],
            'category' => ['sometimes', 'required', 'string', 'max:100'],
            'is_active' => ['boolean'],
            'display_order' => ['integer'],
        ]);

        $faq->update($validated);

        return response()->json([
            'message' => 'FAQ berhasil diperbarui.',
            'data' => $faq,
        ]);
    }

    public function destroy($id): JsonResponse
    {
        $faq = Faq::findOrFail($id);
        $faq->delete();

        return response()->json([
            'message' => 'FAQ berhasil dihapus.',
        ]);
    }

    public function toggleStatus($id): JsonResponse
    {
        $faq = Faq::findOrFail($id);
        $faq->is_active = ! $faq->is_active;
        $faq->save();

        return response()->json([
            'message' => 'Status FAQ berhasil diubah.',
            'data' => $faq,
        ]);
    }
}
