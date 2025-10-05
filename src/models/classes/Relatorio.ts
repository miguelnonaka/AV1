import fs from "fs";
import path from "path";
import Aeronave from "./Aeronave";

export default class Relatorio {
  aeronave: Aeronave;
  cliente: string;
  dataEntrega: string;

  constructor(aeronave: Aeronave, cliente: string, dataEntrega: string) {
    this.aeronave = aeronave;
    this.cliente = cliente;
    this.dataEntrega = dataEntrega;
  }

  gerarRelatorio(): string {
    const a = this.aeronave;
    let out = "";
    out += "===== RELATÓRIO DE ENTREGA =====\n";
    out += `Aeronave: ${a.codigo} - ${a.modelo}\n`;
    out += `Tipo: ${a.tipo}\n`;
    out += `Capacidade: ${a.capacidade}\n`;
    out += `Alcance: ${a.alcance}\n\n`;

    out += `Cliente: ${this.cliente}\n`;
    out += `Data de Entrega: ${this.dataEntrega}\n\n`;

    out += "== Etapas ==\n";
    a.etapas.forEach((e, idx) => {
      out += `${idx + 1}. ${e.nome} | Prazo: ${e.prazo} | Status: ${e.status}\n`;
      if (e.funcionarios.length > 0) {
        out += `   Funcionarios:\n`;
        e.funcionarios.forEach((f) => {
          out += `     - ${f.id} - ${f.nome}\n`;
        });
      }
    });

    out += "\n== Pecas ==\n";
    a.pecas.forEach((p) => {
      out += `- ${p.nome} | Tipo: ${p.tipo} | Fornecedor: ${p.fornecedor} | Status: ${p.status}\n`;
    });

    out += "\n== Testes ==\n";
    a.testes.forEach((t) => {
      out += `- ${t.tipo} => ${t.resultado}\n`;
    });

    out += "\n===============================\n";
    return out;
  }

  salvarEmArquivo(dir = "./src/data/reports") {
    const content = this.gerarRelatorio();
    if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
    const filename = `relatorio_${this.aeronave.codigo}_${this.dataEntrega.replace(/[:\/ ]/g, "_")}.txt`;
    const full = path.join(dir, filename);
    fs.writeFileSync(full, content, { encoding: "utf-8" });
    console.log(`Relatório salvo em: ${full}`);
  }
}
