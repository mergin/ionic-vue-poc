module.exports = {
  ci: {
    collect: {
      numberOfRuns: 1,
      url: ['http://127.0.0.1:4173/tabs/tab3'],
    },
    assert: {
      assertions: {
        'largest-contentful-paint': ['warn', { maxNumericValue: 4000 }],
        'cumulative-layout-shift': ['error', { maxNumericValue: 0.1 }],
        'total-blocking-time': ['warn', { maxNumericValue: 300 }],
      },
    },
  },
}
