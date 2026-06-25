//onurx
import { useRef, useMemo, useEffect, useState } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { Float, Stars, Text } from '@react-three/drei';
import * as THREE from 'three';

// ─── Types ───────────────────────────────────────────────────────
interface Scene3DProps {
  scrollProgress: number;
  currentPage: string;
}

interface ParticleFieldProps {
  scrollProgress: number;
  currentPage: string;
  isMobile: boolean;
}

interface GoldenLightProps {
  scrollProgress: number;
}

interface CameraControllerProps {
  scrollProgress: number;
  currentPage: string;
}

// ─── Utility: Lerp ──────────────────────────────────────────────
function lerp(start: number, end: number, t: number): number {
  return start + (end - start) * t;
}

// ─── Golden Particle Field ─────────────────────────────────────
function GoldenParticles({ scrollProgress, currentPage, isMobile }: ParticleFieldProps) {
  const meshRef = useRef<THREE.Points>(null);
  const materialRef = useRef<THREE.ShaderMaterial>(null);
  const mouseRef = useRef({ x: 0, y: 0 });

  const COUNT = isMobile ? 3000 : 7000;

  // Precompute three formations: Grand 3D Hall, Spiral Vortex, Palace Crown & Stage
  const formations = useMemo(() => {
    const ring = new Float32Array(COUNT * 3);
    const hall = new Float32Array(COUNT * 3);
    const crown = new Float32Array(COUNT * 3);
    const sizes = new Float32Array(COUNT);

    for (let i = 0; i < COUNT; i++) {
      // 1. Formation 1 (Target Position 1): Spiral Ring Vortex
      const angle = (i / COUNT) * Math.PI * 2 * 3.5;
      const tubeAngle = (i / COUNT) * Math.PI * 2 * 9.0;
      const tubeRadius = 0.5 + Math.random() * 0.4;
      ring[i * 3] = (4.5 + tubeRadius * Math.cos(tubeAngle)) * Math.cos(angle);
      ring[i * 3 + 1] = tubeRadius * Math.sin(tubeAngle);
      ring[i * 3 + 2] = (4.5 + tubeRadius * Math.cos(tubeAngle)) * Math.sin(angle);

      // 2. Formation 2 (Target Position 2): The Grand 3D Hall (Columns, floor grid, arches, chandelier)
      const floorCount = Math.floor(COUNT * 0.35);
      const colCount = Math.floor(COUNT * 0.35);
      const archCount = Math.floor(COUNT * 0.15);
      
      if (i < floorCount) {
        // Floor grid
        const col = i % 30;
        const row = Math.floor(i / 30);
        hall[i * 3] = (col / 30 - 0.5) * 16.0 + (Math.random() - 0.5) * 0.1;
        hall[i * 3 + 1] = -3.5 + (Math.random() - 0.5) * 0.05;
        hall[i * 3 + 2] = (row / (floorCount / 30) - 0.5) * 32.0;
      } else if (i < floorCount + colCount) {
        // Columns (8 columns total at x = +-6, z = -12, -4, 4, 12)
        const colIdx = i % 8;
        const pX = colIdx % 2 === 0 ? -6.0 : 6.0;
        const pZ = -12.0 + Math.floor(colIdx / 2) * 8.0;
        
        const localIdx = i - floorCount;
        const theta = (localIdx / colCount) * Math.PI * 2 * 100.0;
        const radius = 0.4 + Math.random() * 0.08;
        const height = -3.5 + Math.random() * 7.0; // Column height
        
        hall[i * 3] = pX + Math.cos(theta) * radius;
        hall[i * 3 + 1] = height;
        hall[i * 3 + 2] = pZ + Math.sin(theta) * radius;
      } else if (i < floorCount + colCount + archCount) {
        // Arches connecting column pairs
        const localIdx = i - (floorCount + colCount);
        const archIdx = localIdx % 4;
        const pZ = -12.0 + archIdx * 8.0;
        
        const angle = (localIdx / archCount) * Math.PI;
        const radiusX = 6.0;
        const radiusY = 3.0;
        
        hall[i * 3] = Math.cos(angle) * radiusX;
        hall[i * 3 + 1] = 3.5 + Math.sin(angle) * radiusY + (Math.random() - 0.5) * 0.1;
        hall[i * 3 + 2] = pZ + (Math.random() - 0.5) * 0.1;
      } else {
        // Grand Chandelier hanging at x = 0, z = -2, y = 2 to 3.5
        const localIdx = i - (floorCount + colCount + archCount);
        const theta = (localIdx / (COUNT - (floorCount + colCount + archCount))) * Math.PI * 2.0 * 25.0;
        const tier = localIdx % 3;
        const radius = (1.5 - tier * 0.45) + Math.random() * 0.05;
        const height = 3.5 - tier * 0.6;
        
        hall[i * 3] = Math.cos(theta) * radius;
        hall[i * 3 + 1] = height;
        hall[i * 3 + 2] = -2.0 + Math.sin(theta) * radius;
      }

      // 3. Formation 3 (Target Position 3): Palace Crown & Stage Platform
      const crownCount = Math.floor(COUNT * 0.55);
      if (i < crownCount) {
        const localIdx = i;
        const ratio = localIdx / crownCount;
        
        if (ratio < 0.25) {
          // A. Base Ring Band (thick, solid golden foundation)
          const angle = (ratio / 0.25) * Math.PI * 2.0;
          const ringY = -2.0 + Math.random() * 0.25;
          const radius = 2.6 + (Math.random() - 0.5) * 0.08;
          
          crown[i * 3] = Math.cos(angle) * radius;
          crown[i * 3 + 1] = ringY;
          crown[i * 3 + 2] = -8.0 + Math.sin(angle) * radius;
        } else if (ratio < 0.70) {
          // B. 5 Majestic Points / Arches flaring outwards
          const angle = ((ratio - 0.25) / 0.45) * Math.PI * 2.0;
          const peakIntensity = Math.abs(Math.sin(angle * 2.5));
          const peakHeight = Math.pow(peakIntensity, 2.0) * 1.5;
          const height = -1.75 + peakHeight + (Math.random() - 0.5) * 0.12;
          const radius = (2.6 + peakHeight * 0.15) + (Math.random() - 0.5) * 0.08;
          
          crown[i * 3] = Math.cos(angle) * radius;
          crown[i * 3 + 1] = height;
          crown[i * 3 + 2] = -8.0 + Math.sin(angle) * radius;
        } else if (ratio < 0.90) {
          // C. Cross Arches meeting at the center top
          const archIdx = Math.floor(((ratio - 0.70) / 0.20) * 4);
          const angleBase = (archIdx / 4) * Math.PI * 2.0;
          const progress = (((ratio - 0.70) / 0.20) * 4) % 1.0;
          const angle = angleBase;
          const radius = 2.6 * (1.0 - progress);
          const height = -1.75 + Math.sin(progress * Math.PI) * 1.0 + progress * 1.5;
          
          crown[i * 3] = Math.cos(angle) * radius + (Math.random() - 0.5) * 0.06;
          crown[i * 3 + 1] = height;
          crown[i * 3 + 2] = -8.0 + Math.sin(angle) * radius + (Math.random() - 0.5) * 0.06;
        } else {
          // D. Royal Orb & Cross at the very top
          const subIdx = localIdx % 3;
          if (subIdx === 0) {
            const u = Math.random();
            const v = Math.random();
            const theta = u * 2.0 * Math.PI;
            const phi = Math.acos(2.0 * v - 1.0);
            const r = 0.12;
            crown[i * 3] = r * Math.sin(phi) * Math.cos(theta);
            crown[i * 3 + 1] = -0.1 + r * Math.sin(phi) * Math.sin(theta);
            crown[i * 3 + 2] = -8.0 + r * Math.cos(phi);
          } else {
            const isVertical = Math.random() > 0.4;
            if (isVertical) {
              crown[i * 3] = (Math.random() - 0.5) * 0.03;
              crown[i * 3 + 1] = 0.02 + Math.random() * 0.3;
              crown[i * 3 + 2] = -8.0 + (Math.random() - 0.5) * 0.03;
            } else {
              crown[i * 3] = (Math.random() - 0.5) * 0.25;
              crown[i * 3 + 1] = 0.15 + (Math.random() - 0.5) * 0.03;
              crown[i * 3 + 2] = -8.0 + (Math.random() - 0.5) * 0.03;
            }
          }
        }
      } else {
        // Stage circular platform at y = -3.5, z = -8
        const localIdx = i - crownCount;
        const angle = (localIdx / (COUNT - crownCount)) * Math.PI * 2.0 * 40.0;
        const radius = Math.random() * 4.5;
        
        crown[i * 3] = Math.cos(angle) * radius;
        crown[i * 3 + 1] = -3.5 + (Math.random() - 0.5) * 0.04;
        crown[i * 3 + 2] = -8.0 + Math.sin(angle) * radius;
      }

      sizes[i] = Math.random() * 1.8 + 0.4;
    }

    return { ring, hall, crown, sizes };
  }, [COUNT, isMobile]);

  // Custom shader for golden glowing particles
  const shaderData = useMemo(() => ({
    uniforms: {
      uTime: { value: 0 },
      uMorph: { value: 0 },
      uOpacity: { value: 1.0 },
      uColor1: { value: new THREE.Color('#D4AF37') },
      uColor2: { value: new THREE.Color('#F3E5AB') },
      uPixelRatio: { value: Math.min(window.devicePixelRatio, 2) },
    },
    vertexShader: `
      attribute float aSize;
      attribute vec3 aPosition1;
      attribute vec3 aPosition2;
      attribute vec3 aPosition3;
      uniform float uTime;
      uniform float uMorph;
      uniform float uPixelRatio;
      varying float vAlpha;
      
      void main() {
        // Zero-branch GPU morphing across three formations
        float t = clamp(uMorph, 0.0, 2.0);
        float t1 = clamp(t, 0.0, 1.0);
        float t2 = clamp(t - 1.0, 0.0, 1.0);
        vec3 morphed = mix(mix(aPosition1, aPosition2, t1), aPosition3, t2);
        
        // Subtle floating / breathing animation
        morphed.y += sin(uTime * 0.6 + float(gl_VertexID) * 0.01) * 0.12;
        morphed.x += cos(uTime * 0.4 + float(gl_VertexID) * 0.02) * 0.08;
        
        vec4 mvPosition = modelViewMatrix * vec4(morphed, 1.0);
        gl_Position = projectionMatrix * mvPosition;
        
        // Scale particle size up as they morph into the crown (uMorph > 1.0)
        float morphFactor = clamp(uMorph - 1.0, 0.0, 1.0);
        float sizeScale = 1.0 + morphFactor * 0.8;
        
        gl_PointSize = aSize * uPixelRatio * (80.0 / -mvPosition.z) * sizeScale;
        gl_PointSize = max(gl_PointSize, 1.0);
        
        vAlpha = smoothstep(0.0, 0.3, aSize / 2.0);
      }
    `,
    fragmentShader: `
      uniform vec3 uColor1;
      uniform vec3 uColor2;
      uniform float uTime;
      uniform float uOpacity;
      varying float vAlpha;
      
      void main() {
        float dist = length(gl_PointCoord - vec2(0.5));
        if (dist > 0.5) discard;
        
        float glow = 1.0 - smoothstep(0.0, 0.5, dist);
        glow = pow(glow, 1.5);
        
        vec3 color = mix(uColor1, uColor2, sin(uTime * 0.3) * 0.5 + 0.5);
        
        gl_FragColor = vec4(color, glow * vAlpha * uOpacity);
      }
    `,
    transparent: true,
    depthWrite: false,
    blending: THREE.AdditiveBlending,
  }), []);

  // Mouse tracking
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      mouseRef.current.x = (e.clientX / window.innerWidth) * 2 - 1;
      mouseRef.current.y = -(e.clientY / window.innerHeight) * 2 + 1;
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  useFrame((state) => {
    if (!meshRef.current || !materialRef.current) return;

    const time = state.clock.getElapsedTime();
    materialRef.current.uniforms.uTime.value = time;

    // Smooth morph toward target driven directly on GPU
    let targetMorph = 0;
    if (currentPage === 'home') {
      targetMorph = scrollProgress * 2;
    }
    materialRef.current.uniforms.uMorph.value = lerp(
      materialRef.current.uniforms.uMorph.value,
      targetMorph,
      0.03
    );

    // Mouse-driven rotation
    const targetRotX = mouseRef.current.y * 0.12;
    const targetRotY = mouseRef.current.x * 0.12;
    meshRef.current.rotation.x = lerp(meshRef.current.rotation.x, targetRotX, 0.03);
    meshRef.current.rotation.y = lerp(meshRef.current.rotation.y, targetRotY + time * 0.04, 0.03);

    // Dim particles slightly on non-home pages
    const targetOpacity = currentPage === 'home' ? 1.0 : 0.35;
    materialRef.current.uniforms.uOpacity.value = lerp(
      materialRef.current.uniforms.uOpacity.value,
      targetOpacity,
      0.03
    );
  });

  // Build geometry with target formations loaded once onto the GPU
  const geometry = useMemo(() => {
    const geo = new THREE.BufferGeometry();
    geo.setAttribute('position', new THREE.BufferAttribute(formations.hall, 3));
    geo.setAttribute('aPosition1', new THREE.BufferAttribute(formations.hall, 3));
    geo.setAttribute('aPosition2', new THREE.BufferAttribute(formations.ring, 3));
    geo.setAttribute('aPosition3', new THREE.BufferAttribute(formations.crown, 3));
    geo.setAttribute('aSize', new THREE.BufferAttribute(formations.sizes, 1));
    return geo;
  }, [formations]);

  return (
    <points ref={meshRef} geometry={geometry}>
      <shaderMaterial ref={materialRef} attach="material" args={[shaderData]} />
    </points>
  );
}

