import React, { useEffect, useRef } from 'react';

const HUBS = {
  simulate: "Simulate",
  build: "Build",
  cross: "Cross",
  lead: "Lead",
  deep: "Deep"
};

const NODES = [
  ["fea", "Structural FEA", "simulate", "Ansys models, including a 722-body auxetic tube assembly.", "done", ""],
  ["cfd", "CFD", "simulate", "OpenFOAM comparison of Bell and Aerospike nozzles.", "wip", ""],
  ["thermal", "Thermal-structural", "simulate", "CTE mismatch in a copper bracket bonded to a sapphire/silicon chip, cooled from 300 K to 4 K.", "done", ""],
  ["meta", "Metamaterials", "simulate", "Auxetic geometries, from simulation to printed samples.", "done", ""],

  ["embedded", "Embedded", "build", "ESP32 hardware and firmware projects.", "done", ""],
  ["mech", "Mechanism design", "build", "Linkages and leg mechanisms, including the PDAS foot.", "done", ""],
  ["print", "Multi-material printing", "build", "PLA/TPU auxetic lattices on a Bambu H2D.", "done", ""],
  ["robo", "Robotics and automation", "build", "Granted patent, filed as a second-year undergraduate through GUJCOST Robofest.", "done", ""],

  ["energy", "Energy", "cross", "Industry internship at Adani Group Energy Business Division (BTG).", "done", ""],
  ["defence", "Defence", "cross", "iDEX DISC proposal: amphibious hexapod UGV.", "wip", ""],
  ["cryo", "Cryogenics", "cross", "Low-temperature structures for chip-level hardware.", "done", ""],
  ["aero", "Aerospace propulsion", "cross", "Nozzle flow physics, Bell versus Aerospike.", "wip", ""],

  ["club", "DRISHTI Club", "lead", "Secretary of the engineering innovation club at SVNIT, handed over to a new core team.", "done", ""],
  ["ip", "Patent strategy", "lead", "Plan to file as many patents as possible during college.", "wip", ""],
  ["place", "Deep-tech outreach", "lead", "Off-campus positioning for deep-tech internships and placements.", "wip", ""],

  ["res", "Research internships", "deep", "Two SVNIT research internships, results in preparation for publication.", "wip", ""],
  ["paper", "Journal paper", "deep", "Nozzle CFD study written up for publication.", "wip", ""],
  ["thesis", "Final-year project", "deep", "Final-year project at SVNIT.", "wip", ""]
];

const LINKS = [
  ["fea", "meta", "Auxetic geometry analysed in Ansys."],
  ["meta", "print", "Simulated auxetic lattices printed in PLA/TPU."],
  ["fea", "thermal", "Same Ansys workflow, structural and thermal loads."],
  ["thermal", "cryo", "Bonded chip assembly cooled from 300 K to 4 K."],
  ["thermal", "energy", "Thermal stress thinking carried between BTG cycles and the cryostat work."],
  ["cfd", "aero", "Nozzle flow study, Bell versus Aerospike."],
  ["cfd", "paper", "The nozzle CFD results feed the journal paper."],
  ["mech", "defence", "PDAS foot mechanism for the hexapod UGV proposal."],
  ["mech", "robo", "Mechanism design applied to robotics."],
  ["embedded", "robo", "Embedded control for robotic hardware."],
  ["robo", "ip", "The granted patent started the patent strategy."],
  ["res", "paper", "Research results heading toward publication."]
];

const ROOT = { label: "Maahim", note: "Simulate. Build. Cross. Lead. Deep." };

