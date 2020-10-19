<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class UpdateDirectorioRequest extends FormRequest
{

    public function authorize()
    {
        return true;
    }

    public function rules()
    {

        return [
            'nombre' => 'required|min:5|max:100',
            'telefono' => 'required|unique:directorios,telefono,' . $this->route('directorio')->id,
          ];
    }
}
