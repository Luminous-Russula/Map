function pi(){return Math.PI}function deg(t){return t/180*pi()}function sin(t){return Math.sin(deg(t))}function cos(t){return Math.cos(deg(t))}function random(){if(1==arguments.length)return Math.random()*arguments[0];if(2==arguments.length){let[t,e]=arguments;return Math.random()*(e-t)+t}return Math.random()}function randint(){if(1==arguments.length)return parseInt(Math.random()*arguments[0]);if(2==arguments.length){let[t,e]=arguments;return parseInt(Math.random()*(e-t)+t)}return Math.round(Math.random())}function randelt(t){return t[parseInt(Math.random()*t.length)]}function time(t=1){return Date.now()/1e3*t}function toClipboard(){let t="";Array.from(arguments).forEach((e,n)=>{t+=e+" "}),t=t.trim(),window.clipboardInterval=setInterval(()=>{navigator.clipboard.writeText(t).then(()=>{clearInterval(window.clipboardInterval)}).catch(t=>{})},10)}function copyAllLocalScripts(t){let e=[],n=document.querySelectorAll("script");for(script of n)script.src.includes(window.location.href)&&e.push(script.src);let r="";e.forEach((t,n)=>{fetch(t).then(t=>t.text()).then(t=>{r+=t,n==e.length-1&&toClipboard(r=r.replaceAll("",""))})})}function parseCss(t){t=t.split("{");let e=[];t.forEach((t,n)=>{t.split("}").forEach((t,n)=>{e.push(t)})}),t=(t=e.map(t=>t.trim())).filter(t=>t);for(let e=0;e<t.length;e+=2){let n=t[e],r=t[e+1];for(let t of document.querySelectorAll(n))t.applyCss(r)}}function addElement(t,e,n="div"){"string"==typeof e&&(e=document.querySelector(e));let r=document.createElement(n);return"."==t[0]?r.classList.add(t.slice(1)):"#"==t[0]?r.id=t.slice(1):r.classList.add(t),e.appendChild(r),r}Element.prototype.addHtml=function(t,e="beforeend"){this.insertAdjacentHTML(e,t)},Element.prototype.applyCss=function(t){(t=(t=(t=(t=t.replaceAll(";","")).split("\n")).map(t=>t=(t=[(t=t.split(":"))[0],t.slice(1).join(":")]).map(t=>t.trim()))).filter(t=>t[0]?1:0)).forEach((t,e)=>{let[n,r]=t;this.style[n]=r})},Element.prototype.addElement=function(t,e="div"){return addElement(t,this,e)};class Vector{constructor(){this.$=[];for(let t of arguments)this.$.push(t)}get isVec(){return!0}get str(){return`vec{${this.$}}`.replaceAll(",",", ")}get x(){return this.$[0]}get y(){return this.$[1]}get z(){return this.$[2]}set x(t){this.$[0]=t}set y(t){this.$[1]=t}set z(t){this.$[2]=t}mod(t,e){let n=[],r=(t=function(){let t=arguments[0];return t[0].isVec?arguments[0][0]:t.constructor==Array&&t[0].constructor==Array?new Vector(...t[0]):new Vector(...t)}(t)).$[0];for(let i=0;i<this.$.length;i++)r=null!=t.$[i]?t.$[i]:r,n.push(e(this.$[i],r));return n}add(){return new Vector(...this.mod([...arguments],(t,e)=>t+e))}sub(){return new Vector(...this.mod([...arguments],(t,e)=>t-e))}mul(){return new Vector(...this.mod([...arguments],(t,e)=>t*e))}div(){return new Vector(...this.mod([...arguments],(t,e)=>t/e))}get dim(){return this.$.length}get ort(){return this.div(this.len)}get len(){return Math.sqrt(this.$.reduce((t,e)=>t+e*e,0))}get length(){return Math.sqrt(this.$.reduce((t,e)=>t+e*e,0))}mix(t,e=.5){let n=this.mul(e),r=t.mul(1-e);return n.add(r)}dist(t){return this.sub(t).len}distance(t){return this.sub(t).len}}function vec3(t=0,e=null,n=null){return new Vector(t,e=null==e?t:e,n=null==n?e:n)}function vec2(t=0,e=null){return new Vector(t,e=null==e?t:e)}function vec(){return vec2(...arguments)}function rgbToHex(){let[t,e,n]=arguments,r=arguments.length>3?arguments[3]:1;function i(t){var e=t.toString(16);return 1==e.length?"0"+e:e}return r*=255,r=parseInt(r),"#"+i(t)+i(e)+i(n)+i(r)}function rgbToHsl(){let[t,e,n]=arguments,r=1;arguments.length>3&&(r=arguments[3]),t/=255,e/=255,n/=255;var i,s,l=Math.max(t,e,n),o=Math.min(t,e,n),a=(l+o)/2;if(l==o)i=s=0;else{var u=l-o;switch(s=a>.5?u/(2-l-o):u/(l+o),l){case t:i=(e-n)/u+(e<n?6:0);break;case e:i=(n-t)/u+2;break;case n:i=(t-e)/u+4}i/=6}return[i*=360,s*=100,a*=100,r]}function hslToRgb(){let[t,e,n]=arguments,r=arguments.length>3?arguments[3]:1;var i,s,l;if(t/=360,n/=100,0==(e/=100))i=s=l=n;else{var o=function(t,e,n){return n<0&&(n+=1),n>1&&(n-=1),n<1/6?t+6*(e-t)*n:n<.5?e:n<2/3?t+(e-t)*(2/3-n)*6:t},a=n<.5?n*(1+e):n+e-n*e,u=2*n-a;i=o(u,a,t+1/3),s=o(u,a,t),l=o(u,a,t-1/3)}return[Math.round(255*i),Math.round(255*s),Math.round(255*l),r]}function hexToRgb(t){if(5==t.length||9==t.length){var e=/^#?([a-f\d])([a-f\d])([a-f\d])([a-f\d])$/i;return t=t.replace(e,function(t,e,n,r,i){return e+e+n+n+r+r+i+i}),(n=/^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(t))?[parseInt(n[1],16),parseInt(n[2],16),parseInt(n[3],16),parseInt(n[4],16)/256]:null}var n;e=/^#?([a-f\d])([a-f\d])([a-f\d])$/i;return t=t.replace(e,function(t,e,n,r){return e+e+n+n+r+r}),(n=/^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(t))?[parseInt(n[1],16),parseInt(n[2],16),parseInt(n[3],16),1]:null}class Color{constructor(t=255,e,n,r){this.$=new Array(7).fill(0),this.r=t,this.g=null==e?this.r:e,this.b=null==n?this.g:n,this.a=null==r?1:r,this.updateHsl()}get rgb(){return`rgb(${this.r}, ${this.g}, ${this.b}, ${this.a})`}get hsl(){return`rgb(${this.h}, ${this.s}%, ${this.l}%, ${this.a})`}get hex(){return rgbToHex(this.r,this.g,this.b,this.a)}updateHsl(){[this.$[4],this.$[5],this.$[6]]=rgbToHsl(this.r,this.g,this.b)}updateRgb(){[this.$[0],this.$[1],this.$[2]]=hslToRgb(this.h,this.s,this.l)}set r(t){this.$[0]=t,this.updateHsl()}set g(t){this.$[1]=t,this.updateHsl()}set b(t){this.$[2]=t,this.updateHsl()}set a(t){this.$[3]=t}set h(t){this.$[4]=t,this.updateRgb()}set s(t){this.$[5]=t,this.updateRgb()}set l(t){this.$[6]=t,this.updateRgb()}get r(){return this.$[0]}get g(){return this.$[1]}get b(){return this.$[2]}get a(){return this.$[3]}get h(){return this.$[4]}get s(){return this.$[5]}get l(){return this.$[6]}mod(t,e){let n=this.$.slice(0,4),r=t.$.slice(0,3);return n=n.map((t,n)=>{let i=r[n];return null!=i?e(t,i):t}),new Color(...n)}add(t){return this.mod(t,(t,e)=>t+e)}sub(t){return this.mod(t,(t,e)=>t-e)}div(t){return this.mod(t,(t,e)=>t/e)}mul(t){return this.mod(t,(t,e)=>t*e)}mix(t,e=.5){let n=this.mul(new Color(e)),r=t.mul(new Color(1-e));return n.add(r)}}class ColorHsl extends Color{constructor(t=0,e=100,n=50,r=1){super(),this.$=new Array(7).fill(0),this.h=t,this.s=e,this.l=n,this.a=r,this.updateRgb()}}function Clr(){return new Color(...arguments)}function Hsl(){return new ColorHsl(...arguments)}function createImageDropper(t="#fa5"){return document.body.addHtml('\n        <div class="file-input">\n            <div class="file-input-wrapper">\n                <input type="file" class="file-input__input" multiple>\n                <h4 class="file-input__tip">Drop your file</h4>\n            </div>\n            <h5 class="file-input__fname">No file</h5>\n        </div>\n    '),parseCss(`\n        .file-input {\n            transition-duration: 500ms;\n            display: flex;\n            justify-content: center;\n            align-items: center;\n            flex-direction: column;\n            position: fixed;\n            left: 50%;\n            top: 50%;\n            transform: translate(-50%, -50%);\n            background-color: #0008;\n            box-shadow: 0 0 0 10000px #0008;\n            z-index: 1000;\n        }\n        .file-input-wrapper {\n            position: relative;\n            overflow: hidden;\n            border: 5px dashed ${t};\n            border-radius: 15px;\n            width: 75vh;\n            height: 75vh;\n        }\n        .file-input__tip, .file-input__fname {\n            user-select: none;\n            pointer-events: none;\n        }\n        .file-input__tip {\n            position: absolute;\n            left: 50%;\n            top: 50%;\n            transform: translate(-50%, -50%);\n            width: 100%;\n            font-size: 72px;\n            color: ${t};\n            text-align: center;\n        }\n        .file-input__input {\n            opacity: 0;\n            width: 100%;\n            height: 100%;\n        }\n        .file-input__fname {\n            font-size: 33px;\n            width: 100%;\n            text-align: center;\n            padding-top: 20px;\n            color: ${t};\n        }\n        .file-input{\n            display: none\n            opacity: 0\n        }\n    `),document.querySelector(".file-input")}function dropperHooks(t){document.onmousemove=(e=>{t.applyCss("\n            display: none\n            opacity: 0\n        ")}),document.ondragover=(e=>{t.applyCss("\n            display: flex\n            opacity: 1\n        ")}),t.ondrop=(e=>{t.applyCss("\n            display: flex\n            opacity: 1\n        ")})}function imageDropperInit(){let t=document.querySelector(".file-input");dropperHooks(t=t||createImageDropper()),t.querySelector(".file-input__input").onchange=function(e){for(let e of this.files){let n=new FileReader;n.onload=(()=>{handleImageDrop(n.result)}),n.readAsDataURL(e),t.querySelector(".file-input__fname").innerText=e.name}},document.onpaste=(t=>{var e=(t.clipboardData||t.originalEvent.clipboardData).items;for(let t of e)if("file"===t.kind){let e=new FileReader;e.onload=(()=>{handleImageDrop(e.result)}),e.readAsDataURL(t.getAsFile())}})}function handleImageDrop(t){}