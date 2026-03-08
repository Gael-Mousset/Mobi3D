import { Canvas } from '@react-three/fiber';
import { OrbitControls, Grid } from '@react-three/drei';
import * as THREE from 'three';
import type { Furniture } from '@/types';

/* ─── Furniture 3D Models ─── */

function ChairModel({ color }: { color: string }) {
  const mc = new THREE.Color(color);
  const dc = mc.clone().multiplyScalar(0.6);
  return (
    <group>
      <mesh position={[0, 0.46, 0]} castShadow>
        <boxGeometry args={[0.55, 0.06, 0.5]} />
        <meshStandardMaterial color={mc} roughness={0.6} />
      </mesh>
      <mesh position={[0, 0.76, -0.23]} castShadow>
        <boxGeometry args={[0.55, 0.55, 0.04]} />
        <meshStandardMaterial color={mc} roughness={0.6} />
      </mesh>
      <mesh position={[0, 0.26, 0]}>
        <cylinderGeometry args={[0.03, 0.03, 0.35, 8]} />
        <meshStandardMaterial color={dc} roughness={0.3} metalness={0.7} />
      </mesh>
      {Array.from({ length: 5 }).map((_, i) => {
        const angle = (Math.PI * 2 / 5) * i;
        return (
          <group key={i}>
            <mesh position={[Math.sin(angle) * 0.13, 0.06, Math.cos(angle) * 0.13]} rotation={[0, angle, 0]}>
              <boxGeometry args={[0.03, 0.03, 0.3]} />
              <meshStandardMaterial color={dc} roughness={0.3} metalness={0.7} />
            </mesh>
            <mesh position={[Math.sin(angle) * 0.28, 0.025, Math.cos(angle) * 0.28]}>
              <sphereGeometry args={[0.025, 8, 8]} />
              <meshStandardMaterial color="#666666" roughness={0.5} metalness={0.5} />
            </mesh>
          </group>
        );
      })}
    </group>
  );
}

function DeskModel({ color, w, d }: { color: string; w: number; d: number }) {
  const mc = new THREE.Color(color);
  const dc = mc.clone().multiplyScalar(0.6);
  const offsets: [number, number][] = [[-w/2+0.05,-d/2+0.05],[w/2-0.05,-d/2+0.05],[-w/2+0.05,d/2-0.05],[w/2-0.05,d/2-0.05]];
  return (
    <group>
      <mesh position={[0, 0.74, 0]} castShadow>
        <boxGeometry args={[w, 0.04, d]} />
        <meshStandardMaterial color={mc} roughness={0.4} metalness={0.1} />
      </mesh>
      {offsets.map(([x, z], i) => (
        <mesh key={i} position={[x, 0.36, z]} castShadow>
          <cylinderGeometry args={[0.025, 0.025, 0.72, 8]} />
          <meshStandardMaterial color={dc} roughness={0.3} metalness={0.7} />
        </mesh>
      ))}
    </group>
  );
}

function CabinetModel({ color, w, h, d }: { color: string; w: number; h: number; d: number }) {
  const mc = new THREE.Color(color);
  const dc = mc.clone().multiplyScalar(0.6);
  return (
    <group>
      <mesh position={[0, h/2, 0]} castShadow>
        <boxGeometry args={[w, h, d]} />
        <meshStandardMaterial color={mc} roughness={0.5} metalness={0.3} />
      </mesh>
      {Array.from({ length: 4 }).map((_, i) => (
        <mesh key={i} position={[0, (h/5)*(i+1), 0]}>
          <boxGeometry args={[w-0.03, 0.015, d-0.02]} />
          <meshStandardMaterial color={dc} />
        </mesh>
      ))}
    </group>
  );
}

function BoxModel({ color, w, h, d }: { color: string; w: number; h: number; d: number }) {
  return (
    <mesh position={[0, h/2, 0]} castShadow>
      <boxGeometry args={[w, h, d]} />
      <meshStandardMaterial color={color} roughness={0.4} />
    </mesh>
  );
}

function FurnitureModel({ furniture }: { furniture: Furniture }) {
  const cat = furniture.category;
  const { w, h, d } = furniture.dimensions;
  if (cat.includes('Chaise') || cat.includes('Fauteuil')) return <ChairModel color={furniture.color} />;
  if (cat.includes('Bureau') || cat.includes('Table')) return <DeskModel color={furniture.color} w={w/100} d={d/100} />;
  if (cat.includes('Armoire') || cat.includes('Étagère')) return <CabinetModel color={furniture.color} w={w/100} h={h/100} d={d/100} />;
  return <BoxModel color={furniture.color} w={w/100} h={h/100} d={d/100} />;
}

function Room() {
  return (
    <>
      {/* Floor — light concrete */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
        <planeGeometry args={[14, 14]} />
        <meshStandardMaterial color="#e8e8e8" roughness={0.85} />
      </mesh>
      <Grid
        args={[14, 14]}
        cellSize={1}
        cellThickness={0.5}
        cellColor="#d4d4d4"
        sectionSize={4}
        sectionThickness={1}
        sectionColor="#c0c0c0"
        fadeDistance={20}
        position={[0, 0.005, 0]}
      />
      {/* Back wall */}
      <mesh position={[0, 2, -7]} receiveShadow>
        <planeGeometry args={[14, 4]} />
        <meshStandardMaterial color="#f0f0f0" roughness={0.95} side={THREE.DoubleSide} />
      </mesh>
      {/* Side wall */}
      <mesh position={[-7, 2, 0]} rotation={[0, Math.PI / 2, 0]} receiveShadow>
        <planeGeometry args={[14, 4]} />
        <meshStandardMaterial color="#f0f0f0" roughness={0.95} side={THREE.DoubleSide} />
      </mesh>
    </>
  );
}

interface SceneProps {
  furniture?: Furniture | null;
  className?: string;
}

export default function Scene3D({ furniture, className }: SceneProps) {
  return (
    <div className={`w-full h-full ${className ?? ''}`}>
      <Canvas
        shadows
        camera={{ position: [6, 5, 6], fov: 45, near: 0.1, far: 100 }}
        gl={{ antialias: true, alpha: true }}
        onCreated={({ gl }) => { gl.shadowMap.enabled = true; gl.shadowMap.type = THREE.PCFSoftShadowMap; }}
      >
        <ambientLight intensity={0.7} color="#ffffff" />
        <directionalLight position={[4, 8, 4]} intensity={1.0} castShadow shadow-mapSize-width={2048} shadow-mapSize-height={2048} />
        <pointLight position={[-3, 5, -2]} intensity={0.2} color="#004AAD" distance={15} />
        <Room />
        {furniture && <FurnitureModel furniture={furniture} />}
        <OrbitControls target={[0, 0.8, 0]} enablePan={false} minDistance={3} maxDistance={18} maxPolarAngle={Math.PI / 2 - 0.05} />
        <color attach="background" args={['#f0f2f5']} />
        <fog attach="fog" args={['#f0f2f5', 18, 35]} />
      </Canvas>
    </div>
  );
}
