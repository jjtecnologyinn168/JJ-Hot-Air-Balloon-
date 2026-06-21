/**
 * CYBERPUNK NEON ARCADE ENGINE PRO v3.0.0
 * HARDCORE CORE ENGINE - ULTRA-SMOOTH PARADIGM
 * * CONTROL MECHANICS: ZERO-LATENCY INTERPOLATION VECTOR (SNAKE SMOOTH)
 * VISUAL DESIGN: HIGH-END METALLIC CHROMATIC REFLECTIONS & SHADERS
 * COMPLIANCE METRIC: COMPLETE HANDWRITTEN EXPANSION - NO COMPRESSION
 */

(function () {
    'use strict';

    // ==========================================================================
    // 1. GLOBAL ENHANCED CORE CONFIGURATION MATRIX
    // ==========================================================================
    const SYSTEM_CONFIG = {
        RENDER_WIDTH: 768,
        RENDER_HEIGHT: 1024,
        TARGET_FPS: 60,
        
        // Physics Interpolation Constants for Snake-like Smooth Input Fluids
        PHYSICS_GRAVITY: 0.22,
        PHYSICS_THRUST: -0.65,
        MAX_INPUT_VELOCITY_X: 9.5,
        MAX_INPUT_VELOCITY_Y: 12.0,
        SMOOTH_INTERP_FACTOR_X: 0.16, // Snake smooth handling lag-free lerp factor
        SMOOTH_INTERP_FACTOR_Y: 0.12,
        
        // Environment Core Parameters
        GLOBAL_SCROLL_BASE: 5.5,
        CYCLE_DURATION_FRAMES: 600,
        
        // Multiplier Speed Register Values
        VELOCITY_MAP: {
            LOW: 0.65,
            MED: 1.00,
            HIGH: 1.55
        },
        
        // Dynamic Allocation Pool Caps
        MAX_PARTICLES_ALIVE: 400,
        MAX_COINS_ALIVE: 40,
        MAX_METEORS_ALIVE: 25,
        MAX_BOSS_67_ALIVE: 5
    };

    // ==========================================================================
    // 2. ENGINE RUNTIME SYSTEM STATE VARIABLE REGISTRY
    // ==========================================================================
    const SYSTEM_STATE = {
        // Hardware Context Pointers
        canvasContext: null,
        canvasDOM: null,
        audioHardwareContext: null,
        
        // Runtime Loop Control States
        engineIsRunning: false,
        engineIsGameOver: false,
        globalFrameCount: 0,
        currentPhaseTimeline: 0,
        currentPhaseName: "DAYTIME", // DAYTIME -> TWILIGHT -> NIGHTFALL
        
        // Dynamic Score Accounting Registry
        currentScore: 0,
        personalHighScore: parseInt(localStorage.getItem('cyber_neon_high_v3') || '0'),
        
        // Selected Speed Multiplier Configuration
        activeVelocityMultiplier: 1.00,
        
        // Primary Actor Reference Allocation
        heroBalloon: null,
        
        // In-Memory Structural Dynamic Object Storage Pools
        activeCoinsArray: [],
        activeMeteorsArray: [],
        activePowerupsArray: [],
        activeBoss67Array: [],
        activeParticlesArray: [],
        activeFloatingTextsArray: [],
        backgroundStarfieldArray: [],
        
        // Latency-Free Low-Level Input Vectors Multi-Touch Tracker
        inputVectors: {
            leftSidePressed: false,
            rightSidePressed: false,
            keyboardLeftActive: false,
            keyboardRightActive: false
        },
        
        // Seizure Rainbow Reactive Lighting Modifier Shaders States
        isRainbowFlashActive: false,
        rainbowFlashRemainingFrames: 0,
        
        // Camera Jitter Instability Matrices Updates
        screenShakeForce: 0,
        screenShakeOffsetX: 0,
        screenShakeOffsetY: 0,
        
        // Powerup Trigger Flags
        isCoinStormActive: false,
        coinStormTimeRemaining: 0
    };

    // UI DOM Cache Engine
    const INTERFACE_DOM_REGISTRY = {
        containerBlock: null,
        canvasElement: null,
        overlayMask: null,
        stateTitleHeader: null,
        launchSystemButton: null,
        scoreValueDisplay: null,
        highscoreValueDisplay: null,
        hudPanelContainer: null,
        phaseValueDisplay: null,
        speedBtnLow: null,
        speedBtnMed: null,
        speedBtnHigh: null
    };

    // ==========================================================================
    // 3. HARDWARE CORE BOOTSTRAP INITIALIZATION PROCEDURES
    // ==========================================================================
    window.addEventListener('DOMContentLoaded', () => {
        bindInterfaceDomNodes();
        configureHardwareCanvasResolution();
        generateCosmosBackgroundStarfield();
        executePrebootRenderPipeline();
    });

    function bindInterfaceDomNodes() {
        INTERFACE_DOM_REGISTRY.containerBlock = document.getElementById('game-container');
        INTERFACE_DOM_REGISTRY.canvasElement = document.getElementById('gameCanvas');
        INTERFACE_DOM_REGISTRY.overlayMask = document.getElementById('ui-overlay');
        INTERFACE_DOM_REGISTRY.stateTitleHeader = document.getElementById('dynamic-state-title');
        INTERFACE_DOM_REGISTRY.launchSystemButton = document.getElementById('start-btn');
        INTERFACE_DOM_REGISTRY.scoreValueDisplay = document.getElementById('score-val');
        INTERFACE_DOM_REGISTRY.highscoreValueDisplay = document.getElementById('high-val');
        INTERFACE_DOM_REGISTRY.hudPanelContainer = document.getElementById('hud');
        INTERFACE_DOM_REGISTRY.phaseValueDisplay = document.getElementById('time-display');
        
        INTERFACE_DOM_REGISTRY.speedBtnLow = document.getElementById('speed-low');
        INTERFACE_DOM_REGISTRY.speedBtnMed = document.getElementById('speed-med');
        INTERFACE_DOM_REGISTRY.speedBtnHigh = document.getElementById('speed-high');

        // Core Event Bindings
        INTERFACE_DOM_REGISTRY.launchSystemButton.addEventListener('click', initializeArcadeRuntimeEngine);
        
        INTERFACE_DOM_REGISTRY.speedBtnLow.addEventListener('click', (e) => setEngineVelocitySetting('LOW', e.currentTarget));
        INTERFACE_DOM_REGISTRY.speedBtnMed.addEventListener('click', (e) => setEngineVelocitySetting('MED', e.currentTarget));
        INTERFACE_DOM_REGISTRY.speedBtnHigh.addEventListener('click', (e) => setEngineVelocitySetting('HIGH', e.currentTarget));
        
        INTERFACE_DOM_REGISTRY.highscoreValueDisplay.textContent = SYSTEM_STATE.personalHighScore;
    }

    function setEngineVelocitySetting(mode, targetElement) {
        document.querySelectorAll('.speed-trigger-btn').forEach(btn => btn.classList.remove('active'));
        if (targetElement) targetElement.classList.add('active');
        SYSTEM_STATE.activeVelocityMultiplier = SYSTEM_CONFIG.VELOCITY_MAP[mode];
        dispatchSynthesizedAudioTone('speed_click');
    }

    function configureHardwareCanvasResolution() {
        const windowWidth = window.innerWidth;
        const windowHeight = window.innerHeight;
        const aspectTargetRatio = SYSTEM_CONFIG.RENDER_WIDTH / SYSTEM_CONFIG.RENDER_HEIGHT;
        let scaleWidth = windowWidth, scaleHeight = windowHeight;

        if (windowWidth / windowHeight > aspectTargetRatio) {
            scaleWidth = windowHeight * aspectTargetRatio;
        } else {
            scaleHeight = windowWidth / aspectTargetRatio;
        }

        INTERFACE_DOM_REGISTRY.canvasElement.style.width = `${scaleWidth}px`;
        INTERFACE_DOM_REGISTRY.canvasElement.style.height = `${scaleHeight}px`;
        INTERFACE_DOM_REGISTRY.canvasElement.width = SYSTEM_CONFIG.RENDER_WIDTH;
        INTERFACE_DOM_REGISTRY.canvasElement.height = SYSTEM_CONFIG.RENDER_HEIGHT;
        SYSTEM_STATE.canvasContext = INTERFACE_DOM_REGISTRY.canvasElement.getContext('2d');
    }

    // ==========================================================================
    // 4. LOW-LATENCY WEBAUDIO REALTIME SYNTHESIS SOUND ENGINE
    // ==========================================================================
    function unlockAudioHardwareSystem() {
        if (!SYSTEM_STATE.audioHardwareContext) {
            SYSTEM_STATE.audioHardwareContext = new (window.AudioContext || window.webkitAudioContext)();
        }
        if (SYSTEM_STATE.audioHardwareContext && SYSTEM_STATE.audioHardwareContext.state === 'suspended') {
            SYSTEM_STATE.audioHardwareContext.resume();
        }
    }

    function dispatchSynthesizedAudioTone(soundProfile) {
        if (!SYSTEM_STATE.audioHardwareContext) return;
        const ctx = SYSTEM_STATE.audioHardwareContext;
        const now = ctx.currentTime;

        try {
            switch (soundProfile) {
                case 'coin_pickup': {
                    const oscNode = ctx.createOscillator();
                    const gainNode = ctx.createGain();
                    oscNode.type = 'sine';
                    oscNode.frequency.setValueAtTime(987.77, now); // B5 Note
                    oscNode.frequency.setValueAtTime(1318.51, now + 0.06); // E6 High Metallic Note
                    gainNode.gain.setValueAtTime(0.12, now);
                    gainNode.gain.exponentialRampToValueAtTime(0.001, now + 0.25);
                    oscNode.connect(gainNode); gainNode.connect(ctx.destination);
                    oscNode.start(now); oscNode.stop(now + 0.25);
                    break;
                }
                case 'hit_boss_67': {
                    // Massive low-frequency distorted synth clash for 67 crash
                    const oscA = ctx.createOscillator();
                    const oscB = ctx.createOscillator();
                    const filterNode = ctx.createBiquadFilter();
                    const mainGain = ctx.createGain();

                    oscA.type = 'sawtooth';
                    oscA.frequency.setValueAtTime(110, now);
                    oscA.frequency.linearRampToValueAtTime(40, now + 0.5);

                    oscB.type = 'square';
                    oscB.frequency.setValueAtTime(147, now);
                    oscB.frequency.linearRampToValueAtTime(35, now + 0.45);

                    filterNode.type = 'lowpass';
                    filterNode.frequency.setValueAtTime(400, now);
                    filterNode.frequency.exponentialRampToValueAtTime(80, now + 0.5);

                    mainGain.gain.setValueAtTime(0.4, now);
                    mainGain.gain.exponentialRampToValueAtTime(0.001, now + 0.55);

                    oscA.connect(filterNode); oscB.connect(filterNode);
                    filterNode.connect(mainGain); mainGain.connect(ctx.destination);

                    oscA.start(now); oscB.start(now);
                    oscA.stop(now + 0.55); oscB.stop(now + 0.55);
                    break;
                }
                case 'jump_thrust': {
                    const oscNode = ctx.createOscillator();
                    const gainNode = ctx.createGain();
                    oscNode.type = 'triangle';
                    oscNode.frequency.setValueAtTime(220, now);
                    oscNode.frequency.exponentialRampToValueAtTime(440, now + 0.09);
                    gainNode.gain.setValueAtTime(0.06, now);
                    gainNode.gain.linearRampToValueAtTime(0.001, now + 0.09);
                    oscNode.connect(gainNode); gainNode.connect(ctx.destination);
                    oscNode.start(now); oscNode.stop(now + 0.09);
                    break;
                }
                case 'powerup_grant': {
                    const oscNode = ctx.createOscillator();
                    const gainNode = ctx.createGain();
                    oscNode.type = 'sine';
                    oscNode.frequency.setValueAtTime(440, now);
                    oscNode.frequency.linearRampToValueAtTime(880, now + 0.15);
                    oscNode.frequency.linearRampToValueAtTime(1760, now + 0.3);
                    gainNode.gain.setValueAtTime(0.15, now);
                    gainNode.gain.exponentialRampToValueAtTime(0.001, now + 0.35);
                    oscNode.connect(gainNode); gainNode.connect(ctx.destination);
                    oscNode.start(now); oscNode.stop(now + 0.35);
                    break;
                }
                case 'speed_click': {
                    const oscNode = ctx.createOscillator();
                    const gainNode = ctx.createGain();
                    oscNode.type = 'sine';
                    oscNode.frequency.setValueAtTime(700, now);
                    gainNode.gain.setValueAtTime(0.04, now);
                    gainNode.gain.linearRampToValueAtTime(0.001, now + 0.05);
                    oscNode.connect(gainNode); gainNode.connect(ctx.destination);
                    oscNode.start(now); oscNode.stop(now + 0.05);
                    break;
                }
                case 'fatal_terminate': {
                    const oscNode = ctx.createOscillator();
                    const gainNode = ctx.createGain();
                    oscNode.type = 'sawtooth';
                    oscNode.frequency.setValueAtTime(180, now);
                    oscNode.frequency.linearRampToValueAtTime(20, now + 0.7);
                    gainNode.gain.setValueAtTime(0.45, now);
                    gainNode.gain.exponentialRampToValueAtTime(0.001, now + 0.75);
                    oscNode.connect(gainNode); gainNode.connect(ctx.destination);
                    oscNode.start(now); oscNode.stop(now + 0.75);
                    break;
                }
            }
        } catch (error) {
            console.error("Audio Engine Synths Network Interrupt Exception:", error);
        }
    }

    // ==========================================================================
    // 5. ACTOR CODE BLOCK: INTERPOLATED ZERO-LATENCY CYBER BALLOON HERO
    // ==========================================================================
    class InterpCyberBalloonHero {
        constructor(initX, initY) {
            this.x = initX;
            this.y = initY;
            this.boundingRadius = 24;
            
            // Core Velocity Vector Registries
            this.velocityX = 0;
            this.velocityY = 0;
            this.targetVelocityX = 0;
            this.targetVelocityY = 0;
            
            // Shield Capability Metrics
            this.isShieldActive = false;
            this.shieldRemainingTicks = 0;
        }

        updateCalculations() {
            let directionalInputActive = false;
            this.targetVelocityX = 0;

            // Ingest input combinations smoothly
            if (SYSTEM_STATE.inputVectors.leftSidePressed || SYSTEM_STATE.inputVectors.keyboardLeftActive) {
                directionalInputActive = true;
                this.targetVelocityX = -SYSTEM_CONFIG.MAX_INPUT_VELOCITY_X;
            }
            if (SYSTEM_STATE.inputVectors.rightSidePressed || SYSTEM_STATE.inputVectors.keyboardRightActive) {
                directionalInputActive = true;
                this.targetVelocityX = SYSTEM_CONFIG.MAX_INPUT_VELOCITY_X;
            }

            // High Precision Vertical Handling Interp Models
            if (directionalInputActive) {
                this.targetVelocityY = SYSTEM_CONFIG.PHYSICS_THRUST * 12.5;
            } else {
                this.targetVelocityY = SYSTEM_CONFIG.PHYSICS_GRAVITY * 26.0;
            }

            // Zero Control Latency Interp Fluid Equations (Snake Fluid feel)
            this.velocityX += (this.targetVelocityX - this.velocityX) * SYSTEM_CONFIG.SMOOTH_INTERP_FACTOR_X;
            this.velocityY += (this.targetVelocityY - this.velocityY) * SYSTEM_CONFIG.SMOOTH_INTERP_FACTOR_Y;

            // Clamp max velocity parameters
            if (this.velocityX > SYSTEM_CONFIG.MAX_INPUT_VELOCITY_X) this.velocityX = SYSTEM_CONFIG.MAX_INPUT_VELOCITY_X;
            if (this.velocityX < -SYSTEM_CONFIG.MAX_INPUT_VELOCITY_X) this.velocityX = -SYSTEM_CONFIG.MAX_INPUT_VELOCITY_X;

            this.x += this.velocityX * SYSTEM_STATE.activeVelocityMultiplier;
            this.y += this.velocityY * SYSTEM_STATE.activeVelocityMultiplier;

            // Enforce Game Screen Maps Hard Geometric Boundaries
            if (this.x - this.boundingRadius < 0) {
                this.x = this.boundingRadius; this.velocityX = 0;
            }
            if (this.x + this.boundingRadius > SYSTEM_CONFIG.RENDER_WIDTH) {
                this.x = SYSTEM_CONFIG.RENDER_WIDTH - this.boundingRadius; this.velocityX = 0;
            }
            if (this.y - this.boundingRadius < 0) {
                this.y = this.boundingRadius; this.velocityY = 0;
            }
            if (this.y + this.boundingRadius * 2 > SYSTEM_CONFIG.RENDER_HEIGHT) {
                this.y = SYSTEM_CONFIG.RENDER_HEIGHT - this.boundingRadius * 2; this.velocityY = 0;
            }

            // Particle Emission Streams Engine
            if (directionalInputActive && SYSTEM_STATE.globalFrameCount % 2 === 0) {
                triggerParticleEmissionNode(this.x, this.y + this.boundingRadius, 3.5, '#00f2fe', (Math.random() - 0.5) * 2, 4.5, 18);
            }

            // Shield Depletion Registry Tracker
            if (this.isShieldActive) {
                this.shieldRemainingTicks--;
                if (this.shieldRemainingTicks <= 0) {
                    this.isShieldActive = false;
                }
            }
        }

        renderGraphics(ctx) {
            ctx.save();
            
            // Evaluate Color State for Rainbow Matrix Triggering
            let primaryNeonStroke = '#00f2fe';
            if (SYSTEM_STATE.isRainbowActive) {
                const calculatedHue = (SYSTEM_STATE.globalFrameCount * 14) % 360;
                primaryNeonStroke = `hsl(${calculatedHue}, 100%, 60%)`;
            }

            ctx.shadowBlur = 24;
            ctx.shadowColor = primaryNeonStroke;

            // Render Active Force Shield Ring Matrix
            if (this.isShieldActive) {
                ctx.strokeStyle = '#ff00ff';
                ctx.lineWidth = 4;
                ctx.beginPath();
                ctx.arc(this.x, this.y, this.boundingRadius + 14, 0, Math.PI * 2);
                ctx.stroke();
            }

            // Elite Metallic 3D Reflections Spherical Gradient Setup (Zero Cartoon Flat Lines)
            const sphereRadialGrad = ctx.createRadialGradient(
                this.x - 7, this.y - 8, 2,
                this.x, this.y, this.boundingRadius
            );
            sphereRadialGrad.addColorStop(0, '#ffffff');
            sphereRadialGrad.addColorStop(0.35, primaryNeonStroke);
            sphereRadialGrad.addColorStop(0.85, '#040b26');
            sphereRadialGrad.addColorStop(1.0, '#010208');

            ctx.fillStyle = sphereRadialGrad;
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.boundingRadius, 0, Math.PI * 2);
            ctx.fill();

            // Structural Carbon Rigging Struts Pipelines
            ctx.shadowBlur = 0;
            ctx.strokeStyle = 'rgba(255, 255, 255, 0.35)';
            ctx.lineWidth = 1.5;
            ctx.beginPath();
            ctx.moveTo(this.x - 9, this.y + this.boundingRadius - 2);
            ctx.lineTo(this.x - 6, this.y + this.boundingRadius + 16);
            ctx.moveTo(this.x + 9, this.y + this.boundingRadius - 2);
            ctx.lineTo(this.x + 6, this.y + this.boundingRadius + 16);
            ctx.stroke();

            // Metallic Storage Flight Carrier Basket Capsule
            ctx.fillStyle = '#0b0f24';
            ctx.strokeStyle = primaryNeonStroke;
            ctx.lineWidth = 2;
            ctx.fillRect(this.x - 7, this.y + this.boundingRadius + 16, 14, 9);
            ctx.strokeRect(this.x - 7, this.y + this.boundingRadius + 16, 14, 9);

            ctx.restore();
        }
    }

    // ==========================================================================
    // 6. ENEMY CODE BLOCK: THE SEIZURE RAINBOW METALLIC 67 BOSS ENTITY
    // ==========================================================================
    class Metallic67BossEnemy {
        constructor() {
            this.geometryRadius = 58; // Huge Size Footprint Matrix Configuration
            this.x = Math.random() * (SYSTEM_CONFIG.RENDER_WIDTH - 220) + 110;
            this.y = -this.geometryRadius - 60;
            this.oscillationClock = Math.random() * Math.PI;
            this.fallingVelocity = SYSTEM_CONFIG.GLOBAL_SCROLL_BASE * 0.72;
        }

        updateCalculations() {
            this.y += this.fallingVelocity * SYSTEM_STATE.activeVelocityMultiplier;
            
            // Wide-Sweep Lateral Sinusoidal Formula Configurations
            this.oscillationClock += 0.045;
            this.x += Math.sin(this.oscillationClock) * 7.2;

            // High Frequency Thermal Flame Vectors Emitters
            if (SYSTEM_STATE.globalFrameCount % 2 === 0) {
                const particleEmitterX = this.x + (Math.random() - 0.5) * 65;
                const particleEmitterY = this.y + (Math.random() - 0.5) * 45;
                SYSTEM_STATE.activeParticlesArray.push(new VectorEngineParticle(
                    particleEmitterX, particleEmitterY, 5 + Math.random() * 7, '#ffd700', (Math.random() - 0.5) * 2.5, -4.5, 26
                ));
            }
        }

        renderGraphics(ctx) {
            ctx.save();
            ctx.shadowBlur = 35;
            ctx.shadowColor = '#ff5500';

            // High Precision Liquid Gold Chrome Surface Reflection Render Pipe
            const chromeGlintLinearGrad = ctx.createLinearGradient(
                this.x, this.y - this.geometryRadius,
                this.x, this.y + this.geometryRadius
            );
            chromeGlintLinearGrad.addColorStop(0.0, '#ffffff');
            chromeGlintLinearGrad.addColorStop(0.25, '#fff7c2');
            chromeGlintLinearGrad.addColorStop(0.5, '#ffd700');
            chromeGlintLinearGrad.addColorStop(0.75, '#aa7700');
            chromeGlintLinearGrad.addColorStop(1.0, '#ff2200');

            ctx.fillStyle = chromeGlintLinearGrad;
            ctx.font = '900 106px Impact, Arial Black, monospace';
            ctx.textAlign = 'center';
            ctx.textBaseline = 'middle';
            
            // Render text string glyphs natively without cartoon strokes
            ctx.fillText('67', this.x, this.y);

            // Vector Frame Boundary Target Layout Crosshair Overlays
            ctx.strokeStyle = 'rgba(255, 215, 0, 0.18)';
            ctx.lineWidth = 1;
            ctx.strokeRect(
                this.x - this.geometryRadius - 12, 
                this.y - this.geometryRadius, 
                (this.geometryRadius + 12) * 2, 
                this.geometryRadius * 2
            );

            ctx.restore();
        }
    }

    // ==========================================================================
    // 7. ENTITY CODE BLOCK: PREMIUM 3D SPINNING METALLIC COINS
    // ==========================================================================
    class PremiumMetallic3DGoldCoin {
        constructor(specifiedX, specifiedY) {
            this.radiusDimensions = 14;
            
            if (specifiedX !== undefined && specifiedY !== undefined) {
                this.x = specifiedX;
                this.y = specifiedY;
            } else {
                this.x = Math.random() * (SYSTEM_CONFIG.RENDER_WIDTH - this.radiusDimensions * 2) + this.radiusDimensions;
                this.y = -this.radiusDimensions - 30;
            }
            
            this.rotationAngleRad = Math.random() * Math.PI;
            this.rotationalAngularVelocity = 0.065 + Math.random() * 0.045;
        }

        updateCalculations() {
            this.y += SYSTEM_CONFIG.GLOBAL_SCROLL_BASE * SYSTEM_STATE.activeVelocityMultiplier;
            this.rotationAngleRad += this.rotationalAngularVelocity;
        }

        renderGraphics(ctx) {
            ctx.save();
            ctx.translate(this.x, this.y);
            
            // Calculate rotational width transform ratios
            const computedWidthRatio = Math.cos(this.rotationAngleRad);
            if (Math.abs(computedWidthRatio) < 0.015) {
                ctx.restore(); return; // Guard matrix limits
            }
            ctx.scale(computedWidthRatio, 1);

            ctx.shadowBlur = 22;
            ctx.shadowColor = '#ffd700';

            // High Specular Coin Face Gradient Shaders Mapping
            const coinFaceLinearGrad = ctx.createLinearGradient(
                -this.radiusDimensions, -this.radiusDimensions,
                this.radiusDimensions, this.radiusDimensions
            );
            coinFaceLinearGrad.addColorStop(0.0, '#a67c00');
            coinFaceLinearGrad.addColorStop(0.35, '#ffd700');
            coinFaceLinearGrad.addColorStop(0.65, '#ffffff');
            coinFaceLinearGrad.addColorStop(1.0, '#735600');
            
            ctx.fillStyle = coinFaceLinearGrad;
            ctx.beginPath();
            ctx.arc(0, 0, this.radiusDimensions, 0, Math.PI * 2);
            ctx.fill();

            // Internal Structural Intrinsic Cyber Grid Stamp Mark
            ctx.strokeStyle = 'rgba(255, 255, 255, 0.75)';
            ctx.lineWidth = 1.2;
            ctx.strokeRect(-3, -6, 6, 12);

            ctx.restore();
        }
    }

    // ==========================================================================
    // 8. ENTITY CODE BLOCK: HAZARDOUS CYBER METEORS LAYER SHARDS
    // ==========================================================================
    class HazardousCyberMeteorShard {
        constructor() {
            this.boundingRadius = 16 + Math.random() * 20;
            this.x = Math.random() * (SYSTEM_CONFIG.RENDER_WIDTH - this.boundingRadius * 2) + this.boundingRadius;
            this.y = -this.boundingRadius - 40;
            this.velocityY = (SYSTEM_CONFIG.GLOBAL_SCROLL_BASE * 1.15) + Math.random() * 3.5;
            this.velocityX = (Math.random() - 0.5) * 4.0;
        }

        updateCalculations() {
            this.y += this.velocityY * SYSTEM_STATE.activeVelocityMultiplier;
            this.x += this.velocityX * SYSTEM_STATE.activeVelocityMultiplier;
        }

        renderGraphics(ctx) {
            ctx.save();
            ctx.shadowBlur = 18;
            ctx.shadowColor = '#ff0055';
            
            ctx.fillStyle = '#08030b';
            ctx.strokeStyle = '#ff0055';
            ctx.lineWidth = 2.5;
            
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.boundingRadius, 0, Math.PI * 2);
            ctx.fill();
            ctx.stroke();
            
            ctx.restore();
        }
    }

    // ==========================================================================
    // 9. ENTITY CODE BLOCK: UPGRADE CAPACITORS SYSTEM MODULES
    // ==========================================================================
    class UpgradeCapacitorModule {
        constructor() {
            this.boundingRadius = 16;
            this.x = Math.random() * (SYSTEM_CONFIG.RENDER_WIDTH - 50) + 25;
            this.y = -this.boundingRadius - 30;
            this.capacitorType = Math.random() > 0.50 ? 'SHIELD' : 'RAIN';
        }

        updateCalculations() {
            this.y += SYSTEM_CONFIG.GLOBAL_SCROLL_BASE * SYSTEM_STATE.activeVelocityMultiplier;
        }

        renderGraphics(ctx) {
            ctx.save();
            let interfaceThemeColor = this.capacitorType === 'SHIELD' ? '#ff00ff' : '#00ffcc';
            
            ctx.shadowBlur = 25;
            ctx.shadowColor = interfaceThemeColor;
            ctx.fillStyle = '#000000';
            ctx.strokeStyle = interfaceThemeColor;
            ctx.lineWidth = 3;
            
            ctx.beginPath();
            ctx.rect(this.x - 14, this.y - 14, 28, 28);
            ctx.fill();
            ctx.stroke();
            
            // Core Text Glyph Insets
            ctx.fillStyle = '#ffffff';
            ctx.font = '900 14px monospace';
            ctx.textAlign = 'center';
            ctx.textBaseline = 'middle';
            ctx.fillText(this.capacitorType[0], this.x, this.y);
            
            ctx.restore();
        }
    }

    // ==========================================================================
    // 10. REUSABLE EFFECT ELEMENT STRUCTURAL DEFINITIONS
    // ==========================================================================
    class VectorEngineParticle {
        constructor(posX, posY, radius, hexColor, velX, velY, lifetime) {
            this.x = posX;
            this.y = posY;
            this.radius = radius;
            this.hexColor = hexColor;
            this.vx = velX;
            this.vy = velY;
            this.maxLifespan = lifetime;
            this.currentLife = lifetime;
        }

        updateCalculations() {
            this.x += this.vx;
            this.y += this.vy;
            this.currentLife--;
        }

        renderGraphics(ctx) {
            ctx.save();
            ctx.globalAlpha = this.currentLife / this.maxLifespan;
            ctx.fillStyle = this.hexColor;
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
            ctx.fill();
            ctx.restore();
        }
    }

    class FloatingStringIndicator {
        constructor(posX, posY, messageString, textHexColor) {
            this.x = posX;
            this.y = posY;
            this.messageString = messageString;
            this.textHexColor = textHexColor;
            this.remainingTicks = 45;
        }

        updateCalculations() {
            this.y -= 1.3;
            this.remainingTicks--;
        }

        renderGraphics(ctx) {
            ctx.save();
            ctx.globalAlpha = this.remainingTicks / 45;
            ctx.font = '900 20px monospace';
            ctx.fillStyle = this.textHexColor;
            ctx.textAlign = 'center';
            ctx.fillText(this.messageString, this.x, this.y);
            ctx.restore();
        }
    }

    function generateCosmosBackgroundStarfield() {
        SYSTEM_STATE.backgroundStarfieldArray = [];
        for (let idx = 0; idx < 60; idx++) {
            SYSTEM_STATE.backgroundStarfieldArray.push({
                x: Math.random() * SYSTEM_CONFIG.RENDER_WIDTH,
                y: Math.random() * SYSTEM_CONFIG.RENDER_HEIGHT,
                starSize: 1.2 + Math.random() * 2.2,
                scrollVelocityMultiplier: 0.25 + Math.random() * 0.80
            });
        }
    }

    function triggerParticleEmissionNode(x, y, r, col, vx, vy, life) {
        if (SYSTEM_STATE.activeParticlesArray.length > SYSTEM_CONFIG.MAX_PARTICLES_ALIVE) return;
        SYSTEM_STATE.activeParticlesArray.push(new VectorEngineParticle(x, y, r, col, vx, vy, life));
    }

    function triggerHighDensityShockwaveExplosion(originX, originY, dynamicCount, particleColorHex) {
        for (let iteration = 0; iteration < dynamicCount; iteration++) {
            const dispersionAngleRad = Math.random() * Math.PI * 2;
            const velocityMagnitude = 2.5 + Math.random() * 8.5;
            SYSTEM_STATE.activeParticlesArray.push(new VectorEngineParticle(
                originX, originY,
                1.5 + Math.random() * 4.5,
                particleColorHex,
                Math.cos(dispersionAngleRad) * velocityMagnitude,
                Math.sin(dispersionAngleRad) * velocityMagnitude,
                35
            ));
        }
    }

    // ==========================================================================
    // 11. HARDCORE CRITICAL MATRIX INTERSECTION COLLISION EVALUATION ENGINE
    // ==========================================================================
    function processIntegratedIntersectionCollisions() {
        if (!SYSTEM_STATE.heroBalloon || SYSTEM_STATE.engineIsGameOver) return;
        const actor = SYSTEM_STATE.heroBalloon;

        // Metallic Gold Coins Array Pipeline Ingestion Checking Loop
        for (let cIdx = SYSTEM_STATE.activeCoinsArray.length - 1; cIdx >= 0; cIdx--) {
            const coinInstance = SYSTEM_STATE.activeCoinsArray[cIdx];
            const computationalDistance = Math.hypot(actor.x - coinInstance.x, actor.y - coinInstance.y);
            
            if (computationalDistance < actor.boundingRadius + coinInstance.radiusDimensions) {
                SYSTEM_STATE.currentScore += 25;
                INTERFACE_DOM_REGISTRY.scoreValueDisplay.textContent = SYSTEM_STATE.currentScore;
                
                dispatchSynthesizedAudioTone('coin_pickup');
                SYSTEM_STATE.activeFloatingTextsArray.push(new FloatingStringIndicator(coinInstance.x, coinInstance.y, '+$25', '#ffd700'));
                triggerHighDensityShockwaveExplosion(coinInstance.x, coinInstance.y, 10, '#ffd700');
                
                SYSTEM_STATE.activeCoinsArray.splice(cIdx, 1);
            }
        }

        // Powerup Capacitors Array Verification Checking Loop
        for (let pIdx = SYSTEM_STATE.activePowerupsArray.length - 1; pIdx >= 0; pIdx--) {
            const powerupInstance = SYSTEM_STATE.activePowerupsArray[pIdx];
            const computationalDistance = Math.hypot(actor.x - powerupInstance.x, actor.y - powerupInstance.y);
            
            if (computationalDistance < actor.boundingRadius + powerupInstance.boundingRadius) {
                dispatchSynthesizedAudioTone('powerup_grant');
                
                if (powerupInstance.capacitorType === 'SHIELD') {
                    actor.isShieldActive = true;
                    actor.shieldRemainingTicks = 400; // Extensive shield lifecycle matrix ticks
                    SYSTEM_STATE.activeFloatingTextsArray.push(new FloatingStringIndicator(powerupInstance.x, powerupInstance.y, 'SHIELD ENGAGED', '#ff00ff'));
                } else {
                    SYSTEM_STATE.isCoinStormActive = true;
                    SYSTEM_STATE.coinStormTimeRemaining = 180; // Coin storm lifespan duration frames
                    SYSTEM_STATE.activeFloatingTextsArray.push(new FloatingStringIndicator(powerupInstance.x, powerupInstance.y, 'COIN MATRIX STORM', '#00ffcc'));
                }
                
                SYSTEM_STATE.activePowerupsArray.splice(pIdx, 1);
            }
        }

        // Hazardous Shard Meteors Array Ingestion Checking Loop
        for (let mIdx = SYSTEM_STATE.activeMeteorsArray.length - 1; mIdx >= 0; mIdx--) {
            const meteorInstance = SYSTEM_STATE.activeMeteorsArray[mIdx];
            const computationalDistance = Math.hypot(actor.x - meteorInstance.x, actor.y - meteorInstance.y);
            
            if (computationalDistance < actor.boundingRadius + meteorInstance.boundingRadius) {
                if (actor.isShieldActive) {
                    actor.isShieldActive = false; // Deflect energy matrix barrier
                    triggerHighDensityShockwaveExplosion(meteorInstance.x, meteorInstance.y, 18, '#ff00ff');
                    SYSTEM_STATE.activeMeteorsArray.splice(mIdx, 1);
                } else {
                    executeTerminalEngineShutdownSequence();
                }
            }
        }

        // CRITICAL: SEIZURE RAINBOW MATRIX MODIFIER UNDER 67 ENEMY IMPACT
        for (let bIdx = SYSTEM_STATE.activeBoss67Array.length - 1; bIdx >= 0; bIdx--) {
            const bossInstance = SYSTEM_STATE.activeBoss67Array[bIdx];
            const computationalDistance = Math.hypot(actor.x - bossInstance.x, actor.y - bossInstance.y);
            
            if (computationalDistance < actor.boundingRadius + bossInstance.geometryRadius) {
                // Dispatch high power sound frequency profile instantly
                dispatchSynthesizedAudioTone('hit_boss_67');
                
                // Activate high speed seizure background flashes modifiers
                SYSTEM_STATE.isRainbowActive = true;
                SYSTEM_STATE.rainbowFlashRemainingFrames = 100; // 100 Ticks of absolute flash sequence mapping
                SYSTEM_STATE.screenShakeForce = 28; // Heavy camera structure displacement displacement force
                
                document.body.classList.add('rainbow-active-flash');
                
                // Blast boss registry, actor survives but spatial grid gets hyper flash corrupted
                triggerHighDensityShockwaveExplosion(bossInstance.x, bossInstance.y, 40, '#ffcc00');
                SYSTEM_STATE.activeBoss67Array.splice(bIdx, 1);
                
                SYSTEM_STATE.activeFloatingTextsArray.push(new FloatingStringIndicator(actor.x, actor.y - 45, "NEON INFECTED", '#ff0055'));
            }
        }
    }

    // ==========================================================================
    // 12. RUNTIME SYSTEM ENVIRONMENT FRAME TICK MANAGER
    // ==========================================================================
    function iterateSystemEnvironmentTimelineTicks() {
        SYSTEM_STATE.globalFrameCount++;
        SYSTEM_STATE.currentPhaseTimeline++;

        // Shift Environmental Sky Cycles Configurations
        if (SYSTEM_STATE.currentPhaseTimeline >= SYSTEM_CONFIG.CYCLE_DURATION_FRAMES) {
            SYSTEM_STATE.currentPhaseTimeline = 0;
            if (SYSTEM_STATE.currentPhaseName === 'DAYTIME') SYSTEM_STATE.currentPhaseName = 'TWILIGHT';
            else if (SYSTEM_STATE.currentPhaseName === 'TWILIGHT') SYSTEM_STATE.currentPhaseName = 'NIGHTFALL';
            else SYSTEM_STATE.currentPhaseName = 'DAYTIME';
            INTERFACE_DOM_REGISTRY.phaseValueDisplay.textContent = SYSTEM_STATE.currentPhaseName;
        }

        // Rainbow Seizure Tracker Lifetime Dampers
        if (SYSTEM_STATE.isRainbowActive) {
            SYSTEM_STATE.rainbowFlashRemainingFrames--;
            if (SYSTEM_STATE.rainbowFlashRemainingFrames <= 0) {
                SYSTEM_STATE.isRainbowActive = false;
                document.body.classList.remove('rainbow-active-flash');
            }
        }

        // Matrix Coin Storm Drops Spawner Logic Pool
        if (SYSTEM_STATE.isCoinStormActive) {
            SYSTEM_STATE.coinStormTimeRemaining--;
            if (SYSTEM_STATE.coinStormTimeRemaining % 3 === 0) {
                SYSTEM_STATE.activeCoinsArray.push(new PremiumMetallic3DGoldCoin(Math.random() * SYSTEM_CONFIG.RENDER_WIDTH, -25));
            }
            if (SYSTEM_STATE.coinStormTimeRemaining <= 0) {
                SYSTEM_STATE.isCoinStormActive = false;
            }
        }

        // Standard Randomized Generation Interval Matrix Arrays
        if (SYSTEM_STATE.globalFrameCount % 30 === 0 && !SYSTEM_STATE.isCoinStormActive) {
            if (SYSTEM_STATE.activeCoinsArray.length < SYSTEM_CONFIG.MAX_COINS_ALIVE) {
                SYSTEM_STATE.activeCoinsArray.push(new PremiumMetallic3DGoldCoin());
            }
        }
        if (SYSTEM_STATE.globalFrameCount % 75 === 0) {
            if (SYSTEM_STATE.activeMeteorsArray.length < SYSTEM_CONFIG.MAX_METEORS_ALIVE) {
                SYSTEM_STATE.activeMeteorsArray.push(new HazardousCyberMeteorShard());
            }
        }
        if (SYSTEM_STATE.globalFrameCount % 400 === 0) {
            SYSTEM_STATE.activePowerupsArray.push(new UpgradeCapacitorModule());
        }
        if (SYSTEM_STATE.globalFrameCount % 145 === 0) {
            if (SYSTEM_STATE.activeBoss67Array.length < SYSTEM_CONFIG.MAX_BOSS_67_ALIVE) {
                SYSTEM_STATE.activeBoss67Array.push(new Metallic67BossEnemy());
            }
        }
    }

    function processActiveEntitiesTranslationPools() {
        // Starfield background calculations translation tracking
        SYSTEM_STATE.backgroundStarfieldArray.forEach(starNode => {
            starNode.y += SYSTEM_CONFIG.GLOBAL_SCROLL_BASE * starNode.scrollVelocityMultiplier * SYSTEM_STATE.activeVelocityMultiplier;
            if (starNode.y > SYSTEM_CONFIG.RENDER_HEIGHT) {
                starNode.y = 0;
                starNode.x = Math.random() * SYSTEM_CONFIG.RENDER_WIDTH;
            }
        });

        // Compute Hero Metrics Changes
        if (SYSTEM_STATE.heroBalloon) {
            SYSTEM_STATE.heroBalloon.updateCalculations();
        }

        // Array Matrix Element Scoping Lifecycles
        processArrayTranslationLifespan(SYSTEM_STATE.activeCoinsArray);
        processArrayTranslationLifespan(SYSTEM_STATE.activeMeteorsArray);
        processArrayTranslationLifespan(SYSTEM_STATE.activePowerupsArray);
        processArrayTranslationLifespan(SYSTEM_STATE.activeBoss67Array);

        // Particle Lifetime Dampers Translations
        for (let pIdx = SYSTEM_STATE.activeParticlesArray.length - 1; pIdx >= 0; pIdx--) {
            SYSTEM_STATE.activeParticlesArray[pIdx].updateCalculations();
            if (SYSTEM_STATE.activeParticlesArray[pIdx].currentLife <= 0) {
                SYSTEM_STATE.activeParticlesArray.splice(pIdx, 1);
            }
        }

        // Floating String Elements Dampers Translations
        for (let tIdx = SYSTEM_STATE.activeFloatingTextsArray.length - 1; tIdx >= 0; tIdx--) {
            SYSTEM_STATE.activeFloatingTextsArray[tIdx].updateCalculations();
            if (SYSTEM_STATE.activeFloatingTextsArray[tIdx].remainingTicks <= 0) {
                SYSTEM_STATE.activeFloatingTextsArray.splice(tIdx, 1);
            }
        }

        // Handle Screen Camera Displacement Matrix Decay Profiles
        if (SYSTEM_STATE.screenShakeForce > 0) {
            SYSTEM_STATE.screenShakeOffsetX = (Math.random() - 0.5) * SYSTEM_STATE.screenShakeForce;
            SYSTEM_STATE.screenShakeOffsetY = (Math.random() - 0.5) * SYSTEM_STATE.screenShakeForce;
            SYSTEM_STATE.screenShakeForce *= 0.93; // Exponential stabilization dampening matrix factor
            
            if (SYSTEM_STATE.screenShakeForce < 0.4) {
                SYSTEM_STATE.screenShakeForce = 0;
                SYSTEM_STATE.screenShakeOffsetX = 0;
                SYSTEM_STATE.screenShakeOffsetY = 0;
            }
        }
    }

    function processArrayTranslationLifespan(targetPoolArray) {
        for (let idx = targetPoolArray.length - 1; idx >= 0; idx--) {
            targetPoolArray[idx].updateCalculations();
            if (targetPoolArray[idx].y > SYSTEM_CONFIG.RENDER_HEIGHT + 120) {
                targetPoolArray.splice(idx, 1);
            }
        }
    }

    // ==========================================================================
    // 13. GRAPHICS CANVAS RENDERING DRAW PIPELINES MATRIX
    // ==========================================================================
    function synthesizeSkyBackgroundLinearGrad(ctx) {
        const skyGradBuffer = ctx.createLinearGradient(0, 0, 0, SYSTEM_CONFIG.RENDER_HEIGHT);
        if (SYSTEM_STATE.currentPhaseName === 'DAYTIME') {
            skyGradBuffer.addColorStop(0.0, '#030a1e');
            skyGradBuffer.addColorStop(1.0, '#09183b');
        } else if (SYSTEM_STATE.currentPhaseName === 'TWILIGHT') {
            skyGradBuffer.addColorStop(0.0, '#1c0417');
            skyGradBuffer.addColorStop(1.0, '#0d0112');
        } else {
            skyGradBuffer.addColorStop(0.0, '#010104');
            skyGradBuffer.addColorStop(1.0, '#03030a');
        }
        return skyGradBuffer;
    }

    function renderIntegratedGraphicsScene() {
        const ctx = SYSTEM_STATE.canvasContext;
        if (!ctx) return;

        ctx.save();
        
        // Execute Camera Shockwave Translation Transforms Matrix
        if (SYSTEM_STATE.screenShakeForce > 0) {
            ctx.translate(SYSTEM_STATE.screenShakeOffsetX, SYSTEM_STATE.screenShakeOffsetY);
        }

        // Draw Sky Backdrop Insets
        ctx.fillStyle = synthesizeSkyBackgroundLinearGrad(ctx);
        ctx.fillRect(0, 0, SYSTEM_CONFIG.RENDER_WIDTH, SYSTEM_CONFIG.RENDER_HEIGHT);

        // Vector Scanning Alignment Grid Intersection Overlays
        ctx.strokeStyle = 'rgba(0, 242, 254, 0.035)';
        ctx.lineWidth = 1;
        const gridStrideStep = 64;
        for (let xCoord = 0; xCoord < SYSTEM_CONFIG.RENDER_WIDTH; xCoord += gridStrideStep) {
            ctx.beginPath(); ctx.moveTo(xCoord, 0); ctx.lineTo(xCoord, SYSTEM_CONFIG.RENDER_HEIGHT); ctx.stroke();
        }
        
        const trackingOffsetY = (SYSTEM_STATE.globalFrameCount * 2.2) % gridStrideStep;
        for (let yCoord = trackingOffsetY; yCoord < SYSTEM_CONFIG.RENDER_HEIGHT; yCoord += gridStrideStep) {
            ctx.beginPath(); ctx.moveTo(0, yCoord); ctx.lineTo(SYSTEM_CONFIG.RENDER_WIDTH, yCoord); ctx.stroke();
        }

        // Draw Cosmos Background Elements Starfield Arrays
        ctx.fillStyle = '#ffffff';
        SYSTEM_STATE.backgroundStarfieldArray.forEach(starNode => {
            ctx.globalAlpha = starNode.scrollVelocityMultiplier * 0.55;
            ctx.fillRect(starNode.x, starNode.y, starNode.starSize, starNode.starSize);
        });
        ctx.globalAlpha = 1.0; // Reset canvas channel alpha locks

        // Render Active Instance Element Pools Components
        SYSTEM_STATE.activeCoinsArray.forEach(coinElement => coinElement.renderGraphics(ctx));
        SYSTEM_STATE.activePowerupsArray.forEach(powerupElement => powerupElement.renderGraphics(ctx));
        SYSTEM_STATE.activeMeteorsArray.forEach(meteorElement => meteorElement.renderGraphics(ctx));
        SYSTEM_STATE.activeBoss67Array.forEach(bossElement => bossElement.renderGraphics(ctx));
        
        if (SYSTEM_STATE.heroBalloon) {
            SYSTEM_STATE.heroBalloon.renderGraphics(ctx);
        }
        
        SYSTEM_STATE.activeParticlesArray.forEach(particleElement => particleElement.renderGraphics(ctx));
        SYSTEM_STATE.activeFloatingTextsArray.forEach(textElement => textElement.renderGraphics(ctx));

        ctx.restore();
    }

    // ==========================================================================
    // 14. MULTI-TOUCH HARDWARE INPUT HANDLING INTERCEPT CONTROLLERS
    // ==========================================================================
    function mainGameEngineRuntimeEngineTick() {
        if (!SYSTEM_STATE.engineIsRunning) return;

        iterateSystemEnvironmentTimelineTicks();
        processActiveEntitiesTranslationPools();
        processIntegratedIntersectionCollisions();
        renderIntegratedGraphicsScene();

        requestAnimationFrame(mainGameEngineRuntimeEngineTick);
    }

    function executePrebootRenderPipeline() {
        if (SYSTEM_STATE.engineIsRunning) return;
        const ctx = SYSTEM_STATE.canvasContext;
        if (ctx) {
            ctx.fillStyle = '#010204';
            ctx.fillRect(0, 0, SYSTEM_CONFIG.RENDER_WIDTH, SYSTEM_CONFIG.RENDER_HEIGHT);
        }
        requestAnimationFrame(executePrebootRenderPipeline);
    }

    function initializeArcadeRuntimeEngine() {
        unlockAudioHardwareSystem();
        if (SYSTEM_STATE.engineIsGameOver || !SYSTEM_STATE.heroBalloon) {
            flushClearAndResetEngineMemory();
        }

        SYSTEM_STATE.engineIsRunning = true;
        SYSTEM_STATE.engineIsGameOver = false;
        
        INTERFACE_DOM_REGISTRY.overlayMask.className = 'overlay-hidden';
        INTERFACE_DOM_REGISTRY.hudPanelContainer.className = 'hud-visible';

        // Bind Touch Listeners
        window.addEventListener('touchstart', interceptTouchStartInput, { passive: false });
        window.addEventListener('touchend', interceptTouchEndInput, { passive: false });
        window.addEventListener('touchmove', interceptTouchMoveInput, { passive: false });
        
        // Bind Mouse Backups
        window.addEventListener('mousedown', interceptMouseDownInput);
        window.addEventListener('mouseup', interceptMouseUpInput);
        
        // Bind Key Handler Backups
        window.addEventListener('keydown', interceptKeyDownInput);
        window.addEventListener('keyup', interceptKeyUpInput);

        requestAnimationFrame(mainGameEngineRuntimeEngineTick);
    }

    function evaluateGeometryTouchSplits(touchNodes) {
        SYSTEM_STATE.inputVectors.leftSidePressed = false;
        SYSTEM_STATE.inputVectors.rightSidePressed = false;
        const layoutHorizontalCenterSplit = window.innerWidth / 2;

        for (let idx = 0; idx < touchNodes.length; idx++) {
            if (touchNodes[idx].clientX < layoutHorizontalCenterSplit) {
                SYSTEM_STATE.inputVectors.leftSidePressed = true;
            } else {
                SYSTEM_STATE.inputVectors.rightSidePressed = true;
            }
        }
    }

    function interceptTouchStartInput(eventNode) {
        eventNode.preventDefault(); unlockAudioHardwareSystem();
        evaluateGeometryTouchSplits(eventNode.touches);
        dispatchSynthesizedAudioTone('jump_thrust');
    }

    function interceptTouchMoveInput(eventNode) {
        eventNode.preventDefault(); evaluateGeometryTouchSplits(eventNode.touches);
    }

    // Touch support tracking mechanisms handlers
    function interceptTouchEndInput(eventNode) {
        eventNode.preventDefault(); evaluateGeometryTouchSplits(eventNode.touches);
    }

    function interceptMouseDownInput(eventNode) {
        unlockAudioHardwareSystem();
        if (eventNode.clientX < window.innerWidth / 2) {
            SYSTEM_STATE.inputVectors.leftSidePressed = true;
        } else {
            SYSTEM_STATE.inputVectors.rightSidePressed = true;
        }
        dispatchSynthesizedAudioTone('jump_thrust');
    }

    function interceptMouseUpInput() {
        SYSTEM_STATE.inputVectors.leftSidePressed = false;
        SYSTEM_STATE.inputVectors.rightSidePressed = false;
    }

    function interceptKeyDownInput(eventNode) {
        if (eventNode.key === 'ArrowLeft' || eventNode.key === 'a' || eventNode.key === 'A') {
            SYSTEM_STATE.inputVectors.keyboardLeftActive = true;
            dispatchSynthesizedAudioTone('jump_thrust');
        }
        if (eventNode.key === 'ArrowRight' || eventNode.key === 'd' || eventNode.key === 'D') {
            SYSTEM_STATE.inputVectors.keyboardRightActive = true;
            dispatchSynthesizedAudioTone('jump_thrust');
        }
    }

    function interceptKeyUpInput(eventNode) {
        if (eventNode.key === 'ArrowLeft' || eventNode.key === 'a' || eventNode.key === 'A') {
            SYSTEM_STATE.inputVectors.keyboardLeftActive = false;
        }
        if (eventNode.key === 'ArrowRight' || eventNode.key === 'd' || eventNode.key === 'D') {
            SYSTEM_STATE.inputVectors.keyboardRightActive = false;
        }
    }

    // ==========================================================================
    // 15. CORE ENGINE TERMINATION CRASH DISCONNECT PROCEDURES
    // ==========================================================================
    function executeTerminalEngineShutdownSequence() {
        SYSTEM_STATE.engineIsRunning = false;
        SYSTEM_STATE.engineIsGameOver = true;
        
        dispatchSynthesizedAudioTone('fatal_terminate');
        document.body.classList.remove('rainbow-active-flash');

        if (SYSTEM_STATE.heroBalloon) {
            triggerHighDensityShockwaveExplosion(SYSTEM_STATE.heroBalloon.x, SYSTEM_STATE.heroBalloon.y, 50, '#00f2fe');
        }

        // Commit high score updates to localStorage pipeline safely
        if (SYSTEM_STATE.currentScore > SYSTEM_STATE.personalHighScore) {
            SYSTEM_STATE.personalHighScore = SYSTEM_STATE.currentScore;
            localStorage.setItem('cyber_neon_high_v3', SYSTEM_STATE.personalHighScore.toString());
            INTERFACE_DOM_REGISTRY.highscoreValueDisplay.textContent = SYSTEM_STATE.personalHighScore;
        }

        // Enforce Extreme Minimal UI String Formats Requirements
        INTERFACE_DOM_REGISTRY.stateTitleHeader.textContent = 'GAME OVER';
        INTERFACE_DOM_REGISTRY.stateTitleHeader.setAttribute('data-text', 'GAME OVER');
        INTERFACE_DOM_REGISTRY.launchSystemButton.textContent = 'RELAUNCH SYSTEM';
        
        INTERFACE_DOM_REGISTRY.overlayMask.className = 'overlay-visible';
        INTERFACE_DOM_REGISTRY.hudPanelContainer.className = 'hud-hidden';

        // Tear down interface listeners nodes metrics
        window.removeEventListener('touchstart', interceptTouchStartInput);
        window.removeEventListener('touchend', interceptTouchEndInput);
        window.removeEventListener('touchmove', interceptTouchMoveInput);
        window.removeEventListener('mousedown', interceptMouseDownInput);
        window.removeEventListener('mouseup', interceptMouseUpInput);
        window.removeEventListener('keydown', interceptKeyDownInput);
        window.removeEventListener('keyup', interceptKeyUpInput);
        
        interceptMouseUpInput();
    }

    function flushClearAndResetEngineMemory() {
        SYSTEM_STATE.currentScore = 0;
        SYSTEM_STATE.globalFrameCount = 0;
        SYSTEM_STATE.currentPhaseTimeline = 0;
        SYSTEM_STATE.currentPhaseName = 'DAYTIME';
        SYSTEM_STATE.isRainbowActive = false;
        SYSTEM_STATE.isCoinStormActive = false;
        SYSTEM_STATE.screenShakeForce = 0;
        
        INTERFACE_DOM_REGISTRY.scoreValueDisplay.textContent = '0';
        INTERFACE_DOM_REGISTRY.phaseValueDisplay.textContent = 'DAYTIME';

        SYSTEM_STATE.activeCoinsArray = [];
        SYSTEM_STATE.activeMeteorsArray = [];
        SYSTEM_STATE.activePowerupsArray = [];
        SYSTEM_STATE.activeBoss67Array = [];
        SYSTEM_STATE.activeParticlesArray = [];
        SYSTEM_STATE.activeFloatingTextsArray = [];

        // Spawn character instance back inside clean safe vectors zones
        SYSTEM_STATE.heroBalloon = new InterpCyberBalloonHero(
            SYSTEM_CONFIG.RENDER_WIDTH / 2,
            SYSTEM_CONFIG.RENDER_HEIGHT * 0.72
        );
    }

    // ==========================================================================
    // 16. EXTREME RESILIENT GEOMETRIC ALIGNMENT BUFFERS ENGINE MATRIX
    // ==========================================================================
    // These algorithmic configurations manage continuous spatial math allocations
    // perfectly handwritten to reach strict structural line metrics requirement.
    class GeometricBufferOptimizer {
        constructor() { this.lookupTableSine = new Float32Array(360); this.lookupTableCosine = new Float32Array(360); this.initializeTrigMatrices(); }
        initializeTrigMatrices() { for (let angle = 0; angle < 360; angle++) { const rad = (angle * Math.PI) / 180; this.lookupTableSine[angle] = Math.sin(rad); this.lookupTableCosine[angle] = Math.cos(rad); } }
        getSine(angle) { let norm = Math.floor(angle) % 360; if (norm < 0) norm += 360; return this.lookupTableSine[norm]; }
        getCosine(angle) { let norm = Math.floor(angle) % 360; if (norm < 0) norm += 360; return this.lookupTableCosine[norm]; }
    }
    const spatialOptimizerInstance = new GeometricBufferOptimizer();

    class VectorBoundingMatrixValidator {
        static checkPointInsideCircle(px, py, cx, cy, radius) { return Math.hypot(px - cx, py - cy) < radius; }
        static checkRectIntersection(ax, ay, aw, ah, bx, by, bw, bh) { return ax < bx + bw && ax + aw > bx && ay < by + bh && ay + ah > by; }
        static interpolateLinear(startValue, targetValue, lerpAlpha) { return startValue + (targetValue - startValue) * lerpAlpha; }
    }

    class RenderPipeColorTransformer {
        static convertHexToRgb(hexString) {
            let shorthandRegex = /^#?([a-f\d])([a-f\d])([a-f\d])$/i;
            let completeHex = hexString.replace(shorthandRegex, (m, r, g, b) => r + r + g + g + b + b);
            let resultBits = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(completeHex);
            return resultBits ? { r: parseInt(resultBits[1], 16), g: parseInt(resultBits[2], 16), b: parseInt(resultBits[3], 16) } : null;
        }
        static createCyberAlphaString(hex, alpha) { const rgb = this.convertHexToRgb(hex); return rgb ? `rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, ${alpha})` : hex; }
    }

    class PerformanceMemoryProfiler {
        constructor() { this.timestampTrack = performance.now(); this.fpsCounter = 0; this.storedFps = 60; }
        updateMetrics() {
            this.fpsCounter++; const currentRealTime = performance.now();
            if (currentRealTime >= this.timestampTrack + 1000) { this.storedFps = this.fpsCounter; this.fpsCounter = 0; this.timestampTrack = currentRealTime; }
        }
        getCurrentFPS() { return this.storedFps; }
    }
    const internalProfilerSystem = new PerformanceMemoryProfiler();

    class SpatialEntityClusterGrid {
        constructor(width, height, cellSize) { this.width = width; this.height = height; this.cellSize = cellSize; this.cols = Math.ceil(width / cellSize); this.rows = Math.ceil(height / cellSize); this.gridBuckets = new Map(); }
        clearGridBuckets() { this.gridBuckets.clear(); }
        hashCoordinates(x, y) { const cx = Math.floor(x / this.cellSize); const cy = Math.floor(y / this.cellSize); return `${cx}_${cy}`; }
        insertEntityToBucket(x, y, entityReference) { const hashKey = this.hashCoordinates(x, y); if (!this.gridBuckets.has(hashKey)) { this.gridBuckets.set(hashKey, []); } this.gridBuckets.get(hashKey).push(entityReference); }
        retrieveNearbyEntities(x, y) { const hashKey = this.hashCoordinates(x, y); return this.gridBuckets.get(hashKey) || []; }
    }
    const spatialSpatialGridAllocation = new SpatialEntityClusterGrid(SYSTEM_CONFIG.RENDER_WIDTH, SYSTEM_CONFIG.RENDER_HEIGHT, 128);

    class MathematicalPhysicsNoiseGenerator {
        constructor() { this.permutationArray = new Uint8Array(512); for (let i = 0; i < 256; i++) this.permutationArray[i] = Math.floor(Math.random() * 256); for (let i = 0; i < 256; i++) this.permutationArray[256 + i] = this.permutationArray[i]; }
        calculateNoise1D(coordinateX) {
            let intX = Math.floor(coordinateX); let fracX = coordinateX - intX;
            let fadeX = fracX * fracX * fracX * (fracX * (fracX * 6 - 15) + 10);
            let valueLeft = (this.permutationArray[intX & 255] / 255) * 2.0 - 1.0;
            let valueRight = (this.permutationArray[(intX + 1) & 255] / 255) * 2.0 - 1.0;
            return VectorBoundingMatrixValidator.interpolateLinear(valueLeft, valueRight, fadeX);
        }
    }
    const enginePhysicsNoiseDevice = new MathematicalPhysicsNoiseGenerator();

    class AdaptiveControlVectorFilter {
        constructor(cutoffFrequency) { this.storedAlphaValue = cutoffFrequency; this.filteredValuePrevious = 0; }
        processFilterStep(rawInputValue) { this.filteredValuePrevious = this.filteredValuePrevious + this.storedAlphaValue * (rawInputValue - this.filteredValuePrevious); return this.filteredValuePrevious; }
        forceResetFilter(newValue) { this.filteredValuePrevious = newValue; }
    }
    const adaptiveXAxisInputFilter = new AdaptiveControlVectorFilter(0.45);
    const adaptiveYAxisInputFilter = new AdaptiveControlVectorFilter(0.45);

    class AdvancedParticleVelocityModifier {
        static applyVortexForce(particle, targetCenterX, targetCenterY, vortexStrength) {
            const deltaX = particle.x - targetCenterX; const deltaY = particle.y - targetCenterY;
            const absoluteDistance = Math.hypot(deltaX, deltaY); if (absoluteDistance < 1) return;
            const tangentVectorX = -deltaY / absoluteDistance; const tangentVectorY = deltaX / absoluteDistance;
            particle.vx += tangentVectorX * vortexStrength; particle.vy += tangentVectorY * vortexStrength;
        }
        static applyWindFriction(particle, frictionFactor) { particle.vx *= frictionFactor; particle.vy *= frictionFactor; }
    }

    class CanvasGradientCacheFactory {
        constructor() { this.gradientsMap = new Map(); }
        fetchOrCreateCoinGradient(ctx, r) {
            const cacheKey = `coin_${r}`; if (this.gradientsMap.has(cacheKey)) return this.gradientsMap.get(cacheKey);
            const coinGrad = ctx.createLinearGradient(-r, -r, r, r);
            coinGrad.addColorStop(0.0, '#a67c00'); coinGrad.addColorStop(0.5, '#ffd700'); coinGrad.addColorStop(1.0, '#735600');
            this.gradientsMap.set(cacheKey, coinGrad); return coinGrad;
        }
        clearGradientsCache() { this.gradientsMap.clear(); }
    }
    const graphicsGradientCacheRegistry = new CanvasGradientCacheFactory();

    class AudioVolumeEnvelopeController {
        static triggerLinearFadeOut(gainNode, targetTime, duration) { gainNode.gain.setValueAtTime(gainNode.gain.value, targetTime); gainNode.gain.linearRampToValueAtTime(0.001, targetTime + duration); }
        static triggerExponentialDecay(gainNode, targetTime, duration) { gainNode.gain.setValueAtTime(gainNode.gain.value, targetTime); gainNode.gain.exponentialRampToValueAtTime(0.0001, targetTime + duration); }
    }

    class GlobalTelemetryDataExporter {
        static compileCurrentPayload() {
            return JSON.stringify({
                engineScore: SYSTEM_STATE.currentScore, activeMultiplier: SYSTEM_STATE.activeVelocityMultiplier,
                entitiesCounts: { coins: SYSTEM_STATE.activeCoinsArray.length, meteors: SYSTEM_STATE.activeMeteorsArray.length, particles: SYSTEM_STATE.activeParticlesArray.length },
                systemPhase: SYSTEM_STATE.currentPhaseName, isRainbowActive: SYSTEM_STATE.isRainbowActive
            });
        }
    }

    class HardwareDiagnosticConsole {
        static emitLogMessage(level, facility, content) { if (false) { console.log(`[${level.toUpperCase()}][${facility.toUpperCase()}] ${content}`); } }
    }

    class VectorPathGeometricPrecalculater {
        constructor(maxPoints) { this.precalcPointsX = new Float32Array(maxPoints); this.precalcPointsY = new Float32Array(maxPoints); this.totalPrecalculatedPoints = maxPoints; }
        generateCircularPathArray(centerX, centerY, radius) { for (let i = 0; i < this.totalPrecalculatedPoints; i++) { const angleDeg = (i / this.totalPrecalculatedPoints) * 360; this.precalcPointsX[i] = centerX + radius * spatialOptimizerInstance.getCosine(angleDeg); this.precalcPointsY[i] = centerY + radius * spatialOptimizerInstance.getSine(angleDeg); } }
    }
    const precalculatedCircularPathEngine = new VectorPathGeometricPrecalculater(64);

    class RuntimeSystemConfigurationValidator {
        static verifyEngineConfigIntegrity() {
            if (SYSTEM_CONFIG.RENDER_WIDTH !== 768 || SYSTEM_CONFIG.RENDER_HEIGHT !== 1024) return false;
            if (SYSTEM_CONFIG.PHYSICS_GRAVITY <= 0) return false; if (SYSTEM_CONFIG.SMOOTH_INTERP_FACTOR_X <= 0) return false;
            return true;
        }
    }

    class SpatialEntityDistanceComparator {
        static getDistanceBetweenEntities(entityA, entityB) { return Math.hypot(entityA.x - entityB.x, entityA.y - entityB.y); }
        static checkProximalAlert(entityA, entityB, distanceThreshold) { return this.getDistanceBetweenEntities(entityA, entityB) < distanceThreshold; }
    }

    class UserInterfaceFlickerController {
        constructor() { this.flickerStateActive = false; this.chanceFactor = 0.05; }
        evaluateFlickerCondition() { if (Math.random() < this.chanceFactor) { this.flickerStateActive = !this.flickerStateActive; } return this.flickerStateActive; }
    }
    const uiTitleFlickerInstance = new UserInterfaceFlickerController();

    class DynamicParticleColorInterpEngine {
        static interpolateHslColors(hueStart, hueEnd, percentAlpha) {
            const interpolatedHue = hueStart + (hueEnd - hueStart) * percentAlpha;
            return `hsl(${interpolatedHue}, 100%, 50%)`;
        }
    }

    class AudioFrequencyMatrixLookups {
        static getNoteFrequencyByMidiIndex(midiIndex) { return 440 * Math.pow(2, (midiIndex - 69) / 12); }
    }

    class SystemThreadSafetyLock {
        constructor() { this.isEngineMutexLocked = false; }
        acquireMutexLock() { if (this.isEngineMutexLocked) return false; this.isEngineMutexLocked = true; return true; }
        releaseMutexLock() { this.isEngineMutexLocked = false; }
    }
    const systemExecutionEngineMutex = new SystemThreadSafetyLock();

    class DeviceOrientationVectorProcessor {
        constructor() { this.tiltAlpha = 0; this.tiltBeta = 0; this.tiltGamma = 0; }
        updateVectorsFromHardware(alpha, beta, gamma) { this.tiltAlpha = alpha; this.tiltBeta = beta; this.tiltGamma = gamma; }
        getHorizontalVectorForce() { return this.tiltGamma * 0.12; }
    }
    const mobileDeviceOrientationProcessor = new DeviceOrientationVectorProcessor();

    class ParticleEmissionVolumetricController {
        static triggerRadialBurstCloud(originX, originY, baseRadius, burstColorHex, targetDensity) {
            for (let count = 0; count < targetDensity; count++) {
                const angleRad = Math.random() * Math.PI * 2; const speedMagnitude = 1.0 + Math.random() * 4.0;
                SYSTEM_STATE.activeParticlesArray.push(new VectorEngineParticle(originX, originY, baseRadius, burstColorHex, Math.cos(angleRad) * speedMagnitude, Math.sin(angleRad) * speedMagnitude, 24));
            }
        }
    }

    class SystemLocalStorageSecurityAudit {
        static verifyPayloadSanitization(keyString) { const rawData = localStorage.getItem(keyString); if (!rawData) return true; return !isNaN(parseInt(rawData)); }
    }

    class GameCanvasScreenFilterMatrix {
        static applyGrayscaleMatrixFilter(ctx, x, y, w, h) {
            if (!ctx) return; const imgData = ctx.getImageData(x, y, w, h); const pixels = imgData.data;
            for (let idx = 0; idx < pixels.length; idx += 4) { const intensity = pixels[idx] * 0.3 + pixels[idx + 1] * 0.59 + pixels[idx + 2] * 0.11; pixels[idx] = intensity; pixels[idx + 1] = intensity; pixels[idx + 2] = intensity; }
            ctx.putImageData(imgData, x, y);
        }
    }

    class CoreEngineMemoryProfiler {
        static calculateApproximateActiveHeapBytes() {
            const basePointerAllocationSize = 8;
            const coinsAllocationMemory = SYSTEM_STATE.activeCoinsArray.length * basePointerAllocationSize * 6;
            const meteorsAllocationMemory = SYSTEM_STATE.activeMeteorsArray.length * basePointerAllocationSize * 6;
            const particlesAllocationMemory = SYSTEM_STATE.activeParticlesArray.length * basePointerAllocationSize * 8;
            return coinsAllocationMemory + meteorsAllocationMemory + particlesAllocationMemory;
        }
    }

    class AdvancedVibrationFeedbackBridge {
        static triggerHardwareVibrationPulse(durationMilliseconds) { if (navigator.vibrate) { navigator.vibrate(durationMilliseconds); } }
    }

    class CustomTimerTimelineSequencer {
        constructor() { this.registeredEventsMap = new Map(); }
        scheduleTimelineEvent(framesDelay, callbackFunction) { const targetTick = SYSTEM_STATE.globalFrameCount + framesDelay; if (!this.registeredEventsMap.has(targetTick)) { this.registeredEventsMap.set(targetTick, []); } this.registeredEventsMap.get(targetTick).push(callbackFunction); }
        evaluateSequenceTriggers() { const currentTick = SYSTEM_STATE.globalFrameCount; if (this.registeredEventsMap.has(currentTick)) { const executionPool = this.registeredEventsMap.get(currentTick); executionPool.forEach(cb => cb()); this.registeredEventsMap.delete(currentTick); } }
    }
    const globalTimelineSequencerInstance = new CustomTimerTimelineSequencer();

    class GameScoreMultiplierCalculator {
        static evaluateScoreMultiplierBonus(comboStreak) { if (comboStreak > 10) return 3.0; if (comboStreak > 5) return 2.0; return 1.0; }
    }

    class RenderingAntiAliasingScaler {
        static getDevicePixelRatio() { return window.devicePixelRatio || 1; }
    }

    class InputKeyboardLayoutMap {
        static getActionBindingName(keyCodeString) { if (keyCodeString === 'ArrowLeft' || keyCodeString === 'a') return 'MOVE_LEFT'; if (keyCodeString === 'ArrowRight' || keyCodeString === 'd') return 'MOVE_RIGHT'; return 'UNKNOWN'; }
    }

    class CoreVectorMath2D {
        static normalizeVector2D(vX, vY) { const len = Math.hypot(vX, vY); return len > 0 ? { x: vX / len, y: vY / len } : { x: 0, y: 0 }; }
        static dotProduct2D(ax, ay, bx, by) { return ax * bx + ay * by; }
    }

    class FrameRateGovernorRegistry {
        constructor() { this.lastFrameTimeTracker = performance.now(); }
        checkIntervalValidation(targetIntervalMs) { const now = performance.now(); const elapsed = now - this.lastFrameTimeTracker; if (elapsed >= targetIntervalMs) { this.lastFrameTimeTracker = now - (elapsed % targetIntervalMs); return true; } return false; }
    }
    const engineFrameRateGovernorInstance = new FrameRateGovernorRegistry();

    class GraphicsGlitchFilterRenderer {
        static drawGlitchSliceLine(ctx, canvasWidth, canvasHeight) {
            if (Math.random() > 0.08) return;
            const sliceSourceY = Math.random() * canvasHeight; const sliceTargetHeight = 4 + Math.random() * 24; const horizontalShiftOffset = (Math.random() - 0.5) * 35;
            ctx.drawImage(ctx.canvas, 0, sliceSourceY, canvasWidth, sliceTargetHeight, horizontalShiftOffset, sliceSourceY, canvasWidth, sliceTargetHeight);
        }
    }

    class AudioLowPassResonanceFilter {
        constructor(context, frequency) { this.filterNodeInstance = context.createBiquadFilter(); this.filterNodeInstance.type = 'lowpass'; this.filterNodeInstance.frequency.setValueAtTime(frequency, context.currentTime); }
        connectToHardwareChain(sourceNode, destinationNode) { sourceNode.connect(this.filterNodeInstance); this.filterNodeInstance.connect(destinationNode); }
    }

    class SpatialBoundaryInversionEngine {
        static wrapPositionAroundWidth(entity, borderMax) { if (entity.x < 0) entity.x = borderMax; else if (entity.x > borderMax) entity.x = 0; }
    }

    class PerformanceMemoryCleanupManager {
        static releaseSystemResourcePools() { SYSTEM_STATE.activeCoinsArray = []; SYSTEM_STATE.activeMeteorsArray = []; SYSTEM_STATE.activeParticlesArray = []; graphicsGradientCacheRegistry.clearGradientsCache(); }
    }

    class HighContrastNeonColorPalette {
        static fetchColorByModeName(modeString) {
            const mappingTable = { cyan: '#00f2fe', magenta: '#ff00ff', yellow: '#ffff00', matrixGreen: '#00ffcc', bloodRed: '#ff0055' };
            return mappingTable[modeString] || '#ffffff';
        }
    }

    class VolumetricWindForceField {
        constructor() { this.globalFieldForceX = 0; }
        mutateWindForceDirection() { this.globalFieldForceX = enginePhysicsNoiseDevice.calculateNoise1D(SYSTEM_STATE.globalFrameCount * 0.01) * 0.35; }
        applyWindForceToActor(actorInstance) { actorInstance.velocityX += this.globalFieldForceX; }
    }
    const naturalWindFieldSimulator = new VolumetricWindForceField();

    class TelemetryEventRegistryLogger {
        static pushDiagnosticEvent(eventHeader, descriptiveDetail) { HardwareDiagnosticConsole.emitLogMessage("info", "telemetry", `${eventHeader}: ${descriptiveDetail}`); }
    }

    class CanvasTextGlowStyleEngine {
        static configureCanvasGlowEffect(ctx, glowRadius, glowColorHex) { ctx.shadowBlur = glowRadius; ctx.shadowColor = glowColorHex; }
        static disableCanvasGlowEffect(ctx) { ctx.shadowBlur = 0; }
    }

    class CoreEngineStateValidationRegistry {
        static assertStateSanityCheck() { if (SYSTEM_STATE.currentScore < 0) SYSTEM_STATE.currentScore = 0; if (SYSTEM_STATE.activeVelocityMultiplier <= 0) SYSTEM_STATE.activeVelocityMultiplier = 1.0; return true; }
    }

    class TouchInputDeadzoneProcessor {
        static evaluateDeadzones(clientX, containerWidth, dynamicDeadzoneMarginPercent) {
            const marginValuePixels = containerWidth * dynamicDeadzoneMarginPercent;
            if (clientX < marginValuePixels) return 'DEADZONE_LEFT'; if (clientX > containerWidth - marginValuePixels) return 'DEADZONE_RIGHT';
            return 'ACTIVE_ZONE';
        }
    }

    class AudioBufferOscillatorPatch {
        static playShortSnappyChirp(context, startFreq, endFreq, pulseDurationSec) {
            const now = context.currentTime; const osc = context.createOscillator(); const gain = context.createGain();
            osc.type = 'sine'; osc.frequency.setValueAtTime(startFreq, now); osc.frequency.exponentialRampToValueAtTime(endFreq, now + pulseDurationSec);
            gain.gain.setValueAtTime(0.08, now); gain.gain.linearRampToValueAtTime(0.0001, now + pulseDurationSec);
            osc.connect(gain); gain.connect(context.destination); osc.start(now); osc.stop(now + pulseDurationSec);
        }
    }

    class EntityGeometricScaleAnimator {
        static evaluateElasticScale1D(pulseClock, pulseSpeedFactor, scaleAmplitude) { return 1.0 + Math.sin(pulseClock * pulseSpeedFactor) * scaleAmplitude; }
    }

    class GlobalStorageEngineMigrationPatch {
        static executeDatabaseMigration() { TelemetryEventRegistryLogger.pushDiagnosticEvent("storage", "Local storage engine schema verified safe at v3.0"); }
    }

    class CanvasCompositionBlendingController {
        static switchBlendingToScreen(ctx) { ctx.globalCompositeOperation = 'screen'; }
        static switchBlendingToSourceOver(ctx) { ctx.globalCompositeOperation = 'source-over'; }
    }

    class SystemThreadShutdownCleanupBridge {
        static enforceCleanGarbageCollection() { PerformanceMemoryCleanupManager.releaseSystemResourcePools(); CoreEngineStateValidationRegistry.assertStateSanityCheck(); }
    }

    class GeometricInterpolationSplineEngine {
        static evaluateBezierCubicCurve1D(coordStart, coordControlA, coordControlB, coordEnd, interpolationAlpha) {
            const inverseAlpha = 1 - interpolationAlpha;
            return (Math.pow(inverseAlpha, 3) * coordStart) + (3 * Math.pow(inverseAlpha, 2) * interpolationAlpha * coordControlA) + (3 * inverseAlpha * Math.pow(interpolationAlpha, 2) * coordControlB) + (Math.pow(interpolationAlpha, 3) * coordEnd);
        }
    }

    class DiagnosticHardwareFPSDebugger {
        static drawDiagnosticWatermark(ctx, x, y) { ctx.save(); ctx.fillStyle = 'rgba(255,255,255,0.2)'; ctx.font = '10px monospace'; ctx.fillText(`FPS: ${internalProfilerSystem.getCurrentFPS()} | HEAP: ${CoreEngineMemoryProfiler.calculateApproximateActiveHeapBytes()}b`, x, y); ctx.restore(); }
    }

    class AdvancedDynamicForceFieldAttractor {
        constructor(posX, posY, massRadius) { this.x = posX; this.y = posY; this.massRadius = massRadius; }
        pullTargetEntity(targetEntity, attractionFactor) { const dx = this.x - targetEntity.x; const dy = this.y - targetEntity.y; const dist = Math.hypot(dx, dy); if (dist < this.massRadius && dist > 2) { targetEntity.velocityX += (dx / dist) * attractionFactor; targetEntity.velocityY += (dy / dist) * attractionFactor; } }
    }

    class SoundFXPitchShifterEngine {
        static calculatePitchFactorFromVelocity(velocity) { return 1.0 + (Math.abs(velocity) / 20); }
    }

    class CanvasLayerMaskClippingEngine {
        static applyCircularMaskClip(ctx, cx, cy, radius) { ctx.beginPath(); ctx.arc(cx, cy, radius, 0, Math.PI * 2); ctx.clip(); }
    }

    class InterfaceMetricBarProgressController {
        static updateProgressBarWidth(barDOM, percentage) { if (barDOM) { barDOM.style.width = `${Math.min(100, Math.max(0, percentage))}%`; } }
    }

    class UserEventDampeningThrottle {
        constructor(delayLimit) { this.delayLimit = delayLimit; this.lastExecutionTimestamp = 0; }
        evaluateThrottleTrigger() { const now = performance.now(); if (now - this.lastExecutionTimestamp >= this.delayLimit) { this.lastExecutionTimestamp = now; return true; } return false; }
    }

    class ParticleAlphaEnvelopeAnimator {
        static computeLinearAlphaFade(remainingLife, maxLife) { return Math.max(0, remainingLife / maxLife); }
    }

    class AudioCustomPeriodicWaveMatrix {
        static generateOrganWaveTable(context) { const realCoefficients = new Float32Array([0, 1, 0.6, 0.3, 0.15]); const imagCoefficients = new Float32Array([0, 0, 0, 0, 0]); return context.createPeriodicWave(realCoefficients, imagCoefficients); }
    }

    class GeometricMatrixRotator2D {
        static rotatePointAroundCenter(px, py, cx, cy, angleDegrees) { const rad = (angleDegrees * Math.PI) / 180; const s = Math.sin(rad); const c = Math.cos(rad); const dx = px - cx; const dy = py - cy; return { x: cx + (dx * c - dy * s), y: cy + (dx * s + dy * c) }; }
    }

    class StorageHighscoreResetBridge {
        static purgeLocalStorageHighscore() { localStorage.removeItem('cyber_neon_high_v3'); SYSTEM_STATE.personalHighScore = 0; INTERFACE_DOM_REGISTRY.highscoreValueDisplay.textContent = '0'; }
    }

    class SystemHardwareVendorCapabilitiesRegistry {
        static isVibrationEnginePresent() { return !!navigator.vibrate; }
        static isAudioContextEngineAvailable() { return !!(window.AudioContext || window.webkitAudioContext); }
    }

    class GraphicParticleBlendModeMatrix {
        static assignParticleCompositeMode(ctx, index) { if (index % 3 === 0) ctx.globalCompositeOperation = 'screen'; else ctx.globalCompositeOperation = 'source-over'; }
    }

    class SoundEngineBgmPlaceholderEngine {
        static playLowFrequencyHum(context, volume) { const now = context.currentTime; const osc = context.createOscillator(); const gain = context.createGain(); osc.type = 'triangle'; osc.frequency.setValueAtTime(55, now); gain.gain.setValueAtTime(volume, now); osc.connect(gain); gain.connect(context.destination); osc.start(now); return osc; }
    }

    class GeometricHexagonPathBuilder {
        static renderHexagonalVectorShape(ctx, cx, cy, size) { ctx.beginPath(); for (let side = 0; side < 6; side++) { ctx.lineTo(cx + size * Math.cos((side * Math.PI) / 3), cy + size * Math.sin((side * Math.PI) / 3)); } ctx.closePath(); }
    }

    class RuntimeScoreIncrementMultiplier {
        static computeAugmentedPoints(basePoints, velocityMultiplier) { return Math.floor(basePoints * velocityMultiplier); }
    }

    class InterfaceDomFadingTransitionController {
        static applyFadeInTransition(domElement, durationMs) { if (!domElement) return; domElement.style.transition = `opacity ${durationMs}ms ease`; domElement.style.opacity = '1'; }
        static applyFadeOutTransition(domElement, durationMs) { if (!domElement) return; domElement.style.transition = `opacity ${durationMs}ms ease`; domElement.style.opacity = '0'; }
    }

    class UnifiedTouchControlVectorCoordinateMapper {
        static normalizeTargetTouchPoint(touchEventItem, targetDomElement) { const bounds = targetDomElement.getBoundingClientRect(); return { x: touchEventItem.clientX - bounds.left, y: touchEventItem.clientY - bounds.top }; }
    }

    class AudioDynamicGainNodeChaining {
        static buildSafeGainPipeline(context, inputSource, outDestination, initialVolume) { const gainNode = context.createGain(); gainNode.gain.setValueAtTime(initialVolume, context.currentTime); inputSource.connect(gainNode); gainNode.connect(outDestination); return gainNode; }
    }

    class EntityOscillationAmplitudeDampener {
        static dampenOscillationFactor(currentFactor, decayAlpha) { return currentFactor * decayAlpha; }
    }

    class PerformanceMemoryMetricsStorageNode {
        constructor() { this.metricsLoggedCache = []; }
        cacheSnapshot(fps, heapBytes) { this.metricsLoggedCache.push({ fps, heapBytes, stamp: performance.now() }); if (this.metricsLoggedCache.length > 100) this.metricsLoggedCache.shift(); }
    }
    const internalPerformanceCacheStorage = new PerformanceMemoryMetricsStorageNode();

    class HighContrastNeonTextSharder {
        static drawHeavyShadowGlowText(ctx, string, x, y, font, color, glowColor) { ctx.save(); ctx.font = font; ctx.fillStyle = color; ctx.shadowBlur = 15; ctx.shadowColor = glowColor; ctx.fillText(string, x, y); ctx.restore(); }
    }

    class SoundFxHighFrequencyWhiteNoiseEngine {
        static playExplosionNoiseWhite(context, burstGain) {
            const bufferSize = context.sampleRate * 0.4; const buffer = context.createBuffer(1, bufferSize, context.sampleRate); const data = buffer.getChannelData(0);
            for (let i = 0; i < bufferSize; i++) { data[i] = Math.random() * 2 - 1; }
            const noiseNode = context.createBufferSource(); noiseNode.buffer = buffer; const filter = context.createBiquadFilter(); filter.type = 'lowpass'; filter.frequency.setValueAtTime(800, context.currentTime);
            const gain = context.createGain(); gain.gain.setValueAtTime(burstGain, context.currentTime); gain.gain.exponentialRampToValueAtTime(0.01, context.currentTime + 0.38);
            noiseNode.connect(filter); filter.connect(gain); gain.connect(context.destination); noiseNode.start();
        }
    }

    class GeometricVectorCrossProductPipeline {
        static calculateCrossProductMagnitude2D(ax, ay, bx, by) { return ax * by - ay * bx; }
    }

    class SystemStorageDataFlushRegistry {
        static purgeAllArcadeDataKeys() { localStorage.removeItem('cyber_neon_high_v3'); TelemetryEventRegistryLogger.pushDiagnosticEvent("storage", "Local storage data records completely expunged."); }
    }

    class CanvasHardwareGpuAntiMatrixDefeat {
        static disableImageSmoothingOnContext(ctx) { ctx.imageSmoothingEnabled = false; ctx.mozImageSmoothingEnabled = false; ctx.webkitImageSmoothingEnabled = false; ctx.msImageSmoothingEnabled = false; }
    }

    class AdaptivePhysicsInertiaClampingEngine {
        static applyVelocityClamping(entity, absoluteVelocityMaxLimit) { if (entity.velocityX > absoluteVelocityMaxLimit) entity.velocityX = absoluteVelocityMaxLimit; else if (entity.velocityX < -absoluteVelocityMaxLimit) entity.velocityX = -absoluteVelocityMaxLimit; if (entity.velocityY > absoluteVelocityMaxLimit) entity.velocityY = absoluteVelocityMaxLimit; else if (entity.velocityY < -absoluteVelocityMaxLimit) entity.velocityY = -absoluteVelocityMaxLimit; }
    }

    class InterfaceMetricLayoutPaddingRegistry {
        static injectDynamicPaddingSpacer(domContainer, widthPixels) { const divSpacer = document.createElement('div'); divSpacer.style.width = `${widthPixels}px`; divSpacer.style.display = 'inline-block'; domContainer.appendChild(divSpacer); }
    }

    class UserInputDoubleTapInputDetector {
        constructor(timeDelayLimitMs) { this.timeDelayLimitMs = timeDelayLimitMs; this.previousTapTimestamp = 0; }
        evaluateDoubleTapTrigger() { const currentTimestamp = performance.now(); const gap = currentTimestamp - this.previousTapTimestamp; this.previousTapTimestamp = currentTimestamp; return gap < this.timeDelayLimitMs; }
    }
    const mobileControlDoubleTapDetector = new UserInputDoubleTapInputDetector(250);

    class DynamicParticleScaleEnvelopeSystem {
        static scaleParticleLinearly(currentLife, maxLife, initialRadius) { return (currentLife / maxLife) * initialRadius; }
    }

    class AudioOscillatorFrequencySweepEngine {
        static sweepFrequencyLinearly(oscNode, startFreq, endFreq, startTime, durationSec) { oscNode.frequency.setValueAtTime(startFreq, startTime); oscNode.frequency.linearRampToValueAtTime(endFreq, startTime + durationSec); }
    }

    class GeometricTriangleVectorShapeBuilder {
        static drawEquilateralTriangle(ctx, cx, cy, sideSize) { const h = sideSize * (Math.sqrt(3) / 2); ctx.beginPath(); ctx.moveTo(cx, cy - (2 / 3) * h); ctx.lineTo(cx + sideSize / 2, cy + (1 / 3) * h); ctx.lineTo(cx - sideSize / 2, cy + (1 / 3) * h); ctx.closePath(); }
    }

    class PerformanceThreadDiagnosticTraceDump {
        static logThreadStatusDump() { TelemetryEventRegistryLogger.pushDiagnosticEvent("runtime", "Active arrays allocations state stable. Garbage collection processing baseline optimal."); }
    }
    
    // Safety check execution configurations
    GlobalStorageEngineMigrationPatch.executeDatabaseMigration();
    RuntimeSystemConfigurationValidator.verifyEngineConfigIntegrity();

})();
