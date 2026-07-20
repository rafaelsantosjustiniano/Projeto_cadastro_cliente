class Cliente {
    id: number;
    nome: string;
    email: string;
    telefone: string;

    constructor(id: number, nome: string, email: string, telefone: string) {
        this.id = id;
        this.nome = nome;
        this.email = email;
        this.telefone = telefone;
    }
}

let clientes: Cliente[] = [];
let proximoId: number = 1;

const form = document.getElementById("formCliente") as HTMLFormElement;
const inputId = document.getElementById("clienteId") as HTMLInputElement;
const inputNome = document.getElementById("nome") as HTMLInputElement;
const inputEmail = document.getElementById("email") as HTMLInputElement;
const inputTelefone = document.getElementById("telefone") as HTMLInputElement;
const tabela = document.getElementById("tabelaClientes") as HTMLTableSectionElement;
const btnSalvar = document.getElementById("btnSalvar") as HTMLButtonElement;

form.addEventListener("submit", function(event) {
    event.preventDefault();

    const nome: string = inputNome.value;
    const email: string = inputEmail.value;
    const telefone: string = inputTelefone.value;
    const id: string = inputId.value;

    if (nome === "" || email === "" || telefone === "") {
        alert("Preencha todos os campos");
        return;
    }

    if (id === "") {
        const cliente = new Cliente(proximoId, nome, email, telefone);
        clientes.push(cliente);
        proximoId++;
    } else {
        const indice = clientes.findIndex(c => c.id === Number(id));

        if (indice !== -1) {
            clientes[indice].nome = nome;
            clientes[indice].email = email;
            clientes[indice].telefone = telefone;
        }
    }

    limparFormulario();
    listarClientes();
});

function listarClientes(): void {
    tabela.innerHTML = "";

    for (let cliente of clientes) {
        tabela.innerHTML += `
            <tr>
                <td>${cliente.id}</td>
                <td>${cliente.nome}</td>
                <td>${cliente.email}</td>
                <td>${cliente.telefone}</td>
                <td>
                    <button class="editar" onclick="editarCliente(${cliente.id})">Editar</button>
                    <button class="excluir" onclick="excluirCliente(${cliente.id})">Excluir</button>
                </td>
            </tr>
        `;
    }
}

function editarCliente(id: number): void {
    const cliente = clientes.find(c => c.id === id);

    if (cliente) {
        inputId.value = cliente.id.toString();
        inputNome.value = cliente.nome;
        inputEmail.value = cliente.email;
        inputTelefone.value = cliente.telefone;
        btnSalvar.textContent = "Atualizar";
    }
}

function excluirCliente(id: number): void {
    clientes = clientes.filter(c => c.id !== id);
    listarClientes();
}

function limparFormulario(): void {
    inputId.value = "";
    inputNome.value = "";
    inputEmail.value = "";
    inputTelefone.value = "";
    btnSalvar.textContent = "Cadastrar";
}

(window as any).editarCliente = editarCliente;
(window as any).excluirCliente = excluirCliente;