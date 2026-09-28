import type { CSSProperties } from 'react'
import type { Item } from '../content'

export const labels = { photo: '照片', shot: '截图', note: '短句' }
export const fmt = (date: string) => date.replaceAll('-', '.')

// 没有真实截图时的示意块
function ShotMock({ quote, big }: { quote?: string; big?: boolean }) {
  return (
    <div className={`w-full ${big ? 'aspect-[9/19]' : 'aspect-[9/16]'} bg-panel border border-line rounded-[2px] p-5 flex flex-col gap-3`}>
      <div className="h-1.5 w-12 bg-line" />
      <div className="h-1.5 w-24 bg-line" />
      <p className="my-auto text-sm leading-[1.8]">{quote}</p>
      <div className="h-1.5 w-20 bg-line" />
      <div className="h-1.5 w-10 bg-line" />
    </div>
  )
}

export function ItemBody({ item, big }: { item: Item; big?: boolean }) {
  const ratio: CSSProperties | undefined = item.ratio ? { aspectRatio: item.ratio } : undefined

  if (item.type === 'photo') {
    return big ? (
      <img src={item.src} alt={item.text} className="max-h-[70vh] max-w-full rounded-[2px] bg-mat" />
    ) : (
      <img src={item.src} alt={item.text} loading="lazy" style={ratio}
        className="w-full rounded-[2px] bg-mat group-hover:opacity-90 transition duration-300" />
    )
  }

  if (item.type === 'shot') {
    const shot = item.src
      ? <img src={item.src} alt={item.text} loading={big ? undefined : 'lazy'} style={big ? undefined : ratio}
          className="w-full rounded-[2px] border border-line bg-panel" />
      : <ShotMock quote={item.quote} big={big} />
    // 长截图在详情里可以上下滚动
    return big
      ? <div className="w-[340px] max-h-[70vh] overflow-y-auto">{shot}</div>
      : <div className="group-hover:opacity-90 transition duration-300">{shot}</div>
  }

  return big ? (
    <p className="max-w-xl font-serif font-light text-3xl leading-[1.8] text-center">{item.text}</p>
  ) : (
    <p className="font-serif text-[19px] leading-[1.8] py-7 border-y border-line group-hover:text-accent transition duration-300">
      {item.text}
    </p>
  )
}

export function ItemCard({ item, order, onOpen }: { item: Item; order: number; onOpen: () => void }) {
  return (
    <button type="button" onClick={onOpen} style={{ animationDelay: `${Math.min(order, 8) * 60}ms` }}
      className="fade group block w-full text-left mb-8 break-inside-avoid cursor-pointer">
      <ItemBody item={item} />
      <p className="mt-3 text-xs tracking-wider text-mute">{fmt(item.date)}</p>
    </button>
  )
}
