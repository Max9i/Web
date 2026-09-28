// 网站内容都在这个文件里，改内容只需改这里。
// 真实照片和截图放进 public/photos/，src 写成 '/photos/文件名.jpg'。
// ratio 是宽/高比例（如 '4/5'），用来在图片加载前占好位置，可以不写。

export type Item = {
  type: 'photo' | 'shot' | 'note'
  date: string // YYYY-MM-DD，页面会自动按时间从新到旧排序
  text: string // 照片/截图的说明；短句的正文
  src?: string
  ratio?: string
  quote?: string // 仅示例截图占位用，有了真实截图后删掉
}

export const site = {
  name: 'Shuhuai',
  greeting: 'Hi, Shuhuai!',
  intro: '在这里存放我拍下的、截下的和随手记下的东西。',
}

const pic = (id: number, w: number, h: number) => `https://picsum.photos/id/${id}/${w * 300}/${h * 300}`

// 以下全部是示例内容，等 Shuhuai 提供真实内容后替换
export const items: Item[] = [
  { type: 'photo', date: '2026-09-26', text: '傍晚回家路上的天。', src: pic(399, 4, 5), ratio: '4/5' },
  { type: 'note', date: '2026-09-24', text: '今天什么都没做，但心情不错。' },
  { type: 'shot', date: '2026-09-21', text: '朋友发来的一句话。', quote: '慢慢来，比较快。' },
  { type: 'photo', date: '2026-09-18', text: '楼下新开的咖啡店。', src: pic(42, 3, 2), ratio: '3/2' },
  { type: 'photo', date: '2026-09-12', text: '桌上的光。', src: pic(201, 1, 1), ratio: '1/1' },
  { type: 'note', date: '2026-09-08', text: '秋天第一次穿外套。' },
  { type: 'shot', date: '2026-09-02', text: '书里看到的一段话。', quote: '（书摘占位：一段喜欢的文字）' },
  { type: 'photo', date: '2026-08-28', text: '湖上。', src: pic(1011, 4, 5), ratio: '4/5' },
  { type: 'note', date: '2026-08-20', text: '下雨天适合什么都不想。' },
  { type: 'photo', date: '2026-08-15', text: '路过的巷子。', src: pic(1047, 3, 2), ratio: '3/2' },
  { type: 'shot', date: '2026-08-09', text: '备忘录里的一条。', quote: '（截图占位：备忘录内容）' },
  { type: 'photo', date: '2026-08-03', text: '山里的路。', src: pic(1018, 2, 3), ratio: '2/3' },
  { type: 'note', date: '2026-07-30', text: '夏天快过完了。' },
  { type: 'photo', date: '2026-07-22', text: '一壶茶。', src: pic(225, 3, 2), ratio: '3/2' },
  { type: 'shot', date: '2026-07-15', text: '聊天记录里的一句。', quote: '（截图占位：一段对话）' },
  { type: 'photo', date: '2026-07-06', text: '七月的雪山。', src: pic(1036, 4, 5), ratio: '4/5' },
]
