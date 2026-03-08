import { Suspense, useMemo } from 'react';
import { Canvas, useLoader } from '@react-three/fiber';
import { OrbitControls, Grid, RoundedBox } from '@react-three/drei';
import { OBJLoader } from 'three/addons/loaders/OBJLoader.js';
import * as THREE from 'three';
import type { Furniture } from '../../types';

/* ─── shared material presets ─── */
const METAL = { roughness: 0.25, metalness: 0.85 };
const FABRIC = { roughness: 0.85, metalness: 0.0 };
const WOOD = { roughness: 0.55, metalness: 0.05 };

/* ══════════════════════════════════════════════
   OFFICE CHAIR / EXECUTIVE ARMCHAIR — OBJ asset
══════════════════════════════════════════════ */
function ChairOBJInner() {
  const obj = useLoader(OBJLoader, '/models/office_chair.obj');

  const scene = useMemo(() => {
    const clone = obj.clone(true);
    const mat = new THREE.MeshStandardMaterial({ color: '#111111', roughness: 0.55, metalness: 0.25 });
    clone.traverse((child) => {
      if (child instanceof THREE.Mesh) {
        child.castShadow = true;
        child.receiveShadow = true;
        child.material = mat;
      }
    });

    // OBJ is lying on its side — rotate -90° around X to stand upright
    clone.rotation.x = -Math.PI / 2;
    clone.updateMatrixWorld(true);

    // Auto-scale to ~1 unit tall, then sit on the floor
    const box = new THREE.Box3().setFromObject(clone);
    const size = box.getSize(new THREE.Vector3());
    const s = 1.0 / size.y;
    clone.scale.setScalar(s);
    clone.updateMatrixWorld(true);

    const box2 = new THREE.Box3().setFromObject(clone);
    const center2 = box2.getCenter(new THREE.Vector3());
    clone.position.set(-center2.x, -box2.min.y, -center2.z);

    return clone;
  }, [obj]);

  return <primitive object={scene} />;
}

function ChairModel({ color: _color, dark: _dark, isArmchair: _isArmchair }: {
  color: THREE.Color; dark: THREE.Color; isArmchair: boolean;
}) {
  return (
    <Suspense fallback={null}>
      <ChairOBJInner />
    </Suspense>
  );
}

/* ══════════════════════════════════════════════
   OFFICE DESK  (standard or sit-stand)
══════════════════════════════════════════════ */
function DeskModel({ color, dark, w, d, h, sitStand }: {
  color: THREE.Color; dark: THREE.Color;
  w: number; d: number; h: number; sitStand: boolean;
}) {
  const topThick = 0.038;
  const legH = h - topThick;

  return (
    <group>
      {/* Worktop */}
      <RoundedBox args={[w, topThick, d]} radius={0.012} smoothness={4}
        position={[0, h, 0]} castShadow>
        <meshStandardMaterial color={color} {...WOOD} />
      </RoundedBox>

      {/* Modesty panel */}
      <mesh position={[0, h - 0.18, -d / 2 + 0.015]} castShadow>
        <boxGeometry args={[w - 0.08, 0.3, 0.018]} />
        <meshStandardMaterial color={color} {...WOOD} />
      </mesh>

      {sitStand ? (
        <>
          {([-1, 1] as const).map((side) => (
            <group key={side} position={[side * (w / 2 - 0.09), 0, 0]}>
              <mesh position={[0, legH * 0.55, 0]} castShadow>
                <boxGeometry args={[0.08, legH * 1.1, 0.07]} />
                <meshStandardMaterial color={dark} {...METAL} />
              </mesh>
              <mesh position={[0, legH * 0.25, 0]} castShadow>
                <boxGeometry args={[0.065, legH * 0.5, 0.055]} />
                <meshStandardMaterial color="#555" {...METAL} />
              </mesh>
              <RoundedBox args={[0.28, 0.025, 0.08]} radius={0.01} smoothness={3}
                position={[0, 0.012, 0]} castShadow>
                <meshStandardMaterial color={dark} {...METAL} />
              </RoundedBox>
            </group>
          ))}
          <mesh position={[0, 0.06, 0]} castShadow>
            <boxGeometry args={[w - 0.22, 0.022, 0.045]} />
            <meshStandardMaterial color={dark} {...METAL} />
          </mesh>
        </>
      ) : (
        <>
          {([-1, 1] as const).map((side) => (
            <group key={side} position={[side * (w / 2 - 0.09), 0, 0]}>
              <mesh position={[0, legH / 2, 0]} castShadow>
                <boxGeometry args={[0.05, legH, 0.05]} />
                <meshStandardMaterial color={dark} {...METAL} />
              </mesh>
              <RoundedBox args={[0.05, 0.025, d - 0.06]} radius={0.01} smoothness={3}
                position={[0, 0.012, 0]} castShadow>
                <meshStandardMaterial color={dark} {...METAL} />
              </RoundedBox>
              <mesh position={[0, legH - 0.015, 0]} castShadow>
                <boxGeometry args={[0.06, 0.03, d * 0.4]} />
                <meshStandardMaterial color={dark} {...METAL} />
              </mesh>
            </group>
          ))}
          {/* Cable tray */}
          <mesh position={[0, h - 0.09, 0]} castShadow>
            <boxGeometry args={[w - 0.22, 0.018, 0.12]} />
            <meshStandardMaterial color="#333" roughness={0.5} metalness={0.5} />
          </mesh>
        </>
      )}
    </group>
  );
}

