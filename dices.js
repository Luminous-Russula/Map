let scene, camera, render, renderer
let entities = []

function init() {
    scene = new THREE.Scene()
    // scene.background = null
    
    camera = new THREE.PerspectiveCamera(45, window.innerWidth/window.innerHeight, 1, 5000)
    camera.position.z = 12

    renderer = new THREE.WebGLRenderer({antialias:true, alpha:true})
    renderer.setSize(window.innerWidth, window.innerHeight)
    // document.body.appendChild(renderer.domElement)
    document.querySelector('.bg').insertBefore(renderer.domElement, document.querySelector('.bg').firstChild)
    renderer.domElement.classList.add('dicesbg')
}

function addAmbientLight(clr, power){
    let light = new THREE.AmbientLight(clr, power)
    scene.add(light)
    return light
}

function addPointLight(clr, power, x, y, z){
    let light = new THREE.PointLight(clr, power)
    light.position.set(x, y, z)
    scene.add(light)
    return light
}

function lightsOn(){
    addAmbientLight('#fff', 1)
    addPointLight('#fff', 0.5, 1, 1, 1)
    addPointLight('#fff', 0.5, -1, -1, 1)
    addPointLight('#fff', 0.5, 1, -1, 1)
}        
    
function loadDice(update = null, dark){
    let loader = new THREE.GLTFLoader()
    loader.load('./src/Models/TestDiceSolid.glb', function(gltf){
        let obj = gltf.scene.children[0]
        
        setTimeout(function(){}, 0)
        
        let [dice,dots] = obj.children
        
        let dicemat = new THREE.MeshStandardMaterial(
        {color: dark ? '#111' : '#666', metalness:0, roughness: 0.5})
        let dotsmat = new THREE.MeshStandardMaterial(
        {color: '#501', metalness:0, roughness: 0})
        
        dice = new THREE.Mesh(dice.geometry, dicemat)
        dots = new THREE.Mesh(dots.geometry, dotsmat)
        
        for(let ent of [dice, dots]){
            ent.update = update ? update : null
        }
        
        scene.add(dice)
        scene.add(dots)
    })
}

init()
lightsOn()
loadDice(function(){
    let ratio = window.innerWidth / window.innerHeight
    let dist = camera.position.z
    let [x, y] = ratio > 1 ? [0.66, 0.85] : [0.5, 0.3]
    x = x * ratio * dist / 2
    y = y / ratio * dist / 2
    this.position.set(x, y, 0)
    this.rotation.set(deg(45)+time(1), deg(45)+time(1), deg(45))
}, 1)

loadDice(function(){
    let ratio = window.innerWidth / window.innerHeight
    let dist = camera.position.z
    let [x, y] = ratio > 1 ? [-0.6, -0.8] : [-0.6, -0.3]
    x = x * ratio * dist / 2
    y = y / ratio * dist / 2
    this.position.set(x, y, 0)
    this.scale.set(1.5, 1.5, 1.5)
    this.rotation.set(-time(3/10), time(2/10), time(1/10))
})

function animate(){
    requestAnimationFrame(animate)
    renderer.render(scene, camera)
    for(let ent of scene.children){
        if(ent.update){
            ent.update()
        }
    }
}

function onResize(){
    camera.aspect = window.innerWidth / window.innerHeight
    camera.updateProjectionMatrix()
    renderer.setSize(window.innerWidth, window.innerHeight)
    animate()
}

window.onresize = onResize

animate()











