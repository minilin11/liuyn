export type PortfolioProject = {
  id: string;
  slug: string;
  title: string;
  type: string;
  result: string;
  className: string;
  word: string;
  description: string;
  focus: string[];
};

export const projects: PortfolioProject[] = [
  {
    id: '01',
    slug: 'kongzi-ip',
    title: '品牌视觉',
    type: '品牌设计 / 视觉系统',
    result: '标志设计 · 品牌识别 · 应用延展',
    className: 'project-confucius',
    word: 'BRAND|IDENTITY',
    description: '从品牌研究与定位出发，建立清晰、可识别且能够持续延展的视觉语言，并将核心概念落实到标志、版式与应用触点中。',
    focus: ['品牌定位', '视觉识别', '应用延展'],
  },
  {
    id: '02',
    slug: 'zhuangyuan',
    title: '编辑与版式',
    type: '编辑设计 / 视觉叙事',
    result: '海报设计 · 书籍装帧 · 信息编排',
    className: 'project-zhuangyuan',
    word: 'EDITORIAL|DESIGN',
    description: '以信息层级、字体节奏和图像编排构建阅读路径，在海报、书籍与折页中建立清晰的视觉秩序。',
    focus: ['信息层级', '图文编排', '视觉叙事'],
  },
  {
    id: '03',
    slug: 'zhouhou-huilan',
    title: 'IP与插画',
    type: 'IP 设计 / 角色插画',
    result: '角色设定 · 海报系统 · 文创延展',
    className: 'project-orchid',
    word: 'IP &|ILLUSTRATION',
    description: '从文化意象中提炼角色语言，通过造型、表情、场景与应用延展，建立鲜明且具有记忆点的 IP 视觉系统。',
    focus: ['文化转译', '角色塑造', '文创延展'],
  },
  {
    id: '04',
    slug: 'sun-xiaosheng',
    title: '数字化创作',
    type: 'UI / UX / 动态视觉',
    result: '界面设计 · 交互流程 · 品牌影像',
    className: 'project-bamboo',
    word: 'DIGITAL|CREATION',
    description: '围绕睡眠监测、助眠内容与正念冥想场景，完成从产品定位、视觉规范到界面流程和动态演示的数字体验设计。',
    focus: ['界面系统', '交互流程', '品牌影像', '动态设计'],
  },
];
