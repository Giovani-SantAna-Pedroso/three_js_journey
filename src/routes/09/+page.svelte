


<script lang="ts" >

  import GUI from 'lil-gui'; 

  import { onMount } from 'svelte';
  import * as T from 'three'
  import {OrbitControls} from "three/addons/controls/OrbitControls.js"
  import gsap from 'gsap'

  onMount(()=>{
    const size = {w: window.innerWidth, h: window.innerHeight, ratio:window.innerWidth/window.innerHeight}

    const gui = new GUI({
      width:600,
      title:"Debug",

      closeFolders:true
      });
    const debugObj = {
      color: "#2e4a40"
    }
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

    debugObj.spin =()=>{
      gsap.to(cube.rotation, {y:cube.rotation.y + Math.PI * 2, duration:2})

    }
    debugObj.subdivision = 2

    const canvas = document.getElementById("canvas-t") as HTMLElement
    const scene = new T.Scene()
    const cam = new T.PerspectiveCamera(74, size.ratio)
    cam.position.z = 3
    scene.add(cam)
    const controls = new OrbitControls(cam, canvas)
    controls.enableDamping = true

    const cubeGeo = new T.BoxGeometry(1,1,1,2,2,2)
    const cubeMat = new T.MeshBasicMaterial({wireframe: true, color:debugObj.color})
    const cube = new T.Mesh(cubeGeo, cubeMat)
    scene.add(cube)

    const cubeTweaks = gui.addFolder('cube tweaks')

    cubeTweaks.add(cube.position, 'x').min(-3).max(3).step(0.1).name("position x")
    cubeTweaks.add(cube.material, 'wireframe')
    cubeTweaks.add(cube, 'visible')
    gui.addColor(debugObj,'color').onChange((value:any)=>{
      
        cubeMat.color.set(debugObj.color)
      })
    gui.add(debugObj, 'spin')
    gui.add(debugObj,'subdivision'). min(1).max(20).step(1).onFinishChange(()=>{
      cube.geometry.dispose()
      cube.geometry = new T.BoxGeometry(
      1,1,1,debugObj.subdivision,debugObj.subdivision,debugObj.subdivision);
      
      })

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
