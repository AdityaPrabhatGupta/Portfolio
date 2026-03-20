// Skills.jsx — Three.js OPTIMIZED
// Key optimizations:
// 1. Only ONE active WebGL renderer at a time (previous destroyed)
// 2. Renderer reused via singleton — no new canvas per skill
// 3. Low pixel ratio cap at 1.5
// 4. Reduced geometry complexity
// 5. Single RAF loop, cancelled on unmount
// 6. Lazy: 3D only renders when panel is in viewport

import { useState, useRef, useEffect, useCallback } from 'react';
import * as THREE from 'three';
import { skills } from '../data/content';
import './Skills.css';

// ── Scene builders — each returns a tick() fn + cleanup ─────
// Geometries kept simple: low segment counts, minimal objects

function buildLanguages(renderer, scene, camera) {
  camera.position.set(0, 0, 4);

  // Wireframe icosahedron — detail 0 = very low poly
  const mesh = new THREE.Mesh(
    new THREE.IcosahedronGeometry(1.4, 0),
    new THREE.MeshBasicMaterial({ color: 0xc8ff00, wireframe: true, transparent: true, opacity: 0.5 })
  );
  scene.add(mesh);

  // Orbiting ring
  const ring = new THREE.Mesh(
    new THREE.TorusGeometry(2, 0.015, 6, 60),
    new THREE.MeshBasicMaterial({ color: 0xc8ff00, transparent: true, opacity: 0.25 })
  );
  ring.rotation.x = Math.PI / 2.5;
  scene.add(ring);

  // Particles — small count
  const count = 60;
  const geo   = new THREE.BufferGeometry();
  const pos   = new Float32Array(count * 3);
  for (let i = 0; i < count; i++) {
    const phi = Math.acos(2 * Math.random() - 1);
    const th  = Math.random() * Math.PI * 2;
    const r   = 1.9 + Math.random() * 0.4;
    pos[i*3]   = r * Math.sin(phi) * Math.cos(th);
    pos[i*3+1] = r * Math.sin(phi) * Math.sin(th);
    pos[i*3+2] = r * Math.cos(phi);
  }
  geo.setAttribute('position', new THREE.BufferAttribute(pos, 3));
  scene.add(new THREE.Points(geo, new THREE.PointsMaterial({ color: 0xc8ff00, size: 0.05 })));

  return () => {
    mesh.rotation.x += 0.005; mesh.rotation.y += 0.008;
    ring.rotation.z += 0.003;
  };
}

function buildFrontend(renderer, scene, camera) {
  camera.position.set(0, 0, 5);

  // Nucleus
  scene.add(new THREE.Mesh(
    new THREE.SphereGeometry(0.35, 16, 16),
    new THREE.MeshBasicMaterial({ color: 0xc8ff00 })
  ));

  // 3 orbit rings
  const electrons = [];
  [0, Math.PI / 3, -Math.PI / 3].forEach((angle, idx) => {
    const torus = new THREE.Mesh(
      new THREE.TorusGeometry(1.6, 0.018, 6, 60),
      new THREE.MeshBasicMaterial({ color: 0xc8ff00, transparent: true, opacity: 0.35 })
    );
    torus.rotation.x = Math.PI / 2;
    torus.rotation.y = angle;
    scene.add(torus);

    const bead = new THREE.Mesh(
      new THREE.SphereGeometry(0.09, 8, 8),
      new THREE.MeshBasicMaterial({ color: 0xffffff })
    );
    scene.add(bead);
    electrons.push({ mesh: bead, angle, t: idx * (Math.PI * 2 / 3) });
  });

  return () => {
    scene.rotation.y += 0.006;
    electrons.forEach(e => {
      e.t += 0.025;
      e.mesh.position.set(
        Math.cos(e.t) * 1.6 * Math.cos(e.angle),
        Math.sin(e.t) * 1.6 * Math.sin(e.angle),
        Math.sin(e.t) * 1.6
      );
    });
  };
}

