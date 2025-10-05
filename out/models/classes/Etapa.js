"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var ControllArquivos_1 = __importDefault(require("../ControllArquivos"));
var StatusEtapa_1 = require("../enums/StatusEtapa");
var Etapa = /** @class */ (function () {
    function Etapa(nome, prazo, status, funcionariosIds, aeronaveCodigo) {
        if (status === void 0) { status = StatusEtapa_1.StatusEtapa.PENDENTE; }
        if (funcionariosIds === void 0) { funcionariosIds = ""; }
        this.funcionariosIds = "";
        this.funcionarios = [];
        this.etapas = [];
        this.nome = nome;
        this.prazo = prazo;
        this.status = status;
        this.funcionariosIds = funcionariosIds;
        this.aeronaveCodigo = aeronaveCodigo;
    }
    Etapa.prototype.iniciar = function () {
        if (this.status === StatusEtapa_1.StatusEtapa.PENDENTE) {
            this.status = StatusEtapa_1.StatusEtapa.ANDAMENTO;
        }
    };
    Etapa.prototype.finalizar = function () {
        if (this.status === StatusEtapa_1.StatusEtapa.ANDAMENTO) {
            this.status = StatusEtapa_1.StatusEtapa.CONCLUIDA;
        }
    };
    Etapa.prototype.associarFuncionario = function (f) {
        if (!this.funcionarios.some(function (x) { return x.id === f.id; })) {
            this.funcionarios.push(f);
            var ids = this.funcionarios.map(function (x) { return x.id; });
            this.funcionariosIds = ids.join(",");
        }
    };
    Etapa.prototype.listarFuncionarios = function () {
        return this.funcionarios;
    };
    Etapa.prototype.salvar = function (aeronaveCodigo) {
        var obj = {
            aeronaveCodigo: aeronaveCodigo,
            nome: this.nome,
            prazo: this.prazo,
            status: this.status,
            funcionarios: this.funcionariosIds
        };
        ControllArquivos_1.default.salvarDados(obj, "etapas.txt");
    };
    Etapa.prototype.carregar = function () {
        var _this = this;
        var data = ControllArquivos_1.default.lerDados("etapas.txt");
        this.etapas = [];
        data.forEach(function (o) {
            if (!o || !o["nome"])
                return;
            var aeronaveCodigo = (o["aeronaveCodigo"] || "").toString().trim();
            var nome = (o["nome"] || "").toString().trim();
            var prazo = (o["prazo"] || "").toString().trim();
            var status = (o["status"] || "").toString().trim();
            var funcionarios = (o["funcionarios"] || "").toString().trim();
            var e = new Etapa(nome, prazo, status, funcionarios, aeronaveCodigo);
            _this.etapas.push(e);
        });
    };
    Etapa.prototype.associarFuncionariosPorIds = function (todosFuncionarios) {
        var _this = this;
        if (!this.funcionariosIds || this.funcionariosIds.trim().length === 0)
            return;
        var ids = this.funcionariosIds.split(",").map(function (s) { return s.trim(); }).filter(function (s) { return s.length > 0; });
        ids.forEach(function (id) {
            var f = todosFuncionarios.find(function (tf) { return tf.id === id; });
            if (f && !_this.funcionarios.some(function (x) { return x.id === f.id; })) {
                _this.funcionarios.push(f);
            }
        });
    };
    return Etapa;
}());
exports.default = Etapa;
