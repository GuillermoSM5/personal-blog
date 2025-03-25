export const errorManagment = (
  Error: any,
): { message: string; code: number } => {
  let message = 'Ocurrio un error vuelve a intenar';
  let code = 500;
  const keys = Object.keys(Error.keyValue);
  keys.map((erro) => {
    if (erro === 'email') {
      message =
        '¡Gracias por registrarte! Pero parece que ya eres parte de nuestra comunidad. Inicia sesión ahora mismo.';
      code = 400;
    }
  });
  return { message: message, code: code };
};
