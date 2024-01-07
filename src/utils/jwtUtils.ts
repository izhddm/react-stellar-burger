type DecodedToken = {
  header: Record<string, unknown>;
  payload: Record<string, unknown>;
  signature: string;
};

function removeBearerPrefix(token: string): string {
  // Удаление префикса "Bearer ", если он присутствует
  return token.startsWith('Bearer ') ? token.slice(7) : token;
}

function decodeToken(token: string): DecodedToken {
  try {
    const cleanedToken = removeBearerPrefix(token);

    const [header, payload, signature] = cleanedToken.split('.');

    // Декодирование заголовка и полезной нагрузки Base64
    const decodedHeader = JSON.parse(atob(header)) as Record<string, unknown>;
    const decodedPayload = JSON.parse(atob(payload)) as Record<string, unknown>;

    return { header: decodedHeader, payload: decodedPayload, signature };
  } catch (error: unknown) {
    console.error('Ошибка при декодировании токена:', (error as Error).message);
    throw error;
  }
}

export function isJwtTokenValid(token: string | null): boolean | undefined {
  try {
    if (!token) {
      return false;
    }

    const decodedToken = decodeToken(token);

    return decodedToken.payload && (decodedToken.payload.exp as number) * 1000 > Date.now();
  } catch (error: unknown) {
    console.error('Ошибка при проверке токена:', (error as Error).message);
  }
}
