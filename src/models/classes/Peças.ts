import ControllArquivos from "../ControllArquivos";
import { TipoPeca } from "../enums/TipoPeça";
import { StatusPeca } from "../enums/StatusPeca";

export default class Peca {
  nome: string;
  tipo: TipoPeca;
  fornecedor: string;
  status: StatusPeca;
  aeronaveCodigo?: string;

  public pecas: Peca[] = [];

  constructor(
    nome: string,
    tipo: TipoPeca,
    fornecedor: string,
    status: StatusPeca = StatusPeca.EM_PRODUCAO,
    aeronaveCodigo?: string
  ) {
    this.nome = nome;
    this.tipo = tipo;
    this.fornecedor = fornecedor;
    this.status = status;
    this.aeronaveCodigo = aeronaveCodigo;
  }

  atualizarStatus(novoStatus: StatusPeca): void {
    this.status = novoStatus;
  }

  salvar(aeronaveCodigo: string): void {
    const obj = {
      aeronaveCodigo,
      nome: this.nome,
      tipo: this.tipo,
      fornecedor: this.fornecedor,
      status: this.status
    };
    ControllArquivos.salvarDados(obj, "pecas.txt");
  }

  carregar(): void {
    const data: Array<any> = ControllArquivos.lerDados("pecas.txt");
    this.pecas = [];

    data.forEach((o) => {
      if (!o || !o["nome"]) return;
      const aeronaveCodigo = (o["aeronaveCodigo"] || "").toString().trim();
      const nome = (o["nome"] || "").toString().trim();
      const tipo = (o["tipo"] || "").toString().trim() as TipoPeca;
      const fornecedor = (o["fornecedor"] || "").toString().trim();
      const status = (o["status"] || "").toString().trim() as StatusPeca;

      const p = new Peca(nome, tipo, fornecedor, status, aeronaveCodigo);
      this.pecas.push(p);
    });
  }
}
