import React, { useRef, useMemo, memo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { COLORS } from './utils';

interface OrbitingRingProps {
  radius: number;
  speed: number;
  color?: string;
  segments?: number;
  tilted?: boolean;
}

const OrbitingRing: React.FC<OrbitingRingProps> = memo(
  ({ radius, speed, color = COLORS.cyan, segments = 32, tilted = false }) => {
    const ref = useRef<THREE.Mesh>(null);
    const thetaRef = useRef(0);

    useFrame((_state, delta) => {
      if (!ref.current) return;
      thetaRef.current += delta * speed;
      ref.current.rotation.y = thetaRef.current;
    });

    const ringRotation = tilted ? [Math.PI / 3, 0, 0] : [0, 0, 0];

    return (
      <group rotation={ringRotation as [number, number, number]}>
        <mesh ref={ref}>
          <torusGeometry args={[radius, 0.03, 8, segments]} />
          <meshBasicMaterial color={color} transparent opacity={0.4} side={THREE.DoubleSide} />
        </mesh>
      </group>
    );
  },
);

OrbitingRing.displayName = 'OrbitingRing';

interface DataPointProps {
  radius: number;
  speed: number;
  color?: string;
  delay?: number;
}

const DataPoint: React.FC<DataPointProps> = memo(
  ({ radius, speed, color = COLORS.purple, delay = 0 }) => {
    const ref = useRef<THREE.Mesh>(null);
    const thetaRef = useRef(delay * Math.PI * 2);

    useFrame((_state, delta) => {
      if (!ref.current) return;
      thetaRef.current += delta * speed;
      const x = Math.cos(thetaRef.current) * radius;
      const y = Math.sin(thetaRef.current * 0.7) * radius * 0.3;
      const z = Math.sin(thetaRef.current) * radius;
      ref.current.position.set(x, y, z);
    });

    return (
      <mesh ref={ref}>
        <sphereGeometry args={[0.06, 8, 8]} />
        <meshBasicMaterial color={color} transparent opacity={0.8} />
        <pointLight color={color} intensity={0.4} distance={1.5} decay={2} />
      </mesh>
    );
  },
);

DataPoint.displayName = 'DataPoint';

interface EnergySphereProps {
  position: [number, number, number];
  scale?: number;
  color?: string;
}

const EnergySphere: React.FC<EnergySphereProps> = memo(
  ({ position, scale = 1, color = COLORS.cyan }) => {
    const coreRef = useRef<THREE.Mesh>(null);
    const glowRef = useRef<THREE.Mesh>(null);
    const timeRef = useRef(0);

    useFrame((_state, delta) => {
      timeRef.current += delta;
      if (coreRef.current) {
        (coreRef.current.material as THREE.MeshBasicMaterial).opacity =
          0.7 + Math.sin(timeRef.current * 2) * 0.3;
        coreRef.current.scale.setScalar(scale * (1 + Math.sin(timeRef.current * 1.5) * 0.1));
      }
      if (glowRef.current) {
        (glowRef.current.material as THREE.MeshBasicMaterial).opacity =
          0.15 + Math.sin(timeRef.current * 1.5) * 0.1;
      }
    });

    return (
      <group position={position}>
        <mesh ref={coreRef}>
          <sphereGeometry args={[0.4 * scale, 32, 32]} />
          <meshBasicMaterial color={color} transparent opacity={0.8} depthWrite={false} />
        </mesh>
        <mesh ref={glowRef} scale={[1.5 * scale, 1.5 * scale, 1.5 * scale]}>
          <sphereGeometry args={[0.4 * scale, 24, 24]} />
          <meshBasicMaterial
            color={color}
            transparent
            opacity={0.3}
            depthWrite={false}
            side={THREE.BackSide}
          />
        </mesh>
      </group>
    );
  },
);

EnergySphere.displayName = 'EnergySphere';

export const AICore: React.FC<{
  reducedMotion?: boolean;
  mousePosition?: { x: number; y: number };
}> = memo(({ reducedMotion = false, mousePosition }) => {
  const groupRef = useRef<THREE.Group>(null);
  const { x, y } = mousePosition || { x: 0, y: 0 };
  const timeRef = useRef(0);

  const rings = useMemo(
    () => [
      { radius: 2.5, speed: 0.1, color: COLORS.cyan, tilted: false },
      { radius: 2.2, speed: -0.15, color: COLORS.purple, tilted: true },
      { radius: 1.9, speed: 0.2, color: COLORS.blue, tilted: false },
    ],
    [],
  );

  const dataPoints = useMemo(
    () => [
      { radius: 2.8, speed: 0.15, color: COLORS.purple, delay: 0 },
      { radius: 2.6, speed: -0.2, color: COLORS.cyan, delay: 0.5 },
      { radius: 2.4, speed: 0.18, color: COLORS.blue, delay: 1 },
    ],
    [],
  );

  const particlePositions = useMemo(() => {
    if (reducedMotion) return [];
    const positions: [number, number, number][] = [];
    const count = 15;
    for (let i = 0; i < count; i++) {
      const radius = 2.2 + Math.random() * 0.8;
      const angle = (i / count) * Math.PI * 2;
      positions.push([Math.cos(angle) * radius, 0, Math.sin(angle) * radius]);
    }
    return positions;
  }, [reducedMotion]);

  useFrame((_state, delta) => {
    timeRef.current += delta;

    if (groupRef.current && !reducedMotion) {
      const targetRotY = (x / window.innerWidth - 0.5) * 0.3;
      const targetRotX = (y / window.innerHeight - 0.5) * 0.2;

      groupRef.current.rotation.y += (targetRotY - groupRef.current.rotation.y) * 0.03;
      groupRef.current.rotation.x += (targetRotX - groupRef.current.rotation.x) * 0.03;
    }
  });

  return (
    <group ref={groupRef} position={[0, 0, 0]}>
      {rings.map((ring, i) => (
        <OrbitingRing
          key={`ring-${i}`}
          radius={ring.radius}
          speed={ring.speed}
          color={ring.color}
          tilted={ring.tilted}
        />
      ))}

      {dataPoints.map((dp, i) => (
        <DataPoint
          key={`dp-${i}`}
          radius={dp.radius}
          speed={dp.speed}
          color={dp.color}
          delay={dp.delay}
        />
      ))}

      {particlePositions.map((pos, i) => {
        const color = i % 2 === 0 ? COLORS.cyan : COLORS.purple;
        return (
          <mesh key={`particle-${i}`} position={pos} rotation={[timeRef.current * 0.5, 0, 0]}>
            <sphereGeometry args={[0.04, 6, 6]} />
            <meshBasicMaterial color={color} transparent opacity={0.5} />
          </mesh>
        );
      })}

      <EnergySphere position={[0, 0, 0]} scale={2.5} color={COLORS.cyan} />
    </group>
  );
});

AICore.displayName = 'AICore';
