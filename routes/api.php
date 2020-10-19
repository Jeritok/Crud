<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\DirectorioController;
use App\Http\Controllers\UserController;

Route::middleware('auth:api')->get('/user', function (Request $request) {
    return $request->user();
});


Route::post('users', [UserController::class, 'store']);

Route::post('login', [UserController::class, 'login']);

Route::group(['middleware' => 'auth:api'], function (){

    Route::apiResource('directorios',DirectorioController::class);
    Route::post('logout', [UserController::class, 'logout']);

});
