<script setup lang="ts">
import { onMounted, ref, onUnmounted, computed, watch } from 'vue';
import useWindowResize from 'shared/hooks/useWindowResize';

import BScroll from '@better-scroll/core';
import { BScrollInstance } from '@better-scroll/core';
import Slide from '@better-scroll/slide';

import { getPosterData, getUserData } from 'shared/api';

import bannerBg from '@/assets/bg1.jpg';
import QRcode_zh from '@/assets/QRcode-zh.png';
import QRcode_en from '@/assets/QRcode-en.png';
import musicIcon from '@/assets/bg-music.svg';

const lang = ref('zh');
const screenWidth = useWindowResize();

watch(
  () => window.location.href,
  (val) => {
    lang.value = val.includes('/en/') ? 'en' : 'zh';
  },
  { immediate: true }
);

const params = ref({
  community: 'openlookeng',
  user: 'ailoooong',
  year: '2022',
});

async function getUserDataFun() {
  await getUserData().then((res) => {
    if (res) {
      params.value.user = res.user;
    }
  });
}

const wrapper = ref<HTMLElement | null>(null);

BScroll.use(Slide);
const isContributor = ref(false);
const posterData: any = ref({
  test: 1,
});
const codeLine = ref(0);

async function getPosterDataFun() {
  await getPosterData(params.value)
    .then((res) => {
      if (res.code === 200 && res.data.length) {
        isContributor.value = true;
        posterData.value = res.data[0];
        codeLine.value =
          Number(posterData.value.code_lines_add) +
          Number(posterData.value.code_lines_delete);
      } else {
        isContributor.value = false;
      }
    })
    .catch(() => {
      isContributor.value = false;
    });
}
let slide: BScrollInstance;
const currentPage = ref(-1);

onMounted(async () => {
  await getUserDataFun();
  // 社区埋点
  try {
    const sensors = (window as any)['sensorsDataAnalytic201505'];
    sensors?.setProfile({
      user_logo: params.value.user,
      community: params.value.community,
      created_at: new Date(),
    });
  } catch (error) {
    console.log(error);
  }

  // 必须先确定是否为贡献者
  await getPosterDataFun();
  pcClick();
  currentPage.value = 0;
  if (wrapper.value) {
    slide = new BScroll(wrapper.value as HTMLElement, {
      scrollX: false,
      scrollY: true,
      momentum: false,
      bounce: false,
      click: true,
      pullUpLoad: true,

      slide: {
        autoplay: false,
        loop: false,
        threshold: 100,
      },
      stopPropagation: true,
    });
    slide.on('slidePageChanged', () => {
      currentPage.value = slide.getCurrentPage().pageY;
    });
    // 触摸屏幕播放动画
    wrapper.value?.addEventListener('pointerup', function () {
      if (isVideo.value) {
        videoRef.value?.play();
        bgm.value?.play();
        isVideo.value = false;
        bgmOpen.value.classList.add('run-bgm');
      }
    });
  }
  if (screenWidth.value < 1200) {
    bgm.value?.addEventListener('pause', function () {
      bgmOpen.value?.classList.remove('run-bgm');
    });
    bgmOpen.value?.addEventListener('touchstart', function () {
      bgm.value?.paused ? bgm.value?.play() : bgm.value?.pause();
      bgmOpen.value.classList.add('run-bgm');
    });
  }
});

function goStart() {
  slide.scrollToElement('.page2', 500, 0, 0);
}

const communityData = {
  businessosv: 2,
  comments: 35905,
  communitymembers: 692,
  contributors: 3001,
  issues: 1750,
  partners: 27,
  prs: 2157,
  repos: 15,
  users: 151905,
  version: 4,
  country: 49,
  city: 279,
  path: 'https://openlookeng.io',
  gitee: 'https://gitee.com/openlookeng',
};
// 视频背景地址
const videoPath =
  'https://obs-transfer.obs.cn-north-4.myhuaweicloud.com/openlookeng/obsi-openlookeng-summary/openlookeng-summary.mp4';

//复数
const pluralComputed = (num: number | string) => (Number(num) > 1 ? 's' : '');

