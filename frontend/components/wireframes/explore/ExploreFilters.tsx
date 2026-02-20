export default function ExploreFilters() {
  return (
    <aside className="sidebar">
      <h3>Filtros</h3>

      <div className="filter-group">
        <label className="filter-label">Estado</label>
        <label className="filter-option">
          <input type="checkbox" defaultChecked />
          Pendiente
        </label>
        <label className="filter-option">
          <input type="checkbox" />
          En Proceso
        </label>
        <label className="filter-option">
          <input type="checkbox" />
          Resuelto
        </label>
        <label className="filter-option">
          <input type="checkbox" />
          Urgente
        </label>
      </div>

      <div className="filter-group">
        <label className="filter-label">Categoría</label>
        <label className="filter-option">
          <input type="checkbox" />
          🚧 Baches
        </label>
        <label className="filter-option">
          <input type="checkbox" />
          💡 Alumbrado
        </label>
        <label className="filter-option">
          <input type="checkbox" />
          🗑️ Basura
        </label>
        <label className="filter-option">
          <input type="checkbox" />
          💧 Agua
        </label>
      </div>
    </aside>
  )
}
