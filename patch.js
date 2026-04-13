const fs = require('fs');
const file = 'C:/Users/01/.gemini/antigravity/scratch/ft-bilal-designs/index.html';
let content = fs.readFileSync(file, 'utf8');

// 1. Replace Hero HTML
content = content.replace(/<!-- HERO SECTION -->[\s\S]*?<\/section>/, `<!-- HERO SECTION -->
        <section id="home">
            <div class="hero-name-layer">Muhammed Bilal</div>
            <img src="https://placehold.co/560x800/111111/C8A97E?text=Muhammed+Bilal" alt="Muhammed Bilal" class="hero-photo-layer" width="560" height="800">
            <div class="hero-labels-layer">
                Freelance<br>Graphic<br>Designer
            </div>
            <a href="#works" class="hero-cta-layer">See My Works</a>
        </section>`);

// 2. Replace Hero CSS block
const newStyle = `/* Hero */
        #home {
            position: relative;
            width: 100vw;
            height: 100vh;
            background: #0A0A0A;
            overflow: hidden;
            margin-bottom: var(--section-gap);
        }

        .hero-name-layer {
            position: absolute;
            left: 50%;
            transform: translateX(-50%);
            top: 15vh; /* slightly above center so photo overlaps it */
            font-family: 'Coolvetica', sans-serif;
            font-size: clamp(90px, 14vw, 180px);
            color: #F0F0F0;
            z-index: 1;
            white-space: nowrap;
            letter-spacing: -0.02em;
            opacity: 0;
            animation: heroFadeIn 0.8s cubic-bezier(0.22, 1, 0.36, 1) forwards;
        }

        .hero-photo-layer {
            position: absolute;
            left: 50%;
            bottom: 0;
            width: clamp(280px, 38vw, 560px);
            height: auto;
            object-fit: contain;
            object-position: bottom center;
            z-index: 2;
            filter: grayscale(100%);
            mix-blend-mode: luminosity;
            opacity: 0;
            animation: heroSlideUpFade 0.9s cubic-bezier(0.22, 1, 0.36, 1) 0.3s forwards;
        }

        @keyframes heroFadeIn {
            from { opacity: 0; }
            to { opacity: 1; }
        }

        @keyframes heroSlideUpFade {
            from {
                opacity: 0;
                transform: translate(-50%, 20px);
            }
            to {
                opacity: 1;
                transform: translate(-50%, 0);
            }
        }

        .hero-labels-layer {
            position: absolute;
            bottom: 48px;
            left: 48px;
            z-index: 3;
            font-family: 'Montserrat', sans-serif;
            font-weight: 400;
            font-size: clamp(16px, 2vw, 22px);
            color: #F0F0F0;
            line-height: 1.4;
            opacity: 0;
            animation: heroFadeIn 0.6s cubic-bezier(0.22, 1, 0.36, 1) 0.6s forwards;
        }

        .hero-cta-layer {
            position: absolute;
            bottom: 48px;
            right: 48px;
            z-index: 3;
            background: #F0F0F0;
            color: #1A1A1A;
            font-family: 'Montserrat', sans-serif;
            font-weight: 500;
            font-size: 14px;
            border-radius: 100px;
            padding: 14px 28px;
            display: inline-flex;
            align-items: center;
            justify-content: center;
            border: none;
            cursor: pointer;
            text-decoration: none;
            transition: all 0.3s ease;
            opacity: 0;
            animation: heroFadeIn 0.5s cubic-bezier(0.22, 1, 0.36, 1) 0.8s forwards;
        }

        .hero-cta-layer:hover {
            background-color: var(--color-accent);
            color: #0A0A0A;
        }

        @media (max-width: 1024px) {
            .hero-name-layer {
                font-size: clamp(70px, 12vw, 120px);
            }
            .hero-photo-layer {
                width: 55vw;
            }
            .hero-labels-layer {
                left: 32px;
                bottom: 36px;
            }
            .hero-cta-layer {
                right: 32px;
                bottom: 36px;
            }
        }

        @media (max-width: 768px) {
            .hero-name-layer {
                font-size: clamp(48px, 13vw, 80px);
                white-space: normal;
                text-align: center;
                line-height: 1.1;
                width: 100%;
                top: 20vh;
            }
            .hero-photo-layer {
                width: 80vw;
            }
            .hero-labels-layer {
                font-size: 14px;
                left: 24px;
                bottom: 28px;
            }
            .hero-cta-layer {
                font-size: 13px;
                padding: 12px 22px;
                right: 24px;
                bottom: 28px;
            }
        }
`;

content = content.replace(/\/\* Hero \*\/[\s\S]*?(?=\/\* About \*\/)/, newStyle + '\n        ');

// 3. Remove old media queries
content = content.replace(/\s*\.hero-title\s*{[^}]*}/, "");
content = content.replace(/\s*\.hero-grid\s*{[^}]*}/, "");
content = content.replace(/\s*\.hero-btns\s*{[^}]*}/, "");
content = content.replace(/\s*\.hero-subtext\s*{[^}]*}/, "");
content = content.replace(/\s*\.hero-img-col\s*{[^}]*}/, "");

// 4. Update prefers-reduced-motion to override animation-delay as well
content = content.replace(/transition-duration: 0\.01ms !important;/, 'transition-duration: 0.01ms !important;\\n                animation-delay: 0.01ms !important;');

// 5. Remove problematic JS referencing the old hero elements to avoid console errors
content = content.replace(/const heroImg = document\.querySelector\('\.hero-img-wrapper img'\);/, "");
content = content.replace(/if \(heroImg\) heroImg\.style\.transform = `translateY\(\\\${scrollY \* 0\.35}px\)`;/, "");

// Also remove document.querySelectorAll('.hero-anim') logic
const heroAnimJsPattern = /\/\/ 1\. Hero Load Sequence[\s\S]*?(?=\/\/ 2\. Navbar Scroll Style)/;
content = content.replace(heroAnimJsPattern, "");

fs.writeFileSync(file, content, 'utf8');
console.log('Successfully updated the file.');
