import { useState, useEffect } from 'react'
import { supabase } from '../lib/supabase'
import { GraduationCap, FileText, Video, Award, ExternalLink } from 'lucide-react'

export default function Portfolio() {
  const [dosenList, setDosenList] = useState([])
  const [loading, setLoading] = useState(true)
  const [filter, setFilter] = useState('')

  useEffect(() => {
    fetchDosen()
  }, [])

  const fetchDosen = async () => {
    try {
      const { data, error } = await supabase
        .from('profiles')
        .select(`
          id,
          full_name,
          nidn,
          bio,
          profile_image,
          institution,
          field_of_expertise,
          verified,
          portfolios (
            id,
            title,
            category,
            description,
            file_url,
            created_at
          )
        `)
        .eq('role', 'dosen')
        .eq('verified', true)

      if (error) throw error
      setDosenList(data || [])
    } catch (error) {
      console.error('Error fetching dosen:', error)
    } finally {
      setLoading(false)
    }
  }

  const getCategoryIcon = (category) => {
    switch (category?.toLowerCase()) {
      case 'paper':
      case 'publikasi':
        return <FileText className="w-5 h-5" />
      case 'video':
        return <Video className="w-5 h-5" />
      case 'hki':
      case 'paten':
        return <Award className="w-5 h-5" />
      default:
        return <GraduationCap className="w-5 h-5" />
    }
  }

  const filteredDosen = dosenList.filter((dosen) =>
    dosen.full_name?.toLowerCase().includes(filter.toLowerCase()) ||
    dosen.institution?.toLowerCase().includes(filter.toLowerCase()) ||
    dosen.field_of_expertise?.toLowerCase().includes(filter.toLowerCase())
  )

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-xl text-gray-600">Memuat data dosen...</div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <section className="bg-blue-900 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl font-bold mb-4">Portfolio Dosen</h1>
          <p className="text-xl text-blue-200">
            Temukan dosen dan karya ilmiah mereka
          </p>
        </div>
      </section>

      {/* Search & Filter */}
      <section className="py-8 bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <input
            type="text"
            placeholder="Cari berdasarkan nama, institusi, atau bidang keahlian..."
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>
      </section>

      {/* Dosen List */}
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-6">
            <h2 className="text-2xl font-bold text-gray-800">
              Dosen Terverifikasi ({filteredDosen.length})
            </h2>
          </div>

          {filteredDosen.length === 0 ? (
            <div className="text-center py-12">
              <GraduationCap className="w-16 h-16 mx-auto text-gray-400 mb-4" />
              <p className="text-xl text-gray-600">Belum ada dosen terdaftar</p>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredDosen.map((dosen) => (
                <div
                  key={dosen.id}
                  className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition"
                >
                  {/* Profile Header */}
                  <div className="bg-gradient-to-r from-blue-900 to-blue-700 p-6 text-white">
                    <div className="flex items-center gap-4 mb-4">
                      <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center text-blue-900 text-2xl font-bold">
                        {dosen.full_name?.charAt(0) || 'D'}
                      </div>
                      <div>
                        <h3 className="text-xl font-bold">{dosen.full_name}</h3>
                        <p className="text-blue-200 text-sm">NIDN: {dosen.nidn}</p>
                      </div>
                    </div>
                    <p className="text-blue-100 text-sm">{dosen.institution}</p>
                  </div>

                  {/* Bio & Expertise */}
                  <div className="p-6">
                    <div className="mb-4">
                      <h4 className="font-semibold text-gray-800 mb-2">Bidang Keahlian</h4>
                      <p className="text-gray-600 text-sm">{dosen.field_of_expertise}</p>
                    </div>

                    {dosen.bio && (
                      <div className="mb-4">
                        <h4 className="font-semibold text-gray-800 mb-2">Bio Singkat</h4>
                        <p className="text-gray-600 text-sm line-clamp-3">{dosen.bio}</p>
                      </div>
                    )}

                    {/* Portfolios */}
                    {dosen.portfolios && dosen.portfolios.length > 0 && (
                      <div>
                        <h4 className="font-semibold text-gray-800 mb-3">
                          Karya ({dosen.portfolios.length})
                        </h4>
                        <div className="space-y-2">
                          {dosen.portfolios.slice(0, 3).map((portfolio) => (
                            <div
                              key={portfolio.id}
                              className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg"
                            >
                              <span className="text-blue-600 mt-1">
                                {getCategoryIcon(portfolio.category)}
                              </span>
                              <div className="flex-1 min-w-0">
                                <p className="font-medium text-gray-800 text-sm truncate">
                                  {portfolio.title}
                                </p>
                                <p className="text-xs text-gray-500">
                                  {portfolio.category} •{' '}
                                  {new Date(portfolio.created_at).toLocaleDateString('id-ID')}
                                </p>
                              </div>
                              {portfolio.file_url && (
                                <a
                                  href={portfolio.file_url}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="text-blue-600 hover:text-blue-800"
                                >
                                  <ExternalLink size={16} />
                                </a>
                              )}
                            </div>
                          ))}
                          {dosen.portfolios.length > 3 && (
                            <p className="text-xs text-gray-500 text-center mt-2">
                              +{dosen.portfolios.length - 3} karya lainnya
                            </p>
                          )}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  )
}
