'use client'

import { useEffect } from 'react'
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet'
import L from 'leaflet'
import 'leaflet/dist/leaflet.css'
import { Report } from '@/lib/api'
import Link from 'next/link'

// Fix leaflet default icon path issue with Next.js/webpack
delete (L.Icon.Default.prototype as any)._getIconUrl
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
  iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
})

const STATUS_COLORS: Record<string, string> = {
  OPEN:        '#f97316',
  IN_PROGRESS: '#3b82f6',
  RESOLVED:    '#10b981',
  CLOSED:      '#94a3b8',
}

const STATUS_LABELS: Record<string, string> = {
  OPEN:        'Pendiente',
  IN_PROGRESS: 'En proceso',
  RESOLVED:    'Resuelto',
  CLOSED:      'Cerrado',
}

function createColoredIcon(color: string) {
  return L.divIcon({
    className: '',
    html: `
      <div style="
        width: 32px; height: 32px;
        background: ${color};
        border-radius: 50% 50% 50% 0;
        transform: rotate(-45deg);
        border: 3px solid white;
        box-shadow: 0 2px 8px rgba(0,0,0,0.3);
        display: flex; align-items: center; justify-content: center;
      ">
        <div style="
          width: 10px; height: 10px;
          background: white;
          border-radius: 50%;
          transform: rotate(45deg);
        "></div>
      </div>
    `,
    iconSize: [32, 32],
    iconAnchor: [16, 32],
    popupAnchor: [0, -34],
  })
}

// Componente para ajustar el centro cuando cambian los reports
function BoundsAdjuster({ reports }: { reports: Report[] }) {
  const map = useMap()
  useEffect(() => {
    if (reports.length === 0) return
    const coords = reports
      .filter(r => r.latitude != null && r.longitude != null)
      .map(r => [r.latitude!, r.longitude!] as [number, number])
    if (coords.length > 0) {
      map.fitBounds(L.latLngBounds(coords), { padding: [40, 40], maxZoom: 15 })
    }
  }, [reports, map])
  return null
}

type MapViewProps = {
  reports: Report[]
}

// Centro por defecto: Puebla, México
const DEFAULT_CENTER: [number, number] = [19.0414, -98.2063]
const DEFAULT_ZOOM = 13

export default function MapView({ reports }: MapViewProps) {
  const hasCoords = reports.some(r => r.latitude != null)

  return (
    <MapContainer
      center={DEFAULT_CENTER}
      zoom={DEFAULT_ZOOM}
      style={{ height: '100%', width: '100%' }}
      zoomControl={true}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />

      {hasCoords && <BoundsAdjuster reports={reports} />}

      {reports.map(report => {
        if (report.latitude == null || report.longitude == null) return null
        const color = STATUS_COLORS[report.status] ?? '#94a3b8'
        const icon = createColoredIcon(color)

        return (
          <Marker
            key={report.id}
            position={[report.latitude, report.longitude]}
            icon={icon}
          >
            <Popup maxWidth={280} className="urbanpulse-popup">
              <div style={{ fontFamily: 'system-ui, sans-serif', padding: '4px 0' }}>
                {/* Header de color */}
                <div style={{
                  background: color,
                  borderRadius: '8px 8px 0 0',
                  padding: '8px 12px',
                  marginBottom: '10px',
                  marginLeft: '-12px',
                  marginRight: '-12px',
                  marginTop: '-12px',
                }}>
                  <span style={{ color: 'white', fontSize: '11px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                    {STATUS_LABELS[report.status] ?? report.status}
                  </span>
                </div>

                <h3 style={{ fontWeight: 800, fontSize: '15px', color: '#0f172a', margin: '0 0 6px 0', lineHeight: 1.3 }}>
                  {report.title}
                </h3>

                {report.category && (
                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '8px' }}>
                    <span style={{
                      width: '8px', height: '8px', borderRadius: '50%', flexShrink: 0,
                      backgroundColor: report.category.color,
                    }} />
                    <span style={{ fontSize: '12px', color: '#64748b', fontWeight: 600 }}>
                      {report.category.name}
                    </span>
                  </div>
                )}

                <p style={{ fontSize: '13px', color: '#475569', margin: '0 0 8px 0', lineHeight: 1.5 }}>
                  {report.description.length > 100
                    ? report.description.slice(0, 100) + '…'
                    : report.description}
                </p>

                {report.location && (
                  <p style={{ fontSize: '11px', color: '#94a3b8', margin: '0 0 10px 0' }}>
                    📍 {report.location}
                  </p>
                )}

                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderTop: '1px solid #f1f5f9', paddingTop: '8px', marginTop: '4px' }}>
                  <span style={{ fontSize: '11px', color: '#94a3b8' }}>
                    👤 {report.user?.name ?? 'Anónimo'}
                  </span>
                  <a
                    href={`/public/explore/${report.id}`}
                    style={{
                      fontSize: '12px', fontWeight: 700, color: '#0284c7',
                      textDecoration: 'none', padding: '4px 10px',
                      background: '#e0f2fe', borderRadius: '6px',
                    }}
                  >
                    Ver detalles →
                  </a>
                </div>
              </div>
            </Popup>
          </Marker>
        )
      })}

      {/* Si no hay ningún pin, aviso centrado */}
      {!hasCoords && (
        <div style={{
          position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)',
          zIndex: 1000, pointerEvents: 'none',
        }}>
          <div style={{
            background: 'white', padding: '20px 28px', borderRadius: '16px',
            boxShadow: '0 8px 24px rgba(0,0,0,0.12)', textAlign: 'center',
          }}>
            <div style={{ fontSize: '40px', marginBottom: '8px' }}>📍</div>
            <p style={{ fontWeight: 700, color: '#334155', marginBottom: '4px' }}>Sin pines en este filtro</p>
            <p style={{ fontSize: '13px', color: '#94a3b8' }}>Crea un reporte usando GPS para que aparezca aquí</p>
          </div>
        </div>
      )}
    </MapContainer>
  )
}
