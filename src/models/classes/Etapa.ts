import ControllArquivos from "../ControllArquivos";
import { StatusEtapa } from "../enums/StatusEtapa";
import Funcionario from "./Funcionario";

export default class Etapa {
  nome: string;
  prazo: string;
  status: StatusEtapa;
  funcionariosIds: string = "";
  funcionarios: Funcionario[] = [];
  aeronaveCodigo?: string;

  public etapas: Etapa[] = [];

  constructor(
    nome: string,
    prazo: string,
    status: StatusEtapa = StatusEtapa.PENDENTE,
    funcionariosIds: string = "",
    aeronaveCodigo?: string
  ) {
    this.nome = nome;
    this.prazo = prazo;
    this.status = status;
    this.funcionariosIds = funcionariosIds;
    this.aeronaveCodigo = aeronaveCodigo;
  }

  iniciar(): void {
    if (this.status === StatusEtapa.PENDENTE) {
      this.status = StatusEtapa.ANDAMENTO;
    }
  }

  finalizar(): void {
    if (this.status === StatusEtapa.ANDAMENTO) {
      this.status = StatusEtapa.CONCLUIDA;
    }
  }

  associarFuncionario(f: Funcionario): void {
    if (!this.funcionarios.some((x) => x.id === f.id)) {
      this.funcionarios.push(f);
      const ids = this.funcionarios.map((x) => x.id);
      this.funcionariosIds = ids.join(",");
    }
  }

  listarFuncionarios(): Funcionario[] {
    return this.funcionarios;
  }

  salvar(aeronaveCodigo: string): void {
    const obj = {
      aeronaveCodigo,
      nome: this.nome,
      prazo: this.prazo,
      status: this.status,
      funcionarios: this.funcionariosIds
    };
    ControllArquivos.salvarDados(obj, "etapas.txt");
  }

  carregar(): void {
    const data: Array<any> = ControllArquivos.lerDados("etapas.txt");
    this.etapas = [];

    data.forEach((o) => {
      if (!o || !o["nome"]) return;
      const aeronaveCodigo = (o["aeronaveCodigo"] || "").toString().trim();
      const nome = (o["nome"] || "").toString().trim();
      const prazo = (o["prazo"] || "").toString().trim();
      const status = (o["status"] || "").toString().trim() as StatusEtapa;
      const funcionarios = (o["funcionarios"] || "").toString().trim();

      const e = new Etapa(nome, prazo, status, funcionarios, aeronaveCodigo);
      this.etapas.push(e);
    });
  }

  associarFuncionariosPorIds(todosFuncionarios: Funcionario[]): void {
    if (!this.funcionariosIds || this.funcionariosIds.trim().length === 0) return;
    const ids = this.funcionariosIds.split(",").map((s) => s.trim()).filter((s) => s.length > 0);
    ids.forEach((id) => {
      const f = todosFuncionarios.find((tf) => tf.id === id);
      if (f && !this.funcionarios.some((x) => x.id === f.id)) {
        this.funcionarios.push(f);
      }
    });
  }
}
