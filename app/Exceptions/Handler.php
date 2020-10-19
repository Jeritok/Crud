<?php

namespace App\Exceptions;

use Dotenv\Exception\ValidationException;
use Illuminate\Auth\Access\AuthorizationException;
use Illuminate\Auth\AuthenticationException;
use Illuminate\Database\Eloquent\ModelNotFoundException;
use Illuminate\Database\QueryException;
use Illuminate\Foundation\Exceptions\Handler as ExceptionHandler;
use Symfony\Component\HttpKernel\Exception\HttpException;
use Throwable;

class Handler extends ExceptionHandler
{

    protected $dontReport = [
        //
    ];


    protected $dontFlash = [
        'password',
        'password_confirmation',
    ];


    public function report(Throwable $exception)
    {
        parent::report($exception);
    }


    public function render($request, Throwable $exception)
    {
        if($exception instanceof ModelNotFoundException){
            return response()->json(["res" => false, "error" => "Error de modelo"], 400);
        }

        if($exception instanceof QueryException){
            return response()->json(["res" => false, "message" => "Error de consulta BDD " , $exception->getMessage()], 500);
        }

        if($exception instanceof HttpException){
            return response()->json(["res" => false, "message" => "Error de ruta"], 404);
        }

        if($exception instanceof AuthenticationException){
            return response()->json(["res" => false, "message" => "Error de autenticación"], 401);
        }

        if ($exception instanceof AuthorizationException) {
            return response()->json(["res" => false, "message" => "Error de autorización, no tiene permisos"], 403);
        }

        return parent::render($request, $exception);
    }
}
