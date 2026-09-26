import {
  ArrowUpRight,
  Mail,
  Phone,
} from 'lucide-react';

import Aurora from '@/components/Aurora';
import AccordionGallery from '@/components/AccordionGallery';
import AnimatedContent from '@/components/AnimatedContent';
import BlurText from '@/components/BlurText';
import ChromaGrid from '@/components/ChromaGrid';
import DeferredSplashCursor from '@/components/DeferredSplashCursor';
import DotField from '@/components/DotField';
import LogoLoop from '@/components/LogoLoop';
import KineticFooter from '@/components/KineticFooter';
import Particles from '@/components/Particles';
import ProfileCard from '@/components/ProfileCard';
import ScrollFloat from '@/components/ScrollFloat';
import Shuffle from '@/components/Shuffle';
import SpecularButton from '@/components/SpecularButton';
import SiteIntro from '@/components/SiteIntro';
import SpotlightCard from '@/components/SpotlightCard';
import TearTicket from '@/components/TearTicket';
import { projects } from '@/data/projects';

const strengths = [
  {
    id: 'A',
    title: '品牌视觉',
    en: 'VISUAL IDENTITY',
    copy: '从概念提炼到视觉语言建立，完成 VI、海报与传播物料的统一表达。',
    accent: '#ff766b',
    spotlight: 'rgba(255, 118, 107, 0.28)',
    gradient: 'radial-gradient(circle at 4% 4%, rgba(255, 118, 107, 0.2), transparent 34%), linear-gradient(145deg, #1b1517, #0b0d11 64%)',
  },
  {
    id: 'B',
    title: '编辑与版式',
    en: 'EDITORIAL DESIGN',
    copy: '重视信息层级、字体节奏与阅读路径，让复杂内容保持清晰且有记忆点。',
    accent: '#4ad8ff',
    spotlight: 'rgba(74, 216, 255, 0.24)',
    gradient: 'radial-gradient(circle at 96% 6%, rgba(74, 216, 255, 0.18), transparent 38%), linear-gradient(145deg, #111621, #090c11 66%)',
  },
  {
    id: 'C',
    title: 'IP 与插画',
    en: 'IP CHARACTER',
    copy: '结合文化语境与传播场景，发展角色设定、延展图形和文创应用。',
    accent: '#49efc2',
    spotlight: 'rgba(73, 239, 194, 0.24)',
    gradient: 'radial-gradient(circle at 3% 96%, rgba(73, 239, 194, 0.2), transparent 36%), linear-gradient(145deg, #101917, #090d10 66%)',
  },
  {
    id: 'D',
    title: '数字化创作',
    en: 'DIGITAL CRAFT',
    copy: '熟练使用 Adobe Creative Suite、Figma，并将 AIGC 纳入创意探索流程。',
    accent: '#cf57ff',
    spotlight: 'rgba(207, 87, 255, 0.25)',
    gradient: 'radial-gradient(circle at 96% 96%, rgba(207, 87, 255, 0.2), transparent 38%), linear-gradient(145deg, #17111c, #0b0c12 66%)',
  },
];

const softwareTools = [
  { code: 'Ai', name: 'Illustrator', className: 'tool-mark--ai' },
  { code: 'Ps', name: 'Photoshop', className: 'tool-mark--ps' },
  { code: 'Id', name: 'InDesign', className: 'tool-mark--id' },
  { code: 'Pr', name: 'Premiere', className: 'tool-mark--pr' },
  { code: 'Ae', name: 'After Effects', className: 'tool-mark--ae' },
  { code: 'B', name: 'Blender', className: 'tool-mark--blender' },
  { code: 'Fi', name: 'Figma', className: 'tool-mark--figma' },
  { code: '◉', name: 'ChatGPT', className: 'tool-mark--chatgpt' },
].map((tool) => ({
  title: tool.name,
  node: (
    <span className={`tool-mark ${tool.className}`}>
      <b>{tool.code}</b>
      <span>{tool.name}</span>
    </span>
  ),
}));