const initDom: any = computed(() => {
  return {
    zh: {
      page1: {
        text: ['openLooKeng 时光机', '出发吧', '去看看属于您的2022'],
      },
      page2: {
        text: [
          '这一年，在您的见证下',
          `openLooKeng迭代更新了 <span class="active">${communityData.version}</span> 个版本，`,
          `<span class="active">${communityData.users}</span> 社区用户开启了openLooKeng探索之旅`,
          `至今，<br/>openLooKeng收到了 <span class="active">${communityData.issues}</span> 个Issues和 <span class="active">${communityData.prs}</span> 个PRs`,
        ],
      },
      page3: {
        text: [
          `<span class="active">${changeTime(
            posterData.value.first_time_of_enter
          )}，</span> <br>你第一次来到openLooKeng社区，`,
          '创造许多了不起的成果，带来了',
          `${
            posterData.value.code_lines_add > 0
              ? `<span class='active'>${codeLine.value}</span> 行代码`
              : ' '
          }`,
          `${
            posterData.value.issue_num > 0
              ? `<span class='active'>${
                  posterData.value.issue_num
                }</span> 个 Issue${pluralComputed(posterData.value.issue_num)}`
              : ' '
          }`,
          `${
            posterData.value.pr_num > 0
              ? `<span class='active'>${
                  posterData.value.pr_num
                }</span> 个 PR${pluralComputed(posterData.value.pr_num)}`
              : ' '
          }`,
          `${
            posterData.value.comment_num > 0
              ? `<span class='active'>${
                  posterData.value.comment_num
                }</span> 条 Comment${pluralComputed(
                  posterData.value.comment_num
                )}`
              : ' '
          }`,

          `${
            posterData.value.star_num > 0
              ? `<span class='active'>${posterData.value.star_num}</span> 个仓库`
              : ' '
          }`,
          `与 <span class='active'>${communityData.contributors}</span> 位社区开发者同行，共建共治共享，`,

          `让openLooKeng更强大。`,
        ],
      },
      page4: {
        text: [
          `今年，<br/>您评论了 ${
            posterData.value.comment_issue_num > 0
              ? `<span class="active">${
                  posterData.value.comment_issue_num
                }</span> 个Issue${pluralComputed(
                  posterData.value.comment_issue_num
                )}和`
              : ''
          } <br /> ${
            posterData.value.comment_pr_num > 0
              ? `<span class="active">${
                  posterData.value.comment_pr_num
                }</span> 个PR${pluralComputed(posterData.value.comment_pr_num)}`
              : ''
          }`,
          '万丈高楼平地起，社区活跃达人就是你',
          `您最常和TA互动`,
          `${posterData.value.user_login_with_most_contact}`,
          '给TA比个心',
        ],
      },
      page5: {
        text: [
          '截图分享您的成就',
          '扫码看2022开发者贡献报告',
          '01/01 - 12/30',
          `这一年，您在社区的贡献度超过了 <span class="active">${getPercentage(
            posterData.value?.count_rank
          )}%</span> 的开发者`,
          `愿新的一年，我们并肩前行，`,
          `既能遇见新的热爱，也能初心重逢`,
        ],
      },
      noContribution1: {
        text: [
          '感谢您关注openLooKeng，',
          '2022的每个脚印，都是开启新岁征途的序章，',
          '期待您加入我们，开启社区贡献新旅程。',
          '在openLooKeng开源2年多的今天，',
          '我们整理了一些数据，以便您更好地认识openLooKeng：',
          `2022年，openLooKeng按照既定的节奏，迭代更新了 <span class="active">${communityData.version}</span> 个版本`,
          '社区贡献者 <span class="active">3000+</span>，交流群活跃用户 <span class="active">1000+</span> ',
          `累计收到 <span class="active">${communityData.prs}</span> PRs， <span class="active">${communityData.issues}</span> Issues， <span class="active">${communityData.comments}</span> Comments`,
          `2022年，openLooKeng下载量突破 <span class="active">${
            communityData.users
          }</span> ，遍及全球 <span class="active">${
            communityData.country + communityData.city
          }</span> 个国家和地区。`,
          '当前，社区汇集了 <span class="active">35+ </span> 家来自金融、政府、互联网、教育等不同行业的合作伙伴。',
        ],
      },
      noContribution2: {
        text: [
          '新的一年，新的openLooKeng',
          '我们期待您的加入',
          '点Star、提Issue、交PR、发博客',
          '一起携手前行，共话大数据引擎技术',
          '共建开源大数据的繁荣生态',
          '2023，元旦快乐',

          'openLooKeng开源社区呈上',
        ],
      },
      code: QRcode_zh,
    },
    en: {
      page1: {
        text: [
          'Time to embark on a journey with openLooKeng ',
          "Let's Go",
          'To the year 2022',
        ],
      },
      page2: {
        text: [
          'Thanks to your support',
          `This year,  <br/>openLooKeng has been iterated for <span class="active">${communityData.version}</span> versions`,
          `<span class="active">${communityData.users}</span> community users started their journey on openLooKeng`,
          `So far, <br/>openLooKeng has received  <span class="active">${communityData.issues}</span> Issues and  <span class="active">${communityData.prs}</span> PRs`,
        ],
      },
      page3: {
        text: [
          `<span class="active">On ${changeTime(
            posterData.value.first_time_of_enter
          )}，</span> <br/>you took your first steps by visiting my homepage.`,
          'your dedication and hard work have helped to create: ',
          `${
            posterData.value.code_lines_add > 0
              ? `<span class='active'>${codeLine.value}</span> Lines of code`
              : ' '
          }`,
          `${
            posterData.value.issue_num > 0
              ? `<span class='active'>${
                  posterData.value.issue_num
                }</span> Issue${pluralComputed(posterData.value.issue_num)}`
              : ' '
          }`,
          `${
            posterData.value.pr_num > 0
              ? `<span class='active'>${
                  posterData.value.pr_num
                }</span> PR${pluralComputed(posterData.value.pr_num)}`
              : ' '
          }`,
          `${
            posterData.value.comment_num > 0
              ? `<span class='active'>${
                  posterData.value.comment_num
                }</span> Comment${pluralComputed(posterData.value.comment_num)}`
              : ' '
          }`,

          `${
            posterData.value.star_num > 0
              ? `<span class='active'>${
                  posterData.value.star_num
                }</span> repo${pluralComputed(posterData.value.star_num)}`
              : ' '
          }`,
          `You have also worked alongside  <span class='active'>${communityData.contributors}</span> fellow community developers to build, govern, and share in the growth of openLooKeng,`,

          `making it an even stronger platform Keep up the great work!`,
        ],
      },
      page4: {
        text: [
          `This year, <br/>you've commented on ${
            posterData.value.comment_issue_num > 0
              ? `<span class="active">${
                  posterData.value.comment_issue_num
                }</span> Issue${pluralComputed(
                  posterData.value.comment_issue_num
                )} and `
              : ''
          } <br /> ${
            posterData.value.comment_pr_num > 0
              ? `<span class="active">${
                  posterData.value.comment_pr_num
                }</span> PR${pluralComputed(posterData.value.comment_pr_num)}`
              : ''
          }`,
          "From humble beginnings, you've become a top contributor in our active community",
          `You've interacted the most with `,
          `${posterData.value.user_login_with_most_contact}`,
        ],
      },
      page5: {
        text: [
          'SCAN for your exclusive wrap-up!',
          '2022 Developer Contribution Report',
          'Jan 1 to Dec 30',
          `This year, your contributions in the community surpassed <span class="active">${getPercentage(
            posterData.value.count_rank
          )}%</span> of developers`,
          `Here's hoping that you reach the pinnacle of your passion in 2023 Happy creative New Year!`,
        ],
      },
      noContribution1: {
        text: [
          'Thanks to your support!',
          'Time to embark on a journey to the year 2022 with openLooKeng!',
          "As we look back on more than two years of open source development, we're excited to share some of our milestones with you. ",
          `In 2022, openLooKeng released <span class="active">${communityData.version}</span> new versions, `,
          'and our community of contributors has grown to over <span class="active">3000</span> with a lively group of <span class="active">1000</span> active users.',
          `We've received a total of <span class="active">${communityData.prs}</span> PRs， <span class="active">${communityData.issues}</span> Issues, and <span class="active">${communityData.comments}</span> Comments`,
          `Downloads of openLooKeng have surpassed <span class="active">${
            communityData.users
          }</span> and it is now used in <span class="active">${
            communityData.country + communityData.city
          }</span>  countries and regions around the world.`,
          'Our community has also partnered with over <span class="active">35</span> organizations from various industries including finance, government, and education.',
        ],
      },
      noContribution2: {
        text: [
          'As we look ahead to the new year, we invite you to join us on our journey to advance the technology of big data engines and build a thriving ecosystem together. ',
          'Star our repository, submit issues and PRs, and share your insights through blogs. ',
          "Let's make 2023 a year of collaboration and progress in the world of big data. ",
          'Happy New Year from the openLooKeng open source community!',
        ],
      },
      code: QRcode_en,
    },
  };
});

