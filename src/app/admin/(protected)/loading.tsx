export default function AdminLoading() {
  return (
    <div aria-hidden="true">
      <div
        className="admin-skeleton mb-lg"
        style={{ width: "10rem", height: "1.5rem" }}
      />
      {[0, 1, 2, 3].map((i) => (
        <div key={i} className="admin-row">
          <div
            className="admin-skeleton"
            style={{ width: "3.5rem", height: "1.5rem", borderRadius: "999px" }}
          />
          <div className="admin-skeleton" style={{ width: "4rem", height: "1rem" }} />
          <div className="admin-skeleton" style={{ flex: 1, height: "1rem" }} />
        </div>
      ))}
    </div>
  );
}
