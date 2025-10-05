"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var readline_sync_1 = __importDefault(require("readline-sync"));
var Funcionario_1 = __importDefault(require("../models/classes/Funcionario"));
var Aeronave_1 = __importDefault(require("../models/classes/Aeronave"));
var Pe_as_1 = __importDefault(require("../models/classes/Pe\u00E7as"));
var Etapa_1 = __importDefault(require("../models/classes/Etapa"));
var Teste_1 = __importDefault(require("../models/classes/Teste"));
var Relatorio_1 = __importDefault(require("../models/classes/Relatorio"));
var NivelPermissao_1 = require("../models/enums/NivelPermissao");
var TipoAeronave_1 = require("../models/enums/TipoAeronave");
var TipoPe_a_1 = require("../models/enums/TipoPe\u00E7a");
var StatusPeca_1 = require("../models/enums/StatusPeca");
var TipoTeste_1 = require("../models/enums/TipoTeste");
var ResultadoTeste_1 = require("../models/enums/ResultadoTeste");
function limparTela() { process.stdout.write('\x1Bc'); console.clear(); }
function pause() { readline_sync_1.default.question("\nPressione ENTER para continuar..."); }
function autenticar() {
    var funcs = new Funcionario_1.default("", "", "", "", "", "", NivelPermissao_1.NivelPerm.OPERADOR);
    funcs.carregar();
    limparTela();
    console.log("=== LOGIN ===");
    var usuario = readline_sync_1.default.question("Usuario: ");
    var senha = readline_sync_1.default.question("Senha: ", { hideEchoBack: true });
    var f = funcs.funcionarios.find(function (x) { return x.usuario === usuario && x.senha === senha; });
    if (!f) {
        console.log("Usuario ou senha incorretos.");
        pause();
        return null;
    }
    console.log("Bem-vindo(a), ".concat(f.nome));
    pause();
    return f;
}
function submenuPecas(aer) {
    var sair = false;
    while (!sair) {
        limparTela();
        console.log("=== SUBMENU PEcAS ===");
        console.log("1 - Adicionar peca");
        console.log("2 - Listar pecas");
        console.log("3 - Voltar");
        var op = readline_sync_1.default.questionInt("Escolha uma opcao: ");
        switch (op) {
            case 1:
                var p = new Pe_as_1.default(readline_sync_1.default.question("Nome da peca: "), Object.values(TipoPe_a_1.TipoPeca)[readline_sync_1.default.keyInSelect(Object.values(TipoPe_a_1.TipoPeca), "Tipo:")], readline_sync_1.default.question("Fornecedor: "), Object.values(StatusPeca_1.StatusPeca)[readline_sync_1.default.keyInSelect(Object.values(StatusPeca_1.StatusPeca), "Status:")]);
                p.salvar(aer.codigo);
                aer.adicionarPeca(p);
                console.log("Peca cadastrada.");
                pause();
                break;
            case 2:
                console.log("=== Pecas da Aeronave ===");
                aer.pecas.forEach(function (pc, i) { return console.log("".concat(i + 1, ". ").concat(pc.nome, " | ").concat(pc.tipo, " | ").concat(pc.fornecedor, " | ").concat(pc.status)); });
                pause();
                break;
            case 3:
                sair = true;
                break;
            default:
                console.log("Opcao inválida.");
                pause();
                break;
        }
    }
}
function submenuEtapas(aer, todosFuncionarios) {
    var sair = false;
    while (!sair) {
        limparTela();
        console.log("=== SUBMENU ETAPAS ===");
        console.log("1 - Adicionar etapa");
        console.log("2 - Listar etapas");
        console.log("3 - Voltar");
        var op = readline_sync_1.default.questionInt("Escolha uma opcao: ");
        switch (op) {
            case 1:
                var e = new Etapa_1.default(readline_sync_1.default.question("Nome da etapa: "), readline_sync_1.default.question("Prazo: "));
                e.salvar(aer.codigo);
                aer.adicionarEtapa(e);
                console.log("Etapa cadastrada.");
                pause();
                break;
            case 2:
                console.log("=== Etapas da Aeronave ===");
                aer.etapas.forEach(function (et, i) {
                    console.log("".concat(i + 1, ". ").concat(et.nome, " | ").concat(et.prazo, " | ").concat(et.status));
                    if (et.funcionarios.length > 0) {
                        console.log("   Funcionários:");
                        et.funcionarios.forEach(function (f) { return console.log("     - ".concat(f.id, " - ").concat(f.nome)); });
                    }
                });
                pause();
                break;
            case 3:
                sair = true;
                break;
            default:
                console.log("Opcao inválida.");
                pause();
                break;
        }
    }
}
function submenuTestes(aer) {
    var sair = false;
    while (!sair) {
        limparTela();
        console.log("=== SUBMENU TESTES ===");
        console.log("1 - Adicionar teste");
        console.log("2 - Listar testes");
        console.log("3 - Voltar");
        var op = readline_sync_1.default.questionInt("Escolha uma opcao: ");
        switch (op) {
            case 1:
                var t = new Teste_1.default(Object.values(TipoTeste_1.TipoTeste)[readline_sync_1.default.keyInSelect(Object.values(TipoTeste_1.TipoTeste), "Tipo de teste:")], Object.values(ResultadoTeste_1.ResultadoTeste)[readline_sync_1.default.keyInSelect(Object.values(ResultadoTeste_1.ResultadoTeste), "Resultado:")]);
                t.salvar(aer.codigo);
                aer.adicionarTeste(t);
                console.log("Teste registrado.");
                pause();
                break;
            case 2:
                console.log("=== Testes da Aeronave ===");
                aer.testes.forEach(function (tt, i) { return console.log("".concat(i + 1, ". ").concat(tt.tipo, " => ").concat(tt.resultado)); });
                pause();
                break;
            case 3:
                sair = true;
                break;
            default:
                console.log("Opcao inválida.");
                pause();
                break;
        }
    }
}
function main() {
    limparTela();
    console.log("=== Aerocode - Sistema CLI ===");
    var usuario = autenticar();
    if (!usuario)
        return;
    var sair = false;
    while (!sair) {
        limparTela();
        console.log("=== MENU PRINCIPAL ===");
        console.log("1 - Cadastrar funcionário");
        console.log("2 - Cadastrar aeronave");
        console.log("3 - Gerenciar pecas");
        console.log("4 - Gerenciar etapas");
        console.log("5 - Gerenciar testes");
        console.log("6 - Listar aeronaves e detalhes");
        console.log("7 - Gerar relatorio final");
        console.log("8 - Sair");
        var op = readline_sync_1.default.questionInt("Escolha uma opcao: ");
        var funcs = new Funcionario_1.default("", "", "", "", "", "", NivelPermissao_1.NivelPerm.OPERADOR);
        funcs.carregar();
        var aer = new Aeronave_1.default("", "", TipoAeronave_1.TipoAeronave.COMERCIAL, 0, 0);
        aer.carregar(funcs.funcionarios);
        switch (op) {
            case 1:
                if (usuario.nivelPermissao === NivelPermissao_1.NivelPerm.ADMINISTRADOR) {
                    var f = new Funcionario_1.default(readline_sync_1.default.question("ID: "), readline_sync_1.default.question("Nome: "), readline_sync_1.default.question("Telefone: "), readline_sync_1.default.question("Endereco: "), readline_sync_1.default.question("Usuario: "), readline_sync_1.default.question("Senha: ", { hideEchoBack: true }), Object.values(NivelPermissao_1.NivelPerm)[readline_sync_1.default.keyInSelect(Object.values(NivelPermissao_1.NivelPerm), "Nivel de permissao:")]);
                    f.salvar();
                    console.log("Funcionário salvo.");
                    pause();
                }
                else {
                    console.log("Acesso negado. Apenas Administrador pode cadastrar funcionários.");
                    pause();
                }
                break;
            case 2:
                if (usuario.nivelPermissao === NivelPermissao_1.NivelPerm.ADMINISTRADOR || usuario.nivelPermissao === NivelPermissao_1.NivelPerm.ENGENHEIRO) {
                    var a = new Aeronave_1.default(readline_sync_1.default.question("Codigo (unico): "), readline_sync_1.default.question("Modelo: "), Object.values(TipoAeronave_1.TipoAeronave)[readline_sync_1.default.keyInSelect(Object.values(TipoAeronave_1.TipoAeronave), "Tipo:")], readline_sync_1.default.questionInt("Capacidade: "), readline_sync_1.default.questionInt("Alcance (km): "));
                    a.salvar();
                    aer.aeronaves.push(a);
                    console.log("Aeronave salva.");
                    pause();
                }
                else {
                    console.log("Acesso negado.");
                    pause();
                }
                break;
            case 3:
                if (aer.aeronaves.length === 0) {
                    console.log("Nenhuma aeronave cadastrada.");
                    pause();
                    break;
                }
                aer.aeronaves.forEach(function (a, i) { return console.log("".concat(i + 1, ". ").concat(a.codigo, " - ").concat(a.modelo)); });
                var idxP = readline_sync_1.default.questionInt("Escolha aeronave: ") - 1;
                if (idxP >= 0 && idxP < aer.aeronaves.length)
                    submenuPecas(aer.aeronaves[idxP]);
                break;
            case 4:
                if (aer.aeronaves.length === 0) {
                    console.log("Nenhuma aeronave cadastrada.");
                    pause();
                    break;
                }
                aer.aeronaves.forEach(function (a, i) { return console.log("".concat(i + 1, ". ").concat(a.codigo, " - ").concat(a.modelo)); });
                var idxE = readline_sync_1.default.questionInt("Escolha aeronave: ") - 1;
                if (idxE >= 0 && idxE < aer.aeronaves.length)
                    submenuEtapas(aer.aeronaves[idxE], funcs.funcionarios);
                break;
            case 5:
                if (aer.aeronaves.length === 0) {
                    console.log("Nenhuma aeronave cadastrada.");
                    pause();
                    break;
                }
                aer.aeronaves.forEach(function (a, i) { return console.log("".concat(i + 1, ". ").concat(a.codigo, " - ").concat(a.modelo)); });
                var idxT = readline_sync_1.default.questionInt("Escolha aeronave: ") - 1;
                if (idxT >= 0 && idxT < aer.aeronaves.length)
                    submenuTestes(aer.aeronaves[idxT]);
                break;
            case 6:
                console.log("=== Aeronaves Cadastradas ===");
                aer.aeronaves.forEach(function (a, i) { return console.log("".concat(i + 1, ". ").concat(a.codigo, " - ").concat(a.modelo)); });
                var idx = readline_sync_1.default.questionInt("Ver detalhes (número, 0 sai): ");
                if (idx > 0 && idx <= aer.aeronaves.length)
                    aer.aeronaves[idx - 1].detalhes();
                pause();
                break;
            case 7:
                if (aer.aeronaves.length === 0) {
                    console.log("Nenhuma aeronave cadastrada.");
                    pause();
                    break;
                }
                aer.aeronaves.forEach(function (a, i) { return console.log("".concat(i + 1, ". ").concat(a.codigo, " - ").concat(a.modelo)); });
                var idxR = readline_sync_1.default.questionInt("Escolha aeronave: ") - 1;
                if (idxR >= 0 && idxR < aer.aeronaves.length) {
                    var cliente = readline_sync_1.default.question("Nome do cliente: ");
                    var data = readline_sync_1.default.question("Data de entrega (AAAA-MM-DD): ");
                    var r = new Relatorio_1.default(aer.aeronaves[idxR], cliente, data);
                    r.salvarEmArquivo();
                }
                pause();
                break;
            case 8:
                sair = true;
                break;
            default:
                console.log("Opcao inválida.");
                pause();
                break;
        }
    }
    console.log("Encerrando sistema...");
}
main();
