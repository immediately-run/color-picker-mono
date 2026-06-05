// The pick-color task callee (UI_AS_APPS_SPEC §5.7). Reads the invocation params
// via `useTaskInput()` (the caller's `initial` color, untrusted but harmless), and
// returns the chosen color to the caller via `completeTask({ color })`. `cancelTask`
// aborts — though the host always owns dismiss (T28), so the overlay's Escape/close
// work even if this code never calls it.
import { useTaskInput, completeTask, cancelTask } from "@immediately-run/sdk";
import "./ColorPicker.css";

// This FORK ships a GRAYSCALE ramp instead of the bright default palette — so in
// the §0 "fork the picker" demo it is visually obvious that the user's fork (not
// the first-party picker) is the one running. It still `provides pick-color@1.0`.
const SWATCHES = [
  "#000000", "#1a1a1a", "#333333", "#4d4d4d", "#666666",
  "#808080", "#999999", "#b3b3b3", "#cccccc", "#ffffff",
];

const asString = (v: unknown, fallback: string): string =>
  typeof v === "string" ? v : fallback;

export default function ColorPicker() {
  const input = useTaskInput();
  const initial = asString(input?.params.initial, "#3b82f6");

  return (
    <div className="cp">
      <header className="cp-hd">
        <span className="cp-title">Pick a shade (forked picker)</span>
        <span className="cp-current" aria-label={`current color ${initial}`}>
          <span className="cp-chip" style={{ background: initial }} />
          <code>{initial}</code>
        </span>
      </header>

      <div className="cp-grid" role="listbox" aria-label="Colors">
        {SWATCHES.map((c) => (
          <button
            key={c}
            type="button"
            role="option"
            aria-selected={c.toLowerCase() === initial.toLowerCase()}
            className="cp-swatch"
            style={{ background: c }}
            title={c}
            aria-label={c}
            onClick={() => completeTask({ color: c })}
          />
        ))}
      </div>

      <footer className="cp-foot">
        <button type="button" className="cp-cancel" onClick={() => cancelTask()}>
          Cancel
        </button>
        <button
          type="button"
          className="cp-keep"
          onClick={() => completeTask({ color: initial })}
        >
          Keep {initial}
        </button>
      </footer>
    </div>
  );
}
