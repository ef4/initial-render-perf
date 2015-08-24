This is a performance testcase for Ember initial rendering.

For best results, run like `ember s --environment=production`

On my hardware, some recent results:

| Ember Version          | Environment   | Browser           |  Mean Render Time    | Pre-Glimmer Baseline | Canary Baseline |
| -----------------------|---------------| ------------------| ---------------------| ---------------------| ----------------|
| 1.12.1                 | production    | Chrome 44         |  183ms               |                      |                 |
| 1.12.1                 | development   | Chrome 44         |  433ms               |                      |                 |
| 1.12.1                 | production    | Safari 8          |   70ms               |                      |                 |
| 1.12.1                 | development   | Safari 8          |  142ms               |                      |                 |
| 2.0.0-canary+bc2a93fb  | production    | Chrome 44         |  502ms               |  174% slower         |                 |
| 2.0.0-canary+bc2a93fb  | development   | Chrome 44         |  894ms               |  106% slower         |                 |
| 2.0.0-canary+bc2a93fb  | production    | Safari 8          |  160ms               |  128% slower         |                 |
| 2.0.0-canary+bc2a93fb  | development   | Safari 8          |  208ms               |   46% slower         |                 |
| 2.2.0-canary+12d23bc5  | production    | Chrome 44         | 168ms                | 8% faster            |                 |
| 2.2.0-canary+12d23bc5  | development   | Chrome 44         | 250ms                | 42% faster           |                 |
| 2.2.0-canary+12d23bc5  | production    | Safari 8          | 126ms                | 80% slower           |                 |
| 2.2.0-canary+12d23bc5  | development   | Safari 8          | 155ms                | 9% slower            |                 |
| new pr+a281873         | production    | Chrome 44         | 156ms                | 14% faster           | 6% faster       |
| new pr+a281873         | development   | Chrome 44         | 250ms                | 42% faster           | same            |
| new pr+a281873         | production    | Safari 8          | 113ms                | slower           |                 |
| new pr+a281873         | development   | Safari 8          | 152ms                | 7% slower            |                 |



