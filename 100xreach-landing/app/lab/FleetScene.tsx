"use client";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float, RoundedBox } from "@react-three/drei";
import { useRef } from "react";
import * as THREE from "three";
function Device({ index, count, active }: { index:number; count:number; active:boolean }) {
 const ref=useRef<THREE.Group>(null);
 const cols=Math.min(10,Math.ceil(Math.sqrt(count*1.6)));
 const rows=Math.ceil(count/cols);
 const col=index%cols,row=Math.floor(index/cols);
 useFrame(({clock})=>{if(ref.current)ref.current.position.y=(row-(rows-1)/2)*-0.92+Math.sin(clock.elapsedTime*0.7+index*0.3)*0.025;});
 return <group ref={ref} position={[(col-(cols-1)/2)*0.64,0,0]} rotation={[-0.18,0.12,0]}>
  <RoundedBox args={[0.42,0.77,0.045]} radius={0.07} smoothness={3}><meshStandardMaterial color="#151725" metalness={0.5} roughness={0.3}/></RoundedBox>
  <mesh position={[0,0,0.028]}><planeGeometry args={[0.35,0.64]}/><meshBasicMaterial color={active?(index%3===0?"#d95bff":"#6e7cff"):"#2c2e44"} transparent opacity={active?0.88:0.5}/></mesh>
  <mesh position={[0,0.30,0.034]}><planeGeometry args={[0.11,0.012]}/><meshBasicMaterial color="#080911"/></mesh>
 </group>;
}
export default function FleetScene({count,active}:{count:number;active:boolean}){
 return <Canvas camera={{position:[0,1.1,10],fov:44}} dpr={[1,1.5]} gl={{alpha:true,antialias:false,powerPreference:"low-power"}} style={{width:"100%",height:"100%"}}>
  <ambientLight intensity={1.6}/><pointLight position={[2,3,5]} intensity={22} color="#a48dff" />
  <Float speed={0.4} rotationIntensity={0.08} floatIntensity={0.15}><group rotation={[0.10,-0.10,-0.12]}>{Array.from({length:count},(_,i)=><Device key={i} index={i} count={count} active={active}/>)}</group></Float>
 </Canvas>;
}