onUnmounted(() => {
  if (slide) {
    slide.destroy();
  }
});
function getZero(time: number) {
  return time < 9 ? '0' + time : time;
}
function changeTime(time: string) {
  if (time) {
    const EndTime = new Date(time);
    const y = EndTime.getFullYear();
    const m = EndTime.getMonth() + 1;
    const d = EndTime.getDate();
    let all = '';
    if (lang.value === 'zh') {
      all = `${y}年${getZero(m)}月${getZero(d)}日`;
    } else {
      all = `${getZero(d)}/${getZero(m)}/${y}`;
    }
    return all;
  }
}

function getPercentage(per: any) {
  if (per) {
    return per === '1'
      ? 1
      : ((1 - Number(per?.replace('%', ''))) * 100).toFixed(2);
  }
}
function getRank(per: string) {
  if (per) {
    const percentage = getPercentage(per) || 0;
    let rank = 0;
    if (percentage <= 25) {
      rank = 0;
    } else if (25 < percentage && percentage <= 50) {
      rank = 1;
    } else if (50 < percentage && percentage <= 75) {
      rank = 2;
    } else if (75 < percentage) {
      rank = 3;
    }
    return rank;
  }
}
const rankMap: any = ref({
  zh: [
    {
      title: '奋发兔强',
      text: '沉默的王者',
    },
    {
      title: '动若脱兔',
      text: '进击的开源人',
    },
    {
      title: '兔飞猛进',
      text: '开源贡献达人',
    },
    {
      title: '鸿兔大展',
      text: '硬核大佬',
    },
  ],
  en: [
    {
      title: 'Emerging Talent',
      text: '',
    },
    {
      title: 'Rising Star',
      text: '',
    },
    {
      title: 'Expert Developer',
      text: '',
    },
    {
      title: 'openLooKeng Guru',
      text: '',
    },
  ],
});

function pcClick() {
  const front: any = document.querySelectorAll('.front');
  const back: any = document.querySelectorAll('.back');
  for (let i = 0; i < front.length; i++) {
    front[i].addEventListener('click', function () {
      for (let j = 0; j < front.length; j++) {
        front[j].style = 'transform:rotateY(-180deg)';
        back[j].style = 'transform:rotateY(0deg)';
      }
    });
    back[i].addEventListener('click', function () {
      for (let z = 0; z < back.length; z++) {
        back[z].style = 'transform:rotateY(180deg)';
        front[z].style = 'transform:rotateY(0deg)';
      }
    });
  }
}

// 背景音乐
const bgm: any = ref('bgm');
const bgmOpen: any = ref('bgmOpen');
const videoRef: any = ref('video');
const isVideo = ref(true);
</script>

