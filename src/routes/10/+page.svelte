
<script lang="ts" >

  import GUI from 'lil-gui'; 

  import { onMount } from 'svelte';
  import * as T from 'three'
  import {OrbitControls} from "three/addons/controls/OrbitControls.js"
  import gsap from 'gsap'
  import minecraft from '$lib/assets/minecraft.png'
  import checkBoard0 from '$lib/assets/checkerboard-8x8.png'
  import checkBoard1 from '$lib/assets/checkerboard-1024x1024.png'
  import alpha from '$lib/assets/door/alpha.jpg'
  import color from '$lib/assets/door/color.jpg'
  import height from '$lib/assets/door/height.jpg'
  import normal from '$lib/assets/door/normal.jpg'
  import metalness from '$lib/assets/door/metalness.jpg'
  import roughness from '$lib/assets/door/roughness.jpg'
  import ambientOcclusion from '$lib/assets/door/ambientOcclusion.jpg'
    import { text } from '@sveltejs/kit';

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

    // Textures

    // Old version
    // const img = new Image()
    // const texture = new T.Texture(img)
    // texture.colorSpace = T.SRGBColorSpace
    // img.onload = () =>{
    //   texture.needsUpdate = true
    // }
    //
    // img.src = minecraft
    const textureLoader = new T.TextureLoader()

    // const colorT = textureLoader.load(color)
    const colorT = textureLoader.load(minecraft)
    // const colorT = textureLoader.load(checkBoard0)
    // const colorT = textureLoader.load(checkBoard1)
    const alphaT = textureLoader.load(alpha)
    const heightT = textureLoader.load(height)
    const   normalT = textureLoader.load(normal)
    const ambientOcclusionT = textureLoader.load(ambientOcclusion)
    const metalnessT = textureLoader.load(metalness)
    const roughnessT = textureLoader.load(roughness)
    colorT.colorSpace = T.SRGBColorSpace
    // colorT.repeat.x = 2
    // colorT.repeat.y =3
    // colorT.wrapS = T.RepeatWrapping
    // colorT.wrapT = T.RepeatWrapping
    colorT.minFilter = T.NearestFilter
    colorT.magFilter= T.NearestFilter


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
    const cubeMat = new T.MeshBasicMaterial({map:colorT})
    const cube = new T.Mesh(cubeGeo, cubeMat)
    scene.add(cube)



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
