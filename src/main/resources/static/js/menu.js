var backend="http://localhost:8080/api";
var api_login=backend+'/login';

var loginstate ={
    logged: false,
    user : {id:"", rol:""}
}

async function checkuser() {
    let request = new Request(api_login + '/current-user', {method: 'GET'});
    try {
        const response = await fetch(request);
        if (response.ok) {
            loginstate.logged = true;
            loginstate.user = await response.json();
        } else {
            loginstate.logged = false;
        }
    } catch (error) {
        console.error("Network error:", error);
        loginstate.logged = false;
    }
}

    async function menu(){
    await checkuser();
    if (!loginstate.logged
        && document.location.pathname !== "/pages/login/view.html") {
        document.location = "/pages/login/view.html";
        throw new Error("Usuario no autorizado");
    }
    render_menu();
}

function render_menu() {
    if (!loginstate.logged) {
        html = `
            <div class="logo">
                <span>Facturacion</span>
                <img src="/images/logo.png">
            </div>
            <div>
                <ul class="Menu">
                    <li id="loginlink"><a href="#"> Login</a></li>
                    <li id="bienvenidalink"><a href="#"> Bienvenida</a></li>
                </ul>
            </div>
        `;
        document.querySelector('#menu').innerHTML = html;
        document.querySelector("#menu #loginlink").addEventListener('click', ask);
        render_loginoverlay();
        render_loginview();
    } else {
        let menuItems = '';
        let userOptions = `
            <li id="profilelink"><a href="#"> Perfil</a></li>
            <li id="logoutlink"><a href="#"> Logout</a></li>
        `;

        switch (loginstate.user.rol) {
            case 'admin':
                menuItems = `
                    <li id="proveedoreslink"><a href="#"> Proveedores</a></li>
                    <li id="userlink">
                        <a href="#"> ${loginstate.user.identificacion}</a>
                        <ul class="submenu">
                            ${userOptions}
                        </ul>
                    </li>
                `;
                break;
            case 'proveedor':
                menuItems = `
                    <li id="facturarlink"><a href="#"> Facturar</a></li>
                    <li id="clienteslink"><a href="#"> Clientes</a></li>
                    <li id="productoslink"><a href="#"> Productos</a></li>
                    <li id="facturaslink"><a href="#"> Facturas</a></li>
                    <li id="userlink">
                        <a href="#"> ${loginstate.user.identificacion}</a>
                        <ul class="submenu">
                            ${userOptions}
                        </ul>
                    </li>
                `;
                break;
            default:
                menuItems = `
                    <li id="bienvenidalink"><a href="#"> Bienvenida</a></li>
                `;
                break;
        }

        html = `
            <div class="logo">
                <span>Facturacion</span>
                <img src="/images/logo.png">
            </div>
            <div>
                <ul class="Menu">
                    ${menuItems}
                </ul>
            </div>
        `;
            document.querySelector('#menu').innerHTML = html;

        // Event Listeners for Common Links
        document.querySelector("#menu #logoutlink").addEventListener('click', logout);
        document.querySelector("#menu #profilelink").addEventListener('click', e => {
            document.location = "/pages/perfil/view.html";
        });

        // Event Listeners for Role Specific Links
        if (loginstate.user.rol === 'admin') {
            document.querySelector("#menu #proveedoreslink").addEventListener('click', e => {
                document.location = "/pages/proveedores/view.html";
            });
        } else if (loginstate.user.rol === 'proveedor') {
            document.querySelector("#menu #facturarlink").addEventListener('click', e => {
                document.location = "/pages/facturacion/view.html";
            });
            document.querySelector("#menu #clienteslink").addEventListener('click', e => {
                document.location = "/pages/clientes/view.html";
            });
            document.querySelector("#menu #productoslink").addEventListener('click', e => {
                document.location = "/pages/productos/view.html";
            });
            document.querySelector("#menu #facturaslink").addEventListener('click', e => {
                document.location = "/pages/factura/View.html";
            });
        }
    }
}


function render_loginoverlay() {
    html = `
        <div id="loginoverlay" class="loginoverlay"></div>
    `;
    overlay=document.createElement('div');
    overlay.innerHTML=html;
    document.body.appendChild(overlay);
    document.querySelector("#loginoverlay").addEventListener("click",toggle_loginview);
}

function render_loginview() {
    html = `
    <div id="loginview" class='loginview'>
        <div class='col-12'>
            <div>
                <form name="formulario">
                    <div class='container'>
                        <div class='row'><div class='col-12 text-centered cooper'>Login</div></div>
                        <div class='row'><div class='col-3 text-right'>Id</div><div class='col-6'><input type="text" name="id" id="id" value=""></div></div>
                        <div class='row'><div class='col-3 text-right'>Clave</div><div class='col-6'><input type="password" name="password" id="password" value=""></div></div>
                        <div class='row'>
                            <div class='col-6 text-centered cooper'>
                                <input id="login" class="boton" type="button" value="Login">
                                &nbsp
                                <input id="cancelar" class="boton" type="button" value="Cancelar">
                            </div>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    </div>    
    `;
    view=document.createElement('div');
    view.innerHTML=html;
    document.body.appendChild(view);
    document.querySelector("#loginview #login").addEventListener("click",login);
    document.querySelector("#loginview #cancelar").addEventListener("click",toggle_loginview);
}

function ask(event){
    event.preventDefault();
    toggle_loginview();
    document.querySelectorAll('#loginview input').forEach( (i)=> {i.classList.remove("invalid");});
    document.querySelector("#loginview #id").value = "";
    document.querySelector("#loginview #password").value = "";
}

function toggle_loginview(){
    document.getElementById("loginoverlay").classList.toggle("active");
    document.getElementById("loginview").classList.toggle("active");
}

function login() {
    let user = {
        identificacion: document.getElementById("id").value,
        contrasena: document.getElementById("password").value
    };

    let request = new Request(api_login + '/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(user)
    });

    (async () => {
        try {
            const response = await fetch(request);
            if (!response.ok) {
                errorMessage(response.status);
                return;
            }
            user = await response.json();

               switch (user.rol) {
                    case 'admin':
                        document.location = "/pages/proveedores/view.html";
                        break;
                    case 'proveedor':
                        document.location = "/pages/productos/view.html";
                        break;
                    default:
                        document.location = "/pages/login/view.html";
               }

        } catch (error) {
            console.error("Error during fetch:", error);
            errorMessage("Network error");
        }
    })();
}

function errorMessage(status) {
    let message = "Error: ";
    switch (status) {
        case 400:
            message += "Bad Request. Please check the input data.";
            break;
        case 401:
            message += "Unauthorized. Please check your credentials.";
            break;
        case 404:
            message += "Endpoint not found.";
            break;
        case 500:
            message += "Server error. Please try again later.";
            break;
        default:
            message += "Unexpected error.";
    }
    alert(message);
}


function logout(event){
    if (event) {
        event.preventDefault();
    }
    let request = new Request(api_login+'/logout', {method: 'POST'});
    (async ()=>{
        const response = await fetch(request);
        if (!response.ok) {errorMessage(response.status);return;}
        state.item = {id: "", clienteByIdCliente: {}, proveedorByIdProveedor: {}};
        state.list = [];
        sessionStorage.clear();
        loginstate.logged = false;
        document.location="/pages/login/view.html";
    })();
}





