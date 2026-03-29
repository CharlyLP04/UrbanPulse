'use client'

import Link from 'next/link'
import styles from './LandingPage.module.css'

const navItems = [
  { label: 'Inicio', href: '#inicio' },
  { label: 'Reportes', href: '/public/explore' },
  { label: 'Cómo Funciona', href: '#como-funciona' },
  { label: 'Contacto', href: '#contacto' },
]

export default function LandingPage() {

  return (
    <div className={styles.page}>


      <section id="inicio" className={styles.hero}>
        <div className={styles.heroContent}>
          <h1>Transformando Quejas en Acción</h1>
          <p className={styles.heroTagline}>
            &quot;De la queja individual a la presión social colectiva&quot;
          </p>
          <p className={styles.heroDescription}>
            UrbanPulse es la plataforma donde los ciudadanos reportan, votan y priorizan las fallas
            urbanas de su ciudad. Tu voz cuenta, tu voto importa.
          </p>
          <div className={styles.heroButtons}>
            <Link href="/auth/register" className={styles.btnPrimary}>
              Crear Reporte Ahora
            </Link>
            <Link href="#como-funciona" className={styles.btnSecondary}>
              Ver Cómo Funciona
            </Link>
          </div>
        </div>
      </section>

      <section className={styles.stats}>
        <div className={styles.statsContainer}>
          <div className={styles.statCard}>
            <div className={styles.statNumber}>2,847</div>
            <div className={styles.statLabel}>Reportes Activos</div>
          </div>
          <div className={styles.statCard}>
            <div className={styles.statNumber}>1,523</div>
            <div className={styles.statLabel}>Problemas Resueltos</div>
          </div>
          <div className={styles.statCard}>
            <div className={styles.statNumber}>15,392</div>
            <div className={styles.statLabel}>Ciudadanos Activos</div>
          </div>
          <div className={styles.statCard}>
            <div className={styles.statNumber}>89%</div>
            <div className={styles.statLabel}>Tasa de Respuesta</div>
          </div>
        </div>
      </section>

      <section className={styles.features} id="como-funciona">
        <div className={styles.featuresContainer}>
          <h2 className={styles.sectionTitle}>¿Cómo Funciona?</h2>
          <p className={styles.sectionSubtitle}>Tres pasos simples para generar impacto real</p>

          <div className={styles.featuresGrid}>
            <div className={styles.featureCard}>
              <div className={styles.featureIcon}>📸</div>
              <h3 className={styles.featureTitle}>1. Reporta</h3>
              <p className={styles.featureDescription}>
                Toma una foto del problema urbano, describe la situación y ubícala en el mapa. Toma
                menos de 2 minutos.
              </p>
            </div>
            <div className={styles.featureCard}>
              <div className={styles.featureIcon}>👍</div>
              <h3 className={styles.featureTitle}>2. Vota</h3>
              <p className={styles.featureDescription}>
                Apoya los reportes de otros ciudadanos. Mientras más votos, más presión social y
                mayor prioridad para las autoridades.
              </p>
            </div>
            <div className={styles.featureCard}>
              <div className={styles.featureIcon}>✅</div>
              <h3 className={styles.featureTitle}>3. Rastrea</h3>
              <p className={styles.featureDescription}>
                Sigue el estatus de tu reporte en tiempo real. Transparencia total desde la denuncia
                hasta la solución.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className={styles.ctaSection}>
        <h2>¿Listo para hacer la diferencia?</h2>
        <p>Únete a miles de ciudadanos comprometidos con mejorar su ciudad</p>
        <Link href="/auth/register" className={styles.btnWhite}>
          Registrarme Gratis
        </Link>
      </section>

      <footer id="contacto" className={styles.footer}>
        <div className={styles.footerContainer}>
          <div className={styles.footerSection}>
            <h3>UrbanPulse</h3>
            <p>Auditoría ciudadana y gestión urbana colaborativa.</p>
            <p style={{ marginTop: '1rem' }}>
              <span className={`${styles.statusBadge} ${styles.badgeSuccess}`}>Sistema Operativo</span>
            </p>
          </div>
          <div className={styles.footerSection}>
            <h3>Navegación</h3>
            <ul>
              <li>
                <Link href="#inicio">Inicio</Link>
              </li>
              <li>
                <Link href="/public/explore">Ver Reportes</Link>
              </li>
              <li>
                <Link href="#como-funciona">Cómo Funciona</Link>
              </li>
              <li>
                <Link href="#contacto">Contacto</Link>
              </li>
            </ul>
          </div>
          <div className={styles.footerSection}>
            <h3>Legal</h3>
            <ul>
              <li>
                <Link href="#">Términos de Uso</Link>
              </li>
              <li>
                <Link href="#">Privacidad</Link>
              </li>
              <li>
                <Link href="#">Accesibilidad</Link>
              </li>
              <li>
                <Link href="#">API Pública</Link>
              </li>
            </ul>
          </div>
          <div className={styles.footerSection}>
            <h3>Desarrollado por</h3>
            <p>Squad 3 - Ingeniería de Software</p>
            <p>Enero 2026</p>
            <p style={{ marginTop: '1rem' }}>
              <span className={`${styles.statusBadge} ${styles.badgeInfo}`}>Tech Lead: Carlos</span>
            </p>
          </div>
        </div>
        <div className={styles.footerBottom}>
          <p>&copy; 2026 UrbanPulse. Todos los derechos reservados.</p>
        </div>
      </footer>
    </div>
  )
}
