# Contributing

Fork the repo, then clone your fork to your machine and run:

```sh
yarn install
```

To test in the browser during development, run:

```sh
yarn start
```

Then open your browser to http://localhost:9966

## Testing

When you're done with your changes, be sure to run `yarn format` to have Prettier format your code, and use `yarn lint` to check for syntax issues. `yarn test:cypress` will run e2e tests in interactive mode.

You can also simply run `yarn test` to check all of the above.

## API Changes

If you added/removed options in the API, please remember to update the docs in the [README](README.md) as well as the [typings](index.d.ts).

## Changeset

Before posting your PR, please add a changeset by running `yarn changeset` and following the prompts. This will help us quickly make a release with your enhancements.

If your changes don't affect the source or typings, then a changeset is not needed (and you can ignore the bot's automated comment on your PR about not finding one as part of your changes).

## Anything Helps

We want to recognize **all** contributions. To that end, we use the [All Contributors Bot](https://allcontributors.org/docs/en/bot/usage) to automate adding all types of contributions to our [README](README.md).

You can also use the [All Contributors CLI](https://allcontributors.org/docs/en/cli/usage) instead of the bot: `yarn all-contributors add <USERNAME> <KEY>[,<KEY>...]` (where `KEY` is an [emoji key](https://allcontributors.org/docs/en/emoji-key) contribution term). Then run `yarn all-contributors generate` to update the README.

Please feel free to use the bot on your own issue or PR to add yourself as a contributor (or use the CLI), or remind one of the maintainers to do so.

> ✨ No contribution is too small not to be included. We appreciate your help!

## Updating the docs

The docs are published at http://focus-trap.github.io/focus-trap/ and served from the `/docs` directory in the repo.

Simply run `yarn demo-bundle` locally, commit the updated `/docs/demo-bundle.*` files, and open a PR to updated it.

Ideally, this is done within any PR that modifies anything under `/docs`, or the library code itself.
