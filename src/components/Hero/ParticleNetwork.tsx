import { useRef, useEffect, useState } from 'react';
import * as THREE from 'three';

// ── Graph Data ────────────────────────────────────────────────────────
const NODES = [
  { id: 'core', label: 'SYSTEM CORE', details: 'The central architecture tying everything together.', group: 0 },
  { id: 'dsa1', label: 'Data Structures', details: 'Trees, Graphs, Heaps, and Tries.', group: 1 },
  { id: 'dsa2', label: 'Dynamic Prog.', details: 'Optimal substructure & memoization flows.', group: 1 },
  { id: 'dsa3', label: 'Algorithms', details: 'BFS, DFS, Dijkstra, and A* Pathfinding.', group: 1 },
  { id: 'sys1', label: 'System Design', details: 'Scalable, distributed architectures designed for high load.', group: 2 },
  { id: 'sys2', label: 'Microservices', details: 'Decoupled, containerized event-driven services.', group: 2 },
  { id: 'sys3', label: 'AWS & Cloud', details: 'EC2, S3, Lambda, and serverless deployments.', group: 2 },
  { id: 'sys4', label: 'Load Balancing', details: 'NGINX, horizontal scaling, and traffic routing.', group: 2 },
  { id: 'be1',  label: 'Node.js', details: 'High-performance V8 runtime backend services.', group: 3 },
  { id: 'be2',  label: 'PostgreSQL', details: 'Relational data modeling, indexing, and ACID transactions.', group: 3 },
  { id: 'be3',  label: 'Redis Cache', details: 'In-memory data stores for ultra-fast reads.', group: 3 },
  { id: 'rt1',  label: 'WebRTC', details: 'P2P media streaming and data channels.', group: 4 },
  { id: 'rt2',  label: 'WebSockets', details: 'Real-time bidirectional event communication.', group: 4 },
  { id: 'fe1',  label: 'React & 3D', details: 'Interactive, WebGL-powered user interfaces.', group: 5 },
  { id: 'fe2',  label: 'TypeScript', details: 'Strict static typing for robust applications.', group: 5 }
];

const EDGES = [
  ['core', 'sys1'], ['core', 'be1'], ['core', 'dsa1'], ['core', 'fe1'],
  ['dsa1', 'dsa2'], ['dsa1', 'dsa3'], ['dsa3', 'sys1'],
  ['sys1', 'sys2'], ['sys2', 'sys3'], ['sys3', 'sys4'], ['sys1', 'sys4'],
  ['be1', 'be2'], ['be1', 'be3'], ['sys2', 'be1'], ['be3', 'sys4'],
  ['rt1', 'rt2'], ['rt2', 'be1'], ['rt1', 'sys2'],
  ['fe1', 'fe2'], ['fe2', 'be1'], ['fe1', 'rt2']
];

const COLORS = { 0: '#ffffff', 1: '#bcfb2b', 2: '#6080ff', 3: '#b060ff', 4: '#ff4080', 5: '#40ffff' };

