---
"focus-trap": patch
---

Change `prepublishOnly` script to `prepare` script so that it also runs if someone installs the package directly from the git repo (e.g. from your work in which you fixed a bug or added a feature you're waiting to get merged to master and published to NPM).