<template>
  <div
    v-if="screenWidth > 1200"
    class="pc-post"
    :class="lang === 'zh' ? 'pc-zh' : 'pc-en'"
    @click="pcClick"
  >
    <div v-if="isContributor" class="contribution none">
      <div class="slide-page container box-1">
        <div class="front">
          <div class="page3 current">
            <div class="pc-top">
              <div class="text"></div>
            </div>
          </div>
          <div class="video-bg">
            <video muted autoplay loop playsinline="true" :poster="bannerBg">
              <source :src="videoPath" type="video/mp4" />
            </video>
          </div>
        </div>
        <div class="back">
          <div class="page2 contents current">
            <div class="card">
              <div class="card-content">
                <h3 v-if="posterData.user_login" class="active">
                  Dear {{ posterData.user_login }}
                </h3>
                <p
                  v-for="(sub, index) in initDom[lang].page2.text"
                  :key="index"
                  class="txt"
                  v-html="sub"
                ></p>
              </div>
            </div>
          </div>
          <div class="video-bg">
            <video muted autoplay loop playsinline="true" :poster="bannerBg">
              <source :src="videoPath" type="video/mp4" />
            </video>
          </div>
        </div>
      </div>
      <div class="container box-2">
        <div class="front">
          <div class="slide-page page3 current">
            <div class="pc-top">
              <div class="text"></div>
            </div>
          </div>
          <div class="video-bg">
            <video muted autoplay loop playsinline="true" :poster="bannerBg">
              <source :src="videoPath" type="video/mp4" />
            </video>
          </div>
        </div>
        <div class="back">
          <div class="page2 contents current">
            <div class="card">
              <div class="card-content">
                <p
                  v-for="(sub, index) in initDom[lang].page3.text"
                  :key="index"
                  class="txt"
                  v-html="sub"
                ></p>
              </div>
            </div>
          </div>
          <div class="video-bg">
            <video muted autoplay loop playsinline="true" :poster="bannerBg">
              <source :src="videoPath" type="video/mp4" />
            </video>
          </div>
        </div>
      </div>
      <div class="container box-3">
        <div class="front">
          <div class="slide-page page3">
            <div class="pc-top">
              <div class="text"></div>
            </div>
          </div>
          <div class="video-bg">
            <video muted autoplay loop playsinline="true" :poster="bannerBg">
              <source :src="videoPath" type="video/mp4" />
            </video>
          </div>
        </div>
        <div class="back">
          <div class="page4 contents current">
            <p class="big" v-html="initDom[lang].page4.text[0]"></p>
            <p
              style="margin-top: 0; letter-spacing: 2px"
              class="big"
              v-html="initDom[lang].page4.text[2]"
            ></p>
            <div class="card">
              <div class="card-content">
                <p class="name">
                  @{{ posterData.user_login_with_most_contact }}
                </p>
              </div>
            </div>
            <p
              style="margin-top: 10px"
              class="txt"
              v-html="initDom[lang].page4.text[1]"
            ></p>
          </div>
          <div class="video-bg">
            <video muted autoplay loop playsinline="true" :poster="bannerBg">
              <source :src="videoPath" type="video/mp4" />
            </video>
          </div>
        </div>
      </div>
      <div class="container box-4">
        <div class="front">
          <div class="slide-page page3 current">
            <div class="pc-top">
              <div class="text"></div>
            </div>
          </div>
          <div class="video-bg">
            <video muted autoplay loop playsinline="true" :poster="bannerBg">
              <source :src="videoPath" type="video/mp4" />
            </video>
          </div>
        </div>
        <div class="back">
          <div class="page5 contents current">
            <div class="tile">
              <p class="txt" v-html="initDom[lang].page5.text[3]"></p>
              <div class="card" style="margin-top: 12px">
                <div class="card-content">
                  <p class="title">
                    {{
                      rankMap[lang][
                        // @ts-ignore
                        getRank(posterData.count_rank)
                      ].title
                    }}
                  </p>
                  <p v-if="lang !== 'en'" class="text">
                    {{
                      rankMap[lang][
                        // @ts-ignore
                        getRank(posterData.count_rank)
                      ]?.text
                    }}
                  </p>
                  <p class="name">@{{ posterData.user_login }}</p>
                </div>
              </div>
              <p class="txt">{{ initDom[lang].page5.text[4] }}</p>
              <p class="txt">{{ initDom[lang].page5.text[5] }}</p>
            </div>

            <div class="big">
              <p class="">{{ initDom[lang].page5.text[0] }}</p>
              <img class="code-img" :src="initDom[lang].code" />
              <p>{{ initDom[lang].page5.text[1] }}</p>
              <p style="font-size: 16px">{{ initDom[lang].page5.text[2] }}</p>
            </div>

            <img class="logo" src="@/assets/logo.svg" />
          </div>
          <div class="video-bg">
            <video muted autoplay loop playsinline="true" :poster="bannerBg">
              <source :src="videoPath" type="video/mp4" />
            </video>
          </div>
        </div>
      </div>
    </div>
    <div v-else class="no-contribution">
      <div class="container box-1">
        <div class="front">
          <div class="page3 current">
            <div class="pc-top">
              <div class="text"></div>
              <div class="text"></div>
            </div>
          </div>
          <div class="video-bg">
            <video muted autoplay loop playsinline="true" :poster="bannerBg">
              <source :src="videoPath" type="video/mp4" />
            </video>
          </div>
        </div>
        <div class="back">
          <div class="contents current page2">
            <div class="page-cover">
              <h3 v-if="posterData.user_login" class="active">
                Dear {{ posterData.user_login }}
              </h3>
              <p
                v-for="(sub, index) in initDom[lang].noContribution1.text"
                :key="index"
                class="txt"
                v-html="sub"
              ></p>
            </div>
          </div>
          <div class="video-bg">
            <video muted autoplay loop playsinline="true" :poster="bannerBg">
              <source :src="videoPath" type="video/mp4" />
            </video>
          </div>
        </div>
      </div>
      <div class="container box-3">
        <div class="front">
          <div class="page3 current">
            <div class="pc-top">
              <div class="text"></div>
              <div class="text"></div>
            </div>
          </div>
          <div class="video-bg">
            <video muted autoplay loop playsinline="true" :poster="bannerBg">
              <source :src="videoPath" type="video/mp4" />
            </video>
          </div>
        </div>
        <div class="back">
          <div class="contents current page2">
            <div class="page-cover">
              <p
                v-for="(sub, index) in initDom[lang].noContribution2.text"
                :key="index"
                class="txt"
                v-html="sub"
              ></p>
              <div class="big">
                <img class="code-img" :src="initDom[lang].code" />
                <p class="txt">
                  <a :href="communityData.path" target="_blank">{{
                    communityData.path
                  }}</a>
                </p>
                <p class="txt">
                  <a :href="communityData.gitee" target="_blank">{{
                    communityData.gitee
                  }}</a>
                </p>
              </div>
            </div>
          </div>
          <div class="video-bg">
            <video muted autoplay loop playsinline="true" :poster="bannerBg">
              <source :src="videoPath" type="video/mp4" />
            </video>
          </div>
        </div>
      </div>
    </div>
  </div>
  <div v-else class="mo-post">
    <div ref="wrapper" class="slide-wrapper" :class="lang">
      <div v-if="isContributor" class="slide-content contribution">
        <div class="slide-page" :class="currentPage === 0 ? 'current' : ''">
          <div class="page-flex page1">
            <div class="page-cover">
              <h3>{{ initDom[lang].page1.text[0] }}</h3>
              <div class="go-start card" @click.stop="goStart">
                <span class="card-content"
                  ><span>{{ initDom[lang].page1.text[1] }}</span
                  ><em class="arrow"></em
                ></span>
              </div>
              <p class="page-text fade-time-1">
                {{ initDom[lang].page1.text[2] }}
              </p>
            </div>
          </div>
        </div>
        <div class="slide-page" :class="currentPage === 1 ? 'current' : ''">
          <div class="page-flex page2">
            <div class="page2-content card">
              <div class="card-content">
                <h3 v-if="posterData.user_login">
                  Dear {{ posterData.user_login }}
                </h3>
                <p
                  v-for="(sub, index) in initDom[lang].page2.text"
                  :key="index"
                  :class="`txt fade-time-${index}`"
                  v-html="sub"
                ></p>
              </div>
            </div>
          </div>
        </div>
        <div class="slide-page" :class="currentPage === 2 ? 'current' : ''">
          <div class="page-flex page3">
            <div class="card">
              <div class="card-content">
                <p
                  v-for="(sub, index) in initDom[lang].page3.text"
                  :key="index"
                  :class="`txt fade-time-${index}`"
                  v-html="sub"
                ></p>
              </div>
            </div>
          </div>
        </div>
        <div class="slide-page" :class="currentPage === 3 ? 'current' : ''">
          <div class="page-flex page4">
            <p class="big fade-time-0" v-html="initDom[lang].page4.text[0]"></p>
            <p
              style="margin-top: 0; letter-spacing: 2px"
              class="big fade-time-1"
              v-html="initDom[lang].page4.text[2]"
            ></p>
            <div class="card fade-time-2">
              <div class="card-content">
                <p class="name fade-time-3">
                  @{{ initDom[lang].page4.text[3] }}
                </p>
              </div>
            </div>
            <p
              style="margin-top: 10px"
              class="txt fade-time-4"
              v-html="initDom[lang].page4.text[1]"
            ></p>
          </div>
        </div>
        <div class="slide-page" :class="currentPage === 4 ? 'current' : ''">
          <div class="page-flex page5">
            <div class="tile fade-time-0">
              <p
                class="txt fade-time-0"
                v-html="initDom[lang].page5.text[3]"
              ></p>
              <div class="card fade-time-1" style="margin-top: 12px">
                <div class="card-content">
                  <p class="title fade-time-2">
                    {{
                      rankMap[lang][
                        // @ts-ignore
                        getRank(posterData.count_rank)
                      ].title
                    }}
                  </p>
                  <p
                    v-if="
                      rankMap[lang][
                        // @ts-ignore
                        getRank(posterData.count_rank)
                      ].text !== ''
                    "
                    class="text fade-time-2"
                  >
                    {{
                      rankMap[lang][
                        // @ts-ignore
                        getRank(posterData.count_rank)
                      ].text
                    }}
                  </p>
                  <p class="name fade-time-2">@{{ posterData.user_login }}</p>
                </div>
              </div>
              <p class="txt fade-time-3">{{ initDom[lang].page5.text[4] }}</p>
              <p v-if="initDom[lang].page5.text[5]" class="txt fade-time-4">
                {{ initDom[lang].page5.text[5] }}
              </p>
            </div>

            <div class="big fade-time-5">
              <p class="">{{ initDom[lang].page5.text[0] }}</p>
              <img class="code-img" :src="initDom[lang].code" />
              <p>{{ initDom[lang].page5.text[1] }}</p>
              <p style="font-size: 16px">{{ initDom[lang].page5.text[2] }}</p>
            </div>

            <img class="logo" src="@/assets/logo.svg" />
          </div>
        </div>
      </div>
      <div v-else class="slide-content no-contribution">
        <div
          class="slide-page page1"
          :class="currentPage === 0 ? 'current' : ''"
        >
          <div class="page-flex page1">
            <div class="page-cover">
              <h3>{{ initDom[lang].page1.text[0] }}</h3>
              <div class="go-start card" @click.stop="goStart">
                <span class="card-content"
                  ><span>{{ initDom[lang].page1.text[1] }}</span
                  ><em class="arrow"></em
                ></span>
              </div>
              <p class="page-text fade-time-1">
                {{ initDom[lang].page1.text[2] }}
              </p>
            </div>
          </div>
        </div>
        <div
          class="slide-page page2"
          :class="currentPage === 1 ? 'current' : ''"
        >
          <div class="page-flex page2">
            <div class="page-cover">
              <p v-if="posterData.user_login" class="active">
                Dear {{ posterData.user_login }}
              </p>
              <p
                v-for="(sub, index) in initDom[lang].noContribution1.text"
                :key="index"
                :class="`txt fade-time-${index}`"
                v-html="sub"
              ></p>
            </div>
          </div>
        </div>
        <div
          class="slide-page page3"
          :class="currentPage === 2 ? 'current' : ''"
        >
          <div class="page-flex page3">
            <div class="page-cover">
              <p
                v-for="(sub, index) in initDom[lang].noContribution2.text"
                :key="index"
                :class="`txt fade-time-${index}`"
                v-html="sub"
              ></p>
              <div class="hide fade-time-7" style="margin-top: 24px">
                <img class="code-img" :src="initDom[lang].code" />
                <p class="txt">
                  <a :href="communityData.path" target="_blank">{{
                    communityData.path
                  }}</a>
                </p>
                <p class="txt">
                  <a :href="communityData.gitee" target="_blank">{{
                    communityData.gitee
                  }}</a>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="video-bg">
      <video
        id="videoRef"
        ref="videoRef"
        muted
        autoplay
        loop
        playsinline="true"
        :poster="bannerBg"
      >
        <source :src="videoPath" type="video/mp4" />
      </video>
    </div>
    <div ref="bgmOpen" class="bgm-open">
      <img :src="musicIcon" />
    </div>
    <audio
      id="bgm"
      ref="bgm"
      src="/openlookeng-bgm.mp3"
      autoplay
      preload=""
      loop
    ></audio>
  </div>
