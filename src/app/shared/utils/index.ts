export function generateID(length: number) {
    let result = '';
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    const charactersLength = characters.length;
    let counter = 0;
    while (counter < length) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
      counter += 1;
    }
    return result;
}

export function generarDniAleatorio() {
  // Genera un número aleatorio entre 0 y 99999999
  let numero = Math.floor(Math.random() * 100000000);

  return numero;
}