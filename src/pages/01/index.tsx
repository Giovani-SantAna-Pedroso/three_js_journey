import * as T from "three";

export default function Home() {
  console.log("three");
  console.log(T);
  return (
    <main className="  flex items-center justify-center min-h-screen min-w-screen">
      <div className="text-white text-md p-2 border border-white absolute top-0 right-0 bg-black">
        01
      </div>
      <canvas id="canvas"></canvas>
    </main>
  );
}
