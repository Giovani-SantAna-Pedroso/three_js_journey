
<script lang="ts" >
  import { onMount } from 'svelte';
  import * as T from 'three'
  import gsap from 'gsap'

  onMount(()=>{

    const canvas = document.getElementById("canvas-t") as HTMLElement
    const scene = new T.Scene()
    const size = {w: window.innerWidth, h: window.innerHeight, ratio:window.innerWidth/window.innerHeight}
    const cam = new T.PerspectiveCamera(74, size.ratio)
    cam.position.z = 3
    scene.add(cam)

    const cubeGeo = new T.BoxGeometry(1,1,1)
    const cubeMat = new T.MeshBasicMaterial({color:'red'})
    const cube = new T.Mesh(cubeGeo, cubeMat)
    scene.add(cube)



    const renderer = new T.WebGLRenderer({canvas})
    renderer.setSize(size.w, size.h)

    let dir = 1
    // native JS
    let time = Date.now()
    const clock = new T.Clock()
    gsap.to(cube.position, {duration: 2, delay: 1.2,x:2})
    gsap.to(cube.position, {duration: 2, delay: 2.4,x:0})
 
    const tick =()=>{
      const elapseTime = clock.elapsedTime
      const delta = clock.getDelta() * 1000
      //using natime js
      // const crrTime = Date.now()
      // const delta =crrTime - time 
      // time = crrTime
      // console.log('dleta:',delta)
      // if (cube.position.x >= 1.04){
      //   dir = -1
      // }
      // if (cube.position.x <= -1.04){
      //   dir = 1
      // }
      // cube.position.x = Math.sin(elapseTime)
      // cube.position.y = Math.cos(elapseTime)
      // cube.rotation.y = elapseTime
      renderer.render(scene,cam )
      window.requestAnimationFrame(tick)
    }

    tick()

  })


</script>

<main class="min-w-screen min-h-screen">
  <div class=" text-white p-2 absolute top-0 right-0 bg-[#1a1a1a] border-l border-b">05</div>
  <canvas class="min-w-screen min-h-screen" id="canvas-t" ></canvas>
</main>
