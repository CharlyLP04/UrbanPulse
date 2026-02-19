'use client'

import { useState } from 'react'
import { useArrowMenuNavigation } from '@/components/wireframes/shared/useArrowMenuNavigation'
import { initialReports } from './data'
import ExploreFilters from './ExploreFilters'
import ExploreNavbar from './ExploreNavbar'
import ExploreReportsSection from './ExploreReportsSection'
import { Report } from './types'

export default function ExplorePage() {
  const [reports, setReports] = useState<Report[]>(initialReports)
  const { itemRefs, onKeyDown } = useArrowMenuNavigation<HTMLAnchorElement>()

  const voteReport = (reportId: string) => {
    setReports((previous) =>
      previous.map((report) =>
        report.id === reportId && report.status !== 'resuelto'
          ? { ...report, votes: report.votes + 1 }
          : report
      )
    )
  }

  return (
    <div className="explore-page">
      <ExploreNavbar itemRefs={itemRefs} onKeyDown={onKeyDown} />

      <div className="page-header">
        <h1>Reportes Activos</h1>
        <p>Encuentra y vota por los problemas urbanos que necesitan atención</p>
      </div>

      <div className="main-content">
        <ExploreFilters />
        <ExploreReportsSection reports={reports} onVote={voteReport} />
      </div>

      <style jsx global>{`
        @import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&family=IBM+Plex+Sans:wght@400;500;600;700&display=swap');

        .explore-page {
          --azul-institucional: #0f4c75;
          --azul-medio: #3282b8;
          --verde-estable: #1b9c85;
          --rojo-institucional: #e74646;
          --gris-azulado: #e8eef1;
          --negro-carbon: #1a1a1d;
          --blanco: #ffffff;
          font-family: 'IBM Plex Sans', sans-serif;
          background: var(--gris-azulado);
          color: var(--negro-carbon);
          line-height: 1.6;
          min-height: 100vh;
        }

        .navbar {
          background: var(--azul-institucional);
          padding: 1rem 0;
          box-shadow: 0 4px 12px rgba(15, 76, 117, 0.2);
          position: sticky;
          top: 0;
          z-index: 1000;
        }

        .nav-container {
          max-width: 1400px;
          margin: 0 auto;
          padding: 0 2rem;
          display: flex;
          justify-content: space-between;
          align-items: center;
        }

        .logo {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          color: var(--blanco);
          font-size: 1.75rem;
          font-weight: 700;
          font-family: 'Bebas Neue', cursive;
          letter-spacing: 1px;
          text-decoration: none;
        }

        .nav-links {
          display: flex;
          gap: 2rem;
          align-items: center;
          list-style: none;
          margin: 0;
          padding: 0;
        }

        .nav-links a {
          color: var(--blanco);
          text-decoration: none;
          font-weight: 500;
          transition: color 0.3s ease;
          border-radius: 6px;
        }

        .nav-links a:hover {
          color: var(--gris-azulado);
        }

        .nav-links a:focus-visible {
          outline: 3px solid var(--blanco);
          outline-offset: 2px;
        }

        .btn-crear {
          background: var(--verde-estable);
          color: var(--blanco);
          padding: 0.75rem 1.5rem;
          border-radius: 6px;
          font-weight: 600;
          text-decoration: none;
          transition: all 0.3s ease;
        }

        .btn-crear:hover {
          background: #158f75;
          transform: translateY(-2px);
        }

        .page-header {
          background: linear-gradient(135deg, var(--azul-institucional) 0%, var(--azul-medio) 100%);
          color: var(--blanco);
          padding: 3rem 2rem;
          text-align: center;
        }

        .page-header h1 {
          font-family: 'Bebas Neue', cursive;
          font-size: 3rem;
          margin-bottom: 0.5rem;
          letter-spacing: 2px;
        }

        .page-header p {
          font-size: 1.2rem;
          opacity: 0.9;
        }

        .main-content {
          max-width: 1400px;
          margin: 0 auto;
          padding: 2rem;
          display: grid;
          grid-template-columns: 300px 1fr;
          gap: 2rem;
        }

        .sidebar {
          background: var(--blanco);
          padding: 1.5rem;
          border-radius: 12px;
          box-shadow: 0 4px 12px rgba(26, 26, 29, 0.08);
          height: fit-content;
          position: sticky;
          top: 100px;
        }

        .sidebar h3 {
          font-family: 'Bebas Neue', cursive;
          font-size: 1.5rem;
          color: var(--azul-institucional);
          margin-bottom: 1rem;
          letter-spacing: 1px;
        }

        .filter-group {
          margin-bottom: 1.5rem;
        }

        .filter-label {
          font-weight: 600;
          color: var(--negro-carbon);
          display: block;
          margin-bottom: 0.5rem;
        }

        .filter-option {
          display: flex;
          align-items: center;
          padding: 0.5rem;
          margin-bottom: 0.5rem;
          border-radius: 6px;
          cursor: pointer;
          transition: background 0.2s ease;
        }

        .filter-option:hover {
          background: var(--gris-azulado);
        }

        .filter-option input[type='checkbox'] {
          margin-right: 0.75rem;
          width: 18px;
          height: 18px;
          cursor: pointer;
        }

        .reports-section {
          display: flex;
          flex-direction: column;
          gap: 1.5rem;
        }

        .reports-stats {
          background: var(--blanco);
          padding: 1.5rem;
          border-radius: 12px;
          box-shadow: 0 4px 12px rgba(26, 26, 29, 0.08);
          display: flex;
          justify-content: space-between;
          align-items: center;
        }

        .stats-info {
          font-size: 1.1rem;
          color: var(--negro-carbon);
        }

        .stats-info strong {
          color: var(--azul-institucional);
          font-size: 1.5rem;
        }

        .sort-options select {
          padding: 0.5rem 1rem;
          border: 2px solid var(--azul-medio);
          border-radius: 6px;
          color: var(--negro-carbon);
          font-weight: 500;
          cursor: pointer;
          background: var(--blanco);
        }

        .report-card {
          background: var(--blanco);
          border-radius: 12px;
          overflow: hidden;
          box-shadow: 0 4px 12px rgba(26, 26, 29, 0.08);
          transition: all 0.3s ease;
          display: grid;
          grid-template-columns: 250px 1fr;
          border-left: 5px solid var(--azul-medio);
        }

        .report-card:hover {
          transform: translateY(-5px);
          box-shadow: 0 8px 24px rgba(26, 26, 29, 0.12);
        }

        .report-card.urgente {
          border-left-color: var(--rojo-institucional);
        }

        .report-card.resuelto {
          border-left-color: var(--verde-estable);
        }

        .report-image {
          width: 100%;
          height: 250px;
          object-fit: cover;
          background: var(--gris-azulado);
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 4rem;
        }

        .report-content {
          padding: 1.5rem;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
        }

        .report-header {
          display: flex;
          justify-content: space-between;
          align-items: start;
          margin-bottom: 1rem;
        }

        .report-title {
          font-size: 1.5rem;
          font-weight: 700;
          color: var(--azul-institucional);
          margin-bottom: 0.5rem;
        }

        .status-badge {
          padding: 0.4rem 1rem;
          border-radius: 20px;
          font-size: 0.85rem;
          font-weight: 600;
          text-transform: uppercase;
          letter-spacing: 0.5px;
        }

        .badge-urgente {
          background: var(--rojo-institucional);
          color: var(--blanco);
        }

        .badge-resuelto {
          background: var(--verde-estable);
          color: var(--blanco);
        }

        .badge-proceso {
          background: var(--azul-medio);
          color: var(--blanco);
        }

        .badge-pendiente {
          background: var(--gris-azulado);
          color: var(--negro-carbon);
        }

        .report-description {
          color: var(--negro-carbon);
          margin-bottom: 1rem;
          line-height: 1.6;
        }

        .report-meta {
          display: flex;
          gap: 2rem;
          color: #666;
          font-size: 0.9rem;
          margin-bottom: 1rem;
        }

        .meta-item {
          display: flex;
          align-items: center;
          gap: 0.5rem;
        }

        .report-footer {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding-top: 1rem;
          border-top: 1px solid var(--gris-azulado);
        }

        .vote-section {
          display: flex;
          gap: 1rem;
          align-items: center;
        }

        .vote-btn {
          background: var(--azul-medio);
          color: var(--blanco);
          border: none;
          padding: 0.6rem 1.2rem;
          border-radius: 6px;
          font-weight: 600;
          cursor: pointer;
          display: flex;
          align-items: center;
          gap: 0.5rem;
          transition: all 0.3s ease;
        }

        .vote-btn:hover {
          background: var(--azul-institucional);
          transform: scale(1.05);
        }

        .vote-count {
          font-size: 1.2rem;
          font-weight: 700;
          color: var(--azul-institucional);
        }

        .action-btns {
          display: flex;
          gap: 0.5rem;
        }

        .btn-detail {
          background: var(--verde-estable);
          color: var(--blanco);
          padding: 0.6rem 1.2rem;
          border: none;
          border-radius: 6px;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.3s ease;
          text-decoration: none;
        }

        .btn-detail:hover {
          background: #158f75;
        }

        .btn-share {
          background: transparent;
          color: var(--azul-medio);
          padding: 0.6rem 1.2rem;
          border: 2px solid var(--azul-medio);
          border-radius: 6px;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.3s ease;
        }

        .btn-share:hover {
          background: var(--azul-medio);
          color: var(--blanco);
        }

        .pagination {
          display: flex;
          justify-content: center;
          gap: 0.5rem;
          margin-top: 2rem;
        }

        .pagination button {
          background: var(--blanco);
          color: var(--azul-institucional);
          border: 2px solid var(--azul-medio);
          padding: 0.6rem 1.2rem;
          border-radius: 6px;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.3s ease;
        }

        .pagination button:hover {
          background: var(--azul-medio);
          color: var(--blanco);
        }

        .pagination button.active {
          background: var(--azul-institucional);
          color: var(--blanco);
          border-color: var(--azul-institucional);
        }

        @media (max-width: 1024px) {
          .main-content {
            grid-template-columns: 1fr;
          }

          .sidebar {
            position: static;
          }

          .report-card {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </div>
  )
}
