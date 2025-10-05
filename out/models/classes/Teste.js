"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var ControllArquivos_1 = __importDefault(require("../ControllArquivos"));
var ResultadoTeste_1 = require("../enums/ResultadoTeste");
var Teste = /** @class */ (function () {
    function Teste(tipo, resultado, aeronaveCodigo) {
        if (resultado === void 0) { resultado = ResultadoTeste_1.ResultadoTeste.REPROVADO; }
        this.testes = [];
        this.tipo = tipo;
        this.resultado = resultado;
        this.aeronaveCodigo = aeronaveCodigo;
    }
    Teste.prototype.salvar = function (aeronaveCodigo) {
        var obj = {
            aeronaveCodigo: aeronaveCodigo,
            tipo: this.tipo,
            resultado: this.resultado
        };
        ControllArquivos_1.default.salvarDados(obj, "testes.txt");
    };
    Teste.prototype.carregar = function () {
        var _this = this;
        var data = ControllArquivos_1.default.lerDados("testes.txt");
        this.testes = [];
        data.forEach(function (o) {
            if (!o || !o["tipo"])
                return;
            var aeronaveCodigo = (o["aeronaveCodigo"] || "").toString().trim();
            var tipo = (o["tipo"] || "").toString().trim();
            var resultado = (o["resultado"] || "").toString().trim();
            var t = new Teste(tipo, resultado, aeronaveCodigo);
            _this.testes.push(t);
        });
    };
    return Teste;
}());
exports.default = Teste;
