import readlineSync from "readline-sync";

import Funcionario from "../models/classes/Funcionario";
import Aeronave from "../models/classes/Aeronave";
import Peca from "../models/classes/Peças";
import Etapa from "../models/classes/Etapa";
import Teste from "../models/classes/Teste";
import Relatorio from "../models/classes/Relatorio";

import { NivelPerm } from "../models/enums/NivelPermissao";
import { TipoAeronave } from "../models/enums/TipoAeronave";
import { TipoPeca } from "../models/enums/TipoPeça";
import { StatusPeca } from "../models/enums/StatusPeca";
import { StatusEtapa } from "../models/enums/StatusEtapa";
import { TipoTeste } from "../models/enums/TipoTeste";
import { ResultadoTeste } from "../models/enums/ResultadoTeste";

function limparTela() {process.stdout.write('\x1Bc'); console.clear(); }
function pause() { readlineSync.question("\nPressione ENTER para continuar"); }

function autenticar(): Funcionario | null {
    const funcs = new Funcionario("", "", "", "", "", "", NivelPerm.OPERADOR);
    funcs.carregar();
    limparTela();

    console.log("=== LOGIN ===");
    const usuario = readlineSync.question("Usuario: ");
    const senha = readlineSync.question("Senha: ", { hideEchoBack: true });

    const f = funcs.funcionarios.find(x => x.usuario === usuario && x.senha === senha);
    if (!f) {
        console.log("Usuario ou senha incorretos.");
        pause();
        return null;
    }
    console.log(`Bem-vindo(a), ${f.nome}`);
    pause();
    return f;
}

function submenuPecas(aer: Aeronave): void {
    let sair = false;
    while (!sair) {
        limparTela();
        console.log("=== SUBMENU PEcAS ===");
        console.log("1 - Adicionar peca");
        console.log("2 - Listar pecas");
        console.log("3 - Voltar");

        const op = readlineSync.questionInt("Escolha uma opcao: ");
        switch(op) {
            case 1:
                const p = new Peca(
                    readlineSync.question("Nome da peca: "),
                    Object.values(TipoPeca)[readlineSync.keyInSelect(Object.values(TipoPeca), "Tipo:")],
                    readlineSync.question("Fornecedor: "),
                    Object.values(StatusPeca)[readlineSync.keyInSelect(Object.values(StatusPeca), "Status:")]
                );
                p.salvar(aer.codigo);
                aer.adicionarPeca(p);
                console.log("Peca cadastrada.");
                pause();
                break;
            case 2:
                console.log("=== Pecas da Aeronave ===");
                aer.pecas.forEach((pc, i) => console.log(`${i+1}. ${pc.nome} | ${pc.tipo} | ${pc.fornecedor} | ${pc.status}`));
                pause();
                break;
            case 3:
                sair = true;
                break;
            default:
                console.log("Opcao invalida.");
                pause();
                break;
        }
    }
}

function submenuEtapas(aer: Aeronave, todosFuncionarios: Funcionario[]): void {
    let sair = false;
    while (!sair) {
        limparTela();
        console.log("=== SUBMENU ETAPAS ===");
        console.log("1 - Adicionar etapa");
        console.log("2 - Listar etapas");
        console.log("3 - Voltar");

        const op = readlineSync.questionInt("Escolha uma opcao: ");
        switch(op) {
            case 1:
                const e = new Etapa(
                    readlineSync.question("Nome da etapa: "),
                    readlineSync.question("Prazo: ")
                );
                e.salvar(aer.codigo);
                aer.adicionarEtapa(e);
                console.log("Etapa cadastrada.");
                pause();
                break;
            case 2:
                console.log("=== Etapas da Aeronave ===");
                aer.etapas.forEach((et, i) => {
                    console.log(`${i+1}. ${et.nome} | ${et.prazo} | ${et.status}`);
                    if (et.funcionarios.length > 0) {
                        console.log("   Funcionarios:");
                        et.funcionarios.forEach(f => console.log(`     - ${f.id} - ${f.nome}`));
                    }
                });
                pause();
                break;
            case 3:
                sair = true;
                break;
            default:
                console.log("Opcao invalida.");
                pause();
                break;
        }
    }
}

function submenuTestes(aer: Aeronave): void {
    let sair = false;
    while (!sair) {
        limparTela();
        console.log("=== SUBMENU TESTES ===");
        console.log("1 - Adicionar teste");
        console.log("2 - Listar testes");
        console.log("3 - Voltar");

        const op = readlineSync.questionInt("Escolha uma opcao: ");
        switch(op) {
            case 1:
                const t = new Teste(
                    Object.values(TipoTeste)[readlineSync.keyInSelect(Object.values(TipoTeste), "Tipo de teste:")],
                    Object.values(ResultadoTeste)[readlineSync.keyInSelect(Object.values(ResultadoTeste), "Resultado:")]
                );
                t.salvar(aer.codigo);
                aer.adicionarTeste(t);
                console.log("Teste registrado.");
                pause();
                break;
            case 2:
                console.log("=== Testes da Aeronave ===");
                aer.testes.forEach((tt, i) => console.log(`${i+1}. ${tt.tipo} => ${tt.resultado}`));
                pause();
                break;
            case 3:
                sair = true;
                break;
            default:
                console.log("Opcao invalida.");
                pause();
                break;
        }
    }
}

