let scroll = document.querySelector('.scrollbar')

let scrollH = scroll.getBoundingClientRect().height
let H = document.body.scrollHeight - window.innerHeight

window.onscroll = (e)=>{
    let h = (window.pageYOffset) / (H + scrollH*2)
    scroll.style.top = `${h*100}%`
}

let anchor = document.querySelector('.level')
let gobtn = document.querySelector('.main__gobtn')
let cury, targy

gobtn.onclick = (e)=>{
    cury = window.pageYOffset
    targy = anchor.getBoundingClientRect().top - 10
    
    gobtn.smoothScroll = setInterval(()=>{
        cury = cury + (targy - cury)/25 + 5
        window.scrollTo(0, cury)
        
        if(Math.abs(cury - targy) < 10){
            window.scrollTo(0, targy)
            clearInterval(gobtn.smoothScroll)
        }
    }, 10)
}









