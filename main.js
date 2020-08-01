/**
 El banco Santander nos esta pidiendo que realicemos un sistema para manejar a sus clientes, empleados e inversores, los cuales necesitan tener datos como: nombre, correo, teléfono, numero de cuentas y tipo de cliente.
Cada tipo de cliente puede realizar inversiones en el banco y se les dara un precio preferencial a cada uno de ellos.
·     Clientes: $22.00
·     Inversores: $20.00
·     Empleados: $17.00
Ademas de ofrecer descuentos en los siguientes casos:
·     3% arriba de 1000 acciones
·     5% arriba de 2000 acciones
Favor de desarrollar el código necesario para satisfacer los requerimientos del banco. El código deberá cumplir con funciones, atributos, objetos, constructores, herencia, ciclos y seguir los estándares de camel case, convención de nombramiento de constructores y seguir un paradigma de programación funcional.
*Cuentan con 2h para realizar el código y tendremos 1h para revisión.
 */




var date = new Date();
var precioClientes = 22;
var precioInversores = 20;
var precioEmpleados =17;
var descuentoBasico = 0.03; //1000 acciones
var descuentoPremier = 0.05; //2000 acciones
var registros = [];
var totalPagar=0

var Datos = function(nombre, correo, telefono, cuenta){
    this.id= crearUUID();
    this.nombre = nombre;
    this.correo = correo; 
    this.telefono = telefono;
    this.cuenta = cuenta; 
}

function crearUUID(){
    var dt = new Date().getTime();
    var uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
        var r = (dt + Math.random()*16)%16 | 0;
        dt = Math.floor(dt/16);
        return (c=='x' ? r :(r&0x3|0x8)).toString(16);
    });
    return uuid;
}

var Cliente = function(nombre,correo, telefono, cuenta,tipo,acciones){
    Datos.call(this, nombre, correo, telefono, cuenta);
    this.tipo = tipo;
    this.acciones = acciones;
}

Cliente.prototype.precio = function (){
    var tipo=  this.tipo;
    console.log("tipo cliente: "+tipo);
    var precio=0;
    switch(tipo)
    {
        case 'cliente':
            precio=22;
            break;
        case 'inversor':
            precio = 20;
            break;
        case 'empleado':
            precio = 17;
            break;
    }
   
    return precio;
   
}

Cliente.prototype.descuento = function (){
   // 3% arriba de 1000 acciones
   // 5% arriba de 2000 acciones
    var acciones=  this.acciones;
    var descuento=0;
    if (acciones>=1000 && acciones <2000)
    {
        descuento=descuentoBasico;
    }
    else if (acciones>=2000)
    {
        descuento=descuentoPremier;
    }
    else
    {
        descuento=0;
    }
    return descuento;
   
}


function registrarCliente()
{
    var nombre = document.getElementById("nombre").value;
    var correo = document.getElementById("correo").value;
    var telefono = document.getElementById("telefono").value;
    var cuenta = document.getElementById("cuenta").value;
    var acciones = document.getElementById("acciones").value;
    var tipo = document.getElementById("tipo").value;
    var cliente= new Cliente(nombre,correo,telefono,cuenta,tipo,acciones);
    var precio=cliente.precio();
    console.log(precio);
    var descuento=cliente.descuento();
    var total=(acciones*precio) - (acciones*precio*descuento);
    totalPagar=total;
    console.log("cliente:" +cliente.nombre + "total a pagar: "+ total);
    return (cliente);

}

function ingresarCompra()
{      
    var registro = new Cliente(registrarCliente());    
    var parrafo = document.createElement("p");
    var nodo = document.createTextNode("Cliente: "+registro.nombre+" Total a pagar: "+totalPagar);
    parrafo.appendChild(nodo);
    var elemento = document.getElementById("clientes");
    elemento.appendChild(parrafo);
    e.preventDefault();
    

}

var btnIngresar=document.getElementById('btnIngresar');
btnIngresar.onclick= function(event){
  event.preventDefault();
  console.log('ingresar compra');    
  ingresarCompra();  

}

