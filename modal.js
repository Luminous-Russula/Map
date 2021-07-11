function fadeOut(elt){
    elt.fade = setInterval(()=>{
        let alpha = parseFloat(getComputedStyle(elt)['opacity'])
        alpha -= 0.044
        elt.style.opacity = alpha
        if(alpha <= 0){
            clearInterval(elt.fade)
            elt.remove()
        }
    }, 10)
}

function fadeIn(elt){
    elt.style.opacity = 0
    elt.fade = setInterval(()=>{
        let alpha = parseFloat(getComputedStyle(elt)['opacity'])
        alpha += 0.044
        elt.style.opacity = alpha
        if(alpha >= 1){
            elt.style.opacity = 1
            clearInterval(elt.fade)
        }
    }, 10)
}


function popupRender(img, txt){
    document.body.addHtml(`
        <aside class="popup">
        	<div class="popup-wrapper">
        		<button class="popup__cross">&times;</button>
        		<img src="./src/Illustrations/${img}.png" alt="" class="popup__img">
        		<h4 class="popup__text">${txt}</h4>
        	</div>
        </aside>
    `)
    for(let btn of document.querySelectorAll('.popup__cross')){
        btn.onclick = (e)=>{fadeOut(btn.parentNode.parentNode)}
    }
    fadeIn(document.querySelector('.popup'))
}

function popUp(src = ''){
    fetch('data.json')
    .then((response) => {
        return response.json()
    })
    .then((data) => {
        console.log()
        popupRender(src, data[src])
    })
}

// popUp('lorem')

























