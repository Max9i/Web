import { useEffect, useState } from 'react'
import { items, site, type Item } from './content'
import { ItemCard } from './components/Item'
import { Detail } from './components/Detail'
import { Leaves, Maple } from './components/Leaves'

const sorted = [...items].sort((a, b) => b.date.localeCompare(a.date))
const recent = sorted.slice(0, 8)

const filters = [['all', '全部'], ['photo', '照片'], ['shot', '截图'], ['note', '短句']] as const
type Filter = (typeof filters)[number][0]

const active = 'text-accent underline underline-offset-8 decoration-1'
const idle = 'text-mute hover:text-accent'
const pageTitle = 'font-serif font-light text-[40px] leading-tight tracking-wide'

type OpenItem = (list: Item[], i: number) => void

// 用 #/collection 区分两页，部署时不需要额外的路由配置
function usePage() {
  const read = () => (location.hash === '#/collection' ? 'collection' : 'home')
  const [page, setPage] = useState(read)
  useEffect(() => {
    const onChange = () => { setPage(read()); scrollTo(0, 0) }
    addEventListener('hashchange', onChange)
    return () => removeEventListener('hashchange', onChange)
  }, [])
  return page
}

function Home({ onOpen }: { onOpen: OpenItem }) {
  return (
    <section>
      <div className="pt-24 pb-20 max-w-xl">
        <h1 className={`relative inline-block ${pageTitle}`}>
          {site.greeting}
          <Maple className="absolute -right-11 -top-2 w-8 h-8 -rotate-[18deg] text-leaf/60" />
        </h1>
        <p className="mt-5 text-mute leading-[1.8]">{site.intro}</p>
      </div>
      <div className="flex items-baseline justify-between border-t border-line pt-6 mb-10">
        <h2 className="text-xs tracking-[.18em] text-mute">最近</h2>
        <a href="#/collection" className="text-sm hover:text-accent transition duration-300">
          查看全部 <span className="text-accent">→</span>
        </a>
      </div>
      <div className="columns-3 gap-8">
        {recent.map((it, i) => <ItemCard key={it.date + i} item={it} order={i} onOpen={() => onOpen(recent, i)} />)}
      </div>
    </section>
  )
}

function Collection({ filter, setFilter, onOpen }: { filter: Filter; setFilter: (f: Filter) => void; onOpen: OpenItem }) {
  const list = filter === 'all' ? sorted : sorted.filter(it => it.type === filter)
  const months = new Map<string, number[]>()
  list.forEach((it, i) => {
    const m = it.date.slice(0, 7)
    months.set(m, [...(months.get(m) ?? []), i])
  })

  return (
    <section>
      <div className="pt-20 pb-12 flex items-end justify-between">
        <div>
          <h1 className={pageTitle}>收集</h1>
          <p className="mt-4 text-xs tracking-wider text-mute">共 {list.length} 条</p>
        </div>
        <div className="flex gap-8 text-sm">
          {filters.map(([key, label]) => (
            <button key={key} type="button" aria-pressed={key === filter} onClick={() => setFilter(key)}
              className={`cursor-pointer transition duration-300 ${key === filter ? active : idle}`}>
              {label}
            </button>
          ))}
        </div>
      </div>

      {list.length === 0 && <p className="py-32 text-center text-sm text-mute">这里还没有东西</p>}
      {[...months].map(([month, idx]) => (
        <section key={month} className="grid grid-cols-[120px_1fr] gap-8 border-t border-line pt-8 pb-10">
          <h3 className="font-serif text-mute sticky top-24 self-start">{month.replace('-', '.')}</h3>
          <div className="columns-3 gap-8">
            {idx.map(i => <ItemCard key={list[i].date + i} item={list[i]} order={i} onOpen={() => onOpen(list, i)} />)}
          </div>
        </section>
      ))}
    </section>
  )
}

export default function App() {
  const page = usePage()
  const [filter, setFilter] = useState<Filter>('all')
  const [open, setOpen] = useState<{ list: Item[]; index: number } | null>(null)
  const onOpen: OpenItem = (list, index) => setOpen({ list, index })

  const navLink = (href: string, target: string, label: string) => (
    <a href={href} aria-current={page === target ? 'page' : undefined}
      className={`transition duration-300 ${page === target ? active : idle}`}>{label}</a>
  )

  return (
    <div className="text-ink font-sans text-[15px] antialiased">
      <header className="sticky top-0 z-10 bg-paper">
        <div className="mx-auto max-w-6xl px-10 h-16 flex items-center justify-between text-sm">
          <a href="#/" className="font-serif text-base hover:text-accent transition duration-300">{site.name}</a>
          <nav className="flex gap-8">
            {navLink('#/', 'home', '首页')}
            {navLink('#/collection', 'collection', '收集')}
          </nav>
        </div>
      </header>

      <main className="mx-auto max-w-6xl px-10">
        {page === 'home'
          ? <Home onOpen={onOpen} />
          : <Collection filter={filter} setFilter={setFilter} onOpen={onOpen} />}
      </main>

      <footer className="mx-auto max-w-6xl px-10 pt-20 pb-12 text-xs tracking-wider text-mute">© 2026 {site.name}</footer>

      {page === 'home' && <Leaves />}
      {open && (
        <Detail list={open.list} index={open.index}
          onMove={index => setOpen({ ...open, index })} onClose={() => setOpen(null)} />
      )}
    </div>
  )
}
