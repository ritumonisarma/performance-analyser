document.getElementById('analyzeBtn').addEventListener('click', () => {
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      chrome.scripting.executeScript({
        target: { tabId: tabs[0].id },
        function: () => {
          (function() {
            function analyzePerformance() {
              const entries = performance.getEntriesByType('measure');
              entries.forEach((entry) => {
                if (entry.duration > 100) {
                  console.warn(`Long-running script detected: ${entry.name} took ${entry.duration.toFixed(2)}ms`);
                }
              });
  
              const layoutShifts = performance.getEntriesByType('layout-shift');
              const totalLayoutShiftScore = layoutShifts.reduce((sum, entry) => sum + entry.value, 0);
              if (totalLayoutShiftScore > 0.1) {
                console.warn(`High layout shift score detected: ${totalLayoutShiftScore.toFixed(2)}`);
              }
            }
  
            function startPerformanceMonitoring() {
              performance.mark('start-analysis');
              for (let i = 0; i < 1000000; i++) {
                Math.sqrt(i);
              }
              performance.mark('end-analysis');
              performance.measure('analysis-duration', 'start-analysis', 'end-analysis');
              analyzePerformance();
            }
  
            startPerformanceMonitoring();
          })();
        }
      });
    });
  });
  