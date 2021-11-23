//import { Anuncio } from "./Anuncio";
import { Anuncio_Auto } from './Anuncio_Auto.js';
const anunciosLocal = JSON.parse(localStorage.getItem('lista')) || [];
let Anuncios = [];

document.forms[0].addEventListener('submit', handlerSubmit);
document.addEventListener('click', handlerClick);
document.getElementById('btnGuardar').addEventListener('click', handlerLoadTabla);
document.getElementById('btnModificar').addEventListener('click', modificarAnuncio);
document.getElementById('checkbox').childNodes[1].addEventListener('click', filtrarTabla);
document.getElementById('transaccionch').addEventListener('click', filtrarTabla);
document.getElementById('descripcionch').addEventListener('click', filtrarTabla);
document.getElementById('precioch').addEventListener('click', filtrarTabla);
document.getElementById('puertasch').addEventListener('click', filtrarTabla);
document.getElementById('kmsch').addEventListener('click', filtrarTabla);
document.getElementById('potenciach').addEventListener('click', filtrarTabla);
document.getElementById('filtrar').addEventListener('change', filtrarPorTransaccion);

window.addEventListener('DOMContentLoaded', () => {
	getDatosFechAsync();
});


function altaAnuncio(anuncio) {
	anunciosLocal.push(anuncio);
	almacenarDatos(anunciosLocal);
}

function almacenarDatos(data) {
	localStorage.setItem('lista', JSON.stringify(data));
}

function handlerLoadTabla() {
	renderizarTabla(crearTabla(Anuncios), document.getElementById('divTabla'));
}

function ultimosAnuncios() {
	let aux = new Object();
	const elArray = Anuncios.map((obj) => {
		aux.id = obj.id;
		aux.fecha = obj.fecha;
		return aux;
	});
	renderizarTabla(crearTabla(elArray), document.getElementById('divAnuncios'));
}

function renderizarTabla(tabla, contenedor) {
	while (contenedor.hasChildNodes()) {
		contenedor.removeChild(contenedor.firstChild);
	}
	if (tabla) {
		contenedor.appendChild(tabla);
	}
}

function limpiarFormulario(frm) {
	frm.reset();
	document.getElementById('btnEliminar').classList.add('oculto');
	document.getElementById('btnModificar').classList.add('oculto');
	document.forms[0].id.value = '';
}

function modificarAnuncio(p) {
	let index = Anuncios.findIndex((per) => per.id == p.id);
	Anuncios.splice(index, 1, p); 
	almacenarDatos(Anuncios);
}

function agregarSpinner() {
	let spinner = document.createElement('img');
	spinner.setAttribute('src', './assets/spenner-Velocimetro.gif');
	spinner.setAttribute('alt', 'imagen spinner');

	document.getElementById('spinner-container').appendChild(spinner);
}

function eliminarSpinner() {
	document.getElementById('spinner-container').innerHTML = '';
}

function cargarFormulario(id) {
	const { titulo, transaccion, descripcion, precio, puertas, kms, potencia } = Anuncios.filter((a) => a.id == id)[0];

	const frm = document.forms[0];
	frm.titulo.value = titulo;
	frm.descripcion.value = descripcion;
	frm.transaccion.value = transaccion;
	frm.precio.value = precio;
	frm.puertas.value = puertas;
	frm.kms.value = kms;
	frm.potencia.value = potencia;
	frm.id.value = id;
	//document.getElementById("btnGuardar").textContent = "Modificar";
	document.getElementById('btnModificar').classList.remove('oculto');
	document.getElementById('btnEliminar').classList.remove('oculto');
	document.getElementById('btnEliminar').setAttribute('class', 'btn btn-danger');
	document.getElementById('btnModificar').setAttribute('class', 'btn btn-warning');
}

