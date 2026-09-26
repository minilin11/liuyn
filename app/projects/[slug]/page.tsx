import type { Metadata } from 'next';
import { ArrowLeft, ArrowUpRight } from 'lucide-react';

import ProjectImageLightbox from '@/components/ProjectImageLightbox';
import StrokeText from '@/components/StrokeText';
import { projects } from '@/data/projects';

type ProjectPageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return projects.map((project) => ({ slug: project.slug }));
}

export async function generateMetadata({ params }: ProjectPageProps): Promise<Metadata> {
  const { slug } = await params;
  const project = projects.find((item) => item.slug === slug);
  return {
    title: project ? `${project.title}｜刘依娜作品集` : '项目详情｜刘依娜作品集',
    description: project?.description,
  };
}

export default async function ProjectDetailPage({ params }: ProjectPageProps) {
  const { slug } = await params;
  const project = projects.find((item) => item.slug === slug);

  if (!project) {
    return (
      <main className="project-detail project-detail--missing">
        <p>未找到该项目。</p>
        <a href="/#work">返回精选项目</a>
      </main>
    );
  }

  const isBrandProject = project.slug === 'kongzi-ip';
  const isEditorialProject = project.slug === 'zhuangyuan';
  const isIpProject = project.slug === 'zhouhou-huilan';
  const isDigitalProject = project.slug === 'sun-xiaosheng';
  const projectIndex = projects.findIndex((item) => item.slug === project.slug);
  const nextProject = projects[(projectIndex + 1) % projects.length];
  const detailFacts = isEditorialProject
    ? {
        type: '编辑与版式 / 视觉信息设计',
        result: '公益海报 / 商业海报 / 书籍装帧 / 宣传折页',
        focus: ['信息层级', '图文编排', '视觉叙事', '版式系统'],
      }
    : isIpProject
      ? {
          type: 'IP 形象设计 / 角色视觉',
          result: '角色设定 / 海报系统 / 场景应用 / 文创延展',
          focus: ['文化转译', '角色塑造', '表情动作', '应用系统'],
        }
      : isDigitalProject
        ? {
            type: 'UI / UX · 动态视觉',
            result: 'APP 界面 / 品牌宣传 / 标志动效 / 影像实验',
            focus: ['界面系统', '交互流程', '品牌影像', '动态设计'],
          }
    : {
        type: project.type,
        result: project.result,
        focus: project.focus,
      };

  return (
    <main className="project-detail">
      <nav className="project-detail-nav shell" aria-label="项目详情导航">
        <a href="/#work"><ArrowLeft size={18} /> 返回项目</a>
        <span>LIU YINA / VISUAL DESIGN</span>
      </nav>

      <article
        className="project-detail-content shell"
        data-project-gallery
      >
        {isBrandProject && (
          <div className="brand-detail-sections" aria-label="品牌视觉内容分类">
            <section className="brand-detail-section brand-detail-section--practice">
              <header className="brand-detail-section__header">
                <div className="brand-detail-section__number">
                  <span>01</span>
                  <small>BRAND PRACTICE</small>
                </div>
                <div>
                  <p>从真实场景出发，建立统一而可执行的品牌表达。</p>
                  <h2>
                    <StrokeText
                      text="品牌实践项目"
                      strokeColor="#ff6259"
                      fillColor="#f4f5f1"
                      strokeWidth={1.3}
                      drawDuration={1.35}
                      fillDelay={0.12}
                      stagger={0.055}
                      trigger="scroll"
                      fillMode="wipe"
                      fontSize={112}
                      fontWeight={850}
                      letterSpacing={-7}
                      className="detail-stroke-title"
                    />
                  </h2>
                </div>
              </header>

              <div className="brand-practice-project">
                <article className="brand-practice-project__intro">
                  <div>
                    <span className="brand-detail-card__label">PROJECT 01 / BRAND PRACTICE</span>
                    <h3 className="brand-practice-title">
                      <span>榧间集</span>
                      <span>安吉香榧</span>
                    </h3>
                  </div>
                  <div>
                    <p>围绕安吉香榧建立年轻化品牌系统，以鲜明色彩、原创 IP 与异形包装强化产品识别，并将品牌标志、辅助图形和应用物料统一到完整的消费体验中。</p>
                    <ul aria-label="项目关键词">
                      <li>品牌识别</li>
                      <li>IP 形象</li>
                      <li>包装设计</li>
                      <li>应用延展</li>
                    </ul>
                  </div>
                </article>

                <div className="brand-practice-gallery" aria-label="榧间集安吉香榧品牌实践项目展板">
                  {[
                    ['01', '/projects/brand-visual/anji-xiangfei-01.jpg', '榧间集安吉香榧品牌包装设计总览'],
                    ['02', '/projects/brand-visual/anji-xiangfei-02.jpg', '榧间集品牌识别与IP形象设计'],
                    ['03', '/projects/brand-visual/anji-xiangfei-03.jpg', '榧间集包装结构与细节设计'],
                    ['04', '/projects/brand-visual/anji-xiangfei-04.jpg', '榧间集包装实物展示']
                  ].map(([number, src, alt]) => (
                    <figure className="brand-practice-work" key={src}>
                      <div className="brand-practice-work__image">
                        <img src={src} alt={alt} loading="lazy" />
                      </div>
                      <figcaption>
                        <span>{number}</span>
                        <small>{number === '04' ? '包装实物与场景呈现' : '品牌系统与包装设计展板'}</small>
                      </figcaption>
                    </figure>
                  ))}
                </div>
              </div>

              <div className="brand-practice-project brand-practice-project--bamboo">
                <article className="brand-practice-project__intro">
                  <div>
                    <span className="brand-detail-card__label">PROJECT 02 / BRAND PRACTICE</span>
                    <h3 className="brand-practice-title">
                      <span>竹浅</span>
                      <span>竹饮汽水</span>
                    </h3>
                  </div>
                  <div>
                    <p>以竹节结构与中空圆环为核心视觉语言，建立轻盈自然的饮品品牌形象；围绕瓶型、外包装和传播物料延展系列口味，使产品兼具清爽识别、货架表现与完整应用体验。</p>
                    <ul aria-label="项目关键词">
                      <li>饮品品牌</li>
                      <li>包装系统</li>
                      <li>结构设计</li>
                      <li>传播应用</li>
                    </ul>
                  </div>
                </article>

                <div className="brand-practice-gallery brand-practice-gallery--two" aria-label="竹浅竹饮汽水品牌实践项目展板">
                  <figure className="brand-practice-work">
                    <div className="brand-practice-work__image">
                      <img
                        src="/projects/brand-visual/shallow-bamboo-practice-01.jpg"
                        alt="竹浅竹饮汽水品牌标志、包装与应用设计展板"
                        loading="lazy"
                      />
                    </div>
                    <figcaption>
                      <span>01</span>
                      <small>品牌标志、包装结构与应用系统</small>
                    </figcaption>
                  </figure>

                  <figure className="brand-practice-work">
                    <div className="brand-practice-work__image">
                      <img
                        src="/projects/brand-visual/shallow-bamboo-practice-02.png"
                        alt="竹浅竹子汽水罐装包装与传播应用展板"
                        loading="lazy"
                      />
                    </div>
                    <figcaption>
                      <span>02</span>
                      <small>罐装视觉、系列包装与传播延展</small>
                    </figcaption>
                  </figure>
                </div>
              </div>

              <div className="brand-practice-project brand-practice-project--vis">
                <article className="brand-practice-project__intro">
                  <div>
                    <span className="brand-detail-card__label">PROJECT 03 / BRAND PRACTICE</span>
                    <h3 className="brand-practice-title">
                      <span>核工井巷</span>
                      <span>VIS手册</span>
                    </h3>
                  </div>
                  <div>
                    <p>为核工业井巷建设集团建立系统化视觉识别规范，覆盖标志结构、标准字体、品牌色彩、组合规范与办公、导视、宣传等应用场景，使企业形象在不同媒介中保持专业、统一且易于执行。</p>
                    <ul aria-label="项目关键词">
                      <li>VIS 手册</li>
                      <li>基础系统</li>
                      <li>应用系统</li>
                      <li>规范管理</li>
                    </ul>
                  </div>
                </article>

                <div className="brand-practice-gallery brand-practice-gallery--single" aria-label="核工井巷建设集团VIS手册总览">
                  <figure className="brand-practice-work brand-practice-work--wide">
                    <div className="brand-practice-work__image">
                      <img
                        src="/projects/brand-visual/nuclear-vis-manual.jpg"
                        alt="核工业井巷建设集团VIS设计系统规范手册页面总览"
                        loading="lazy"
                      />
                    </div>
                    <figcaption>
                      <span>01</span>
                      <small>基础识别与应用系统规范总览</small>
                    </figcaption>
                  </figure>
                </div>
              </div>
            </section>

            <section className="brand-detail-section brand-detail-section--logos">
              <header className="brand-detail-section__header">
                <div className="brand-detail-section__number">
                  <span>02</span>
                  <small>LOGO DESIGN</small>
                </div>
                <div>
                  <p>在简洁形态中浓缩品牌特征，兼顾记忆与使用。</p>
                  <h2>
                    <StrokeText
                      text="标志设计"
                      strokeColor="#ff6259"
                      fillColor="#f4f5f1"
                      strokeWidth={1.3}
                      drawDuration={1.35}
                      fillDelay={0.12}
                      stagger={0.06}
                      trigger="scroll"
                      fillMode="wipe"
                      fontSize={112}
                      fontWeight={850}
                      letterSpacing={-7}
                      className="detail-stroke-title"
                    />
                  </h2>
                </div>
              </header>

              <div className="brand-logo-layout">
                <article className="brand-detail-card brand-detail-card--logo">
                  <span className="brand-detail-card__label">设计原则 / PRINCIPLES</span>
                  <h3>清晰的识别，稳定的系统</h3>
                  <p>从概念关键词、符号原型与字体结构中提炼标志，并通过比例、留白与组合规范保证它在不同尺寸和载体上的可用性。</p>
                </article>
                <div className="brand-logo-gallery" aria-label="标志设计作品">
                  <figure className="brand-logo-work">
                    <div className="brand-logo-work__image">
                      <img
                        src="/projects/brand-visual/suzhou-museum-logo-01.jpg"
                        alt="智绘古城·博物江南苏州博物馆文物标志设计方案一"
                        loading="lazy"
                      />
                    </div>
                    <figcaption>
                      <span>01 / CULTURAL LOGO</span>
                      <strong>智绘古城 · 博物江南</strong>
                      <small>苏州博物馆文物标志设计 / 方案一</small>
                    </figcaption>
                  </figure>

                  <figure className="brand-logo-work">
                    <div className="brand-logo-work__image">
                      <img
                        src="/projects/brand-visual/suzhou-museum-logo-02.jpg"
                        alt="智绘古城·博物江南苏州博物馆文物标志设计方案二"
                        loading="lazy"
                      />
                    </div>
                    <figcaption>
                      <span>02 / CULTURAL LOGO</span>
                      <strong>智绘古城 · 博物江南</strong>
                      <small>苏州博物馆文物标志设计 / 方案二</small>
                    </figcaption>
                  </figure>

                  <figure className="brand-logo-work">
                    <div className="brand-logo-work__image">
                      <img
                        src="/projects/brand-visual/shifangji-tea-logo.jpg"
                        alt="拾芳记谢裕大花茶系列标志设计"
                        loading="lazy"
                      />
                    </div>
                    <figcaption>
                      <span>03 / PRODUCT LOGO</span>
                      <strong>拾芳记</strong>
                      <small>谢裕大花茶系列标志设计</small>
                    </figcaption>
                  </figure>

                  <figure className="brand-logo-work">
                    <div className="brand-logo-work__image">
                      <img
                        src="/projects/brand-visual/zaozhuang-cultural-center-01.jpg"
                        alt="枣庄市文化馆标志设计绿色方案"
                        loading="lazy"
                      />
                    </div>
                    <figcaption>
                      <span>04 / CULTURAL LOGO</span>
                      <strong>枣庄市文化馆</strong>
                      <small>地域建筑与运河文化标志设计 / 绿色方案</small>
                    </figcaption>
                  </figure>

                  <figure className="brand-logo-work">
                    <div className="brand-logo-work__image">
                      <img
                        src="/projects/brand-visual/zaozhuang-cultural-center-02.jpg"
                        alt="枣庄市文化馆标志设计飘带方案"
                        loading="lazy"
                      />
                    </div>
                    <figcaption>
                      <span>05 / CULTURAL LOGO</span>
                      <strong>枣庄市文化馆</strong>
                      <small>地域文字与飘带意象标志设计 / 红色方案</small>
                    </figcaption>
                  </figure>

                  <figure className="brand-logo-work">
                    <div className="brand-logo-work__image">
                      <img
                        src="/projects/brand-visual/zaozhuang-cultural-center-03.jpg"
                        alt="山东枣庄文化馆标志设计建筑方案"
                        loading="lazy"
                      />
                    </div>
                    <figcaption>
                      <span>06 / CULTURAL LOGO</span>
                      <strong>山东 · 枣庄</strong>
                      <small>台儿庄建筑意象标志设计 / 红色方案</small>
                    </figcaption>
                  </figure>

                  <figure className="brand-logo-work">
                    <div className="brand-logo-work__image">
                      <img
                        src="/projects/brand-visual/zaozhuang-cultural-center-04.jpg"
                        alt="枣庄市文化馆标志设计红色水波方案"
                        loading="lazy"
                      />
                    </div>
                    <figcaption>
                      <span>07 / CULTURAL LOGO</span>
                      <strong>枣庄市文化馆</strong>
                      <small>台儿庄古城与水波意象标志设计 / 红色方案</small>
                    </figcaption>
                  </figure>

                  <figure className="brand-logo-work">
                    <div className="brand-logo-work__image">
                      <img
                        src="/projects/brand-visual/xin-ying-xiang-brand.png"
                        alt="薪影颂传品牌标志与IP形象设计展板"
                        loading="lazy"
                      />
                    </div>
                    <figcaption>
                      <span>08 / BRAND IDENTITY</span>
                      <strong>薪影颂传</strong>
                      <small>地域文化视觉识别与 IP 应用</small>
                    </figcaption>
                  </figure>

                  <figure className="brand-logo-work">
                    <div className="brand-logo-work__image">
                      <img
                        src="/projects/brand-visual/nuclear-engineering-logo.png"
                        alt="核工井巷品牌标志设计展板"
                        loading="lazy"
                      />
                    </div>
                    <figcaption>
                      <span>09 / CORPORATE LOGO</span>
                      <strong>核工井巷</strong>
                      <small>企业品牌标志与应用系统</small>
                    </figcaption>
                  </figure>

                  <figure className="brand-logo-work brand-logo-work--landscape">
                    <div className="brand-logo-work__image">
                      <img
                        src="/projects/brand-visual/zaozhuang-ui-wayfinding.jpg"
                        alt="枣庄市文化馆UI与导向图标设计展板"
                        loading="lazy"
                      />
                    </div>
                    <figcaption>
                      <span>10 / WAYFINDING</span>
                      <strong>枣庄市文化馆导向图标</strong>
                      <small>公共空间 UI 与导向图标系统</small>
                    </figcaption>
                  </figure>

                  <figure className="brand-logo-work brand-logo-work--landscape">
                    <div className="brand-logo-work__image">
                      <img
                        src="/projects/brand-visual/shallow-bamboo-logo.jpg"
                        alt="竹浅与竹语涧竹文化主题标志方案"
                        loading="lazy"
                      />
                    </div>
                    <figcaption>
                      <span>11 / LOGO STUDIES</span>
                      <strong>竹饮汽水标志</strong>
                      <small>竹文化主题标志概念与字体实验</small>
                    </figcaption>
                  </figure>

                </div>
              </div>
            </section>
          </div>
        )}

        {isEditorialProject && (
          <section className="editorial-detail" aria-label="编辑与版式作品">
            <header className="editorial-detail__header">
              <div>
                <span>01</span>
                <small>EDITORIAL DESIGN</small>
              </div>
              <div>
                <p>以清晰的信息层级组织图像、文字与留白，让主题表达更有节奏。</p>
                <h2>
                  <StrokeText
                    text="编辑与版式"
                    strokeColor="#73d4bf"
                    fillColor="#f4f5f1"
                    strokeWidth={1.3}
                    drawDuration={1.35}
                    fillDelay={0.12}
                    stagger={0.06}
                    trigger="scroll"
                    fillMode="wipe"
                    fontSize={112}
                    fontWeight={850}
                    letterSpacing={-7}
                    className="detail-stroke-title"
                  />
                </h2>
              </div>
            </header>

            <article className="editorial-project">
              <div className="editorial-project__intro">
                <div>
                  <span>PROJECT 01 / PUBLIC POSTER</span>
                  <h3>节能环保 · 公益海报</h3>
                </div>
                <p>以灯泡轮廓承载湖州城市景观与自然意象，通过清透渐变色和纵向文字建立轻盈、有呼吸感的环保主题版式。</p>
              </div>
              <div className="editorial-gallery">
                <figure className="editorial-work">
                  <div className="editorial-work__image">
                    <img
                      src="/projects/editorial-layout/environmental-poster-01.jpg"
                      alt="以飞英塔和自然景观为主题的节能环保公益海报"
                      loading="lazy"
                    />
                  </div>
                  <figcaption><span>01</span><small>飞英塔与自然景观主题</small></figcaption>
                </figure>
                <figure className="editorial-work">
                  <div className="editorial-work__image">
                    <img
                      src="/projects/editorial-layout/environmental-poster-02.jpg"
                      alt="以湖州城市建筑和山水为主题的节能环保公益海报"
                      loading="lazy"
                    />
                  </div>
                  <figcaption><span>02</span><small>城市建筑与山水主题</small></figcaption>
                </figure>
              </div>
            </article>

            <article className="editorial-project editorial-project--commercial">
              <div className="editorial-project__intro">
                <div>
                  <span>PROJECT 02 / COMMERCIAL POSTER</span>
                  <h3>“梨”想生活 · 商业创意海报</h3>
                </div>
                <p>以“梨”的谐音展开创意，将清洁电器和消防器材与水果形态进行视觉嫁接，形成简洁直接、具有记忆点的商业海报系列。</p>
              </div>
              <div className="editorial-gallery">
                <figure className="editorial-work">
                  <div className="editorial-work__image">
                    <img
                      src="/projects/editorial-layout/pear-commercial-01.jpg"
                      alt="吸尘器与梨组合的商业创意海报"
                      loading="lazy"
                    />
                  </div>
                  <figcaption><span>01</span><small>“梨”刻清肺，焕然一新</small></figcaption>
                </figure>
                <figure className="editorial-work">
                  <div className="editorial-work__image">
                    <img
                      src="/projects/editorial-layout/pear-commercial-02.jpg"
                      alt="灭火器与梨组合的商业创意海报"
                      loading="lazy"
                    />
                  </div>
                  <figcaption><span>02</span><small>“梨”刻灭火，防患未然</small></figcaption>
                </figure>
              </div>
            </article>

            <article className="editorial-project editorial-project--celadon">
              <div className="editorial-project__intro">
                <div>
                  <span>PROJECT 03 / INFORMATION DESIGN</span>
                  <h3>青瓷匠心 · 信息可视化</h3>
                </div>
                <p>围绕龙泉青瓷的技艺、历史传承与创新路径展开信息设计，以青蓝渐变、曲线图形和数据图表构建兼具传统温度与现代秩序的三联展板。</p>
              </div>
              <div className="editorial-gallery editorial-gallery--three">
                <figure className="editorial-work">
                  <div className="editorial-work__image">
                    <img
                      src="/projects/editorial-layout/celadon-craft-01.jpg"
                      alt="青瓷匠心技艺篇信息可视化展板"
                      loading="lazy"
                    />
                  </div>
                  <figcaption><span>01</span><small>技艺篇 · 原料与烧制工艺</small></figcaption>
                </figure>
                <figure className="editorial-work">
                  <div className="editorial-work__image">
                    <img
                      src="/projects/editorial-layout/celadon-craft-02.jpg"
                      alt="青瓷匠心传承篇信息可视化展板"
                      loading="lazy"
                    />
                  </div>
                  <figcaption><span>02</span><small>传承篇 · 历史与技艺脉络</small></figcaption>
                </figure>
                <figure className="editorial-work">
                  <div className="editorial-work__image">
                    <img
                      src="/projects/editorial-layout/celadon-craft-03.jpg"
                      alt="青瓷匠心创新篇信息可视化展板"
                      loading="lazy"
                    />
                  </div>
                  <figcaption><span>03</span><small>创新篇 · 工艺与文化传播</small></figcaption>
                </figure>
              </div>
            </article>

            <article className="editorial-project editorial-project--silk">
              <div className="editorial-project__intro">
                <div>
                  <span>PROJECT 04 / CULTURAL EDITORIAL</span>
                  <h3>千年丝韵 · 源起湖州</h3>
                </div>
                <p>以非遗丝绸为媒介，将飞英塔、城隍庙与潮音桥转译为丝线织造语言，通过深色叙事背景与细密编织质感呈现江南文化的历史厚度。</p>
              </div>
              <div className="editorial-gallery editorial-gallery--single">
                <figure className="editorial-work">
                  <div className="editorial-work__image">
                    <img
                      src="/projects/editorial-layout/silk-origin-huzhou.jpg"
                      alt="千年丝韵源起湖州江南丝绸文化创新设计展板"
                      loading="lazy"
                    />
                  </div>
                  <figcaption><span>01</span><small>江南丝绸文化创新设计</small></figcaption>
                </figure>
              </div>
            </article>

            <article className="editorial-project editorial-project--brochure">
              <div className="editorial-project__intro">
                <div>
                  <span>PROJECT 05 / FOLDING BROCHURE</span>
                  <h3>丽水印象 · 旅游三折页</h3>
                </div>
                <p>围绕丽水自然风光、地域美食与文化景点组织信息，以留白、山水纹样和克制的灰绿色调建立清雅连贯的旅游宣传折页。</p>
              </div>
              <div className="editorial-gallery editorial-gallery--wide">
                <figure className="editorial-work editorial-work--landscape">
                  <div className="editorial-work__image">
                    <img
                      src="/projects/editorial-layout/lishui-trifold-brochure.jpg"
                      alt="丽水旅游三折页正反面设计与实物效果展示"
                      loading="lazy"
                    />
                  </div>
                  <figcaption><span>01</span><small>折页版式、信息编排与实物展示</small></figcaption>
                </figure>
              </div>
            </article>

            <article className="editorial-project editorial-project--book">
              <div className="editorial-project__intro">
                <div>
                  <span>PROJECT 06 / BOOK DESIGN</span>
                  <h3>《肘后蕙兰》· 书籍装帧</h3>
                </div>
                <p>以中草药文化为主题，融合植物线描、手揉纸肌理与药材档案式编排，完成从封面、函套到内页系统的书籍装帧与版式设计。</p>
              </div>
              <div className="editorial-gallery editorial-gallery--long">
                <figure className="editorial-work editorial-work--long">
                  <div className="editorial-work__image">
                    <img
                      src="/projects/editorial-layout/orchid-book-design-01.jpg"
                      alt="肘后蕙兰书籍装帧概念、材料与成品展示"
                      loading="lazy"
                    />
                  </div>
                  <figcaption><span>01</span><small>装帧概念、材料细节与成品设计</small></figcaption>
                </figure>
                <figure className="editorial-work editorial-work--long">
                  <div className="editorial-work__image">
                    <img
                      src="/projects/editorial-layout/orchid-book-design-02.jpg"
                      alt="肘后蕙兰书籍内页编排与样书展示"
                      loading="lazy"
                    />
                  </div>
                  <figcaption><span>02</span><small>中草药档案内页与版式系统</small></figcaption>
                </figure>
              </div>
            </article>
          </section>
        )}

        {isIpProject && (
          <section className="ip-detail" aria-label="IP形象设计作品">
            <header className="ip-detail__header">
              <div>
                <span>01</span>
                <small>IP CHARACTER</small>
              </div>
              <div>
                <p>从文化原型与青年精神中提炼角色语言，建立兼具辨识度、故事感与延展性的完整形象系统。</p>
                <h2>
                  <StrokeText
                    text="IP 形象设计"
                    strokeColor="#d7a7ff"
                    fillColor="#f4f5f1"
                    strokeWidth={1.3}
                    drawDuration={1.35}
                    fillDelay={0.12}
                    stagger={0.055}
                    trigger="scroll"
                    fillMode="wipe"
                    fontSize={112}
                    fontWeight={850}
                    letterSpacing={-6}
                    className="detail-stroke-title"
                  />
                </h2>
              </div>
            </header>

            {[
              {
                index: 'PROJECT 01 / CULTURAL IP',
                title: '笋小圣 · 竹文化 IP',
                description: '融合竹笋与孙悟空的形象特征，以勇敢探索和突破成长为角色精神；从三视图、表情动作延展至主题海报、场景叙事与文创应用。',
                works: [
                  ['/projects/ip-illustration/bamboo-hero-01.jpg', '笋小圣角色设定、三视图与表情设计', '角色设定与视觉系统'],
                  ['/projects/ip-illustration/bamboo-hero-02.jpg', '笋小圣海报、动作与场景应用设计', '海报、动作与场景延展'],
                  ['/projects/ip-illustration/bamboo-hero-03.jpg', '笋小圣文创产品与品牌应用设计', '应用与文创延展'],
                ],
              },
              {
                index: 'PROJECT 02 / YOUTH IP',
                title: '创小葵 · 青年创意 IP',
                description: '以向日葵的明朗意象结合滑板运动语言，塑造积极、热爱与敢于挑战的青年角色，并通过表情包、场景海报和生活物料构建鲜明的黄色视觉体系。',
                works: [
                  ['/projects/ip-illustration/sunflower-01.jpg', '创小葵角色介绍、动作与三视图设计', '角色设定与视觉系统'],
                  ['/projects/ip-illustration/sunflower-02.jpg', '创小葵海报、表情包与场景应用设计', '海报、表情与场景延展'],
                  ['/projects/ip-illustration/sunflower-03.jpg', '创小葵拼图、摆件与日用品应用设计', '应用与文创延展'],
                ],
              },
              {
                index: 'PROJECT 03 / TECHNOLOGY IP',
                title: '章奇奇 · IDEA WITH AI',
                description: '以章鱼的多触手和好奇特质对应创意探索，将智能科技、亲和表情与红白品牌语言融合，形成面向创意赛事的 AI 主题角色与应用系统。',
                works: [
                  ['/projects/ip-illustration/idea-ai-01.jpg', '章奇奇AI主题IP角色设定与表情设计', '角色设定与表情系统'],
                  ['/projects/ip-illustration/idea-ai-02.jpg', '章奇奇主题海报与多场景延展设计', '海报与场景延展'],
                  ['/projects/ip-illustration/idea-ai-03.jpg', '章奇奇拼图、钥匙扣与周边应用设计', '应用与文创延展'],
                ],
              },
              {
                index: 'PROJECT 04 / CHARACTER STUDIES',
                title: '角色方案精选 · IP 形象设计',
                description: '围绕地域文化、绿色设计与传统人物展开三组角色探索，通过形象设定、三视图、表情语言及周边应用，呈现不同主题下的视觉转译方式。',
                works: [
                  ['/projects/ip-illustration/zhuangyuan.jpg', '状元郎地域文化IP角色设计展板', '状元郎 · 地域文化 IP'],
                  ['/projects/ip-illustration/sky-pepe.jpg', '鹭鹭轻量环保主题IP角色设计展板', '鹭鹭 · 轻量环保 IP'],
                  ['/projects/ip-illustration/confucius.jpg', '孔子文化人物IP角色设计展板', '孔子 · 文化人物 IP'],
                ],
              },
            ].map((ipProject) => (
              <article className="ip-project" key={ipProject.title}>
                <div className="ip-project__intro">
                  <div>
                    <span>{ipProject.index}</span>
                    <h3>{ipProject.title}</h3>
                  </div>
                  <p>{ipProject.description}</p>
                </div>
                <div className="ip-gallery">
                  {ipProject.works.map(([src, alt, caption], workIndex) => (
                    <figure className="ip-work" key={src}>
                      <div className="ip-work__image">
                        <img src={src} alt={alt} loading="lazy" />
                      </div>
                      <figcaption>
                        <span>{String(workIndex + 1).padStart(2, '0')}</span>
                        <small>{caption}</small>
                      </figcaption>
                    </figure>
                  ))}
                </div>
              </article>
            ))}
          </section>
        )}

        {isDigitalProject && (
          <section className="digital-detail" aria-label="数字化创作UI作品">
            <header className="digital-detail__header">
              <div>
                <span>01</span>
                <small>DIGITAL EXPERIENCE</small>
              </div>
              <div>
                <p>以安静、柔和的视觉节奏串联睡眠记录、助眠内容与冥想体验，构建轻盈完整的移动端产品界面。</p>
                <h2>
                  <StrokeText
                    text="数字化创作"
                    strokeColor="#c9a5ff"
                    fillColor="#f4f5f1"
                    strokeWidth={1.3}
                    drawDuration={1.35}
                    fillDelay={0.12}
                    stagger={0.06}
                    trigger="scroll"
                    fillMode="wipe"
                    fontSize={112}
                    fontWeight={850}
                    letterSpacing={-7}
                    className="detail-stroke-title"
                  />
                </h2>
              </div>
            </header>

            <article className="digital-project">
              <div className="digital-project__intro">
                <div>
                  <span>PROJECT 01 / UI &amp; UX DESIGN</span>
                  <h3>浅梦屿 · 睡眠监测 APP</h3>
                </div>
                <p>面向睡眠困难、情绪焦虑与精神紧绷人群，将监测数据、助眠音景、冥想练习和梦境记录整合为统一体验，并以低饱和薰衣草紫建立温柔、安静且具有治愈感的产品视觉。</p>
              </div>

              <div className="digital-gallery digital-gallery--overview" aria-label="浅梦屿APP项目总览">
                {[
                  ['/projects/digital-creation/shallow-dream-showcase.jpg', '浅梦屿APP视觉规范、功能框架与界面展示版面', '视觉规范与界面系统'],
                  ['/projects/digital-creation/shallow-dream-visual.png', '浅梦屿睡眠监测APP手机界面视觉主图', '产品视觉与场景呈现'],
                ].map(([src, alt, caption], index) => (
                  <figure className="digital-work" key={src}>
                    <div className="digital-work__image">
                      <img src={src} alt={alt} loading="lazy" />
                    </div>
                    <figcaption>
                      <span>{String(index + 2).padStart(2, '0')}</span>
                      <small>{caption}</small>
                    </figcaption>
                  </figure>
                ))}
              </div>

              <div className="digital-flow-heading">
                <div>
                  <span>INTERACTION FLOW</span>
                  <strong>关键界面与交互路径</strong>
                </div>
                <p>从品牌启动、内容首页到睡眠监测与数据反馈，完整呈现浅梦屿的核心使用流程。</p>
              </div>

              <div className="digital-screen-gallery" aria-label="浅梦屿APP高保真界面与交互流程">
                {[
                  ['/projects/digital-creation/shallow-dream-screen-02.jpg', '浅梦屿APP启动页高保真界面', '品牌启动与欢迎入口'],
                  ['/projects/digital-creation/shallow-dream-screen-03.jpg', '浅梦屿APP首页高保真界面', '首页与助眠内容入口'],
                  ['/projects/digital-creation/shallow-dream-screen-04.jpg', '浅梦屿APP睡眠模块高保真界面', '睡眠推荐、冥想与工具'],
                  ['/projects/digital-creation/shallow-dream-screen-05.jpg', '浅梦屿APP冥想模块高保真界面', '冥想场景与练习内容'],
                  ['/projects/digital-creation/shallow-dream-screen-06.jpg', '浅梦屿APP个人中心高保真界面', '个人服务与设备设置'],
                  ['/projects/digital-creation/shallow-dream-screen-07.jpg', '浅梦屿APP睡眠故事详情高保真界面', '睡眠故事内容详情'],
                  ['/projects/digital-creation/shallow-dream-screen-08.jpg', '浅梦屿APP睡眠监测高保真界面', '睡眠监测进行中'],
                  ['/projects/digital-creation/shallow-dream-screen-11.jpg', '浅梦屿APP睡眠数据高保真界面', '睡眠分析与规律反馈'],
                ].map(([src, alt, caption], index) => (
                  <figure className="digital-work digital-work--screen" key={src}>
                    <div className="digital-work__image">
                      <img src={src} alt={alt} loading="lazy" />
                    </div>
                    <figcaption>
                      <span>{String(index + 4).padStart(2, '0')}</span>
                      <small>{caption}</small>
                    </figcaption>
                  </figure>
                ))}
              </div>

              <figure className="digital-video">
                <video
                  controls
                  preload="none"
                  poster="/projects/digital-creation/shallow-dream-visual.png"
                  aria-label="浅梦屿APP界面交互演示视频"
                >
                  <source src="/projects/digital-creation/shallow-dream-app-demo.mp4" type="video/mp4" />
                  当前浏览器不支持视频播放。
                </video>
                <figcaption>
                  <span>01 / MOTION DEMO</span>
                  <strong>界面交互演示</strong>
                </figcaption>
              </figure>
            </article>

            <article className="digital-project digital-project--motion">
              <div className="digital-project__intro">
                <div>
                  <span>PROJECT 02 / MOTION DESIGN</span>
                  <h3>动态视觉 · 品牌影像</h3>
                </div>
                <p>通过品牌宣传、标志动态与视觉实验三种短片练习，探索节奏、图形、声音与品牌识别之间的关系，让静态视觉在时间维度中形成更完整的传播体验。</p>
              </div>

              <div className="motion-gallery" aria-label="动态视觉与品牌影像作品">
                {[
                  ['/projects/digital-creation/mcdonalds-brand-film.mp4', '麦当劳品牌宣传视频', '麦当劳 · 品牌宣传'],
                  ['/projects/digital-creation/logo-motion.mp4', '品牌标志动态效果视频', 'Logo · 动态效果'],
                  ['/projects/digital-creation/motion-experiment.mp4', '数字动态视觉实验视频', '视觉 · 动态实验'],
                ].map(([src, label, caption], index) => (
                  <figure className="motion-work" key={src}>
                    <video controls preload="none" aria-label={label}>
                      <source src={src} type="video/mp4" />
                      当前浏览器不支持视频播放。
                    </video>
                    <figcaption>
                      <span>{String(index + 1).padStart(2, '0')}</span>
                      <small>{caption}</small>
                    </figcaption>
                  </figure>
                ))}
              </div>
            </article>
          </section>
        )}

        <section className="project-detail-facts" aria-label="项目资料">
          <article className="project-fact-card project-fact-card--red">
            <div className="project-fact-card__meta">
              <span>01 / TYPE</span>
              <small>项目类别</small>
            </div>
            <strong>{detailFacts.type}</strong>
          </article>
          <article className="project-fact-card project-fact-card--violet">
            <div className="project-fact-card__meta">
              <span>02 / OUTPUT</span>
              <small>项目成果</small>
            </div>
            <strong>{detailFacts.result}</strong>
          </article>
          <article className="project-fact-card project-fact-card--blue">
            <div className="project-fact-card__meta">
              <span>03 / FOCUS</span>
              <small>设计重点</small>
            </div>
            <strong>{detailFacts.focus.join(' / ')}</strong>
          </article>
        </section>

        <footer className="project-detail-footer">
          <a className="project-footer-button project-footer-button--back" href="/#work">
            <ArrowLeft size={18} />
            <span>返回全部项目</span>
          </a>
          <a className="project-footer-button project-footer-button--next" href={`/projects/${nextProject.slug}`}>
            <span>
              <small>NEXT PROJECT</small>
              <strong>{nextProject.title}</strong>
            </span>
            <ArrowUpRight size={20} />
          </a>
        </footer>
      </article>
      <ProjectImageLightbox />
    </main>
  );
}
