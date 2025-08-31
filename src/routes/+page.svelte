<script lang="ts"   >

  const  routes:string[] =[]
  const maxClasses= 67
  for(let i=1; i<= maxClasses; i++){
    routes.push(`${i<10? "0": ""}${i}`)
  }


</script>
<main class=" flex flex-col min-h-screen w-screen text-white p-2 absolute top-0 right-0 bg-[#1a1a1a] border-l border-b">
  {#each routes as route }
    <a class="underline my-4" href={`/${route}`}>Class {route}</a>
  {/each    }
</main>

