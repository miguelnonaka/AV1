import ControllArquivos from "../ControllArquivos"
import { NivelPerm } from "../enums/NivelPermissao"

export default class Funcionario {
    id: string
    nome: string
    telefone: string
    endereco: string
    usuario: string
    senha: string
    nivelPermissao: NivelPerm

    public funcionarios: Array<Funcionario> = []
    
    constructor(
        id: string, 
        nome: string, 
        telefone: string, 
        endereco: string, 
        usuario: string, 
        senha: string, 
        nivelPermissao: NivelPerm
    ){
        this.id = id
        this.nome = nome
        this.telefone = telefone
        this.endereco = endereco
        this.usuario = usuario
        this.senha = senha
        this.nivelPermissao = nivelPermissao
    }

    autenticar(usuario: string, senha: string): boolean {
        return this.usuario === usuario && this.senha === senha
    }

    possuiPermissao(nivel: NivelPerm): boolean {
        return this.nivelPermissao === nivel || this.nivelPermissao === NivelPerm.ADMINISTRADOR
    }

    salvar(): void {
        const todos = ControllArquivos.lerDados("funcionario.txt") as Array<any>;
        if (todos.some(f => f.id === this.id)) {
            console.log(`Funcionário com ID ${this.id} já existe!`);
        } else{
            const objectFuncionario = {
            id : this.id,
            nome : this.nome,
            telefone : this.telefone,
            endereco : this.endereco,
            usuario : this.usuario,
            senha : this.senha,
            nivelPermissao : this.nivelPermissao
        }

        ControllArquivos.salvarDados(objectFuncionario, "funcionario.txt");
        } 
    }

    printFunc(): void {
        console.log("--------------------------------------------")
        console.log("ID: " + this.id)
        console.log("Nome: " + this.nome)
        console.log("Telefone: " + this.telefone)
        console.log("Endereço: " + this.endereco)
        console.log("Nome de Usuario: " + this.usuario)
        console.log("Nivel de Permissão: " + this.nivelPermissao)
    }

    carregar(): void {
        const data: Array<any> = ControllArquivos.lerDados("funcionario.txt")
        this.funcionarios = [] 

        data.forEach((obj) => {
            this.funcionarios.push(
                new Funcionario(
                    obj["id"],
                    obj["nome"],
                    obj["telefone"],
                    obj["endereco"],
                    obj["usuario"],
                    obj["senha"],
                    Object.values(NivelPerm).includes(obj["nivelPermissao"])
                    ? (obj["nivelPermissao"] as NivelPerm): NivelPerm.OPERADOR)
            )
        })
        /*console.log(data.length + " funcionarios foram carregados.")
        for(const funcionarios of this.funcionarios){
            funcionarios.printFunc()
        }*/
    }
}