export default function Home() {
  return (
    <main>
      <SiteIntro />
      <DeferredSplashCursor
        SIM_RESOLUTION={96}
        DYE_RESOLUTION={720}
        DENSITY_DISSIPATION={9.5}
        VELOCITY_DISSIPATION={8}
        PRESSURE={0.5}
        CURL={17}
        SPLAT_RADIUS={0.1}
        SPLAT_FORCE={5000}
        RAINBOW_MODE={false}
        COLOR="#ff3528"
      />
      <section className="hero" id="top">
        <img
          className="hero-image"
          src="/hero-cover.jpg"
          alt="红黑霓虹场景中的潮流角色视觉作品"
          decoding="async"
          fetchPriority="high"
        />
        <div className="hero-dot-field" aria-hidden="true">
          <DotField
            dotRadius={1.5}
            dotSpacing={15}
            bulgeStrength={67}
            glowRadius={160}
            sparkle={false}
            waveAmplitude={0}
            gradientFrom="#ff0000"
            gradientTo="#ff0000"
            glowColor="#ff0000"
          />
        </div>
        <div className="hero-particles" aria-hidden="true">
          <Particles
            particleColors={["#ff0000"]}
            particleCount={140}
            particleSpread={10}
            speed={0.1}
            particleBaseSize={100}
            moveParticlesOnHover
            alphaParticles={false}
            disableRotation={false}
          />
        </div>
        <div className="hero-overlay" />
        <header className="site-header shell">
          <a className="brand" href="#top" aria-label="返回首页">
            <span className="brand-monogram">LY</span>
            <span className="brand-name">LIU YINA<br />VISUAL DESIGN</span>
          </a>
          <nav aria-label="主导航">
            <a href="#top">Home</a>
            <a href="#about">About</a>
            <a href="#work">Works</a>
          </nav>
          <div className="header-actions">
            <SpecularButton
              href="mailto:1840339754@qq.com"
              size="sm"
              radius={24}
              tint="#ffffff"
              tintOpacity={0.1}
              blur={18}
              lineColor="#ff3528"
              baseColor="#6b6b6b"
              intensity={1.7}
              shineSize={16}
              shineFade={42}
              thickness={1.15}
              speed={0.3}
              followMouse
              proximity={220}
              autoAnimate
            >
              联系我
            </SpecularButton>
            <SpecularButton
              href="#work"
              size="sm"
              radius={24}
              tint="#111214"
              tintOpacity={0.42}
              blur={18}
              lineColor="#ff3528"
              baseColor="#555555"
              intensity={1.7}
              shineSize={16}
              shineFade={42}
              thickness={1.15}
              speed={0.3}
              followMouse
              proximity={220}
              autoAnimate
            >
              查看作品
            </SpecularButton>
          </div>
        </header>

        <div className="hero-stage shell">
          <div className="hero-copy">
            <div className="hero-left-panel">
              <p className="hero-eyebrow">VISUAL COMMUNICATION / 2026</p>
              <h1>
                <Shuffle
                  text="DESIGN THAT"
                  tag="span"
                  className="hero-title-line hero-title-shuffle"
                  shuffleDirection="up"
                  duration={0.9}
                  shuffleTimes={2}
                  scrambleCharset="DESIGNTHAT"
                  ease="expo.out"
                  stagger={0.028}
                  loop
                  loopDelay={1.6}
                  triggerOnHover={false}
                  highlightWords={['DESIGN']}
                />
                <Shuffle
                  text="MOVES YOU"
                  tag="span"
                  className="hero-title-line hero-title-shuffle"
                  shuffleDirection="up"
                  duration={0.9}
                  shuffleTimes={2}
                  scrambleCharset="MOVESYOU"
                  ease="expo.out"
                  stagger={0.028}
                  loop
                  loopDelay={1.6}
                  triggerOnHover={false}
                  highlightWords={['MOVES']}
                />
              </h1>
            </div>

            <div className="hero-right-panel">
              <p className="hero-role-kicker">LIU YINA / VISUAL DESIGNER</p>
              <p className="hero-description">
                用品牌视觉、编辑设计与 IP 形象，
                把想法转化为清晰而有张力的表达。
              </p>
            </div>
          </div>

          <div className="hero-bottom">
            <BlurText
              text="VISUAL STORIES IN MOTION."
              delay={105}
              animateBy="words"
              direction="bottom"
              stepDuration={0.42}
              threshold={0.1}
              className="hero-statement"
              highlightWords={['STORIES']}
            />
            <LogoLoop
              logos={softwareTools}
              speed={72}
              direction="left"
              logoHeight={34}
              gap={54}
              hoverSpeed={16}
              scaleOnHover
              ariaLabel="常用设计与创作软件"
              className="hero-stats"
            />
          </div>
        </div>
      </section>

      <div className="portfolio-body">
        <div className="aurora-backdrop" aria-hidden="true">
          <Aurora
            colorStops={['#000000', '#68020a', '#000000']}
            blend={1}
            amplitude={1}
            speed={1.35}
          />
        </div>

      <section className="about section shell" id="about">
        <h2 className="about-display-title" aria-label="About me">
          <ScrollFloat
            tag="span"
            containerClassName="about-scroll-word"
            textClassName="about-scroll-word-text"
            animationDuration={1}
            ease="back.inOut(2)"
            scrollStart="center bottom+=50%"
            scrollEnd="bottom bottom-=40%"
            stagger={0.1}
          >
            ABOUT
          </ScrollFloat>
          <ScrollFloat
            tag="span"
            containerClassName="about-scroll-word"
            textClassName="about-scroll-word-text"
            animationDuration={1}
            ease="back.inOut(2)"
            scrollStart="center bottom+=50%"
            scrollEnd="bottom bottom-=40%"
            stagger={0.1}
          >
            ME
          </ScrollFloat>
        </h2>

        <AnimatedContent
          className="about-grid"
          distance={110}
          direction="horizontal"
          reverse
          duration={1.1}
          ease="power3.out"
          initialOpacity={0.08}
          animateOpacity
          scale={0.985}
          threshold={0.14}
          delay={0.05}
        >
          <ProfileCard
            className="about-profile-card"
            avatarUrl="/portrait-liu-yina.jpg"
            miniAvatarUrl="/portrait-liu-yina.jpg"
            name="刘依娜"
            title="VISUAL DESIGNER"
            handle="LYN-01"
            status="AVAILABLE FOR WORK"
            contactText="联系我"
            contactHref="mailto:1840339754@qq.com"
            showUserInfo
            enableTilt
            behindGlowEnabled
            behindGlowColor="rgba(255, 53, 40, 0.62)"
            behindGlowSize="58%"
            innerGradient="linear-gradient(145deg, rgba(255, 53, 40, 0.12), transparent 44%, rgba(4, 5, 7, 0.68))"
          />

          <SpotlightCard
            className="about-copy"
            spotlightColor="rgba(255, 56, 49, 0.22)"
          >
            <p className="eyebrow">LIU YINA / VISUAL DESIGNER</p>
            <h2>
              <ScrollFloat
                tag="span"
                containerClassName="about-intro-float"
                textClassName="about-intro-float-text"
                animationDuration={1}
                ease="back.inOut(2)"
                scrollStart="center bottom+=50%"
                scrollEnd="bottom bottom-=40%"
                stagger={0.1}
              >
                嗨，我是刘依娜！
              </ScrollFloat>
            </h2>
            <p className="lead">
              视觉传达设计专业背景，具备扎实的平面设计基础，关注品牌、文字与图像之间的关系。
              我喜欢从信息结构出发，把概念转译为可被看见、理解和记住的视觉系统。
            </p>

            <div className="about-facts">
              <article>
                <span>教育背景</span>
                <strong>湖州学院 · 视觉传达设计</strong>
                <p>2023 — 2027 / 本科 / GPA 4.47</p>
              </article>
              <article>
                <span>实践经历</span>
                <strong>杭州小荷园艺有限公司</strong>
                <p>2025.07 — 08 / 宣传部实习生</p>
              </article>
              <article>
                <span>专业方向</span>
                <strong>品牌视觉 / 编辑设计 / IP 形象</strong>
                <p>平面、品牌、插画与数字化创作</p>
              </article>
              <article className="about-fact-contact">
                <span>联系方式</span>
                <a href="mailto:1840339754@qq.com">
                  <Mail size={16} /> 1840339754@qq.com
                </a>
                <a href="tel:+8619818108322">
                  <Phone size={16} /> +86 198 1810 8322
                </a>
              </article>
            </div>

            <div className="metrics" aria-label="项目数据">
              <article>
                <strong>12</strong>
                <span>赛事及落地成果</span>
              </article>
              <article>
                <strong className="metric-percent">5<sup>%</sup></strong>
                <span>专业综合排名</span>
              </article>
              <article>
                <strong>04</strong>
                <span>核心创作方向</span>
              </article>
              <article>
                <strong>04</strong>
                <span>品牌商业实践</span>
              </article>
            </div>

            <div className="about-skills">
              <p>核心能力</p>
              <div>
                <span>品牌视觉</span>
                <span>编辑与版式</span>
                <span>IP 与插画</span>
                <span>UI与AIGC</span>
              </div>
            </div>
          </SpotlightCard>
        </AnimatedContent>
      </section>

      <section className="work section" id="work">
        <div className="shell">
          <AnimatedContent
            className="work-reveal"
            distance={120}
            direction="horizontal"
            duration={1.15}
            ease="power3.out"
            initialOpacity={0.08}
            animateOpacity
            scale={0.985}
            threshold={0.12}
            delay={0.08}
          >
            <div className="work-title-row">
              <h2 aria-label="精选项目">
                <ScrollFloat
                  tag="span"
                  containerClassName="work-title-float"
                  textClassName="work-title-float-text"
                  animationDuration={1}
                  ease="back.inOut(2)"
                  scrollStart="center bottom+=50%"
                  scrollEnd="bottom bottom-=40%"
                  stagger={0.1}
                >
                  精选
                </ScrollFloat>
                <ScrollFloat
                  tag="span"
                  containerClassName="work-title-float"
                  textClassName="work-title-float-text"
                  animationDuration={1}
                  ease="back.inOut(2)"
                  scrollStart="center bottom+=50%"
                  scrollEnd="bottom bottom-=40%"
                  stagger={0.1}
                >
                  项目
                </ScrollFloat>
              </h2>
              <p>
                从文化 IP 到编辑设计，
                <br />
                以系统思考连接概念与成品。
              </p>
            </div>

            <AccordionGallery
              items={projects.map((project) => ({
                id: project.id,
                label: project.title,
                meta: project.type,
                result: project.result,
                className: project.className,
                word: project.word,
                href: `/projects/${project.slug}`,
              }))}
              defaultIndex={0}
              expandRatio={0.56}
              trigger="hover"
              accentColor="#ff302b"
              overlayColor="#070808"
              height={620}
              gap={12}
              radius={28}
            />
          </AnimatedContent>
        </div>
      </section>

      <section className="strengths section shell" id="strengths">
        <AnimatedContent
          className="strengths-reveal"
          distance={105}
          direction="horizontal"
          reverse
          duration={1.1}
          ease="power3.out"
          initialOpacity={0.08}
          animateOpacity
          scale={0.985}
          threshold={0.12}
          delay={0.08}
        >
          <div className="strengths-intro">
            <h2>
              <span>核心</span>
              <span>能力</span>
            </h2>
            <p>
              从研究、概念到落地，我关注每一个媒介中的一致性，
              同时为项目保留必要的张力与个性。
            </p>
          </div>
          <ChromaGrid
            className="strength-grid"
            items={strengths.map((item) => ({
              id: item.id,
              title: item.title,
              handle: item.en,
              subtitle: item.copy,
              borderColor: item.accent,
              spotlightColor: item.spotlight,
              gradient: item.gradient,
            }))}
            radius={320}
            columns={2}
            damping={0.42}
            fadeOut={0.55}
          />
        </AnimatedContent>
      </section>

      <footer className="contact-screen" id="contact">
        <AnimatedContent
          className="contact-reveal"
          distance={90}
          direction="vertical"
          duration={1.05}
          ease="power3.out"
          initialOpacity={0.08}
          animateOpacity
          scale={0.99}
          threshold={0.1}
        >
        <div className="contact-header shell">
          <div className="contact-brand-block">
            <p>LIU YINA / VISUAL DESIGNER</p>
            <h2 aria-label="让想法被看见，也被记住。">
              <ScrollFloat
                tag="span"
                containerClassName="contact-title-line"
                textClassName="contact-title-line-text"
                animationDuration={1}
                ease="back.inOut(2)"
                scrollStart="center bottom+=50%"
                scrollEnd="bottom bottom-=40%"
                stagger={0.1}
              >
                让想法被看见，
              </ScrollFloat>
              <ScrollFloat
                tag="span"
                containerClassName="contact-title-line"
                textClassName="contact-title-line-text"
                animationDuration={1}
                ease="back.inOut(2)"
                scrollStart="center bottom+=50%"
                scrollEnd="bottom bottom-=40%"
                stagger={0.1}
              >
                也被记住。
              </ScrollFloat>
            </h2>
            <span>开放实习、品牌视觉与创意项目合作。</span>
          </div>

          <nav className="contact-nav" aria-label="页脚导航">
            <a href="#top"><span>01</span>首页</a>
            <a href="#about"><span>02</span>关于我</a>
            <a href="#work"><span>03</span>精选项目</a>
            <a className="contact-nav-primary" href="mailto:1840339754@qq.com">
              <span>04</span>联系我
              <ArrowUpRight size={18} strokeWidth={1.4} />
            </a>
          </nav>
        </div>

        <div className="contact-ticker">
          <LogoLoop
            logos={softwareTools}
            speed={72}
            direction="left"
            logoHeight={34}
            gap={54}
            hoverSpeed={16}
            scaleOnHover
            fadeOut
            fadeOutColor="#050607"
            ariaLabel="常用设计与创作软件"
            className="software-loop"
          />
        </div>

        <div className="contact-directory shell">
          <div className="contact-ticket-shell">
            <TearTicket
              image="/footer-contact-ticket.jpg"
              imageAlt="红黑霓虹场景中的潮流女孩"
              stub={
                <div className="contact-ticket-stub">
                  <small>PULL / TEAR</small>
                  <strong>LYN</strong>
                  <span>CONTACT</span>
                  <span>2026</span>
                </div>
              }
              width={560}
              height={360}
              stubSize={138}
              radius={18}
              holes={16}
              holeSize={7}
              notch={4}
              tearAngle={28}
              stretch={42}
              resistance={0.48}
              rotate={-1.2}
              tilt
              tiltMax={7}
              tiltReach={240}
              parallax={7}
              perspective={1100}
              background="#090b0c"
              stubBackground="#161010"
              color="#f5f5f1"
              border
              borderColor="rgba(255, 255, 255, 0.24)"
              ariaLabel="撕下联系票根"
              className="contact-ticket"
            >
              <div className="contact-ticket-copy">
                <span>PORTFOLIO / VISUAL DESIGN</span>
                <strong>LIU YINA © 2026</strong>
                <small>拖动右侧票根开启联系</small>
              </div>
            </TearTicket>
          </div>

          <div className="contact-information">
            <section>
              <h3>个人信息</h3>
              <p><span>姓名</span>刘依娜</p>
              <p><span>身份</span>视觉设计师</p>
              <p><span>方向</span>品牌 / 编辑 / IP</p>
            </section>
            <section>
              <h3>专业背景</h3>
              <p><span>院校</span>湖州学院</p>
              <p><span>专业</span>视觉传达设计</p>
              <p><span>毕业</span>2027</p>
            </section>
            <section>
              <h3>联系方式</h3>
              <p><span>邮箱</span><a href="mailto:1840339754@qq.com">1840339754@qq.com</a></p>
              <p><span>电话</span><a href="tel:+8619818108322">+86 198 1810 8322</a></p>
              <p><span>合作状态</span>可接受实习与项目合作</p>
            </section>
          </div>
        </div>

        <div className="contact-bottom shell">
          <span>DESIGNED BY LIU YINA</span>
          <a href="mailto:1840339754@qq.com">LET&apos;S TALK</a>
          <a href="#top">BACK TO TOP ↑</a>
        </div>
        </AnimatedContent>
        <KineticFooter />
      </footer>
      </div>
    </main>
  );
}