// ─── Animated Golden Directional Light ──────────────────────────
function GoldenLight({ scrollProgress }: GoldenLightProps) {
  const lightRef = useRef<THREE.DirectionalLight>(null);

  useFrame((state) => {
    if (!lightRef.current) return;
    const t = state.clock.getElapsedTime();
    lightRef.current.position.x = Math.sin(t * 0.3) * 5;
    lightRef.current.position.y = 3 + Math.cos(t * 0.2) * 2;
    lightRef.current.position.z = Math.cos(t * 0.3) * 5;
    lightRef.current.intensity = lerp(1.5, 2.5, scrollProgress);
  });

  return (
    <directionalLight
      ref={lightRef}
      color="#D4AF37"
      intensity={1.5}
      position={[5, 5, 5]}
    />
  );
}

// ─── Camera Controller (Walkthrough Fly-Through) ───────────────
function CameraController({ scrollProgress, currentPage }: CameraControllerProps) {
  const { camera } = useThree();
  const targetPos = useRef(new THREE.Vector3(0, 0, 12));
  const targetLookAt = useRef(new THREE.Vector3(0, 0, 0));

  useFrame(() => {
    let tx = 0, ty = 0, tz = 12;
    let lx = 0, ly = 0, lz = 0;

    if (currentPage === 'home') {
      // Camera flies first-person down the aisle of the 3D hall
      tz = lerp(12, -4.0, scrollProgress);
      ty = lerp(0.0, 1.2, scrollProgress);
      tx = Math.sin(scrollProgress * Math.PI * 2.0) * 0.6; // walk sway path
      
      // Camera look-at point slides forward matching the flight direction
      lx = 0;
      ly = lerp(0.0, 1.8, scrollProgress);
      lz = lerp(0.0, -10.0, scrollProgress);
    } else if (currentPage === 'gallery') {
      tx = 0; ty = 0; tz = 8;
      lx = 0; ly = 0; lz = 0;
    } else if (currentPage === 'tour') {
      tx = 0; ty = 0; tz = 45; // Move far back to hide main scene on tour
      lx = 0; ly = 0; lz = 0;
    } else {
      tx = 0; ty = 0; tz = 15;
      lx = 0; ly = 0; lz = 0;
    }

    targetPos.current.set(tx, ty, tz);
    targetLookAt.current.set(lx, ly, lz);

    // Smooth camera interpolation
    camera.position.lerp(targetPos.current, 0.025);
    const currentLookAt = new THREE.Vector3();
    camera.getWorldDirection(currentLookAt);
    currentLookAt.add(camera.position);
    currentLookAt.lerp(targetLookAt.current, 0.02);
    camera.lookAt(targetLookAt.current);
  });

  return null;
}

