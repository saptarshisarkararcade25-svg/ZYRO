import React, { useEffect, useRef } from 'react';
import './home.css';

class CircuitTrace {
    x: number;
    y: number;
    angle: number;
    history: { x: number; y: number }[];
    startTime: number;
    dead: boolean;
    opacity: number;
    flicker: number;

    constructor(x: number, y: number, angle: number) {
        this.x = x;
        this.y = y;
        this.history = [{ x, y }];
        this.angle = angle;
        this.startTime = performance.now();
        this.dead = false;
        this.opacity = 1.0;
        this.flicker = 1.0;
    }

    update(speed: number, killTime: number) {
        const elapsed = performance.now() - this.startTime;

        if (elapsed >= killTime) {
            this.opacity = 0;
            this.dead = true;
            return;
        }

        if (elapsed > 8000) {
            this.opacity = 1 - (elapsed - 8000) / 2000;
            this.flicker = Math.random() > 0.1 ? 1.0 : 0.3;
        }

        if (Math.random() < 0.03) {
            this.angle += Math.random() > 0.5 ? Math.PI / 2 : -Math.PI / 2;
        }

        this.x += Math.cos(this.angle) * speed;
        this.y += Math.sin(this.angle) * speed;
        this.history.push({ x: this.x, y: this.y });

        if (this.history.length > 80) this.history.shift();
    }

    draw(ctx: CanvasRenderingContext2D, color: string) {
        if (this.opacity <= 0) return;
        ctx.save();
        ctx.globalAlpha = this.opacity * this.flicker;
        ctx.beginPath();
        ctx.strokeStyle = color;
        ctx.lineWidth = 1.5;
        ctx.shadowBlur = 8;
        ctx.shadowColor = color;
        ctx.moveTo(this.history[0].x, this.history[0].y);
        this.history.forEach((p) => ctx.lineTo(p.x, p.y));
        ctx.stroke();

        ctx.fillStyle = color;
        ctx.fillRect(this.x - 2, this.y - 2, 4, 4);
        ctx.restore();
    }
}

