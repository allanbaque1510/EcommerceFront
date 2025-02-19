import { Injectable } from '@angular/core';
import * as CryptoJS from 'crypto-js';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CryptDataService {
  private _01qañswaxoaascq = atob(environment._ñ1$asp); 

  constructor() {}
  
  decryptData(encryptedData: string): any {
    try {
      // Decodificar Base64
      const rawData = CryptoJS.enc.Base64.parse(encryptedData);
      const rawDataWords = rawData.words;

      // Extraer IV (primeros 16 bytes = 4 palabras de 32 bits)
      const iv = CryptoJS.lib.WordArray.create(rawDataWords.slice(0, 4));

      // Extraer datos encriptados (después de los primeros 16 bytes)
      const cipherText = CryptoJS.lib.WordArray.create(rawDataWords.slice(4));

      // Convertir clave en SHA-256 (32 bytes)
      const key = CryptoJS.enc.Utf8.parse(atob(this._01qañswaxoaascq));
      const hashedKey = CryptoJS.SHA256(key);

      // Desencriptar
      const decrypted = CryptoJS.AES.decrypt(
        { ciphertext: cipherText } as CryptoJS.lib.CipherParams,
        hashedKey,
        { iv: iv, mode: CryptoJS.mode.CBC, padding: CryptoJS.pad.Pkcs7 }
      );

      const decryptedText = decrypted.toString(CryptoJS.enc.Utf8);
      if (!decryptedText) throw new Error('Fallo al convertir datos desencriptados');

      return JSON.parse(decryptedText); // Convertir JSON a objeto
    } catch (error) {
      console.error('Error al desencriptar:', error);
      return null;
    }
  }
}
