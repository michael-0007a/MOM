'use client';

import { useState, useEffect } from 'react';
import { LogIn, Users, Eye, EyeOff, ChevronDown, ChevronRight } from 'lucide-react';
import React from 'react';

export default function Admin() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loginData, setLoginData] = useState({ username: '', password: '' });
  const [showPassword, setShowPassword] = useState(false);
  const [adminToken, setAdminToken] = useState('');

  type InterestStatus = 'high' | 'medium' | 'low' | 'unassigned';
  type FirestoreTimestamp = { seconds?: number; _seconds?: number; nanoseconds?: number; _nanoseconds?: number };
  type AdminLead = {
    id: string;
    fullName: string;
    email: string;
    phone?: string;
    cityState?: string;
    ownBusiness?: 'yes' | 'no';
    businessName?: string;
    businessIndustry?: string;
    interestReason?: string;
    estimatedBudget?: string;
    hasSpace?: 'yes' | 'no';
    spaceLocation?: string;
    spaceSize?: string;
    startTimeline?: string;
    hearAboutUs?: string;
    confirm?: boolean;
    interestStatus?: InterestStatus;
    createdAt?: FirestoreTimestamp | string | Date;
  };

  const [leads, setLeads] = useState<AdminLead[]>([]);
  const [expanded, setExpanded] = useState<Record<string, boolean>>({});

  const IDLE_TIMEOUT_MS = 1000 * 60 * 30; // 30 minutes inactivity
  const SESSION_MAX_AGE_MS = 1000 * 60 * 60 * 8; // 8 hours absolute max

  type AdminSession = {
    token: string;
    createdAt: number;
    lastActiveAt: number;
    expiresAt: number; // sliding expiry (idle-based)
  };

  const saveSession = (session: AdminSession) => {
    try { localStorage.setItem('ADMIN_SESSION', JSON.stringify(session)); } catch {}
  };
  const loadSession = (): AdminSession | null => {
    try {
      const raw = localStorage.getItem('ADMIN_SESSION');
      if (!raw) return null;
      return JSON.parse(raw) as AdminSession;
    } catch { return null; }
  };
  const clearSession = () => {
    try { localStorage.removeItem('ADMIN_SESSION'); } catch {}
  };

  // Load stored session/token on mount
  useEffect(() => {
    const savedToken = typeof window !== 'undefined' ? localStorage.getItem('ADMIN_TOKEN') : '';
    const sess = typeof window !== 'undefined' ? loadSession() : null;
    const now = Date.now();
    if (sess && sess.token && sess.expiresAt > now && (now - sess.createdAt) < SESSION_MAX_AGE_MS) {
      setAdminToken(sess.token);
      setIsLoggedIn(true);
      // refresh sliding expiry on load
      const refreshed: AdminSession = { ...sess, lastActiveAt: now, expiresAt: now + IDLE_TIMEOUT_MS };
      saveSession(refreshed);
    } else if (savedToken) {
      // backward-compat: if only token exists, create a session
      const newSess: AdminSession = {
        token: savedToken,
        createdAt: now,
        lastActiveAt: now,
        expiresAt: now + IDLE_TIMEOUT_MS,
      };
      saveSession(newSess);
      setAdminToken(savedToken);
      setIsLoggedIn(true);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Heartbeat + activity listeners for idle timeout and max age
  useEffect(() => {
    if (!isLoggedIn) return;

    const onActivity = () => {
      const sess = loadSession();
      const now = Date.now();
      if (!sess) return;
      const maxAgeExceeded = (now - sess.createdAt) >= SESSION_MAX_AGE_MS;
      if (maxAgeExceeded) return; // don't extend past max age
      const updated: AdminSession = { ...sess, lastActiveAt: now, expiresAt: now + IDLE_TIMEOUT_MS };
      saveSession(updated);
    };

    window.addEventListener('mousemove', onActivity);
    window.addEventListener('keydown', onActivity);
    window.addEventListener('click', onActivity);

    const interval = window.setInterval(() => {
      const sess = loadSession();
      const now = Date.now();
      if (!sess) return;
      const expired = now > sess.expiresAt || (now - sess.createdAt) >= SESSION_MAX_AGE_MS;
      if (expired) {
        alert('Session expired. Please log in again.');
        handleLogout();
      }
    }, 15000); // check every 15s

    return () => {
      window.removeEventListener('mousemove', onActivity);
      window.removeEventListener('keydown', onActivity);
      window.removeEventListener('click', onActivity);
      window.clearInterval(interval);
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isLoggedIn]);

  // Fetch leads once logged in and token available
  useEffect(() => {
    if (isLoggedIn && adminToken) {
      fetchLeads();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isLoggedIn, adminToken]);

  const fetchLeads = async () => {
    try {
      if (!adminToken) return;
      const res = await fetch('/api/admin/leads', { headers: { Authorization: `Bearer ${adminToken}` } });
      if (res.status === 401) {
        alert('Unauthorized. Please log out and log in using your ADMIN_TOKEN as the password.');
        return;
      }
      if (!res.ok) throw new Error('Failed to load leads');
      const data = await res.json();
      if (Array.isArray(data.items)) {
        const mapped: AdminLead[] = data.items.map((it: AdminLead) => ({
          id: it.id,
          fullName: it.fullName,
          email: it.email,
          phone: it.phone,
          cityState: it.cityState,
          ownBusiness: it.ownBusiness,
          businessName: it.businessName,
          businessIndustry: it.businessIndustry,
          interestReason: it.interestReason,
          estimatedBudget: it.estimatedBudget,
          hasSpace: it.hasSpace,
          spaceLocation: it.spaceLocation,
          spaceSize: it.spaceSize,
          startTimeline: it.startTimeline,
          hearAboutUs: it.hearAboutUs,
          confirm: it.confirm,
          interestStatus: (it.interestStatus || 'unassigned') as InterestStatus,
          createdAt: it.createdAt,
        }));
        setLeads(mapped);
      }
    } catch (e) {
      console.error(e);
      alert('Could not load leads.');
    }
  };

  const statusClass = (s?: string) => (
    s === 'high' ? 'bg-green-100 text-green-700' :
    s === 'medium' ? 'bg-yellow-100 text-yellow-700' :
    s === 'low' ? 'bg-red-100 text-red-700' :
    'bg-gray-100 text-gray-700'
  );

  const updateStatus = async (id: string, status: InterestStatus) => {
    try {
      const res = await fetch(`/api/admin/leads/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${adminToken}` },
        body: JSON.stringify({ interestStatus: status }),
      });
      if (!res.ok) throw new Error('Failed to update');
      setLeads(prev => prev.map(l => l.id === id ? { ...l, interestStatus: status } : l));
    } catch (e) {
      console.error(e);
      alert('Failed to update status');
    }
  };

  const formatDate = (createdAt: { _seconds?: number; seconds?: number } | string | Date | undefined) => {
    try {
      if (!createdAt) return '';
      if (typeof createdAt === 'object' && createdAt !== null && ('_seconds' in createdAt || 'seconds' in createdAt)) {
        const sec = (createdAt as { _seconds?: number; seconds?: number })._seconds ?? (createdAt as { seconds?: number }).seconds;
        if (sec) return new Date(sec * 1000).toLocaleString();
      }
      if (typeof createdAt === 'string' || createdAt instanceof Date) {
        const d = new Date(createdAt);
        if (!isNaN(d.getTime())) return d.toLocaleString();
      }
      return '';
    } catch {
      return '';
    }
  };

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (loginData.password) {
      setIsLoggedIn(true);
      setAdminToken(loginData.password);
      if (typeof window !== 'undefined') {
        localStorage.setItem('ADMIN_TOKEN', loginData.password);
        const now = Date.now();
        const sess: AdminSession = {
          token: loginData.password,
          createdAt: now,
          lastActiveAt: now,
          expiresAt: now + IDLE_TIMEOUT_MS,
        };
        saveSession(sess);
      }
      setLoginData({ username: '', password: '' });
    } else {
      alert('Enter the admin token in the password field.');
    }
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    if (typeof window !== 'undefined') {
      localStorage.removeItem('ADMIN_TOKEN');
      clearSession();
    }
  };

  const toggleExpand = (id: string) => setExpanded(prev => ({ ...prev, [id]: !prev[id] }));

  // Login Page
  if (!isLoggedIn) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-blue-100 flex items-center justify-center px-4">
        <div className="max-w-md w-full bg-white rounded-3xl shadow-2xl p-8 md:p-12">
          <div className="text-center mb-8">
            <div className="w-20 h-20 bg-blue-800 rounded-full flex items-center justify-center mx-auto mb-4">
              <LogIn className="w-10 h-10 text-white" />
            </div>
            <h1 className="text-3xl font-bold text-blue-800 mb-2">Admin Login</h1>
            <p className="text-gray-600">Access the admin dashboard</p>
          </div>

          <form onSubmit={handleLogin} className="space-y-6">
            <div>
              <label htmlFor="username" className="block text-sm font-semibold text-gray-700 mb-2">Username</label>
              <input id="username" type="text" value={loginData.username} onChange={(e) => setLoginData({ ...loginData, username: e.target.value })} className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-blue-800 focus:outline-none transition-colors" placeholder="Enter username" required />
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-semibold text-gray-700 mb-2">Password</label>
              <div className="relative">
                <input id="password" type={showPassword ? 'text' : 'password'} value={loginData.password} onChange={(e) => setLoginData({ ...loginData, password: e.target.value })} className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-blue-800 focus:outline-none transition-colors" placeholder="Enter ADMIN_TOKEN" required />
                <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-blue-800">
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
            </div>

            <button type="submit" className="w-full bg-blue-800 text-white py-4 rounded-full text-lg font-semibold hover:bg-blue-900 transform hover:scale-105 transition-all duration-300 shadow-lg">Login</button>
          </form>

          <div className="mt-6 p-4 bg-blue-50 rounded-xl">
            <p className="text-sm text-gray-700 text-center">Use your ADMIN_TOKEN as the password to log in.</p>
          </div>
        </div>
      </div>
    );
  }

  // Franchise Leads Table (only section)
  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
          <h1 className="text-2xl font-bold text-blue-800 flex items-center gap-2"><Users className="w-5 h-5" /> Franchise Requests</h1>
          <button onClick={handleLogout} className="bg-red-500 text-white px-4 py-2 rounded-full hover:bg-red-600 transition-colors">Logout</button>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Mobile view: stacked cards */}
        <div className="md:hidden space-y-4">
          {leads.map((lead) => (
            <div key={`card-${lead.id}`} className="bg-white rounded-xl shadow border border-gray-100 p-4">
              <div className="flex items-start justify-between gap-3">
                <div>
                  <div className="text-base font-bold text-gray-900">{lead.fullName || '—'}</div>
                  <div className="text-xs text-gray-500">{formatDate(lead.createdAt)}</div>
                </div>
                <div className="flex items-center gap-2">
                  <span className={`px-2 py-0.5 rounded-full text-[10px] font-semibold ${statusClass(lead.interestStatus)}`}>
                    {lead.interestStatus || 'unassigned'}
                  </span>
                  <select
                    value={lead.interestStatus || 'unassigned'}
                    onChange={(e) => updateStatus(lead.id, e.target.value as InterestStatus)}
                    className="border border-gray-300 rounded-md text-xs px-1.5 py-1 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="high">high</option>
                    <option value="medium">medium</option>
                    <option value="low">low</option>
                    <option value="unassigned">unassigned</option>
                  </select>
                </div>
              </div>

              <div className="mt-3 grid grid-cols-2 gap-x-4 gap-y-1 text-sm">
                <div className="text-gray-500">Email</div>
                <div className="text-gray-800 truncate">{lead.email || '—'}</div>
                <div className="text-gray-500">Phone</div>
                <div className="text-gray-800">{lead.phone || '—'}</div>
                <div className="text-gray-500">City/State</div>
                <div className="text-gray-800">{lead.cityState || '—'}</div>
                {/* Budget moved to details */}
              </div>

              <button
                onClick={() => toggleExpand(lead.id)}
                className="mt-3 inline-flex items-center gap-1 text-blue-700 hover:text-blue-900 font-semibold text-sm"
              >
                {expanded[lead.id] ? <ChevronDown className="w-4 h-4" /> : <ChevronRight className="w-4 h-4" />}
                {expanded[lead.id] ? 'Hide details' : 'View details'}
              </button>

              {expanded[lead.id] && (
                <div className="mt-3 border-t border-gray-200 pt-3 space-y-3">
                  <div className="grid grid-cols-1 gap-2 text-sm">
                    <div className="grid grid-cols-2 gap-x-4 gap-y-1">
                      <div className="text-gray-500">Own Business</div>
                      <div className="text-gray-800">{lead.ownBusiness ? (lead.ownBusiness === 'yes' ? 'Yes' : 'No') : '—'}</div>
                      <div className="text-gray-500">Business Name</div>
                      <div className="text-gray-800">{lead.businessName || '—'}</div>
                      <div className="text-gray-500">Industry</div>
                      <div className="text-gray-800">{lead.businessIndustry || '—'}</div>
                      <div className="text-gray-500">Space Location</div>
                      <div className="text-gray-800">{lead.spaceLocation || '—'}</div>
                      <div className="text-gray-500">Space Size</div>
                      <div className="text-gray-800">{lead.spaceSize || '—'}</div>
                      <div className="text-gray-500">Budget</div>
                      <div className="text-gray-800">{lead.estimatedBudget || '—'}</div>
                      <div className="text-gray-500">Has Space</div>
                      <div className="text-gray-800">{lead.hasSpace === 'yes' ? 'Yes' : lead.hasSpace === 'no' ? 'No' : '—'}</div>
                      <div className="text-gray-500">Start Timeline</div>
                      <div className="text-gray-800">{lead.startTimeline || '—'}</div>
                      <div className="text-gray-500">Heard About Us</div>
                      <div className="text-gray-800">{lead.hearAboutUs || '—'}</div>
                      <div className="text-gray-500">Confirmed</div>
                      <div className="text-gray-800">{lead.confirm ? 'Yes' : 'No'}</div>
                    </div>
                    <div>
                      <div className="text-gray-800 font-semibold mb-1">Interest Reason</div>
                      <div className="text-gray-700 whitespace-pre-wrap bg-gray-50 rounded-md border border-gray-200 p-2">{lead.interestReason || '—'}</div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          ))}
          {leads.length === 0 && (
            <div className="text-center text-gray-600">No leads yet.</div>
          )}
        </div>

        {/* Desktop/table view */}
        <div className="hidden md:block bg-white rounded-2xl shadow-md">
          <div className="relative w-full overflow-x-auto">
            <table className="w-full min-w-[1080px]">
              <thead className="bg-blue-50">
                <tr>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-blue-800">Name</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-blue-800">Email</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-blue-800">Phone</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-blue-800">City/State</th>
                  {/* Budget column removed */}
                  {/* Has Space column removed */}
                  <th className="px-6 py-4 text-left text-sm font-semibold text-blue-800">Status</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-blue-800">Details</th>
                </tr>
              </thead>
              <tbody>
                {leads.map((lead) => (
                  <React.Fragment key={`row-${lead.id}`}>
                    <tr className="border-t border-gray-100 hover:bg-blue-50/30 transition-colors">
                      <td className="px-6 py-4 font-medium text-gray-800">{lead.fullName || '—'}</td>
                      <td className="px-6 py-4 text-gray-700">{lead.email || '—'}</td>
                      <td className="px-6 py-4 text-gray-700">{lead.phone || '—'}</td>
                      <td className="px-6 py-4 text-gray-700">{lead.cityState || '—'}</td>
                      {/* Budget cell removed */}
                      {/* Has Space cell removed */}
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-2">
                          <span className={`px-2 py-0.5 rounded-full text-xs font-semibold ${statusClass(lead.interestStatus)}`}>
                            {lead.interestStatus || 'unassigned'}
                          </span>
                          <select
                            value={lead.interestStatus || 'unassigned'}
                            onChange={(e) => updateStatus(lead.id, e.target.value as InterestStatus)}
                            className="border border-gray-300 rounded-md text-sm px-2 py-1 focus:outline-none focus:ring-2 focus:ring-blue-500"
                          >
                            <option value="high">high</option>
                            <option value="medium">medium</option>
                            <option value="low">low</option>
                            <option value="unassigned">unassigned</option>
                          </select>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <button onClick={() => toggleExpand(lead.id)} className="inline-flex items-center gap-1 text-blue-700 hover:text-blue-900 font-semibold">
                          {expanded[lead.id] ? <ChevronDown className="w-4 h-4" /> : <ChevronRight className="w-4 h-4" />}
                          {expanded[lead.id] ? 'Hide' : 'View'}
                        </button>
                      </td>
                    </tr>
                    {expanded[lead.id] && (
                      <tr key={`${lead.id}-details`} className="bg-blue-50/30">
                        <td colSpan={6} className="px-6 py-4">
                          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 text-sm">
                            <Detail label="Own Business" value={lead.ownBusiness ? (lead.ownBusiness === 'yes' ? 'Yes' : 'No') : '—'} />
                            <Detail label="Business Name" value={lead.businessName || '—'} />
                            <Detail label="Business Industry" value={lead.businessIndustry || '—'} />
                            <Detail label="Space Location" value={lead.spaceLocation || '—'} />
                            <Detail label="Space Size" value={lead.spaceSize || '—'} />
                            <Detail label="Budget" value={lead.estimatedBudget || '—'} />
                            <Detail label="Has Space" value={lead.hasSpace === 'yes' ? 'Yes' : lead.hasSpace === 'no' ? 'No' : '—'} />
                            <Detail label="Start Timeline" value={lead.startTimeline || '—'} />
                            <Detail label="Heard About Us" value={lead.hearAboutUs || '—'} />
                            <Detail label="Confirmed" value={lead.confirm ? 'Yes' : 'No'} />
                            <Detail label="Submitted At" value={formatDate(lead.createdAt)} />
                            <div className="md:col-span-2 lg:col-span-3">
                              <div className="text-gray-800 font-semibold mb-1">Interest Reason</div>
                              <div className="text-gray-700 whitespace-pre-wrap bg-white rounded-md border border-gray-200 p-3">{lead.interestReason || '—'}</div>
                            </div>
                          </div>
                        </td>
                      </tr>
                    )}
                  </React.Fragment>
                ))}
                {leads.length === 0 && (
                  <tr>
                    <td colSpan={8} className="px-6 py-8 text-center text-gray-600">No leads yet.</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

function Detail({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <div className="text-gray-800 font-semibold">{label}</div>
      <div className="text-gray-700">{value}</div>
    </div>
  );
}
