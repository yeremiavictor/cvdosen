import { useState, useEffect } from 'react'
import { useAuth } from '../context/AuthContext'
import { supabase } from '../lib/supabase'
import { Users, CheckCircle, XCircle, FileText, Eye } from 'lucide-react'

export default function AdminDashboard() {
  const { user } = useAuth()
  const [pendingDosen, setPendingDosen] = useState([])
  const [allDosen, setAllDosen] = useState([])
  const [contactMessages, setContactMessages] = useState([])
  const [loading, setLoading] = useState(true)
  const [activeTab, setActiveTab] = useState('verification')

  useEffect(() => {
    if (user) {
      fetchPendingDosen()
      fetchAllDosen()
      fetchContactMessages()
    }
  }, [user])

  const fetchPendingDosen = async () => {
    try {
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('role', 'dosen')
        .eq('verified', false)

      if (error) throw error
      setPendingDosen(data || [])
    } catch (error) {
      console.error('Error fetching pending dosen:', error)
    }
  }

  const fetchAllDosen = async () => {
    try {
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('role', 'dosen')
        .order('created_at', { ascending: false })

      if (error) throw error
      setAllDosen(data || [])
    } catch (error) {
      console.error('Error fetching all dosen:', error)
    } finally {
      setLoading(false)
    }
  }

  const fetchContactMessages = async () => {
    try {
      const { data, error } = await supabase
        .from('contact_messages')
        .select('*')
        .order('created_at', { ascending: false })

      if (error) throw error
      setContactMessages(data || [])
    } catch (error) {
      console.error('Error fetching messages:', error)
    }
  }

  const handleVerify = async (userId) => {
    if (!confirm('Verifikasi dosen ini?')) return

    try {
      const { error } = await supabase
        .from('profiles')
        .update({ verified: true })
        .eq('id', userId)

      if (error) throw error
      alert('Dosen berhasil diverifikasi!')
      fetchPendingDosen()
      fetchAllDosen()
    } catch (error) {
      alert('Gagal memverifikasi: ' + error.message)
    }
  }

  const handleReject = async (userId) => {
    if (!confirm('Tolak pendaftaran dosen ini?')) return

    try {
      const { error } = await supabase
        .from('profiles')
        .update({ verified: false, role: 'user' })
        .eq('id', userId)

      if (error) throw error
      alert('Pendaftaran ditolak!')
      fetchPendingDosen()
      fetchAllDosen()
    } catch (error) {
      alert('Gagal menolak: ' + error.message)
    }
  }

  if (loading) {
    return <div className="p-8">Memuat data...</div>
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Admin Dashboard</h1>

        {/* Stats Cards */}
        <div className="grid md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm">Total Dosen</p>
                <p className="text-3xl font-bold text-blue-600">{allDosen.length}</p>
              </div>
              <Users className="w-12 h-12 text-blue-600" />
            </div>
          </div>
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm">Menunggu Verifikasi</p>
                <p className="text-3xl font-bold text-yellow-600">{pendingDosen.length}</p>
              </div>
              <FileText className="w-12 h-12 text-yellow-600" />
            </div>
          </div>
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm">Terverifikasi</p>
                <p className="text-3xl font-bold text-green-600">
                  {allDosen.filter(d => d.verified).length}
                </p>
              </div>
              <CheckCircle className="w-12 h-12 text-green-600" />
            </div>
          </div>
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm">Pesan Kontak</p>
                <p className="text-3xl font-bold text-purple-600">{contactMessages.length}</p>
              </div>
              <Eye className="w-12 h-12 text-purple-600" />
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="bg-white rounded-lg shadow-md mb-8">
          <div className="border-b border-gray-200">
            <nav className="flex -mb-px">
              <button
                onClick={() => setActiveTab('verification')}
                className={`px-6 py-4 font-medium ${
                  activeTab === 'verification'
                    ? 'border-b-2 border-blue-500 text-blue-600'
                    : 'text-gray-500 hover:text-gray-700'
                }`}
              >
                Verifikasi Dosen ({pendingDosen.length})
              </button>
              <button
                onClick={() => setActiveTab('all-dosen')}
                className={`px-6 py-4 font-medium ${
                  activeTab === 'all-dosen'
                    ? 'border-b-2 border-blue-500 text-blue-600'
                    : 'text-gray-500 hover:text-gray-700'
                }`}
              >
                Semua Dosen
              </button>
              <button
                onClick={() => setActiveTab('messages')}
                className={`px-6 py-4 font-medium ${
                  activeTab === 'messages'
                    ? 'border-b-2 border-blue-500 text-blue-600'
                    : 'text-gray-500 hover:text-gray-700'
                }`}
              >
                Pesan Kontak
              </button>
            </nav>
          </div>

          {/* Verification Tab */}
          {activeTab === 'verification' && (
            <div className="p-6">
              {pendingDosen.length === 0 ? (
                <p className="text-gray-500 text-center py-8">Tidak ada dosen menunggu verifikasi</p>
              ) : (
                <div className="space-y-4">
                  {pendingDosen.map((dosen) => (
                    <div
                      key={dosen.id}
                      className="border border-yellow-200 rounded-lg p-6 bg-yellow-50"
                    >
                      <div className="flex justify-between items-start">
                        <div>
                          <h3 className="font-bold text-lg text-gray-900">{dosen.full_name}</h3>
                          <p className="text-gray-600">NIDN: {dosen.nidn}</p>
                          <p className="text-gray-600">Email: {dosen.email}</p>
                          {dosen.institution && (
                            <p className="text-gray-600">Institusi: {dosen.institution}</p>
                          )}
                          {dosen.field_of_expertise && (
                            <p className="text-gray-600">Bidang: {dosen.field_of_expertise}</p>
                          )}
                          <p className="text-sm text-gray-500 mt-2">
                            Terdaftar: {new Date(dosen.created_at).toLocaleDateString('id-ID')}
                          </p>
                        </div>
                        <div className="flex gap-2">
                          <button
                            onClick={() => handleVerify(dosen.id)}
                            className="flex items-center gap-2 bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition"
                          >
                            <CheckCircle size={18} />
                            Verifikasi
                          </button>
                          <button
                            onClick={() => handleReject(dosen.id)}
                            className="flex items-center gap-2 bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition"
                          >
                            <XCircle size={18} />
                            Tolak
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* All Dosen Tab */}
          {activeTab === 'all-dosen' && (
            <div className="p-6">
              {allDosen.length === 0 ? (
                <p className="text-gray-500 text-center py-8">Belum ada dosen terdaftar</p>
              ) : (
                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Nama
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          NIDN
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Institusi
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Status
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Tanggal Daftar
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {allDosen.map((dosen) => (
                        <tr key={dosen.id}>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm font-medium text-gray-900">{dosen.full_name}</div>
                            <div className="text-sm text-gray-500">{dosen.email}</div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            {dosen.nidn}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            {dosen.institution || '-'}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <span className={`px-2 py-1 text-xs rounded-full ${
                              dosen.verified
                                ? 'bg-green-100 text-green-800'
                                : 'bg-yellow-100 text-yellow-800'
                            }`}>
                              {dosen.verified ? 'Terverifikasi' : 'Menunggu Verifikasi'}
                            </span>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            {new Date(dosen.created_at).toLocaleDateString('id-ID')}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          )}

          {/* Messages Tab */}
          {activeTab === 'messages' && (
            <div className="p-6">
              {contactMessages.length === 0 ? (
                <p className="text-gray-500 text-center py-8">Belum ada pesan kontak</p>
              ) : (
                <div className="space-y-4">
                  {contactMessages.map((message) => (
                    <div
                      key={message.id}
                      className="border border-gray-200 rounded-lg p-4 hover:bg-gray-50"
                    >
                      <div className="flex justify-between items-start mb-2">
                        <div>
                          <h3 className="font-semibold text-gray-900">{message.subject}</h3>
                          <p className="text-sm text-gray-600">
                            Dari: {message.name} ({message.email})
                          </p>
                        </div>
                        <span className="text-xs text-gray-500">
                          {new Date(message.created_at).toLocaleString('id-ID')}
                        </span>
                      </div>
                      <p className="text-gray-700">{message.message}</p>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
