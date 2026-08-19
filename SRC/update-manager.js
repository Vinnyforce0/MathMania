// =======================
// GERENCIADOR DE ATUALIZAÇÕES
// =======================

class UpdateManager {
  constructor(githubRepoUrl, mainBranchName = 'main') {
    this.githubRepoUrl = githubRepoUrl;
    this.mainBranchName = mainBranchName;
    this.rawContentUrl = this.githubRepoUrl
      .replace('https://github.com/', 'https://raw.githubusercontent.com/')
      .replace(/\/$/, '');
    this.manifestUrl = `${this.rawContentUrl}/${mainBranchName}/manifest.json`;
  }

  /**
   * Obtém a versão remota do manifest.json no GitHub
   */
  async getRemoteVersion() {
    try {
      const response = await fetch(this.manifestUrl, { cache: 'no-store' });
      if (!response.ok) {
        throw new Error(`Erro ao buscar manifest: ${response.status}`);
      }
      const manifest = await response.json();
      return manifest.version;
    } catch (error) {
      console.error('Erro ao obter versão remota:', error);
      throw error;
    }
  }

  /**
   * Compara duas versões
   * Retorna: 1 se remota > local, -1 se local > remota, 0 se iguais
   */
  compareVersions(remoteVersion, localVersion) {
    const remote = remoteVersion.split('.').map(Number);
    const local = localVersion.split('.').map(Number);

    for (let i = 0; i < Math.max(remote.length, local.length); i++) {
      const r = remote[i] || 0;
      const l = local[i] || 0;
      if (r > l) return 1;
      if (r < l) return -1;
    }
    return 0;
  }

  /**
   * Verifica se há atualização disponível
   */
  async checkForUpdates(currentVersion) {
    try {
      const remoteVersion = await this.getRemoteVersion();
      const comparison = this.compareVersions(remoteVersion, currentVersion);
      
      return {
        hasUpdate: comparison > 0,
        remoteVersion,
        currentVersion,
        comparison
      };
    } catch (error) {
      return {
        hasUpdate: false,
        error: error.message
      };
    }
  }

  /**
   * Atualiza o service worker e limpa caches antigos
   */
  async updateServiceWorker() {
    try {
      // Registra o novo service worker
      if ('serviceWorker' in navigator) {
        const registration = await navigator.serviceWorker.getRegistration();
        if (registration) {
          await registration.unregister();
          console.log('Service worker antigo desregistrado');
        }
      }

      // Limpa todos os caches
      const cacheNames = await caches.keys();
      await Promise.all(cacheNames.map(name => caches.delete(name)));
      console.log('Caches antigos limpos');

      // Recarrega a página para registrar o novo service worker
      window.location.reload();
    } catch (error) {
      console.error('Erro ao atualizar service worker:', error);
      throw error;
    }
  }

  /**
   * Atualiza a versão em localStorage
   */
  updateVersionInStorage(newVersion) {
    localStorage.setItem('appVersion', newVersion);
  }

  /**
   * Realiza a atualização completa
   */
  async performUpdate(newVersion) {
    try {
      await this.updateServiceWorker();
      return true;
    } catch (error) {
      console.error('Erro ao realizar atualização:', error);
      throw error;
    }
  }
}

// Exporta para uso global
window.UpdateManager = UpdateManager;