export default function ParticleNetwork() {
  const mountRef = useRef<HTMLDivElement>(null);
  const labelsRef = useRef<HTMLDivElement>(null);
  
  // React State for Overlays
  const [introStage, setIntroStage] = useState<'typing' | 'fading' | 'done'>('typing');
  const [focusedNode, setFocusedNode] = useState<typeof NODES[0] | null>(null);

  useEffect(() => {
    const t1 = setTimeout(() => setIntroStage('fading'), 2500);
    const t2 = setTimeout(() => setIntroStage('done'), 3500);
    return () => { clearTimeout(t1); clearTimeout(t2); };
  }, []);

  useEffect(() => {
    const mount = mountRef.current;
    const labelsContainer = labelsRef.current;
    if (!mount || !labelsContainer) return;

    /* ── 1. Setup Scene ────────────────────────────────────────────── */
    let W = window.innerWidth;
    let H = window.innerHeight;
    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true, powerPreference: 'high-performance' });
    renderer.setSize(W, H);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setClearColor(0x000000, 1);
    mount.appendChild(renderer.domElement);

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(60, W / H, 10, 5000);
    
    const graphGroup = new THREE.Group();
    const secondBgGroup = new THREE.Group();
    scene.add(graphGroup);
    scene.add(secondBgGroup);

    /* ── 2. Graph Physics (Force Directed) ─────────────────────────── */
    const positions = new Map<string, THREE.Vector3>();
    const velocities = new Map<string, THREE.Vector3>();

    NODES.forEach(n => {
      // Group-based initial positions for better clustering
      const gx = (n.group === 2 ? 400 : n.group === 3 ? -400 : n.group === 4 ? -200 : n.group === 5 ? 200 : 0);
      const gy = (n.group === 1 ? 400 : n.group === 4 ? -400 : 0);
      positions.set(n.id, new THREE.Vector3(gx + (Math.random() - 0.5) * 300, gy + (Math.random() - 0.5) * 300, (Math.random() - 0.5) * 300));
      velocities.set(n.id, new THREE.Vector3(0, 0, 0));
    });
    positions.get('core')!.set(0, 0, 0);

    const simulatePhysics = () => {
      const REPULSION = 150000; const SPRING = 0.015; const DAMPING = 0.85; const IDEAL_LEN = 300;
      for (let i = 0; i < NODES.length; i++) {
        for (let j = i + 1; j < NODES.length; j++) {
          const id1 = NODES[i].id; const id2 = NODES[j].id;
          const p1 = positions.get(id1)!; const p2 = positions.get(id2)!;
          const diff = p1.clone().sub(p2);
          const distSq = diff.lengthSq() + 1;
          const force = diff.normalize().multiplyScalar(REPULSION / distSq);
          if (id1 !== 'core') velocities.get(id1)!.add(force);
          if (id2 !== 'core') velocities.get(id2)!.sub(force);
        }
      }
      EDGES.forEach(([id1, id2]) => {
        const p1 = positions.get(id1)!; const p2 = positions.get(id2)!;
        const diff = p2.clone().sub(p1);
        const dist = diff.length();
        const force = diff.normalize().multiplyScalar((dist - IDEAL_LEN) * SPRING);
        if (id1 !== 'core') velocities.get(id1)!.add(force);
        if (id2 !== 'core') velocities.get(id2)!.sub(force);
      });
      NODES.forEach(n => {
        if (n.id === 'core') return;
        const v = velocities.get(n.id)!;
        v.multiplyScalar(DAMPING);
        positions.get(n.id)!.add(v);
        velocities.get(n.id)!.sub(positions.get(n.id)!.clone().multiplyScalar(0.001));
      });
    };
    for (let i = 0; i < 300; i++) simulatePhysics();

    /* ── 3. Visual Generators ──────────────────────────────────────── */
    const createGlowTexture = (colorHex: string) => {
      const s = 128; const cv = document.createElement('canvas'); cv.width = s; cv.height = s;
      const ctx = cv.getContext('2d')!;
      const grad = ctx.createRadialGradient(s/2, s/2, 0, s/2, s/2, s/2);
      grad.addColorStop(0, colorHex);
      grad.addColorStop(0.2, colorHex.replace(')', ', 0.8)').replace('rgb', 'rgba'));
      grad.addColorStop(0.5, colorHex.replace(')', ', 0.2)').replace('rgb', 'rgba'));
      grad.addColorStop(1, 'rgba(0,0,0,0)');
      ctx.fillStyle = grad; ctx.fillRect(0, 0, s, s);
      return new THREE.CanvasTexture(cv);
    };

    /* ── 4. Build Graph Objects & HTML Labels ──────────────────────── */
    const nodeVisuals = new Map<string, { group: THREE.Group, ring: THREE.Mesh }>();
    const nodeLabels = new Map<string, HTMLDivElement>();
    
    labelsContainer.innerHTML = '';

    NODES.forEach(n => {
      const g = new THREE.Group();
      g.position.copy(positions.get(n.id)!);
      const c = COLORS[n.group as keyof typeof COLORS];
      
      const mat = new THREE.SpriteMaterial({ map: createGlowTexture(c), transparent: true, blending: THREE.AdditiveBlending, depthWrite: false });
      const orb = new THREE.Sprite(mat);
      orb.scale.set(100, 100, 1);
      g.add(orb);

      const ring = new THREE.Mesh(new THREE.RingGeometry(25, 28, 32), new THREE.MeshBasicMaterial({ color: c, transparent: true, opacity: 0.6, side: THREE.DoubleSide }));
      ring.rotation.x = Math.random() * Math.PI; ring.rotation.y = Math.random() * Math.PI;
      g.add(ring);

      nodeVisuals.set(n.id, { group: g, ring });
      graphGroup.add(g);

      const labelEl = document.createElement('div');
      labelEl.className = 'graph-node-label';
      labelEl.innerHTML = `<span class="graph-node-dot" style="background-color: ${c}"></span><span class="graph-node-text">${n.label}</span>`;
      
      Object.assign(labelEl.style, {
        position: 'absolute',
        top: '0', left: '0',
        transform: 'translate(-50%, -50%)',
        color: 'white',
        fontFamily: '"Inter", sans-serif',
        fontSize: '0.85rem',
        fontWeight: '600',
        letterSpacing: '0.05em',
        display: 'flex',
        alignItems: 'center',
        gap: '8px',
        padding: '6px 12px',
        background: 'rgba(10, 10, 15, 0.4)',
        backdropFilter: 'blur(4px)',
        border: `1px solid ${c}40`,
        borderRadius: '20px',
        cursor: 'pointer',
        pointerEvents: 'auto',
        transition: 'border-color 0.2s, background 0.2s, color 0.2s',
        whiteSpace: 'nowrap',
        willChange: 'transform'
      });

      labelEl.onmouseenter = () => {
        labelEl.style.background = `${c}20`;
        labelEl.style.borderColor = c;
      };
      labelEl.onmouseleave = () => {
        labelEl.style.background = 'rgba(10, 10, 15, 0.4)';
        labelEl.style.borderColor = `${c}40`;
      };
      
      labelEl.onclick = () => {
        setFocusedNode(n);
      };

      labelsContainer.appendChild(labelEl);
      nodeLabels.set(n.id, labelEl);
    });

    const lineGeo = new THREE.BufferGeometry();
    const linePos = new Float32Array(EDGES.length * 6);
    const lineColors = new Float32Array(EDGES.length * 6);
    EDGES.forEach(([id1, id2], i) => {
      const p1 = positions.get(id1)!; const p2 = positions.get(id2)!;
      const c1 = new THREE.Color(COLORS[NODES.find(n => n.id === id1)!.group as keyof typeof COLORS]);
      const c2 = new THREE.Color(COLORS[NODES.find(n => n.id === id2)!.group as keyof typeof COLORS]);
      linePos[i*6] = p1.x; linePos[i*6+1] = p1.y; linePos[i*6+2] = p1.z;
      linePos[i*6+3] = p2.x; linePos[i*6+4] = p2.y; linePos[i*6+5] = p2.z;
      lineColors[i*6] = c1.r; lineColors[i*6+1] = c1.g; lineColors[i*6+2] = c1.b;
      lineColors[i*6+3] = c2.r; lineColors[i*6+4] = c2.g; lineColors[i*6+5] = c2.b;
    });
    lineGeo.setAttribute('position', new THREE.BufferAttribute(linePos, 3));
    lineGeo.setAttribute('color', new THREE.BufferAttribute(lineColors, 3));
    const edgeLines = new THREE.LineSegments(lineGeo, new THREE.LineBasicMaterial({ vertexColors: true, transparent: true, opacity: 0.3, blending: THREE.AdditiveBlending }));
    graphGroup.add(edgeLines);

    /* ── 5. Second Background Animation ───────── */
    const bigStructureGeo = new THREE.TorusKnotGeometry(400, 140, 256, 32);
    const bigStructureMat = new THREE.LineBasicMaterial({ color: 0x6080ff, transparent: true, opacity: 0, blending: THREE.AdditiveBlending });
    const bigStructure = new THREE.LineSegments(new THREE.EdgesGeometry(bigStructureGeo), bigStructureMat);
    bigStructure.position.set(0, 0, -800);
    secondBgGroup.add(bigStructure);

    const coreMat = new THREE.PointsMaterial({ color: 0xbcfb2b, size: 4, transparent: true, opacity: 0, blending: THREE.AdditiveBlending });
    const corePoints = new THREE.Points(bigStructureGeo, coreMat);
    corePoints.position.set(0, 0, -800);
    secondBgGroup.add(corePoints);

    /* ── 6. Animation Loop ─────────────────────────── */
    const clock = new THREE.Clock();
    let rafId: number;

    const smoothMouse = new THREE.Vector2(0, 0);
    const mouse = new THREE.Vector2(0, 0);
    const onMove = (e: MouseEvent) => {
      mouse.x = (e.clientX / W) * 2 - 1;
      mouse.y = -(e.clientY / H) * 2 + 1;
    };
    window.addEventListener('mousemove', onMove);

    const currentCameraPos = new THREE.Vector3(0, 0, 1500);
    const currentLookAt = new THREE.Vector3(0, 0, 0);

    const animate = () => {
      rafId = requestAnimationFrame(animate);
      const t = clock.getElapsedTime();

      smoothMouse.x += (mouse.x - smoothMouse.x) * 0.05;
      smoothMouse.y += (mouse.y - smoothMouse.y) * 0.05;

      const scrollY = window.scrollY;
      const vh = window.innerHeight;
      
      const p1 = Math.min(Math.max(scrollY / vh, 0), 1);
      const p2 = Math.min(Math.max((scrollY - vh) / vh, 0), 1);
      const p3 = Math.min(Math.max((scrollY - 2*vh) / vh, 0), 1);
      const fadeOutProg = Math.min(Math.max((scrollY - 2.5*vh) / (0.5*vh), 0), 1);

      let targetPos = new THREE.Vector3(0, 0, 1500);
      let targetLookAt = new THREE.Vector3(0, 0, 0);

      const focusedId = (window as any).__FOCUSED_NODE_ID;

      if (focusedId) {
        const p = positions.get(focusedId)!;
        targetPos.set(p.x, p.y, p.z + 400); 
        targetLookAt.copy(p);
      } else {
        if (p1 <= 1 && p2 === 0) {
          targetPos.set(0, 0, 1500 - p1 * 800);
          targetLookAt.set(0, 0, 0);
        } else if (p2 <= 1 && p3 === 0) {
          const bePos = positions.get('be1') || new THREE.Vector3(-400, 0, 0);
          targetPos.lerpVectors(new THREE.Vector3(0, 0, 700), new THREE.Vector3(bePos.x, bePos.y, bePos.z + 600), p2);
          targetLookAt.lerpVectors(new THREE.Vector3(0, 0, 0), bePos, p2);
        } else if (p3 <= 1) {
          const bePos = positions.get('be1') || new THREE.Vector3(-400, 0, 0);
          const sysPos = positions.get('sys1') || new THREE.Vector3(400, 0, 0);
          targetPos.lerpVectors(new THREE.Vector3(bePos.x, bePos.y, bePos.z + 600), new THREE.Vector3(sysPos.x, sysPos.y, sysPos.z + 600), p3);
          targetLookAt.lerpVectors(bePos, sysPos, p3);
        }
      }

      targetPos.x += smoothMouse.x * 100;
      targetPos.y += smoothMouse.y * 100;

      currentCameraPos.lerp(targetPos, 0.05);
      currentLookAt.lerp(targetLookAt, 0.05);

      camera.position.copy(currentCameraPos);
      camera.lookAt(currentLookAt);

      const graphOpacity = 1 - fadeOutProg;
      const isGraphVisible = graphOpacity > 0.05;

      nodeVisuals.forEach(({ group }, id) => {
        group.children.forEach(c => {
          if ((c as any).material) {
            ((c as any).material as THREE.Material).opacity = graphOpacity * (c.type === 'Mesh' ? 0.6 : 1);
          }
        });
        
        const labelEl = nodeLabels.get(id);
        if (labelEl) {
          if (!isGraphVisible) {
            labelEl.style.display = 'none';
          } else {
            labelEl.style.display = 'flex';
            const vector = new THREE.Vector3();
            group.getWorldPosition(vector);
            vector.project(camera);
            
            if (vector.z < 1 && vector.z > -1) {
              const x = (vector.x * 0.5 + 0.5) * W;
              const y = (vector.y * -0.5 + 0.5) * H;
              
              const distance = camera.position.distanceTo(group.position);
              const scale = Math.max(0.5, Math.min(1.2, 1200 / distance));
              
              labelEl.style.transform = `translate(-50%, -50%) translate3d(${x}px, ${y}px, 0) scale(${scale})`;
              labelEl.style.opacity = (graphOpacity * Math.min(1, scale)).toString();
              labelEl.style.zIndex = Math.floor(2000 - distance).toString();
            } else {
              labelEl.style.display = 'none';
            }
          }
        }
      });
      (edgeLines.material as THREE.Material).opacity = graphOpacity * 0.3;

      bigStructureMat.opacity = fadeOutProg * 0.15;
      coreMat.opacity = fadeOutProg * 0.4;

      bigStructure.rotation.y = t * 0.08;
      bigStructure.rotation.x = t * 0.04;
      corePoints.rotation.y = t * 0.08;
      corePoints.rotation.x = t * 0.04;

      graphGroup.rotation.y = Math.sin(t * 0.05) * 0.05;
      nodeVisuals.forEach(({ ring }, id) => {
        ring.rotation.x += 0.01; ring.rotation.y += 0.015;
        const p = positions.get(id)!;
        ring.parent!.position.y = p.y + Math.sin(t * 2 + p.x) * 10;
      });

      renderer.setClearColor(0x000000, 1);
      renderer.render(scene, camera);
    };

    animate();

    const onResize = () => {
      W = window.innerWidth;
      H = window.innerHeight;
      camera.aspect = W / H;
      camera.updateProjectionMatrix();
      renderer.setSize(W, H);
    };
    window.addEventListener('resize', onResize);

    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener('mousemove', onMove);
      window.removeEventListener('resize', onResize);
      if (mount.contains(renderer.domElement)) mount.removeChild(renderer.domElement);
      renderer.dispose(); scene.clear();
    };
  }, []);

  useEffect(() => {
    (window as any).__FOCUSED_NODE_ID = focusedNode ? focusedNode.id : null;
  }, [focusedNode]);

  return (
    <>
      <div ref={mountRef} style={{ position: 'fixed', inset: 0, zIndex: -1 }} />
      <div ref={labelsRef} style={{ position: 'fixed', inset: 0, zIndex: 0, pointerEvents: 'none', overflow: 'hidden' }} />

      {introStage !== 'done' && (
        <div style={{
          position: 'fixed', inset: 0, zIndex: 100, 
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          backgroundColor: '#000', opacity: introStage === 'fading' ? 0 : 1,
          transition: 'opacity 1s ease-in-out', pointerEvents: 'none'
        }}>
          <h1 style={{
            color: '#bcfb2b', fontFamily: '"JetBrains Mono", monospace',
            fontSize: 'clamp(2rem, 5vw, 4rem)', letterSpacing: '0.1em',
            borderRight: '4px solid #bcfb2b', paddingRight: '8px',
            animation: 'blink 1s step-end infinite', textShadow: '0 0 20px rgba(188,251,43,0.5)'
          }}>
            INITIALIZING SYSTEM...
          </h1>
        </div>
      )}

      {/* Node Detail HUD Panel */}
      <div style={{
        position: 'fixed', top: 0, right: 0, bottom: 0,
        width: '400px', maxWidth: '100vw',
        background: 'rgba(10, 10, 15, 0.9)', backdropFilter: 'blur(20px)',
        borderLeft: '1px solid rgba(255,255,255,0.1)',
        transform: focusedNode ? 'translateX(0)' : 'translateX(100%)',
        transition: 'transform 0.5s cubic-bezier(0.16, 1, 0.3, 1)',
        zIndex: 50, padding: '40px 30px',
        display: 'flex', flexDirection: 'column',
        boxShadow: '-20px 0 50px rgba(0,0,0,0.5)',
        pointerEvents: focusedNode ? 'auto' : 'none'
      }}>
        {focusedNode && (
          <>
            <button 
              onClick={() => setFocusedNode(null)}
              style={{
                alignSelf: 'flex-end', background: 'none', border: 'none', 
                color: '#fff', fontSize: '2rem', cursor: 'pointer', marginBottom: '20px'
              }}
            >×</button>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '20px' }}>
              <span style={{ 
                width: '12px', height: '12px', borderRadius: '50%', 
                backgroundColor: COLORS[focusedNode.group as keyof typeof COLORS],
                boxShadow: `0 0 10px ${COLORS[focusedNode.group as keyof typeof COLORS]}`
              }} />
              <h2 style={{ color: '#fff', fontSize: '2rem', margin: 0, fontWeight: 700, letterSpacing: '-0.02em' }}>{focusedNode.label}</h2>
            </div>
            
            <p style={{ color: '#a1a1aa', fontSize: '1.1rem', lineHeight: 1.6, marginBottom: '30px' }}>
              {focusedNode.details}
            </p>

            <div style={{ borderTop: '1px solid rgba(255,255,255,0.1)', paddingTop: '20px' }}>
              <h4 style={{ color: '#fff', fontSize: '0.85rem', letterSpacing: '0.1em', marginBottom: '15px', opacity: 0.6 }}>PROFICIENCY STATS</h4>
              
              <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
                <div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', color: '#fff', fontSize: '0.9rem', marginBottom: '5px' }}>
                    <span>Experience</span>
                    <span>{Math.floor(Math.random() * 3 + 2)} Years</span>
                  </div>
                  <div style={{ height: '4px', background: 'rgba(255,255,255,0.1)', borderRadius: '2px', overflow: 'hidden' }}>
                    <div style={{ height: '100%', width: `${Math.random() * 40 + 60}%`, backgroundColor: COLORS[focusedNode.group as keyof typeof COLORS] }} />
                  </div>
                </div>

                <div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', color: '#fff', fontSize: '0.9rem', marginBottom: '5px' }}>
                    <span>Complexity Handling</span>
                    <span>High</span>
                  </div>
                  <div style={{ height: '4px', background: 'rgba(255,255,255,0.1)', borderRadius: '2px', overflow: 'hidden' }}>
                    <div style={{ height: '100%', width: `${Math.random() * 20 + 80}%`, backgroundColor: COLORS[focusedNode.group as keyof typeof COLORS] }} />
                  </div>
                </div>
              </div>
            </div>

            <button style={{
              marginTop: 'auto', padding: '16px', background: COLORS[focusedNode.group as keyof typeof COLORS],
              color: '#000', border: 'none', borderRadius: '8px', fontSize: '1rem', fontWeight: 600,
              cursor: 'pointer'
            }}>
              View Related Projects
            </button>
          </>
        )}
      </div>

      <style dangerouslySetInnerHTML={{__html: `
        @keyframes blink { 50% { border-color: transparent; } }
        .graph-node-dot {
          display: inline-block;
          width: 8px; height: 8px;
          border-radius: 50%;
        }
        .graph-node-label:hover .graph-node-dot {
          box-shadow: 0 0 10px currentColor;
        }
      `}} />
    </>
  );
}
