
 var tokenGlobal = null;

 
 const gettAll = async(bearer) =>{

    try{

        const settings ={
            headers:{
              'Content-Type': 'application/json',
              'Authorization' :`Bearer ${bearer}`
            }
    
        };

    
        const res = await fetch('http://crud2.test/api/directorios', settings);
        const data = await res.json();
        console.log(data);
        if(data.length > 0){
            
            data.forEach(element => {
                
                 let userToken = bearer;
                 let id = element.id;
                 let nombre = element.nombre;
                 let direccion = element.direccion;
                 let telefono = element.telefono;
                 let foto = "";
                if(element.foto !== null){
                     foto =` <img src='${element.foto}' class='card-img-top' alt='...'></img>`;
                }
            


                var directorio = document.getElementById('directorioAlumnos').innerHTML +=`<div class="col-md-4 mt-2" ><div class='card'>${foto} <div class='card-body' > <h5 class='card-title'>${nombre}</h5><p class='card-text'>Direccion : ${direccion} <br> Telefono : ${telefono}  </p><hr><button class='btn btn-primary float-left' onclick="dataModalEdit('${id},${nombre},${telefono},${direccion}')" data-toggle='modal' data-target='#modalEdit'>Editar</button><button onclick="deleteAlumno('${id},${bearer}')" class='btn btn-danger float-right'>Eliminar</button></div></div></div>`;
                
            });
        }
      


    }
    catch(error){
        console.log(error);
    }

 
}

const deleteAlumno = async(parameters) =>{
    try{

    let getParams = parameters.split(',');
    
    let id = getParams[0];
    let bearer = getParams[1];
    console.log(id);
    console.log(bearer);

    const settings ={
        method:'DELETE',
        headers:{
            'Content-Type': 'application/json',
            'Authorization' :`Bearer ${bearer}`
        }

    };
    const getId = id;
    const userToken= bearer;

    const eliminar = await fetch(`http://crud2.test/api/directorios/${getId}`, settings);
    const resDelete = await eliminar.json();
    console.log(resDelete);
    if(resDelete.res === true){

        document.getElementById('events').innerHTML="<p style='color:green;'>Felicitaciones, ha eliminado el registro.</p>";
        let directorio = document.getElementById('directorioAlumnos').innerHTML = "";
        
        gettAll(userToken);
        
        
    
    }
    else{
        document.getElementById('events').innerHTML="<p style='color:red;'>Error al intentar eliminar el registro, intentalo de nuevo.</p>";
    }
  


}
catch(error){
    console.log(error);
}


}


 

login = async() =>{

    try{
        const getEmail = document.getElementById('email').value;
        const getPass = document.getElementById('password').value;
        const data={
            email : getEmail,
            password: getPass
        }
        const settings ={
            method:'POST',
            body: JSON.stringify(data), 
            headers:{
              'Content-Type': 'application/json'
            }
    
        };
    
        const send = await fetch('http://crud2.test/api/login', settings);
        const checkRes = await send.json();
        if(checkRes.res === true){
           document.getElementById('directorioAlumnos').innerHTML="";
           document.getElementById('login').innerHTML="";
           document.getElementById('events').innerHTML="<h5 style='color:green;'>Bienvenido al sistema crud!</h5>";
           document.getElementById('agregarAlumno').innerHTML= "<button class='btn btn-success text-center mt-1' data-toggle='modal' data-target='#modalRegisterForm'>Agregar alumno</button>";
    
           tokenGlobal= checkRes.token;
           gettAll(checkRes.token);
        }
        else{
            document.getElementById('events').innerHTML="<p style='color:red;'>Tus datos son erroneos, intentalo de nuevo por favor.!</p>";
          
        }

    }
    catch(error){
        console.log(error);
    }
 
}


agregarAlumno = async() =>{

    try{
        const getNombre = document.getElementById('nombre').value;
        const getTelefono= document.getElementById('telefono').value;
        const getDireccion = document.getElementById('direccion').value;

        const data={
            nombre : getNombre,
            telefono: getTelefono,
            direccion: getDireccion
        }
   
        const settings ={
            method:'POST',
            body: JSON.stringify(data), 
            headers:{
              'Accept':'application/json',
              'Content-Type': 'application/json',
              'Authorization' :`Bearer ${tokenGlobal}`
            }
    
        };
    
        const insert = await fetch('http://crud2.test/api/directorios', settings);
        const checkInsert = await insert.json();
        if(checkInsert.res === true){
            let directorio = document.getElementById('directorioAlumnos').innerHTML = "";
            document.getElementById('events').innerHTML="<p style='color:green;'>Se ha insertado un nuevo alumno!</p>";
            gettAll(tokenGlobal);
        }
        else{
            document.getElementById('events').innerHTML="<p style='color:red;'>No se ha podido insertar un nuevo alumno, por favor intentalo de nuevo.</p>";
            console.log(checkInsert);
          
        }


    }
    catch(error){
        console.log(error);
    }
 
}

editarAlumno = async() =>{

    try{
        const getId= document.getElementById('editId').value;
        const getNombre=  document.getElementById('editNombre').value;
        const getTelefono= document.getElementById('editTelefono').value;
        const getDireccion=  document.getElementById('editDireccion').value;
        const getUserToken= tokenGlobal;
        
        const data ={
            id : getId,
            nombre: getNombre,
            direccion: getDireccion,
            telefono: getTelefono
            
        }
    
        const settings ={
            method:'PUT',
            body: JSON.stringify(data), 
            headers:{
                'Accept':'application/json',
                'Content-Type': 'application/json',
                'Authorization' :`Bearer ${getUserToken}`
            }
    
        };
      
    
        const edit = await fetch(`http://crud2.test/api/directorios/${getId}`, settings);
        const resEdit = await edit.json();
        console.log(resEdit);
        if(resEdit.res === true){
    
            document.getElementById('events').innerHTML="<p style='color:green;'>Felicitaciones, ha editado el registro correctamente..</p>";
            let directorio = document.getElementById('directorioAlumnos').innerHTML = "";
            
            gettAll(getUserToken);
            
        
        }else{

            document.getElementById('events').innerHTML="<p style='color:red;'>Erorr al intentar editar el registro, intentalo de nuevo.</p>";
        }
      
    
    
    }
    catch(error){
        console.log(error);
    }
    

}


function dataModalEdit(parametersEdit){

    let getParams = parametersEdit.split(',');
    let id = getParams[0];
    let nombre = getParams[1];
    let telefono = getParams[2];
    let direccion = getParams[3];

    document.getElementById('editId').value= id;
    document.getElementById('editNombre').value = nombre;
    document.getElementById('editTelefono').value = telefono;
    document.getElementById('editDireccion').value= direccion;


}