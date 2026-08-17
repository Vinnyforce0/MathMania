// =======================
// CONFIGURAÇÃO GLOBAL
// =======================

const APP_VERSION = "2.0.3"; // Atualize esta versão a cada mudança significativa

// URL do repositório GitHub (configure com o seu repositório)
const GITHUB_REPO_URL = "https://github.com/vinnyforce0/MathMania";
const GITHUB_BRANCH = "main"; // ou 'master' dependendo do seu repositório

// Inicializa a versão em localStorage
if (!localStorage.getItem('appVersion')) {
  localStorage.setItem('appVersion', APP_VERSION);
}
