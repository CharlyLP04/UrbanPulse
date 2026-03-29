export default function LoginBranding() {
  return (
    <div className="hidden md:flex flex-col justify-center bg-gradient-to-br from-[#0f4c75] to-[#3282b8] text-white p-8 relative overflow-hidden w-full md:w-[40%] flex-shrink-0">
      <div className="absolute inset-0 opacity-[0.03] flex items-center justify-center text-[16rem] select-none pointer-events-none">
        🏙️
      </div>
      <div className="relative z-10 max-w-sm mx-auto">
        
        <div className="flex items-center gap-3 mb-6">
          <span className="text-4xl" role="img" aria-label="Ciudad">🏙️</span>
          <span className="font-black text-3xl tracking-tight text-white uppercase" style={{ fontFamily: 'Impact, "Arial Black", sans-serif', transform: 'scaleY(1.05)' }}>
            URBANPULSE
          </span>
        </div>
        
        <p className="text-base font-medium text-blue-100 mb-8">Tu voz en la ciudad digital</p>

        <ul className="space-y-4">
          {[
            'Reporta problemas urbanos en segundos',
            'Vota y prioriza las necesidades de tu comunidad',
            'Rastrea el progreso en tiempo real',
            'Genera impacto colectivo medible'
          ].map((item, i) => (
            <li key={i} className="flex items-center gap-3 text-sm text-blue-50 font-medium">
              <span className="text-emerald-400 font-bold text-lg leading-none">✓</span>
              {item}
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}