function main(): void {
    limparTela();
    console.log("=== Aerocode - Sistema CLI ===");

    const usuario = autenticar();
    if (!usuario) return;

    let sair = false;
    while (!sair) {
        limparTela();
        console.log("=== MENU PRINCIPAL ===");
        console.log("1 - Cadastrar funcionario");
        console.log("2 - Cadastrar aeronave");
        console.log("3 - Gerenciar pecas");
        console.log("4 - Gerenciar etapas");
        console.log("5 - Gerenciar testes");
        console.log("6 - Listar aeronaves e detalhes");
        console.log("7 - Gerar relatorio final");
        console.log("8 - Sair");

        const op = readlineSync.questionInt("Escolha uma opcao: ");

        const funcs = new Funcionario("", "", "", "", "", "", NivelPerm.OPERADOR);
        funcs.carregar();
        const aer = new Aeronave("", "", TipoAeronave.COMERCIAL, 0, 0);
        aer.carregar(funcs.funcionarios);

        switch(op) {
            case 1:
                if (usuario.nivelPermissao === NivelPerm.ADMINISTRADOR) {
                    const f = new Funcionario(
                        readlineSync.question("ID: "),
                        readlineSync.question("Nome: "),
                        readlineSync.question("Telefone: "),
                        readlineSync.question("Endereco: "),
                        readlineSync.question("Usuario: "),
                        readlineSync.question("Senha: ", { hideEchoBack: true }),
                        Object.values(NivelPerm)[readlineSync.keyInSelect(Object.values(NivelPerm), "Nivel de permissao:")]
                    );
                    f.salvar();
                    console.log("Funcionario salvo.");
                    pause();
                } else {
                    console.log("Acesso negado. Apenas Administrador pode cadastrar funcionarios.");
                    pause();
                }
                break;
            case 2:
                if (usuario.nivelPermissao === NivelPerm.ADMINISTRADOR || usuario.nivelPermissao === NivelPerm.ENGENHEIRO) {
                    const a = new Aeronave(
                        readlineSync.question("Codigo (unico): "),
                        readlineSync.question("Modelo: "),
                        Object.values(TipoAeronave)[readlineSync.keyInSelect(Object.values(TipoAeronave), "Tipo:")],
                        readlineSync.questionInt("Capacidade: "),
                        readlineSync.questionInt("Alcance (km): ")
                    );
                    a.salvar();
                    aer.aeronaves.push(a);
                    console.log("Aeronave salva.");
                    pause();
                } else {
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
                aer.aeronaves.forEach((a, i) => console.log(`${i + 1}. ${a.codigo} - ${a.modelo}`));
                const idxP = readlineSync.questionInt("Escolha aeronave: ") - 1;
                if (idxP >= 0 && idxP < aer.aeronaves.length) submenuPecas(aer.aeronaves[idxP]);
                break;
            case 4:
                if (aer.aeronaves.length === 0) {
                    console.log("Nenhuma aeronave cadastrada.");
                    pause();
                    break;
                }
                aer.aeronaves.forEach((a, i) => console.log(`${i + 1}. ${a.codigo} - ${a.modelo}`));
                const idxE = readlineSync.questionInt("Escolha aeronave: ") - 1;
                if (idxE >= 0 && idxE < aer.aeronaves.length) submenuEtapas(aer.aeronaves[idxE], funcs.funcionarios);
                break;
            case 5:
                if (aer.aeronaves.length === 0) {
                    console.log("Nenhuma aeronave cadastrada.");
                    pause();
                    break;
                }
                aer.aeronaves.forEach((a, i) => console.log(`${i + 1}. ${a.codigo} - ${a.modelo}`));
                const idxT = readlineSync.questionInt("Escolha aeronave: ") - 1;
                if (idxT >= 0 && idxT < aer.aeronaves.length) submenuTestes(aer.aeronaves[idxT]);
                break;
            case 6:
                console.log("=== Aeronaves Cadastradas ===");
                aer.aeronaves.forEach((a, i) => console.log(`${i + 1}. ${a.codigo} - ${a.modelo}`));
                const idx = readlineSync.questionInt("Ver detalhes (numero, 0 sai): ");
                if (idx > 0 && idx <= aer.aeronaves.length) aer.aeronaves[idx - 1].detalhes();
                pause();
                break;
            case 7:
                if (aer.aeronaves.length === 0) {
                    console.log("Nenhuma aeronave cadastrada.");
                    pause();
                    break;
                }
                aer.aeronaves.forEach((a, i) => console.log(`${i + 1}. ${a.codigo} - ${a.modelo}`));
                const idxR = readlineSync.questionInt("Escolha aeronave: ") - 1;
                if (idxR >= 0 && idxR < aer.aeronaves.length) {
                    const cliente = readlineSync.question("Nome do cliente: ");
                    const data = readlineSync.question("Data de entrega (AAAA-MM-DD): ");
                    const r = new Relatorio(aer.aeronaves[idxR], cliente, data);
                    r.salvarEmArquivo();
                }
                pause();
                break;
            case 8:
                sair = true;
                break;
            default:
                console.log("Opcao invalida.");
                pause();
                break;
        }
    }

    console.log("Encerrando sistema...");
}

main();