</template>

<style lang="scss">
#app {
  width: 100vw;
  height: 100vh;
}
.mo-post {
  position: relative;
}
.card {
  position: relative;
  display: block;
  padding: 4px;
  background: rgba(64, 168, 154, 0.6);
  border-radius: 5px;
  width: 100%;
  &::after,
  &::before,
  .card-content::after,
  .card-content::before {
    content: '';
    width: 13px;
    height: 13px;
    display: inline-block;
    position: absolute;
    background: url(@/assets/border.png) no-repeat center/cover;
  }
  &::after {
    top: -1px;
    right: -1px;
    transform: rotate(90deg);
  }
  &::before {
    top: -1px;
    left: -1px;
  }
  .card-content::after {
    bottom: -1px;
    right: -1px;
    transform: rotate(180deg);
  }
  .card-content::before {
    bottom: -1px;
    left: -1px;
    transform: rotate(270deg);
  }
  .card-content {
    padding: 24px 12px;
    border: 1px solid rgba(0, 55, 49, 0.6);
    border-radius: 5px;
    display: block;
    width: 100%;
  }
}
.video-bg {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 1;
  user-select: none;
  video {
    height: 100%;
    width: 100%;
    object-fit: cover;
  }
}
.mo-post {
  .video-bg {
    width: 100vw;
    height: 100vh;
  }
}
a {
  color: #fff;
}
.hide {
  opacity: 0;
}
.code-img {
  margin: 8px 0;
  height: 64px;
  border: 2px solid #fff;
}
.en {
  .page1 .page-cover {
    h3 {
      font-size: 24px !important;
      padding: 0 !important;
      line-height: 32px !important;
    }
  }
  .page5 {
    .big {
      font-size: 16px !important;
    }
    .title {
      font-size: 24px !important;
    }
  }
}
.txt {
  font-size: 12px;
  font-family: FZLTHJW--GB1-0, FZLTHJW--GB1;
  font-weight: normal;
  color: #ffffff;
  line-height: 20px;
  margin-top: 12px;
}
.active {
  color: #feb32a;
  font-size: 14px;
  font-family: 'PangMenZhengDao';
  display: inline-block;
}