const Home = () => {
    const canvasRef = useRef<HTMLCanvasElement | null>(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        let width: number, height: number;
        let traces: CircuitTrace[] = [];
        let animationFrameId: number;

        const COLOR = '#00FF41';
        const TRACE_SPEED = 0.8;
        const KILL_TIME_MS = 10000;

        const resize = () => {
            width = canvas.width = window.innerWidth;
            height = canvas.height = window.innerHeight;
        };

        const drawChip = (x: number, y: number, size: number, label: string) => {
            ctx.save();
            ctx.strokeStyle = COLOR;
            ctx.lineWidth = 2;
            ctx.shadowBlur = 12;
            ctx.shadowColor = COLOR;
            ctx.strokeRect(x, y, size, size);
            ctx.strokeRect(x + size * 0.2, y + size * 0.2, size * 0.6, size * 0.6);
            for (let i = 0; i < 4; i++) {
                let p = i * (size / 4) + size / 8;
                ctx.fillRect(x + p - 2, y - 6, 4, 6);
                ctx.fillRect(x + p - 2, y + size, 4, 6);
            }
            ctx.fillStyle = COLOR;
            ctx.font = '10px monospace';
            ctx.fillText(label, x, y - 10);
            ctx.restore();
        };

        const animate = () => {
            ctx.fillStyle = 'black';
            ctx.fillRect(0, 0, width, height);

            drawChip(60, 100, 50, "ZYRO_v2k26");
            drawChip(width - 110, 100, 50, "BUS_CTRL");
            drawChip(60, height - 150, 50, "PWR_MGMT");
            drawChip(width - 110, height - 150, 50, "CORE_LOGIC");

            if (Math.random() < 0.1) {
                const spawnPoints = [
                    { x: 85, y: 125 },
                    { x: width - 85, y: 125 },
                    { x: 85, y: height - 125 },
                    { x: width - 85, y: height - 125 },
                ];
                const point = spawnPoints[Math.floor(Math.random() * spawnPoints.length)];
                traces.push(new CircuitTrace(point.x, point.y, (Math.floor(Math.random() * 4) * Math.PI) / 2));
            }

            for (let i = traces.length - 1; i >= 0; i--) {
                traces[i].update(TRACE_SPEED, KILL_TIME_MS);
                traces[i].draw(ctx, COLOR);
                if (traces[i].dead) traces.splice(i, 1);
            }

            animationFrameId = requestAnimationFrame(animate);
        };

        window.addEventListener('resize', resize);
        resize();
        animate();

        return () => {
            window.removeEventListener('resize', resize);
            cancelAnimationFrame(animationFrameId);
        };
    }, []);

        return (
              <>
            <nav className="navbar navbar-expand-lg bg-body-tertiary a">
                <div className="container-fluid">
                    <a className="navbar-brand" href="#"><span>ZYRO</span><span>2K26</span></a>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation" style={{ alignItems: 'center' }}>
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                            <li className="nav-item" >
                                <a className="nav-link" aria-current="page" href="#">Home</a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link" href="#">About</a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link" aria-current="page" href="#">Tracks</a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link" aria-current="page" href="#">Rewards</a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link" aria-current="page" href="#">Partners</a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link" aria-current="page" href="#">FAQ</a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link s" aria-current="page" href="#">REGISTER NOW</a>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>
                          {/* <canvas id="circuitCanvas"></canvas> */}
            <section className="hero" >
  
                <div className="container">
                    <div className="badge">
                        Innovate &bull; create &bull; impact
                    </div>

                    <h1 className="logo-text">ZYRO <span>2K26</span></h1>

                    <p className="tagline">
                        Where innovation meets <span className="highlight">sustainability</span> for a better world.
                    </p>

                    <div className="btn-group">
                        <button>
                            REGISTER NOW
                            <div id="clip">
                                <div id="leftTop" className="corner"></div>
                                <div id="rightBottom" className="corner"></div>
                                <div id="rightTop" className="corner"></div>
                                <div id="leftBottom" className="corner"></div>
                            </div>
                            <span id="rightArrow" className="arrow"></span>
                            <span id="leftArrow" className="arrow"></span>
                        </button>

                        <button className="button" type="button">
                            <span className="button__text">Download</span>
                            <span className="button__icon"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 35 35" id="bdd05811-e15d-428c-bb53-8661459f9307" data-name="Layer 2" className="svg"><path d="M17.5,22.131a1.249,1.249,0,0,1-1.25-1.25V2.187a1.25,1.25,0,0,1,2.5,0V20.881A1.25,1.25,0,0,1,17.5,22.131Z"></path><path d="M17.5,22.693a3.189,3.189,0,0,1-2.262-.936L8.487,15.006a1.249,1.249,0,0,1,1.767-1.767l6.751,6.751a.7.7,0,0,0,.99,0l6.751-6.751a1.25,1.25,0,0,1,1.768,1.767l-6.752,6.751A3.191,3.191,0,0,1,17.5,22.693Z"></path><path d="M31.436,34.063H3.564A3.318,3.318,0,0,1,.25,30.749V22.011a1.25,1.25,0,0,1,2.5,0v8.738a.815.815,0,0,0,.814.814H31.436a.815.815,0,0,0,.814-.814V22.011a1.25,1.25,0,1,1,2.5,0v8.738A3.318,3.318,0,0,1,31.436,34.063Z"></path></svg></span>
                        </button>
                    </div>

                    <div className="timer-card">
                        <div className="time-unit">
                            <span className="number">14</span>
                            <span className="label">DAYS</span>
                        </div>
                        <div className="divider"></div>
                        <div className="time-unit">
                            <span className="number">06</span>
                            <span className="label">HOURS</span>
                        </div>
                        <div className="divider"></div>
                        <div className="time-unit">
                            <span className="number">00</span>
                            <span className="label">MINS</span>
                        </div>
                    </div>
                </div>
            </section>
        </>
  )
}

export default Home
