import React, { useState, useEffect } from 'react';
import { ThemeProvider } from './contexts/ThemeContext';
import { Terminal } from './components/Terminal';
import { StatusBar } from './components/StatusBar';
import { MobileKeyboard } from './components/MobileKeyboard';
import { LoadingScreen } from './components/LoadingScreen';

function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [showMobileKeyboard, setShowMobileKeyboard] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2700);
    return () => clearTimeout(timer);
  }, []);

  const handleMobileKeyPress = (key: string) => {
    const inputElement = document.querySelector('.terminal-active-line input') as HTMLInputElement;
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

  return (
    <ThemeProvider>
      {isLoading ? (
        <LoadingScreen />
      ) : (
        <div className="min-h-screen bg-terminal text-terminal-text flex flex-col font-mono selection:bg-terminal-accent selection:text-terminal-bg animate-fade-in">
          {/* Main Terminal Window */}
          <main className="flex-1 flex flex-col h-[calc(100vh-32px)]">
            <Terminal />
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
      )}
    </ThemeProvider>
  );
}

export default App;