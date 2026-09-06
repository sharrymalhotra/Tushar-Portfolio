import React, { Suspense, memo } from 'react';
import { Canvas } from '@react-three/fiber';
import { PerspectiveCamera } from '@react-three/drei';
import { NeuralNetwork } from './NeuralNetwork';
import { AICore } from './AICore';
import { ArchitectureFlow, TechOrbit, TravelPipeline } from './AgentViz';

const cameraSettings = {
  position: [0, 0, 15] as [number, number, number],
  fov: 45,
  near: 0.1,
  far: 100,
};

export const BackgroundScene: React.FC<{ reducedMotion?: boolean }> = memo(({ reducedMotion }) => {
  return (
    <Canvas
      camera={cameraSettings}
      gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
      dpr={[1, 1.5]}
    >
      <PerspectiveCamera makeDefault {...cameraSettings} />
      <ambientLight intensity={0.4} />
      <directionalLight position={[5, 5, 5]} intensity={0.3} color="#ffffff" />
      <pointLight position={[-5, -5, -5]} intensity={0.2} color="#06b6d4" />
      <Suspense fallback={null}>
        <NeuralNetwork reducedMotion={reducedMotion} />
        <AICore reducedMotion={reducedMotion} />
      </Suspense>
    </Canvas>
  );
});

export const HeroScene: React.FC<{
  reducedMotion?: boolean;
  mousePosition?: { x: number; y: number };
}> = memo(({ reducedMotion, mousePosition }) => {
  return (
    <Canvas
      camera={cameraSettings}
      gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
      dpr={[1, 1.5]}
    >
      <PerspectiveCamera makeDefault {...cameraSettings} />
      <ambientLight intensity={0.6} />
      <directionalLight position={[3, 3, 5]} intensity={0.5} color="#06b6d4" />
      <pointLight position={[-3, -3, -5]} intensity={0.3} color="#8b5cf6" />
      <Suspense fallback={null}>
        <AICore reducedMotion={reducedMotion} mousePosition={mousePosition} />
        <NeuralNetwork reducedMotion={reducedMotion} mousePosition={mousePosition} />
      </Suspense>
    </Canvas>
  );
});

export const AboutScene: React.FC<{ reducedMotion?: boolean }> = memo(({ reducedMotion }) => {
  const cameraPosition: [number, number, number] = [0, 0, 12];
  return (
    <Canvas
      camera={{ position: cameraPosition, fov: 50 }}
      gl={{ antialias: true, alpha: true }}
      dpr={[1, 1.5]}
    >
      <PerspectiveCamera makeDefault position={cameraPosition} fov={50} />
      <ambientLight intensity={0.5} />
      <directionalLight position={[0, 5, 5]} intensity={0.4} color="#ffffff" />
      <pointLight position={[0, 0, 5]} intensity={0.3} color="#06b6d4" />
      <Suspense fallback={null}>
        <ArchitectureFlow />
        <TechOrbit
          techs={['Python', 'Gemini', 'ADK', 'LangGraph', 'RAG', 'Power BI', 'SQL', 'LangChain', 'Git', 'UV Package Manager']}
          radius={4}
          reducedMotion={reducedMotion}
        />
      </Suspense>
    </Canvas>
  );
});

export const TechOrbitScene: React.FC<{ reducedMotion?: boolean }> = memo(({ reducedMotion }) => {
  const cameraPosition: [number, number, number] = [0, 0, 12];

  return (
    <Canvas
      camera={{ position: cameraPosition, fov: 50 }}
      gl={{ antialias: true, alpha: true }}
      dpr={[1, 1.5]}
    >
      <PerspectiveCamera makeDefault position={cameraPosition} fov={50} />
      <ambientLight intensity={0.5} />
      <pointLight position={[0, 0, 5]} intensity={0.3} color="#06b6d4" />
      <Suspense fallback={null}>
        <TechOrbit
          techs={['Python', 'Gemini', 'ADK', 'RAG', 'LangGraph', 'Power BI', 'SQL', 'LangChain', 'Git', 'UV Package Manager']}
          radius={4}
          reducedMotion={reducedMotion}
        />
      </Suspense>
    </Canvas>
  );
});

export const TravelScene: React.FC<{ reducedMotion?: boolean }> = memo(({ reducedMotion }) => {
  const cameraPosition: [number, number, number] = [0, 0, 8];
  return (
    <Canvas
      camera={{ position: cameraPosition, fov: 50 }}
      gl={{ antialias: true, alpha: true }}
      dpr={[1, 1.5]}
    >
      <PerspectiveCamera makeDefault position={cameraPosition} fov={50} />
      <ambientLight intensity={0.6} />
      <directionalLight position={[3, 3, 5]} intensity={0.4} color="#06b6d4" />
      <pointLight position={[-3, -3, -5]} intensity={0.3} color="#8b5cf6" />
      <Suspense fallback={null}>
        <TravelPipeline reducedMotion={reducedMotion} />
      </Suspense>
    </Canvas>
  );
});
