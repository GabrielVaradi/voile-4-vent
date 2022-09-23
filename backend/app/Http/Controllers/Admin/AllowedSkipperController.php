<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\Api\Admin\AllowedSkipper\StoreAllowedSkipperRequest;
use App\Http\Resources\Admin\AllowedSkipper\AllowedSkipperCollection;
use App\Http\Resources\Admin\AllowedSkipper\AllowedSkipperResource;
use App\Models\Admin\AllowedSkipper;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class AllowedSkipperController extends Controller
{
    /**
     * @return AllowedSkipperCollection
     */
    public function index(): AllowedSkipperCollection
    {
        return new AllowedSkipperCollection(AllowedSkipper::all());
    }

    /**
     * @param StoreAllowedSkipperRequest $request
     * @return AllowedSkipperResource
     */
    public function store(StoreAllowedSkipperRequest $request): AllowedSkipperResource
    {
        $allowedSkipper = new AllowedSkipper($request->all());
        $allowedSkipper->save();
        return new AllowedSkipperResource($allowedSkipper);
    }

    /**
     * @param AllowedSkipper $allowedSkipper
     * @param Request $request
     * @return AllowedSkipperResource
     * @mixin Builder
     */

    public function update(AllowedSkipper $allowedSkipper, Request $request): AllowedSkipperResource
    {
        $allowedSkipper->update($request->all());
        return new AllowedSkipperResource($allowedSkipper);
    }

    /**
     * @param AllowedSkipper $allowedSkipper
     * @return JsonResponse
     * @mixin Builder
     */

    public function delete(AllowedSkipper $allowedSkipper): JsonResponse
    {
        $allowedSkipper->delete();
        return response()->json(['success' => true]);
    }
}
