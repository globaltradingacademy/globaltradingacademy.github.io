import { useCallback, useEffect, useState } from 'react'
import { LogOut, RefreshCw } from 'lucide-react'
import { useAuth } from '../context/AuthContext'
import { fetchLeads, updateLeadStatus } from '../lib/leads'
import type { Lead } from '../types/lead'
import CTAButton from '../components/CTAButton'

export default function AdminLeadsPage() {
  const { user, loading: authLoading, login, logout, firebaseReady } = useAuth()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [authError, setAuthError] = useState('')
  const [authSubmitting, setAuthSubmitting] = useState(false)
  const [leads, setLeads] = useState<Lead[]>([])
  const [leadsLoading, setLeadsLoading] = useState(false)
  const [leadsError, setLeadsError] = useState('')
  const [updatingId, setUpdatingId] = useState<string | null>(null)

  const loadLeads = useCallback(async () => {
    setLeadsLoading(true)
    setLeadsError('')
    try {
      setLeads(await fetchLeads())
    } catch (err) {
      setLeadsError(err instanceof Error ? err.message : 'Failed to load leads')
    } finally {
      setLeadsLoading(false)
    }
  }, [])

  useEffect(() => {
    if (user) loadLeads()
  }, [user, loadLeads])

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setAuthError('')
    setAuthSubmitting(true)
    try {
      await login(email, password)
    } catch {
      setAuthError('Invalid email or password. Please try again.')
    } finally {
      setAuthSubmitting(false)
    }
  }

  const handleMarkContacted = async (leadId: string) => {
    setUpdatingId(leadId)
    try {
      await updateLeadStatus(leadId, 'contacted')
      setLeads((prev) => prev.map((l) => (l.id === leadId ? { ...l, status: 'contacted' } : l)))
    } catch (err) {
      setLeadsError(err instanceof Error ? err.message : 'Failed to update status')
    } finally {
      setUpdatingId(null)
    }
  }

  if (authLoading) {
    return (
      <div className="flex min-h-[50vh] items-center justify-center">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-accent border-t-transparent" />
      </div>
    )
  }

  if (!user) {
    return (
      <section className="bg-surface px-4 py-16 lg:px-8">
        <div className="mx-auto max-w-md rounded-2xl bg-white p-8 shadow-lg">
          <h1 className="mb-2 text-2xl font-bold text-navy">Admin Login</h1>
          <p className="mb-6 text-sm text-gray-500">Sign in to manage leads</p>
          {!firebaseReady && (
            <p className="mb-4 rounded-xl bg-amber-50 px-4 py-3 text-sm text-amber-800">
              Firebase is not configured. Add environment variables to enable login.
            </p>
          )}
          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label htmlFor="email" className="mb-1 block text-sm font-medium text-gray-700">Email</label>
              <input id="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} required className="w-full rounded-xl border border-gray-200 px-4 py-3 text-sm outline-none focus:border-accent focus:ring-1 focus:ring-accent" />
            </div>
            <div>
              <label htmlFor="password" className="mb-1 block text-sm font-medium text-gray-700">Password</label>
              <input id="password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} required className="w-full rounded-xl border border-gray-200 px-4 py-3 text-sm outline-none focus:border-accent focus:ring-1 focus:ring-accent" />
            </div>
            {authError && <p className="text-sm text-red-600">{authError}</p>}
            <CTAButton type="submit" disabled={authSubmitting || !firebaseReady} className="w-full">
              {authSubmitting ? 'Signing in...' : 'Sign In'}
            </CTAButton>
          </form>
        </div>
      </section>
    )
  }

  return (
    <section className="bg-surface px-4 py-10 lg:px-8 lg:py-14">
      <div className="mx-auto max-w-7xl">
        <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-2xl font-bold text-navy sm:text-3xl">Leads Dashboard</h1>
            <p className="text-sm text-gray-500">Signed in as {user.email}</p>
          </div>
          <div className="flex flex-wrap gap-3">
            <button type="button" onClick={loadLeads} disabled={leadsLoading} className="inline-flex items-center gap-2 rounded-full border border-gray-200 bg-white px-4 py-2 text-xs font-bold uppercase text-navy hover:bg-gray-50 disabled:opacity-60">
              <RefreshCw className={`h-4 w-4 ${leadsLoading ? 'animate-spin' : ''}`} />
              Refresh
            </button>
            <button type="button" onClick={logout} className="inline-flex items-center gap-2 rounded-full bg-navy px-4 py-2 text-xs font-bold uppercase text-white">
              <LogOut className="h-4 w-4" />
              Logout
            </button>
          </div>
        </div>

        {leadsError && (
          <div className="mb-4 rounded-xl bg-red-50 px-4 py-3 text-sm text-red-700">{leadsError}</div>
        )}

        {leadsLoading && leads.length === 0 ? (
          <div className="flex justify-center py-16">
            <div className="h-10 w-10 animate-spin rounded-full border-4 border-accent border-t-transparent" />
          </div>
        ) : leads.length === 0 ? (
          <div className="rounded-2xl bg-white py-16 text-center text-gray-500 shadow-md">No leads yet.</div>
        ) : (
          <div className="overflow-x-auto rounded-2xl bg-white shadow-md">
            <table className="min-w-full text-left text-sm">
              <thead className="border-b bg-gray-50 text-xs uppercase tracking-wide text-gray-500">
                <tr>
                  <th className="px-4 py-3">Date</th>
                  <th className="px-4 py-3">Name</th>
                  <th className="px-4 py-3">Phone</th>
                  <th className="px-4 py-3">City</th>
                  <th className="px-4 py-3">Occupation</th>
                  <th className="px-4 py-3">Course</th>
                  <th className="px-4 py-3">Message</th>
                  <th className="px-4 py-3">Status</th>
                  <th className="px-4 py-3">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y">
                {leads.map((lead) => (
                  <tr key={lead.id} className="hover:bg-gray-50">
                    <td className="whitespace-nowrap px-4 py-3 text-gray-500">
                      {lead.createdAt
                        ? lead.createdAt.toLocaleDateString('en-IN', {
                            day: '2-digit',
                            month: 'short',
                            year: 'numeric',
                            hour: '2-digit',
                            minute: '2-digit',
                          })
                        : '—'}
                    </td>
                    <td className="px-4 py-3 font-medium text-navy">{lead.name}</td>
                    <td className="px-4 py-3">{lead.phone}</td>
                    <td className="px-4 py-3">{lead.city}</td>
                    <td className="px-4 py-3">{lead.occupation}</td>
                    <td className="px-4 py-3">{lead.course}</td>
                    <td className="max-w-[200px] truncate px-4 py-3" title={lead.message}>{lead.message}</td>
                    <td className="px-4 py-3">
                      <span className={`rounded-full px-2.5 py-1 text-xs font-semibold uppercase ${lead.status === 'contacted' ? 'bg-green-100 text-green-700' : 'bg-accent/10 text-accent'}`}>
                        {lead.status}
                      </span>
                    </td>
                    <td className="px-4 py-3">
                      {lead.status === 'new' ? (
                        <button type="button" disabled={updatingId === lead.id} onClick={() => handleMarkContacted(lead.id)} className="rounded-full bg-accent px-3 py-1.5 text-xs font-bold uppercase text-white disabled:opacity-50">
                          {updatingId === lead.id ? '...' : 'Mark Contacted'}
                        </button>
                      ) : (
                        <span className="text-xs text-gray-400">Done</span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </section>
  )
}
