module.exports = function(config) {
    config.set({
      basePath: '',
      frameworks: ['jasmine', '@angular-devkit/build-angular'],
      plugins: [
        require('karma-jasmine'),
        require('karma-chrome-launcher'),
        require('karma-jasmine-html-reporter'),
        require('karma-spec-reporter'),
        require('@angular-devkit/build-angular/plugins/karma')
      ],
      client: {
        clearContext: false 
      },
      jasmineHtmlReporter: {
        suppressAll: true
      },
      specReporter: {
        maxLogLines: 5,        
        suppressErrorSummary: false,  
        suppressFailed: false, 
        suppressPassed: false,
        suppressSkipped: true,
        showSpecTiming: false
      },
      reporters: ['progress', 'kjhtml', 'spec'],
      port: 9876,
      colors: true,
      logLevel: config.LOG_INFO,
      autoWatch: true,
      browsers: ['Chrome'],
      singleRun: false,
      restartOnFileChange: true
    });
  };