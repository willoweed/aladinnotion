import { useState } from "react";

export default function App() {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);

  // ✅ Search Books
  const searchBooks = async () => {
    if (!query.trim()) return;

    setLoading(true);

    const res = await fetch(`/api/search?q=${query}`);
    const data = await res.json();

    setResults(data.item || []);
    setLoading(false);
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
            placeholder="Search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && searchBooks()}
          />
        )}
      </div>

      {/* Loading */}
      {loading && <p style={styles.loading}>Searching...</p>}

      {/* Results */}
      {results.length > 0 && (
        <div style={styles.results}>
          {results.map((book) => (
            <div key={book.itemId} style={styles.card}>
              {/* Cover */}
              <img src={book.cover} alt="" style={styles.cover} />

              {/* Info */}
              <div style={styles.info}>
                <p style={styles.title}>{book.title}</p>
                <p style={styles.meta}>
                  {book.author} · {book.publisher}
                </p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

/* Apple Style */
const styles = {
  page: {
    height: "100vh",
    background: "rgb(23,23,23)",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    paddingTop: "120px",
    fontFamily: "system-ui, -apple-system, BlinkMacSystemFont",
    color: "white",
  },

  loading: {
    marginTop: "18px",
    fontSize: "13px",
    opacity: 0.6,
  },

  results: {
    width: "520px",
    marginTop: "25px",
    display: "flex",
    flexDirection: "column",
    gap: "14px",
  },

  card: {
    display: "flex",
    alignItems: "center",
    gap: "16px",
    padding: "14px",
    borderRadius: "18px",
    background: "rgba(255,255,255,0.05)",
    border: "1px solid rgba(255,255,255,0.08)",
    backdropFilter: "blur(18px)",
    cursor: "pointer",
    transition: "transform 0.2s ease",
  },

  cover: {
    width: "55px",
    height: "78px",
    borderRadius: "10px",
    objectFit: "cover",
    boxShadow: "0 8px 20px rgba(0,0,0,0.5)",
  },

  info: {
    flex: 1,
    overflow: "hidden",
  },

  title: {
    margin: 0,
    fontSize: "14px",
    fontWeight: "600",
    lineHeight: "1.3",
    whiteSpace: "nowrap",
    overflow: "hidden",
    textOverflow: "ellipsis",
  },

  meta: {
    margin: "6px 0 0",
    fontSize: "12px",
    opacity: 0.55,
    whiteSpace: "nowrap",
    overflow: "hidden",
    textOverflow: "ellipsis",
  },
};
