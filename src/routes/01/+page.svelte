<script lang="ts" >
  import { onMount } from 'svelte';
  import * as T from 'three'

  onMount(()=>{

    const canvas = document.getElementById("canvas-t") as HTMLElement
    const scene = new T.Scene()
    const size = {w: window.innerWidth, h: window.innerHeight, ratio:window.innerWidth/window.innerHeight}
    const cam = new T.PerspectiveCamera(74, size.ratio)
    cam.position.z = 3
    cam.position.x = 1
    cam.position.y = 1
    scene.add(cam)

    const cubeGeo = new T.BoxGeometry(1,1,1)
    const cubeMat = new T.MeshBasicMaterial({color:'red'})
    const cube = new T.Mesh(cubeGeo, cubeMat)
    scene.add(cube)

    cube.position.y = 1
    cube.scale.y = 2.2


    const axesHelper = new T.AxesHelper(4)
    scene.add(axesHelper)

    cam.lookAt(cube.position)


    const renderer = new T.WebGLRenderer({canvas})
    renderer.setSize(size.w, size.h)

    renderer.render(scene,cam )
  })


</script>

<main class="min-w-screen min-h-screen">
  <div class=" text-white p-2 absolute top-0 right-0 bg-[#1a1a1a] border-l border-b">04</div>
  <canvas class="min-w-screen min-h-screen" id="canvas-t" ></canvas>
</main>