.slide-wrapper {
  width: 100vw;
  height: 100vh;
  position: relative;
  overflow: hidden;
  z-index: 99;
  .slide-content {
    width: 100vw;
    .slide-page {
      width: 100vw;
      height: 100vh;
      position: relative;
      .page-flex {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        text-align: center;
        padding: 0 20px 20px;
        height: 100%;

        .active {
          opacity: 0;
        }
      }
      .page1 {
        background: url('@/assets/bg2.png') no-repeat center/contain;
        .go-start {
          opacity: 0;
        }
      }
      .page4 {
        .big {
          font-size: 18px;
        }
        .card {
          opacity: 0;
        }
      }
      .page5 {
        justify-content: space-evenly;
        .big,
        .code-img,
        .logo,
        .title,
        .tile {
          opacity: 0;
        }
      }
    }
  }
}
.page1 {
  height: 100%;
  position: relative;
  .page-cover {
    h3 {
      font-size: 32px;
      font-family: 'Milky-Han-Term-CN-Heavy-Italic';
      font-weight: 600;
      color: #fff;
      line-height: 40px;
      padding: 0 60px;
      font-style: italic;
    }
    .go-start {
      margin: 40px 0;
      font-size: 16px;
      color: #feb32a;
      display: inline-flex;
      align-items: center;
      width: auto;

      font-family: 'PangMenZhengDao';
      letter-spacing: 2px;
      .card-content {
        padding: 8px 12px;
      }
      .arrow {
        width: 12px;
        height: 14px;
        display: inline-block;
        background: url(@/assets/arrow.png) no-repeat center/cover;
        margin-left: 6px;
        animation: headShake 2s 1.7s ease-in-out infinite alternate;
      }
    }
    .page-text {
      font-size: 16px;
      font-family: 'PangMenZhengDao';
      color: #ffffff;
      line-height: 22px;
      letter-spacing: 2px;
    }
  }
  .agreement {
    font-size: 12px;
    position: absolute;
    bottom: 55px;
    width: 100%;
    text-align: center;
    a {
      color: #feb32a;
      display: inline-block;
    }
  }
}
.page2 {
  height: 100%;
  position: relative;
  .page2-content {
    h3 {
      font-size: 24px;
      font-family: PangMenZhengDao;
      color: #feb32a;
      line-height: 27px;
      margin: 12px 0 24px;
    }
  }
}
.big {
  display: block;
  margin: 20px 0;
  font-size: 20px;
  font-family: PangMenZhengDao;
  color: #ffffff;
  line-height: 30px;
  .active {
    font-size: 20px !important;
  }
}
.page4 {
  .name {
    font-size: 16px;
    line-height: 22px;
    letter-spacing: 1px;
    font-family: 'Milky-Han-Term-CN-Heavy-Italic';
    color: #ffffff;
  }
}
.page5 {
  justify-content: space-around;
  padding-top: 60px;
  padding-bottom: 60px;
  .big {
    margin: 0;
    font-size: 16px;
  }
  .code-img {
    height: 64px;
  }
  .card {
    margin-bottom: 10px;
    p {
      font-family: 'Milky-Han-Term-CN-Heavy-Italic';
      color: #ffffff;
    }
  }
  .title {
    font-size: 28px;
    margin-bottom: 16px;
    line-height: 35px;
    letter-spacing: 3px;
  }

  .text {
    font-size: 16px;
    line-height: 22px;
    letter-spacing: 2px;
  }
  .name {
    font-size: 12px;
    line-height: 22px;
    letter-spacing: 1px;
    margin-top: 16px;
  }
}
.logo {
  width: 78px;
  height: 50px;
}
.slide-wrapper p {
  opacity: 0;
}
.current {
  p {
    animation: fade 0.8s ease-in-out forwards;
    .active {
      animation: slide-top 0.8s ease-in-out forwards;
    }
  }
  .hide {
    animation: fade 0.8s ease-in-out forwards;
  }
  .page1 {
    .go-start {
      animation: fade 1.2s ease-in-out forwards;
    }
    h3 {
      animation: bounceIn 1s ease-in-out forwards;
    }
  }
  .page4 {
    .card {
      animation: slide-top 3s ease-in-out forwards;
    }
  }
  .page5 {
    .code-img {
      animation: slide-top 1.2s ease-in-out forwards;
    }
    .big {
      animation: fade 2.5s ease-in-out forwards;
      animation-delay: 2.5s;
    }
    .logo {
      animation: slide-top 1.2s ease-in-out forwards;
      animation-delay: 3s;
    }

    .tile {
      animation: slide-top 1s ease-in-out forwards;
    }
  }
  @for $i from 0 through 22 {
    .fade-time-#{ $i} {
      animation-delay: #{$i * 0.5}s;
      .active {
        animation-delay: #{$i * 0.5 + 0.5}s;
      }
    }
  }
}
// ipad 适配
@media screen and (min-width: 768px) {
  html {
    font-size: 86px !important;
  }
}
@keyframes fade {
  100% {
    opacity: 1;
  }
}

