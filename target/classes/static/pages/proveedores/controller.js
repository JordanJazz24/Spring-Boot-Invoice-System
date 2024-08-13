var api=backend+'/proveedores';

var state ={
    list: new Array(),
    item : {cedula:"", nombre:"",sexo:""},
    mode: "" // ADD, EDIT
}

document.addEventListener("DOMContentLoaded",loaded);

async function loaded(event){
    try{ await menu();} catch(error){return;}

    fetchAndList();
}

function fetchAndList(){
    const request = new Request(api, {method: 'GET', headers: { }});
    (async ()=>{
        const response = await fetch(request);
        if (!response.ok) {errorMessage(response.status);return;}
        state.list = await response.json();
        render_list();
    })();
}

function render_list(){
    var listado=document.getElementById("list");
    listado.innerHTML="";
    state.list.forEach( item=>render_list_item(listado,item));
}

function render_list_item(listado,item){
    var tr =document.createElement("tr");
    tr.innerHTML=`<td>${item.id}</td>
					<td>${item.nombre}</td>
                    <td id='activador'>${item.estado}</td>`;
    tr.querySelector("#activador").addEventListener("click",()=>{activadorDesactivador(item.id);});
    listado.append(tr);
}







function activadorDesactivador(id){
    let request = new Request(api + `/${id}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' }
    });
    (async () => {
        const response = await fetch(request);
        if (!response.ok) {
            errorMessage(response.status);
            return;
        }
        fetchAndList();
    })();
}





   



