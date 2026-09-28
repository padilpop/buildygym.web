<?php

namespace App\Http\Controllers\Api\Admin;

use App\Http\Controllers\Controller;
use App\Models\Membership;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class MembershipController extends Controller
{
    public function index(Request $request): JsonResponse
    {
        $query = Membership::query();

        if ($request->has('search')) {
            $search = $request->input('search');
            $query->where('name', 'like', "%{$search}%");
        }

        if ($request->has('is_active')) {
            $query->where('is_active', filter_var($request->input('is_active'), FILTER_VALIDATE_BOOLEAN));
        }

        $memberships = $query->orderBy('display_order', 'asc')->orderBy('price', 'asc')->get();

        return response()->json([
            'data' => $memberships,
        ]);
    }

    public function store(Request $request): JsonResponse
    {
        $validated = $request->validate([
            'name' => ['required', 'string', 'max:255'],
            'price' => ['required', 'numeric', 'min:0'],
            'duration_months' => ['required', 'integer', 'min:1'],
            'duration_label' => ['required', 'string', 'max:100'],
            'description' => ['nullable', 'string'],
            'benefits' => ['nullable', 'array'],
            'benefits.*' => ['string'],
            'is_popular' => ['boolean'],
            'is_active' => ['boolean'],
            'display_order' => ['integer'],
        ]);

        $membership = Membership::create($validated);

        return response()->json([
            'message' => 'Paket membership berhasil ditambahkan.',
            'data' => $membership,
        ], 201);
    }

    public function show($id): JsonResponse
    {
        $membership = Membership::findOrFail($id);

        return response()->json([
            'data' => $membership,
        ]);
    }

    public function update(Request $request, $id): JsonResponse
    {
        $membership = Membership::findOrFail($id);

        $validated = $request->validate([
            'name' => ['sometimes', 'required', 'string', 'max:255'],
            'price' => ['sometimes', 'required', 'numeric', 'min:0'],
            'duration_months' => ['sometimes', 'required', 'integer', 'min:1'],
            'duration_label' => ['sometimes', 'required', 'string', 'max:100'],
            'description' => ['nullable', 'string'],
            'benefits' => ['nullable', 'array'],
            'benefits.*' => ['string'],
            'is_popular' => ['boolean'],
            'is_active' => ['boolean'],
            'display_order' => ['integer'],
        ]);

        $membership->update($validated);

        return response()->json([
            'message' => 'Paket membership berhasil diperbarui.',
            'data' => $membership,
        ]);
    }

    public function destroy($id): JsonResponse
    {
        $membership = Membership::findOrFail($id);
        $membership->delete();

        return response()->json([
            'message' => 'Paket membership berhasil dihapus.',
        ]);
    }

    public function toggleStatus($id): JsonResponse
    {
        $membership = Membership::findOrFail($id);
        $membership->is_active = ! $membership->is_active;
        $membership->save();

        return response()->json([
            'message' => 'Status paket berhasil diubah.',
            'data' => $membership,
        ]);
    }
}
