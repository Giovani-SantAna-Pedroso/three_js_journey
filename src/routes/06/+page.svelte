
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

    const canvas = document.getElementById("canvas-t") as HTMLElement
    const scene = new T.Scene()
    const cam = new T.PerspectiveCamera(74, size.ratio)
    // const cam = new T.OrthographicCamera(-1 *size.ratio,1 *size.ratio,1,-1, 0.1, 1000)
    cam.position.z = 3
    // cam.position.y = 2
    // cam.position.x = 2
    scene.add(cam)
    const controls = new OrbitControls(cam, canvas)
    controls.enableDamping = true
    // controls.target.y = 2
    // controls.update()

    const cubeGeo = new T.BoxGeometry(1,1,1,5,5,5)
    const cubeMat = new T.MeshBasicMaterial({color:'red'})
    const cube = new T.Mesh(cubeGeo, cubeMat)
    scene.add(cube)
    cam.lookAt(cube.position)



    const renderer = new T.WebGLRenderer({canvas})
    renderer.setSize(size.w, size.h)

    const clock = new T.Clock()

    const tick =()=>{
      const elapseTime = clock.getElapsedTime()
      // cube.rotation.y = elapseTime

      //update cam
      // cam.position.y = -1 * cursor.y * 3
      // cam.position.x = 1 * cursor.x *3
      // cam.position.x = Math.sin(cursor.x * Math.PI *2 )*2
      // cam.position.z = Math.cos(cursor.x * Math.PI *2 )*2
      // cam.position.y = cursor.y * 5
      // cam.lookAt(cube.position)

      //update controls
      controls.update()
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