// ─── Floating Decorative Symbol (Majestic Crown/Globe) ───────────
// Integrated into FloatingText for synchronized animation

// ─── Floating 3D Text (Fades in at the bottom) ─────────────────
interface FloatingTextProps {
  scrollProgress: number;
  isMobile: boolean;
}

function FloatingText({ scrollProgress, isMobile }: FloatingTextProps) {
  const groupRef = useRef<THREE.Group>(null);
  const textRef = useRef<any>(null);
  const subtextRef = useRef<any>(null);
  const symbolRef = useRef<THREE.Group>(null);
  
  const ring1 = useRef<THREE.Mesh>(null);
  const ring2 = useRef<THREE.Mesh>(null);
  const ring3 = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    // Symbol animation
    if (ring1.current && ring2.current && ring3.current) {
      const t = state.clock.getElapsedTime();
      ring1.current.rotation.x = t * 0.4;
      ring1.current.rotation.y = t * 0.4;
      ring2.current.rotation.x = -t * 0.3;
      ring2.current.rotation.y = t * 0.5;
      ring3.current.rotation.z = t * 0.2;
      ring3.current.rotation.x = Math.PI / 2;
    }

    // Animasyon %90'a geldiğinde bitiyor, son %10'da yazı ve kamera sabit kalacak
    const progressStart = 0.50;
    const progressRange = 0.50;
    const rawProgress = Math.max(0, Math.min(1, (scrollProgress - progressStart) / progressRange));
    
    // Easing function for smooth entrance (cubic ease-out)
    const easeProgress = 1.0 - Math.pow(1.0 - rawProgress, 3);
    
    const opacity = easeProgress;
    const subOpacity = Math.max(0, Math.min(1, (rawProgress - 0.2) * 1.5));
    
    if (textRef.current && textRef.current.material) {
      textRef.current.material.opacity = opacity;
    }
    if (subtextRef.current && subtextRef.current.material) {
      subtextRef.current.material.opacity = subOpacity;
    }

    // Animate group scale and position.y dynamically for a sweeping entrance
    if (groupRef.current) {
      // Yazıyı ve simgeyi footer'ın altında kalmayacak şekilde yukarı taşıdık (y = 2.8)
      const targetY = isMobile ? 2.5 : 3.0;
      groupRef.current.position.y = lerp(-2.0, targetY, easeProgress);
      
      // Smoothly scale everything up to 1.0
      const currentScale = lerp(0.5, 1.0, easeProgress);
      groupRef.current.scale.set(currentScale, currentScale, currentScale);
    }
  });

  return (
    <group ref={groupRef} position={[0, 3.0, -11]}>
      {/* Integrated Symbol */}
      <group ref={symbolRef} position={[0, isMobile ? 1.5 : 2.2, 0]}>
        <Float speed={2} rotationIntensity={0.5} floatIntensity={0.5}>
          {/* Core glowing sphere */}
          <mesh>
            <sphereGeometry args={[isMobile ? 0.25 : 0.4, 32, 32]} />
            <meshStandardMaterial color="#D4AF37" emissive="#D4AF37" emissiveIntensity={1.5} metalness={1} roughness={0.1} />
          </mesh>
          {/* Orbiting Rings */}
          <mesh ref={ring1}>
            <torusGeometry args={[isMobile ? 0.7 : 1.2, 0.04, 16, 100]} />
            <meshStandardMaterial color="#D4AF37" emissive="#D4AF37" emissiveIntensity={0.8} metalness={1} roughness={0.2} />
          </mesh>
          <mesh ref={ring2}>
            <torusGeometry args={[isMobile ? 0.9 : 1.5, 0.03, 16, 100]} />
            <meshStandardMaterial color="#F3E5AB" emissive="#F3E5AB" emissiveIntensity={0.5} metalness={1} roughness={0.2} transparent opacity={0.8} />
          </mesh>
          <mesh ref={ring3}>
            <torusGeometry args={[isMobile ? 1.1 : 1.8, 0.02, 16, 100]} />
            <meshStandardMaterial color="#B8860B" metalness={1} roughness={0.1} transparent opacity={0.6} />
          </mesh>
        </Float>
      </group>

      {/* Main Text */}
      <Text
        ref={textRef}
        color="#D4AF37"
        fontSize={isMobile ? 0.45 : 1.4}
        anchorX="center"
        anchorY="middle"
        letterSpacing={isMobile ? 0.05 : 0.25}
        transparent
      >
        ÇETİN KONAK
      </Text>
      <Text
        ref={subtextRef}
        position={[0, isMobile ? -0.4 : -0.9, 0]}
        color="#ffffff"
        fontSize={isMobile ? 0.15 : 0.35}
        anchorX="center"
        anchorY="middle"
        letterSpacing={0.2}
        transparent
      >
        Saray Zarafetinde Davetler
      </Text>
    </group>
  );
}

