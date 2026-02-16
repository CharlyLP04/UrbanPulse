import { Bebas_Neue, IBM_Plex_Sans } from 'next/font/google'
import CreateReportForm from '@/components/reports/create-report/CreateReportForm'
import CreateReportHeader from '@/components/reports/create-report/CreateReportHeader'
import CreateReportNavbar from '@/components/reports/create-report/CreateReportNavbar'
import styles from '@/components/reports/create-report/CreateReportPage.module.css'

const bebasNeue = Bebas_Neue({
  weight: '400',
  subsets: ['latin'],
  variable: '--font-bebas-neue',
})

const ibmPlexSans = IBM_Plex_Sans({
  weight: ['400', '500', '600', '700'],
  subsets: ['latin'],
  variable: '--font-ibm-plex',
})

export const metadata = {
  title: 'Crear Reporte - UrbanPulse',
  description: 'Formulario para crear un nuevo reporte ciudadano',
}

export default function CreateReportPage() {
  return (
    <div className={`${styles.page} ${bebasNeue.variable} ${ibmPlexSans.variable}`}>
      <CreateReportNavbar />
      <CreateReportHeader />
      <CreateReportForm />
    </div>
  )
}