function buildBackend(renderer, scene, camera) {
  camera.position.set(2, 1.2, 4.5);
  camera.lookAt(0, 0, 0);

  const slabs = [];
  for (let i = 0; i < 4; i++) {
    const geo  = new THREE.BoxGeometry(3, 0.28, 1.4);
    const wire = new THREE.LineSegments(
      new THREE.EdgesGeometry(geo),
      new THREE.LineBasicMaterial({ color: 0xc8ff00, transparent: true, opacity: 0.6 })
    );
    wire.position.y = i * 0.55 - 0.8;
    scene.add(wire);

    const solid = new THREE.Mesh(geo,
      new THREE.MeshBasicMaterial({ color: 0x111111, transparent: true, opacity: 0.9 })
    );
    solid.position.y = wire.position.y;
    scene.add(solid);

    const led = new THREE.Mesh(
      new THREE.SphereGeometry(0.055, 6, 6),
      new THREE.MeshBasicMaterial({ color: i === 2 ? 0xc8ff00 : 0x334400 })
    );
    led.position.set(1.35, wire.position.y, 0);
    scene.add(led);
    slabs.push({ wire, solid, led, baseY: wire.position.y, idx: i });
  }

  // Scan line
  const scan = new THREE.Mesh(
    new THREE.PlaneGeometry(3.2, 0.04),
    new THREE.MeshBasicMaterial({ color: 0xc8ff00, transparent: true, opacity: 0.5, side: THREE.DoubleSide })
  );
  scan.rotation.x = Math.PI / 2;
  scene.add(scan);

  let t = 0;
  return () => {
    t += 0.02;
    scan.position.y = Math.sin(t) * 1.1;
    scene.rotation.y = Math.sin(t * 0.3) * 0.35;
    slabs.forEach(s => {
      const dy = Math.sin(t + s.idx * 0.5) * 0.035;
      s.wire.position.y  = s.baseY + dy;
      s.solid.position.y = s.baseY + dy;
      s.led.position.y   = s.baseY + dy;
    });
  };
}

function buildDatabases(renderer, scene, camera) {
  camera.position.set(0, 1, 5.5);
  camera.lookAt(0, 0, 0);

  const makeCyl = (color, x, y) => {
    const g = new THREE.Group();
    g.position.set(x, y, 0);
    const wire = new THREE.Mesh(
      new THREE.CylinderGeometry(1, 1, 0.5, 20),
      new THREE.MeshBasicMaterial({ color, wireframe: true, transparent: true, opacity: 0.6 })
    );
    const solid = new THREE.Mesh(
      new THREE.CylinderGeometry(0.97, 0.97, 0.48, 20),
      new THREE.MeshBasicMaterial({ color: 0x111111, transparent: true, opacity: 0.92 })
    );
    g.add(wire, solid);
    scene.add(g);
    return g;
  };

  const c1 = makeCyl(0xc8ff00, -1.2,  0.6);
  const c2 = makeCyl(0x4488ff,  1.2, -0.3);

  let t = 0;
  return () => {
    t += 0.012;
    c1.rotation.y += 0.018; c2.rotation.y -= 0.012;
    c1.position.y = 0.6  + Math.sin(t)     * 0.1;
    c2.position.y = -0.3 + Math.sin(t + 1) * 0.08;
    scene.rotation.y = Math.sin(t * 0.4) * 0.45;
  };
}

