import { Home, BookOpen, Award, Users } from 'lucide-react'
import { Link } from 'react-router-dom'

export default function Home() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-900 to-blue-700 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-5xl font-bold mb-6">
            Portfolio Dosen Indonesia
          </h1>
          <p className="text-xl mb-8 max-w-3xl mx-auto">
            Platform digital untuk menampilkan profil, karya, dan pencapaian dosen 
            di seluruh Indonesia. Terhubung, terverifikasi, dan terpercaya.
          </p>
          <div className="flex justify-center gap-4">
            <Link
              to="/portfolio"
              className="bg-white text-blue-900 px-8 py-3 rounded-lg font-semibold hover:bg-blue-50 transition"
            >
              Lihat Portfolio
            </Link>
            <Link
              to="/register"
              className="border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-blue-900 transition"
            >
              Daftar Sekarang
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center mb-12 text-gray-800">
            Fitur Utama
          </h2>
          <div className="grid md:grid-cols-4 gap-8">
            <div className="text-center p-6 bg-white rounded-lg shadow-md">
              <Home className="w-12 h-12 mx-auto mb-4 text-blue-600" />
              <h3 className="text-xl font-semibold mb-2">Profil Lengkap</h3>
              <p className="text-gray-600">
                Curriculum Vitae digital yang komprehensif dan mudah diakses
              </p>
            </div>
            <div className="text-center p-6 bg-white rounded-lg shadow-md">
              <BookOpen className="w-12 h-12 mx-auto mb-4 text-blue-600" />
              <h3 className="text-xl font-semibold mb-2">Publikasi Karya</h3>
              <p className="text-gray-600">
                Upload paper, penelitian, dan karya ilmiah lainnya
              </p>
            </div>
            <div className="text-center p-6 bg-white rounded-lg shadow-md">
              <Award className="w-12 h-12 mx-auto mb-4 text-blue-600" />
              <h3 className="text-xl font-semibold mb-2">Sertifikasi & HKI</h3>
              <p className="text-gray-600">
                Dokumentasi Hak Kekayaan Intelektual dan sertifikasi
              </p>
            </div>
            <div className="text-center p-6 bg-white rounded-lg shadow-md">
              <Users className="w-12 h-12 mx-auto mb-4 text-blue-600" />
              <h3 className="text-xl font-semibold mb-2">Terverifikasi</h3>
              <p className="text-gray-600">
                Sistem verifikasi admin untuk memastikan kredibilitas
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-blue-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-3 gap-8 text-center">
            <div>
              <h3 className="text-4xl font-bold mb-2">500+</h3>
              <p className="text-blue-200">Dosen Terdaftar</p>
            </div>
            <div>
              <h3 className="text-4xl font-bold mb-2">1000+</h3>
              <p className="text-blue-200">Karya Publikasi</p>
            </div>
            <div>
              <h3 className="text-4xl font-bold mb-2">50+</h3>
              <p className="text-blue-200">Universitas</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-6 text-gray-800">
            Bergabunglah Bersama Kami
          </h2>
          <p className="text-lg text-gray-600 mb-8">
            Tingkatkan visibilitas akademik Anda dan terhubung dengan komunitas 
            dosen di seluruh Indonesia
          </p>
          <Link
            to="/register"
            className="inline-block bg-blue-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-700 transition"
          >
            Daftar Sebagai Dosen
          </Link>
        </div>
      </section>
    </div>
  )
}
