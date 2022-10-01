const tableCoches = document.getElementById("tableCars")

let ListCars = [];

const urlBase= "https://coche-crud.herokuapp.com/api/coches";

async function fetchCars(){
    const car = await fetch(urlBase);
    const cars = await car.json();
    ListCars = cars;
    return ListCars;
}

function showCars(cars){
    cars.forEach(coche =>{
        const carCreate = document.createElement("tr")
        carCreate.innerHTML = `
            <td>${coche.id}</td>
            <td>${coche.marca}</td>
            <td>${coche.color}</td>
            <td>${coche.tipocombustible}</td>
            <td>${coche.chapa}</td>
             <button type= "button" id="btnDelete" onclick="updateCars(coche.id)">Modificar</button>
            <button type= "button" id="btnDelete" onclick="deleteCarById('${coche.id}')">Eliminar</button>`
        carCreate.onclick = e => {
            document.getElementById("marca").value = coche.marca;
            document.getElementById("color").value = coche.color;
            document.getElementById("combustible").value = coche.tipocombustible;
            document.getElementById("chapa").value = coche.chapa;
        }
        tableCoches.appendChild(carCreate)

    })
}

(async ()=>{
    const coche= await fetchCars();
    console.log(coche)
    showCars(coche)
})()

async function insertCars(){
    const marca = document.getElementById("marca").value;
    const color = document.getElementById("color").value;
    const tipocombustible = document.getElementById("combustible").value;
    const chapa = document.getElementById("chapa").value;
    const response = await fetch(urlBase, {
        method: 'POST', // *GET, POST, PUT, DELETE, etc.
        mode: 'cors', // no-cors, *cors, same-origin
        //cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
        //credentials: 'same-origin', // include, *same-origin, omit
        headers: {
            'Content-Type': 'application/json'
            // 'Content-Type': 'application/x-www-form-urlencoded',
        },
        redirect: 'follow', // manual, *follow, error
        referrerPolicy: 'no-referrer', // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
        body: JSON.stringify({
            marca,
            color,
            tipocombustible,
            chapa

        }) // body data type must match "Content-Type" header
    });
    alert(await response.text())
}

async function updateCars(id){
    const marca = document.getElementById("marca").value;
    const color = document.getElementById("color").value;
    const tipocombustible = document.getElementById("combustible").value;
    const chapa = document.getElementById("chapa").value;
    const response = await fetch(urlBase + "/"+ id, {
        method: 'PUT',
        body: marca, color, tipocombustible, chapa
    })
        .then((response) => response.json())
        .then((result) => {
            console.log('Success:', result);
        })
        .catch((error) => {
            console.error('Error:', error);
        });
    alert(await response.text())
}

async function deleteCarById(id){

    const response = await fetch(urlBase + "/"+ id, {
        method: 'DELETE'
    })
        .then((response) => response.json())
        .then((result) => {
            console.log('Success:', result);
        })
        .catch((error) => {
            console.error('Error:', error);
        });
    alert(await response.text())
}

