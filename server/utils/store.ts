import { appendFile, mkdir } from 'node:fs/promises'
import { dirname } from 'node:path'

/**
 * Minimal newline-delimited-JSON store so submissions are never lost before a
 * database is wired up. Replace with Prisma / Drizzle / an email service.
 */
export async function appendRecord(file: string, record: Record<string, unknown>) {
  await mkdir(dirname(file), { recursive: true })
  await appendFile(file, JSON.stringify({ ...record, at: new Date().toISOString() }) + '\n', 'utf8')
}

const hits = new Map<string, number[]>()

/** Simple in-memory rate limit: `max` requests per `windowMs` per IP. */
export function rateLimit(ip: string, max = 5, windowMs = 60_000) {
  const now = Date.now()
  const recent = (hits.get(ip) ?? []).filter((t) => now - t < windowMs)
  recent.push(now)
  hits.set(ip, recent)
  return recent.length <= max
}