@keyframes slide-top {
  0% {
    opacity: 0;
    transform: translateY(12px);
  }
  100% {
    opacity: 1;
    transform: translateY(0px);
  }
}
@keyframes slide-top1 {
  0% {
    transform: translateY(12px);
  }
  100% {
    transform: translateY(-10px);
  }
}

@keyframes bounceIn {
  0%,
  20%,
  40%,
  60%,
  80%,
  to {
    -webkit-animation-timing-function: cubic-bezier(0.215, 0.61, 0.355, 1);
    animation-timing-function: cubic-bezier(0.215, 0.61, 0.355, 1);
  }

  0% {
    opacity: 0;
    -webkit-transform: scale3d(0.3, 0.3, 0.3);
    transform: scale3d(0.3, 0.3, 0.3);
  }

  20% {
    -webkit-transform: scale3d(1.1, 1.1, 1.1);
    transform: scale3d(1.1, 1.1, 1.1);
  }

  40% {
    -webkit-transform: scale3d(0.9, 0.9, 0.9);
    transform: scale3d(0.9, 0.9, 0.9);
  }

  60% {
    opacity: 1;
    -webkit-transform: scale3d(1.03, 1.03, 1.03);
    transform: scale3d(1.03, 1.03, 1.03);
  }

  80% {
    -webkit-transform: scale3d(0.97, 0.97, 0.97);
    transform: scale3d(0.97, 0.97, 0.97);
  }

  to {
    opacity: 1;
    -webkit-transform: scaleX(1);
    transform: scaleX(1);
  }
}

@keyframes headShake {
  0% {
    -webkit-transform: translateX(0);
    transform: translateX(0);
  }

  15% {
    -webkit-transform: translateX(-2px) rotateY(-4deg);
    transform: translateX(-2px) rotateY(-4deg);
  }

  32% {
    -webkit-transform: translateX(2px) rotateY(4deg);
    transform: translateX(2px) rotateY(4deg);
  }

  50% {
    -webkit-transform: translateX(0);
    transform: translateX(0);
  }
}

