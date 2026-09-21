import { Icon } from "./ui/Icon";

export function HeroSection() {
  return (
    <section className="relative overflow-hidden rounded-xl p-6 md:p-10 bg-card clay-panel">
      <div className="absolute -top-16 -right-16 w-72 h-72 rounded-full bg-sky/20 blur-3xl pointer-events-none" />
      <div className="absolute -bottom-16 left-8 w-64 h-64 rounded-full bg-amber/30 blur-3xl pointer-events-none" />

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center relative z-10">
        {/* Teks & CTA */}
        <div className="lg:col-span-7 flex flex-col items-start gap-3">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber text-on-amber text-xs font-bold clay-btn">
            <Icon name="auto_awesome" className="text-[16px]" />
            <span>Alat Bantu Mengumpulkan Gambar</span>
          </span>
          <h1 className="text-3xl md:text-[40px] md:leading-[48px] font-extrabold text-title tracking-tight leading-tight">
            AI Dataset Collector
          </h1>
          <p className="text-body text-sm md:text-base max-w-xl">
            Kumpulkan gambar dataset dengan mudah untuk pembelajaran Machine
            Learning di kelas tanpa perlu keahlian coding. Cukup ketik nama
            kelas, pilih gambar berkualitas dari Pixabay, dan ekspor ZIP rapi
            terstruktur.
          </p>
          <a
            href="#classes"
            className="mt-1 px-6 py-2.5 rounded-full bg-primary text-white text-sm font-bold clay-btn flex items-center gap-2 hover:-translate-y-0.5 transition-transform"
          >
            <span>Mulai Membuat Dataset</span>
            <Icon name="arrow_downward" />
          </a>
          <div className="flex flex-wrap items-center gap-5 pt-2">
            <span className="flex items-center gap-1.5 text-xs text-body">
              <span className="w-2.5 h-2.5 rounded-full bg-secondary" />
              100% Bebas Hak Cipta Komersial
            </span>
            <span className="flex items-center gap-1.5 text-xs text-body">
              <span className="w-2.5 h-2.5 rounded-full bg-primary" />
              Format Otomatis Kategori Folder
            </span>
          </div>
        </div>

        {/* Visual */}
        <div className="lg:col-span-5 relative flex items-center justify-center">
          <div className="w-full relative rounded-xl p-1.5 bg-soft clay-panel">
            <img
              alt="Anak dan guru sedang belajar kecerdasan buatan dan memilih kartu gambar dengan robot ceria"
              className="w-full h-auto aspect-[16/10] object-cover rounded-lg"
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuBSoAmWnFcpw5z2edJvCs4Ku2cwiYF2hG6Trf3XTw_ZTZzqNW98Cs0agwmlSzH1xxk7M04tzoVSqGZlJNzDjkRGmCMMdhTlbVqhwhcyAIyY_AsXxM_O13_Smr4iKu_gJeyP1z2bK464mGnWP4BunCbipqejtGO85qOLRDjCexS8BnSutszfP2NRRkfq_LdlORMj2A4MZ6Dl7rdr4Dlc2XZWhlshMh8wKEmZ7cEOgQ1LTh2oblcN5GLk"
            />
            <div className="absolute -top-4 -left-4 px-4 py-2 rounded-full bg-card text-title text-xs font-bold clay-panel flex items-center gap-1.5 animate-bounce">
              <span className="text-[16px]">🎯</span>
              <span>100% Otomatis</span>
            </div>
            <div className="absolute -bottom-3 right-4 px-4 py-2 rounded-full bg-secondary-container text-on-secondary-container text-xs font-bold clay-panel flex items-center gap-1.5">
              <Icon name="folder_zip" className="text-[16px]" />
              <span>Format ZIP Rapi</span>
            </div>
            <div className="absolute top-1/2 -right-6 -translate-y-1/2 hidden sm:flex px-4 py-2 rounded-full bg-sky/70 text-on-primary-container text-xs font-bold clay-panel items-center gap-1.5">
              <Icon name="bolt" className="text-[16px]" />
              <span>Pixabay Ready</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
