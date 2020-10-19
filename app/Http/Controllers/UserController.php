<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Str;
class UserController extends Controller
{
    public function store(Request $request)
    {
        $input = $request->all();
        $input['password']= Hash::make($request->password);

      User::create($input);
      return response()->json([
          'res' => true,
          'msg' =>'Usuario creado correctamente.'
      ], 200);
    }
    public function login(Request $request)
    {
         $user = User::whereEmail($request->email)->first();

         if(!is_null($user) && Hash::check($request->password, $user->password)){
             $user->api_token = Str::random(100);
             $user->save();
            return response()->json([
                'res' => true,
                'token' => $user->api_token,
                'msg' =>'Bienvenido al sistema'
            ], 200);
         }
         else{
            return response()->json([
                'res' => false,
                'msg' =>'Cuenta o password incorrecto'
            ], 200);
         }

    }

    public function logout(){

        $user = auth()->user();
        $user->api_token = null;




        return response()->json([
            'res' => true,
            'msg' =>'Deslogueado'
        ], 200);

    }

}
