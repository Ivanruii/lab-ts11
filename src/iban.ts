import "./style.css";

import * as ibantools from "ibantools";

const banks: { id: string; name: string }[] = [
    { id: "2080", name: "Abanca Corporación Bancaria" },
    { id: "0061", name: "Banca March" },
    { id: "0188", name: "Banco Alcalá" },
    { id: "0182", name: "Banco Bilbao Vizcaya Argentaria" },
    { id: "0130", name: "Banco Caixa Geral" },
    { id: "0234", name: "Banco Caminos" },
    { id: "2105", name: "Banco Castilla-La Mancha" },
    { id: "0240", name: "Banco de Crédito Social Cooperativo" },
    { id: "0081", name: "Banco de Sabadell" },
    { id: "0487", name: "Banco Mare Nostrum" },
    { id: "0186", name: "Banco Mediolanum" },
    { id: "0238", name: "Banco Pastor" },
    { id: "0075", name: "Banco Popular Español" },
    { id: "0049", name: "Banco Santander" },
    { id: "3873", name: "Banco Santander Totta" },
    { id: "2038", name: "Bankia" },
    { id: "0128", name: "Bankinter" },
    { id: "0138", name: "Bankoa" },
    { id: "0152", name: "Barclays Bank PLC" },
    { id: "3842", name: "BNP Paribas Paris" },
    { id: "3025", name: "Caixa de Credit del Enginyers" },
    { id: "2100", name: "Caixabank" },
    { id: "2045", name: "Caja de Ahorros y Monte de Piedad de Ontinyent" },
    { id: "3035", name: "Caja Laboral Popular CC" },
    { id: "3081", name: "Caja Rural Castilla-La Mancha" },
    { id: "3058", name: "Cajamar Caja Rural" },
    { id: "2000", name: "Cecabank" },
    { id: "1474", name: "Citibank Europe PLC" },
    { id: "3821", name: "Commerzbank AG" },
    { id: "3877", name: "Danske Bank A/S" },
    { id: "0019", name: "Deutsche Bank SAE" },
    { id: "0239", name: "EVO Banco" },
    { id: "2085", name: "Ibercaja Banco" },
    { id: "1465", name: "ING Bank NV" },
    { id: "2095", name: "Kutxabank" },
    { id: "2048", name: "Liberbank" },
    { id: "0131", name: "Novo Banco" },
    { id: "0073", name: "Open Bank" },
    { id: "0108", name: "Société Générale" },
    { id: "2103", name: "Unicaja Banco" },
];

function getBankNameFromIBAN(iban: string): string | undefined {
    const bankIdRegex = /ES\d{2}(\d{4})/;

    const match = iban.match(bankIdRegex);

    if (match) {
        const bankId = match[1];
        const bank = banks.find((a) => a.id === bankId);
        return bank ? bank.name : undefined;
    }

    return undefined;
}

const iban = ibantools.electronicFormatIBAN("ES66 2100 0418 4012 3456 7891") as string;
console.log(ibantools.isValidIBAN(iban));

if (ibantools.isValidIBAN(iban)) {
    const bankName = getBankNameFromIBAN(iban);

    if (bankName) {
        console.log(`Bank Name: ${bankName}`);
    } else {
        console.log("Bank not found for the given IBAN.");
    }
} else {
    console.log("Invalid IBAN.");
}