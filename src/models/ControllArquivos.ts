import * as fs from 'fs';

export default class ControllArquivos {
    public static registersPath = "./src/data/" 

    public static lerDados(nomeArquivo: string): Array<object> {
        try {
            const textFile = fs.readFileSync(this.registersPath + nomeArquivo, { encoding: 'utf-8' })

            const blocos = textFile.split("////////")
            let Objts: Array<object> = []

            blocos.forEach((bloco) => {
                if (bloco.trim().length === 0) return; 

                const textInfoArray = bloco.split("\n")
                let varObject: Record<string, string> = {}

                textInfoArray.forEach((value) => {
                    const keyValueArray: Array<string> = value.trim().replace("\r", "").split(":")
                    if (keyValueArray.length === 2) {
                        const key = keyValueArray[0]?.trim()
                        const val = keyValueArray[1]?.trim()
                        if (key && val) {
                            varObject[key] = val
                        }
                    }
                })

                if (Object.keys(varObject).length > 0) {
                    Objts.push(varObject)
                }
            })
            
            return Objts
        } catch(err) {
            return [{mensagem: "Não foi possivel ler o arquivo"}]
        }
    }

    public static salvarDados(obj: object, nomeArquivo: string): void {
        try {
            let separador = "////////\n"

            Object.entries(obj).forEach(([chave, valor]) => {
                separador += `${chave} : ${valor}\n`
            })
            fs.appendFileSync(this.registersPath + nomeArquivo, separador)
        }
        catch(err){
            console.log("Erro ao editar arquivo")
        }
    }

    public static limparArquivo(nomeArquivo: string): void {
        fs.writeFileSync(this.registersPath + nomeArquivo, "");
    }
}
