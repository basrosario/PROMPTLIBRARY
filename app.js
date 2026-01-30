/**
 * Praxis - Mobile-First JavaScript
 * Clean, performant animations and interactions
 */

document.addEventListener('DOMContentLoaded', () => {
    'use strict';

    // ==========================================
    // MOBILE MENU TOGGLE
    // ==========================================
    const menuToggle = document.getElementById('menuToggle');
    const nav = document.getElementById('nav');
    const header = document.getElementById('header');

    if (menuToggle && nav) {
        menuToggle.addEventListener('click', () => {
            menuToggle.classList.toggle('active');
            nav.classList.toggle('active');
            document.body.classList.toggle('menu-open');
        });

        // Close menu when clicking a link
        nav.querySelectorAll('.nav-link').forEach(link => {
            link.addEventListener('click', () => {
                menuToggle.classList.remove('active');
                nav.classList.remove('active');
                document.body.classList.remove('menu-open');
            });
        });

        // Close menu on escape key
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && nav.classList.contains('active')) {
                menuToggle.classList.remove('active');
                nav.classList.remove('active');
                document.body.classList.remove('menu-open');
            }
        });
    }

    // ==========================================
    // HEADER SCROLL EFFECT
    // ==========================================
    let headerTicking = false;

    function updateHeader() {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
        headerTicking = false;
    }

    if (header) {
        window.addEventListener('scroll', () => {
            if (!headerTicking) {
                requestAnimationFrame(updateHeader);
                headerTicking = true;
            }
        }, { passive: true });
        updateHeader();
    }

    // ==========================================
    // INTERACTIVE NEURAL NETWORK ANIMATION
    // ==========================================

    // AI terms that float through the network
    const AI_TERMS = [
        'CRISP', 'COSTAR', 'ReAct', 'CRISPE', 'Chain-of-Thought', 'Few-Shot',
        'Zero-Shot', 'Role Play', 'System Prompt', 'Meta Prompt',
        'Prompt', 'Context', 'Token', 'Completion', 'Temperature', 'Top-P',
        'Hallucination', 'Grounding', 'Retrieval', 'RAG', 'Fine-tune',
        'LLM', 'GPT', 'Claude', 'Gemini', 'Neural', 'Transformer',
        'Attention', 'BERT', 'Diffusion', 'Multimodal', 'Vision',
        'Embedding', 'Vector', 'Semantic', 'Inference', 'Latent',
        'Generate', 'Train', 'Evaluate', 'Iterate', 'Optimize',
        'Agent', 'Memory', 'Chain', 'Tool Use', 'Function Call',
        'Alignment', 'Safety', 'Bias', 'Fairness', 'RLHF'
    ];

    // Neural Network class - supports multiple instances
    class NeuralNetwork {
        constructor(canvas, options = {}) {
            this.canvas = canvas;
            this.ctx = canvas.getContext('2d');
            this.width = 0;
            this.height = 0;
            this.nodes = [];
            this.aiTerms = [];
            this.mouse = { x: null, y: null, radius: 100 };
            this.animationId = null;
            this.connectionStates = new Map();
            this.lastConnectionUpdate = 0;

            // Mobile detection
            this.isMobile = window.innerWidth < 768 || 'ontouchstart' in window;

            // Options for different canvas types - reduced for mobile
            this.showTerms = options.showTerms !== false;
            this.nodeDensity = this.isMobile ? 0.00008 : (options.nodeDensity || 0.00015);
            this.maxNodes = this.isMobile ? 60 : (options.maxNodes || 300);
            this.minNodes = this.isMobile ? 20 : (options.minNodes || 40);
            this.termCount = this.isMobile ? 4 : (options.termCount || 12);
            this.maxConnectionDistance = this.isMobile ? 100 : 150;

            // Data pulses traveling along connections (foreground - bright)
            this.dataPulses = [];
            this.lastPulseSpawn = 0;
            this.pulseSpawnInterval = this.isMobile ? 1500 : 800; // Slower on mobile
            this.maxPulses = this.isMobile ? 5 : 15;

            // Background pulses - dimmer, more frequent for 3D depth (disabled on mobile)
            this.bgPulses = [];
            this.lastBgPulseSpawn = 0;
            this.bgPulseSpawnInterval = 300;
            this.enableBgPulses = !this.isMobile; // Disable on mobile for performance

            // Frame throttling for mobile
            this.lastFrameTime = 0;
            this.targetFrameInterval = this.isMobile ? 33 : 16; // ~30fps on mobile, 60fps on desktop

            this.init();
        }

        init() {
            this.resize();
            this.setupEventListeners();
            this.animate(0);
        }

        setupEventListeners() {
            // Resize handler
            this.resizeHandler = () => this.resize();
            window.addEventListener('resize', this.resizeHandler);

            // Mouse tracking
            this.canvas.addEventListener('mousemove', (e) => {
                const rect = this.canvas.getBoundingClientRect();
                this.mouse.x = e.clientX - rect.left;
                this.mouse.y = e.clientY - rect.top;
            });

            this.canvas.addEventListener('mouseleave', () => {
                this.mouse.x = null;
                this.mouse.y = null;
            });

            // Touch support
            this.canvas.addEventListener('touchmove', (e) => {
                if (e.touches.length > 0) {
                    const rect = this.canvas.getBoundingClientRect();
                    this.mouse.x = e.touches[0].clientX - rect.left;
                    this.mouse.y = e.touches[0].clientY - rect.top;
                }
            }, { passive: true });

            this.canvas.addEventListener('touchend', () => {
                this.mouse.x = null;
                this.mouse.y = null;
            });
        }

        resize() {
            this.width = this.canvas.width = this.canvas.offsetWidth;
            this.height = this.canvas.height = this.canvas.offsetHeight;
            this.initNodes();
            this.dataPulses = []; // Clear pulses on resize
            this.bgPulses = []; // Clear background pulses
            if (this.showTerms) this.initTerms();
        }

        initNodes() {
            this.nodes = [];
            const nodeCount = Math.floor(this.width * this.height * this.nodeDensity);
            const clampedCount = Math.min(Math.max(nodeCount, this.minNodes), this.maxNodes);

            for (let i = 0; i < clampedCount; i++) {
                this.nodes.push(this.createNode(
                    Math.random() * this.width,
                    Math.random() * this.height
                ));
            }
        }

        createNode(x, y) {
            return {
                x, y,
                baseX: x,
                baseY: y,
                size: Math.random() * 1.5 + 0.5, // Smaller, subtle points
                vx: (Math.random() - 0.5) * 0.2,
                vy: (Math.random() - 0.5) * 0.2,
                brightness: Math.random() * 0.3 + 0.2 // Subtle, consistent brightness
            };
        }

        initTerms() {
            this.aiTerms = [];
            for (let i = 0; i < this.termCount; i++) {
                this.aiTerms.push(this.createTerm());
            }
        }

        createTerm() {
            return {
                text: AI_TERMS[Math.floor(Math.random() * AI_TERMS.length)],
                x: Math.random() * this.width,
                y: Math.random() * this.height,
                vx: (Math.random() - 0.5) * 0.2,
                vy: (Math.random() - 0.5) * 0.2,
                fontSize: Math.random() * 8 + 10, // Slightly smaller text
                brightness: 0,
                targetBrightness: Math.random() * 0.35 + 0.15, // More subtle
                fadeSpeed: Math.random() * 0.006 + 0.003, // Slower, smoother fade
                phase: 'fadeIn',
                lifetime: Math.random() * 8000 + 5000, // Longer visible time
                born: performance.now() - Math.random() * 5000
            };
        }

        updateNode(node, time) {
            // Mouse repulsion (subtle)
            if (this.mouse.x !== null && this.mouse.y !== null) {
                const dx = this.mouse.x - node.x;
                const dy = this.mouse.y - node.y;
                const distance = Math.sqrt(dx * dx + dy * dy);

                if (distance < this.mouse.radius) {
                    const force = (this.mouse.radius - distance) / this.mouse.radius;
                    const angle = Math.atan2(dy, dx);
                    node.x -= Math.cos(angle) * force * 2;
                    node.y -= Math.sin(angle) * force * 2;
                }
            }

            // Spring back to base
            node.x += (node.baseX - node.x) * 0.03;
            node.y += (node.baseY - node.y) * 0.03;

            // Slow drift
            node.baseX += node.vx;
            node.baseY += node.vy;

            // Boundaries
            if (node.baseX < 0 || node.baseX > this.width) node.vx *= -1;
            if (node.baseY < 0 || node.baseY > this.height) node.vy *= -1;
        }

        drawNode(node) {
            // Simple, small point - no glow or pulsing
            this.ctx.beginPath();
            this.ctx.arc(node.x, node.y, node.size, 0, Math.PI * 2);
            this.ctx.fillStyle = `rgba(230, 57, 70, ${node.brightness})`;
            this.ctx.fill();
        }

        updateTerm(term, time) {
            // Normal movement
            term.x += term.vx;
            term.y += term.vy;

            // Mouse scatter
            if (this.mouse.x !== null && this.mouse.y !== null) {
                const dx = this.mouse.x - term.x;
                const dy = this.mouse.y - term.y;
                const distance = Math.sqrt(dx * dx + dy * dy);

                if (distance < this.mouse.radius * 0.8) {
                    const force = (this.mouse.radius * 0.8 - distance) / (this.mouse.radius * 0.8);
                    const angle = Math.atan2(dy, dx);
                    term.x -= Math.cos(angle) * force * 2;
                    term.y -= Math.sin(angle) * force * 2;
                }
            }

            // Wrap boundaries
            if (term.x < -100) term.x = this.width + 100;
            if (term.x > this.width + 100) term.x = -100;
            if (term.y < -50) term.y = this.height + 50;
            if (term.y > this.height + 50) term.y = -50;

            // Lifecycle with smooth fade
            const age = performance.now() - term.born;
            if (term.phase === 'fadeIn') {
                // Gentle fade in
                term.brightness += term.fadeSpeed;
                if (term.brightness >= term.targetBrightness) {
                    term.brightness = term.targetBrightness;
                    term.phase = 'visible';
                }
            } else if (term.phase === 'visible' && age > term.lifetime) {
                term.phase = 'fadeOut';
            } else if (term.phase === 'fadeOut') {
                // Smooth fade out - just opacity, no movement changes
                term.brightness -= term.fadeSpeed * 0.8;

                if (term.brightness <= 0) {
                    Object.assign(term, this.createTerm());
                }
            }
        }

        drawTerm(term) {
            if (term.brightness <= 0) return;

            this.ctx.save();
            this.ctx.font = `${term.fontSize}px monospace`;
            this.ctx.fillStyle = `rgba(230, 57, 70, ${term.brightness})`;
            this.ctx.textAlign = 'center';
            this.ctx.textBaseline = 'middle';

            // Subtle glow - skip on mobile (shadowBlur is expensive)
            if (!this.isMobile) {
                this.ctx.shadowColor = `rgba(230, 57, 70, ${term.brightness * 0.6})`;
                this.ctx.shadowBlur = 8;
            }

            this.ctx.fillText(term.text, term.x, term.y);
            this.ctx.restore();
        }

        updateConnectionStates(time) {
            if (time - this.lastConnectionUpdate > 2000) {
                this.lastConnectionUpdate = time;
                this.connectionStates.forEach((state, key) => {
                    if (Math.random() < 0.08) {
                        this.connectionStates.set(key, {
                            active: false,
                            releaseTime: time,
                            reconnectDelay: Math.random() * 3000 + 1000
                        });
                    }
                });
            }

            this.connectionStates.forEach((state, key) => {
                if (!state.active && time - state.releaseTime > state.reconnectDelay) {
                    this.connectionStates.set(key, { active: true });
                }
            });
        }

        // Data pulse methods - information traveling along connections
        spawnDataPulse(time) {
            if (time - this.lastPulseSpawn < this.pulseSpawnInterval) return;
            if (this.dataPulses.length >= this.maxPulses) return; // Limit active pulses

            // Find active connections to spawn pulses on
            const activeConnections = [];
            const maxDistance = this.maxConnectionDistance;

            for (let i = 0; i < this.nodes.length; i++) {
                for (let j = i + 1; j < this.nodes.length; j++) {
                    const dx = this.nodes[i].x - this.nodes[j].x;
                    const dy = this.nodes[i].y - this.nodes[j].y;
                    const distance = Math.sqrt(dx * dx + dy * dy);

                    if (distance < maxDistance) {
                        const key = `${i}-${j}`;
                        const state = this.connectionStates.get(key);
                        if (state && state.active) {
                            activeConnections.push({ i, j, distance });
                        }
                    }
                }
            }

            if (activeConnections.length > 0) {
                // Pick a random connection
                const conn = activeConnections[Math.floor(Math.random() * activeConnections.length)];
                const reverse = Math.random() > 0.5;

                this.dataPulses.push({
                    startNode: reverse ? conn.j : conn.i,
                    endNode: reverse ? conn.i : conn.j,
                    progress: 0,
                    speed: 0.015, // Uniform speed - streamlined
                    size: 1.5, // Skinnier pulse
                    trailLength: 0.12 // Shorter trail
                });

                this.lastPulseSpawn = time;
            }
        }

        updateDataPulses() {
            this.dataPulses = this.dataPulses.filter(pulse => {
                pulse.progress += pulse.speed;

                // When pulse reaches end, chance to chain to next connection
                if (pulse.progress >= 1) {
                    // Lower chain probability on mobile
                    const chainChance = this.isMobile ? 0.2 : 0.4;
                    if (Math.random() < chainChance) {
                        // Find connected nodes to continue the chain
                        const endNode = pulse.endNode;
                        const maxDistance = this.maxConnectionDistance;
                        const nextNodes = [];

                        for (let i = 0; i < this.nodes.length; i++) {
                            if (i === endNode || i === pulse.startNode) continue;
                            const dx = this.nodes[endNode].x - this.nodes[i].x;
                            const dy = this.nodes[endNode].y - this.nodes[i].y;
                            const distance = Math.sqrt(dx * dx + dy * dy);

                            if (distance < maxDistance) {
                                const key = endNode < i ? `${endNode}-${i}` : `${i}-${endNode}`;
                                const state = this.connectionStates.get(key);
                                if (state && state.active) {
                                    nextNodes.push(i);
                                }
                            }
                        }

                        if (nextNodes.length > 0) {
                            const nextNode = nextNodes[Math.floor(Math.random() * nextNodes.length)];
                            this.dataPulses.push({
                                startNode: endNode,
                                endNode: nextNode,
                                progress: 0,
                                speed: 0.015, // Same uniform speed
                                size: 1.5, // Same size
                                trailLength: 0.12
                            });
                        }
                    }
                    return false;
                }
                return true;
            });
        }

        drawDataPulses() {
            this.dataPulses.forEach(pulse => {
                const startNode = this.nodes[pulse.startNode];
                const endNode = this.nodes[pulse.endNode];

                // Current position
                const x = startNode.x + (endNode.x - startNode.x) * pulse.progress;
                const y = startNode.y + (endNode.y - startNode.y) * pulse.progress;

                // Streamlined trail - reduced on mobile
                const trailSteps = this.isMobile ? 2 : 4;
                for (let t = trailSteps; t >= 0; t--) {
                    const trailProgress = pulse.progress - (pulse.trailLength * t / trailSteps);
                    if (trailProgress < 0) continue;

                    const tx = startNode.x + (endNode.x - startNode.x) * trailProgress;
                    const ty = startNode.y + (endNode.y - startNode.y) * trailProgress;
                    const trailAlpha = (1 - t / trailSteps) * 0.5;

                    this.ctx.beginPath();
                    this.ctx.arc(tx, ty, pulse.size * 0.8, 0, Math.PI * 2);
                    this.ctx.fillStyle = `rgba(255, 255, 255, ${trailAlpha})`;
                    this.ctx.fill();
                }

                // Main pulse - small bright core
                this.ctx.beginPath();
                this.ctx.arc(x, y, pulse.size, 0, Math.PI * 2);
                this.ctx.fillStyle = 'rgba(255, 255, 255, 0.95)';
                this.ctx.fill();

                // Subtle glow - skip on mobile
                if (!this.isMobile) {
                    this.ctx.beginPath();
                    this.ctx.arc(x, y, pulse.size * 2, 0, Math.PI * 2);
                    this.ctx.fillStyle = 'rgba(230, 57, 70, 0.25)';
                    this.ctx.fill();
                }
            });
        }

        // Background pulses - dimmer layer for 3D depth effect
        spawnBgPulse(time) {
            if (!this.enableBgPulses) return; // Skip on mobile
            if (time - this.lastBgPulseSpawn < this.bgPulseSpawnInterval) return;
            if (this.bgPulses.length > 30) return; // More background activity

            const activeConnections = [];
            const maxDistance = this.maxConnectionDistance;

            for (let i = 0; i < this.nodes.length; i++) {
                for (let j = i + 1; j < this.nodes.length; j++) {
                    const dx = this.nodes[i].x - this.nodes[j].x;
                    const dy = this.nodes[i].y - this.nodes[j].y;
                    const distance = Math.sqrt(dx * dx + dy * dy);

                    if (distance < maxDistance) {
                        const key = `${i}-${j}`;
                        const state = this.connectionStates.get(key);
                        if (state && state.active) {
                            activeConnections.push({ i, j, distance });
                        }
                    }
                }
            }

            if (activeConnections.length > 0) {
                const conn = activeConnections[Math.floor(Math.random() * activeConnections.length)];
                const reverse = Math.random() > 0.5;

                this.bgPulses.push({
                    startNode: reverse ? conn.j : conn.i,
                    endNode: reverse ? conn.i : conn.j,
                    progress: 0,
                    speed: 0.008 + Math.random() * 0.006, // Slower, varied (feels distant)
                    size: 0.8 + Math.random() * 0.4, // Smaller
                    opacity: 0.15 + Math.random() * 0.15, // Dimmer
                    trailLength: 0.08 + Math.random() * 0.06
                });

                this.lastBgPulseSpawn = time;
            }
        }

        updateBgPulses() {
            this.bgPulses = this.bgPulses.filter(pulse => {
                pulse.progress += pulse.speed;

                // Background pulses chain less frequently
                if (pulse.progress >= 1) {
                    if (Math.random() < 0.25) {
                        const endNode = pulse.endNode;
                        const maxDistance = this.maxConnectionDistance;
                        const nextNodes = [];

                        for (let i = 0; i < this.nodes.length; i++) {
                            if (i === endNode || i === pulse.startNode) continue;
                            const dx = this.nodes[endNode].x - this.nodes[i].x;
                            const dy = this.nodes[endNode].y - this.nodes[i].y;
                            const distance = Math.sqrt(dx * dx + dy * dy);

                            if (distance < maxDistance) {
                                const key = endNode < i ? `${endNode}-${i}` : `${i}-${endNode}`;
                                const state = this.connectionStates.get(key);
                                if (state && state.active) {
                                    nextNodes.push(i);
                                }
                            }
                        }

                        if (nextNodes.length > 0) {
                            const nextNode = nextNodes[Math.floor(Math.random() * nextNodes.length)];
                            this.bgPulses.push({
                                startNode: endNode,
                                endNode: nextNode,
                                progress: 0,
                                speed: 0.008 + Math.random() * 0.006,
                                size: 0.8 + Math.random() * 0.4,
                                opacity: 0.15 + Math.random() * 0.15,
                                trailLength: 0.08 + Math.random() * 0.06
                            });
                        }
                    }
                    return false;
                }
                return true;
            });
        }

        drawBgPulses() {
            this.bgPulses.forEach(pulse => {
                const startNode = this.nodes[pulse.startNode];
                const endNode = this.nodes[pulse.endNode];

                const x = startNode.x + (endNode.x - startNode.x) * pulse.progress;
                const y = startNode.y + (endNode.y - startNode.y) * pulse.progress;

                // Subtle trail for background
                const trailSteps = 3;
                for (let t = trailSteps; t >= 0; t--) {
                    const trailProgress = pulse.progress - (pulse.trailLength * t / trailSteps);
                    if (trailProgress < 0) continue;

                    const tx = startNode.x + (endNode.x - startNode.x) * trailProgress;
                    const ty = startNode.y + (endNode.y - startNode.y) * trailProgress;
                    const trailAlpha = (1 - t / trailSteps) * pulse.opacity * 0.6;

                    this.ctx.beginPath();
                    this.ctx.arc(tx, ty, pulse.size * 0.6, 0, Math.PI * 2);
                    this.ctx.fillStyle = `rgba(180, 50, 60, ${trailAlpha})`;
                    this.ctx.fill();
                }

                // Main background pulse - dim, reddish
                this.ctx.beginPath();
                this.ctx.arc(x, y, pulse.size, 0, Math.PI * 2);
                this.ctx.fillStyle = `rgba(200, 60, 70, ${pulse.opacity})`;
                this.ctx.fill();
            });
        }

        drawConnections(time) {
            const maxDistance = this.maxConnectionDistance;
            this.updateConnectionStates(time);

            for (let i = 0; i < this.nodes.length; i++) {
                for (let j = i + 1; j < this.nodes.length; j++) {
                    const dx = this.nodes[i].x - this.nodes[j].x;
                    const dy = this.nodes[i].y - this.nodes[j].y;
                    const distance = Math.sqrt(dx * dx + dy * dy);

                    if (distance < maxDistance) {
                        const key = `${i}-${j}`;

                        if (!this.connectionStates.has(key)) {
                            this.connectionStates.set(key, { active: true });
                        }

                        const state = this.connectionStates.get(key);

                        if (!state.active) {
                            const fadeProgress = Math.min(1, (performance.now() - state.releaseTime) / 500);
                            if (fadeProgress < 1) {
                                const fadeAlpha = (1 - distance / maxDistance) * 0.5 * (1 - fadeProgress);
                                this.ctx.beginPath();
                                this.ctx.moveTo(this.nodes[i].x, this.nodes[i].y);
                                this.ctx.lineTo(this.nodes[j].x, this.nodes[j].y);
                                this.ctx.strokeStyle = `rgba(230, 57, 70, ${fadeAlpha})`;
                                this.ctx.lineWidth = 1;
                                this.ctx.stroke();
                            }
                            continue;
                        }

                        const baseAlpha = (1 - distance / maxDistance) * 0.5;
                        const pulse = Math.sin(time * 0.002 + i * 0.1) * 0.1;
                        const alpha = Math.max(0.1, baseAlpha + pulse);

                        this.ctx.beginPath();
                        this.ctx.moveTo(this.nodes[i].x, this.nodes[i].y);
                        this.ctx.lineTo(this.nodes[j].x, this.nodes[j].y);
                        this.ctx.strokeStyle = `rgba(230, 57, 70, ${alpha})`;
                        this.ctx.lineWidth = 1;
                        this.ctx.stroke();
                    }
                }
            }
        }

        animate(time) {
            // Frame throttling for mobile performance
            const elapsed = time - this.lastFrameTime;
            if (elapsed < this.targetFrameInterval) {
                this.animationId = requestAnimationFrame((t) => this.animate(t));
                return;
            }
            this.lastFrameTime = time;

            this.ctx.clearRect(0, 0, this.width, this.height);

            // Layer 1: Background pulses (deepest - dim, behind everything) - skip on mobile
            if (this.enableBgPulses) {
                this.spawnBgPulse(time);
                this.updateBgPulses();
                this.drawBgPulses();
            }

            // Layer 2: Connection lines
            this.drawConnections(time);

            // Layer 3: Foreground data pulses (bright, in front of connections)
            this.spawnDataPulse(time);
            this.updateDataPulses();
            this.drawDataPulses();

            // Layer 4: Nodes
            this.nodes.forEach(node => {
                this.updateNode(node, time);
                this.drawNode(node);
            });

            // Layer 5: Terms (topmost)
            if (this.showTerms) {
                this.aiTerms.forEach(term => {
                    this.updateTerm(term, time);
                    this.drawTerm(term);
                });
            }

            this.animationId = requestAnimationFrame((t) => this.animate(t));
        }

        destroy() {
            cancelAnimationFrame(this.animationId);
            window.removeEventListener('resize', this.resizeHandler);
        }
    }

    // Initialize all neural network canvases
    const neuralNetworks = [];

    // Main hero canvas with subtle floating terms that fade smoothly
    const mainCanvas = document.getElementById('neural-network');
    if (mainCanvas) {
        neuralNetworks.push(new NeuralNetwork(mainCanvas, {
            showTerms: true,
            termCount: window.innerWidth < 768 ? 6 : 12 // Fewer terms for cleaner look
        }));
    }

    // Secondary canvases (CTA cards, footer - lighter version without terms)
    // Skip on mobile for better performance
    const isMobileDevice = window.innerWidth < 768 || 'ontouchstart' in window;
    if (!isMobileDevice) {
        document.querySelectorAll('.neural-canvas-secondary').forEach(canvas => {
            neuralNetworks.push(new NeuralNetwork(canvas, {
                showTerms: false,
                nodeDensity: 0.0001,
                maxNodes: 60,
                minNodes: 20
            }));
        });
    }

    // Cleanup on page unload
    window.addEventListener('beforeunload', () => {
        neuralNetworks.forEach(nn => nn.destroy());
    });

    // ==========================================
    // SCROLL REVEAL ANIMATIONS
    // ==========================================
    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');

                // If it's a stagger container, animate children
                if (entry.target.classList.contains('stagger-children')) {
                    const children = entry.target.children;
                    Array.from(children).forEach((child, index) => {
                        setTimeout(() => {
                            child.classList.add('visible');
                        }, index * 100);
                    });
                }
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });

    // Observe all fade-in elements
    document.querySelectorAll('.fade-in, .fade-in-up, .stagger-children, .card, .feature-item, .pattern-chip, .cta-card').forEach(el => {
        revealObserver.observe(el);
    });

    // ==========================================
    // COUNTER ANIMATIONS
    // ==========================================
    function animateCounter(element, target, duration = 2000) {
        const startTime = performance.now();

        function update(currentTime) {
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / duration, 1);

            // Ease out cubic for smooth deceleration
            const eased = 1 - Math.pow(1 - progress, 3);
            element.textContent = Math.floor(target * eased);

            if (progress < 1) {
                requestAnimationFrame(update);
            } else {
                element.textContent = target;
            }
        }

        requestAnimationFrame(update);
    }

    const counterObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting && !entry.target.dataset.animated) {
                const target = parseInt(entry.target.dataset.count, 10);
                if (!isNaN(target)) {
                    entry.target.dataset.animated = 'true';
                    animateCounter(entry.target, target);
                }
            }
        });
    }, { threshold: 0.5 });

    document.querySelectorAll('[data-count]').forEach(el => {
        counterObserver.observe(el);
    });

    // ==========================================
    // SMOOTH SCROLL FOR ANCHOR LINKS
    // ==========================================
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const targetId = this.getAttribute('href');
            if (targetId === '#' || targetId === '') return;

            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                e.preventDefault();
                targetElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
                history.pushState(null, null, targetId);
            }
        });
    });

    // ==========================================
    // BACK TO TOP BUTTON
    // ==========================================
    const backToTop = document.createElement('button');
    backToTop.className = 'back-to-top';
    backToTop.setAttribute('aria-label', 'Back to top');
    backToTop.innerHTML = `
        <svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M18 15l-6-6-6 6"/>
        </svg>
    `;
    document.body.appendChild(backToTop);

    let backToTopTicking = false;

    function updateBackToTop() {
        if (window.scrollY > 300) {
            backToTop.classList.add('visible');
        } else {
            backToTop.classList.remove('visible');
        }
        backToTopTicking = false;
    }

    window.addEventListener('scroll', () => {
        if (!backToTopTicking) {
            requestAnimationFrame(updateBackToTop);
            backToTopTicking = true;
        }
    }, { passive: true });

    backToTop.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });

    // ==========================================
    // TOAST NOTIFICATIONS
    // ==========================================
    let toastContainer = document.querySelector('.toast-container');
    if (!toastContainer) {
        toastContainer = document.createElement('div');
        toastContainer.className = 'toast-container';
        document.body.appendChild(toastContainer);
    }

    window.showToast = function(message, type = 'success') {
        const toast = document.createElement('div');
        toast.className = `toast ${type}`;
        toast.textContent = message;
        toastContainer.appendChild(toast);

        setTimeout(() => {
            toast.classList.add('hiding');
            setTimeout(() => toast.remove(), 300);
        }, 3000);
    };

    // ==========================================
    // THEME TOGGLE (Dark/Light Mode)
    // ==========================================
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
        document.documentElement.setAttribute('data-theme', 'dark');
    }

    // Theme toggle button (if exists)
    const themeToggle = document.querySelector('.theme-toggle');
    if (themeToggle) {
        themeToggle.addEventListener('click', () => {
            const currentTheme = document.documentElement.getAttribute('data-theme');
            const newTheme = currentTheme === 'dark' ? 'light' : 'dark';

            if (newTheme === 'dark') {
                document.documentElement.setAttribute('data-theme', 'dark');
            } else {
                document.documentElement.removeAttribute('data-theme');
            }

            localStorage.setItem('theme', newTheme);
        });
    }

    // ==========================================
    // TOOL PAGE: PROMPT SCORER
    // ==========================================

    // Framework definitions with detection patterns
    const FRAMEWORKS = {
        CRISP: {
            name: 'CRISP',
            elements: {
                C: {
                    name: 'Context',
                    patterns: [
                        /\b(background|context|situation)\s*:/i,
                        /\b(I am a|I'm a|as a|my role|I work)\b/i,
                        /\b(currently|working on|project|because|since)\b/i
                    ],
                    tip: 'Add background: "Context: I\'m a [role] working on [project]..."',
                    example: 'Context: I run a small e-commerce store selling handmade jewelry.'
                },
                R: {
                    name: 'Request',
                    patterns: [
                        /^(write|create|generate|explain|analyze|summarize|list|describe|compare|design|draft|develop|build|make|help me)/im,
                        /\b(I need|I want|please|can you|could you|would you)\b/i,
                        /\b(task|request)\s*:/i
                    ],
                    tip: 'Start with an action verb: Write, Create, Explain, Analyze...',
                    example: 'Write a product description for our new minimalist necklace.'
                },
                I: {
                    name: 'Instructions',
                    patterns: [
                        /\b(include|ensure|make sure|cover|address)\b/i,
                        /\b(don't|do not|avoid|exclude|without)\b/i,
                        /\b(must|should|shall|need to|required|important)\b/i,
                        /\b(step\s*\d|first|second|then|next|finally)\b/i,
                        /(\d+\.\s|\*\s|-\s)/m
                    ],
                    tip: 'Add what to include/exclude: "Include X. Avoid Y."',
                    example: 'Include: price point, materials, target demographic. Avoid: generic marketing speak.'
                },
                S: {
                    name: 'Style',
                    patterns: [
                        /\b(tone|voice|style)\s*:/i,
                        /\b(formal|casual|professional|friendly|technical|conversational|humorous|serious)\b/i,
                        /\b(write (as|like|in)|in the style of|sound like)\b/i
                    ],
                    tip: 'Specify tone: "Use a professional/casual/friendly tone"',
                    example: 'Use a warm, conversational tone appropriate for Instagram.'
                },
                P: {
                    name: 'Parameters',
                    patterns: [
                        /\b(\d+)\s*(words?|sentences?|paragraphs?|pages?|minutes?|bullet\s*points?|items?|tips?|points?)\b/i,
                        /\b(maximum|minimum|at least|no more than|between|limit|within|under|over)\s*\d/i,
                        /\b(format|output|return|structure)\s*(as|:)/i,
                        /\b(JSON|markdown|HTML|bullet|table|list|code|email|article|blog)\b/i
                    ],
                    tip: 'Add constraints: "500 words", "5 bullet points", "as a table"',
                    example: 'Limit to 150 words, formatted as a single paragraph.'
                }
            }
        },
        COSTAR: {
            name: 'COSTAR',
            elements: {
                C: {
                    name: 'Context',
                    patterns: [
                        /\b(background|context|situation)\s*:/i,
                        /\b(I am a|I'm a|as a|my role|I work)\b/i,
                        /\b(currently|working on|project|because|since)\b/i
                    ],
                    tip: 'Add background: "Context: I\'m a [role] working on [project]..."',
                    example: 'Context: I run a small e-commerce store selling handmade jewelry.'
                },
                O: {
                    name: 'Objective',
                    patterns: [
                        /\b(objective|goal|aim|purpose)\s*:/i,
                        /\b(goal is|objective is|aim to|purpose is|in order to|so that)\b/i,
                        /\b(I want to|we want to|trying to|hoping to|intend to|outcome|achieve|accomplish)\b/i
                    ],
                    tip: 'State your goal: "My objective is to..." or "I want to achieve..."',
                    example: 'My goal is to increase product page conversions by 15%.'
                },
                S: {
                    name: 'Style',
                    patterns: [
                        /\b(tone|voice|style)\s*:/i,
                        /\b(formal|casual|professional|friendly|technical|conversational)\b/i,
                        /\b(write (as|like|in)|in the style of|sound like)\b/i
                    ],
                    tip: 'Specify tone: "Use a professional/casual/friendly tone"',
                    example: 'Use a warm, conversational tone appropriate for Instagram.'
                },
                T: {
                    name: 'Tone',
                    patterns: [
                        /\b(tone)\s*:/i,
                        /\b(warm|cold|neutral|optimistic|pessimistic|urgent|relaxed)\b/i,
                        /\b(enthusiastic|reserved|confident|humble|empathetic|authoritative)\b/i,
                        /\b(serious|playful|inspiring|reassuring)\b/i
                    ],
                    tip: 'Define emotional quality: "Keep a confident but approachable tone"',
                    example: 'Keep a confident but not arrogant tone.'
                },
                A: {
                    name: 'Audience',
                    patterns: [
                        /\b(audience|reader|target)\s*:/i,
                        /\b(for (a|my|our|the)|targeted at|aimed at|intended for|targeting)\b/i,
                        /\b(beginners?|experts?|professionals?|executives?|children|students?|developers?|managers?)\b/i,
                        /\bwho (are|have|need|want)\b/i
                    ],
                    tip: 'Specify who: "For beginners with no experience" or "Targeting executives"',
                    example: 'Targeting young professionals aged 25-35 with disposable income.'
                },
                R: {
                    name: 'Response',
                    patterns: [
                        /\b(response|output|format|deliver)\s*:/i,
                        /\b(as a|in (a|the) form of|formatted as|structure as)\b/i,
                        /\b(email|article|report|summary|outline|script|code|list|table)\b/i,
                        /\b(return|provide|give me|deliver)\b.*\b(as|in)\b/i
                    ],
                    tip: 'Define output: "Format as a bulleted list" or "Return as JSON"',
                    example: 'Format as: headline, 2-sentence description, 3 bullet points.'
                }
            }
        },
        CRISPE: {
            name: 'CRISPE',
            elements: {
                C: {
                    name: 'Context',
                    patterns: [
                        /\b(background|context|situation)\s*:/i,
                        /\b(I am a|I'm a|as a|my role|I work)\b/i,
                        /\b(currently|working on|project|because|since)\b/i
                    ],
                    tip: 'Add background: "Context: I\'m a [role] working on [project]..."',
                    example: 'Context: I run a small e-commerce store selling handmade jewelry.'
                },
                R: {
                    name: 'Role',
                    patterns: [
                        /\b(act as|you are|pretend to be|imagine you('re| are)|behave as)\b/i,
                        /\b(role|persona|character|expert|specialist)\s*:/i,
                        /\b(as (a|an) (expert|professional|specialist|consultant|advisor))\b/i
                    ],
                    tip: 'Assign a persona: "Act as an experienced marketing consultant..."',
                    example: 'Act as an experienced copywriter who specializes in luxury brands.'
                },
                I: {
                    name: 'Instruction',
                    patterns: [
                        /\b(include|ensure|make sure|cover|address)\b/i,
                        /\b(don't|do not|avoid|exclude|without)\b/i,
                        /\b(must|should|shall|need to|required|important)\b/i,
                        /\b(step\s*\d|first|second|then|next|finally)\b/i,
                        /(\d+\.\s|\*\s|-\s)/m
                    ],
                    tip: 'Add what to include/exclude: "Include X. Avoid Y."',
                    example: 'Include: price point, materials, target demographic. Avoid: generic marketing speak.'
                },
                S: {
                    name: 'Style',
                    patterns: [
                        /\b(tone|voice|style)\s*:/i,
                        /\b(formal|casual|professional|friendly|technical|conversational)\b/i,
                        /\b(write (as|like|in)|in the style of|sound like)\b/i
                    ],
                    tip: 'Specify tone: "Use a professional/casual/friendly tone"',
                    example: 'Use a warm, conversational tone appropriate for Instagram.'
                },
                P: {
                    name: 'Parameters',
                    patterns: [
                        /\b(\d+)\s*(words?|sentences?|paragraphs?|pages?|minutes?|bullet\s*points?|items?|tips?|points?)\b/i,
                        /\b(maximum|minimum|at least|no more than|between|limit|within|under|over)\s*\d/i,
                        /\b(format|output|return|structure)\s*(as|:)/i,
                        /\b(JSON|markdown|HTML|bullet|table|list|code|email|article|blog)\b/i
                    ],
                    tip: 'Add constraints: "500 words", "5 bullet points", "as a table"',
                    example: 'Limit to 150 words, formatted as a single paragraph.'
                },
                E: {
                    name: 'Example',
                    patterns: [
                        /\b(example|for instance|such as|like this|similar to|e\.g\.|sample)\s*:/i,
                        /\b(here is|here's|below is|following is)\s*(an? )?(example|sample)/i,
                        /[""][^""]{10,}[""]/, // Quoted text as example
                        /\b(input|output)\s*:/i
                    ],
                    tip: 'Provide a sample: "Example: [show what you want]"',
                    example: 'Example output: "Handcrafted with love, our minimalist gold necklace..."'
                }
            }
        }
    };

    // Guided mode question definitions for each methodology
    const GUIDED_QUESTIONS = {
        CRISP: [
            { key: 'context', letter: 'C', label: 'What background info does the AI need?', placeholder: 'e.g., I run a small e-commerce business selling handmade jewelry...' },
            { key: 'request', letter: 'R', label: 'What do you want the AI to do?', placeholder: 'e.g., Write a blog post about email marketing tips...', fullWidth: true },
            { key: 'instructions', letter: 'I', label: 'Any specific instructions? (include/exclude)', placeholder: 'e.g., Include 5 tips. Avoid jargon...' },
            { key: 'style', letter: 'S', label: 'What tone or style?', placeholder: 'e.g., Professional but friendly, conversational...' },
            { key: 'parameters', letter: 'P', label: 'Format and length requirements?', placeholder: 'e.g., 500 words, bullet points, table format...' }
        ],
        COSTAR: [
            { key: 'context', letter: 'C', label: 'What background info does the AI need?', placeholder: 'e.g., I run a small e-commerce business selling handmade jewelry...' },
            { key: 'objective', letter: 'O', label: 'What is your goal?', placeholder: 'e.g., Increase email open rates by 20%...', fullWidth: true },
            { key: 'style', letter: 'S', label: 'What writing style?', placeholder: 'e.g., Professional, academic, casual...' },
            { key: 'tone', letter: 'T', label: 'What emotional tone?', placeholder: 'e.g., Enthusiastic, reassuring, urgent...' },
            { key: 'audience', letter: 'A', label: 'Who is the audience?', placeholder: 'e.g., Small business owners, beginners, executives...' },
            { key: 'response', letter: 'R', label: 'What output format?', placeholder: 'e.g., Email, bullet list, table, JSON...' }
        ],
        CRISPE: [
            { key: 'context', letter: 'C', label: 'What background info does the AI need?', placeholder: 'e.g., I run a small e-commerce business selling handmade jewelry...' },
            { key: 'role', letter: 'R', label: 'What role should the AI play?', placeholder: 'e.g., Act as an experienced marketing consultant...', fullWidth: true },
            { key: 'instruction', letter: 'I', label: 'What is the main task?', placeholder: 'e.g., Write a product description that converts...' },
            { key: 'style', letter: 'S', label: 'What tone or style?', placeholder: 'e.g., Professional but friendly, conversational...' },
            { key: 'parameters', letter: 'P', label: 'Format and length requirements?', placeholder: 'e.g., 500 words, bullet points, table format...' },
            { key: 'example', letter: 'E', label: 'Any example of what you want? (optional)', placeholder: 'e.g., Similar to: "Handcrafted with love, our..."', optional: true }
        ]
    };

    // Scorer state management
    const ScorerState = {
        mode: 'standard',
        guidedMethodology: 'CRISP',
        guidedAnswers: {},
        lastAnalysis: null,
        selectedFramework: 'CRISP'
    };

    // Detect framework elements in a prompt
    function detectFrameworkElements(prompt) {
        const results = {};

        for (const [frameworkKey, framework] of Object.entries(FRAMEWORKS)) {
            results[frameworkKey] = {
                name: framework.name,
                detected: {},
                coverage: 0,
                total: Object.keys(framework.elements).length
            };

            for (const [letter, element] of Object.entries(framework.elements)) {
                const matchCount = element.patterns.filter(p => p.test(prompt)).length;
                const found = matchCount > 0;
                const confidence = matchCount / element.patterns.length;

                results[frameworkKey].detected[letter] = {
                    name: element.name,
                    found,
                    confidence,
                    tip: element.tip,
                    example: element.example
                };

                if (found) {
                    results[frameworkKey].coverage++;
                }
            }

            results[frameworkKey].percentage = Math.round(
                (results[frameworkKey].coverage / results[frameworkKey].total) * 100
            );
        }

        return results;
    }

    // Calculate scores based on framework detection
    function analyzePrompt(prompt) {
        const frameworkResults = detectFrameworkElements(prompt);

        // Find best matching framework
        const bestFramework = Object.entries(frameworkResults)
            .sort((a, b) => b[1].percentage - a[1].percentage)[0];

        const frameworkScore = bestFramework[1].percentage;

        // Sentence quality scoring
        const sentences = prompt.split(/[.!?]+/).filter(s => s.trim().length > 0);
        const words = prompt.split(/\s+/).filter(w => w.length > 0);
        const avgWordsPerSentence = sentences.length > 0 ? words.length / sentences.length : words.length;

        // Ideal: 8-25 words per sentence
        let sentenceQuality;
        if (avgWordsPerSentence >= 8 && avgWordsPerSentence <= 25) {
            sentenceQuality = 100;
        } else if (avgWordsPerSentence >= 5 && avgWordsPerSentence <= 35) {
            sentenceQuality = 70;
        } else {
            sentenceQuality = 40;
        }

        // Intent clarity: based on clear request language (not labels)
        const hasActionVerb = /^(write|create|generate|explain|analyze|summarize|list|describe|compare|design|draft|help|act|you are|i need|i want|please|can you|could you)/im.test(prompt.trim());
        const hasClearRequest = /\b(write|create|generate|explain|analyze|summarize|list|describe|compare|design|draft|make|build|develop|produce|give me|provide|help me)\b/i.test(prompt);
        const intentClarity = (hasActionVerb ? 60 : 0) + (hasClearRequest ? 40 : 20);

        // Combined scoring: 50% framework, 25% sentence quality, 25% intent
        const overall = Math.round(frameworkScore * 0.5 + sentenceQuality * 0.25 + intentClarity * 0.25);

        // Generate feedback based on detected elements
        const feedback = generateFrameworkFeedback(bestFramework, frameworkResults);

        return {
            overall,
            frameworkCoverage: frameworkScore,
            sentenceQuality: Math.round(sentenceQuality),
            intentClarity: Math.round(intentClarity),
            bestFramework: bestFramework[0],
            frameworkResults,
            feedback
        };
    }

    // Generate feedback based on framework elements
    function generateFrameworkFeedback(bestFramework, allResults) {
        const improvements = [];
        const strengths = [];
        const frameworkName = bestFramework[0];
        const elements = bestFramework[1].detected;

        // Categorize found and missing elements
        for (const [letter, element] of Object.entries(elements)) {
            if (element.found) {
                if (element.confidence >= 0.5) {
                    strengths.push({
                        element: letter,
                        name: element.name,
                        text: `Strong ${element.name} - clearly defined`
                    });
                } else {
                    strengths.push({
                        element: letter,
                        name: element.name,
                        text: `${element.name} detected - could be more explicit`
                    });
                }
            } else {
                improvements.push({
                    element: letter,
                    name: element.name,
                    text: `Add ${element.name}`,
                    tip: element.tip,
                    example: element.example
                });
            }
        }

        // Sort improvements by importance (core elements first)
        const coreElements = ['R', 'C', 'I', 'O']; // Request/Role, Context, Instructions/Instruction, Objective
        improvements.sort((a, b) => {
            const aCore = coreElements.includes(a.element) ? 0 : 1;
            const bCore = coreElements.includes(b.element) ? 0 : 1;
            return aCore - bCore;
        });

        return { improvements, strengths, frameworkName };
    }

    // Display scores with framework elements
    function displayScores(scores) {
        const { improvements, strengths, frameworkName } = scores.feedback;

        // Store for framework switching
        ScorerState.lastAnalysis = scores.frameworkResults;

        // Framework elements HTML
        const frameworkElementsHTML = generateFrameworkElementsHTML(scores.frameworkResults, ScorerState.selectedFramework);

        // Strengths HTML
        let strengthsHTML = '';
        if (strengths.length > 0) {
            strengthsHTML = `
                <div class="feedback-section feedback-strengths">
                    <h4>What You Did Well</h4>
                    <ul class="feedback-list">
                        ${strengths.map(s => `
                            <li>
                                <span class="element-badge element-badge-success">${s.element}</span>
                                <span class="feedback-text">${s.text}</span>
                            </li>
                        `).join('')}
                    </ul>
                </div>
            `;
        }

        // Improvements HTML
        let improvementsHTML = '';
        if (improvements.length > 0) {
            improvementsHTML = `
                <div class="feedback-section feedback-improvements">
                    <h4>How to Improve</h4>
                    <div class="feedback-cards">
                        ${improvements.slice(0, 4).map(i => `
                            <div class="feedback-card">
                                <div class="feedback-card-header">
                                    <span class="element-badge">${i.element}</span>
                                    <span class="feedback-category">${i.name}</span>
                                </div>
                                <p class="feedback-tip">${i.tip}</p>
                                <p class="feedback-example"><strong>Example:</strong> ${i.example}</p>
                            </div>
                        `).join('')}
                    </div>
                </div>
            `;
        }

        // Overall message
        let overallMessage = '';
        if (scores.overall >= 80) {
            overallMessage = '<p class="score-message score-message-great">Excellent prompt structure! You\'ve covered the key elements.</p>';
        } else if (scores.overall >= 60) {
            overallMessage = '<p class="score-message score-message-good">Good foundation! Adding a few more elements will strengthen your prompt.</p>';
        } else if (scores.overall >= 40) {
            overallMessage = '<p class="score-message score-message-fair">Your prompt has some elements but is missing key components.</p>';
        } else {
            overallMessage = '<p class="score-message score-message-poor">Your prompt needs more structure. Try adding the suggested elements below.</p>';
        }

        scoreDisplay.innerHTML = `
            <div class="score-main">
                <div class="score-circle ${getScoreClass(scores.overall)}">
                    <span class="score-value">${scores.overall}</span>
                    <span class="score-label">Overall</span>
                </div>
                ${overallMessage}
            </div>

            ${frameworkElementsHTML}

            <div class="sub-scores">
                <div class="sub-score">
                    <div class="sub-score-bar">
                        <div class="sub-score-fill ${getScoreClass(scores.frameworkCoverage)}" style="width: ${scores.frameworkCoverage}%"></div>
                    </div>
                    <span class="sub-score-label">Framework Coverage</span>
                    <span class="sub-score-value">${scores.frameworkCoverage}%</span>
                </div>
                <div class="sub-score">
                    <div class="sub-score-bar">
                        <div class="sub-score-fill ${getScoreClass(scores.sentenceQuality)}" style="width: ${scores.sentenceQuality}%"></div>
                    </div>
                    <span class="sub-score-label">Sentence Quality</span>
                    <span class="sub-score-value">${scores.sentenceQuality}%</span>
                </div>
                <div class="sub-score">
                    <div class="sub-score-bar">
                        <div class="sub-score-fill ${getScoreClass(scores.intentClarity)}" style="width: ${scores.intentClarity}%"></div>
                    </div>
                    <span class="sub-score-label">Intent Clarity</span>
                    <span class="sub-score-value">${scores.intentClarity}%</span>
                </div>
            </div>
            ${strengthsHTML}
            ${improvementsHTML}
            <div class="feedback-cta">
                <p>Want to learn more about these frameworks?</p>
                <div class="feedback-cta-links">
                    <a href="../learn/crisp.html" class="btn btn-outline btn-sm">CRISP Method</a>
                    <a href="../learn/costar.html" class="btn btn-outline btn-sm">COSTAR Method</a>
                    <a href="../learn/crispe.html" class="btn btn-outline btn-sm">CRISPE Method</a>
                </div>
            </div>
        `;
        scoreDisplay.classList.add('visible');

        // Initialize framework tabs
        initFrameworkTabs();
    }

    // Generate framework elements display HTML
    function generateFrameworkElementsHTML(frameworkResults, selectedFramework) {
        const framework = frameworkResults[selectedFramework];
        if (!framework) return '';

        const elementsHTML = Object.entries(framework.detected).map(([letter, element]) => {
            const statusClass = element.found ? 'detected' : 'missing';
            const icon = element.found
                ? '<svg class="element-icon" viewBox="0 0 20 20" fill="currentColor"><path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"/></svg>'
                : '<svg class="element-icon" viewBox="0 0 20 20" fill="currentColor"><path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd"/></svg>';

            return `
                <div class="element-pill ${statusClass}" title="${element.found ? 'Detected' : element.tip}">
                    <span class="element-letter">${letter}</span>
                    <span class="element-name">${element.name}</span>
                    ${icon}
                </div>
            `;
        }).join('');

        return `
            <div class="framework-elements" id="framework-elements">
                <h4>Detected Framework Elements</h4>
                <div class="framework-selector">
                    <button type="button" class="framework-tab ${selectedFramework === 'CRISP' ? 'active' : ''}" data-framework="CRISP">CRISP</button>
                    <button type="button" class="framework-tab ${selectedFramework === 'COSTAR' ? 'active' : ''}" data-framework="COSTAR">COSTAR</button>
                    <button type="button" class="framework-tab ${selectedFramework === 'CRISPE' ? 'active' : ''}" data-framework="CRISPE">CRISPE</button>
                </div>
                <div class="elements-display" id="elements-display">
                    ${elementsHTML}
                </div>
                <p class="framework-coverage">${framework.coverage}/${framework.total} elements detected</p>
            </div>
        `;
    }

    // Initialize framework tab switching
    function initFrameworkTabs() {
        const tabs = document.querySelectorAll('.framework-tab');
        tabs.forEach(tab => {
            tab.addEventListener('click', () => {
                const framework = tab.dataset.framework;
                ScorerState.selectedFramework = framework;

                // Update active tab
                tabs.forEach(t => t.classList.remove('active'));
                tab.classList.add('active');

                // Update elements display
                if (ScorerState.lastAnalysis) {
                    updateFrameworkElements(ScorerState.lastAnalysis, framework);
                }
            });
        });
    }

    // Update framework elements display
    function updateFrameworkElements(frameworkResults, selectedFramework) {
        const container = document.getElementById('elements-display');
        const framework = frameworkResults[selectedFramework];
        if (!container || !framework) return;

        const elementsHTML = Object.entries(framework.detected).map(([letter, element]) => {
            const statusClass = element.found ? 'detected' : 'missing';
            const icon = element.found
                ? '<svg class="element-icon" viewBox="0 0 20 20" fill="currentColor"><path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"/></svg>'
                : '<svg class="element-icon" viewBox="0 0 20 20" fill="currentColor"><path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd"/></svg>';

            return `
                <div class="element-pill ${statusClass}" title="${element.found ? 'Detected' : element.tip}">
                    <span class="element-letter">${letter}</span>
                    <span class="element-name">${element.name}</span>
                    ${icon}
                </div>
            `;
        }).join('');

        container.innerHTML = elementsHTML;

        // Update coverage text
        const coverageText = document.querySelector('.framework-coverage');
        if (coverageText) {
            coverageText.textContent = `${framework.coverage}/${framework.total} elements detected`;
        }
    }

    // Guided mode functions
    function toggleGuidedMode(enabled) {
        const guidedToggle = document.getElementById('guided-mode-toggle');
        const guidedPanel = document.getElementById('guided-mode-panel');
        const promptInput = document.getElementById('prompt-input');
        const inputLabel = document.querySelector('label[for="prompt-input"]');

        if (!guidedToggle || !guidedPanel) return;

        ScorerState.mode = enabled ? 'guided' : 'standard';
        guidedToggle.setAttribute('aria-pressed', enabled);

        const toggleText = guidedToggle.querySelector('.toggle-text');
        if (toggleText) {
            toggleText.textContent = enabled ? 'Switch to free-form mode' : 'Help me build this prompt';
        }

        if (enabled) {
            guidedPanel.hidden = false;
            if (inputLabel) inputLabel.textContent = 'Combined prompt (editable):';
            if (promptInput) promptInput.placeholder = 'Your combined prompt will appear here. You can edit it before analyzing.';
        } else {
            guidedPanel.hidden = true;
            if (inputLabel) inputLabel.textContent = 'Enter your prompt:';
            if (promptInput) promptInput.placeholder = 'Paste or type your prompt here...';
        }

        localStorage.setItem('scorer-mode', ScorerState.mode);
    }

    // Render guided questions for selected methodology
    function renderGuidedQuestions(methodology) {
        const container = document.getElementById('guided-questions');
        if (!container) return;

        const questions = GUIDED_QUESTIONS[methodology];
        if (!questions) return;

        // Clear current answers when switching methodology
        ScorerState.guidedAnswers = {};

        let html = '';
        questions.forEach(q => {
            const fullWidthClass = q.fullWidth ? ' data-fullwidth="true"' : '';
            const optionalClass = q.optional ? ' guided-letter-optional' : '';
            html += `
                <div class="guided-question" data-element="${q.key}"${fullWidthClass}>
                    <label for="guided-${q.key}" class="guided-label">
                        <span class="guided-letter${optionalClass}">${q.letter}</span>
                        ${q.label}${q.optional ? ' (optional)' : ''}
                    </label>
                    <textarea id="guided-${q.key}" class="guided-input"
                        placeholder="${q.placeholder}" rows="2"></textarea>
                </div>
            `;
        });

        container.innerHTML = html;

        // Reattach input listeners
        container.querySelectorAll('.guided-input').forEach(input => {
            input.addEventListener('input', (e) => {
                const element = e.target.closest('.guided-question')?.dataset.element;
                if (element) {
                    ScorerState.guidedAnswers[element] = e.target.value;
                }
            });
        });
    }

    function combineGuidedAnswers() {
        const promptInput = document.getElementById('prompt-input');
        if (!promptInput) return;

        const methodology = ScorerState.guidedMethodology;
        const answers = ScorerState.guidedAnswers;
        const questions = GUIDED_QUESTIONS[methodology];

        // Build combined prompt naturally without labels
        let parts = [];

        // Order and combine based on methodology
        if (methodology === 'CRISP') {
            if (answers.context?.trim()) parts.push(answers.context.trim());
            if (answers.request?.trim()) parts.push(answers.request.trim());
            if (answers.instructions?.trim()) parts.push(answers.instructions.trim());
            if (answers.style?.trim()) parts.push(`Use a ${answers.style.trim()} tone.`);
            if (answers.parameters?.trim()) parts.push(answers.parameters.trim());
        } else if (methodology === 'COSTAR') {
            if (answers.context?.trim()) parts.push(answers.context.trim());
            if (answers.objective?.trim()) parts.push(`My goal is to ${answers.objective.trim()}.`);
            if (answers.audience?.trim()) parts.push(`This is for ${answers.audience.trim()}.`);
            if (answers.style?.trim() || answers.tone?.trim()) {
                const styleText = [answers.style?.trim(), answers.tone?.trim()].filter(Boolean).join(', ');
                parts.push(`Use a ${styleText} tone.`);
            }
            if (answers.response?.trim()) parts.push(`Format as ${answers.response.trim()}.`);
        } else if (methodology === 'CRISPE') {
            if (answers.role?.trim()) parts.push(`Act as ${answers.role.trim()}.`);
            if (answers.context?.trim()) parts.push(answers.context.trim());
            if (answers.instruction?.trim()) parts.push(answers.instruction.trim());
            if (answers.style?.trim()) parts.push(`Use a ${answers.style.trim()} tone.`);
            if (answers.parameters?.trim()) parts.push(answers.parameters.trim());
            if (answers.example?.trim()) parts.push(`Example: ${answers.example.trim()}`);
        }

        const combined = parts.join('\n\n');
        promptInput.value = combined;
        promptInput.focus();

        if (combined.trim()) {
            showToast('Prompt combined! Edit if needed, then click Analyze.', 'success');
        } else {
            showToast('Please fill in at least one field.', 'error');
        }
    }

    // Initialize scorer enhancements
    function initScorerEnhancements() {
        const guidedToggle = document.getElementById('guided-mode-toggle');
        const combineBtn = document.getElementById('combine-prompt-btn');
        const methodologyBtns = document.querySelectorAll('.methodology-btn');

        // Load saved mode preference
        const savedMode = localStorage.getItem('scorer-mode');
        const savedMethodology = localStorage.getItem('scorer-methodology') || 'CRISP';

        ScorerState.guidedMethodology = savedMethodology;

        // Render initial questions
        renderGuidedQuestions(savedMethodology);

        // Update active methodology button
        methodologyBtns.forEach(btn => {
            if (btn.dataset.method === savedMethodology) {
                btn.classList.add('active');
            } else {
                btn.classList.remove('active');
            }
        });

        if (savedMode === 'guided') {
            toggleGuidedMode(true);
        }

        // Toggle button
        if (guidedToggle) {
            guidedToggle.addEventListener('click', () => {
                const newState = ScorerState.mode === 'standard';
                toggleGuidedMode(newState);
            });
        }

        // Methodology selector buttons
        methodologyBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                const method = btn.dataset.method;
                ScorerState.guidedMethodology = method;
                localStorage.setItem('scorer-methodology', method);

                // Update active state
                methodologyBtns.forEach(b => b.classList.remove('active'));
                btn.classList.add('active');

                // Re-render questions
                renderGuidedQuestions(method);
            });
        });

        // Combine button
        if (combineBtn) {
            combineBtn.addEventListener('click', combineGuidedAnswers);
        }
    }

    // Initialize scorer
    const scorerForm = document.getElementById('scorer-form');
    const promptInput = document.getElementById('prompt-input');
    const scoreDisplay = document.getElementById('score-display');

    if (scorerForm && promptInput && scoreDisplay) {
        scorerForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const prompt = promptInput.value.trim();

            if (prompt.length < 10) {
                showToast('Please enter a longer prompt to analyze', 'error');
                return;
            }

            const scores = analyzePrompt(prompt);
            displayScores(scores);
        });

        // Initialize guided mode enhancements
        initScorerEnhancements();
    }

    function getScoreClass(score) {
        if (score >= 80) return 'score-excellent';
        if (score >= 60) return 'score-good';
        if (score >= 40) return 'score-fair';
        return 'score-poor';
    }

    // ==========================================
    // TOOL PAGE: PREFLIGHT CHECKLIST
    // ==========================================
    const checklistForm = document.getElementById('checklist-form');

    if (checklistForm) {
        const checkboxes = checklistForm.querySelectorAll('input[type="checkbox"]');
        const progressBar = document.querySelector('.checklist-progress-fill');
        const progressText = document.querySelector('.checklist-progress-text');

        function updateProgress() {
            const total = checkboxes.length;
            const checked = Array.from(checkboxes).filter(cb => cb.checked).length;
            const percent = Math.round((checked / total) * 100);

            if (progressBar) progressBar.style.width = percent + '%';
            if (progressText) progressText.textContent = `${checked}/${total} Complete`;
        }

        checkboxes.forEach(cb => {
            cb.addEventListener('change', updateProgress);
        });

        updateProgress();
    }

    // ==========================================
    // TOOL PAGE: HALLUCINATION SPOTTER
    // ==========================================
    const hallucinationGame = document.getElementById('hallucination-game');

    if (hallucinationGame) {
        const statements = [
            { text: "The Great Wall of China is visible from space with the naked eye.", isTrue: false, explanation: "This is a common misconception. The Great Wall is not visible from space without aid." },
            { text: "Honey never spoils and edible honey has been found in ancient Egyptian tombs.", isTrue: true, explanation: "True! Honey's low moisture content and acidic pH make it resistant to bacteria." },
            { text: "Goldfish have a memory span of only 3 seconds.", isTrue: false, explanation: "False! Studies show goldfish can remember things for months." },
            { text: "Lightning never strikes the same place twice.", isTrue: false, explanation: "False! Tall buildings like the Empire State Building get struck multiple times per year." },
            { text: "The Eiffel Tower can grow up to 6 inches taller in summer due to thermal expansion.", isTrue: true, explanation: "True! Metal expands in heat, making the tower grow slightly in warm weather." },
            { text: "Humans only use 10% of their brains.", isTrue: false, explanation: "False! Brain imaging shows we use virtually all parts of our brain." },
            { text: "Octopuses have three hearts.", isTrue: true, explanation: "True! Two pump blood to the gills, one pumps it to the rest of the body." },
            { text: "The Amazon River is the longest river in the world.", isTrue: false, explanation: "False! The Nile River is generally considered the longest, though this is debated." }
        ];

        let currentIndex = 0;
        let score = 0;
        let shuffledStatements = [...statements].sort(() => Math.random() - 0.5);

        const statementText = hallucinationGame.querySelector('.statement-text');
        const trueBtn = hallucinationGame.querySelector('.btn-true');
        const falseBtn = hallucinationGame.querySelector('.btn-false');
        const resultDisplay = hallucinationGame.querySelector('.result-display');
        const scoreDisplay = hallucinationGame.querySelector('.game-score');
        const progressDisplay = hallucinationGame.querySelector('.game-progress');

        function showStatement() {
            if (currentIndex >= shuffledStatements.length) {
                showFinalScore();
                return;
            }

            const current = shuffledStatements[currentIndex];
            statementText.textContent = current.text;
            resultDisplay.classList.remove('visible', 'correct', 'incorrect');
            trueBtn.disabled = false;
            falseBtn.disabled = false;
            progressDisplay.textContent = `${currentIndex + 1}/${shuffledStatements.length}`;
        }

        function checkAnswer(userAnswer) {
            const current = shuffledStatements[currentIndex];
            const isCorrect = userAnswer === current.isTrue;

            if (isCorrect) {
                score++;
                resultDisplay.classList.add('correct');
                resultDisplay.innerHTML = `<strong>Correct!</strong> ${current.explanation}`;
            } else {
                resultDisplay.classList.add('incorrect');
                resultDisplay.innerHTML = `<strong>Incorrect.</strong> ${current.explanation}`;
            }

            resultDisplay.classList.add('visible');
            trueBtn.disabled = true;
            falseBtn.disabled = true;
            scoreDisplay.textContent = `Score: ${score}`;

            setTimeout(() => {
                currentIndex++;
                showStatement();
            }, 3000);
        }

        function showFinalScore() {
            const percent = Math.round((score / shuffledStatements.length) * 100);
            statementText.innerHTML = `
                <div class="final-score">
                    <h3>Game Complete!</h3>
                    <p class="score-big">${score}/${shuffledStatements.length}</p>
                    <p>${percent}% accuracy</p>
                    <button class="btn btn-primary" onclick="location.reload()">Play Again</button>
                </div>
            `;
            trueBtn.style.display = 'none';
            falseBtn.style.display = 'none';
        }

        if (trueBtn && falseBtn) {
            trueBtn.addEventListener('click', () => checkAnswer(true));
            falseBtn.addEventListener('click', () => checkAnswer(false));
            showStatement();
        }
    }

    // ==========================================
    // QUIZ: OPERATIONAL READINESS
    // Version 2.0 - 10 balanced questions with pillar tracking
    // ==========================================
    const quizContainer = document.getElementById('readiness-quiz');

    if (quizContainer) {
        console.log('Quiz v2.0 loaded - 10 questions with pillar tracking');

        // 10 Questions with progressive difficulty and pillar mapping
        // All options balanced in length, plausible distractors, varied correct positions
        const questions = [
            // Q1: Basics / Communicate
            {
                question: "What's the most important first step when preparing to use AI for a task?",
                options: [
                    "Find a template prompt that worked for someone else",
                    "Clarify your goal and what information the AI needs",
                    "Choose between different AI models and platforms",
                    "Think about how to verify the AI's eventual output"
                ],
                correct: 1,
                difficulty: "basics",
                pillar: "communicate"
            },
            // Q2: Basics / Think
            {
                question: "Which statement about AI accuracy is correct?",
                options: [
                    "Well-structured prompts guarantee accurate responses",
                    "AI errors mainly come from user prompting mistakes",
                    "AI can be confidently wrong due to training limits",
                    "Premium AI subscriptions eliminate accuracy issues"
                ],
                correct: 2,
                difficulty: "basics",
                pillar: "think"
            },
            // Q3: CRISP / Communicate
            {
                question: "In the CRISP framework, 'Parameters' refers to:",
                options: [
                    "Technical settings like temperature and tokens",
                    "The AI's internal configuration and version",
                    "Constraints like format, length, and requirements",
                    "Variables the AI uses during text generation"
                ],
                correct: 2,
                difficulty: "crisp",
                pillar: "communicate"
            },
            // Q4: CRISP / Iterate
            {
                question: "Your prompt returns content that's too formal and wordy. The best approach is to:",
                options: [
                    "Add 'be casual' at the end of your prompt",
                    "Generate multiple responses and pick the best",
                    "Switch to a different AI model for casual content",
                    "Rewrite the prompt specifying tone and length upfront"
                ],
                correct: 3,
                difficulty: "crisp",
                pillar: "iterate"
            },
            // Q5: CRISPE / Communicate
            {
                question: "In CRISPE, assigning a Role to the AI helps because it:",
                options: [
                    "Sets the expertise level and perspective for responses",
                    "Gives the AI permission to access special knowledge",
                    "Makes the AI more confident in its answers",
                    "Unlocks advanced capabilities within the model"
                ],
                correct: 0,
                difficulty: "crispe",
                pillar: "communicate"
            },
            // Q6: CRISPE / Communicate
            {
                question: "Few-shot prompting (providing examples) is most valuable when:",
                options: [
                    "You want the AI to be more creative and original",
                    "The AI doesn't understand your topic area well",
                    "You need output in a specific format or style",
                    "Your prompt is too short and needs more content"
                ],
                correct: 2,
                difficulty: "crispe",
                pillar: "communicate"
            },
            // Q7: COSTAR / Think
            {
                question: "Why does COSTAR specifically include 'Audience' as an element?",
                options: [
                    "To help track who reads the content for analytics",
                    "Technical level affects how content should be written",
                    "To ensure the AI uses appropriately formal language",
                    "To comply with accessibility standards in outputs"
                ],
                correct: 1,
                difficulty: "costar",
                pillar: "think"
            },
            // Q8: COSTAR / Spot
            {
                question: "AI output includes technical jargon for a beginner audience. This happened because:",
                options: [
                    "The AI defaulted to its training data's typical style",
                    "Technical topics inherently require specialized terms",
                    "The prompt didn't specify the audience's knowledge level",
                    "The AI couldn't simplify the complex concepts enough"
                ],
                correct: 2,
                difficulty: "costar",
                pillar: "spot"
            },
            // Q9: Advanced / Spot
            {
                question: "AI states a specific statistic with confidence. Your best response is to:",
                options: [
                    "Trust it if the AI expressed high certainty",
                    "Verify it—AI can confidently fabricate details",
                    "Assume it's outdated and search for newer data",
                    "Ask the AI to cite the source for validation"
                ],
                correct: 1,
                difficulty: "advanced",
                pillar: "spot"
            },
            // Q10: Advanced / Iterate
            {
                question: "Chain-of-thought prompting improves AI output by:",
                options: [
                    "Making the AI process your request more slowly",
                    "Connecting your prompt to relevant training data",
                    "Allowing the AI to ask you clarifying questions",
                    "Revealing reasoning steps for easier verification"
                ],
                correct: 3,
                difficulty: "advanced",
                pillar: "iterate"
            }
        ];

        let currentQuestion = 0;
        let quizScore = 0;
        let pillarScores = {
            communicate: { correct: 0, total: 0 },
            think: { correct: 0, total: 0 },
            spot: { correct: 0, total: 0 },
            iterate: { correct: 0, total: 0 }
        };

        const pillarNames = {
            communicate: "Communicate Clearly",
            think: "Think Critically",
            spot: "Spot Problems",
            iterate: "Iterate & Improve"
        };

        function renderQuestion() {
            if (currentQuestion >= questions.length) {
                showQuizResults();
                return;
            }

            const q = questions[currentQuestion];
            quizContainer.innerHTML = `
                <div class="quiz-progress">
                    <div class="quiz-progress-fill" style="width: ${(currentQuestion / questions.length) * 100}%"></div>
                </div>
                <div class="quiz-question">
                    <span class="question-number">Question ${currentQuestion + 1} of ${questions.length}</span>
                    <h3>${q.question}</h3>
                </div>
                <div class="quiz-options">
                    ${q.options.map((opt, i) => `
                        <button class="quiz-option" data-index="${i}">${opt}</button>
                    `).join('')}
                </div>
            `;

            quizContainer.querySelectorAll('.quiz-option').forEach(btn => {
                btn.addEventListener('click', () => selectAnswer(parseInt(btn.dataset.index)));
            });
        }

        function selectAnswer(index) {
            const q = questions[currentQuestion];
            const buttons = quizContainer.querySelectorAll('.quiz-option');

            buttons.forEach((btn, i) => {
                btn.disabled = true;
                if (i === q.correct) {
                    btn.classList.add('correct');
                } else if (i === index && i !== q.correct) {
                    btn.classList.add('incorrect');
                }
            });

            // Track pillar scores
            pillarScores[q.pillar].total++;
            if (index === q.correct) {
                quizScore++;
                pillarScores[q.pillar].correct++;
            }

            setTimeout(() => {
                currentQuestion++;
                renderQuestion();
            }, 1500);
        }

        function showQuizResults() {
            const percent = Math.round((quizScore / questions.length) * 100);
            let level, message, recommendedPath;

            if (percent >= 90) {
                level = 'Expert';
                message = 'Excellent! You have mastered AI prompting. Explore advanced patterns to stay sharp.';
                recommendedPath = '../patterns/index.html';
            } else if (percent >= 70) {
                level = 'Proficient';
                message = 'Strong skills! Review advanced techniques like ReAct and chain-of-thought to reach expert level.';
                recommendedPath = '../learn/advanced.html';
            } else if (percent >= 50) {
                level = 'Intermediate';
                message = 'Good foundation! Study COSTAR and CRISPE frameworks to improve your structured prompting.';
                recommendedPath = '../learn/costar.html';
            } else {
                level = 'Beginner';
                message = 'Great starting point! Begin with Prompt Basics and work up to the CRISP method.';
                recommendedPath = '../learn/prompt-basics.html';
            }

            // Build pillar breakdown HTML
            let pillarBreakdown = '<div class="pillar-results"><h4>Performance by Skill Area</h4>';
            for (const [key, scores] of Object.entries(pillarScores)) {
                if (scores.total > 0) {
                    pillarBreakdown += `
                        <div class="pillar-result">
                            <span class="pillar-name">${pillarNames[key]}</span>
                            <span class="pillar-score">${scores.correct}/${scores.total}</span>
                        </div>
                    `;
                }
            }
            pillarBreakdown += '</div>';

            quizContainer.innerHTML = `
                <div class="quiz-results">
                    <div class="result-score">${quizScore}/${questions.length}</div>
                    <div class="result-percent">${percent}%</div>
                    <div class="result-level">${level} Level</div>
                    <p class="result-message">${message}</p>
                    ${pillarBreakdown}
                    <div class="result-actions">
                        <button class="btn btn-primary" onclick="location.reload()">Retake Quiz</button>
                        <a href="${recommendedPath}" class="btn btn-secondary">Start Learning</a>
                    </div>
                </div>
            `;
        }

        renderQuestion();
    }

    // ==========================================
    // PATTERN LIBRARY FILTERING
    // ==========================================
    const patternFilter = document.querySelector('.pattern-filter');
    const patternCards = document.querySelectorAll('.pattern-card');

    if (patternFilter && patternCards.length > 0) {
        const filterButtons = patternFilter.querySelectorAll('.filter-btn');

        filterButtons.forEach(btn => {
            btn.addEventListener('click', () => {
                const category = btn.dataset.filter;

                // Update active button
                filterButtons.forEach(b => b.classList.remove('active'));
                btn.classList.add('active');

                // Filter cards
                patternCards.forEach(card => {
                    if (category === 'all' || card.dataset.category === category) {
                        card.style.display = '';
                        card.classList.add('visible');
                    } else {
                        card.style.display = 'none';
                    }
                });
            });
        });
    }

    // ==========================================
    // COPY TO CLIPBOARD
    // ==========================================
    document.querySelectorAll('.btn-copy').forEach(btn => {
        btn.addEventListener('click', () => {
            const target = btn.dataset.target;
            const text = document.querySelector(target)?.textContent;

            if (text) {
                navigator.clipboard.writeText(text)
                    .then(() => showToast('Copied to clipboard!', 'success'))
                    .catch(() => showToast('Failed to copy', 'error'));
            }
        });
    });

    // ==========================================
    // ACCORDION
    // ==========================================
    document.querySelectorAll('.accordion-header').forEach(header => {
        header.addEventListener('click', () => {
            const item = header.parentElement;
            const isActive = item.classList.contains('active');

            // Close all other accordions in the same container
            const container = item.parentElement;
            container.querySelectorAll('.accordion-item').forEach(acc => {
                acc.classList.remove('active');
            });

            // Toggle current
            if (!isActive) {
                item.classList.add('active');
            }
        });
    });

    // ==========================================
    // TABS
    // ==========================================
    document.querySelectorAll('.tabs').forEach(tabContainer => {
        const tabButtons = tabContainer.querySelectorAll('.tab-btn');
        const tabPanels = tabContainer.querySelectorAll('.tab-panel');

        tabButtons.forEach(btn => {
            btn.addEventListener('click', () => {
                const targetId = btn.dataset.tab;

                // Update buttons
                tabButtons.forEach(b => b.classList.remove('active'));
                btn.classList.add('active');

                // Update panels
                tabPanels.forEach(panel => {
                    panel.classList.toggle('active', panel.id === targetId);
                });
            });
        });
    });

    // ==========================================
    // KEYBOARD SHORTCUTS
    // ==========================================
    document.addEventListener('keydown', (e) => {
        // Ctrl/Cmd + K for search (if search exists)
        if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
            e.preventDefault();
            // Future: open search modal
        }
    });

    console.log('Praxis initialized');
});
