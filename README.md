# PuntoEnv

[![Test](https://github.com/ivandotv/puntoenv/actions/workflows/CI.yml/badge.svg)](https://github.com/ivandotv/puntoenv/actions/workflows/CI.yml)
[![GitHub license](https://img.shields.io/github/license/ivandotv/puntoenv)](https://github.com/ivandotv/puntoenv/blob/main/LICENSE)

PuntoEnv is a simple package that enables you to load `.env` files in to `process.env` and also do variable expansion in a predetermined order based on the `NODE_ENV` environment variable value.

<!-- toc -->

- [PuntoEnv](#puntoenv)
  - [Motivation](#motivation)
  - [Getting Started](#getting-started)
  - [How it works.](#how-it-works)
    - [Variable expansion](#variable-expansion)
  - [License](#license)

<!-- tocstop -->

## Motivation

I like how [Next.js loads `.env` files](https://nextjs.org/docs/basic-features/environment-variables#environment-variable-load-order) so I decided to make a similar utility module so I could use it everywhere else. Under the hood, it uses [`dotenv`](https://www.npmjs.com/package/dotenv) and [`dotenv-expand`](https://www.npmjs.com/package/dotenv-expand) packages.

## Getting Started

Setup is really simple, just pass in a path to the directory that has your `.env` files and that's it!

```ts
import { setupEnv } from 'puntoenv'

setupEnv('/path/to/your-dir/')
```

## How it works.

PuntoEnv will load `.env` files in a particular order.
Environment variables are looked up in the following places, in order, stopping once the variable is found.

- process.env
- .env.$(NODE_ENV).local
- .env.local
- .env.$(NODE_ENV)
- .env

One exception to this rule is when the `NODE_ENV=test` in that case `*.local` files will not be loaded as you expect tests to produce the same results for everyone (but you can use `.env.test` file).

I would also recommend adding all `.env*.local` files to the `.gitignore` file.

### Variable expansion

After all the files have been processed, variable expansion will take place.
Before expansion:

```sh
SERVER=www.example.com:$PORT
PORT=3000
```

After expansion:

```sh
SERVER=www.example.com:3000
PORT=3000
```

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details
