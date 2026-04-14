const bcryptjs = require('bcryptjs')
const { PrismaClient, Role } = require('@prisma/client')

const prisma = new PrismaClient()

const categories = [
  {
    name: 'Bacheo',
    description: 'Reportes relacionados con baches y pavimentación dañada.',
    color: '#E67E22',
  },
  {
    name: 'Alumbrado',
    description: 'Fallos en luminarias, postes o alumbrado público.',
    color: '#F1C40F',
  },
  {
    name: 'Fuga de agua',
    description: 'Fugas, tuberías dañadas o desperdicio de agua.',
    color: '#3498DB',
  },
  {
    name: 'Basura',
    description: 'Acumulación de residuos o problemas de limpieza urbana.',
    color: '#2ECC71',
  },
  {
    name: 'Seguridad',
    description: 'Situaciones que requieren atención de seguridad pública.',
    color: '#E74C3C',
  },
  {
    name: 'Parques',
    description: 'Problemas en parques, jardines y áreas verdes.',
    color: '#27AE60',
  },
  {
    name: 'Transporte',
    description: 'Incidencias relacionadas con transporte y movilidad.',
    color: '#8E44AD',
  },
]

async function upsertCategories() {
  for (const category of categories) {
    await prisma.category.upsert({
      where: { name: category.name },
      update: {
        description: category.description,
        color: category.color,
      },
      create: category,
    })
  }
}

async function upsertAdmin() {
  const adminEmail = process.env.SEED_ADMIN_EMAIL || 'admin@urbanpulse.local'
  const adminPassword = process.env.SEED_ADMIN_PASSWORD || 'UrbanPulseAdmin2026!'
  const adminName = process.env.SEED_ADMIN_NAME || 'Administrador UrbanPulse'
  const passwordHash = await bcryptjs.hash(adminPassword, 10)

  await prisma.user.upsert({
    where: { email: adminEmail },
    update: {
      name: adminName,
      role: Role.ADMIN,
      emailVerified: true,
    },
    create: {
      email: adminEmail,
      name: adminName,
      password: passwordHash,
      role: Role.ADMIN,
      emailVerified: true,
    },
  })

  console.log(`Admin listo: ${adminEmail}`)
  if (!process.env.SEED_ADMIN_PASSWORD) {
    console.log('Password admin por defecto: UrbanPulseAdmin2026!')
  }
}

async function main() {
  await upsertCategories()
  await upsertAdmin()
  console.log('Seed completado correctamente.')
}

main()
  .catch((error) => {
    console.error('Error ejecutando seed:', error)
    process.exitCode = 1
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
