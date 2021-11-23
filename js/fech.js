function getDatosFech (){
  
    fetch("http://localhost:3000/Anuncios")
    .then((res)=>{
      //console.log(res);
      return res.ok ? res.json(): Promise.reject(res); 
    })
    .then((data)=>{
      console.log(data);                        
    }) 
    .catch(err=>{
      console.error(`Error: ${err.status}:${err.statusText}`);
    })

}



function postDatosFech (){

  document.querySelector(".spinner").appendChild(geteSpinner());
  const nuevoCocinero = {
    nombre: "Candela",
    especialidad : "Milanesa"
  };

  const options = {
    method:"POST",
    headers:{
      "Content-Type":"application/json;charset=utf-8"
    },
    body:JSON.stringify(nuevoCocinero)
  };
  
  fetch("http://localhost:3000/cocineros", options)
  .then((res)=>{
    //console.log(res);
    return res.ok ? res.json(): Promise.reject(res); 
  })
  .then((data)=>{
    console.log(data);                        
  })  
  .catch(err=>{
    console.error(`Error: ${err.status}:${err.statusText}`);
  })
  .finally(()=>{
    document.querySelector(".spinner").removeChild(document.querySelector(".spinner").firstElementChild);
  })
  

}

function deleteDatosFech (){

  document.querySelector(".spinner").appendChild(geteSpinner());

  const options = {
    method:"DELETE",
    headers:{
      "Content-Type":"application/json;charset=utf-8"
    }
  };
  
  fetch("http://localhost:3000/cocineros/6", options)
  .then((res)=>{
    //console.log(res);
    return res.ok ? res.json(): Promise.reject(res); 
  })
  .then((data)=>{
    console.log(data);                        
  })  
  .catch(err=>{
    console.error(`Error: ${err.status}:${err.statusText}`);
  })
  .finally(()=>{
    document.querySelector(".spinner").removeChild(document.querySelector(".spinner").firstElementChild);
  })
  

}

function putDatosFech (){

  document.querySelector(".spinner").appendChild(geteSpinner());
  const cocineroModificado = {
    nombre: "Candela",
    especialidad : "Pescado"
  };

  const options = {
    method:"PUT",
    headers:{
      "Content-Type":"application/json;charset=utf-8"
    },
    body:JSON.stringify(cocineroModificado)
  };
  
  fetch("http://localhost:3000/cocineros/5", options)
  .then((res)=>{
    //console.log(res);
    return res.ok ? res.json(): Promise.reject(res); 
  })
  .then((data)=>{
    console.log(data);                        
  })  
  .catch(err=>{
    console.error(`Error: ${err.status}:${err.statusText}`);
  })
  .finally(()=>{
    document.querySelector(".spinner").removeChild(document.querySelector(".spinner").firstElementChild);
  })
  

}


const geteSpinner = ()=>{
  const spinner = document.createElement("img");
  spinner.setAttribute("src","./assets/spenner-Velocimetro.gif");
  spinner.setAttribute("alt" , "imagen spinner");
  return spinner;
}