/* ══════════════════════════════════════════════
   MEETING TABLE
══════════════════════════════════════════════ */
function MeetingTableModel({ color, dark, w, d }: {
  color: THREE.Color; dark: THREE.Color; w: number; d: number;
}) {
  const topY = 0.75;
  return (
    <group>
      <RoundedBox args={[w, 0.042, d]} radius={0.02} smoothness={6}
        position={[0, topY, 0]} castShadow>
        <meshStandardMaterial color={color} {...WOOD} />
      </RoundedBox>

      {([-1, 1] as const).map((side) => {
        const xOff = side * (w / 2 - 0.22);
        return (
          <group key={side} position={[xOff, 0, 0]}>
            <mesh position={[0, topY / 2, 0]} castShadow>
              <boxGeometry args={[0.06, topY, 0.06]} />
              <meshStandardMaterial color={dark} {...METAL} />
            </mesh>
            <RoundedBox args={[0.07, 0.03, d * 0.75]} radius={0.01} smoothness={3}
              position={[0, 0.015, 0]} castShadow>
              <meshStandardMaterial color={dark} {...METAL} />
            </RoundedBox>
            <mesh position={[0, topY - 0.04, 0]} castShadow>
              <boxGeometry args={[0.07, 0.05, d * 0.6]} />
              <meshStandardMaterial color={dark} {...METAL} />
            </mesh>
          </group>
        );
      })}

      {/* Under-table beam */}
      <mesh position={[0, 0.35, 0]} castShadow>
        <boxGeometry args={[w - 0.55, 0.04, 0.06]} />
        <meshStandardMaterial color={dark} {...METAL} />
      </mesh>
    </group>
  );
}

/* ══════════════════════════════════════════════
   STORAGE CABINET (Armoire)
══════════════════════════════════════════════ */
function CabinetModel({ color, dark, w, h, d }: {
  color: THREE.Color; dark: THREE.Color; w: number; h: number; d: number;
}) {
  const bodyH = h - 0.04;
  return (
    <group>
      {/* Body */}
      <mesh position={[0, bodyH / 2 + 0.04, 0]} castShadow>
        <boxGeometry args={[w, bodyH, d]} />
        <meshStandardMaterial color={color} roughness={0.45} metalness={0.35} />
      </mesh>

      {/* Bottom plinth */}
      <mesh position={[0, 0.025, 0]} castShadow>
        <boxGeometry args={[w - 0.01, 0.05, d - 0.02]} />
        <meshStandardMaterial color={dark} roughness={0.4} metalness={0.5} />
      </mesh>

      {/* Top cap */}
      <mesh position={[0, bodyH + 0.055, 0]} castShadow>
        <boxGeometry args={[w + 0.005, 0.012, d + 0.005]} />
        <meshStandardMaterial color={color} roughness={0.3} metalness={0.4} />
      </mesh>

      {/* Door split seam */}
      <mesh position={[0, bodyH / 2 + 0.04, d / 2 + 0.001]}>
        <boxGeometry args={[0.008, bodyH - 0.02, 0.003]} />
        <meshStandardMaterial color={dark} roughness={0.3} metalness={0.6} />
      </mesh>

      {/* Door handles */}
      {([-1, 1] as const).map((side) => (
        <mesh key={side} position={[side * 0.09, bodyH * 0.52, d / 2 + 0.016]} castShadow>
          <cylinderGeometry args={[0.008, 0.008, 0.10, 8]} />
          <meshStandardMaterial color="#ccc" roughness={0.2} metalness={0.9} />
        </mesh>
      ))}

      {/* Internal shelves */}
      {[0.28, 0.48, 0.68, 0.88].map((frac, i) => (
        <mesh key={i} position={[0, bodyH * frac + 0.04, 0]}>
          <boxGeometry args={[w - 0.025, 0.016, d - 0.03]} />
          <meshStandardMaterial color={dark} roughness={0.4} metalness={0.2} />
        </mesh>
      ))}
    </group>
  );
}