export default function DomainMindMap() {
  const containerRef = useRef(null);
  const stageRef = useRef(null);
  const svgRef = useRef(null);
  const panelRef = useRef(null);
  const tooltipRef = useRef(null);

  useEffect(() => {
    const svg = svgRef.current;
    const stage = stageRef.current;
    const panel = panelRef.current;
    const container = containerRef.current;
    const tooltip = tooltipRef.current;
    if (!svg || !stage || !panel || !container) return;

    // Clear previous children for clean mount
    while (svg.firstChild) {
      svg.removeChild(svg.firstChild);
    }
    panel.textContent = "";

    const NS = "http://www.w3.org/2000/svg";
    // Compact, balanced dimensions so entire map + description fits within one viewport
    const W = 1000;
    const H = 480;
    const cx = W / 2;
    const cy = H / 2;
    const hubIds = Object.keys(HUBS);

    const el = (t, a, p) => {
      const e = document.createElementNS(NS, t);
      for (const k in a) e.setAttribute(k, a[k]);
      (p || svg).appendChild(e);
      return e;
    };

    let selected = null;
    let drag = null;
    let byId = {};
    let gLinks = [];
    let raf = null;
    let weights = {};
    let disp = { x: 0, y: 0 };

    /* ---- nodes at calibrated home positions ---- */
    const all = [{ id: "root", type: "root", label: ROOT.label, note: ROOT.note, hx: cx, hy: cy, r: 40 }];

    hubIds.forEach((h, i) => {
      const a = -Math.PI / 2 + (i * 2 * Math.PI) / hubIds.length;
      all.push({
        id: h,
        type: "hub",
        hub: h,
        label: HUBS[h],
        hx: cx + Math.cos(a) * 165,
        hy: cy + Math.sin(a) * 105,
        r: 33,
        a,
        note: "The habit behind these domains. Select a domain to see how it links across."
      });
    });

    hubIds.forEach((h) => {
      const hub = all.find((n) => n.id === h);
      const kids = NODES.filter((n) => n[2] === h);
      const k = kids.length;
      const step = Math.min((2 * Math.PI) / hubIds.length / k * 0.92, 0.28);
      kids.forEach((d, i) => {
        const a = hub.a + (i - (k - 1) / 2) * step;
        all.push({
          id: d[0],
          type: "dom",
          hub: h,
          label: d[1],
          note: d[3],
          status: d[4],
          url: d[5],
          hx: cx + Math.cos(a) * (W / 2 - 145),
          hy: cy + Math.sin(a) * (H / 2 - 50),
          r: 8
        });
      });
    });

    all.forEach((n) => {
      n.x = n.hx;
      n.y = n.hy;
      n.h0x = n.hx;
      n.h0y = n.hy;
      n.vx = n.vy = 0;
      byId[n.id] = n;
    });

    const links = [];
    hubIds.forEach((h) => links.push({ s: "root", t: h, k: "s" }));
    NODES.forEach((d) => links.push({ s: d[2], t: d[0], k: "s" }));
    LINKS.forEach((l) => links.push({ s: l[0], t: l[1], k: "x", why: l[2] }));

    links.forEach((l) =>
      gLinks.push({ ...l, e: el("path", { class: "mm-l" + (l.k === "x" ? " mm-x" : "") }) })
    );

    all.forEach((n) => {
      const g = el("g", { class: "mm-n " + n.type, tabindex: "0", role: "button", "aria-label": n.label });
      el("circle", { r: n.r + 8, fill: "transparent" }, g);
      const c = el("circle", { r: n.r }, g);
      if (n.type === "root") c.setAttribute("fill", "var(--mm-red)");
      else if (n.type === "hub") c.setAttribute("fill", "var(--mm-ink)");
      else if (n.status === "wip") {
        c.setAttribute("fill", "var(--mm-card)");
        c.setAttribute("stroke", "var(--mm-ink)");
        c.setAttribute("stroke-width", "2");
      } else {
        c.setAttribute("fill", "var(--mm-ink)");
      }
      el("circle", { class: "mm-ring", r: n.r + 5 }, g);
      const t = el("text", {}, g);
      if (n.type !== "dom") {
        t.setAttribute("text-anchor", "middle");
        t.setAttribute("dy", "0.35em");
        t.textContent = n.label.toUpperCase();
      } else {
        const dx = n.hx - cx;
        const side = Math.abs(dx) > W * 0.12 ? (dx > 0 ? 1 : -1) : 0;
        const lh = 13;
        const lines = [];
        let cur = "";
        n.label.split(" ").forEach((w) => {
          if ((cur + " " + w).trim().length > 15 && cur) {
            lines.push(cur);
            cur = w;
          } else {
            cur = (cur + " " + w).trim();
          }
        });
        lines.push(cur);
        t.setAttribute("text-anchor", side === 0 ? "middle" : side > 0 ? "start" : "end");
        const x0 = side * (n.r + 8);
        const y0 =
          side === 0
            ? n.hy < cy
              ? -(n.r + 8 + (lines.length - 1) * lh)
              : n.r + 16
            : -((lines.length - 1) * lh) / 2 + 4;
        lines.forEach((ln, i) => {
          el("tspan", { x: x0, y: y0 + i * lh }, t).textContent = ln;
        });
      }
      n.g = g;

      g.addEventListener("pointerenter", () => {
        if (!drag && !selected) show(n.id);
      });
      g.addEventListener("pointerleave", () => {
        if (!drag && !selected) show(null);
      });
      g.addEventListener("focus", () => {
        if (!drag) show(selected || n.id);
      });
      g.addEventListener("keydown", (e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          select(selected === n.id ? null : n.id);
        }
      });
      g.addEventListener("pointerdown", (e) => {
        if (e.button !== 0 || drag) return;
        e.stopPropagation();
        e.preventDefault();
        const p = pt(e);
        drag = { n, id: e.pointerId, sx: e.clientX, sy: e.clientY, ox: p.x - n.x, oy: p.y - n.y, moved: false };
      });
    });

    const handleSvgPointerDown = () => {
      if (!drag) select(null);
    };
    svg.addEventListener("pointerdown", handleSvgPointerDown);

    function pt(e) {
      const p = svg.createSVGPoint();
      p.x = e.clientX;
      p.y = e.clientY;
      return p.matrixTransform(svg.getScreenCTM().inverse());
    }

    function moveDrag(e) {
      if (!drag || e.pointerId !== drag.id) return;
      if (e.buttons === 0) {
        endDrag();
        return;
      }
      const n = drag.n;
      if (!drag.moved) {
        if (Math.hypot(e.clientX - drag.sx, e.clientY - drag.sy) < 5) return;
        drag.moved = true;
        n.g.classList.add("grabbing");
        startWeights(n);
        show(n.id);
      }
      const p = pt(e);
      drag.tx = Math.max(25, Math.min(W - 25, p.x - drag.ox));
      drag.ty = Math.max(25, Math.min(H - 25, p.y - drag.oy));
      disp.x = drag.tx - n.hx;
      disp.y = drag.ty - n.hy;
      kick();
    }

    function endDrag(e) {
      if (!drag || (e && e.pointerId !== undefined && e.pointerId !== drag.id)) return;
      const { n, moved } = drag;
      drag = null;
      disp = { x: 0, y: 0 };
      n.g.classList.remove("grabbing");
      if (moved) {
        n.hx = n.x;
        n.hy = n.y;
        show(selected);
      } else {
        select(selected === n.id ? null : n.id);
      }
      kick();
    }

    window.addEventListener("pointermove", moveDrag);
    window.addEventListener("pointerup", endDrag);
    window.addEventListener("pointercancel", endDrag);

    const handleBlur = () => endDrag();
    const handleVis = () => endDrag();
    window.addEventListener("blur", handleBlur);
    document.addEventListener("visibilitychange", handleVis);

    const resetBtn = container.querySelector(".mm-reset");
    const handleReset = () => {
      all.forEach((n) => {
        n.hx = n.h0x;
        n.hy = n.h0y;
      });
      kick();
    };
    if (resetBtn) resetBtn.addEventListener("click", handleReset);

    /* ---- elastic follow ---- */
    function startWeights(n) {
      weights = {};
      const adj = new Set();
      links.forEach((l) => {
        if (l.s === n.id) adj.add(l.t);
        if (l.t === n.id) adj.add(l.s);
      });
      all.forEach((m) => {
        if (m === n) return;
        let w = 0.06;
        if (n.type === "root") w = 0.35;
        else if (adj.has(m.id)) w = n.type === "hub" ? 0.7 : 0.5;
        else if (m.hub === n.hub || m.id === n.hub) w = 0.2;
        weights[m.id] = w;
      });
    }

    function tick() {
      let moving = false;
      all.forEach((n) => {
        if (drag && drag.moved && drag.n === n) {
          n.x = drag.tx;
          n.y = drag.ty;
          n.vx = n.vy = 0;
          moving = true;
          return;
        }
        const w = drag && drag.moved ? weights[n.id] || 0 : 0;
        const tx = n.hx + disp.x * w;
        const ty = n.hy + disp.y * w;
        n.vx = (n.vx + (tx - n.x) * 0.12) * 0.74;
        n.vy = (n.vy + (ty - n.y) * 0.12) * 0.74;
        n.x += n.vx;
        n.y += n.vy;
        if (Math.abs(n.vx) > 0.03 || Math.abs(n.vy) > 0.03 || Math.abs(tx - n.x) > 0.25 || Math.abs(ty - n.y) > 0.25) {
          moving = true;
        } else {
          n.x = tx;
          n.y = ty;
        }
      });
      render();
      raf = moving ? requestAnimationFrame(tick) : null;
    }

    function kick() {
      if (!raf) raf = requestAnimationFrame(tick);
    }

    function render() {
      all.forEach((n) => n.g.setAttribute("transform", "translate(" + n.x.toFixed(1) + "," + n.y.toFixed(1) + ")"));
      gLinks.forEach((l) => {
        const a = byId[l.s];
        const b = byId[l.t];
        if (l.k === "s") {
          l.e.setAttribute("d", "M" + a.x + "," + a.y + "L" + b.x + "," + b.y);
        } else {
          const mx = (a.x + b.x) / 2;
          const my = (a.y + b.y) / 2;
          l.e.setAttribute(
            "d",
            "M" + a.x + "," + a.y + "Q" + (mx + (cx - mx) * 0.35) + "," + (my + (cy - my) * 0.35) + " " + b.x + "," + b.y
          );
        }
      });
    }

    /* ---- highlight, panel & direct hover tooltip ---- */
    function mk(tag, cls, txt) {
      const e = document.createElement(tag);
      if (cls) e.className = cls;
      if (txt !== undefined) e.textContent = txt;
      return e;
    }

    function show(id) {
      const n = id && byId[id];
      panel.textContent = "";

      // Tooltip handling: gives immediate feedback directly on the hovered node
      if (tooltip) {
        if (n && !drag) {
          tooltip.innerHTML = `
            <div class="mm-tt-title">${n.label}</div>
            ${n.type === "dom" ? `<div class="mm-tt-tag">${HUBS[n.hub]} • ${n.status === "wip" ? "In Progress" : "Delivered"}</div>` : ""}
            <div class="mm-tt-desc">${n.note}</div>
          `;
          const stageRect = stage.getBoundingClientRect();
          const ctm = svg.getScreenCTM();
          if (ctm) {
            const pt = svg.createSVGPoint();
            pt.x = n.x;
            pt.y = n.y;
            const screenPt = pt.matrixTransform(ctm);
            const left = screenPt.x - stageRect.left;
            const top = screenPt.y - stageRect.top;

            if (top < 100) {
              tooltip.style.transform = "translate(-50%, 18px)";
            } else {
              tooltip.style.transform = "translate(-50%, -100%) translateY(-14px)";
            }
            tooltip.style.left = `${Math.max(130, Math.min(stageRect.width - 130, left))}px`;
            tooltip.style.top = `${top}px`;
            tooltip.classList.add("visible");
          }
        } else {
          tooltip.classList.remove("visible");
        }
      }

      if (!n) {
        all.forEach((m) => m.g.classList.remove("mm-dim", "sel"));
        gLinks.forEach((l) => l.e.classList.remove("mm-dim"));
        panel.appendChild(mk("div", "mm-title", "Select or Hover Over a Domain"));
        panel.appendChild(mk("p", "mm-note", "Hover over any node to view instantaneous details, click to pin its interlinks, or drag to explore network physics."));
        return;
      }

      const nb = new Set([n.id]);
      gLinks.forEach((l) => {
        if (l.s === n.id) nb.add(l.t);
        if (l.t === n.id) nb.add(l.s);
      });
      if (n.type === "hub") {
        NODES.forEach((d) => {
          if (d[2] === n.id) nb.add(d[0]);
        });
      }
      if (n.type === "root") {
        hubIds.forEach((h) => nb.add(h));
      }
      all.forEach((m) => {
        m.g.classList.toggle("mm-dim", !nb.has(m.id));
        m.g.classList.toggle("sel", m.id === selected && m.id === n.id);
      });
      gLinks.forEach((l) => {
        const on =
          l.s === n.id ||
          l.t === n.id ||
          (n.type === "hub" && nb.has(l.s) && nb.has(l.t) && l.k === "s");
        l.e.classList.toggle("mm-dim", !on);
      });

      panel.appendChild(mk("div", "mm-title", n.label));
      if (n.type === "dom") {
        panel.appendChild(
          mk("div", "mm-tag", HUBS[n.hub] + " / " + (n.status === "wip" ? "In progress or proposed" : "Delivered"))
        );
      }
      panel.appendChild(mk("p", "mm-note", n.note));
      if (n.type === "dom") {
        const rel = gLinks.filter((l) => l.k === "x" && (l.s === n.id || l.t === n.id));
        if (rel.length) {
          const ul = mk("ul", "mm-rel");
          rel.forEach((l) => {
            const o = byId[l.s === n.id ? l.t : l.s];
            const li = mk("li");
            li.appendChild(mk("b", "", o.label));
            li.appendChild(document.createTextNode("  " + l.why));
            ul.appendChild(li);
          });
          panel.appendChild(ul);
        }
        if (n.url) {
          const a = mk("a", "mm-open", "View project");
          a.href = n.url;
          a.target = "_blank";
          a.rel = "noopener";
          panel.appendChild(a);
        }
      }
    }

    function select(id) {
      selected = id;
      show(id);
    }

    render();
    show(null);

    return () => {
      if (raf) cancelAnimationFrame(raf);
      svg.removeEventListener("pointerdown", handleSvgPointerDown);
      window.removeEventListener("pointermove", moveDrag);
      window.removeEventListener("pointerup", endDrag);
      window.removeEventListener("pointercancel", endDrag);
      window.removeEventListener("blur", handleBlur);
      document.removeEventListener("visibilitychange", handleVis);
      if (resetBtn) resetBtn.removeEventListener("click", handleReset);
    };
  }, []);

  return (
    <section id="mindmap" ref={containerRef} className="w-full relative z-10 py-10 md:py-14" aria-label="How my work connects">
      <style>{`
        #mindmap {
          --mm-bg: #FAF8F2;
          --mm-card: #FFFFFF;
          --mm-ink: #18181B;
          --mm-red: #D40028;
          --mm-mute: #635F5A;
          --mm-line: rgba(24, 24, 27, 0.15);
          --mm-display: "Space Grotesk", sans-serif;
          --mm-mono: "Space Mono", "Fira Code", monospace;
          --mm-body: "Plus Jakarta Sans", "Inter", sans-serif;
          color: var(--mm-ink);
        }
        #mindmap * { box-sizing: border-box; }
        #mindmap .mm-head { max-width: 1040px; margin: 0 auto 16px; padding: 0 20px; }
        #mindmap h2 {
          font-family: var(--mm-display);
          font-weight: 700;
          font-size: clamp(26px, 3.5vw, 38px);
          letter-spacing: -0.02em;
          margin: 0 0 8px;
          text-transform: uppercase;
          line-height: 1.1;
        }
        #mindmap h2 em { font-style: normal; color: var(--mm-red); }
        #mindmap .mm-sub {
          font-family: var(--mm-body);
          font-size: 14px;
          line-height: 1.55;
          color: var(--mm-mute);
          margin: 0 0 12px;
          max-width: 760px;
        }
        #mindmap .mm-bar {
          display: flex;
          gap: 16px;
          align-items: center;
          flex-wrap: wrap;
          font-family: var(--mm-mono);
          font-size: 10px;
          letter-spacing: 0.06em;
          text-transform: uppercase;
          color: var(--mm-mute);
        }
        #mindmap .mm-key { display: inline-flex; align-items: center; gap: 6px; }
        #mindmap .mm-dot { width: 9px; height: 9px; border-radius: 50%; background: var(--mm-ink); display: inline-block; }
        #mindmap .mm-dot.o { background: var(--mm-bg); border: 2px solid var(--mm-ink); }
        #mindmap .mm-dash { width: 20px; border-top: 2px dashed var(--mm-red); display: inline-block; }
        #mindmap button.mm-reset {
          font: inherit;
          letter-spacing: 0.06em;
          text-transform: uppercase;
          color: var(--mm-ink);
          background: #FFFFFF;
          border: 1px solid var(--mm-line);
          border-radius: 6px;
          padding: 5px 12px;
          cursor: pointer;
          font-weight: 600;
          font-size: 10px;
          box-shadow: 0 1px 2px rgba(24, 24, 27, 0.05);
          transition: all 0.2s ease;
        }
        #mindmap button.mm-reset:hover {
          border-color: var(--mm-red);
          color: var(--mm-red);
          box-shadow: 0 3px 8px rgba(212, 0, 40, 0.12);
        }
        #mindmap .mm-scroll { max-width: 1040px; margin: 0 auto; padding: 0 20px; overflow-x: auto; }
        #mindmap .mm-stage {
          position: relative;
          min-width: 820px;
          border: 1px solid var(--mm-line);
          border-radius: 14px;
          background: #FFFFFF;
          box-shadow: 0 6px 24px -6px rgba(24, 24, 27, 0.07);
          overflow: hidden;
        }
        #mindmap svg { display: block; width: 100%; height: auto; user-select: none; -webkit-user-select: none; }
        #mindmap .mm-l { fill: none; stroke: var(--mm-ink); stroke-width: 1.2; opacity: 0.22; transition: opacity 0.15s; }
        #mindmap .mm-x { stroke: var(--mm-red); stroke-dasharray: 4 4; stroke-width: 1.4; opacity: 0.65; }
        #mindmap .mm-n { cursor: grab; outline: none; transition: opacity 0.15s; }
        #mindmap .mm-n.grabbing { cursor: grabbing; }
        #mindmap .mm-n text {
          pointer-events: none;
          fill: var(--mm-ink);
          paint-order: stroke;
          stroke: #FFFFFF;
          stroke-width: 3.5px;
          stroke-linejoin: round;
          font-family: var(--mm-mono);
          font-size: 10.5px;
          letter-spacing: 0.03em;
          text-transform: uppercase;
        }
        #mindmap .mm-n.hub text {
          font-family: var(--mm-display);
          font-weight: 700;
          font-size: 10.5px;
          letter-spacing: 0.06em;
          fill: var(--mm-bg);
          stroke: none;
        }
        #mindmap .mm-n.root text {
          font-family: var(--mm-display);
          font-weight: 700;
          font-size: 13px;
          letter-spacing: 0.06em;
          fill: #FFFFFF;
          stroke: none;
        }
        #mindmap .mm-ring { fill: none; stroke: var(--mm-red); stroke-width: 2.2; opacity: 0; transition: opacity 0.15s; }
        #mindmap .mm-n:focus-visible .mm-ring, #mindmap .mm-n.sel .mm-ring { opacity: 1; }
        #mindmap .mm-dim { opacity: 0.12; }
        #mindmap .mm-panel {
          border-top: 1px solid var(--mm-line);
          padding: 14px 20px 16px;
          min-height: 110px;
          font-family: var(--mm-body);
          background: #FAF8F2;
        }
        #mindmap .mm-title {
          font-family: var(--mm-display);
          font-weight: 700;
          font-size: 18px;
          letter-spacing: -0.01em;
          text-transform: uppercase;
          color: var(--mm-ink);
        }
        #mindmap .mm-tag {
          font-family: var(--mm-mono);
          font-size: 10px;
          letter-spacing: 0.06em;
          text-transform: uppercase;
          color: var(--mm-red);
          margin: 2px 0 6px;
          font-weight: 600;
        }
        #mindmap .mm-note {
          font-size: 13px;
          line-height: 1.5;
          color: var(--mm-mute);
          margin: 0 0 8px;
          max-width: 780px;
        }
        #mindmap .mm-rel { list-style: none; margin: 0; padding: 0; font-size: 12px; line-height: 1.45; }
        #mindmap .mm-rel li { padding-left: 16px; position: relative; margin: 3px 0; color: var(--mm-mute); }
        #mindmap .mm-rel li::before {
          content: "";
          position: absolute;
          left: 0;
          top: 0.65em;
          width: 9px;
          border-top: 2px dashed var(--mm-red);
        }
        #mindmap .mm-rel b {
          font-family: var(--mm-mono);
          font-size: 10.5px;
          letter-spacing: 0.03em;
          text-transform: uppercase;
          font-weight: 600;
          color: var(--mm-ink);
        }
        #mindmap a.mm-open {
          display: inline-block;
          margin-top: 8px;
          font-family: var(--mm-mono);
          font-size: 10px;
          letter-spacing: 0.06em;
          text-transform: uppercase;
          color: #FFFFFF;
          background: var(--mm-red);
          padding: 6px 14px;
          border-radius: 6px;
          text-decoration: none;
          box-shadow: 0 4px 12px rgba(212, 0, 40, 0.2);
          transition: all 0.2s ease;
        }
        #mindmap a.mm-open:hover { filter: brightness(0.92); transform: translateY(-1px); }

        /* Floating Tooltip directly at hovered node */
        #mindmap .mm-tooltip {
          position: absolute;
          pointer-events: none;
          z-index: 30;
          background: rgba(24, 24, 27, 0.94);
          color: #FFFFFF;
          padding: 8px 12px;
          border-radius: 8px;
          box-shadow: 0 10px 25px -4px rgba(24, 24, 27, 0.35);
          max-width: 270px;
          font-family: var(--mm-body);
          backdrop-filter: blur(8px);
          border: 1px solid rgba(255, 255, 255, 0.15);
          opacity: 0;
          visibility: hidden;
          transition: opacity 0.15s ease, visibility 0.15s ease;
        }
        #mindmap .mm-tooltip.visible {
          opacity: 1;
          visibility: visible;
        }
        #mindmap .mm-tt-title {
          display: block;
          font-family: var(--mm-display);
          font-weight: 700;
          font-size: 12px;
          color: #FFFFFF;
          text-transform: uppercase;
          letter-spacing: 0.03em;
          margin-bottom: 2px;
        }
        #mindmap .mm-tt-tag {
          display: inline-block;
          font-family: var(--mm-mono);
          font-size: 9px;
          letter-spacing: 0.05em;
          color: #FF6680;
          text-transform: uppercase;
          font-weight: 600;
          margin-bottom: 3px;
        }
        #mindmap .mm-tt-desc {
          color: #E2E8F0;
          font-size: 11px;
          line-height: 1.4;
        }

        @media (prefers-reduced-motion: reduce) {
          #mindmap .mm-n, #mindmap .mm-l { transition: none; }
        }
      `}</style>

      <div className="mm-head">
        <h2>How my work <em>connects</em></h2>
        <p className="mm-sub">
          Five habits at the centre, the domains I have worked in around them. Red dashed lines mark where one domain feeds another. Drag a node to move it, click to pin its links.
        </p>
        <div className="mm-bar">
          <span className="mm-key"><i className="mm-dot"></i>Delivered</span>
          <span className="mm-key"><i className="mm-dot o"></i>In progress or proposed</span>
          <span className="mm-key"><i className="mm-dash"></i>Feeds into</span>
          <button className="mm-reset" type="button">Reset layout</button>
        </div>
      </div>

      <div className="mm-scroll">
        <div ref={stageRef} className="mm-stage">
          <svg ref={svgRef} className="mm-svg" viewBox="0 0 1000 480" role="group" aria-label="Mind map of engineering domains"></svg>
          <div ref={tooltipRef} className="mm-tooltip"></div>
          <div ref={panelRef} className="mm-panel" aria-live="polite"></div>
        </div>
      </div>
    </section>
  );
}
