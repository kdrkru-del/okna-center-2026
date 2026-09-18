import Image from 'next/image';
import { asset } from '@/lib/assetPath';

export default function ProjectsShowcase() {
  const projects = [
    {
      id: 1,
      title: 'Панорамное остекление лоджии с отделкой',
      category: 'Владивосток · Жилой фонд',
      image: 'https://xn--80aknmcbtp7a.xn--p1ai/uploads/s/f/2/6/f26rer8ig8fw/img/full_Abph58A9.jpg',
      colSpan: 'col-span-1 md:col-span-2 md:row-span-2'
    },
    {
      id: 2,
      title: 'Остекление балкона с выносом и сайдингом',
      category: 'Уссурийск · Балконы под ключ',
      image: 'https://xn--80aknmcbtp7a.xn--p1ai/uploads/s/f/2/6/f26rer8ig8fw/img/full_h2UhUvHF.jpg',
      colSpan: 'col-span-1'
    },
    {
      id: 3,
      title: 'Алюминиевые витражи ALUTECH',
      category: 'Коммерческий объект',
      image: 'https://xn--80aknmcbtp7a.xn--p1ai/uploads/s/f/2/6/f26rer8ig8fw/img/full_AUdGOJjB.jpg',
      colSpan: 'col-span-1'
    },
    {
      id: 4,
      title: 'Коттедж: окна ПВХ с ламинацией и порталом Patio',
      category: 'Пригород Владивостока',
      image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=2070&auto=format&fit=crop',
      colSpan: 'col-span-1 md:col-span-2'
    },
  ];

  return (
    <section id="projects" className="py-28 bg-[#03060c] text-white px-4 md:px-8 border-t border-white/5 relative">
      <div className="max-w-7xl mx-auto relative z-10">
        
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-16 gap-6">
          <div>
            <div className="inline-block px-3.5 py-1 mb-4 text-[11px] font-mono text-cyan-400 border border-cyan-500/30 rounded-full bg-cyan-950/40 uppercase tracking-widest">
              Портфолио компании
            </div>
            <h2 className="text-3xl sm:text-5xl font-light text-white tracking-tight">
              Реализованные <span className="font-semibold text-transparent bg-clip-text bg-gradient-to-r from-white via-slate-100 to-cyan-300">объекты</span>
            </h2>
          </div>
          <a
            href="#contact"
            className="px-6 py-3 border border-white/20 rounded-full text-xs font-mono uppercase tracking-wider text-slate-300 hover:bg-cyan-500 hover:text-slate-950 hover:border-cyan-500 transition-all"
          >
            Заказать расчет своего проекта →
          </a>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 auto-rows-[300px]">
          {projects.map((p) => (
            <div
              key={p.id}
              className={`group relative rounded-3xl overflow-hidden cursor-pointer border border-white/10 bg-slate-900 shadow-xl ${p.colSpan}`}
            >
              <Image 
                src={asset(p.image)} 
                alt={p.title}
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                className="object-cover transition-transform duration-700 group-hover:scale-105 brightness-90 group-hover:brightness-100"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#020509] via-slate-950/40 to-transparent opacity-80 group-hover:opacity-60 transition-opacity duration-500" />
              
              <div className="absolute bottom-0 left-0 p-8 transform translate-y-2 group-hover:translate-y-0 transition-transform duration-300 w-full">
                <p className="text-cyan-400 text-xs font-mono uppercase tracking-widest mb-1.5">{p.category}</p>
                <h3 className="text-xl md:text-2xl font-semibold text-white tracking-tight leading-snug">{p.title}</h3>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