// ─── Inner Scene Content ────────────────────────────────────────
function SceneContent({ scrollProgress, currentPage }: Scene3DProps) {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener('resize', check);
    return () => window.removeEventListener('resize', check);
  }, []);

  // Ana sayfada kaydırma %90'a geldiğinde 3D dünyanın hareketini tamamen dondurur.
  // Böylece hem kamera hem yazılar büyümeden tam ekranda kilitli kalır.
  const effectiveProgress = currentPage === 'home' 
    ? Math.min(1.0, scrollProgress / 0.90) 
    : scrollProgress;

  return (
    <>
      <ambientLight intensity={0.15} color="#F3E5AB" />
      <GoldenLight scrollProgress={effectiveProgress} />
      <pointLight position={[0, 0, 5]} color="#D4AF37" intensity={0.5} distance={20} />

      <GoldenParticles
        scrollProgress={effectiveProgress}
        currentPage={currentPage}
        isMobile={isMobile}
      />

      {currentPage === 'home' && (
        <FloatingText scrollProgress={effectiveProgress} isMobile={isMobile} />
      )}

      <Stars
        radius={50}
        depth={80}
        count={isMobile ? 1000 : 3000}
        factor={3}
        saturation={0}
        fade
        speed={0.5}
      />

      <CameraController scrollProgress={effectiveProgress} currentPage={currentPage} />
    </>
  );
}

// ─── Main Export ─────────────────────────────────────────────────
function Scene3D({ scrollProgress, currentPage }: Scene3DProps) {
  return (
    <div className="fixed inset-0 z-0 pointer-events-none" style={{ background: '#0a0a0a' }}>
      <Canvas
        camera={{ fov: 60, near: 0.1, far: 200, position: [0, 0, 12] }}
        dpr={[1, 1.5]}
        gl={{
          antialias: true,
          alpha: false,
          powerPreference: 'high-performance',
          toneMapping: THREE.ACESFilmicToneMapping,
          toneMappingExposure: 1.2,
        }}
      >
        <color attach="background" args={['#0a0a0a']} />
        <fog attach="fog" args={['#0a0a0a', 15, 60]} />
        <SceneContent scrollProgress={scrollProgress} currentPage={currentPage} />
      </Canvas>
    </div>
  );
}

export default Scene3D;
