import React, { useState, useEffect, useCallback } from 'react';
import { ThemeProvider } from './contexts/ThemeContext';
import { Terminal } from './components/Terminal';
import { CommandProcessor } from './components/CommandProcessor';
import { StatusBar } from './components/StatusBar';
import { MobileKeyboard } from './components/MobileKeyboard';
import { LoadingScreen } from './components/LoadingScreen';
import { Banner } from './components/sections/Banner';

function App() {
  const [output, setOutput] = useState<React.ReactNode[]>([]);
  const [commandHistory, setCommandHistory] = useState<string[]>([]);
  const [isProcessing, setIsProcessing] = useState(false);
  const [showMobileKeyboard, setShowMobileKeyboard] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const handleCommand = useCallback(async (command: string, args: string[] = []) => {
    const fullCmd = `${command} ${args.join(' ')}`.trim();
    if (!fullCmd) return;

    setIsProcessing(true);
    setCommandHistory(prev => [...prev, fullCmd]);

    // Fast simulated execution delay
    await new Promise(resolve => setTimeout(resolve, 150));

    if (command === 'clear' || command === 'cls') {
      setOutput([]);
    } else if (command === 'logout' || command === 'exit') {
      setOutput(prev => [
        ...prev,
        <div key={Date.now()} className="text-terminal-warning font-mono text-xs sm:text-sm my-2">
          Closing session visitor@iitb.ac.in. Reconnecting...
        </div>
      ]);
      setTimeout(() => {
        setOutput([<Banner key="banner-restart" onRunCommand={handleCommand} />]);
      }, 1200);
    } else {
      setOutput(prev => [
        ...prev,
        <div key={`cmd-${Date.now()}`} className="my-1">
          <div className="flex items-center space-x-2 text-terminal-accent text-xs font-mono opacity-80 mb-1">
            <span>sagar@iitb-cse:~$</span>
            <span className="text-terminal-text">{fullCmd}</span>
          </div>
          <CommandProcessor
            command={command}
            args={args}
            commandHistory={commandHistory}
            onRunCommand={handleCommand}
          />
        </div>
      ]);
    }

    setIsProcessing(false);

    // Smooth scroll to latest output
    setTimeout(() => {
      const outputElement = document.querySelector('.terminal-output');
      if (outputElement) {
        outputElement.scrollTo({
          top: outputElement.scrollHeight,
          behavior: 'smooth'
        });
      }
    }, 50);
  }, [commandHistory]);

  // Initial welcome banner
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
      setOutput([
        <Banner key="banner-init" onRunCommand={handleCommand} />
      ]);
    }, 1200);

    return () => clearTimeout(timer);
  }, [handleCommand]);

  const handleClear = useCallback(() => {
    setOutput([]);
  }, []);

  const handleReset = useCallback(() => {
    setOutput([<Banner key="banner-reset" onRunCommand={handleCommand} />]);
    setCommandHistory([]);
  }, [handleCommand]);

  const handleMobileKeyPress = (key: string) => {
    const inputElement = document.querySelector('input[type="text"]') as HTMLInputElement;
    if (!inputElement) return;

    if (key === 'Enter') {
      const form = inputElement.closest('form');
      if (form) {
        form.dispatchEvent(new Event('submit', { cancelable: true, bubbles: true }));
      }
    } else if (key === 'Backspace') {
      const currentValue = inputElement.value;
      inputElement.value = currentValue.slice(0, -1);
      inputElement.dispatchEvent(new Event('input', { bubbles: true }));
    } else if (key === 'Tab') {
      const event = new KeyboardEvent('keydown', { key: 'Tab', bubbles: true });
      inputElement.dispatchEvent(event);
    } else if (key === 'ArrowUp' || key === 'ArrowDown') {
      const event = new KeyboardEvent('keydown', { key, bubbles: true });
      inputElement.dispatchEvent(event);
    } else if (typeof key === 'string' && key.length > 1) {
      inputElement.value = key;
      inputElement.dispatchEvent(new Event('input', { bubbles: true }));
      const form = inputElement.closest('form');
      if (form) {
        form.dispatchEvent(new Event('submit', { cancelable: true, bubbles: true }));
      }
    }
    inputElement.focus();
  };

  if (isLoading) {
    return (
      <ThemeProvider>
        <LoadingScreen />
      </ThemeProvider>
    );
  }

  return (
    <ThemeProvider>
      <div className="min-h-screen bg-terminal text-terminal-text flex flex-col font-mono">
        {/* Main Terminal Window */}
        <main className="flex-1 flex flex-col h-[calc(100vh-32px)]">
          <Terminal
            onCommand={handleCommand}
            output={output}
            isProcessing={isProcessing}
            onClear={handleClear}
            onReset={handleReset}
          />
        </main>

        {/* Bottom Status Bar */}
        <footer className="h-8 flex-shrink-0">
          <StatusBar />
        </footer>

        {/* Mobile Keyboard Bar */}
        <MobileKeyboard
          isVisible={showMobileKeyboard}
          onToggle={() => setShowMobileKeyboard(!showMobileKeyboard)}
          onKeyPress={handleMobileKeyPress}
        />
      </div>
    </ThemeProvider>
  );
}

export default App;