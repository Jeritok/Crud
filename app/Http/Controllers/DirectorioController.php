<?php

namespace App\Http\Controllers;

use App\Http\Requests\CreateDirectorioRequest;
use App\Http\Requests\UpdateDirectorioRequest;
use App\Models\Directorio;
use Illuminate\Http\Request;

class DirectorioController extends Controller
{

    private function cargaArchivo($file)
    {
        $file->move(public_path('fotografias'), time() . ".".$file->getClientOriginalExtension());
        return $file;


    }

    public function index(Request $request)
    {


            if($request->has('buscar')){
                $directorios = Directorio::where('nombre', $request->buscar)
                                ->orWhere('telefono', $request->buscar)
                                ->get();
            }
               else{
                  $directorios = Directorio::all();
               }

        return $directorios;



    }

   /**POST insertData **/
    public function store(CreateDirectorioRequest $request)
    {
        $input = $request->all();
        if($request->has('foto'))
        $input['foto'] = $this->cargaArchivo($request->foto);

      Directorio::create($input);
      return response()->json([
          'res' => true,
          'msg' =>'Registro creado correctamente.'
      ], 200);
    }

/*Retorna 1 solo registro en path*/
    public function show(Directorio $directorio)
    {
        return $directorio;

    }

/*Put update data */
    public function update(UpdateDirectorioRequest $request, Directorio $directorio)
    {
        $input = $request->all();
        if($request->has('foto'))
        $input['foto'] = $this->cargaArchivo($request->foto);

        $directorio->update($input);

        return response()->json([
            'res' => true,
            'msg' =>'Registro actualizado correctamente.'
        ], 200);
    }

/*Delete register */
    public function destroy($id)
    {
        Directorio::destroy($id);
        return response()->json([
            'res' => true,
            'msg' =>'Registro eliminado correctamente.'
        ], 200);
    }
}
