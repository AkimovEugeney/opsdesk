// Mentor probe: verify how Prisma reports an `update` whose filter matched no row.
require('dotenv/config')
const { PrismaClient, Prisma } = require('./dist/generated/prisma/client')
const { PrismaPg } = require('@prisma/adapter-pg')

const SELECT = { id: true, status: true, ownerId: true, updatedAt: true }

async function main() {
  const prisma = new PrismaClient({
    adapter: new PrismaPg({ connectionString: process.env.DATABASE_URL }),
  })

  const before = await prisma.appeal.findUnique({ where: { id: 4 }, select: SELECT })
  console.log('before:', JSON.stringify(before))

  try {
    const result = await prisma.appeal.update({
      where: { id: 4, status: { in: ['NEW', 'IN_PROGRESS'] } },
      data: { ownerId: 2, status: 'IN_PROGRESS' },
      select: SELECT,
    })
    console.log('unexpected success:', JSON.stringify(result))
  } catch (error) {
    console.log('error constructor:', error.constructor.name)
    console.log('error code:', error.code)
    console.log('error class exposed on Prisma namespace:', typeof Prisma.PrismaClientKnownRequestError)
    console.log('instanceof PrismaClientKnownRequestError:', error instanceof Prisma.PrismaClientKnownRequestError)
  }

  const after = await prisma.appeal.findUnique({ where: { id: 4 }, select: SELECT })
  console.log('after: ', JSON.stringify(after))
  console.log('unchanged:', JSON.stringify(before) === JSON.stringify(after))

  await prisma.$disconnect()
}

main().catch((error) => {
  console.error('probe failed:', error.message)
  process.exit(1)
})
