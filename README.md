This is a performance testcase for Ember initial rendering.

For best results, run like `ember s --environment=production`

On my hardware, some recent results:

| Ember Version          | Environment   | Browser           |  Mean Render Time    | Pre-Glimmer Baseline |
| -----------------------|---------------| ------------------| ---------------------| ---------------------|
| 1.12.1                 | production    | Chrome 44         |  183ms               |                      |
| 1.12.1                 | development   | Chrome 44         |  433ms               |                      |
| 1.12.1                 | production    | Safari 8          |   70ms               |                      |
| 1.12.1                 | development   | Safari 8          |  142ms               |                      |
| 2.0.0-canary+bc2a93fb  | production    | Chrome 44         |  502ms               |  2.7x slower         |
| 2.0.0-canary+bc2a93fb  | development   | Chrome 44         |  894ms               |  2.7x slower         |
| 2.0.0-canary+bc2a93fb  | production    | Safari 8          |  160ms               |  2.2x slower         |
| 2.0.0-canary+bc2a93fb  | development   | Safari 8          |  208ms               |  1.5x slower         |