/* ══════════════════════════════════════════════
   OPEN BOOKSHELF (Étagère)
══════════════════════════════════════════════ */
function ShelfModel({ color, dark, w, h, d }: {
  color: THREE.Color; dark: THREE.Color; w: number; h: number; d: number;
}) {
  const thick = 0.022;
  const nShelves = Math.max(2, Math.round(h / 0.38));
  const shelfSpacing = (h - thick) / nShelves;

  return (
    <group>
      {/* Side panels */}
      {([-1, 1] as const).map((side) => (
        <mesh key={side} position={[side * (w / 2 - thick / 2), h / 2, 0]} castShadow>
          <boxGeometry args={[thick, h, d]} />
          <meshStandardMaterial color={color} {...WOOD} />
        </mesh>
      ))}

      {/* Back panel */}
      <mesh position={[0, h / 2, -d / 2 + 0.006]}>
        <boxGeometry args={[w - thick * 2, h, 0.012]} />
        <meshStandardMaterial color={dark} roughness={0.6} metalness={0.1} />
      </mesh>

      {/* Top & bottom */}
      {([0, h] as const).map((y, i) => (
        <mesh key={i} position={[0, y === 0 ? thick / 2 : h - thick / 2, 0]} castShadow>
          <boxGeometry args={[w, thick, d]} />
          <meshStandardMaterial color={color} {...WOOD} />
        </mesh>
      ))}

      {/* Shelves */}
      {Array.from({ length: nShelves - 1 }).map((_, i) => (
        <mesh key={i} position={[0, shelfSpacing * (i + 1), 0]}>
          <boxGeometry args={[w - thick * 2 - 0.002, thick, d - 0.01]} />
          <meshStandardMaterial color={color} {...WOOD} />
        </mesh>
      ))}

      {/* Cross brace */}
      <mesh position={[0, h * 0.5, -d / 2 + 0.015]}>
        <boxGeometry args={[w - thick * 2, 0.012, 0.018]} />
        <meshStandardMaterial color={dark} roughness={0.4} metalness={0.3} />
      </mesh>
    </group>
  );
}

/* ══════════════════════════════════════════════
   PEDESTAL / DRAWER UNIT (Caisson)
══════════════════════════════════════════════ */
function PedestalModel({ color, dark, w, h, d }: {
  color: THREE.Color; dark: THREE.Color; w: number; h: number; d: number;
}) {
  const nDrawers = 3;
  const drawerH = (h - 0.06) / nDrawers;

  return (
    <group>
      {/* Body */}
      <mesh position={[0, h / 2 + 0.03, 0]} castShadow>
        <boxGeometry args={[w, h, d]} />
        <meshStandardMaterial color={color} roughness={0.45} metalness={0.35} />
      </mesh>

      {/* Drawer faces */}
      {Array.from({ length: nDrawers }).map((_, i) => {
        const y = 0.055 + drawerH * i + drawerH / 2;
        return (
          <group key={i}>
            <mesh position={[0, y, d / 2 + 0.002]} castShadow>
              <boxGeometry args={[w - 0.014, drawerH - 0.012, 0.016]} />
              <meshStandardMaterial color={color} roughness={0.4} metalness={0.4} />
            </mesh>
            {/* gap line */}
            <mesh position={[0, y - drawerH / 2, d / 2 + 0.001]}>
              <boxGeometry args={[w - 0.014, 0.006, 0.005]} />
              <meshStandardMaterial color={dark} roughness={0.3} metalness={0.5} />
            </mesh>
            {/* handle */}
            <mesh position={[0, y, d / 2 + 0.02]} castShadow>
              <boxGeometry args={[0.08, 0.013, 0.013]} />
              <meshStandardMaterial color="#bbb" roughness={0.2} metalness={0.9} />
            </mesh>
          </group>
        );
      })}

      {/* Top surface */}
      <mesh position={[0, h + 0.036, 0]} castShadow>
        <boxGeometry args={[w + 0.004, 0.014, d + 0.004]} />
        <meshStandardMaterial color={color} roughness={0.3} metalness={0.4} />
      </mesh>

      {/* Castors */}
      {([
        [-w / 2 + 0.06, -d / 2 + 0.06],
        [w / 2 - 0.06, -d / 2 + 0.06],
        [-w / 2 + 0.06, d / 2 - 0.06],
        [w / 2 - 0.06, d / 2 - 0.06],
      ] as [number, number][]).map(([cx, cz], i) => (
        <group key={i}>
          <mesh position={[cx, 0.028, cz]} castShadow>
            <cylinderGeometry args={[0.025, 0.025, 0.02, 8]} />
            <meshStandardMaterial color="#333" roughness={0.5} metalness={0.5} />
          </mesh>
          <mesh position={[cx, 0.018, cz]} rotation={[Math.PI / 2, 0, 0]} castShadow>
            <cylinderGeometry args={[0.018, 0.018, 0.022, 8]} />
            <meshStandardMaterial color="#222" roughness={0.6} />
          </mesh>
        </group>
      ))}
    </group>
  );
}

