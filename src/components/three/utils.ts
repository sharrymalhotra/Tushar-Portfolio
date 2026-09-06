import * as THREE from 'three';

export const COLORS = {
  cyan: '#06b6d4',
  purple: '#8b5cf6',
  blue: '#3b82f6',
  pink: '#ec4899',
  emerald: '#10b981',
};

export function createSphereGeometry(radius: number, widthSegments = 16, heightSegments = 16) {
  return new THREE.SphereGeometry(radius, widthSegments, heightSegments);
}

export function createTorusGeometry(
  radius: number,
  tube: number,
  radialSegments = 8,
  tubularSegments = 50,
) {
  return new THREE.TorusGeometry(radius, tube, radialSegments, tubularSegments);
}

export function createRingGeometry(innerRadius: number, outerRadius: number, thetaSegments = 32) {
  return new THREE.RingGeometry(innerRadius, outerRadius, thetaSegments);
}

export function createNodeMaterial(color: string) {
  return new THREE.MeshBasicMaterial({
    color: new THREE.Color(color),
    transparent: true,
    opacity: 0.8,
    depthTest: false,
  });
}

export function createLineMaterial(color: string) {
  return new THREE.LineBasicMaterial({
    color: new THREE.Color(color),
    transparent: true,
    opacity: 0.3,
    blending: THREE.AdditiveBlending,
  });
}

export function createEnergyMaterial() {
  return new THREE.MeshBasicMaterial({
    color: 0x06b6d4,
    transparent: true,
    opacity: 0.2,
    side: THREE.DoubleSide,
    depthWrite: false,
  });
}

export function getResponsiveParticleCount(reducedMotion: boolean): number {
  if (typeof window === 'undefined') return 45;
  if (reducedMotion) return 15;
  if (window.innerWidth < 768) return 25;
  if (window.matchMedia('(max-width: 1024px)').matches) return 35;
  return 45;
}

export function getDevicePerformanceTier(): 'high' | 'medium' | 'low' {
  if (typeof window === 'undefined' || typeof navigator === 'undefined') return 'medium';

  const isMobile = /Android|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
    navigator.userAgent,
  );
  if (isMobile) return 'low';

  const gpuInfo = (navigator as { gpu?: { getPreferredCanvasFormat?: () => string } }).gpu;
  if (gpuInfo && typeof gpuInfo.getPreferredCanvasFormat === 'function') {
    return 'high';
  }

  return window.devicePixelRatio > 1.5 ? 'low' : 'medium';
}
