This is a performance testcase for Ember initial rendering.

For best results, run like `ember s --environment=production`

On my hardware, some recent results:

| Ember Version          | Environment   | Mean Render Time  | Pre-Glimmer Baseline |
| -----------------------|---------------| ------------------| ---------------------|
| 1.12.1                 | production    | 183ms             |  0%                  |
| 1.12.1                 | development   | 433ms             |  0%                  |
| 2.0.0-canary+bc2a93fb  | production    | 502ms             |  2.7x slower         |
| 2.0.0-canary+bc2a93fb  | development   | 894ms             |  2.7x slower         |
