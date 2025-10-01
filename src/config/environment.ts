// 環境変数の型定義と取得
interface EnvironmentConfig {
  STRAPI_URL: string;
  STRAPI_API_TOKEN: string;
  IS_PRODUCTION: boolean;
}

// Vite環境変数の取得（VITE_プレフィックスが必要）
const getEnvVariable = (key: string, defaultValue?: string): string => {
  // Viteでは import.meta.env を使用
  const value = import.meta.env[key] || defaultValue;

  if (!value && !defaultValue) {
    console.warn(`Environment variable ${key} is not defined`);
  }

  return value || '';
};

// 環境設定のエクスポート
export const env: EnvironmentConfig = {
  STRAPI_URL: getEnvVariable('VITE_STRAPI_URL', 'http://localhost:1337'),
  STRAPI_API_TOKEN: getEnvVariable('VITE_STRAPI_API_TOKEN', ''),
  IS_PRODUCTION: import.meta.env.PROD || false,
};

// API URLの構築
export const getApiUrl = (path?: string): string => {
  const baseUrl = env.STRAPI_URL.startsWith('http')
    ? env.STRAPI_URL
    : `https://${env.STRAPI_URL}`;

  const apiPath = path ? `/api${path}` : '/api';
  return `${baseUrl}${apiPath}`;
};

// 画像URLの構築
export const getImageUrl = (path?: string): string => {
  if (!path) return '';

  // 既に完全なURLの場合はそのまま返す
  if (path.startsWith('http://') || path.startsWith('https://')) {
    return path;
  }

  const baseUrl = env.STRAPI_URL.startsWith('http')
    ? env.STRAPI_URL
    : `https://${env.STRAPI_URL}`;

  return `${baseUrl}${path}`;
};