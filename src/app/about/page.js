export default function AboutSection() {
  return (
    <section className="relative w-full min-h-screen flex items-center justify-center bg-[#075d65] text-white overflow-hidden">
      {/* Sumber cahaya garis putih */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-full h-[12px] bg-[#bbd3d4] blur-xs shadow-[0_0_40px_10px_white] z-10"></div>

      {/* Glow trapezium */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-full h-[300px] glow-t"></div>

      {/* Konten */}
      <div className="relative z-20 text-center px-4">
        <p className="text-sm tracking-widest text-gray-300 mb-4">NOW LIVE</p>

        <h1 className="text-5xl md:text-7xl font-bold leading-tight">
          INTRODUCING <br />
          <span className="text-white">NEW</span>
        </h1>

        <p className="mt-6 text-gray-300 max-w-2xl mx-auto">
          Shrouded in mystery, a shadow emerges from the past. With eyes that
          hold untold stories and a presence that commands attention, they bring
          a power unlike any seen before.
        </p>

        {/* Tombol */}
        <div className="mt-10 flex justify-center gap-4">
          <button className="px-6 py-2 rounded-full bg-white text-black font-semibold shadow-md">
            Description
          </button>
          <button className="px-6 py-2 rounded-full border border-white/50 text-white/80 hover:text-white hover:border-white transition">
            Next for detail
          </button>
        </div>
      </div>
    </section>
  );
}
