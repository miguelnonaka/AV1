"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var ControllArquivos_1 = __importDefault(require("../ControllArquivos"));
var NivelPermissao_1 = require("../enums/NivelPermissao");
var Funcionario = /** @class */ (function () {
    function Funcionario(id, nome, telefone, endereco, usuario, senha, nivelPermissao) {
        this.funcionarios = [];
        this.id = id;
        this.nome = nome;
        this.telefone = telefone;
        this.endereco = endereco;
        this.usuario = usuario;
        this.senha = senha;
        this.nivelPermissao = nivelPermissao;
    }
    Funcionario.prototype.autenticar = function (usuario, senha) {
        return this.usuario === usuario && this.senha === senha;
    };
    Funcionario.prototype.possuiPermissao = function (nivel) {
        return this.nivelPermissao === nivel || this.nivelPermissao === NivelPermissao_1.NivelPerm.ADMINISTRADOR;
    };
    Funcionario.prototype.salvar = function () {
        var _this = this;
        var todos = ControllArquivos_1.default.lerDados("funcionario.txt");
        if (todos.some(function (f) { return f.id === _this.id; })) {
            console.log("Funcion\u00E1rio com ID ".concat(this.id, " j\u00E1 existe!"));
        }
        else {
            var objectFuncionario = {
                id: this.id,
                nome: this.nome,
                telefone: this.telefone,
                endereco: this.endereco,
                usuario: this.usuario,
                senha: this.senha,
                nivelPermissao: this.nivelPermissao
            };
            ControllArquivos_1.default.salvarDados(objectFuncionario, "funcionario.txt");
        }
    };
    Funcionario.prototype.printFunc = function () {
        console.log("--------------------------------------------");
        console.log("ID: " + this.id);
        console.log("Nome: " + this.nome);
        console.log("Telefone: " + this.telefone);
        console.log("Endereço: " + this.endereco);
        console.log("Nome de Usuario: " + this.usuario);
        console.log("Nivel de Permissão: " + this.nivelPermissao);
    };
    Funcionario.prototype.carregar = function () {
        var _this = this;
        var data = ControllArquivos_1.default.lerDados("funcionario.txt");
        this.funcionarios = [];
        data.forEach(function (obj) {
            _this.funcionarios.push(new Funcionario(obj["id"], obj["nome"], obj["telefone"], obj["endereco"], obj["usuario"], obj["senha"], Object.values(NivelPermissao_1.NivelPerm).includes(obj["nivelPermissao"])
                ? obj["nivelPermissao"] : NivelPermissao_1.NivelPerm.OPERADOR));
        });
        /*console.log(data.length + " funcionarios foram carregados.")
        for(const funcionarios of this.funcionarios){
            funcionarios.printFunc()
        }*/
    };
    return Funcionario;
}());
exports.default = Funcionario;
