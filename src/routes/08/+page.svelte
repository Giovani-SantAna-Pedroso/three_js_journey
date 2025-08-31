
<script lang="ts" >
  import { onMount } from 'svelte';
  import * as T from 'three'
  import {OrbitControls} from "three/addons/controls/OrbitControls.js"
  import gsap from 'gsap'

  onMount(()=>{
    const size = {w: window.innerWidth, h: window.innerHeight, ratio:window.innerWidth/window.innerHeight}
    //cursor
    const cursor ={
      x:0,
      y:0
    }

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
    cam.position.z = 3
    scene.add(cam)
    const controls = new OrbitControls(cam, canvas)
    controls.enableDamping = true

    const cubeGeo = new T.BoxGeometry(1,1,1,2,2,2)
    const cubeMat = new T.MeshBasicMaterial({wireframe: true, color:'red'})
    const cube = new T.Mesh(cubeGeo, cubeMat)
    // scene.add(cube)
    cam.lookAt(cube.position)

    // const positionsArr =new Float32Array([
    //   0,0,0,
    //   0,1,0,
    //   1,0,0
    // ])

    const geo = new T.BufferGeometry()
    
    const count = 50

    const possitionsArr = new Float32Array(count *3 *3 )
    for(let i =0; i<count*3*3;i++){
      possitionsArr[i] = Math.random() -0.5
    }

    const possitionsAtt = new T.BufferAttribute(possitionsArr, 3)
    geo.setAttribute('position', possitionsAtt)

    const mesh = new T.Mesh(geo, cubeMat)
    scene.add(mesh)




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
