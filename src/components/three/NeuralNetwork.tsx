import React, { useRef, useMemo, memo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { COLORS, getResponsiveParticleCount } from './utils';

interface NeuralNodeProps {
  position: [number, number, number];
  color: string;
  size?: number;
  pulse?: boolean;
}

const NeuralNode: React.FC<NeuralNodeProps> = memo(
  ({ position, color, size = 0.15, pulse = false }) => {
    const ref = useRef<THREE.Mesh>(null);
    const pulseRef = useRef(0);
    const materialRef = useRef<THREE.MeshBasicMaterial>(null);

    useFrame((state) => {
      pulseRef.current += state.clock.getDelta();
      if (!ref.current || !materialRef.current) return;

      if (pulse) {
        const scale = size * (1 + Math.sin(pulseRef.current * 2) * 0.3);
        ref.current.scale.setScalar(scale);
        materialRef.current.opacity = 0.6 + Math.sin(pulseRef.current * 2) * 0.4;
      }
    });

    const hexColor = useMemo(() => new THREE.Color(color), [color]);

    return (
      <mesh ref={ref} position={position} renderOrder={10}>
        <sphereGeometry args={[size, 16, 16]} />
        <meshBasicMaterial
          ref={materialRef}
          color={hexColor}
          transparent
          opacity={0.8}
          depthTest={false}
        />
        <pointLight color={hexColor} intensity={0.6} distance={2} decay={2} />
      </mesh>
    );
  },
);

interface NeuralConnectionProps {
  start: THREE.Vector3;
  end: THREE.Vector3;
  color?: string;
  opacity?: number;
}

const NeuralConnection: React.FC<NeuralConnectionProps> = memo(
  ({ start, end, color = COLORS.cyan, opacity = 0.3 }) => {
    const positions = useMemo(
      () => new Float32Array([start.x, start.y, start.z, end.x, end.y, end.z]),
      [start.x, start.y, start.z, end.x, end.y, end.z],
    );

    return (
      <line>
        <bufferGeometry attach="geometry">
          <bufferAttribute
            attach="attributes-position"
            array={positions}
            count={2}
            itemSize={3}
            attach-object={undefined}
            args={[positions, 3]}
          />
        </bufferGeometry>
        <lineBasicMaterial
          attach="material"
          color={color}
          transparent
          opacity={opacity}
          blending={THREE.AdditiveBlending}
        />
      </line>
    );
  },
);

export const NeuralNetwork: React.FC<{
  reducedMotion?: boolean;
  mousePosition?: { x: number; y: number };
}> = memo(({ reducedMotion = false, mousePosition }) => {
  const groupRef = useRef<THREE.Group>(null);
  const { x, y } = mousePosition || { x: 0, y: 0 };

  const nodes = useMemo(() => {
    const nodePositions: [number, number, number][] = [];
    const nodeColors: string[] = [];
    const nodeCount = getResponsiveParticleCount(reducedMotion);

    for (let i = 0; i < nodeCount; i++) {
      const radius = 6 + Math.random() * 4;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      const nx = radius * Math.sin(phi) * Math.cos(theta);
      const ny = radius * Math.sin(phi) * Math.sin(theta);
      const nz = radius * Math.cos(phi);
      nodePositions.push([nx, ny, nz]);

      const colorChoice = Math.random();
      if (colorChoice < 0.4) {
        nodeColors.push(COLORS.cyan);
      } else if (colorChoice < 0.7) {
        nodeColors.push(COLORS.purple);
      } else {
        nodeColors.push(COLORS.blue);
      }
    }

    return { positions: nodePositions, colors: nodeColors };
  }, [reducedMotion]);

  useFrame((_state, delta) => {
    if (reducedMotion || !groupRef.current) return;

    const targetY = (x / window.innerWidth - 0.5) * 0.5;
    const targetX = (y / window.innerHeight - 0.5) * 0.3;

    groupRef.current.rotation.y += (targetY - groupRef.current.rotation.y) * 0.02 + delta * 0.005;
    groupRef.current.rotation.x += (targetX - groupRef.current.rotation.x) * 0.02 + delta * 0.003;
  });

  return (
    <group ref={groupRef}>
      {nodes.positions.map((pos, i) => (
        <NeuralNode
          key={`node-${i}`}
          position={pos}
          color={nodes.colors[i]}
          size={0.12 + Math.random() * 0.08}
          pulse
        />
      ))}
      {nodes.positions.slice(0, 10).map((_, i) => {
        const targetIndex = (i + 1) % nodes.positions.length;
        const start = new THREE.Vector3(...nodes.positions[i]);
        const end = new THREE.Vector3(...nodes.positions[targetIndex]);
        return (
          <NeuralConnection
            key={`conn-${i}`}
            start={start}
            end={end}
            color={nodes.colors[i]}
            opacity={0.2}
          />
        );
      })}
    </group>
  );
});

NeuralNetwork.displayName = 'NeuralNetwork';
