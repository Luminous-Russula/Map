const SLIDE = 230

for(let direction of 'left right'.split(' ')){
    let spin = direction == 'left' ? 1 : -1
    for(let btn of document.querySelectorAll(`.main-advice-content__${direction}`)){
        btn.onclick = (e)=>{
            let wrapper = btn.parentNode.children[1]
            let content = wrapper.children[0]
            
            let w1 = parseInt(getComputedStyle(wrapper)['width'])
            let w2 = parseInt(getComputedStyle(content)['width'])
            
            let width = w2 - w1 + 15
            let offset = getComputedStyle(content)['transform']
            
            offset = parseInt(offset.split(',')[4])
            offset = offset ? offset : 0
            offset += SLIDE * spin
            offset = offset > 0 ? 0 : offset
            offset = -offset > width ? -width : offset
            console.log(offset, width);
            content.style.transform = `translateX(${offset}px)`
        }
    }
}
























