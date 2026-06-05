# color-picker-mono

A **fork** of `immediately-run/color-picker` — the §0 "fork the picker" demo for
[immediately.run](https://immediately.run). It `provides` the **same** `pick-color`
task contract (UI_AS_APPS_SPEC §5.7), but ships a **grayscale** palette instead of
the bright default, so it's visually obvious when an override has pointed
`task.pick-color` at this fork: *every* app that invokes `pick-color` then gets it,
with no changes to the callers (§0/§7 forkability).

```jsonc
// package.json — a fork keeps the same contract
"immediately.run": { "provides": [{ "task": "pick-color", "version": "1.0" }] }
```
