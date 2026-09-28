import { useEffect, useRef, type MouseEvent } from 'react'
import type { Item } from '../content'
import { ItemBody, fmt, labels } from './Item'

type Props = { list: Item[]; index: number; onMove: (i: number) => void; onClose: () => void }

const arrow = 'absolute top-1/2 -translate-y-1/2 p-4 text-xl text-mute hover:text-accent transition duration-300 cursor-pointer'

export function Detail({ list, index, onMove, onClose }: Props) {
  const item = list[index]
  const closeRef = useRef<HTMLButtonElement>(null)
  const hasPrev = index > 0
  const hasNext = index < list.length - 1

  // 打开时锁住背后页面的滚动（位置保持不变），关闭后把焦点还给原来点的那一条
  useEffect(() => {
    const back = document.activeElement as HTMLElement | null
    document.body.classList.add('overflow-hidden')
    return () => {
      document.body.classList.remove('overflow-hidden')
      back?.focus({ preventScroll: true })
    }
  }, [])

  useEffect(() => closeRef.current?.focus({ preventScroll: true }), [index])

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
      if (e.key === 'ArrowLeft' && hasPrev) onMove(index - 1)
      if (e.key === 'ArrowRight' && hasNext) onMove(index + 1)
    }
    addEventListener('keydown', onKey)
    return () => removeEventListener('keydown', onKey)
  }, [index, hasPrev, hasNext, onMove, onClose])

  const closeOnBackdrop = (e: MouseEvent) => e.target === e.currentTarget && onClose()

  return (
    <div role="dialog" aria-modal="true" aria-label={`${labels[item.type]} · ${fmt(item.date)}`}
      className="fixed inset-0 z-20 bg-paper/90" onClick={closeOnBackdrop}>
      <button type="button" aria-label="上一条" onClick={() => onMove(index - 1)}
        className={`${arrow} left-6 ${hasPrev ? '' : 'invisible'}`}>←</button>
      <button type="button" aria-label="下一条" onClick={() => onMove(index + 1)}
        className={`${arrow} right-6 ${hasNext ? '' : 'invisible'}`}>→</button>

      <div className="h-full flex items-center justify-center px-28 py-12" onClick={closeOnBackdrop}>
        <div key={index} className="fade relative bg-panel rounded-[2px] shadow-soft px-16 pt-16 pb-10 flex flex-col items-center max-w-full">
          <button ref={closeRef} type="button" onClick={onClose}
            className="absolute top-5 right-5 text-sm text-mute border border-line rounded-[2px] px-4 py-1.5 hover:text-accent hover:border-accent transition duration-300 cursor-pointer">
            关闭
          </button>
          <ItemBody item={item} big />
          {item.type === 'note' ? (
            <p className="mt-8 text-xs tracking-wider text-mute">{fmt(item.date)}</p>
          ) : (
            <>
              <p className="mt-6 text-center">{item.text}</p>
              <p className="mt-2 text-xs tracking-wider text-mute">{labels[item.type]} · {fmt(item.date)}</p>
            </>
          )}
        </div>
      </div>
    </div>
  )
}
