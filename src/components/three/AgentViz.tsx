import React, { useRef, useMemo, memo, useState } from 'react';
import { useFrame } from '@react-three/fiber';
import { Html } from '@react-three/drei';
import * as THREE from 'three';
import { COLORS } from './utils';

interface TechTagProps {
  position: [number, number, number];
  text: string;
  color?: string;
  scale?: number;
}

const TechTag: React.FC<TechTagProps> = memo(
  ({ position, text, color = COLORS.cyan, scale = 1 }) => {
    return (
      <Html
        position={position}
        style={{
          transform: `scale(${scale})`,
          pointerEvents: 'none',
        }}
      >
        <div
          className="rounded-full px-2 py-0.5 text-xs font-medium backdrop-blur-sm"
          style={{
            backgroundColor: 'rgba(5, 5, 10, 0.6)',
            color: color,
            border: `1px solid ${color}40`,
            boxShadow: `0 0 8px ${color}30`,
          }}
        >
          {text}
        </div>
      </Html>
    );
  },
);

TechTag.displayName = 'TechTag';

interface AgentNodeProps {
  position: [number, number, number];
  label: string;
  color?: string;
  icon?: React.ReactNode;
}

const AgentNode: React.FC<AgentNodeProps> = memo(
  ({ position, label, color = COLORS.cyan, icon }) => {
    const ref = useRef<THREE.Group>(null);
    const [hovered, setHovered] = useState(false);

    useFrame((state) => {
      if (!ref.current) return;
      if (hovered) {
        ref.current.children.forEach((child) => {
          if (child instanceof THREE.Mesh) {
            const material = child.material as THREE.MeshBasicMaterial;
            if (material) {
              material.opacity = 0.4 + Math.sin(state.clock.elapsedTime * 3) * 0.2;
            }
          }
        });
      }
    });

    return (
      <group ref={ref} position={position}>
        <mesh onPointerOver={() => setHovered(true)} onPointerOut={() => setHovered(false)}>
          <boxGeometry args={[0.5, 0.5, 0.5]} />
          <meshBasicMaterial color={color} transparent opacity={hovered ? 0.8 : 0.5} />
        </mesh>

        <Html
          position={[0.8, 0, 0]}
          transform
          distanceFactor={10}
          style={{ pointerEvents: 'none' }}
        >
          <div
            className="whitespace-nowrap text-xs opacity-80"
            style={{ color: hovered ? color : '#9ca3af', textShadow: `0 0 8px ${color}` }}
          >
            {label}
          </div>
        </Html>

        {hovered && (
          <Html
            position={[0, 0.8, 0]}
            transform
            distanceFactor={10}
            style={{ pointerEvents: 'none' }}
          >
            <div
              className="rounded-md px-2 py-1 text-xs"
              style={{
                backgroundColor: 'rgba(10, 10, 20, 0.8)',
                color: color,
                border: `1px solid ${color}40`,
              }}
            >
              {icon || 'Agent'}
            </div>
          </Html>
        )}
      </group>
    );
  },
);

AgentNode.displayName = 'AgentNode';

interface ConnectionLineProps {
  start: [number, number, number];
  end: [number, number, number];
  color?: string;
  animated?: boolean;
  particleSpeed?: number;
}

const ConnectionLine: React.FC<ConnectionLineProps> = memo(
  ({ start, end, color = COLORS.cyan, animated = true, particleSpeed = 0.02 }) => {
    const particleRef = useRef<THREE.Mesh>(null);
    const progressRef = useRef(0);

    const points = useMemo(
      () => new Float32Array([start[0], start[1], start[2], end[0], end[1], end[2]]),
      [start, end],
    );

    useFrame((_state, delta) => {
      if (animated && particleRef.current) {
        progressRef.current += delta * particleSpeed;
        if (progressRef.current > 1) {
          progressRef.current = 0;
        }
        const t = progressRef.current;
        const x = start[0] + (end[0] - start[0]) * t;
        const y = start[1] + (end[1] - start[1]) * t;
        const z = start[2] + (end[2] - start[2]) * t;
        particleRef.current.position.set(x, y, z);
      }
    });

    return (
      <group>
        <line>
          <bufferGeometry attach="geometry">
            <bufferAttribute
              attach="attributes-position"
              array={points}
              count={2}
              itemSize={3}
              attach-object={undefined}
              args={[points, 3]}
            />
          </bufferGeometry>
          <lineBasicMaterial
            attach="material"
            color={color}
            transparent
            opacity={0.3}
            blending={THREE.AdditiveBlending}
          />
        </line>
        {animated && (
          <mesh ref={particleRef}>
            <sphereGeometry args={[0.08, 8, 8]} />
            <meshBasicMaterial color={color} transparent opacity={0.8} />
          </mesh>
        )}
      </group>
    );
  },
);

ConnectionLine.displayName = 'ConnectionLine';

const flowIcons = [
  { label: 'User Input', color: COLORS.cyan },
  { label: 'AI Agent', color: COLORS.purple },
  { label: 'Specialized Agents', color: COLORS.blue },
  { label: 'Tools / APIs', color: COLORS.emerald },
  { label: 'Final Response', color: COLORS.pink },
];

