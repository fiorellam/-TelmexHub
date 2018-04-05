//login
const provider = new firebase.auth.GoogleAuthProvider(); //estancia del proveedor del servicio

$('#login').click(function(){//sujeto al boton click,
  firebase.auth()//cuando le den click al boton, llamo a firebase a la funcion autenticar,
    .signInWithPopup(provider)//utilizo una ventana popup, levanto una ventanita con ayuda de google que en este caso google va a ser un provider
    .then(function(result){//esto es cuando el usuario ya inicio sesion o ya nos dio permisos, si ya nos dio permisos significa que tenemos la informacion del usuario, y esta info se guarda en result
        console.log(result.user);
        guardaDatos(result.user);
        $('#login').hide();
        $('#root').append("<img src='"+ result.user.photoURL+"'/>")

    });//el then es una promesa, que se ejecuta cuando se resuelve el login, es decir cuando el usuario ya me da su correo y su contrasena
});
//ESTA FUNCION GUARDA LOS DATOS AUTOMATICAMENTE Y SE LLAMA CUANDO SE INICIA SESION
function guardaDatos(user){
  var usuario = {//no me interesan todos los datos del usuario por lo que solo voy a guardar 3 datos que son nombre, mail y foto
      uid:user.uid,//el uid lo genera firebase, cuando inicias sesion, firebase te proporciona un id
      nombre:user.displayName,
      email:user.email,
      foto:user.photoURL
  }
  firebase.database().ref("telmex/" + user.id)
  .set(usuario)//me crea una lista o una coleccion de usuarios
  //ya que tengo mi usuario creado a base del que llego, lo guardo en firebase
}
//ESCRIBIR EN LA BASE DE DATOS
$('#guardar').click(function(){
  firebase.database().ref("telmex")//esta es una rama de la base de datos no relacional y se va a llamar telmex
  .set({
    nombre: "fioo",
    edad:"19",
    sexo:"Femeninouuu",
  })//aqui ya estoy escribiendo en la base de datos, lo que esta adentro es un objeto
});

//AQUI ESTOY LEYENDO DE LA BASE DE DATOS
//si alguien agrega un usuario a la rama telmex, mi app se entera automaticamente
firebase.database().ref("telmex/" + user.id)
.on("child_added", function(s){//cuando alguien agregue un hijo a la rama, este ya es un observador o un listener, escucha la rama telmex de la base de datos. RECIBE s (snapshot) que es toda la data
  var user = s.val(); //en .val es donde vienen los datos
  $('#root').append("<img width='100px'src='"+ user.foto+"'/>")//si alguien mas inicia sesion, su foto se va a agregar

})
