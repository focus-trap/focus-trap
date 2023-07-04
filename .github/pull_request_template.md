<!--
Thank you for your contribution! 🎉

Please be sure to go over the PR CHECKLIST below before posting your PR to make sure we all think of "everything". :)
-->

...ADD PR DETAILS HERE...

<details>
<summary>PR Checklist</summary>
<br/>

__Please leave this checklist in your PR.__

- Issue being fixed is referenced.
- Source changes maintain stated browser compatibility.
- Web APIs introduced have __deep__ browser coverage, including Safari (often very late to adopt new APIs).
- Includes updated docs demo bundle if source/docs code was changed (run `npm run demo-bundle` in your branch and include the `/docs/demo-bundle.js` file that gets generated in your PR).
- Unit test coverage added/updated.
- E2E (i.e. demos) test coverage added/updated.
  - ⚠️ Non-covered demos (look for `// TEST MANUALLY` comments [here](https://github.com/focus-trap/focus-trap/blob/master/docs/js/index.js)) that can't be fully tested in Cypress have been __manually__ verified.
- Typings added/updated.
- Changes do not break SSR:
  - Careful to test `typeof document/window !== 'undefined'` before using it in code that gets executed on load.
- README updated (API changes, instructions, etc.).
- Changes to dependencies explained.
- Changeset added (run `npm run changeset` locally to add one, and follow the prompts).
  - EXCEPTION: A Changeset is not required if the change does not affect any of the source files that produce the package bundle. For example, demo changes, tooling changes, test updates, or a new dev-only dependency to run tests more efficiently should not have a Changeset since it will not affect package consumers.

</details>
