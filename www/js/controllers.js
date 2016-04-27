angular.module('starter.controllers', ['ionic','ngCordova','ngOpenFB'])

.controller('AppCtrl', function($scope, $http, $ionicModal, $timeout,$cordovaBarcodeScanner, $state,ngFB) {

  // Iniciando la aplicacion

  var $id = window.localStorage.getItem( 'id_user' );
  var $contador = window.localStorage.getItem( 'contador' );
  $scope.contador = $contador != null ? JSON.parse($contador) : '0';
  if ($id != null && $scope.contador < 1){
    $scope.id_user = JSON.parse($id);
    $scope.contador++;
    console.log($scope.contador);
    window.localStorage.setItem( 'contador', JSON.stringify($scope.contador));
    window.location = 'principal.html';
  }


  // Lista de Aritculos
  $scope.show_value = true;

  /** Barcode cupon **/
  var $codigo = window.localStorage.getItem( 'barcode' );
  $scope.coupon_code = $codigo != null ? JSON.parse($codigo) : 'Código';

  /** Lista de Cupones **/
  var $c = window.localStorage.getItem( 'cupones' );
  $scope.cupones = $c != null ? JSON.parse($c) : [];

      /** Lista de Tarjetas **/
      var $t = window.localStorage.getItem( 'tarjetas' );
      $scope.tarjetas = $t != null ? JSON.parse($t) : [];


  /** Lista de Articulos **/
  var $a = window.localStorage.getItem( 'articulos' );
  $scope.articulos = $a != null ? JSON.parse($a) : [];


  /** Lista de Compras **/
  var $compras = window.localStorage.getItem( 'lista_compras' );
  $scope.lista_compras = $compras != null ? JSON.parse($compras) : [];

  /** Lista de preferencias **/
    
  var $x = window.localStorage.getItem( 'name_prefe' );
  $scope.name_prefe = $x != null ? JSON.parse($x) : '¿Cual es tu nombre?';

  var $pm = window.localStorage.getItem( 'preferencias_money' );
  $scope.preferencias_money = $pm != null ? JSON.parse($pm) : 'Bs';

  var $pa = window.localStorage.getItem( 'preferencias_adress' );
  $scope.preferencias_adress = $pa != null ? JSON.parse($pa) : '';

  var $pl = window.localStorage.getItem( 'preferencias_languaje' );
  $scope.preferencias_languaje = $pl != null ? JSON.parse($pl) : 'Español';


  var $pg = window.localStorage.getItem( 'preferencias_genero' );
  $scope.preferencias_genero = $pg != null ? JSON.parse($pg) : 'Femenino';



  /** Variable que almacena el cupon que queremos detallar**/
  var $d = window.localStorage.getItem( 'detalleCupon' );
  $scope.detalleCupon = $d != null ? JSON.parse($d) : '0';

  /** Variable que almacena el articulo que queremos detallar**/
  var $f = window.localStorage.getItem( 'detalleArticulo' );
  $scope.detalleArticulo = $f != null ? JSON.parse($f) : '0';

  /** Variable que almacena la lista que queremos detallar**/
  var $l = window.localStorage.getItem( 'detalleLista' );
  $scope.detalleLista = $l != null ? JSON.parse($l) : '0';


  $scope.loginData = {};

  $scope.leerCodigo =function(){
        $cordovaBarcodeScanner.scan().then ( function(imagenEscaneada){
            //alert(imagenEscaneada.text)
            window.localStorage.setItem( 'barcode', JSON.stringify(imagenEscaneada.text));
            window.location = "cupon.html";
        }, function(error){
            alert("Ha ocurrido un erro : "+ error);
            
        });
    };

  $scope.agregarCuponLocal = function(){

    if ($scope.coupon_quantity > 0){
      $scope.cupones.push({
                          name : $scope.coupon_name,
                          code : $scope.coupon_code,
                          type_discount : '0',//$scope.coupon_type_discount,
                          discount_v : $scope.coupon_discount_v,
                          discount_p : '0',//$scope.coupon_discount_p,
                          quantity : $scope.coupon_quantity,
                          due_date : $scope.coupon_due_date,
                          description : $scope.coupon_description,
                          store_id : $scope.coupon_store_id,
                          type : $scope.coupon_type,
                          usado : false
                      });
      $scope.coupon_name = '';
      $scope.coupon_code = '';
      $scope.coupon_discount_p = '';
      $scope.coupon_quantity = '';
      $scope.coupon_due_date = '';
      $scope.coupon_description = '';
      $scope.coupon_store_id = '';


      // Borrando el valor del cupón
      window.localStorage.setItem( 'barcode', JSON.stringify('Código'));

      window.localStorage.setItem( 'cupones', JSON.stringify($scope.cupones));
      //storeCupones();
      alert("Cupón agregado correctamente");

      window.location = "miscupones.html";
    }else{
      alert('Error: indique cantidad de cupones');
    }
  };

      $scope.agregarTarjetaLocal = function(){

        if ($scope.tarjeta_quantity > 0){
          $scope.tarjetas.push({
            name : $scope.tarjeta_name,
            code : $scope.tarjeta_code,
            type_discount : '0',//$scope.coupon_type_discount,
            discount_v : $scope.tarjeta_discount_v,
            discount_p : '0',//$scope.coupon_discount_p,
            quantity : $scope.tarjeta_quantity,
            due_date : $scope.tarjeta_due_date,
            description : $scope.tarjeta_description,
            store_id : $scope.tarjeta_store_id,
            type : $scope.tarjeta_type,
            usado : false
          });
          $scope.tarjeta_name = '';
          $scope.tarjeta_code = '';
          $scope.tarjeta_discount_p = '';
          $scope.tarjeta_quantity = '';
          $scope.tarjeta_due_date = '';
          $scope.tarjeta_description = '';
          $scope.tarjeta_store_id = '';


          // Borrando el valor del cupón
          window.localStorage.setItem( 'barcode', JSON.stringify('Código'));

          window.localStorage.setItem( 'tarjetas', JSON.stringify($scope.tarjetas));
          //storeCupones();
          alert("Tarjeta agregada correctamente");

          window.location = "mistarjetas.html";
        }else{
          alert('Error: indique cantidad de tarjetas');
        }
      };

  $scope.cuponesValidos = function(){
    var misCupones = [];

    for (var i = 0; i < $scope.cupones.length; i++) {
      if ($scope.cupones[i].quantity > 0){
        misCupones.push({
          name : $scope.cupones[i].name,
          pos : i
        }); 
      }
      
    }
    return misCupones;
  };

  $scope.agregarArticuloLocal = function (){
    $scope.articulos.push({
      "name" : $scope.article_name,
      "price" : $scope.article_price,
      "category" : $scope.article_category,
      "store_id" : $scope.article_store_id,
      "descuento" : '0',
      "cupon" : false,
      "price_final" : $scope.article_price,
      "brand" : $scope.article_brand
    });
    
    $scope.article_name = "";
    $scope.article_price = "";
    $scope.article_category = "";
    $scope.article_store_id = "";
    $scope.article_brand = "";

    window.localStorage.setItem( 'articulos', JSON.stringify($scope.articulos));

    alert("Articulo agregado correctamente");
  };

  $scope.ordenarArticlosPor = function(orden){
    $scope.ordenArticulos = orden;
  };


  $scope.ordenarCuponesPor = function(orden){
    $scope.ordenCupones = orden;
  };

  $scope.ordenarListaPor = function(orden){
    console.log('Funciona ' + orden);
    $scope.ordenLista = orden;
  };

  $scope.detallesCupon = function(index){
    window.localStorage.setItem( 'detalleCupon', JSON.stringify(index));
    //alert(index);
  };

  $scope.detallesArticulo = function(index){
    window.localStorage.setItem( 'detalleArticulo', JSON.stringify(index));
    //alert(index);
  };


  $scope.detallesLista = function(index){
    window.localStorage.setItem( 'detalleLista', JSON.stringify(index));
    window.location = 'infolista.html';
    //alert(index);
  };

  $scope.asignarCuponArticulo = function(value){
    //alert(value);

      $scope.lista_compras.push({
        "name" : $scope.articulos[$scope.detalleArticulo].name,
        "name_coupon" : $scope.cupones[value].name,
        "price" : $scope.articulos[$scope.detalleArticulo].price,
        "discount" : $scope.cupones[value].discount_v,
        "price_final" : $scope.articulos[$scope.detalleArticulo].price - $scope.cupones[value].discount_v,
        "due_date" : $scope.cupones[value].due_date,
        "bought" : false
      });

      $scope.cupones[value].quantity --;

      // guardando en el storage
      window.localStorage.setItem( 'cupones', JSON.stringify($scope.cupones));
      window.localStorage.setItem( 'lista_compras', JSON.stringify($scope.lista_compras));
      alert("Articulo guardado en tu lista de compras");
  };

  $scope.eliminarItemLista = function(){
    var lista_temporal = $scope.lista_compras;
    window.localStorage.removeItem('lista_compras');
    $scope.lista_compras = [];

    for (var i = 0; i < lista_temporal.length; i++) {
      if (i != $scope.detalleLista){
        $scope.lista_compras.push(lista_temporal[i]);
      }
    }
    window.localStorage.setItem( 'lista_compras', JSON.stringify($scope.lista_compras));
    window.location = 'mislistascompras.html';
  };

  $scope.eliminarCupon = function(){
    var lista_temporal = $scope.cupones;
    window.localStorage.removeItem('cupones');
    $scope.cupones = [];

    var lista_compras_temporal = $scope.lista_compras;
    window.localStorage.removeItem('lista_compras');
    $scope.lista_compras = [];

    // Verificando articulos en lista de compras

    for (var i = 0; i < lista_compras_temporal.length; i++) {
      if (lista_compras_temporal[i].name_coupon != lista_temporal[$scope.detalleCupon].name)
      $scope.lista_compras.push(lista_compras_temporal[i]);
    }

    for (var i = 0; i < lista_temporal.length; i++) {
      if (i != $scope.detalleCupon){
        $scope.cupones.push(lista_temporal[i]);
      }
    }
    window.localStorage.setItem( 'cupones', JSON.stringify($scope.cupones));
    window.localStorage.setItem( 'lista_compras', JSON.stringify($scope.lista_compras));
    window.location = 'miscupones.html';
  };

  $scope.eliminarArticulo = function(){
    var lista_temporal = $scope.articulos;
    window.localStorage.removeItem('articulos');
    $scope.articulos = [];

    var lista_compras_temporal = $scope.lista_compras;
    window.localStorage.removeItem('lista_compras');
    $scope.lista_compras = [];

    // Verificando articulos en lista de compras

    for (var i = 0; i < lista_compras_temporal.length; i++) {
      if (lista_compras_temporal[i].name != lista_temporal[$scope.detalleArticulo].name)
      $scope.lista_compras.push(lista_compras_temporal[i]);
    }

    // Eliminando item de lista de articulos
    for (var i = 0; i < lista_temporal.length; i++) {
      if (i != $scope.detalleArticulo){
        $scope.articulos.push(lista_temporal[i]);
      }
    }
    window.localStorage.setItem( 'articulos', JSON.stringify($scope.articulos));
    window.localStorage.setItem( 'lista_compras', JSON.stringify($scope.lista_compras));
    window.location = 'articulos.html';
  };

  $scope.guardarPreferencias = function(){
    window.localStorage.setItem( 'name_prefe', JSON.stringify($scope.name_prefe));
    window.localStorage.setItem( 'preferencias_money', JSON.stringify($scope.preferencias_money));
    window.localStorage.setItem( 'preferencias_adress', JSON.stringify($scope.preferencias_adress));
    window.localStorage.setItem( 'preferencias_languaje', JSON.stringify($scope.preferencias_languaje));
    window.localStorage.setItem( 'preferencias_genero', JSON.stringify($scope.preferencias_genero));
    alert("Preferencias guardadas");
    window.location = 'index.html';
  };

  // Funciones de Cuentas de usuarios

  $scope.login = {};
  $scope.loginUser = function() {

    $scope.model_progress = true;

    console.log($scope.login.email);
    console.log($scope.login.pass);

    var link = 'http://jh4producciones.com.ve/CouponTheGo/pruebaSlim/autenticar';


    $http.post(link, {
      "email" : $scope.login.email,
      "pass" : $scope.login.pass
      
    }).then(function (res){
      console.log(res.data)
      console.log(res.data.success)
        if (res.data.success == true){


          // Guardando el id del usuario
          window.localStorage.setItem( 'id_user', JSON.stringify(res.data.id));
          window.location = "principal.html";
        }
        else{
          alert(res.data.message);
          console.log("error")

          $scope.model_progress = false;
        }

    });
  };


// conectando con facebook
      $scope.fbLogin = function () {
        ngFB.login({scope: 'email,user_posts,publish_actions'}).then(
            function (response) {
              if (response.status === 'connected') {
                console.log('Facebook login succeeded');
                window.location="principal.html"

               // $state.go('api.profile',response);

               // $scope.closeLogin();
                //$state.go('app.profile');

              } else {
                alert('Facebook login failed');
              }
            });
      };


      $scope.profileUser= function(){


        ngFB.api({
          path: '/me',
          params: {fields: 'id,name'}
        }).then(
            function (user) {
              $scope.user = user;
            },
            function (error) {
              alert('Facebook error: ' + error.error_description);
            });

      };


//funcion q lista los paises
   $scope.getPaisList = function() {

   // $scope.model_progress = true;

  //  console.log($scope.login.email);
  //  console.log($scope.login.pass);

    //window.location = "cargando.html";

    var linkp = 'http://localhost/pruebaSlim/pais';
    
    $http.get(linkp).success(function(data, status, headers, config) {
      $scope.Details = data;
    }).
    error(function(data, status, headers, config) {
      // log error
    });
   
  };




  // Inicializando variables
  $scope.create = {};
  $scope.create.gender = 'Masculino';

  $scope.createUser = function() {

    $scope.model_progress = true;

    //window.location = "cargando.html";

    if ($scope.create_pass == $scope.create_pass2){
      var link = 'http://icreastudio.com/couponthego/register_user.php';
      
      $http.post(link, {
        "name" : $scope.create.name, 
        "email" : $scope.create.email, 
        "gender" : $scope.create.gender, 
        "pass" : $scope.create.pass
        
      }).then(function (res){
          if (res.data.success == 1){

            // Guardando el id del usuario
            window.localStorage.setItem( 'id_user', JSON.stringify(res.data.id));

            window.localStorage.setItem( 'name_prefe', JSON.stringify($scope.create.name));
            // Guardando el género
            window.localStorage.setItem( 'preferencias_genero', JSON.stringify($scope.create.gender));
            // Redirigiendo a la pantalla principal
            window.location = "principal.html";
          }
          else{
            alert(res.data.message);

            $scope.model_progress = false;
          }

      });
    }
    else{
      alert('Las contraseñas deben ser iguales');
      $scope.model_progress = false;
    }

    
  };
  

  $scope.ahorroTotal = function(){
    var ahorro = 0;
    for (var i = 0; i < $scope.lista_compras.length; i++) {
      ahorro += $scope.lista_compras[i].discount;
    }
    return ahorro;
  };



  //create_user2
      // Inicializando variables
      $scope.create = {};
      $scope.create.gender = 'Masculino';

      $scope.createUser2 = function() {

        $scope.model_progress = true;

        //window.location = "cargando.html";

        if ($scope.create_pass == $scope.create_pass2){
          //var link = 'http://localhost/pruebaSlim/crearcuenta';
         var link = 'http://www.jh4producciones.com.ve/CouponTheGo/pruebaSlim/crearcuenta';

          $http.post(link, {
            "name" : $scope.create.name,
            "email" : $scope.create.email,
            "pass" : $scope.create.pass

          }).then(function (res){
            if (res.data.success == true){

              console.log(res.data)
              console.log(res.data.success)
              // Guardando el mensaje del usuario
              window.localStorage.setItem( 'mensaje', JSON.stringify(res.data.mensaje));
             alert(JSON.stringify(res.data.mensaje));

              window.location = "principal.html";
            }
            else{
              alert("no entro")//JSON.stringify(res.data.message));
              console.log(res.data)
              console.log(res.data.success)

              $scope.model_progress = false;
            }

          });
        }
        else{
          alert('Las contraseñas deben ser iguales');
          $scope.model_progress = false;
        }


      };

      //fin create_user2



  // Funcion que guarda el cupon
  /*
  $scope.guardarCupon = function() {
    //console.log('Doing login');



    //$cordovaProgress.showSimple(true);
    var link = 'http://icreastudio.com/couponthego/register_coupon.php';
    $http.post(link, {
      "user_id" : "10", 
      "name" : $scope.data.name, 
      "code": $scope.data.code, 
      "discount": $scope.data.discount, 
      "due_date": $scope.data.due_date, 
      "type": "fisico", 
      "description": $scope.data.description, 
      "store_id":$scope.data.store_id


    }).then(function (res){
        //$scope.response = res.data;
        //$scope.success = res.data.success;
        //$scope.message = res.data.message;
        alert(res.data.message);

        //$state.go('home.html');

    });
  };

  // Funcion que guarda el Articulo

  $scope.guardarArticulo = function() {
    //console.log('Doing login');

    //$cordovaProgress.showSimple(true);
    var link = 'http://icreastudio.com/couponthego/register_products.php';
    $http.post(link, {

      "user_id" : "10",
      "name" : $scope.data.name,
      "price" : $scope.data.price,
      "category" : $scope.data.category,
      "store_id" : $scope.data.store_id,
      "brand" : $scope.data.brand


    }).then(function (res){
        //$scope.response = res.data;
        //$scope.success = res.data.success;
        //$scope.message = res.data.message;
        alert(res.data.message);

        //$state.go('home.html');

    });
  };

  // Funcion que Obtiene la lista de cupones

  $scope.getCouponList = function() {
    //console.log('Doing login');

    $scope.itemsList = [];

    var link = 'http://icreastudio.com/couponthego/get_coupon_list.php';
    $http.post(link, {

      "id" : "10"

    }).then(function (res){
        

       $scope.itemsList = res.data.list;

    });
  };

  // Funcion que Obtiene la lista de articulos

  $scope.getProductList = function() {
    //console.log('Doing login');

    $scope.itemsList = [];

    var link = 'http://icreastudio.com/couponthego/get_products_list.php';
    $http.post(link, {

      "id" : "10"

    }).then(function (res){
        

       $scope.itemsList = res.data.list;

    });
  };

  // Perform the login action when the user submits the login form
  $scope.doLogin = function() {
    console.log('Doing login', $scope.loginData);

    // Simulate a login delay. Remove this and replace with your login
    // code if using a login system
    $timeout(function() {
      $scope.closeLogin();
    }, 1000);
  };*/

  $scope.goListaCupones = function() {
    //console.log('Doing login', $scope.loginData);
    $state.go('app.lista_cupones');
    //$scope.dato = 
  };
})

.controller('MyCtrl', function($scope, $cordovaProgress) {
    $cordovaProgress.showSimple(true);
})

.controller('PlaylistsCtrl', function($scope) {
  $scope.playlists = [
    
  ];
})

.controller('PlaylistCtrl', function($scope, $stateParams) {
})

.controller('ProfileCtrl', function ($scope, ngFB) {
  ngFB.api({
    path: '/me',
    params: {fields: 'id,name'}
  }).then(
      function (user) {
        console.log('the user')
        $scope.user = user;
      },
      function (error) {
        alert('Facebook error: ' + error.error_description);
      });
})
    .controller('SessionCtrl', function ($scope, $stateParams, Session, ngFB){

      $scope.share = function (event) {
        ngFB.api({
          method: 'POST',
          path: '/me/feed',
          params: {
            message: "I'll be attending: '" + $scope.session.title + "' by " +
            $scope.session.speaker
          }
        }).then(
            function () {
              alert('The session was shared on Facebook');
            },
            function () {
              alert('An error occurred while sharing this session on Facebook');
            });
      };



    });



