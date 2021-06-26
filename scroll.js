let scroll = document.querySelector('.scrollbar')

let scrollH = scroll.getBoundingClientRect().height
let H = document.body.scrollHeight - window.innerHeight

window.onscroll = (e)=>{
    let h = (window.pageYOffset) / (H + scrollH*2)
    scroll.style.top = `${h*100}%`
}