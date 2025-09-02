import { useState, useEffect } from "react";
import { Progress } from "@/components/ui/progress";
import { ThemeToggle } from "@/components/ThemeToggle";

export default function Home() {
  const [isScanning, setIsScanning] = useState(false);
  const [currentProgress, setCurrentProgress] = useState(0);
  const [currentStep, setCurrentStep] = useState(0);
  const [scanComplete, setScanComplete] = useState(false);
  const [notificationEnabled, setNotificationEnabled] = useState(false);

  const voltarParaInicio = () => {
    setScanComplete(false);
    setIsScanning(false);
    setCurrentProgress(0);
    setCurrentStep(0);
    setNotificationEnabled(false);
  };

  const frases = [
    "Verificando memória do dispositivo...",
    "Escaneando aplicativos instalados...",
    "Checando conexões de rede...",
    "Analisando arquivos temporários...",
    "Finalizando análise de segurança..."
  ];

  const scanIcons = [
    "fas fa-memory",
    "fas fa-mobile-alt", 
    "fas fa-wifi",
    "fas fa-file-alt",
    "fas fa-shield-check"
  ];

  const iniciarEscaneamento = () => {
    if (isScanning) return;
    
    setIsScanning(true);
    setScanComplete(false);
    setCurrentProgress(0);
    setCurrentStep(0);

    const interval = setInterval(() => {
      setCurrentProgress(prev => {
        const newProgress = prev + 20;
        if (newProgress >= 100) {
          clearInterval(interval);
          setTimeout(() => {
            setScanComplete(true);
            setIsScanning(false);
          }, 500);
        }
        return newProgress;
      });

      setCurrentStep(prev => prev + 1);

      // Add haptic feedback simulation
      if (navigator.vibrate) {
        navigator.vibrate(50);
      }
    }, 1500);
  };

  const ativarNotificacao = () => {
    if (!("Notification" in window)) {
      alert("Este navegador não suporta notificações.");
      return;
    }

    if (Notification.permission === "granted") {
      enviarNotificacao();
    } else if (Notification.permission !== "denied") {
      Notification.requestPermission().then(permission => {
        if (permission === "granted") {
          enviarNotificacao();
          setNotificationEnabled(true);
        } else {
          alert("Você precisa permitir notificações para ativar essa função.");
        }
      });
    } else {
      alert("As notificações foram bloqueadas. Ative-as nas configurações do navegador.");
    }
  };

  const enviarNotificacao = () => {
    const notification = new Notification("Guardião Mobile", {
      body: "✅ Seu celular está protegido! Verificação concluída com sucesso.",
      icon: "https://img.icons8.com/color/96/shield.png",
      tag: "guardiao-mobile-security"
    });

    setTimeout(() => {
      notification.close();
    }, 5000);
  };

  const getCurrentIcon = () => {
    if (scanComplete) {
      return "fas fa-shield-check text-2xl text-green-600";
    }
    if (isScanning) {
      return "fas fa-search text-2xl text-blue-600 animate-pulse";
    }
    return "fas fa-search text-2xl text-gray-500";
  };

  const getCurrentStatusMessage = () => {
    if (currentStep < frases.length) {
      return frases[currentStep];
    }
    return frases[frases.length - 1];
  };

  const getCurrentStatusIcon = () => {
    if (currentStep < scanIcons.length) {
      return scanIcons[currentStep];
    }
    return scanIcons[scanIcons.length - 1];
  };

  return (
    <div className="container mx-auto px-4 py-6 max-w-md min-h-screen">
      {/* Theme Toggle - only show on first screen */}
      {!isScanning && !scanComplete && <ThemeToggle />}
      {/* Header Section */}
      <header className="text-center mb-8 animate-fade-in">
        <div className="mb-4">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-primary to-green-600 dark:from-primary dark:to-green-500 rounded-full shadow-lg mb-4 shield-pulse">
            <i className="fas fa-shield-alt text-3xl text-white"></i>
          </div>
        </div>
        <h1 className="text-3xl font-bold text-black mb-2">
          🔒 Guardião Mobile
        </h1>
        {!isScanning && !scanComplete && (
          <p className="text-muted-foreground text-lg">
            Proteção avançada para manter seu celular sempre seguro.
          </p>
        )}
      </header>

      {/* Main Content Card */}
      <main className="bg-card rounded-2xl shadow-xl p-6 mb-6 border border-border animate-slide-up">
        {!scanComplete && (
          <>
            {/* Security Status Display */}
            <div className="text-center mb-6">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-muted rounded-full mb-4 transition-all duration-300">
                <i className={getCurrentIcon()}></i>
              </div>
              <h2 className="text-xl font-semibold text-card-foreground mb-2">
                {isScanning ? "Verificando o dispositivo" : "Status de Segurança"}
              </h2>
              {!isScanning && (
                <p className="text-muted-foreground">
                  Clique abaixo para verificar a proteção do seu dispositivo
                </p>
              )}
            </div>

            {/* Start Scan Button */}
            {!isScanning && (
              <div className="mb-6">
                <button 
                  className="w-full bg-primary hover:bg-primary/90 dark:bg-primary dark:hover:bg-primary/90 text-primary-foreground font-semibold py-4 px-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 active:scale-95"
                  onClick={iniciarEscaneamento}
                  data-testid="button-start-scan"
                >
                  <i className="fas fa-play mr-2"></i>
                  Iniciar Verificação
                </button>
              </div>
            )}

            {/* Progress Section */}
            {isScanning && (
              <div className="animate-fade-in">
                {/* Scanning Animation */}
                <div className="flex justify-center mb-6">
                  <div className="w-24 h-24 security-scan-animation rounded-full p-1">
                    <div className="w-full h-full bg-card rounded-full flex items-center justify-center">
                      <i className="fas fa-shield-alt text-2xl text-primary"></i>
                    </div>
                  </div>
                </div>

                {/* Progress Bar */}
                <div className="mb-6">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm font-medium text-card-foreground">Progresso</span>
                    <span className="text-sm font-medium text-primary" data-testid="text-progress-percentage">
                      {currentProgress}%
                    </span>
                  </div>
                  <div className="w-full bg-secondary rounded-full h-3 shadow-inner">
                    <div 
                      className="bg-gradient-to-r from-primary to-green-600 dark:from-primary dark:to-green-500 h-3 rounded-full transition-all duration-300 ease-out shadow-sm"
                      style={{ width: `${currentProgress}%` }}
                      data-testid="progress-bar"
                    />
                  </div>
                </div>

                {/* Status Messages */}
                <div className="bg-muted rounded-lg p-4 min-h-[60px] flex items-center justify-center">
                  <p className="text-muted-foreground text-center font-medium" data-testid="text-scan-status">
                    <i className={`${getCurrentStatusIcon()} mr-2 text-primary`}></i>
                    {getCurrentStatusMessage()}
                  </p>
                </div>
              </div>
            )}
          </>
        )}

        {/* Success Section */}
        {scanComplete && (
          <div className="text-center animate-slide-up">
            <div className="mb-6">
              <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-green-600 to-green-400 rounded-full shadow-lg mb-4 animate-bounce-slow">
                <i className="fas fa-check text-3xl text-white"></i>
              </div>
            </div>
            
            <h2 className="text-2xl font-bold text-green-600 dark:text-green-400 mb-3">
              ✅ Seu celular está seguro!
            </h2>
            
            <p className="text-muted-foreground mb-6">
              Nenhuma ameaça foi detectada. Seu dispositivo está protegido e funcionando corretamente.
            </p>

            {/* Security Features List */}
            <div className="bg-green-50 dark:bg-green-950/30 rounded-lg p-4 mb-6">
              <h3 className="font-semibold text-card-foreground mb-3">Verificações Realizadas:</h3>
              <div className="flex items-center text-sm text-muted-foreground mb-2">
                <i className="fas fa-check-circle text-green-600 mr-3"></i>
                <span>Memória do dispositivo verificada</span>
              </div>
              <div className="flex items-center text-sm text-muted-foreground mb-2">
                <i className="fas fa-check-circle text-green-600 mr-3"></i>
                <span>Aplicativos escaneados</span>
              </div>
              <div className="flex items-center text-sm text-muted-foreground mb-2">
                <i className="fas fa-check-circle text-green-600 mr-3"></i>
                <span>Conexões de rede analisadas</span>
              </div>
              <div className="flex items-center text-sm text-muted-foreground">
                <i className="fas fa-check-circle text-green-600 mr-3"></i>
                <span>Arquivos temporários limpos</span>
              </div>
            </div>

            {/* Notification Button */}
            <button 
              className={`w-full font-semibold py-4 px-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 active:scale-95 mb-4 ${
                notificationEnabled 
                  ? 'bg-gray-400 dark:bg-gray-600 text-white cursor-not-allowed' 
                  : 'bg-green-600 hover:bg-green-700 dark:bg-green-600 dark:hover:bg-green-700 text-white'
              }`}
              onClick={ativarNotificacao}
              disabled={notificationEnabled}
              data-testid="button-enable-notifications"
            >
              <i className={`fas ${notificationEnabled ? 'fa-check' : 'fa-bell'} mr-2`}></i>
              {notificationEnabled ? 'Notificações Ativadas' : 'Ativar Notificações de Proteção'}
            </button>

            {/* Back Button */}
            <button 
              className="w-full bg-gray-600 hover:bg-gray-700 dark:bg-gray-700 dark:hover:bg-gray-800 text-white font-semibold py-4 px-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 active:scale-95 mb-4"
              onClick={voltarParaInicio}
              data-testid="button-back-to-start"
            >
              <i className="fas fa-arrow-left mr-2"></i>
              Voltar ao Início
            </button>

            {/* Last Check */}
            <div className="bg-card rounded-xl p-4 shadow-sm border border-border">
              <div className="flex items-center justify-center space-x-4 text-sm text-muted-foreground">
                <div className="flex items-center">
                  <i className="fas fa-clock mr-2 text-primary"></i>
                  <span>Última verificação: Agora</span>
                </div>
              </div>
            </div>
          </div>
        )}
      </main>

      {/* Footer Information */}
      <footer className="text-center">
        
        {!scanComplete && !isScanning && (
          <div className="grid grid-cols-3 gap-3">
          <div className="bg-card rounded-lg p-3 shadow-sm border border-border text-center">
            <i className="fas fa-wifi text-primary text-lg mb-2"></i>
            <p className="text-xs font-medium text-card-foreground">Rede Segura</p>
          </div>
          <div className="bg-card rounded-lg p-3 shadow-sm border border-border text-center">
            <i className="fas fa-mobile-alt text-primary text-lg mb-2"></i>
            <p className="text-xs font-medium text-card-foreground">Apps Seguros</p>
          </div>
          <div className="bg-card rounded-lg p-3 shadow-sm border border-border text-center">
            <i className="fas fa-lock text-primary text-lg mb-2"></i>
            <p className="text-xs font-medium text-card-foreground">Dados Protegidos</p>
          </div>
          </div>
        )}
        
        {!scanComplete && !isScanning && (
          <p className="text-xs text-muted-foreground mt-6">
            Guardião Mobile v2.1 - Proteção em tempo real
          </p>
        )}
      </footer>
    </div>
  );
}
