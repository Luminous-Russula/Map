function makeGlassCut(parent, cutwidth=10, clr1='hsla(348, 100%, 90%, 0.5)', clr2='hsla(348, 50%, 17%, 0.1)', clrOutline = '#fff3', outlineWidth=2){
    let bounds = parent.getBoundingClientRect()
    parent.style.position = 'relative'
    parent.style.overflow = 'hidden'
    
    let cnv = document.createElement('canvas')
    cnv.style.position = 'absolute'
    cnv.style.width = '100%'
    cnv.style.height = '100%'
    cnv.style.left = '100%'
    cnv.style.top = '50%'
    cnv.style.transform = 'translate(-100%, -50%)'
    cnv.style.pointerEvents = 'none'
    cnv.style.zIndex = window.getComputedStyle(parent)['z-index']
    parent.appendChild(cnv)
    
    let ctx = cnv.getContext('2d')
    
    let w = bounds.width
    let h = bounds.height
    
    ctx.canvas.width  = w
    ctx.canvas.height = h
    
    ctx.beginPath()
    ctx.moveTo(0, 0)
    ctx.lineTo(w, 0)
    ctx.lineTo(w, h)
    ctx.lineTo(0, h)
    ctx.lineTo(0, 0)
    ctx.closePath()
    
    for(let child of parent.children){
        if(child.nodeName == 'CANVAS'){
            continue
        }
        if(getComputedStyle(child)['border-radius'] != '50%'){
            continue
        }
        
        let boundsC = child.getBoundingClientRect()
        
        let rad = boundsC.width / 2
        let x = boundsC.left - bounds.left + rad
        let y = boundsC.top - bounds.top + rad
        
        ctx.arc(x, y, rad + cutwidth, 0, Math.PI*2)
        ctx.closePath()
        
        setTimeout(()=>{
            ctx.beginPath()
            ctx.strokeStyle = clrOutline
            ctx.lineWidth = outlineWidth
            ctx.arc(x, y, rad + cutwidth, 0, Math.PI*2)
            ctx.closePath()
            ctx.stroke()
        }, 0)
    }
    
    let grad = ctx.createLinearGradient(0, 0, w, h)
    
    grad.addColorStop(0, clr1)
    grad.addColorStop(0, clr2)
    
    ctx.fillStyle = grad
    ctx.fill('evenodd')
}

makeGlassCut(document.querySelector('.glasscut'))












