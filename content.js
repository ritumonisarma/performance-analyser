(function() {
    function analyzePerformance() {
      const entries = performance.getEntriesByType('measure');
      entries.forEach((entry) => {
        if (entry.duration > 100) { // Arbitrary threshold for long-running scripts
          console.warn(`Long-running script detected: ${entry.name} took ${entry.duration.toFixed(2)}ms`);
        }
      });
  
      const layoutShifts = performance.getEntriesByType('layout-shift');
      const totalLayoutShiftScore = layoutShifts.reduce((sum, entry) => sum + entry.value, 0);
      if (totalLayoutShiftScore > 0.1) { // Arbitrary threshold for layout shift score
        console.warn(`High layout shift score detected: ${totalLayoutShiftScore.toFixed(2)}`);
      }
    }
  
    function startPerformanceMonitoring() {
      performance.mark('start-analysis');
      // Perform some dummy workload for demonstration
      for (let i = 0; i < 1000000; i++) {
        Math.sqrt(i);
      }
      performance.mark('end-analysis');
      performance.measure('analysis-duration', 'start-analysis', 'end-analysis');
      analyzePerformance();
    }
  
    startPerformanceMonitoring();
  })();