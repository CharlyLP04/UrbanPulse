'use client'

export type FilterState = {
  statuses: string[]
  categories: string[]
}

type ExploreFiltersProps = {
  filters: FilterState
  availableCategories: string[]
  onChange: (filters: FilterState) => void
}

const STATUS_OPTIONS = [
  { value: 'urgente',   label: 'Alta Prioridad' },
  { value: 'proceso',   label: 'En Proceso' },
  { value: 'resuelto',  label: 'Resuelto' },
  { value: 'pendiente', label: 'Pendiente' },
]

export default function ExploreFilters({ filters, availableCategories, onChange }: ExploreFiltersProps) {
  const toggleStatus = (value: string) => {
    const next = filters.statuses.includes(value)
      ? filters.statuses.filter((s) => s !== value)
      : [...filters.statuses, value]
    onChange({ ...filters, statuses: next })
  }

  const toggleCategory = (value: string) => {
    const next = filters.categories.includes(value)
      ? filters.categories.filter((c) => c !== value)
      : [...filters.categories, value]
    onChange({ ...filters, categories: next })
  }

  const clearAll = () => onChange({ statuses: [], categories: [] })
  const hasFilters = filters.statuses.length > 0 || filters.categories.length > 0

  return (
    <aside className="sidebar">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
        <h3 style={{ margin: 0 }}>Filtros</h3>
        {hasFilters && (
          <button
            onClick={clearAll}
            style={{ fontSize: '0.75rem', color: '#e74646', fontWeight: 600, background: 'none', border: 'none', cursor: 'pointer' }}
          >
            Limpiar todo
          </button>
        )}
      </div>

      <div className="filter-group">
        <label className="filter-label">Estado</label>
        {STATUS_OPTIONS.map((opt) => (
          <label key={opt.value} className="filter-option">
            <input
              type="checkbox"
              checked={filters.statuses.includes(opt.value)}
              onChange={() => toggleStatus(opt.value)}
            />
            {opt.label}
          </label>
        ))}
      </div>

      {availableCategories.length > 0 && (
        <div className="filter-group">
          <label className="filter-label">Categoría</label>
          {availableCategories.map((cat) => (
            <label key={cat} className="filter-option">
              <input
                type="checkbox"
                checked={filters.categories.includes(cat)}
                onChange={() => toggleCategory(cat)}
              />
              {cat}
            </label>
          ))}
        </div>
      )}
    </aside>
  )
}