/* ══════════════════════════════════════════════
   DISPATCHER
══════════════════════════════════════════════ */
function FurnitureModel({ furniture }: { furniture: Furniture }) {
  const mainColor = useMemo(() => new THREE.Color(furniture.color), [furniture.color]);
  const darkColor = useMemo(() => mainColor.clone().multiplyScalar(0.45), [mainColor]);

  const cat = furniture.category || '';
  const dims = furniture.dimensions;
  const w = (dims?.w || 60) / 100;
  const h = (dims?.h || 80) / 100;
  const d = (dims?.d || 60) / 100;

  if (cat.includes('Chaise') || cat.includes('Fauteuil'))
    return <ChairModel color={mainColor} dark={darkColor} isArmchair={cat.includes('Fauteuil')} />;

  if (cat.includes('Bureau')) {
    const sitStand = (furniture.name ?? '').toLowerCase().includes('assis') ||
      (furniture.name ?? '').toLowerCase().includes('debout');
    return <DeskModel color={mainColor} dark={darkColor} w={w} d={d} h={h} sitStand={sitStand} />;
  }

  if (cat.includes('Table'))
    return <MeetingTableModel color={mainColor} dark={darkColor} w={w} d={d} />;

  if (cat.includes('Armoire'))
    return <CabinetModel color={mainColor} dark={darkColor} w={w} h={h} d={d} />;

  if (cat.includes('Étagère'))
    return <ShelfModel color={mainColor} dark={darkColor} w={w} h={h} d={d} />;

  if (cat.includes('Caisson'))
    return <PedestalModel color={mainColor} dark={darkColor} w={w} h={h} d={d} />;

  return (
    <mesh position={[0, h / 2, 0]} castShadow>
      <boxGeometry args={[w, h, d]} />
      <meshStandardMaterial color={mainColor} roughness={0.4} metalness={0.2} />
    </mesh>
  );
}

/* ══════════════════════════════════════════════
   SCENE WRAPPER
══════════════════════════════════════════════ */
interface SceneProps {
  furniture?: Furniture | null;
  className?: string;
}

export default function Scene3D({ furniture, className }: SceneProps) {
  return (
    <div className={`w-full h-full ${className || ''}`}>
      <Canvas shadows camera={{ position: [6, 5, 6], fov: 45 }} gl={{ antialias: true }}>
        <color attach="background" args={['#f5f7fa']} />
        <ambientLight intensity={0.7} color="#e8edf5" />
        <directionalLight position={[4, 8, 4]} intensity={1.4} castShadow
          shadow-mapSize={[2048, 2048]} />
        <directionalLight position={[-4, 4, -2]} intensity={0.4} color="#dde8ff" />
        <pointLight position={[-3, 5, -2]} intensity={0.4} color="#004aad" />

        <mesh rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
          <planeGeometry args={[14, 14]} />
          <meshStandardMaterial color="#e8eaed" roughness={0.85} />
        </mesh>

        <Grid position={[0, 0.005, 0]} args={[14, 14]}
          cellSize={1} cellThickness={0.5} cellColor="#d0d5de"
          sectionSize={4} sectionThickness={1} sectionColor="#b0b8cc"
          fadeDistance={20} infiniteGrid={false} />

        {furniture && <FurnitureModel furniture={furniture} />}

        <OrbitControls target={[0, 0.8, 0]}
          minPolarAngle={0.1} maxPolarAngle={Math.PI / 2 - 0.05}
          minDistance={4} maxDistance={20}
          enableDamping dampingFactor={0.05} />
      </Canvas>
    </div>
  );
}