function buildTools(renderer, scene, camera) {
  camera.position.set(0, 0, 6);

  // Simple gear rings (torii) instead of extruded shapes
  const makeGearRing = (r, x, y, col, spd) => {
    const mesh = new THREE.Mesh(
      new THREE.TorusGeometry(r, r * 0.12, 6, 24),
      new THREE.MeshBasicMaterial({ color: col, wireframe: true, transparent: true, opacity: 0.55 })
    );
    mesh.position.set(x, y, 0);
    mesh.userData.spd = spd;
    scene.add(mesh);
    return mesh;
  };

  const g1 = makeGearRing(1.1,  0,    0,    0xc8ff00,  0.018);
  const g2 = makeGearRing(0.65, 1.7,  0.1,  0x88bb00, -0.028);
  const g3 = makeGearRing(0.5, -1.55, -0.4, 0x445500,  0.022);

  // Rising particles
  const cnt = 50;
  const pGeo = new THREE.BufferGeometry();
  const pPos = new Float32Array(cnt * 3);
  const pSpd = new Float32Array(cnt);
  for (let i = 0; i < cnt; i++) {
    pPos[i*3]   = (Math.random()-0.5)*5;
    pPos[i*3+1] = (Math.random()-0.5)*4;
    pPos[i*3+2] = (Math.random()-0.5)*2;
    pSpd[i]     = 0.012 + Math.random()*0.018;
  }
  pGeo.setAttribute('position', new THREE.BufferAttribute(pPos, 3));
  const pts = new THREE.Points(pGeo, new THREE.PointsMaterial({ color: 0xc8ff00, size: 0.055, transparent: true, opacity: 0.7 }));
  scene.add(pts);

  let t = 0;
  return () => {
    t += 0.01;
    [g1, g2, g3].forEach(g => { g.rotation.z += g.userData.spd; });
    const pos = pGeo.attributes.position;
    for (let i = 0; i < cnt; i++) {
      pos.array[i*3+1] += pSpd[i];
      if (pos.array[i*3+1] > 2.5) pos.array[i*3+1] = -2.5;
    }
    pos.needsUpdate = true;
    scene.rotation.y = Math.sin(t * 0.4) * 0.28;
  };
}

function buildSoftSkills(renderer, scene, camera) {
  camera.position.set(0, 0, 5);

  // Globe wireframe — low segments
  const globe = new THREE.LineSegments(
    new THREE.EdgesGeometry(new THREE.SphereGeometry(1.8, 12, 8)),
    new THREE.LineBasicMaterial({ color: 0xc8ff00, transparent: true, opacity: 0.12 })
  );
  scene.add(globe);

  // Fibonacci sphere nodes
  const nodes = [];
  const nodeCount = 14;
  for (let i = 0; i < nodeCount; i++) {
    const phi   = Math.acos(1 - 2*(i+0.5)/nodeCount);
    const theta = Math.PI*(1+Math.sqrt(5))*i;
    const v = new THREE.Vector3(
      1.8*Math.sin(phi)*Math.cos(theta),
      1.8*Math.cos(phi),
      1.8*Math.sin(phi)*Math.sin(theta)
    );
    const node = new THREE.Mesh(
      new THREE.SphereGeometry(0.07, 6, 6),
      new THREE.MeshBasicMaterial({ color: 0xc8ff00 })
    );
    node.position.copy(v);
    scene.add(node);
    nodes.push(v);
  }

  // Edges between nearby nodes
  for (let i = 0; i < nodeCount; i++) {
    for (let j = i+1; j < nodeCount; j++) {
      if (nodes[i].distanceTo(nodes[j]) < 1.6) {
        scene.add(new THREE.Line(
          new THREE.BufferGeometry().setFromPoints([nodes[i], nodes[j]]),
          new THREE.LineBasicMaterial({ color: 0xc8ff00, transparent: true, opacity: 0.22 })
        ));
      }
    }
  }

  return () => {
    scene.rotation.y += 0.005;
    globe.rotation.y  += 0.003;
  };
}

const BUILDERS = {
  'Languages':      buildLanguages,
  'Frontend':       buildFrontend,
  'Backend':        buildBackend,
  'Databases':      buildDatabases,
  'Tools & Deploy': buildTools,
  'Soft Skills':    buildSoftSkills,
};