function filtrarTabla() {
	let aux = new Object();
	const nuevoArray = Anuncios.map((obj) => {
		aux.id = obj.id;

		if (document.getElementById('tituloch').checked == true) {
			aux.titulo = obj.titulo;
		}
		if (document.getElementById('transaccionch').checked == true) {
			aux.transaccion = obj.transaccion;
		}
		if (document.getElementById('descripcionch').checked == true) {
			aux.descripcion = obj.descripcion;
		}
		if (document.getElementById('precioch').checked == true) {
			aux.precio = obj.precio;
		}
		if (document.getElementById('puertasch').checked == true) {
			aux.puertas = obj.puertas;
		}
		if (document.getElementById('kmsch').checked == true) {
			aux.kms = obj.kms;
		}
		if (document.getElementById('potenciach').checked == true) {
			aux.potencia = obj.potencia;
		}

		return aux;
	});
	renderizarTabla(crearTabla(nuevoArray), document.getElementById('divTabla'));
	altaAnuncio(aux);
}

function filtrarPorTransaccion() {
  if (document.getElementById("filtrarTran").value == "Venta") {
    const nuevoArray = Anuncios.filter((bj) => {
      return bj.transaccion == "Venta";
    });
    const promedio = promedioTabla(nuevoArray);
    document.querySelector(".pepe").value = promedio;
    renderizarTabla(
      crearTabla(nuevoArray),
      document.getElementById("divTabla")
    );
  }

  if (document.getElementById("filtrarTran").value == "Alquiler") {
    const nuevoArray1 = Anuncios.filter((bj) => {
      return bj.transaccion == "Alquiler";
    });
    const promedio1 = promedioTabla(nuevoArray1);
    document.querySelector(".pepe").value = promedio1;
    renderizarTabla(
      crearTabla(nuevoArray1),
      document.getElementById("divTabla")
    );
  }

  if (document.getElementById("filtrarTran").value == "N/A") {
    document.querySelector(".pepe").value = "";
    renderizarTabla(crearTabla(Anuncios), document.getElementById("divTabla"));
  }
}

function promedioTabla(nArray) {
  let promedio;
  if(nArray.length > 1){
     promedio = nArray.reduce((prev, actual) => {
       const aux = {};
       aux.precio = parseInt(prev.precio) + parseInt(actual.precio);
      return aux;
    });

  }else{
    promedio = nArray[0];
  }  
  return promedio.precio / nArray.length ;  
}

function handlerSubmit(e) {
	e.preventDefault();

	handlerLoadTabla();

	const frm = e.target;

	if (frm.id.value !== '') {
		const anuncioEditado = new Anuncio_Auto(
			parseInt(frm.id.value),
			frm.descripcion.value,
			frm.transaccion.value,
			frm.descripcion.value,
			frm.precio.value,
			frm.puertas.value,
			frm.kms.value,
			frm.potencia.value
		);
		if (confirm('Desea modificar a este anuncio')) {
			putDatosFech(anuncioEditado, parseInt(frm.id.value));
			console.log('paso');
		}
	} else {
		const nuevoAnuncio = new Anuncio_Auto(
			Date.now(),
			frm.titulo.value,
			frm.transaccion.value,
			frm.descripcion.value,
			frm.precio.value,
			frm.puertas.value,
			frm.kms.value,
			frm.potencia.value,
		);
		postDatosFech(nuevoAnuncio);
	}
	limpiarFormulario(e.target);
}

function handlerClick(e) {
	if (e.target.matches('td')) {
		// se maneja igual que los querysellector con las expreciones de css
		//let id = e.target.parentNode.dataset.id;
		let id = e.target.parentNode.firstChild.innerHTML;
		//console.log(id);
		//console.log(e.target.parentNode.dataset.id);
		cargarFormulario(id);
	} else if (e.target.matches('#btnEliminar')) {
		let id = parseInt(document.forms[0].id.value);
		if (confirm('confirma eliminacion')) {
			deleteDatosFech(id);
		} else {
			limpiarFormulario(document.forms[0]);
		}
	} else if (e.target.matches('#btnModificar')) {
		let frm = document.forms[0];
		const AnuncioAModificar = new Anuncio_Auto(
			frm.id.value,
			frm.titulo.value,
			frm.transaccion.value,
			frm.descripcion.value,
			frm.precio.value,
			frm.puertas.value,
			frm.kms.value,
			frm.potencia.value,
		);
		if (confirm('confirma Modificacion')) {
			putDatosFech(AnuncioAModificar, parseInt(frm.id.value));
			console.log('paso');
		} else {
			limpiarFormulario(document.forms[0]);
		}
	}
}

