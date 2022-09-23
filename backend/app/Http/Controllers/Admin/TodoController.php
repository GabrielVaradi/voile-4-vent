<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\Api\Admin\Todo\StoreTodoRequest;
use App\Http\Resources\Admin\Todo\TodoCollection;
use App\Http\Resources\Admin\Todo\TodoResource;
use App\Models\Admin\Todo;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class TodoController extends Controller
{
    /**
     * @return TodoCollection
     */
    public function index(): TodoCollection
    {
        return new TodoCollection(Todo::all()->sortByDesc('id'));
    }

    /**
     * @param StoreTodoRequest $request
     * @return TodoResource
     */
    public function store(StoreTodoRequest $request): TodoResource
    {
        $todo = new Todo($request->all());
        $todo->save();
        return new TodoResource($todo);
    }

    /**
     * @param Todo $todo
     * @param Request $request
     * @return TodoResource
     * @mixin Builder
     */

    public function update(Todo $todo, Request $request): TodoResource
    {
        $todo->update($request->all());
        return new TodoResource($todo);
    }

    /**
     * @param Todo $todo
     * @return JsonResponse
     * @mixin Builder
     */

    public function delete(Todo $todo): JsonResponse
    {
        $todo->delete();
        return response()->json(['success' => true]);
    }
}