export const ArchitectureFlow: React.FC = memo(() => {
  const groupRef = useRef<THREE.Group>(null);

  const nodePositions: [number, number, number][] = useMemo(
    () => [
      [0, 1.5, 0],
      [0, 0.5, 0],
      [0, -0.5, 0],
      [0, -1.5, 0],
      [0, -2.5, 0],
    ],
    [],
  );

  useFrame((state) => {
    if (!groupRef.current) return;
    const time = state.clock.elapsedTime;
    groupRef.current.rotation.y = Math.sin(time * 0.1) * 0.1;
  });

  return (
    <group ref={groupRef}>
      {nodePositions.map((pos, i) => (
        <AgentNode
          key={`node-${i}`}
          position={pos}
          label={flowIcons[i].label}
          color={flowIcons[i].color}
        />
      ))}

      {nodePositions.slice(0, -1).map((pos, i) => {
        const start: [number, number, number] = pos;
        const end: [number, number, number] = nodePositions[i + 1];
        return (
          <ConnectionLine
            key={`conn-${i}`}
            start={start}
            end={end}
            color={flowIcons[i].color}
            animated
            particleSpeed={0.015}
          />
        );
      })}

      <ambientLight intensity={0.5} />
      <pointLight position={[0, 0, 5]} intensity={0.5} color={COLORS.cyan} />
    </group>
  );
});

ArchitectureFlow.displayName = 'ArchitectureFlow';

export const TechOrbit: React.FC<{ techs: string[]; radius?: number; reducedMotion?: boolean }> =
  memo(({ techs, radius = 4, reducedMotion = false }) => {
    const groupRef = useRef<THREE.Group>(null);
    const timeRef = useRef(0);

    const tagPositions = useMemo(() => {
      return techs.map((_, i) => {
        const angle = (i / techs.length) * Math.PI * 2;
        const x = Math.cos(angle) * radius;
        const z = Math.sin(angle) * radius;
        const y = Math.sin((i * 1.5) / radius) * 0.5;
        return [x, y, z] as [number, number, number];
      });
    }, [techs, radius]);

    useFrame((_state, delta) => {
      if (reducedMotion || !groupRef.current) return;
      timeRef.current += delta;
      groupRef.current.rotation.y = timeRef.current * 0.1;
    });

    const colors = [COLORS.cyan, COLORS.purple, COLORS.blue, COLORS.pink, COLORS.emerald];

    return (
      <group ref={groupRef}>
        {techs.map((tech, i) => (
          <TechTag
            key={tech}
            position={tagPositions[i]}
            text={tech}
            color={colors[i % colors.length]}
            scale={0.7 + Math.sin(i) * 0.2}
          />
        ))}
        {!reducedMotion &&
          tagPositions.map((_, i) => {
            const next = tagPositions[(i + 1) % tagPositions.length];
            return (
              <ConnectionLine
                key={`orbit-conn-${i}`}
                start={tagPositions[i]}
                end={next}
                color={COLORS.purple}
                animated={false}
              />
            );
          })}
      </group>
    );
  });

TechOrbit.displayName = 'TechOrbit';

export const TravelPipeline: React.FC<{ reducedMotion?: boolean }> = memo(
  ({ reducedMotion = false }) => {
    const groupRef = useRef<THREE.Group>(null);
    const particleProgress = useRef<Record<number, number>>({});

    const agents = useMemo(
      () => [
        { label: 'User Request', color: COLORS.cyan, pos: [0, 1.2, 0] as [number, number, number] },
        {
          label: 'Travel Planner',
          color: COLORS.purple,
          pos: [0, 0.6, 0] as [number, number, number],
        },
        { label: 'Destination', color: COLORS.blue, pos: [-1.5, 0, 0] as [number, number, number] },
        { label: 'Inspiration', color: COLORS.pink, pos: [0, 0, 0] as [number, number, number] },
        { label: 'Places', color: COLORS.emerald, pos: [1.5, 0, 0] as [number, number, number] },
        { label: 'Travel News', color: COLORS.cyan, pos: [0, -0.6, 0] as [number, number, number] },
        { label: 'Itinerary', color: COLORS.purple, pos: [0, -1.2, 0] as [number, number, number] },
      ],
      [],
    );

    const connections = useMemo(() => {
      const conns: {
        start: [number, number, number];
        end: [number, number, number];
        color: string;
      }[] = [];
      for (let i = 0; i < agents.length - 1; i++) {
        if (i >= 2 && i <= 4) continue;
        conns.push({
          start: agents[i].pos,
          end: agents[i + 1].pos,
          color: agents[i].color,
        });
      }
      agents.slice(2, 4).forEach((agent) => {
        conns.push({
          start: agents[1].pos,
          end: agent.pos,
          color: agent.color,
        });
      });
      agents.slice(4, 5).forEach((agent) => {
        conns.push({
          start: agents[1].pos,
          end: agent.pos,
          color: agent.color,
        });
      });
      return conns;
    }, [agents]);

    useFrame((_state, delta) => {
      if (!groupRef.current || reducedMotion) return;

      agents.forEach((_agent, i) => {
        if (!particleProgress.current[i]) particleProgress.current[i] = Math.random();
        particleProgress.current[i] += delta * (0.02 + i * 0.005);
        if (particleProgress.current[i] > 1) particleProgress.current[i] = 0;
      });
    });

    return (
      <group ref={groupRef}>
        {agents.map((agent, i) => (
          <AgentNode
            key={`agent-${i}`}
            position={agent.pos}
            label={agent.label}
            color={agent.color}
          />
        ))}

        {connections.map((conn, i) => (
          <ConnectionLine
            key={`trav-conn-${i}`}
            start={conn.start}
            end={conn.end}
            color={conn.color}
            animated
            particleSpeed={0.02 + i * 0.005}
          />
        ))}

        <ambientLight intensity={0.3} />
        <pointLight position={[0, 0, 5]} intensity={0.5} color={COLORS.cyan} />
      </group>
    );
  },
);

TravelPipeline.displayName = 'TravelPipeline';
