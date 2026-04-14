import type { NextRequest } from 'next/server'
import { POST } from '@/app/api/reports/[id]/vote/route'
import { prisma } from '@/lib/db'
import { verifyAccessToken } from '@/lib/auth'

jest.mock('@/lib/db', () => ({
  prisma: {
    user: {
      findUnique: jest.fn(),
    },
    report: {
      findUnique: jest.fn(),
    },
    vote: {
      findUnique: jest.fn(),
      create: jest.fn(),
      count: jest.fn(),
    },
  },
}))

jest.mock('@/lib/auth', () => ({
  verifyAccessToken: jest.fn(),
}))

describe('Report Vote API', () => {
  const mockFindUser = prisma.user.findUnique as jest.Mock
  const mockFindReport = prisma.report.findUnique as jest.Mock
  const mockFindVote = prisma.vote.findUnique as jest.Mock
  const mockCreateVote = prisma.vote.create as jest.Mock
  const mockCountVotes = prisma.vote.count as jest.Mock
  const mockVerifyAccessToken = verifyAccessToken as jest.Mock

  beforeEach(() => {
    jest.clearAllMocks()
  })

  test('responde 401 si no hay token', async () => {
    const request = {
      cookies: {
        get: jest.fn().mockReturnValue(undefined),
      },
    } as unknown as NextRequest

    const response = await POST(request, { params: { id: 'report-1' } })

    expect(response.status).toBe(401)
    expect(mockVerifyAccessToken).not.toHaveBeenCalled()
  })

  test('responde 409 si el usuario ya votó', async () => {
    mockVerifyAccessToken.mockResolvedValue({
      userId: 'user-1',
      email: 'user@test.com',
      role: 'user',
    })
    mockFindUser.mockResolvedValue({ id: 'user-1' })
    mockFindReport.mockResolvedValue({ id: 'report-1' })
    mockFindVote.mockResolvedValue({ id: 'vote-1' })
    mockCountVotes.mockResolvedValue(5)

    const request = {
      cookies: {
        get: jest.fn().mockReturnValue({ value: 'valid-token' }),
      },
    } as unknown as NextRequest

    const response = await POST(request, { params: { id: 'report-1' } })
    const data = await response.json()

    expect(response.status).toBe(409)
    expect(data.data.votesCount).toBe(5)
    expect(mockCreateVote).not.toHaveBeenCalled()
  })

  test('registra el voto y regresa conteo actualizado', async () => {
    mockVerifyAccessToken.mockResolvedValue({
      userId: 'user-1',
      email: 'user@test.com',
      role: 'user',
    })
    mockFindUser.mockResolvedValue({ id: 'user-1' })
    mockFindReport.mockResolvedValue({ id: 'report-1' })
    mockFindVote.mockResolvedValue(null)
    mockCreateVote.mockResolvedValue({ id: 'vote-1' })
    mockCountVotes.mockResolvedValue(6)

    const request = {
      cookies: {
        get: jest.fn().mockReturnValue({ value: 'valid-token' }),
      },
    } as unknown as NextRequest

    const response = await POST(request, { params: { id: 'report-1' } })
    const data = await response.json()

    expect(response.status).toBe(201)
    expect(mockCreateVote).toHaveBeenCalledWith({
      data: {
        reportId: 'report-1',
        userId: 'user-1',
        voteType: 'UP',
      },
    })
    expect(data.data.votesCount).toBe(6)
  })
})
