import { FoundSubstance, Friend, ReceivedInvite, RedirectResponse, SentInvite, User } from '../types'

const BASE_URL = import.meta.env.PUBLIC_API_BASE_URL ?? '/api'

export class ApiError extends Error {
  status: number

  constructor(status: number, message: string) {
    super(message)
    this.status = status
  }
}

async function request<T>(path: string, init?: RequestInit): Promise<T> {
  const res = await fetch(`${BASE_URL}${path}`, {
    ...init,
    credentials: 'include',
    headers: {
      ...(init?.body ? { 'Content-Type': 'application/json' } : {}),
      ...init?.headers
    }
  })

  if (!res.ok) {
    throw new ApiError(res.status, await res.text().catch(() => res.statusText))
  }

  if (res.status === 204) {
    return undefined as T
  }

  return res.json() as Promise<T>
}

export function loginMastodon(mastodonInstance: string) {
  return request<RedirectResponse>('/auth/logins', {
    method: 'POST',
    body: JSON.stringify({ mastodon_instance: mastodonInstance })
  })
}

export function createSession(code: string, state: string) {
  return request<User>('/auth/session', {
    method: 'POST',
    body: JSON.stringify({ code, state })
  })
}

export function getSession() {
  return request<User>('/auth/session')
}

export function deleteSession() {
  return request<void>('/auth/session', { method: 'DELETE' })
}

export function pushSubstance(un: number) {
  return request<FoundSubstance>(`/substances/${un}`, { method: 'POST' })
}

export async function getSubstance(un: number): Promise<FoundSubstance | null> {
  try {
    return await request<FoundSubstance>(`/substances/${un}`)
  } catch (e) {
    if (e instanceof ApiError && e.status === 404) {
      return null
    }
    throw e
  }
}

export function listSubstances() {
  return request<FoundSubstance[]>('/substances')
}

export function inviteFriend(handle: string) {
  return request<void>('/friends/invite', {
    method: 'POST',
    body: JSON.stringify({ handle })
  })
}

export function listReceivedInvites() {
  return request<ReceivedInvite[]>('/friends/invites/received')
}

export function listSentInvites() {
  return request<SentInvite[]>('/friends/invites/sent')
}

export function acceptInvite(inviteId: string) {
  return request<void>(`/friends/invites/${inviteId}/accept`, { method: 'POST' })
}

export function denyInvite(inviteId: string) {
  return request<void>(`/friends/invites/${inviteId}/deny`, { method: 'POST' })
}

export function listFriends() {
  return request<Friend[]>('/friends')
}

export function friendSubstances(friendId: string) {
  return request<FoundSubstance[]>(`/friends/${friendId}/substances`)
}
