
let cnv = document.querySelector('.bounds')
cnv.width = window.innerWidth
cnv.height = window.innerHeight
ctx = cnv.getContext('2d')

let boundsInd = 0
const boundsSpeed = 0.033

function closeBounds(){
    ctx.bounds = setInterval(()=>{
        boundsInd += boundsSpeed
        if(boundsInd >= 1){
            clearInterval(ctx.bounds)
            boundsInd = 1
        }
        updateBounds()
    }, 10)
}

function openBounds(){
    ctx.bounds = setInterval(()=>{
        boundsInd -= boundsSpeed
        if(boundsInd <= 0){
            clearInterval(ctx.bounds)
            boundsInd = 0
        }
        updateBounds()
    }, 10)
}

function updateBounds(){
    ctx.clearRect(0, 0, cnv.width, cnv.height)
    
    ctx.fillStyle = '#fff'
    ctx.strokeStyle = '#eee'
    ctx.lineWidth = 5
    
    ctx.beginPath()
    ctx.moveTo(0, 0)
    ctx.lineTo(cnv.width * boundsInd, 0)
    ctx.lineTo(0, cnv.height * boundsInd)
    ctx.closePath()
    ctx.stroke()
    ctx.fill()
    
    ctx.beginPath()
    ctx.moveTo(cnv.width, cnv.height)
    ctx.lineTo(cnv.width, cnv.height * (1 - boundsInd))
    ctx.lineTo(cnv.width * (1 - boundsInd), cnv.height)
    ctx.closePath()
    ctx.stroke()
    ctx.fill()
}

document.onclick = (e)=>{
    if(boundsInd && boundsInd!=1){return null}
    if(boundsInd){
        openBounds()
    }
    else {
        closeBounds()
    }
}





