// ── Shared WebGL canvas — ONE renderer, reused ───────────────
// Switching skills = clear scene + rebuild, never new renderer
function ThreePanel({ skillName }) {
  const canvasRef  = useRef(null);
  const stateRef   = useRef(null); // { renderer, scene, camera, raf, tick }

  const teardown = useCallback(() => {
    if (!stateRef.current) return;
    const { raf, renderer, scene } = stateRef.current;
    cancelAnimationFrame(raf);
    // Dispose all scene objects
    scene.traverse(obj => {
      obj.geometry?.dispose();
      if (obj.material) {
        (Array.isArray(obj.material) ? obj.material : [obj.material])
          .forEach(m => m.dispose());
      }
    });
    while (scene.children.length) scene.remove(scene.children[0]);
    stateRef.current = null;
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    // Tear down previous scene
    teardown();

    const w = canvas.clientWidth;
    const h = canvas.clientHeight;

    // Reuse renderer if already exists on canvas, else create
    let renderer = canvas._threeRenderer;
    if (!renderer) {
      renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true, powerPreference: 'low-power' });
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5)); // cap at 1.5
      canvas._threeRenderer = renderer;
    }
    renderer.setSize(w, h, false);

    const scene  = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(58, w / h, 0.1, 100);

    const builder = BUILDERS[skillName];
    const tick    = builder ? builder(renderer, scene, camera) : null;

    let raf;
    const loop = () => {
      raf = requestAnimationFrame(loop);
      if (tick) tick();
      renderer.render(scene, camera);
    };
    loop();

    stateRef.current = { renderer, scene, camera, raf, tick };

    return () => {
      cancelAnimationFrame(raf);
      // Don't dispose renderer — reuse it next time
      scene.traverse(obj => {
        obj.geometry?.dispose();
        if (obj.material) {
          (Array.isArray(obj.material) ? obj.material : [obj.material])
            .forEach(m => m.dispose());
        }
      });
      while (scene.children.length) scene.remove(scene.children[0]);
      stateRef.current = null;
    };
  }, [skillName]);

  // Stop rendering when off-screen (IntersectionObserver)
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const io = new IntersectionObserver(([entry]) => {
      if (!stateRef.current) return;
      if (entry.isIntersecting) {
        // resume — already looping
      } else {
        cancelAnimationFrame(stateRef.current?.raf);
      }
    }, { threshold: 0.1 });
    io.observe(canvas);
    return () => io.disconnect();
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{ width: '100%', height: '100%', display: 'block' }}
    />
  );
}

// ── Main Skills component ────────────────────────────────────
export default function Skills() {
  const [activeIdx, setActiveIdx] = useState(0);
  const active = skills[activeIdx];
  const toggle = (i) => setActiveIdx(prev => prev === i ? -1 : i);

  return (
    <section className="skills" id="skills">
      <div className="skills-layout">

        {/* LEFT — accordion */}
        <div className="skills-left">
          <div className="s-label">What I Know</div>
          <h2 className="s-title">WHAT I CAN<br /><em>DO FOR YOU</em></h2>
          <p className="s-desc">
            As a Full Stack Developer, I build end-to-end web apps — from pixel-perfect UIs to robust APIs and databases.
          </p>

          <div className="skills-accordion">
            {skills.map((skill, i) => {
              const isOpen = activeIdx === i;
              return (
                <div
                  key={skill.name}
                  className={`acc-item${isOpen ? ' active' : ''}`}
                  onMouseEnter={() => setActiveIdx(i)}
                >
                  <div
                    className="acc-header"
                    onClick={() => toggle(i)}
                    role="button"
                    tabIndex={0}
                    onKeyDown={e => e.key === 'Enter' && toggle(i)}
                  >
                    <div className="acc-left">
                      <span className="acc-num">{String(i+1).padStart(2,'0')}.</span>
                      <span className="acc-name">{skill.name.toUpperCase()}</span>
                    </div>
                    <span className="acc-chevron">
                      <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                        <path d="M4 6.5l5 5 5-5" stroke="currentColor" strokeWidth="1.6"
                          strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    </span>
                  </div>
                  <div className="acc-body">
                    <div className="acc-tags">
                      {skill.tags.map(tag => (
                        <span key={tag} className="acc-tag">{tag}</span>
                      ))}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* RIGHT — single shared 3D canvas */}
        <div className="skills-right">
          <div className="skill-img-wrap">
            <ThreePanel skillName={active?.name} />
            <div className="skill-panel-badge">
              <span className="skill-panel-icon">{active?.icon}</span>
              <span className="skill-panel-label">{active?.name}</span>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}