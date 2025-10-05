import ControllArquivos from "../ControllArquivos";
import { TipoTeste } from "../enums/TipoTeste";
import { ResultadoTeste } from "../enums/ResultadoTeste";

export default class Teste {
  tipo: TipoTeste;
  resultado: ResultadoTeste;
  aeronaveCodigo?: string;

  public testes: Teste[] = [];

  constructor(tipo: TipoTeste, resultado: ResultadoTeste = ResultadoTeste.REPROVADO, aeronaveCodigo?: string) {
    this.tipo = tipo;
    this.resultado = resultado;
    this.aeronaveCodigo = aeronaveCodigo;
  }

  salvar(aeronaveCodigo: string): void {
    const obj = {
      aeronaveCodigo,
      tipo: this.tipo,
      resultado: this.resultado
    };
    ControllArquivos.salvarDados(obj, "testes.txt");
  }

  carregar(): void {
    const data: Array<any> = ControllArquivos.lerDados("testes.txt");
    this.testes = [];

    data.forEach((o) => {
      if (!o || !o["tipo"]) return;
      const aeronaveCodigo = (o["aeronaveCodigo"] || "").toString().trim();
      const tipo = (o["tipo"] || "").toString().trim() as TipoTeste;
      const resultado = (o["resultado"] || "").toString().trim() as ResultadoTeste;

      const t = new Teste(tipo, resultado, aeronaveCodigo);
      this.testes.push(t);
    });
  }
}
