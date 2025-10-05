"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var ControllArquivos_1 = __importDefault(require("../ControllArquivos"));
var StatusPeca_1 = require("../enums/StatusPeca");
var Peca = /** @class */ (function () {
    function Peca(nome, tipo, fornecedor, status, aeronaveCodigo) {
        if (status === void 0) { status = StatusPeca_1.StatusPeca.EM_PRODUCAO; }
        this.pecas = [];
        this.nome = nome;
        this.tipo = tipo;
        this.fornecedor = fornecedor;
        this.status = status;
        this.aeronaveCodigo = aeronaveCodigo;
    }
    Peca.prototype.atualizarStatus = function (novoStatus) {
        this.status = novoStatus;
    };
    Peca.prototype.salvar = function (aeronaveCodigo) {
        var obj = {
            aeronaveCodigo: aeronaveCodigo,
            nome: this.nome,
            tipo: this.tipo,
            fornecedor: this.fornecedor,
            status: this.status
        };
        ControllArquivos_1.default.salvarDados(obj, "pecas.txt");
    };
    Peca.prototype.carregar = function () {
        var _this = this;
        var data = ControllArquivos_1.default.lerDados("pecas.txt");
        this.pecas = [];
        data.forEach(function (o) {
            if (!o || !o["nome"])
                return;
            var aeronaveCodigo = (o["aeronaveCodigo"] || "").toString().trim();
            var nome = (o["nome"] || "").toString().trim();
            var tipo = (o["tipo"] || "").toString().trim();
            var fornecedor = (o["fornecedor"] || "").toString().trim();
            var status = (o["status"] || "").toString().trim();
            var p = new Peca(nome, tipo, fornecedor, status, aeronaveCodigo);
            _this.pecas.push(p);
        });
    };
    return Peca;
}());
exports.default = Peca;
