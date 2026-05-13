import { BookOpen, Award, Target, Shield, Globe, Clock } from 'lucide-react'

export default function About() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <section className="bg-blue-900 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl font-bold mb-4">Tentang Portfolio Dosen</h1>
          <p className="text-xl text-blue-200">
            Platform profesional untuk dosen Indonesia
          </p>
        </div>
      </section>

      {/* Manfaat Garis Besar */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold mb-8 text-gray-800">
            Manfaat Website Secara Garis Besar
          </h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-blue-50 p-6 rounded-lg">
              <Globe className="w-12 h-12 text-blue-600 mb-4" />
              <h3 className="text-xl font-semibold mb-3">Visibilitas Akademik</h3>
              <p className="text-gray-700">
                Meningkatkan eksposur dan visibilitas karya akademik dosen 
                kepada masyarakat luas, rekan sejawat, dan institusi pendidikan.
              </p>
            </div>
            <div className="bg-blue-50 p-6 rounded-lg">
              <Shield className="w-12 h-12 text-blue-600 mb-4" />
              <h3 className="text-xl font-semibold mb-3">Kredibilitas Terjamin</h3>
              <p className="text-gray-700">
                Sistem verifikasi admin memastikan hanya dosen yang valid 
                dan terverifikasi yang dapat bergabung dalam platform.
              </p>
            </div>
            <div className="bg-blue-50 p-6 rounded-lg">
              <BookOpen className="w-12 h-12 text-blue-600 mb-4" />
              <h3 className="text-xl font-semibold mb-3">Dokumentasi Karya</h3>
              <p className="text-gray-700">
                Tempat terpusat untuk mendokumentasikan seluruh karya ilmiah, 
                penelitian, dan pencapaian akademik dalam satu platform.
              </p>
            </div>
            <div className="bg-blue-50 p-6 rounded-lg">
              <Target className="w-12 h-12 text-blue-600 mb-4" />
              <h3 className="text-xl font-semibold mb-3">Networking</h3>
              <p className="text-gray-700">
                Membangun jaringan kolaborasi dengan dosen lain dari berbagai 
                universitas di seluruh Indonesia.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Manfaat Mendetail */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold mb-12 text-gray-800">
            Manfaat Detail untuk Dosen
          </h2>
          
          <div className="space-y-8">
            <div className="flex gap-6">
              <div className="flex-shrink-0">
                <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center text-white font-bold">
                  1
                </div>
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-2">Curriculum Vitae Digital Lengkap</h3>
                <p className="text-gray-700 mb-2">
                  Buat CV akademik yang komprehensif mencakup:
                </p>
                <ul className="list-disc list-inside text-gray-600 space-y-1">
                  <li>Data pribadi dan kontak profesional</li>
                  <li>Riwayat pendidikan (S1, S2, S3)</li>
                  <li>Jabatan akademik dan kepangkatan</li>
                  <li>Pengalaman mengajar dan penelitian</li>
                  <li>Keahlian dan bidangexpertise</li>
                </ul>
              </div>
            </div>

            <div className="flex gap-6">
              <div className="flex-shrink-0">
                <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center text-white font-bold">
                  2
                </div>
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-2">Portfolio Karya Ilmiah</h3>
                <p className="text-gray-700 mb-2">
                  Upload dan kategorikan berbagai jenis karya:
                </p>
                <ul className="list-disc list-inside text-gray-600 space-y-1">
                  <li>Paper dan publikasi jurnal (nasional & internasional)</li>
                  <li>Buku dan bab buku</li>
                  <li>Prosiding konferensi</li>
                  <li>Laporan penelitian</li>
                  <li>Media pembelajaran (video, gambar, presentasi)</li>
                </ul>
              </div>
            </div>

            <div className="flex gap-6">
              <div className="flex-shrink-0">
                <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center text-white font-bold">
                  3
                </div>
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-2">Hak Kekayaan Intelektual (HKI)</h3>
                <p className="text-gray-700 mb-2">
                  Dokumentasi HKI yang telah dicapai:
                </p>
                <ul className="list-disc list-inside text-gray-600 space-y-1">
                  <li>Paten dan paten sederhana</li>
                  <li>Hak Cipta</li>
                  <li>Merek</li>
                  <li>Desain Industri</li>
                  <li>Rahasia Dagang</li>
                  <li>Indikasi Geografis</li>
                </ul>
              </div>
            </div>

            <div className="flex gap-6">
              <div className="flex-shrink-0">
                <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center text-white font-bold">
                  4
                </div>
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-2">Penghargaan & Sertifikasi</h3>
                <p className="text-gray-700 mb-2">
                  Catat prestasi dan kualifikasi:
                </p>
                <ul className="list-disc list-inside text-gray-600 space-y-1">
                  <li>Penghargaan akademik dan non-akademik</li>
                  <li>Sertifikasi profesi</li>
                  <li>Sertifikasi dosen</li>
                  <li>Pelatihan dan workshop</li>
                  <li>Membership organisasi profesi</li>
                </ul>
              </div>
            </div>

            <div className="flex gap-6">
              <div className="flex-shrink-0">
                <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center text-white font-bold">
                  5
                </div>
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-2">Proyek & Kolaborasi</h3>
                <p className="text-gray-700 mb-2">
                  Tampilkan proyek yang sedang atau telah dikerjakan:
                </p>
                <ul className="list-disc list-inside text-gray-600 space-y-1">
                  <li>Proyek penelitian (hibah internal/eksternal)</li>
                  <li>Proyek pengabdian masyarakat</li>
                  <li>Kolaborasi industri</li>
                  <li>Proyek internasional</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Untuk Publik */}
      <section className="py-16 bg-blue-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold mb-8">Manfaat untuk Masyarakat Publik</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-blue-800 p-6 rounded-lg">
              <Clock className="w-10 h-10 mb-4 text-blue-300" />
              <h3 className="text-lg font-semibold mb-2">Akses Mudah</h3>
              <p className="text-blue-200">
                Temukan dan hubungi dosen ahli di bidang tertentu dengan mudah 
                dan cepat.
              </p>
            </div>
            <div className="bg-blue-800 p-6 rounded-lg">
              <Award className="w-10 h-10 mb-4 text-blue-300" />
              <h3 className="text-lg font-semibold mb-2">Informasi Terverifikasi</h3>
              <p className="text-blue-200">
                Data dosen telah melalui proses verifikasi sehingga informasi 
                yang ditampilkan dapat dipertanggungjawabkan.
              </p>
            </div>
            <div className="bg-blue-800 p-6 rounded-lg">
              <BookOpen className="w-10 h-10 mb-4 text-blue-300" />
              <h3 className="text-lg font-semibold mb-2">Referensi Karya</h3>
              <p className="text-blue-200">
                Akses publikasi dan karya dosen sebagai referensi untuk 
                penelitian atau kolaborasi.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Privacy Note */}
      <section className="py-12 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold mb-6 text-gray-800">
            Privasi & Keamanan Data
          </h2>
          <div className="bg-yellow-50 border-l-4 border-yellow-400 p-6">
            <p className="text-gray-700 mb-4">
              <strong>Informasi Penting:</strong> Website ini dirancang dengan 
              memperhatikan privasi dosen. Informasi yang ditampilkan adalah 
              informasi profesional yang dapat diakses publik tanpa melanggar 
              privasi pribadi dosen.
            </p>
            <ul className="list-disc list-inside text-gray-600 space-y-2">
              <li>Data pribadi sensitif (seperti NIK, alamat lengkap, nomor telepon pribadi) tidak ditampilkan</li>
              <li>Dosen memiliki kontrol atas informasi mana yang ingin ditampilkan</li>
              <li>Sistem autentikasi yang aman menggunakan Supabase</li>
              <li>Akses dashboard dibatasi berdasarkan role (Admin/Dosen)</li>
            </ul>
          </div>
        </div>
      </section>
    </div>
  )
}
