
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
            setTimeout(()=>{
                window.scrollTo(0, 10**4)
                openBounds()
            }, 50)
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
    
    ctx.fillStyle = '#ddd'
    
    ctx.beginPath()
    ctx.moveTo(0, 0)
    ctx.lineTo(cnv.width * boundsInd, 0)
    ctx.lineTo(0, cnv.height * boundsInd)
    ctx.closePath()
    ctx.fill()
    
    
    ctx.fillStyle = '#ddd'
    ctx.beginPath()
    ctx.moveTo(cnv.width, cnv.height)
    ctx.lineTo(cnv.width, cnv.height * (1 - boundsInd))
    ctx.lineTo(cnv.width * (1 - boundsInd), cnv.height)
    ctx.closePath()
    ctx.fill()
}

document.body.onload = ()=>{
    setTimeout(()=>{
        window.scrollTo(0, 0)
    }, 10)
    let goBtn = document.body.addElement('go-button', 'button')
    goBtn.innerText = 'Начать'
    goBtn.onclick = (e)=> {
        closeBounds()
    }
}

















