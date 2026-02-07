import { useState } from "react";

export default function App() {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);

  // ✅ Search via Vercel API
  const searchBooks = async () => {
    if (!query.trim()) return;

    const res = await fetch(`/api/search?q=${query}`);
    const data = await res.json();

    setResults(data.item || []);
  };

  return (
    <div style={styles.page}>
      {/* Search Bar */}
      <div
        className={open ? "glassPill open" : "glassPill closed"}
        style={{ width: open ? "520px" : "60px" }}
        onClick={() => setOpen(true)}
      >
        {!open ? (
          <span className="libraryIcon">📚</span>
        ) : (
          <input
            autoFocus
            className="glassInput"
            type="text"
            placeholder="Search for a book..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && searchBooks()}
          />
        )}
      </div>

      {/* Results */}
      {results.length > 0 && (
        <div style={styles.results}>
          {results.map((book) => (
            <div key={book.isbn} style={styles.card}>
              <img src={book.cover} alt="" style={styles.cover} />
              <div>
                <p style={styles.title}>{book.title}</p>
                <p style={styles.author}>{book.author}</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

const styles = {
  page: {
    height: "100vh",
    background: "rgb(23,23,23)",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    gap: "25px",
    fontFamily: "system-ui, -apple-system, BlinkMacSystemFont",
  },

  results: {
    width: "520px",
    display: "flex",
    flexDirection: "column",
    gap: "12px",
  },

  card: {
    display: "flex",
    gap: "14px",
    padding: "14px",
    borderRadius: "18px",
    background: "rgba(255,255,255,0.05)",
    border: "1px solid rgba(255,255,255,0.08)",
    backdropFilter: "blur(16px)",
    color: "white",
  },

  cover: {
    width: "52px",
    borderRadius: "10px",
  },

  title: {
    margin: 0,
    fontSize: "14px",
    fontWeight: "600",
  },

  author: {
    margin: 0,
    fontSize: "12px",
    opacity: 0.6,
  },
};
