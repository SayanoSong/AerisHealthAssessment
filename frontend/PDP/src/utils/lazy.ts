import type { App } from 'vue'
import _ from 'underscore'
interface IListItem {
  el: HTMLImageElement
  src: string
}
let list: IListItem[] = []

export default function (app: App<Element>) {
  lazyDirective(app)
}
function lazyDirective(app: App<Element>) {
  app.directive('lazy', {
    mounted(el, binding) {
      const item = {
        el,
        src: binding.value,
      }
      list.push(item)
      handleImg(item)
    },
    unmounted(el) {
      console.log('Unmounted')
      list = list.filter((item) => item.el !== el)
      console.log(list)
    },
  })
}

function handleImg(item: IListItem) {
  item.el.src = ''
  const rect = item.el.getBoundingClientRect()
  const viewHeight = window.innerHeight
  const isBottom = rect.top >= viewHeight
  const isTop = rect.bottom <= 0
  if (!isBottom && !isTop) {
    item.el.src = item.src
    list = list.filter((imgItem) => imgItem.src !== item.src)
  }
}
window.addEventListener('scroll', _.debounce(handleImgList, 50))

function handleImgList() {
  list.forEach((item) => {
    handleImg(item)
  })
}
