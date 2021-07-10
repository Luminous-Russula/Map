// 888     888                   888                    
// 888     888                   888                    
// 888     888                   888                    
// Y88b   d88P  .d88b.   .d8888b 888888 .d88b.  888d888 
//  Y88b d88P  d8P  Y8b d88P"    888   d88""88b 888P"   
//   Y88o88P   88888888 888      888   888  888 888     
//    Y888P    Y8b.     Y88b.    Y88b. Y88..88P 888     
//     Y8P      "Y8888   "Y8888P  "Y888 "Y88P"  888  
class Vector {
    constructor() {
        this.$ = []
        for(let arg of arguments){
            this.$.push(arg)
        }
    }
    
    get isVec(){return true}
    get str(){return `vec{${this.$}}`.replaceAll(',', ', ')}
    
    get x(){return this.$[0]}
    get y(){return this.$[1]}
    get z(){return this.$[2]}
    
    set x(n){this.$[0] = n}
    set y(n){this.$[1] = n}
    set z(n){this.$[2] = n}
    
    mod(other, func){
        function data2vector(){
            let args = arguments[0]
            if(args[0].isVec){
                return arguments[0][0]
            }
            if(args.constructor == Array){
                if(args[0].constructor == Array){
                    return new Vector(...args[0])
                }
                return new Vector(...args)
            }
            return new Vector(...args)
        }
        
        other = data2vector(other)
        let axes = []
        let b = other.$[0]
        for (let i = 0; i < this.$.length; i++) {
            b = other.$[i] != undefined ? other.$[i] : b
            axes.push(func(this.$[i], b))
        }
        return axes
    }
    
    add(){
        let func = (a, b) => a+b
        return new Vector(...this.mod([...arguments], func))
    }
    
    sub(){
        let func = (a, b) => a-b
        return new Vector(...this.mod([...arguments], func))
    }
    
    mul(){
        let func = (a, b) => a*b
        return new Vector(...this.mod([...arguments], func))
    }
    
    div(){
        let func = (a, b) => a/b
        return new Vector(...this.mod([...arguments], func))
    }
    
    get dim(){return this.$.length}
    get ort(){return this.div(this.len)}
    
    get len(){return Math.sqrt(this.$.reduce((acc, cur) => acc + cur*cur, 0))}
    get length(){return Math.sqrt(this.$.reduce((acc, cur) => acc + cur*cur, 0))}
    
    mix(other, ratio = 0.5){
        let v1 = this.mul(ratio)
        let v2 = other.mul(1 - ratio)
        return v1.add(v2)
    }
    
    dist(other){return this.sub(other).len}
    distance(other){return this.sub(other).len}
}

function vec3(x = 0, y = null, z = null){
    y = y == null ? x : y
    z = z == null ? y : z
    return new Vector(x, y, z)
}

function vec2(x = 0, y = null){
    y = y == null ? x : y
    return new Vector(x, y)
}

function vec(){
    return vec2(...arguments)
}










