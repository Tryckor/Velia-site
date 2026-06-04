export function VideoHero() {
  return (
    <section className="relative flex min-h-[100svh] flex-col justify-center overflow-hidden bg-[#070707] px-6">
      {/* Background video (clock — time slipping away) */}
      <video
        className="absolute inset-0 h-full w-full object-cover"
        autoPlay
        muted
        loop
        playsInline
        preload="auto"
        aria-hidden="true"
      >
        <source src="/hero-bg.mp4" type="video/mp4" />
      </video>

      {/* Legibility overlays */}
      <div aria-hidden className="absolute inset-0 bg-black/50" />
      <div
        aria-hidden
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(180deg, rgba(7,7,7,0.75) 0%, rgba(7,7,7,0.25) 35%, rgba(7,7,7,0.55) 100%)",
        }}
      />

      {/* Content */}
      <div className="relative z-10 mx-auto max-w-4xl text-center text-white">
        <p className="float-in mb-7 inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/5 px-4 py-1.5 text-xs text-white/80 backdrop-blur">
          <span className="relative flex h-1.5 w-1.5">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-white opacity-60" />
            <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-white" />
          </span>
          Agence digitale & intelligence artificielle
        </p>

        <h1 className="float-in-2 text-balance text-4xl font-medium leading-[1.05] tracking-tight sm:text-6xl lg:text-7xl">
          Le temps perdu
          <br />
          ne revient pas.
        </h1>

        <p className="float-in-3 mx-auto mt-7 max-w-xl text-pretty text-lg text-white/75">
          Sites web, automatisations et agents IA qui captent vos clients
          24h/24 — pendant que vous faites le reste.
        </p>

        <div className="float-in-4 mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <a
            href="#contact"
            className="group w-full rounded-full bg-white px-7 py-3.5 font-medium text-foreground transition-all hover:opacity-90 sm:w-auto"
          >
            <span className="inline-flex items-center gap-2">
              Réserver mon audit gratuit
              <span className="transition-transform group-hover:translate-x-0.5">
                →
              </span>
            </span>
          </a>
          <a
            href="#services"
            className="w-full rounded-full border border-white/30 bg-white/5 px-7 py-3.5 font-medium text-white backdrop-blur transition-colors hover:border-white/70 sm:w-auto"
          >
            Découvrir nos services
          </a>
        </div>
      </div>

      {/* Scroll cue */}
      <a
        href="#services"
        aria-label="Défiler"
        className="float-in-5 absolute bottom-7 left-1/2 z-10 flex -translate-x-1/2 flex-col items-center gap-2 text-white/60 transition-colors hover:text-white"
      >
        <span className="text-[10px] uppercase tracking-[0.2em]">Scroll</span>
        <span className="h-9 w-px bg-gradient-to-b from-white/60 to-transparent" />
      </a>
    </section>
  );
}
