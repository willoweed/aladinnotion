import { useState } from "react";

export default function App() {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");

  return (
    <div style={styles.page}>
      <div
        className={open ? "glassPill open" : "glassPill closed"}
        style={{
          width: open ? "520px" : "60px",
        }}
        onClick={() => setOpen(true)}
      >
        {!open ? (
          <span className="libraryIcon">📚</span>
        ) : (
          <input
            autoFocus
            className="glassInput"
            type="text"
            placeholder="Search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
        )}
      </div>
    </div>
  );
}

const styles = {
  page: {
    height: "100vh",
    background: "rgb(23,23,23)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    fontFamily: "system-ui, -apple-system, BlinkMacSystemFont",
  },
};
