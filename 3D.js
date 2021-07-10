let scene, camera, render, renderer
let entities = []

function init() {
    scene = new THREE.Scene()
    
    camera = new THREE.PerspectiveCamera(45, window.innerWidth/window.innerHeight, 1, 5000)
    camera.position.z = 12

    renderer = new THREE.WebGLRenderer({antialias:true, alpha:true})
    renderer.setSize(window.innerWidth, window.innerHeight)
    document.querySelector('.hero').insertBefore(renderer.domElement, document.querySelector('.hero__love'))
    renderer.domElement.classList.add('canvas3d')
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
    addPointLight('#fff', 0.25, 1, 1, -5)
    addPointLight('#fff', 0.25, -2, -2, 1)
    addPointLight('#fff', 0.25, 2, 2, 1)
}        
    
function loadModel(source, mat, update = null, first = null){
    let loader = new THREE.GLTFLoader()
    loader.load(`./src/${source}.glb`, function(gltf){
        let mod = gltf.scene.children[0]
        let mesh = new THREE.Mesh(mod.geometry, mat)
        
        mesh.update = update
        scene.add(mesh)
        
        if(first){
            first(mesh)
        }
    })
}

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


init()
lightsOn()

loadModel('Heart',
new THREE.MeshStandardMaterial({
    color: '#fa5',
    metalness: 0,
    roughness: 0.5,
}),
function(){
    let ratio = window.innerWidth / window.innerHeight
    let dist = camera.position.z
    let [x, y] = ratio > 1 ? [0, sin(time(125))*0.05] : [0.5, 0.3]
    x = x * ratio * dist / 2
    y = y / ratio * dist / 2
    this.position.set(x, y, 0)
    this.scale.set(1.5, 1.5, 1.5)
    this.rotation.set(deg(90), deg(sin(time(100))*5), 0)
})

let diamonds = `
-0.5, 2, -5, -33, 1
1.5, -1, -5, 25, 1.5
-1.25, -2, -5, 44, 1.25
0.5, -2.5, -3, 13, 1.75
`

for(let pos of diamonds.split('\n')){
    loadModel('Diamond',
    new THREE.MeshStandardMaterial({
        color: '#222',
        metalness: 0,
        roughness: 0.5,
    }),
    function(){
        let ratio = window.innerWidth / window.innerHeight
        let dist = camera.position.z
        let [x, y, z, t, s] = pos.split(',').map(e => parseFloat(e))
        y += sin(time(t*3))/10
        x = x * ratio * dist / 2
        y = y / ratio * dist / 2
        z = z / ratio * dist / 2
        this.position.set(x, y, z)
        this.scale.set(s, s, s)
        this.rotation.set(0, deg(time(t)), deg(5))
    })
}

loadModel('Torus',
new THREE.MeshStandardMaterial({
    color: '#222',
    metalness: 0,
    roughness: 1,
}),
function(){
    let ratio = window.innerWidth / window.innerHeight
    let dist = camera.position.z
    let [x, y, z, t] = '3, 8, -20, 0.1'.split(',').map(e => parseFloat(e))
    y += sin(time(t*3))/10
    x = x * ratio * dist / 2
    y = y / ratio * dist / 2
    z = z / ratio * dist / 2
    this.position.set(x, y, z)
    this.scale.set(5, 5, 5)
    this.rotation.set(time(t), time(t), time(t))
})

animate()











