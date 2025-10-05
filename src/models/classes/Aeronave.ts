import ControllArquivos from "../ControllArquivos";
import { TipoAeronave } from "../enums/TipoAeronave";
import Peca from "./Peças";
import Etapa from "./Etapa";
import Teste from "./Teste";
import Funcionario from "./Funcionario";

export default class Aeronave {
  codigo: string;
  modelo: string;
  tipo: TipoAeronave;
  capacidade: number;
  alcance: number;

  pecas: Peca[] = [];
  etapas: Etapa[] = [];
  testes: Teste[] = [];

  public aeronaves: Aeronave[] = [];

  constructor(codigo: string, modelo: string, tipo: TipoAeronave, capacidade: number, alcance: number) {
    this.codigo = codigo;
    this.modelo = modelo;
    this.tipo = tipo;
    this.capacidade = capacidade;
    this.alcance = alcance;
  }

  adicionarPeca(p: Peca): void {
    this.pecas.push(p);
  }

  adicionarEtapa(e: Etapa): void {
    this.etapas.push(e);
  }

  adicionarTeste(t: Teste): void {
    this.testes.push(t);
  }

  detalhes(): void {
    console.log("------ Detalhes da Aeronave ------");
    console.log("Código:", this.codigo);
    console.log("Modelo:", this.modelo);
    console.log("Tipo:", this.tipo);
    console.log("Capacidade:", this.capacidade);
    console.log("Alcance:", this.alcance);

    console.log("\nPeças:");
    this.pecas.forEach((p) => console.log(`${p.nome} - ${p.tipo} - ${p.fornecedor} - ${p.status}`));

    console.log("\nEtapas:");
    this.etapas.forEach((e) => {
      console.log(`${e.nome} - ${e.prazo} - ${e.status}`);
      if (e.funcionarios.length > 0) {
        e.funcionarios.forEach((f) => console.log(`   - ${f.id} - ${f.nome}`));
      }
    });

    console.log("\nTestes:");
    this.testes.forEach((t) => console.log(`${t.tipo} - ${t.resultado}`));
  }

  salvar(): void {
    const todos = ControllArquivos.lerDados("aeronaves.txt") as Array<any>;
    if (todos.some(f => (f.codigo || '').trim().toLowerCase() === this.codigo.trim().toLowerCase())) {
        console.log(`Aeronave com ID ${this.codigo} já existe!`);
    } else{
    const obj = {
      codigo: this.codigo,
      modelo: this.modelo,
      tipo: this.tipo,
      capacidade: String(this.capacidade),
      alcance: String(this.alcance)
    };
    ControllArquivos.salvarDados(obj, "aeronaves.txt");

    this.pecas.forEach((p) => p.salvar(this.codigo));
    this.etapas.forEach((e) => e.salvar(this.codigo));
    this.testes.forEach((t) => t.salvar(this.codigo));
  }}

  carregar(todosFuncionarios: Funcionario[] = []): void {
    const data: Array<any> = ControllArquivos.lerDados("aeronaves.txt");
    this.aeronaves = [];

    const loaderPeca = new Peca("", "Nacional" as any, "");
    loaderPeca.carregar();

    const loaderTeste = new Teste("Elétrico" as any, "Reprovado" as any);
    loaderTeste.carregar();

    const loaderEtapa = new Etapa("", "");
    loaderEtapa.carregar();

    data.forEach((o) => {
      if (!o || !o["codigo"]) return;
      const codigo = (o["codigo"] || "").toString().trim();
      const modelo = (o["modelo"] || "").toString().trim();
      const tipo = (o["tipo"] || "").toString().trim() as TipoAeronave;
      const capacidade = Number((o["capacidade"] || "0").toString().trim());
      const alcance = Number((o["alcance"] || "0").toString().trim());

      const a = new Aeronave(codigo, modelo, tipo, capacidade, alcance);

      a.pecas = loaderPeca.pecas.filter((p) => (p.aeronaveCodigo || "").toString().trim() === codigo);
      a.testes = loaderTeste.testes.filter((t) => (t.aeronaveCodigo || "").toString().trim() === codigo);

      a.etapas = loaderEtapa.etapas.filter((e) => (e.aeronaveCodigo || "").toString().trim() === codigo);

      if (todosFuncionarios && todosFuncionarios.length > 0) {
        a.etapas.forEach((et) => et.associarFuncionariosPorIds(todosFuncionarios));
      }

      this.aeronaves.push(a);
    });
  }
}
