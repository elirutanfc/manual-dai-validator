# dai_validator.js

Give it a stream URL with DAI params, and it converts it to JSON andd checks it against a schema using [JSON Schema](https://json-schema.org/).
Currently the only schema is `muxip_needed.js`. More are planned.

## To use:
https://elirutanfc.github.io/manual-dai-validator

## To run in a development environment:
```
npm i
npx vite build
npx vite preview
```

## Example
Try copying the contents `test_url_good_1.txt` or `test_url_bad_1.txt`, pasting into the box on the site and clicking "Check URL."
You should get some errors and a `"valid": false` response for the bad one, and a `"valid": true` response for the good one.
