"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var fs = __importStar(require("fs"));
var ControllArquivos = /** @class */ (function () {
    function ControllArquivos() {
    }
    ControllArquivos.lerDados = function (nomeArquivo) {
        try {
            var textFile = fs.readFileSync(this.registersPath + nomeArquivo, { encoding: 'utf-8' });
            var blocos = textFile.split("////////");
            var Objts_1 = [];
            blocos.forEach(function (bloco) {
                if (bloco.trim().length === 0)
                    return;
                var textInfoArray = bloco.split("\n");
                var varObject = {};
                textInfoArray.forEach(function (value) {
                    var _a, _b;
                    var keyValueArray = value.trim().replace("\r", "").split(":");
                    if (keyValueArray.length === 2) {
                        var key = (_a = keyValueArray[0]) === null || _a === void 0 ? void 0 : _a.trim();
                        var val = (_b = keyValueArray[1]) === null || _b === void 0 ? void 0 : _b.trim();
                        if (key && val) {
                            varObject[key] = val;
                        }
                    }
                });
                if (Object.keys(varObject).length > 0) {
                    Objts_1.push(varObject);
                }
            });
            return Objts_1;
        }
        catch (err) {
            return [{ mensagem: "Não foi possivel ler o arquivo" }];
        }
    };
    ControllArquivos.salvarDados = function (obj, nomeArquivo) {
        try {
            var separador_1 = "////////\n";
            Object.entries(obj).forEach(function (_a) {
                var chave = _a[0], valor = _a[1];
                separador_1 += "".concat(chave, " : ").concat(valor, "\n");
            });
            fs.appendFileSync(this.registersPath + nomeArquivo, separador_1);
        }
        catch (err) {
            console.log("Erro ao editar arquivo");
        }
    };
    ControllArquivos.limparArquivo = function (nomeArquivo) {
        fs.writeFileSync(this.registersPath + nomeArquivo, "");
    };
    ControllArquivos.registersPath = "./src/data/";
    return ControllArquivos;
}());
exports.default = ControllArquivos;
