import { useEffect, useState, type SVGProps } from 'react'

export function Maple(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 100 100" fill="currentColor" stroke="currentColor" strokeWidth={2} strokeLinejoin="round" aria-hidden="true" {...props}>
      <path d="M50 5 L44 17 L37 13 L40 36 L32 28 L29 34 L17 31 L22 43 L15 46 L33 61 L30 68 L48 65 L48 95 L52 95 L52 65 L70 68 L67 61 L85 46 L78 43 L83 31 L71 34 L68 28 L60 36 L63 13 L56 17 Z" />
    </svg>
  )
}

type Leaf = { id: number; left: number; size: number; duration: number; tone: string }

// 偶尔飘一片：页面可见、没开“减少动态效果”时，每 9 秒最多新增一片，同时最多 2 片
export function Leaves() {
  const [leaves, setLeaves] = useState<Leaf[]>([])

  useEffect(() => {
    if (matchMedia('(prefers-reduced-motion: reduce)').matches) return
    let id = 0
    const drop = () => {
      if (document.hidden) return
      setLeaves(ls => ls.length >= 2 ? ls : [...ls, {
        id: id++,
        left: 15 + Math.random() * 80,
        size: 14 + Math.random() * 8,
        duration: 13 + Math.random() * 5,
        tone: Math.random() < 0.5 ? 'text-leaf' : 'text-accent',
      }])
    }
    const first = setTimeout(drop, 2500)
    const timer = setInterval(drop, 9000)
    return () => { clearTimeout(first); clearInterval(timer) }
  }, [])

  return (
    <div className="fixed inset-0 -z-10 pointer-events-none overflow-hidden" aria-hidden="true">
      {leaves.map(l => (
        <Maple key={l.id} className={`leaf absolute -top-8 ${l.tone}`}
          style={{ left: `${l.left}vw`, width: l.size, height: l.size, animationDuration: `${l.duration}s` }}
          onAnimationEnd={() => setLeaves(ls => ls.filter(x => x.id !== l.id))} />
      ))}
    </div>
  )
}
