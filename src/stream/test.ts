import { filter, map, range, tap } from 'rxjs'

range(1, 10)
  .pipe(
    tap({
      next: (x) => console.log('tap: ' + x),
      error: (err) => console.error(err),
      complete: () => console.log('tap complete')
    }),
    filter((x) => !(x % 2)),
    map((x) => x + 1)
  )
  .subscribe({
    next: (x) => console.log('subscribe: ' + x),
    error: (err) => console.error(err),
    complete: () => console.log('complete')
  })
