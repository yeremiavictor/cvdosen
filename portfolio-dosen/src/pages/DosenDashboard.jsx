import { useState, useEffect } from 'react'
import { useAuth } from '../context/AuthContext'
import { supabase } from '../lib/supabase'
import { User, FileText, Award, Upload, Plus, Trash2, Edit } from 'lucide-react'

export default function DosenDashboard() {
  const { user } = useAuth()
  const [profile, setProfile] = useState(null)
  const [portfolios, setPortfolios] = useState([])
  const [loading, setLoading] = useState(true)
  const [showPortfolioForm, setShowPortfolioForm] = useState(false)
  const [newPortfolio, setNewPortfolio] = useState({
    title: '',
    category: 'paper',
    description: '',
    file_url: '',
  })

  useEffect(() => {
    if (user) {
      fetchProfile()
      fetchPortfolios()
    }
  }, [user])

  const fetchProfile = async () => {
    try {
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', user.id)
        .single()

      if (error) throw error
      setProfile(data)
    } catch (error) {
      console.error('Error fetching profile:', error)
    } finally {
      setLoading(false)
    }
  }

  const fetchPortfolios = async () => {
    try {
      const { data, error } = await supabase
        .from('portfolios')
        .select('*')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false })

      if (error) throw error
      setPortfolios(data || [])
    } catch (error) {
      console.error('Error fetching portfolios:', error)
    }
  }

  const handleUpdateProfile = async (e) => {
    e.preventDefault()
    const formData = new FormData(e.target)
    
    try {
      const { error } = await supabase
        .from('profiles')
        .update({
          full_name: formData.get('full_name'),
          nidn: formData.get('nidn'),
          institution: formData.get('institution'),
          field_of_expertise: formData.get('field_of_expertise'),
          bio: formData.get('bio'),
          education: formData.get('education'),
        })
        .eq('id', user.id)

      if (error) throw error
      alert('Profil berhasil diperbarui!')
      fetchProfile()
    } catch (error) {
      alert('Gagal memperbarui profil: ' + error.message)
    }
  }

  const handleAddPortfolio = async (e) => {
    e.preventDefault()
    
    try {
      const { error } = await supabase.from('portfolios').insert([
        {
          user_id: user.id,
          title: newPortfolio.title,
          category: newPortfolio.category,
          description: newPortfolio.description,
          file_url: newPortfolio.file_url,
        },
      ])

      if (error) throw error
      alert('Karya berhasil ditambahkan!')
      setNewPortfolio({ title: '', category: 'paper', description: '', file_url: '' })
      setShowPortfolioForm(false)
      fetchPortfolios()
    } catch (error) {
      alert('Gagal menambahkan karya: ' + error.message)
    }
  }

  const handleDeletePortfolio = async (id) => {
    if (!confirm('Yakin ingin menghapus karya ini?')) return

    try {
      const { error } = await supabase.from('portfolios').delete().eq('id', id)
      if (error) throw error
      alert('Karya berhasil dihapus!')
      fetchPortfolios()
    } catch (error) {
      alert('Gagal menghapus karya: ' + error.message)
    }
  }

  if (loading) {
    return <div className="p-8">Memuat data...</div>
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Dashboard Dosen</h1>

        {/* Profile Status */}
        <div className={`mb-8 p-4 rounded-lg ${profile?.verified ? 'bg-green-100 border border-green-400' : 'bg-yellow-100 border border-yellow-400'}`}>
          <p className={profile?.verified ? 'text-green-800' : 'text-yellow-800'}>
            {profile?.verified 
              ? '✓ Akun Anda telah terverifikasi' 
              : '⏳ Akun Anda sedang menunggu verifikasi admin'}
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {/* Profile Form */}
          <div className="md:col-span-2">
            <div className="bg-white rounded-lg shadow-md p-6 mb-8">
              <div className="flex items-center gap-3 mb-6">
                <User className="w-6 h-6 text-blue-600" />
                <h2 className="text-xl font-bold text-gray-900">Curriculum Vitae</h2>
              </div>

              <form onSubmit={handleUpdateProfile} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Nama Lengkap</label>
                  <input
                    name="full_name"
                    type="text"
                    defaultValue={profile?.full_name}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">NIDN</label>
                  <input
                    name="nidn"
                    type="text"
                    defaultValue={profile?.nidn}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Institusi/Universitas</label>
                  <input
                    name="institution"
                    type="text"
                    defaultValue={profile?.institution}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                    placeholder="Contoh: Universitas Indonesia"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Bidang Keahlian</label>
                  <input
                    name="field_of_expertise"
                    type="text"
                    defaultValue={profile?.field_of_expertise}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                    placeholder="Contoh: Ilmu Komputer, Kecerdasan Buatan"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Bio Singkat</label>
                  <textarea
                    name="bio"
                    defaultValue={profile?.bio}
                    rows="3"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                    placeholder="Deskripsi singkat tentang diri Anda"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Riwayat Pendidikan</label>
                  <textarea
                    name="education"
                    defaultValue={profile?.education}
                    rows="4"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                    placeholder="S1 - Universitas XXX (Tahun)&#10;S2 - Universitas YYY (Tahun)&#10;S3 - Universitas ZZZ (Tahun)"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition"
                >
                  Simpan Profil
                </button>
              </form>
            </div>
          </div>

          {/* Stats Sidebar */}
          <div className="space-y-6">
            <div className="bg-white rounded-lg shadow-md p-6">
              <h3 className="font-bold text-gray-900 mb-4">Statistik</h3>
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Total Karya</span>
                  <span className="font-bold text-blue-600">{portfolios.length}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Status</span>
                  <span className={`px-2 py-1 rounded text-sm ${profile?.verified ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'}`}>
                    {profile?.verified ? 'Terverifikasi' : 'Menunggu Verifikasi'}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Portfolios Section */}
        <div className="bg-white rounded-lg shadow-md p-6 mt-8">
          <div className="flex justify-between items-center mb-6">
            <div className="flex items-center gap-3">
              <FileText className="w-6 h-6 text-blue-600" />
              <h2 className="text-xl font-bold text-gray-900">Karya & Publikasi</h2>
            </div>
            <button
              onClick={() => setShowPortfolioForm(!showPortfolioForm)}
              className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
            >
              <Plus size={18} />
              Tambah Karya
            </button>
          </div>

          {/* Add Portfolio Form */}
          {showPortfolioForm && (
            <form onSubmit={handleAddPortfolio} className="mb-6 p-4 bg-gray-50 rounded-lg space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Judul Karya</label>
                <input
                  type="text"
                  value={newPortfolio.title}
                  onChange={(e) => setNewPortfolio({ ...newPortfolio, title: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  placeholder="Judul paper/proyek/HKI"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Kategori</label>
                <select
                  value={newPortfolio.category}
                  onChange={(e) => setNewPortfolio({ ...newPortfolio, category: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                >
                  <option value="paper">Paper/Publikasi</option>
                  <option value="book">Buku</option>
                  <option value="hki">HKI/Paten</option>
                  <option value="project">Proyek</option>
                  <option value="video">Video</option>
                  <option value="award">Penghargaan</option>
                  <option value="certification">Sertifikasi</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Deskripsi</label>
                <textarea
                  value={newPortfolio.description}
                  onChange={(e) => setNewPortfolio({ ...newPortfolio, description: e.target.value })}
                  rows="3"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  placeholder="Deskripsi singkat tentang karya ini"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">URL File (Google Drive, dll)</label>
                <input
                  type="url"
                  value={newPortfolio.file_url}
                  onChange={(e) => setNewPortfolio({ ...newPortfolio, file_url: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  placeholder="https://drive.google.com/..."
                />
              </div>

              <div className="flex gap-4">
                <button
                  type="submit"
                  className="bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700 transition"
                >
                  Simpan
                </button>
                <button
                  type="button"
                  onClick={() => setShowPortfolioForm(false)}
                  className="bg-gray-400 text-white px-6 py-2 rounded-lg hover:bg-gray-500 transition"
                >
                  Batal
                </button>
              </div>
            </form>
          )}

          {/* Portfolio List */}
          {portfolios.length === 0 ? (
            <p className="text-gray-500 text-center py-8">Belum ada karya yang ditambahkan</p>
          ) : (
            <div className="space-y-4">
              {portfolios.map((portfolio) => (
                <div
                  key={portfolio.id}
                  className="border border-gray-200 rounded-lg p-4 flex justify-between items-start hover:bg-gray-50"
                >
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <Award className="w-5 h-5 text-blue-600" />
                      <h3 className="font-semibold text-gray-900">{portfolio.title}</h3>
                    </div>
                    <p className="text-sm text-gray-600 mb-2">{portfolio.description}</p>
                    <div className="flex items-center gap-4 text-sm text-gray-500">
                      <span className="px-2 py-1 bg-blue-100 text-blue-800 rounded">
                        {portfolio.category}
                      </span>
                      <span>{new Date(portfolio.created_at).toLocaleDateString('id-ID')}</span>
                    </div>
                    {portfolio.file_url && (
                      <a
                        href={portfolio.file_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-600 hover:text-blue-800 text-sm mt-2 inline-block"
                      >
                        Lihat File →
                      </a>
                    )}
                  </div>
                  <button
                    onClick={() => handleDeletePortfolio(portfolio.id)}
                    className="text-red-600 hover:text-red-800 p-2"
                  >
                    <Trash2 size={18} />
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
