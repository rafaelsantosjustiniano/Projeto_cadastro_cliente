"use strict";
class Cliente {
    id;
    nome;
    email;
    telefone;
    constructor(id, nome, email, telefone) {
        this.id = id;
        this.nome = nome;
        this.email = email;
        this.telefone = telefone;
    }
}
let clientes = [];
let proximoId = 1;
const form = document.getElementById("formCliente");
const inputId = document.getElementById("clienteId");
const inputNome = document.getElementById("nome");
const inputEmail = document.getElementById("email");
const inputTelefone = document.getElementById("telefone");
const tabela = document.getElementById("tabelaClientes");
const btnSalvar = document.getElementById("btnSalvar");
form.addEventListener("submit", function (event) {
    event.preventDefault();
    const nome = inputNome.value;
    const email = inputEmail.value;
    const telefone = inputTelefone.value;
    const id = inputId.value;
    if (nome === "" || email === "" || telefone === "") {
        alert("Preencha todos os campos");
        return;
    }
    if (id === "") {
        const cliente = new Cliente(proximoId, nome, email, telefone);
        clientes.push(cliente);
        proximoId++;
    }
    else {
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
function listarClientes() {
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
function editarCliente(id) {
    const cliente = clientes.find(c => c.id === id);
    if (cliente) {
        inputId.value = cliente.id.toString();
        inputNome.value = cliente.nome;
        inputEmail.value = cliente.email;
        inputTelefone.value = cliente.telefone;
        btnSalvar.textContent = "Atualizar";
    }
}
function excluirCliente(id) {
    clientes = clientes.filter(c => c.id !== id);
    listarClientes();
}
function limparFormulario() {
    inputId.value = "";
    inputNome.value = "";
    inputEmail.value = "";
    inputTelefone.value = "";
    btnSalvar.textContent = "Cadastrar";
}
window.editarCliente = editarCliente;
window.excluirCliente = excluirCliente;
