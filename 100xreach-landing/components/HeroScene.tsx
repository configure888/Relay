"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { Float, MeshTransmissionMaterial } from "@react-three/drei";
import { useMemo, useRef } from "react";
import * as THREE from "three";

function Phone({ position, rotation, accent, delay }: { position: [number, number, number]; rotation: [number, number, number]; accent: string; delay: number }) {
  const ref = useRef<THREE.Group>(null);
  useFrame((state) => {
    if (!ref.current) return;
    const t = state.clock.elapsedTime + delay;
    ref.current.position.y = position[1] + Math.sin(t * 0.75) * 0.07;
    ref.current.rotation.z = rotation[2] + Math.sin(t * 0.4) * 0.025;
  });
  return (
    <group ref={ref} position={position} rotation={rotation}>
      <mesh castShadow><boxGeometry args={[0.74, 1.52, 0.075]} /><meshStandardMaterial color="#08080a" roughness={0.28} metalness={0.82} /></mesh>
      <mesh position={[0, 0, 0.041]}><planeGeometry args={[0.66, 1.38]} /><meshStandardMaterial color={accent} emissive={accent} emissiveIntensity={0.68} roughness={0.33} /></mesh>
      <mesh position={[0, 0.39, 0.044]}><planeGeometry args={[0.5, 0.5]} /><meshStandardMaterial color="#111116" emissive="#15151b" emissiveIntensity={0.25} /></mesh>
      {[0.06, -0.08, -0.22].map((y, idx) => <mesh key={y} position={[-0.07 + idx * 0.035, y, 0.046]}><planeGeometry args={[0.42 - idx * 0.04, 0.035]} /><meshBasicMaterial color={idx === 0 ? "#ffffff" : "#09090b"} transparent opacity={idx === 0 ? 0.9 : 0.72} /></mesh>)}
    </group>
  );
}

function DistributionRig() {
  const rig = useRef<THREE.Group>(null);
  const knot = useRef<THREE.Mesh>(null);
  const ghostCyan = useRef<THREE.Mesh>(null);
  const ghostPink = useRef<THREE.Mesh>(null);
  const phones = useMemo(() => Array.from({ length: 20 }, (_, i) => {
    const row = Math.floor(i / 5);
    const col = i % 5;
    return {
      position: [(col - 2) * 1.02 + (row % 2 ? 0.18 : 0), (1.5 - row) * 1.25, -0.75 - Math.abs(col - 2) * 0.18 + Math.sin(i * 1.7) * 0.14] as [number, number, number],
      rotation: [0.03 * (row - 1.5), -0.08 * (col - 2), 0.018 * ((i % 3) - 1)] as [number, number, number],
      accent: i % 3 === 0 ? "#ff0050" : i % 3 === 1 ? "#00f2ea" : "#d9fbff",
      delay: i * 0.27,
    };
  }), []);
  useFrame((state, delta) => {
    if (!rig.current || !knot.current || !ghostCyan.current || !ghostPink.current) return;
    rig.current.rotation.y = THREE.MathUtils.lerp(rig.current.rotation.y, state.pointer.x * 0.13, 0.045);
    rig.current.rotation.x = THREE.MathUtils.lerp(rig.current.rotation.x, -state.pointer.y * 0.09, 0.045);
    knot.current.rotation.x += delta * 0.19;
    knot.current.rotation.z -= delta * 0.14;
    const pulse = 1 + Math.sin(state.clock.elapsedTime * 1.15) * 0.012;
    ghostCyan.current.scale.setScalar(pulse * 1.015);
    ghostPink.current.scale.setScalar((2 - pulse) * 1.015);
    ghostCyan.current.position.x = 0.035 + state.pointer.x * 0.018;
    ghostPink.current.position.x = -0.035 + state.pointer.x * -0.018;
  });
  return <group ref={rig}>
    <group position={[0.55, 0, 0]} rotation={[0.03, -0.2, 0.01]}>{phones.map((phone, i) => <Phone key={i} {...phone} />)}</group>
    <Float speed={1.45} rotationIntensity={0.18} floatIntensity={0.42}><group position={[-1.25, 0.2, 1.0]} scale={0.72}>
      <mesh ref={ghostCyan}><torusKnotGeometry args={[1, 0.28, 180, 28, 2, 5]} /><meshBasicMaterial color="#00f2ea" wireframe transparent opacity={0.17} depthWrite={false} /></mesh>
      <mesh ref={ghostPink}><torusKnotGeometry args={[1, 0.28, 180, 28, 2, 5]} /><meshBasicMaterial color="#ff0050" wireframe transparent opacity={0.15} depthWrite={false} /></mesh>
      <mesh ref={knot}><torusKnotGeometry args={[1, 0.28, 220, 32, 2, 5]} /><MeshTransmissionMaterial backside thickness={0.52} chromaticAberration={0.16} anisotropy={0.32} distortion={0.28} distortionScale={0.72} temporalDistortion={0.16} transmission={1} roughness={0.11} ior={1.32} color="#f7f7fb" /></mesh>
    </group></Float>
  </group>;
}

function Particles() {
  const points = useRef<THREE.Points>(null);
  const positions = useMemo(() => {
    const data = new Float32Array(520 * 3);
    for (let i = 0; i < 520; i++) {
      const r = 2.7 + ((i * 47) % 100) / 100 * 4.5;
      const t = ((i * 137.5) % 360) * (Math.PI / 180);
      data[i * 3] = Math.cos(t) * r;
      data[i * 3 + 1] = (((i * 71) % 100) / 100 - 0.5) * 6.2;
      data[i * 3 + 2] = Math.sin(t) * r - 0.8;
    }
    return data;
  }, []);
  useFrame((_, delta) => { if (points.current) points.current.rotation.y -= delta * 0.025; });
  return <points ref={points}><bufferGeometry><bufferAttribute attach="attributes-position" args={[positions, 3]} /></bufferGeometry><pointsMaterial size={0.018} color="#ffffff" transparent opacity={0.46} sizeAttenuation /></points>;
}

export default function HeroScene() {
  return <Canvas dpr={[1, 1.6]} camera={{ position: [0, 0.05, 8.6], fov: 39 }} gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}>
    <ambientLight intensity={0.42} />
    <directionalLight position={[2, 6, 5]} intensity={2.7} color="#ffffff" />
    <pointLight position={[4, 2, 4]} intensity={20} color="#00f2ea" />
    <pointLight position={[-4, -2, 3]} intensity={18} color="#ff0050" />
    <DistributionRig /><Particles /><fog attach="fog" args={["#050507", 7.2, 13.2]} />
  </Canvas>;
}
