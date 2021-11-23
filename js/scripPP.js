window.addEventListener('DOMContentLoaded', () => {
     getDatosAjax();
    
});

const geteSpinner = () => {
	const spinner = document.createElement('img');
	spinner.setAttribute('src', './assets/spenner-Velocimetro.gif');
	spinner.setAttribute('alt', 'imagen spinner');
	return spinner;
};

function getDatosAjax() {
	const xhr = new XMLHttpRequest();
	document.querySelector("#spinner-container").appendChild(geteSpinner());
	xhr.onreadystatechange = () => {
	  if (xhr.readyState == 4) {
		if (xhr.status >= 200 && xhr.status <= 299) {
		  let data = JSON.parse(xhr.responseText);
		  crearArticulo2(data);
		} else {
		  const statusText = xhr.statusText || "Ocurrio un error";
		  console.error(`Error: ${xhr.status} : ${statusText}`); // manejando el error
		}  
		document.querySelector('#spinner-container').removeChild(document.querySelector('#spinner-container').firstElementChild);
	  }
	};
	xhr.open("GET", "http://localhost:3000/Anuncios");
	xhr.send();
  }


function crearArticulo2(data) {	    
	data.forEach((element) => {
		const {titulo, descripcion, precio, puertas, kms, potencia} = element;
		const Div = document.createElement('div'); Div.setAttribute('id', 'articulo');Div.setAttribute('class', 'container');
		const Div2 = document.createElement('div'); Div2.setAttribute('id', 'iconos');
		const Div3 = document.createElement('div'); Div3.setAttribute('class','row justify-content-around ');
		const h2 = document.createElement('h2');
		const P = document.createElement('p');
		const P1 = document.createElement('p');
		const P4 = document.createElement('p');
		const icon1 = document.createElement('img');
		const P2 = document.createElement('p');
		const icon2 = document.createElement('img');
		const P3 = document.createElement('p');
		const icon3 = document.createElement('img');
		h2.textContent=titulo; P.textContent=descripcion; P1.textContent=precio;P2.textContent=puertas;
		icon1.setAttribute('src', './image/icono-puerta.png');
		P3.textContent = kms;
		icon2.setAttribute('src', './image/icono-velocímetro.png');
        P4.textContent = potencia;
		icon3.setAttribute('src', './image/icons-motor.png');
        const btnVer = document.createElement('button'); btnVer.setAttribute('class','col-lg-4 col-md-4 col-sm-6 mt-2');
        btnVer.textContent= "Ver Vehiculo";        
        Div2.append( icon1, P2, icon2, P3, icon3,P4);
		Div3.append(btnVer);
		Div.append(h2, P, P1,Div2,Div3);
		// Div.append(h2, P, P1,Div2,btnVer);
        const Articulo = document.getElementById('divArticulo');
        Articulo.appendChild(Div);
	});
}

