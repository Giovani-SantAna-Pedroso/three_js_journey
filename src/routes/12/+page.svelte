

<script lang="ts" >

  import GUI from 'lil-gui'; 

  import { onMount } from 'svelte';
  import * as T from 'three'
  import {OrbitControls} from "three/addons/controls/OrbitControls.js"
  import gsap from 'gsap'
  import {FontLoader} from 'three/addons/loaders/FontLoader.js'
  import {TextGeometry} from 'three/addons/geometries/TextGeometry.js'

  onMount(()=>{
    const size = {w: window.innerWidth, h: window.innerHeight, ratio:window.innerWidth/window.innerHeight}


    window.addEventListener('resize', ()=>{
      size.w =window.innerWidth,
      size.h= window.innerHeight
      size.ratio = window.innerWidth/window.innerHeight
      cam.aspect = size.ratio
      cam.updateProjectionMatrix()
      renderer.setSize(size.w, size.h)
      renderer.setPixelRatio(Math.min(2, window.devicePixelRatio))
    })

    window.addEventListener('dblclick', ()=>{
      // to work on apple devices
      const fullscreenElement = document.fullscreenElement
      if(!fullscreenElement){
        if(canvas.requestFullscreen){
          canvas.requestFullscreen()
        }
      }
      else{
        if(document.exitFullscreen){
          document.exitFullscreen()
        }

        }
        
    })


    const canvas = document.getElementById("canvas-t") as HTMLElement
    const scene = new T.Scene()
    const cam = new T.PerspectiveCamera(74, size.ratio)
    cam.position.z = 2
    cam.position.x = 2
    cam.position.y = 2
    scene.add(cam)
    const controls = new OrbitControls(cam, canvas)
    controls.enableDamping = true

    const cubeGeo = new T.BoxGeometry(1,1,1,2,2,2)
    const cubeMat = new T.MeshBasicMaterial()
    const cube = new T.Mesh(cubeGeo, cubeMat)
    // scene.add(cube)
    // const axesHelper = new T.AxesHelper()
    // scene.add( axesHelper)
    const textureLoader = new T.TextureLoader()
    const mapcapTexture = textureLoader.load('/matcaps/1.png')
    mapcapTexture.colorSpace = T.SRGBColorSpace

    const fontLoader = new FontLoader()
    fontLoader.load('/fonts/helvetiker_regular.typeface.json ',(font)=>{
      console.log("font loaded")
      const textGeo = new TextGeometry('Test Text, font',{font:font, size: 0.5, depth:0.2,curveSegments:4, bevelEnabled:true,

        bevelThickness:0.03,
        bevelSize:0.02,
        bevelOffset:0,
        bevelSegments:4,
      })
      // textGeo.computeBoundingBox()
      // textGeo.translate(
      //   -(textGeo.boundingBox?.max.x -0.02) * 0.5,
      //   -(textGeo.boundingBox?.max.y  -0.02)* 0.5,
      //   -(textGeo.boundingBox?.max.z - 0.03)* 0.5,
      // )
      textGeo.center()
      const textMat = new T.MeshMatcapMaterial({matcap: mapcapTexture})
      const text = new T.Mesh(textGeo,textMat)
      // text.material.wireframe = true
      scene.add(text)


      }) 

    const donutGeometry = new T.TorusGeometry(0.3, 0.2, 20, 45)
    const donutMat = new T.MeshMatcapMaterial({matcap:mapcapTexture})
    const getRandomPoint = (limit:number) =>{
      return (Math.random() - 0.5) *limit
    }
    const getRandomRotation = () =>{
      return (Math.random()*2)*Math.PI

    }
    const limit = 6
    console.time('donut')
    for (let i =0; i<100;i++){

      const scale = Math.random() * .6
      const donut = new T.Mesh(donutGeometry, donutMat)
      donut.position.set(getRandomPoint(limit), getRandomPoint(limit), getRandomPoint(limit))
      donut.scale.set(scale, scale,scale)
      donut.rotation.set(getRandomRotation(),getRandomRotation(),0)
      scene.add(donut)


    }
    console.timeEnd('donut')



    const renderer = new T.WebGLRenderer({canvas})
    renderer.setSize(size.w, size.h)


    const clock = new T.Clock()

    const tick =()=>{
      const elapseTime = clock.getElapsedTime()

      //update controls
      controls.update()
      renderer.render(scene,cam )
      window.requestAnimationFrame(tick)
    }


    tick()

  })


</script>

<main class="min-w-screen min-h-screen">
  <canvas class="min-w-screen min-h-screen" id="canvas-t" ></canvas>
</main>