/* 开始编写CSS */
.pc-zh {
  @for $i from 1 through 4 {
    .box-#{ $i} {
      .pc-top {
        .text {
          background-image: url('@/assets/pc-bg-#{$i}.png');
        }
      }
    }
  }
  .box-1 .pc-top {
    .text {
      & ~ .text {
        background-image: url('@/assets/pc-bg-2.png');
        margin-top: 48px;
      }
    }
  }
  .box-3 .pc-top {
    .text {
      & ~ .text {
        background-image: url('@/assets/pc-bg-4.png');
        margin-top: 48px;
      }
    }
  }
}
.pc-en {
  @for $i from 1 through 4 {
    .box-#{ $i} {
      .pc-top {
        .text {
          background-image: url('@/assets/pc-bg-#{$i}-en.png');
          width: 61px;
          height: 78px;
        }
      }
    }
  }
  .box-1 .pc-top {
    .text {
      & ~ .text {
        background-image: url('@/assets/pc-bg-2-en.png');
        margin-top: 48px;
        width: 61px;
        height: 78px;
      }
    }
  }
  .box-3 .pc-top {
    .text {
      & ~ .text {
        background-image: url('@/assets/pc-bg-4-en.png');
        margin-top: 48px;
        width: 61px;
        height: 78px;
      }
    }
  }
  .box-2 .pc-top .text,
  .no-contribution .box-1 .pc-top .text:last-child {
    width: 65px;
    height: 80px;
  }
  .txt {
    line-height: 20px !important;
    margin-top: 8px;
  }
  .big {
    font-size: 16px !important;
    line-height: 24px !important;
  }
  .title {
    font-size: 24px !important;
  }
}

.pc-post {
  display: flex;
  margin: 0 auto;
  justify-content: center;
  overflow: hidden;
  height: 100vh;
  padding: 50px;
  max-width: 1920px;
  @media screen and (max-width: 1460px) {
    padding: 24px;
  }
  .contribution,
  .no-contribution {
    display: flex;
    margin: 0 auto;
    width: 100%;
    align-items: center;
    justify-content: space-between;
  }
  .page3 {
    width: 100%;
    height: 100%;
    background-size: 100% auto;
    .pc-top {
      height: 100%;
      position: relative;
      z-index: 99;
      display: flex;
      align-items: center;
      justify-content: center;
      flex-direction: column;
      background: url(@/assets/bg2.png) no-repeat center/cover;
    }
  }
  .page2 {
    position: relative;
    z-index: 5;
    .page2-main {
      display: flex;
      flex-direction: column;
      align-items: center;
      max-width: 210px;
      width: 100%;
      text-align: center;
      padding: 0 12px;
      color: #000;
      p {
        position: relative;
        z-index: 10;
      }
      .active {
        padding: 0 2px;
        font-size: 16px;
        font-weight: 700;
        color: #feb32a;
      }
      .user {
        color: #feb32a;
        font-size: 20px;
        line-height: 24px;
        font-family: PangMenZhengDao;
      }
      .main-text {
        line-height: 32px;
        font-size: 12px;
      }
    }
    .img-box > img {
      position: absolute;
    }
    .desktop {
      left: 80px;
      bottom: 100px;
      width: 74px;
      z-index: 1;
      animation: slide-top1 2s infinite linear alternate;
    }
    .mobile {
      bottom: 240px;
      right: 12px;
      width: 82px;
      z-index: 1;
      animation: slide-top1 3s infinite linear alternate;
    }
    .notebook {
      top: 144px;
      left: 12px;
      width: 80px;
      z-index: 1;
      animation: slide-top1 5s infinite linear alternate;
    }
    .database {
      top: 100px;
      right: 15px;
      width: 90px;
      z-index: 1;
      animation: slide-top1 4s infinite linear alternate;
    }
  }
  body {
    overflow: hidden;
    width: 100%;
    height: 100%;
    text-align: center;
    font-size: 14px;
    color: white;
    background-color: white;
  }

  .container {
    position: relative;
    max-width: 360px;
    width: 100%;
    max-height: 640px;
    height: 100%;
    overflow: hidden;
    .page5 {
      justify-content: space-evenly;
    }
  }
  .no-contribution {
    justify-content: space-around;
  }
  .front,
  .back {
    position: absolute;
    width: 100%;
    height: 100%;
    background-size: cover;
    background-position: center;
    display: flex;
    justify-content: center;
    align-items: center;
    transform-style: preserve-3d;
    backface-visibility: hidden;
    transition: transform 0.7s ease-in-out;
  }
  .front {
    z-index: 10;
  }

  .no-contribution .qr-code {
    padding-top: 50px;
  }
  .noContribution .qr-code img {
    border: 1px solid black;
  }
  .no-contribution .qr-code img {
    border: 1px solid black;
  }
  .no-contribution .qr-code p {
    padding-top: 20px;
  }
  .back {
    transform: rotateY(180deg);
  }

  .pc-top {
    display: flex;
    justify-content: center;
    .text {
      width: 125px;
      height: 109px;
      background-position: center center;
      background-size: cover;
    }
  }

  .pc-post .euler-title2 {
    padding: 10px 0;
  }
  .pc-post .euler-title3 {
    padding: 0 0 10px;
  }
  .contents {
    width: 100%;
    height: 100%;
    transform: translateZ(60px);
    padding: 0 20px;
    align-items: center;
    flex-direction: column;
    justify-content: center;
    display: flex;
    text-align: center;
  }
  .contents .page {
    position: relative;
    width: 100%;
    height: 100%;
    overflow: hidden;
  }
}

.bgm-open {
  position: fixed;
  top: 16px;
  right: 16px;
  width: 24px;
  height: 24px;
  display: block;
  z-index: 9999;
  transition: all 0.3s;
}
.bgm-open img {
  width: 100%;
}
.bgm-open.run-bgm {
  animation: rotate360 3s infinite linear;
}

@keyframes rotate360 {
  0% {
    transform: rotate(0);
  }
  100% {
    transform: rotate(360deg);
  }
}
</style>
