import React from "react";

function SearchBar({ search, setSearch }) {
  return (
    <div className="ark-searchbar">
      <input
        type="text"
        placeholder="Buscar guías, tips, aventuras..."
        value={search}
        onChange={e => setSearch(e.target.value)}
      />
    </div>
  );
}

export default SearchBar;