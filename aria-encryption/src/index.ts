import { decryptProcess, encryptProcess } from "./ARIAUtils";

const plainText = "테스트 입니다. 테스트 입니다.";
console.log("plaintext :", plainText);
console.log();

const cipherText = encryptProcess(plainText);
console.log("ciphertext :", cipherText);
console.log();

const decryptText = decryptProcess(cipherText);
console.log("decrypted text :", decryptText);
console.log();
