"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var ControllArquivos_1 = __importDefault(require("../ControllArquivos"));
var Pe_as_1 = __importDefault(require("./Pe\u00E7as"));
var Etapa_1 = __importDefault(require("./Etapa"));
var Teste_1 = __importDefault(require("./Teste"));
var Aeronave = /** @class */ (function () {
    function Aeronave(codigo, modelo, tipo, capacidade, alcance) {
        this.pecas = [];
        this.etapas = [];
        this.testes = [];
        this.aeronaves = [];
        this.codigo = codigo;
        this.modelo = modelo;
        this.tipo = tipo;
        this.capacidade = capacidade;
        this.alcance = alcance;
    }
    Aeronave.prototype.adicionarPeca = function (p) {
        this.pecas.push(p);
    };
    Aeronave.prototype.adicionarEtapa = function (e) {
        this.etapas.push(e);
    };
    Aeronave.prototype.adicionarTeste = function (t) {
        this.testes.push(t);
    };
    Aeronave.prototype.detalhes = function () {
        console.log("------ Detalhes da Aeronave ------");
        console.log("Código:", this.codigo);
        console.log("Modelo:", this.modelo);
        console.log("Tipo:", this.tipo);
        console.log("Capacidade:", this.capacidade);
        console.log("Alcance:", this.alcance);
        console.log("\nPeças:");
        this.pecas.forEach(function (p) { return console.log("".concat(p.nome, " - ").concat(p.tipo, " - ").concat(p.fornecedor, " - ").concat(p.status)); });
        console.log("\nEtapas:");
        this.etapas.forEach(function (e) {
            console.log("".concat(e.nome, " - ").concat(e.prazo, " - ").concat(e.status));
            if (e.funcionarios.length > 0) {
                e.funcionarios.forEach(function (f) { return console.log("   - ".concat(f.id, " - ").concat(f.nome)); });
            }
        });
        console.log("\nTestes:");
        this.testes.forEach(function (t) { return console.log("".concat(t.tipo, " - ").concat(t.resultado)); });
    };
    Aeronave.prototype.salvar = function () {
        var _this = this;
        var todos = ControllArquivos_1.default.lerDados("aeronaves.txt");
        if (todos.some(function (f) { return (f.codigo || '').trim().toLowerCase() === _this.codigo.trim().toLowerCase(); })) {
            console.log("Aeronave com ID ".concat(this.codigo, " j\u00E1 existe!"));
        }
        else {
            var obj = {
                codigo: this.codigo,
                modelo: this.modelo,
                tipo: this.tipo,
                capacidade: String(this.capacidade),
                alcance: String(this.alcance)
            };
            ControllArquivos_1.default.salvarDados(obj, "aeronaves.txt");
            this.pecas.forEach(function (p) { return p.salvar(_this.codigo); });
            this.etapas.forEach(function (e) { return e.salvar(_this.codigo); });
            this.testes.forEach(function (t) { return t.salvar(_this.codigo); });
        }
    };
    Aeronave.prototype.carregar = function (todosFuncionarios) {
        var _this = this;
        if (todosFuncionarios === void 0) { todosFuncionarios = []; }
        var data = ControllArquivos_1.default.lerDados("aeronaves.txt");
        this.aeronaves = [];
        var loaderPeca = new Pe_as_1.default("", "Nacional", "");
        loaderPeca.carregar();
        var loaderTeste = new Teste_1.default("Elétrico", "Reprovado");
        loaderTeste.carregar();
        var loaderEtapa = new Etapa_1.default("", "");
        loaderEtapa.carregar();
        data.forEach(function (o) {
            if (!o || !o["codigo"])
                return;
            var codigo = (o["codigo"] || "").toString().trim();
            var modelo = (o["modelo"] || "").toString().trim();
            var tipo = (o["tipo"] || "").toString().trim();
            var capacidade = Number((o["capacidade"] || "0").toString().trim());
            var alcance = Number((o["alcance"] || "0").toString().trim());
            var a = new Aeronave(codigo, modelo, tipo, capacidade, alcance);
            a.pecas = loaderPeca.pecas.filter(function (p) { return (p.aeronaveCodigo || "").toString().trim() === codigo; });
            a.testes = loaderTeste.testes.filter(function (t) { return (t.aeronaveCodigo || "").toString().trim() === codigo; });
            a.etapas = loaderEtapa.etapas.filter(function (e) { return (e.aeronaveCodigo || "").toString().trim() === codigo; });
            if (todosFuncionarios && todosFuncionarios.length > 0) {
                a.etapas.forEach(function (et) { return et.associarFuncionariosPorIds(todosFuncionarios); });
            }
            _this.aeronaves.push(a);
        });
    };
    return Aeronave;
}());
exports.default = Aeronave;