function crearTabla(items) {
	const tabla = document.createElement('table');
	//tabla.setAttribute("class", "table table-dark");
	tabla.className += 'table table-bordered table-hover';
	tabla.appendChild(CreatThead(items[0]));
	tabla.appendChild(CreatBody(items));

	return tabla;
}

function CreatThead(items) {
	const thead = document.createElement('thead');
	const tr = document.createElement('tr');
	for (const key in items) {
		//if (key !== "id") {
		const th = document.createElement('th');
		//const texto = document.createTextNode(key);  //esta es la forma larga la deje comentada
		//th.appendChild(texto);
		th.textContent = key;
		tr.appendChild(th);
		//}
	}
	thead.appendChild(tr);
	thead.className += 'rosa';
	return thead;
}

function CreatBody(items) {
	const tbopdy = document.createElement('tbody');
	items.forEach((items) => {
		const tr = document.createElement('tr');
		//tr.setAttribute("data-id",);
		for (const key in items) {
			// if (key === "id") {
			//   tr.setAttribute("data-id", items[key]);
			// } else {
			const td = document.createElement('td');
			td.textContent = items[key];
			//tr.addEventListener("click", handlerClickTD);
			tr.appendChild(td);
			//}
		}
		tbopdy.appendChild(tr);
	});
	return tbopdy;
}

const getDatosFechAsync = async ()=> {

	try {
		document.querySelector('#spinner-container').appendChild(geteSpinner());
		const res = await fetch('http://localhost:3000/Anuncios');
		if(!res.ok){
			throw new Error(`Error: ${err.status}:${err.statusText}`);
		}else{
			const data = await res.json();
			Anuncios = data;
			handlerLoadTabla(data);
		}
	} catch (err) {
		console.error(err.message);
	}
	finally{
		document.querySelector('#spinner-container').removeChild(document.querySelector('#spinner-container').firstElementChild);
	}
}

const postDatosFech = async(nuevoA)=> {
	
	try {
		document.querySelector('#spinner-container').appendChild(geteSpinner());
		const options = {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json;charset=utf-8'
			},
			body: JSON.stringify(nuevoA)
			
		};

		const res = await fetch('http://localhost:3000/Anuncios', options);

		if(!res.ok){
			throw new Error(`Error: ${err.status}:${err.statusText}`);
		}else{
			const data = await res.json();
			console.log(data);
		}
		
	} catch (err) {
		console.error(err.message);
	}finally{
		document.querySelector('#spinner-container').removeChild(document.querySelector('#spinner-container').firstElementChild);
	}
	
}

function deleteDatosFech(id) {
	document.querySelector('#spinner-container').appendChild(geteSpinner());

	const options = {
		method: 'DELETE',
		headers: {
			'Content-Type': 'application/json;charset=utf-8'
		}
	};

	fetch('http://localhost:3000/Anuncios/' + id, options)
		.then((res) => {
			return res.ok ? res.json() : Promise.reject(res);
		})
		.then((data) => {
			console.log(data);
		})
		.catch((err) => {
			console.error(`Error: ${err.status}:${err.statusText}`);
		})
		.finally(() => {
			document.querySelector('.spinner').removeChild(document.querySelector('.spinner').firstElementChild);
		});
}

function putDatosFech(aEditado, id) {
	document.querySelector('#spinner-container').appendChild(geteSpinner());

	const options = {
		method: 'PUT',
		headers: {
			'Content-Type': 'application/json;charset=utf-8'
		},
		body: JSON.stringify(aEditado)
	};

	fetch('http://localhost:3000/Anuncios/' + id, options)
		.then((res) => {
			return res.ok ? res.json() : Promise.reject(res);
		})
		.then((data) => {
		})
		.catch((err) => {
			console.error(`Error: ${err.status}:${err.statusText}`);
		})
		.finally(() => {
			document.querySelector('.spinner').removeChild(document.querySelector('.spinner').firstElementChild);
		});
}

const geteSpinner = () => {
	const spinner = document.createElement('img');
	spinner.setAttribute('src', './assets/spenner-Velocimetro.gif');
	spinner.setAttribute('alt', 'imagen spinner');
	return spinner;
};

const clearSpinner = ()=>{
  let divSpinner = document.querySelector('#spinner-container');
  while(divSpinner.hasChildNodes()){
    divSpinner.removeChild(divSpinner.firstChild);
  }
}

