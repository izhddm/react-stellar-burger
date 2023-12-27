function removeBearerPrefix(token) {
  // Удаление префикса "Bearer ", если он присутствует
  return token.startsWith('Bearer ') ? token.slice(7) : token;
}

function decodeToken(token) {
  try {
    const cleanedToken = removeBearerPrefix(token);

    const [header, payload, signature] = cleanedToken.split('.');

    // Декодирование заголовка и полезной нагрузки Base64
    const decodedHeader = JSON.parse(atob(header));
    const decodedPayload = JSON.parse(atob(payload));

    return { header: decodedHeader, payload: decodedPayload, signature };
  } catch (error) {
    console.error('Ошибка при декодировании токена:', error.message);
    throw error;
  }
}

export function isJwtTokenValid(token) {
  try {
    if (!token){
      return false;
    }

    const decodedToken = decodeToken(token);

    return decodedToken.payload && decodedToken.payload.exp * 1000 > Date.now();
  } catch (error) {
    console.error('Ошибка при проверке токена:', error.message);
  }
}
