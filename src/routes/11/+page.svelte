
<script lang="ts" >

  import GUI from 'lil-gui'; 

  import { onMount } from 'svelte';
  import * as T from 'three'
  import {OrbitControls} from "three/addons/controls/OrbitControls.js"

  import door_import_alpha from '$lib/assets/door/alpha.jpg'
  import door_import_color from '$lib/assets/door/color.jpg'
  import door_import_height from '$lib/assets/door/height.jpg'
  import door_import_normal from '$lib/assets/door/normal.jpg'
  import door_import_metalness from '$lib/assets/door/metalness.jpg'
  import door_import_roughness from '$lib/assets/door/roughness.jpg'
  import door_import_ambientOcclusion from '$lib/assets/door/ambientOcclusion.jpg'
  import matcap1_import from '$lib/assets/matcaps/1.png'
  import matcap2_import from '$lib/assets/matcaps/2.png'
  import matcap3_import from '$lib/assets/matcaps/3.png'
  import matcap4_import from '$lib/assets/matcaps/4.png'
  import matcap5_import from '$lib/assets/matcaps/5.png'
  import matcap6_import from '$lib/assets/matcaps/6.png'
  import matcap7_import from '$lib/assets/matcaps/7.png'
  import matcap8_import from '$lib/assets/matcaps/8.png'
  import gradiente3_import from '$lib/assets/gradients/3.jpg'
  import gradiente5_import from '$lib/assets/gradients/5.jpg'

    import { sortInstancedMesh } from 'three/examples/jsm/utils/SceneUtils.js';
    import { RGBELoader } from 'three/examples/jsm/Addons.js';

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

    const gui = new GUI()
    const canvas = document.getElementById("canvas-t") as HTMLElement
    const scene = new T.Scene()
    const cam = new T.PerspectiveCamera(74, size.ratio)
    cam.position.z = 2
    cam.position.x = 2
    cam.position.y = 2
    scene.add(cam)
    const controls = new OrbitControls(cam, canvas)
    controls.enableDamping = true


    const rgbeLoader = new RGBELoader()
    rgbeLoader.load('/envMaps/2k.hdr', (envMap)=>{
      envMap.mapping = T.EquirectangularReflectionMapping
      scene.background= envMap
      scene.environment = envMap
      })
    

    const textureLoader = new T.TextureLoader()
    const doorColor = textureLoader.load(door_import_color)
    doorColor.colorSpace =  T.SRGBColorSpace
    const doorHeight = textureLoader.load(door_import_height)
    const doorNormal = textureLoader.load(door_import_normal)
    const doorAlpha = textureLoader.load(door_import_alpha)
    const doorMetalness = textureLoader.load(door_import_metalness)
    const doorRoughness = textureLoader.load(door_import_roughness)
    const doorAmbientOcclusion = textureLoader.load(door_import_ambientOcclusion)
    const matcaptT1 = textureLoader.load(matcap1_import)
    matcaptT1.colorSpace = T.SRGBColorSpace
    const matcaptT2 = textureLoader.load(matcap2_import)
    const matcaptT3= textureLoader.load(matcap3_import)
    const gradientT3 = textureLoader.load(gradiente3_import)
    const gradientT5 = textureLoader.load(gradiente5_import)
    // const doorColor = textureLoader.load(door_import_color)
    // const doorColor = textureLoader.load(door_import_color)


    // const mat1= new T.MeshBasicMaterial()
    // mat1.map= doorColor
    // mat1.transparent = true
    // mat1.alphaMap = doorAlpha
    // mat1.side = T.DoubleSide

    // const mat1 = new T.MeshNormalMaterial()

    // const mat1 = new T.MeshMatcapMaterial()
    // mat1.matcap = matcaptT3
    //

    // const mat1 = new T.MeshLambertMaterial()

    // const mat1 = new T.MeshPhongMaterial()
    // mat1.shininess = 100
    // mat1.specular = new T.Color(0x1188ff)
    // const mat1 = new T.MeshToonMaterial()
    // gradientT3.minFilter = T.NearestFilter
    // gradientT3.magFilter = T.NearestFilter
    // gradientT3.generateMipmaps = false
    // mat1.gradientMap =gradientT3
    const mat1 = new T.MeshStandardMaterial()

    mat1.metalness = 0.7
    mat1.roughness = 0.2


    gui.add(mat1, 'metalness').min(0).max(1)
    gui.add(mat1, 'roughness').min(0).max(1)



    const sphere = new T.Mesh(new T.SphereGeometry(.5,16,16) ,mat1)
    const plane = new T.Mesh(new T.PlaneGeometry(1,1) ,mat1)
    const torus = new T.Mesh( new T.TorusGeometry(.3, .2,16,32) ,mat1)

    sphere.position.x = -1.5
    torus.position.x = 1.5
    mat1.side = T.DoubleSide

    scene.add(sphere, plane,torus)

    const ambientLight = new T.AmbientLight(0xffffff, 1)
    scene.add(ambientLight)

    const pointLight = new T.PointLight(0xffffff, 30)
    scene.add(pointLight)
    pointLight.position.x = 2
    pointLight.position.y = 2
    pointLight.position.z = 2


    const renderer = new T.WebGLRenderer({canvas})
    renderer.setSize(size.w, size.h)


    const clock = new T.Clock()

    const tick =()=>{
      const elapseTime = clock.getElapsedTime()

      //update controls
      sphere.rotation.y = elapseTime * Math.PI *0.2
      plane.rotation.y = elapseTime * Math.PI *0.2
      torus.rotation.y = elapseTime * Math.PI *0.2

      sphere.rotation.x = -elapseTime * Math.PI *0.04
      plane.rotation.x = -elapseTime * Math.PI *0.04
      torus.rotation.x = -elapseTime * Math.PI *0.04

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
