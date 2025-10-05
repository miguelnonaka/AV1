"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var fs_1 = __importDefault(require("fs"));
var path_1 = __importDefault(require("path"));
var Relatorio = /** @class */ (function () {
    function Relatorio(aeronave, cliente, dataEntrega) {
        this.aeronave = aeronave;
        this.cliente = cliente;
        this.dataEntrega = dataEntrega;
    }
    Relatorio.prototype.gerarRelatorio = function () {
        var a = this.aeronave;
        var out = "";
        out += "===== RELATÓRIO DE ENTREGA =====\n";
        out += "Aeronave: ".concat(a.codigo, " - ").concat(a.modelo, "\n");
        out += "Tipo: ".concat(a.tipo, "\n");
        out += "Capacidade: ".concat(a.capacidade, "\n");
        out += "Alcance: ".concat(a.alcance, "\n\n");
        out += "Cliente: ".concat(this.cliente, "\n");
        out += "Data de Entrega: ".concat(this.dataEntrega, "\n\n");
        out += "== Etapas ==\n";
        a.etapas.forEach(function (e, idx) {
            out += "".concat(idx + 1, ". ").concat(e.nome, " | Prazo: ").concat(e.prazo, " | Status: ").concat(e.status, "\n");
            if (e.funcionarios.length > 0) {
                out += "   Funcion\u00E1rios:\n";
                e.funcionarios.forEach(function (f) {
                    out += "     - ".concat(f.id, " - ").concat(f.nome, "\n");
                });
            }
        });
        out += "\n== Peças ==\n";
        a.pecas.forEach(function (p) {
            out += "- ".concat(p.nome, " | Tipo: ").concat(p.tipo, " | Fornecedor: ").concat(p.fornecedor, " | Status: ").concat(p.status, "\n");
        });
        out += "\n== Testes ==\n";
        a.testes.forEach(function (t) {
            out += "- ".concat(t.tipo, " => ").concat(t.resultado, "\n");
        });
        out += "\n===============================\n";
        return out;
    };
    Relatorio.prototype.salvarEmArquivo = function (dir) {
        if (dir === void 0) { dir = "./src/data/reports"; }
        var content = this.gerarRelatorio();
        if (!fs_1.default.existsSync(dir))
            fs_1.default.mkdirSync(dir, { recursive: true });
        var filename = "relatorio_".concat(this.aeronave.codigo, "_").concat(this.dataEntrega.replace(/[:\/ ]/g, "_"), ".txt");
        var full = path_1.default.join(dir, filename);
        fs_1.default.writeFileSync(full, content, { encoding: "utf-8" });
        console.log("Relat\u00F3rio salvo em: ".concat(full));
    };
    return Relatorio;
}());
exports.default = Relatorio;
