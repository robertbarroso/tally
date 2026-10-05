function App({ tables = [] }) {
  return (
    <main className="database-viewer">
      <header className="database-header">
        <p className="eyebrow">Local database</p>
        <h1>Schema contents</h1>
        <p>Tables currently available in the local PGlite database.</p>
      </header>

      {tables.length === 0 ? (
        <p className="empty-state">No tables were found.</p>
      ) : (
        <section className="table-list" aria-label="Database tables">
          {tables.map((table) => (
            <article className="table-card" key={table.name}>
              <div className="table-heading">
                <h2>{table.name}</h2>
                <span>{table.rows.length} rows</span>
              </div>

              {table.rows.length === 0 ? (
                <p className="empty-state">Table is empty.</p>
              ) : (
                <div className="table-scroll">
                  <table>
                    <thead>
                      <tr>
                        {Object.keys(table.rows[0]).map((column) => (
                          <th key={column}>{column}</th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {table.rows.map((row, rowIndex) => (
                        <tr key={row.id ?? rowIndex}>
                          {Object.keys(table.rows[0]).map((column) => (
                            <td key={column}>
                              {row[column] === null
                                ? "null"
                                : String(row[column])}
                            </td>
                          ))}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </article>
          ))}
        </section>
      )}
    </main>
  );
}

export default App;
