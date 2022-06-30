import * as eccryptoJS from 'eccrypto-js';

export const getEcc = async () => {
  const publicKey = `-----BEGIN  WUMAN ECC PUBLIC KEY -----
  MFkwEwYHKoZIzj0CAQYIKoZIzj0DAQcDQgAEs7NjHnvSBi2iE7SRmJco5BprNHuD
  hjJFAcXjS/PFyhSImGK21Isgi15PIY9nEd5Yjh/i3aRpNDjEdJP3MrkMlw==
  -----END  WUMAN ECC PUBLIC KEY -----`;

  // const publicKey = `MFkwEwYHKoZIzj0CAQYIKoZIzj0DAQcDQgAEs7NjHnvSBi2iE7SRmJco5BprNHuD
  // hjJFAcXjS/PFyhSImGK21Isgi15PIY9nEd5Yjh/i3aRpNDjEdJP3MrkMlw==`;

  const keyPair = eccryptoJS.generateKeyPair();

  const str = 'test message to encrypt';
  const msg = eccryptoJS.utf8ToBuffer(str);

  const encrypted = await eccryptoJS.encrypt(Buffer.from(publicKey), msg);
  const decrypted = await eccryptoJS.decrypt(keyPair.privateKey, encrypted);

  console.log('decrypted:', decrypted.toString());
};
