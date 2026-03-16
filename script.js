let sugerencias = JSON.parse(localStorage.getItem("sugerencias")) || [];

let admin = false;

const form = document.getElementById("formulario");
const lista = document.getElementById("listaSugerencias");

const total = document.getElementById("total");
const acad = document.getElementById("acad");
const conv = document.getElementById("conv");
const infra = document.getElementById("infra");

let ctx = document.getElementById("grafica").getContext("2d");

let grafica = new Chart(ctx,{
type:'bar',
data:{
labels:['Académico','Convivencia','Infraestructura'],
datasets:[{
label:'Sugerencias',
data:[0,0,0],
backgroundColor:['#22c55e','#16a34a','#15803d']
}]
}
});

form.addEventListener("submit",function(e){

e.preventDefault();

let categoria=document.getElementById("categoria").value;
let mensaje=document.getElementById("mensaje").value;

sugerencias.push({
categoria,
mensaje,
votos:0
});

localStorage.setItem("sugerencias",JSON.stringify(sugerencias));

mostrar();

form.reset();

notificacion("Sugerencia enviada ✔");

});

function mostrar(){

lista.innerHTML="";

let c1=0,c2=0,c3=0;

sugerencias.forEach((s,i)=>{

if(s.categoria=="Académico") c1++;
if(s.categoria=="Convivencia") c2++;
if(s.categoria=="Infraestructura") c3++;

let botonAdmin = "";

if(admin){

botonAdmin = `<button onclick="borrar(${i})" class="borrar">Eliminar</button>`;

}

lista.innerHTML+=`

<div class="sugerencia">

<h4>${s.categoria}</h4>

<p>${s.mensaje}</p>

<div class="votos" onclick="votar(${i})">
👍 ${s.votos} votos
</div>

${botonAdmin}

</div>

`;

});

total.innerText=sugerencias.length;
acad.innerText=c1;
conv.innerText=c2;
infra.innerText=c3;

grafica.data.datasets[0].data=[c1,c2,c3];
grafica.update();

}

function votar(i){

sugerencias[i].votos++;

localStorage.setItem("sugerencias",JSON.stringify(sugerencias));

mostrar();

}

function borrar(i){

sugerencias.splice(i,1);

localStorage.setItem("sugerencias",JSON.stringify(sugerencias));

mostrar();

}

function loginAdmin(){

let pass = prompt("Ingrese contraseña de administrador");

if(pass=="admin123"){

admin=true;

alert("Modo administrador activado");

mostrar();

}else{

alert("Contraseña incorrecta");

}

}

function notificacion(texto){

let n=document.getElementById("notificacion");

n.innerText=texto;

n.classList.add("mostrar");

setTimeout(()=>{

n.classList.remove("mostrar");

},2000);

}

mostrar();