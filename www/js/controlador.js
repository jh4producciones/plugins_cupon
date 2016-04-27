angular.module('lector.controllers',['ionic','ngCordova'])
.controller("lectorController", function($scope,$cordovaBarcodeScanner){
    $scope.leerCodigo =function(){
        $cordovaBarcodeScanner.scan().then ( function(imagenEscaneada){
            //alert(imagenEscaneada.text)
            window.localStorage.setItem( 'barcode', JSON.stringify(imagenEscaneada.text));
            window.location = "cupon.html";
        }, function(error){
            alert("Ha ocurrido un erro : "+ error);
            
        });
    };
});