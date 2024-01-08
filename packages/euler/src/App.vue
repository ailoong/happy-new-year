<script setup lang="ts">
import { onMounted, ref, onUnmounted, computed, watch } from 'vue';
import useWindowResize from 'shared/hooks/useWindowResize';

import Stars from './Stars.vue';

import BScroll from '@better-scroll/core';
import { BScrollInstance } from '@better-scroll/core';
import Slide from '@better-scroll/slide';

import { getPosterData, getUserData } from 'shared/api';

import QRcode_zh from '@/assets/QRcode_zh.png';
import QRcode_en from '@/assets/QRcode_en.png';
import titleEn from '@/assets/title-en.png';
import titleZh from '@/assets/title-zh.png';
import arrowIcon from '@/assets/arrow.png';

const lang = ref('zh');
const screenWidth = useWindowResize();
watch(
  () => window.location.href,
  (val) => {
    lang.value = val.includes('/en/') ? 'en' : 'zh';
  },
  { immediate: true }
);

const userName = ref('');
const params = ref({
  community: 'openeuler',
  year: '2023',
});

const datastat = {
  user: '213w',
  contributor: '17k',
  pr: '148.9K',
  osv: '22',
  member: '1.4K',
  sig_groups: '100',
  groups: ['150', '1900'],
  versions: ['23.03、23.09', '22.03 LTS SP2、20.03 LTS SP4、22.03 LTS SP3'],
};

async function getUserDataFun() {
  await getUserData().then((res) => {
    if (res.user) {
      userName.value = res.user;
    }
  });
}

const codeInfo = {
  bottomText:
    lang.value === 'en'
      ? 'Scan the QR code below to access your [2023 Wrap-up]'
      : '扫码查看openEuler与你的独家记忆',
  img: lang.value === 'en' ? QRcode_en : QRcode_zh,
};

const pageCentent: any = computed(() => {
  return {
    zh: {
      page2: [
        `一年一度又到了这个时候，openEuler四岁啦！`,
        `在这一年社区中发生了很多有意思的事情`,
        `openEuler也在惊喜地成长：`,
        `社区用户<span class="active">${datastat.user}+</span>`,
        `社区PR数<span class="active">${datastat.pr}+</span>`,
        `社区贡献者<span class="active">${datastat.contributor}+</span>`,
        `商用OSV<span class="active">${datastat.osv}</span>家`,
        `企业成员<span class="active">${datastat.member}+</span>家`,
        '......',
      ],
      page3: [
        `openEuler成长的过程记录着你奋斗的岁月`,
        `在今天这个特殊的日子里`,
        `请跟openEuler 一起乘坐时光机`,
        `回看你在openEuler 社区中熠熠生辉的瞬间……`,
      ],
      page4: [
        {
          value: `Hi @${
            userName.value
          }，我们在一起<span class="active">${getYear(
            posterData.value?.first_time_of_enter
          )}年</span>啦！ `,
          key: posterData.value.first_time_of_enter,
        },
        {
          value: ` <span class="active">${changeTime(
            posterData.value.first_time_of_enter
          )}</span> <br>你第一次来到openEuler社区`,
          key: posterData.value.first_time_of_enter,
        },
        {
          value: `<span class="active">${changeTime(
            posterData.value.first_time_of_comment
          )}</span> <br>今年你第一次在社区中评论了 <span class="active">${
            posterData.value.first_user_of_comment
          }</span>  `,
          key: posterData.value.first_time_of_comment,
        },
        {
          value: `初来乍到， <span class="active">${posterData.value.first_user_of_be_comment}</span> 第一个解决了你的问题`,
          key: posterData.value.first_user_of_be_comment,
        },
        {
          value: `回忆满满，你与<span class="active">${posterData.value.user_login_with_most_contact}</span>联系最多`,
          key: posterData.value.user_login_with_most_contact,
        },
        {
          value: '时光悄然流逝',
          key: true,
        },
        {
          value: '但这些流光溢彩的回忆，我铭记于心……',
          key: true,
        },
      ],
      page5: [
        {
          value: `回首2023，openEuler社区快速成长`,
          key: true,
        },
        {
          value: `发布了两个创新版本：${datastat.versions[0]}`,
          key: true,
        },
        {
          value: `三个长周期SP版本：<br />${datastat.versions[1]} `,
          key: true,
        },
        {
          value: `而你在这一年中`,
          key: true,
        },
        {
          value: `提交了<span class="active">${posterData.value.pr_num}</span>个pr`,
          key: posterData.value.pr_num,
        },
        {
          value: `提交了<span class="active">${posterData.value.issue_num}</span>个issue`,
          key: posterData.value.issue_num,
        },
        {
          value: `提交了<span class="active">${posterData.value.comment_num}</span>条评论`,
          key: posterData.value.comment_num,
        },
        {
          value: `参与了<span class="active">${posterData.value.sig_num}</span>个sig组`,
          key: posterData.value.sig_num,
        },
        {
          value: `点亮了<span class="active">${posterData.value.star_num}</span>个仓库`,
          key: posterData.value.star_num,
        },
        {
          value: `在<span class='active'>${changeTime(
            posterData.value.latest_controibute_at
          )}</span>，你工作到<span class='active'>${formatTime(
            posterData.value.latest_controibute_at
          )}</span>`,
          key: posterData.value.latest_controibute_at,
        },
        {
          value: `整个世界都休息了，你和openEuler还在继续`,
          key: posterData.value.latest_controibute_at,
        },
      ],
      page6: [
        '2023的每个脚印',
        '都是开启新征途的序章',
        '正是因为大家的支持和热爱',
        '才打造出openEuler更好的模样',
        '期待2024年你我携手并肩，继续坚定前行',
        '新年快乐！',
        'openEuler 社区呈上',
      ],
      page7: [
        `在这里有 <span class="active">${datastat.contributor}+</span> 的社区 贡献者与你井肩同行`,
        `在这里有 <span class="active">${datastat.sig_groups}+</span> 个SIG组`,
        '相信总能找到和你志趣相投的人',
        `在这里会有遍及全球 <span class="active">${datastat.groups[0]}+</span> 个国家`,
        `<span class="active">${datastat.groups[1]}+</span> 城市的用户和你不期而遇......`,
        '期待2024年，会有属于我们的故事发生……',
        '新年快乐！',
        'openEuler 社区呈上',
      ],
      page8: [
        `在这一年里 <br />你的贡献度击败了社区 <span class="active">${getRank(
          posterData.value.beat_percent
        )}%</span> 的开发者`,
        `感谢你对openEuler社区的支持 期待未来与你的一路同行`,
      ],
    },
    en: {
      page2: [
        `Another year has passed and openEuler is celebrating its 4th anniversary`,
        `This past year, openEuler has experienced breathtaking growth`,
        `<span class="active">${datastat.user}+</span> community users`,
        `<span class="active">${datastat.pr}+ </span>PRs`,
        `<span class="active">${datastat.contributor}+ </span>contributors`,
        `<span class="active">${datastat.osv}</span> commercial OSVs`,
        `<span class="active">${datastat.member}+ </span>enterprise members`,
        'Many entertaining stories every day...',
      ],
      page3: [
        `openEuler remembers how your amazing contributions helped us shine`,
        `On this special day`,
        `Let's step into a time machine`,
        `And look back on your memorable moments in the openEuler community...`,
      ],
      page4: [
        {
          value: `Dear ${posterData.value.user_login}`,
          key: posterData.value.user_login,
        },
        {
          value: `Can you believe it's been <span class="active">${getYear(
            posterData.value?.first_time_of_enter
          )}</span> year${
            getYear(posterData.value?.first_time_of_enter) || 1 > 1 ? 's' : ''
          } since we first met?`,
          key: posterData.value.first_time_of_enter,
        },
        {
          value: `On <span class="active">${changeTime(
            posterData.value.first_time_of_enter
          )}</span> <br> you first visited our homepage`,
          key: posterData.value.first_time_of_enter,
        },
        {
          value: `On <span class="active">${changeTime(
            posterData.value.first_time_of_comment
          )}</span> <br>you first said hello to <span class="active"> ${
            posterData.value.first_user_of_comment
          }'s</span>`,
          key: posterData.value.first_time_of_comment,
        },
        {
          value: `This year, you had the most contact with <span class="active">${posterData.value.first_user_of_be_comment}</span>`,
          key: posterData.value.first_user_of_be_comment,
        },
        {
          value: 'These are moments to cherish',
          key: true,
        },
      ],
      page5: [
        {
          value: `Thanks to your support`,
          key: true,
        },

        {
          value: `This year openEuler released the version of <br />${datastat.versions[0]} <br />${datastat.versions[1]} `,
          key: true,
        },

        {
          value: `you submitted <span class="active">${
            posterData.value?.pr_num
          }</span> PR${posterData.value?.pr_num !== '1' ? 's' : ''}`,
          key: posterData.value.pr_num,
        },
        {
          value: `Raised <span class="active">${
            posterData.value?.issue_num
          }</span> issue${posterData.value?.issue_num !== '1' ? 's' : ''}`,
          key: posterData.value.issue_num,
        },
        {
          value: `Made <span class="active">${
            posterData.value?.comment_num
          }</span> comment${posterData.value?.comment_num !== '1' ? 's' : ''}`,
          key: posterData.value.comment_num,
        },
        {
          value: `Participated <span class="active">${
            posterData.value?.sig_num
          }</span> SIG${posterData.value?.sig_num !== '1' ? 's' : ''}`,
          key: posterData.value.sig_num,
        },
        {
          value: `Star <span class="active">${posterData.value?.star_num}</span> repositories`,
          key: posterData.value.star_num,
        },
        {
          value: `On<span class='active'>${changeTime(
            posterData.value.latest_controibute_at
          )}</span>, you worked till<span class='active'>${formatTime(
            posterData.value.latest_controibute_at
          )}</span>`,
          key: posterData.value.latest_controibute_at,
        },
        {
          value: `and the rest of the world fell asleep quietly`,
          key: posterData.value.latest_controibute_at,
        },
        {
          value: `But openEuler was there for you`,
          key: posterData.value.latest_controibute_at,
        },
      ],
      page6: [
        'Every step in 2023',
        'Moved us closer to our goals!',
        'We appreciate your support and passion',
        'To make openEuler what it is today',
        'Keep working with us to build a better',
        'openEuler in 2024',
        'Happy New Year!',
        'From the openEuler community',
      ],
      page7: [
        `Come and collaborate with <span class="active">${datastat.contributor}+</span> contributors`,
        `<span class="active">${datastat.sig_groups}+</span> SIGs`,
        `Users in <span class="active">${datastat.groups[0]}+</span> countries and regions and`,
        `<span class="active">${datastat.groups[1]}+</span> cities around the world`,
        'We look forward to enjoying 2024 with you',
        'Happy New Year',
        'From the openEuler community',
      ],
      page8: [
        `Your contributions exceeded those of <span class="active">${getRank(
          posterData.value.beat_percent
        )}%</span> of developers in 2023`,
        `A community legend! Your contributions to the openEuler community are the fuel we need to light the way to our future.`,
      ],
    },
  };
});

const pageTitle = {
  text:
    lang.value === 'en'
      ? 'openEuler 4th Anniversary: Discover Yourself in an Open Source World'
      : '四周年 遇见开源世界的自己',
  img: lang.value === 'en' ? titleEn : titleZh,
};

const wrapper = ref<HTMLElement | null>(null);

BScroll.use(Slide);
const isContributor = ref(true);
const posterData: any = ref({});

async function getPosterDataFun() {
  await getPosterData(params.value)
    .then((res) => {
      if (res?.code === 200 && res.data.length) {
        isContributor.value = true;
        posterData.value = res.data[0];
        posterData.value.code_lines_add =
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
function getZero(time: number) {
  return time < 9 ? '0' + time : time;
}
function changeTime(time: string) {
  if (time) {
    const endTime = new Date(time);
    const y = endTime.getFullYear();
    const m = endTime.getMonth() + 1;
    const d = endTime.getDate();
    let all = '';
    if (lang.value === 'zh') {
      all = `${y}年${getZero(m)}月${getZero(d)}日`;
    } else {
      all = `${getZero(d)}/${getZero(m)}/${y}`;
    }
    return all;
  }
}
function formatTime(time: string) {
  if (time) {
    const EndTime = new Date(time);
    const h = EndTime.getHours();
    const m = EndTime.getMinutes();
    const all = `${getZero(h)}:${getZero(m)} ${h < 12 ? 'AM' : ''}`;
    return all;
  }
}

function getRank(per: string | number) {
  const percentage = per === '1' ? 100 : Number(per) * 100;
  return percentage;
}
function getYear(time: string) {
  if (time) {
    const today = new Date().getTime();
    const endTime = new Date(time).getTime();
    const year = Math.ceil((today - endTime) / 1000 / 24 / 60 / 60 / 365);
    return year > 4 ? 4 : year;
  }
}

const setVhHeight = () => {
  const vh = window.innerHeight * 0.01;
  document.documentElement.style.setProperty('--vh', `${vh}px`);
};

onMounted(async () => {
  // 必须先确定是否为贡献者
  await getUserDataFun();
  await getPosterDataFun();
  setVhHeight();
  window.addEventListener('resize', setVhHeight);

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
      mouseWheel: true,
      stopPropagation: true,
      resizePolling: 60,
    });
    slide.on('slidePageChanged', () => {
      currentPage.value = slide.getCurrentPage().pageY;
    });
  }
  bgm.value?.addEventListener('pause', function () {
    bgmOpen.value?.classList.remove('run-bgm');
  });
  bgmOpen.value?.addEventListener('touchstart', function () {
    bgm.value?.paused ? bgm.value?.play() : bgm.value?.pause();
    bgmOpen.value?.classList.add('run-bgm');
  });
});

// 背景音乐
const bgm = ref<HTMLAudioElement | null>(null);
const bgmOpen = ref<HTMLDivElement | null>(null);

onUnmounted(() => {
  if (slide) {
    slide.destroy();
  }
});
</script>

<template>
  <audio
    id="bgm"
    ref="bgm"
    src="/bgm/openEuler_BGM.mp3"
    preload="auto"
    loop
  ></audio>

  <div ref="bgmOpen" class="bgm-open">
    <img class="closebgm" src="@/assets/close.svg" alt="" />
  </div>

  <div :class="screenWidth > 768 ? 'pc' : 'mobile'" class="layout">
    <div ref="wrapper" class="slide-wrapper" :class="lang">
      <div v-if="isContributor" class="slide-content contribution">
        <div
          class="slide-page pg-1"
          :class="currentPage === 0 ? 'current' : ''"
        >
          <div class="pg1-top">
            <p class="title1">
              <img :src="pageTitle.img" class="title-img" alt="" />
            </p>
            <p class="title3">{{ pageTitle.text }}</p>
          </div>
          <div class="pg1-bottom">
            <img src="@/assets/children.png" class="children" alt="" />
            <img src="@/assets/clock.png" class="clock-img" alt="" />
          </div>
          <div class="slide-top">
            <img :src="arrowIcon" alt="" />
          </div>
        </div>
        <div
          class="slide-page pg-2"
          :class="currentPage === 1 ? 'current' : ''"
        >
          <div class="pg-2-main">
            <img src="@/assets/img5.png" class="img5" alt="" />
            <div class="user">
              <p class="blod active">Dear {{ userName }}</p>
            </div>
            <div class="main-text">
              <p
                v-for="(item, index) in pageCentent[lang].page2"
                :key="item"
                v-dompurify-html="item"
                :class="`fade-time-${index + 1}`"
              ></p>
            </div>
          </div>
          <div class="img-box">
            <img src="@/assets/img2.png" class="img2 hand-man opacity" alt="" />
            <img src="@/assets/img3.png" class="img3 hand-ai opacity" alt="" />
            <img src="@/assets/img4.png" class="img4 hand-man opacity" alt="" />

            <img src="@/assets/img1.png" class="img1 earth" alt="" />
            <img
              src="@/assets/img1-1.png"
              class="img1-1 light-show1 opacity"
              alt=""
            />
          </div>
          <Stars />
          <div class="slide-top">
            <img :src="arrowIcon" alt="" />
          </div>
        </div>
        <div
          class="slide-page pg-3"
          :class="currentPage === 2 ? 'current' : ''"
        >
          <div class="pg-3-main">
            <div class="main-text">
              <p
                v-for="(item, index) in pageCentent[lang].page3"
                :key="item"
                :class="`fade-time-${index + 1}`"
              >
                {{ item }}
              </p>
            </div>
            <div class="bottom-scan">
              <div class="qr-box">
                <img :src="codeInfo.img" alt="" />
              </div>
              <p class="fade-time-6">
                {{ codeInfo.bottomText }}
              </p>
            </div>
          </div>
          <Stars />
          <div class="pg-3-bg">
            <div class="loader">
              <div class="face">
                <div class="circle"></div>
              </div>
            </div>
          </div>
          <div class="slide-top">
            <img :src="arrowIcon" alt="" />
          </div>
        </div>
        <div
          class="slide-page pg-4"
          :class="currentPage === 3 ? 'current' : ''"
        >
          <div class="main-text">
            <p
              v-for="(item, index) in pageCentent[lang].page4"
              :key="item.value"
              :class="`fade-time-${index + 1}`"
            >
              <span v-if="item.key" v-dompurify-html="item.value"></span>
            </p>
          </div>
          <div class="img-box">
            <img src="@/assets/img6.png" class="img6 light-show" alt="" />
            <img src="@/assets/img7.png" class="img7 light-show1" alt="" />
          </div>
          <div class="slide-top">
            <img :src="arrowIcon" alt="" />
          </div>
        </div>
        <div
          class="slide-page pg-5"
          :class="currentPage === 4 ? 'current' : ''"
        >
          <div class="main-text">
            <p
              v-for="(item, index) in pageCentent[lang].page5"
              :key="item.value"
              :class="`fade-time-${index}`"
            >
              <span
                v-if="item.key && item.key !== '0'"
                v-dompurify-html="item.value"
              ></span>
            </p>
          </div>
          <div class="slide-top">
            <img :src="arrowIcon" alt="" />
          </div>
        </div>
        <div
          class="slide-page pg-5"
          :class="currentPage === 5 ? 'current' : ''"
        >
          <div class="img-box main-text">
            <p class="title fade-time-0">2023</p>
            <p
              v-dompurify-html="pageCentent[lang].page8[0]"
              class="fade-time-1"
            ></p>
            <p class="fade-time-2">
              <img src="@/assets/img9.png" class="img9" alt="" />
            </p>
            <p class="fade-time-3">
              {{ pageCentent[lang].page8[1] }}
            </p>
          </div>
          <div class="slide-top">
            <img :src="arrowIcon" alt="" />
          </div>
        </div>
        <div
          class="slide-page pg-6"
          :class="currentPage === 6 ? 'current' : ''"
        >
          <div class="main-text">
            <p
              v-for="(item, index) in pageCentent[lang].page6"
              :key="item"
              :class="`fade-time-${index}`"
            >
              {{ item }}
            </p>
          </div>
        </div>
      </div>
      <!-- 无贡献 -->
      <div v-else class="slide-content no-contribution">
        <div
          class="slide-page pg-1"
          :class="currentPage === 0 ? 'current' : ''"
        >
          <div class="pg1-top">
            <p class="title1">
              <img :src="pageTitle.img" class="title-img" alt="" />
            </p>
            <p class="title3">{{ pageTitle.text }}</p>
          </div>
          <div class="pg1-bottom">
            <img src="@/assets/children.png" class="children" alt="" />
            <img src="@/assets/clock.png" class="clock-img" alt="" />
          </div>
        </div>
        <div
          class="slide-page pg-2"
          :class="currentPage === 1 ? 'current' : ''"
        >
          <div class="pg-2-main">
            <img src="@/assets/img5.png" class="img5" alt="" />
            <div class="user">
              <p class="blod active">Dear {{ userName }}</p>
            </div>
            <div class="main-text">
              <p
                v-for="(item, index) in pageCentent[lang].page2"
                :key="item"
                v-dompurify-html="item"
                :class="`fade-time-${index + 1}`"
              ></p>
            </div>
          </div>
          <div class="img-box">
            <img src="@/assets/img2.png" class="img2 hand-man opacity" alt="" />
            <img src="@/assets/img3.png" class="img3 hand-ai opacity" alt="" />
            <img src="@/assets/img4.png" class="img4 hand-man opacity" alt="" />

            <img src="@/assets/img1.png" class="img1 earth" alt="" />
            <img
              src="@/assets/img1-1.png"
              class="img1-1 light-show1 opacity"
              alt=""
            />
          </div>
          <Stars />
        </div>
        <div
          class="slide-page pg-6"
          :class="currentPage === 2 ? 'current' : ''"
        >
          <div class="main-text">
            <p
              v-for="(item, index) in pageCentent[lang].page7"
              :key="item"
              v-dompurify-html="item"
              :class="`fade-time-${index}`"
            ></p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss">
$active: #fdb329;
.active {
  display: inline-block;
  opacity: 0;
  color: $active;
  padding: 0 2px;
  font-weight: 700;
}
body {
  background: #002fa7 url('@/assets/bg.jpg') no-repeat top center/cover;
  @media screen and (max-width: 768px) {
    background: none;
  }
}
#app {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100vh;

  @media screen and (max-width: 768px) {
    width: 100vw;
    height: 100vh;
  }
}
.layout {
  touch-action: pan-y;
}
.pc {
  width: calc(var(--vh, 1vh) * 46.18);
  height: calc(var(--vh, 1vh) * 100);
  .loader {
    display: none;
  }
}
.bgm-open {
  position: absolute;
  width: 23px;
  top: 18px;
  right: 18px;
  z-index: 999;
}

.bgm-open img {
  width: 100%;
}

.run-bgm {
  animation: runBgm 4s infinite;
  font-size: 0;
}

@keyframes runBgm {
  to {
    transform: rotate(360deg);
  }
}
.slide-wrapper {
  width: 100%;
  height: 100%;
  @media screen and (max-width: 768px) {
    width: 100vw;
    max-height: calc(var(--vh, 1vh) * 100);
  }
  position: relative;
  overflow: hidden;
  &.en {
    .title-img {
      width: 83.7% !important;
      margin-bottom: 0.75rem !important;
    }
    .main-text {
      font-size: 13px !important;
    }
    .img9 {
      width: 2.8rem !important;
    }
    .pg-6 {
      .fade-time-2,
      p:last-child {
        margin-top: 16px;
      }
    }
    .pg-2 {
      .fade-time-4 {
        margin-top: 0 !important;
      }
      .fade-time-3 {
        margin-top: 16px;
      }
    }
  }
  &.zh {
    .pg-6 {
      .fade-time-2,
      p:last-child {
        margin-top: 16px;
      }
    }
  }
  .slide-content {
    width: 100%;
    height: 100%;
    @media screen and (max-width: 768px) {
      width: 100vw;
    }
    color: #fff;
    .slide-page {
      display: flex;
      padding: 48px 12px;
      flex-direction: column;
      align-items: center;
      width: 100%;
      height: 100%;
      @media screen and (max-width: 768px) {
        width: 100vw;
        height: 100vh;
        max-height: calc(var(--vh, 1vh) * 100);
      }
      overflow: hidden;
      text-align: center;
      position: relative;
      .slide-top {
        position: absolute;
        bottom: 0.8rem;
        left: 50%;
        transform: translateX(-50%);
        opacity: 0;
        animation-name: slide-up;
        animation-duration: 1.5s;
        animation-delay: 2s;
        animation-timing-function: ease-in-out;
        animation-fill-mode: forwards;
        z-index: 8;
        img {
          width: 1rem;
          animation-name: move;
          animation-delay: 3.5s;
          animation-duration: 1.5s;
          animation-iteration-count: infinite;
          animation-timing-function: ease-in-out;
        }
      }
    }
    .main-text {
      line-height: 20px;
      font-size: 12px;
      color: #fff;
    }
    .pg-1 {
      display: flex;
      flex-direction: column;
      align-items: center;
      background: url('@/assets/bg1.jpg') top center/cover;
      position: relative;
      background-position: 100px center;
      .pg1-top {
        font-size: 24px;
        text-align: center;
        .title2 {
          font-size: 36px;
          margin: 10px 0 32px;
        }
        .title3 {
          font-size: 16px;
        }
        .title-img {
          width: 68.7%;
          margin-bottom: 1rem;
        }
      }
      .pg1-bottom {
        width: 100%;
        .children {
          width: 81.6%;
          position: absolute;
          left: 10%;
          bottom: 13.25%;
          z-index: 2;
          animation-name: card;
          animation-duration: 2s;
          animation-iteration-count: infinite;
          animation-timing-function: ease-in-out;
        }
        .clock-img {
          width: 128%;
          position: absolute;
          bottom: 0;
          left: -14%;
          transform: translateY(58%);
        }
      }
    }
    .pg-2 {
      position: relative;
      display: flex;
      align-items: center;
      flex-direction: column;
      background: url('@/assets/bg2.jpg') no-repeat top center/cover;
      .pg-2-main {
        display: flex;
        flex-direction: column;
        align-items: center;
        width: 100%;
        text-align: center;
        padding: 0 12px;
        color: #000;
        z-index: 10;
        .user {
          color: $active;
          font-size: 16px;
          margin: 16px 0 10px;
          line-height: 24px;
        }
        .img5 {
          width: 22.4%;
          animation-name: card;
          animation-duration: 2s;
          animation-iteration-count: infinite;
          animation-timing-function: ease-in-out;
        }

        .fade-time-4 {
          margin-top: 10px;
        }

        .fade-time-5,
        .fade-time-6,
        .fade-time-7,
        .fade-time-8,
        .fade-time-9 {
          margin: 3px 0;
        }
      }
      .img-box {
        img {
          position: absolute;
          z-index: 2;
        }
        .img1 {
          width: 278%;
          z-index: 3;
        }
        .img1-1 {
          width: 199%;
          top: 48%;
          right: -79%;
          z-index: 3;
        }
        .img2 {
          top: 19%;
          left: -0.4rem;
          width: 20%;
        }
        .img3 {
          top: 36.6%;
          right: -1.1rem;
          width: 30%;
        }
        .img4 {
          top: 46%;
          left: -1.35rem;
          width: 35%;
        }
      }
    }
    .pg-3 {
      background: url('@/assets/bg3.jpg') no-repeat top center/cover;
      .pg-3-bg {
        background: url('@/assets/bg3.png') no-repeat top center/cover;
        position: absolute;
        top: 0;
        right: 0;
        bottom: 0;
        left: 0;
        z-index: 2;
      }
      .pg-3-main {
        display: flex;
        flex-direction: column;
      }
      .bottom-scan {
        line-height: 24px;
        font-size: 12px;
        position: absolute;
        top: 43.6%;
        width: 100%;
        left: 0;
        text-align: center;
        .qr-box {
          position: relative;
          display: inline-block;
          padding: 8px;
          border: 1px solid rgba($color: #fff, $alpha: 0.7);
          background-color: rgba(0, 47, 167, 0.7);
          z-index: 99;
          margin-bottom: 5px;
          img {
            width: 2.5rem;
          }
        }
      }
    }
    .pg-4 {
      background: url('@/assets/bg4.jpg') no-repeat top center/cover;

      .img-box {
        position: absolute;
        top: 56%;
        left: 0;
        width: 100%;
      }
      .img6 {
        position: absolute;
        width: 98%;
        top: 1.32%;
        left: 0.16%;
        opacity: 0;
        @media screen and (max-width: 768px) {
          left: 0.2rem;
        }
      }
      .img7 {
        position: absolute;
        width: 66%;
        top: -1rem;
        left: 16.8%;
        opacity: 0;
        @media screen and (max-width: 768px) {
          left: 1.8rem;
        }
      }
    }
    .pg-5 {
      background: url('@/assets/bg5.jpg') no-repeat top center/cover;

      .img-box {
        background: url('@/assets/img8.png') no-repeat center/cover;
        width: 7.28rem;
        height: 9.34rem;
        padding: 0 0.3rem;

        .title {
          padding: 0.8rem 0 0.6rem;
          text-align: center;
          color: #fff;
          font-size: 16px;
          font-weight: bold;
        }
        .img9 {
          width: 3.3rem;
          display: block;
          margin: 0 auto;
        }
      }
    }

    .pg-6 {
      background: url('@/assets/bg6.jpg') no-repeat top center/cover;
    }
  }
}

p,
.opacity {
  opacity: 0;
}
.current {
  p {
    animation: fade 0.8s ease-in-out forwards;
    .active {
      animation: slide-top 0.8s ease-in-out forwards;
    }
  }
  &.pg-1 {
    animation: zoomin 5s linear forwards;
  }

  @for $i from 0 through 22 {
    .fade-time-#{ $i} {
      animation-delay: #{$i * 0.5}s;
      .active {
        animation-delay: #{$i * 0.5 + 0.5}s;
      }
    }
  }

  .fire-1 {
    animation: fade 4s 4s ease-in-out forwards;
  }
  .fire-2 {
    animation: fade 3s 3s ease-in-out forwards;
  }
  .fire-3 {
    animation: fade 2s 2s ease-in-out forwards;
  }
  .fire-4 {
    animation: fade 1s 1s ease-in-out forwards;
  }
  .hand-ai {
    animation: left-hand 1.2s 0.5s ease-in-out forwards;
  }
  .hand-man {
    animation: right-hand 1.2s 0.5s ease-in-out forwards;
  }
  .glow {
    animation: halo1 2s 1.7s ease-in-out infinite alternate;
  }
  .earth {
    animation: erath-x 1s 0.4s 1 ease-in, erath-y 1s 0.4s 1 linear;
    animation-fill-mode: forwards;
  }
  .light-show {
    animation: lightShow 1s 1s 1 ease-in-out;
    animation-fill-mode: forwards;
  }
  .light-show1 {
    animation: fade1 2.5s 2s ease-in-out forwards;
  }
  .light-show2 {
    animation: card 2s ease-in-out infinite;
  }
}
// ipad 适配

html {
  @media screen and (min-width: 768px) {
    font-size: 110px !important;
  }
}

@keyframes card {
  0% {
    transform: translateY(0px);
  }
  50% {
    transform: translateY(16px);
  }
  100% {
    transform: translateY(0px);
  }
}
@keyframes fade1 {
  0% {
    opacity: 0;
  }
  70% {
    opacity: 0;
  }
  100% {
    opacity: 1;
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
@keyframes left-hand {
  0% {
    opacity: 0;
    transform: translateX(60px);
  }
  100% {
    opacity: 1;
    transform: translateX(0px);
  }
}
@keyframes right-hand {
  0% {
    opacity: 0;
    transform: translateX(-60px);
  }
  100% {
    opacity: 1;
    transform: translateX(0px);
  }
}
@keyframes erath-x {
  0% {
    right: -20rem;
    transform: rotateZ(90deg);
    opacity: 0;
  }
  100% {
    right: -94%;
    transform: rotateZ(-0deg);
    opacity: 1;
  }
}
@keyframes erath-y {
  0% {
    top: 0;
  }
  100% {
    top: 30%;
  }
}

@keyframes lightShow {
  0% {
    opacity: 0;
  }
  35% {
    opacity: 1;
  }
  70% {
    opacity: 0.5;
  }
  100% {
    opacity: 1;
  }
}

@keyframes flash {
  0%,
  100% {
    filter: blur(2px);
    color: #fff;
    text-shadow: 0 0 10px #1e90ff, 0 0 20px #1e90ff, 0 0 30px #1e90ff,
      0 0 40px #1e90ff, 0 0 100px #1e90ff, 0 0 200px #1e90ff, 0 0 300px #1e90ff,
      0 0 400px #1e90ff;
  }
  5%,
  95% {
    filter: blur(0px);
    color: #666;
    text-shadow: none;
  }
}

.loader {
  width: 1.8rem;
  height: 1.8rem;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  position: absolute;
  top: 15.8rem;
  left: 4.3rem;
  transform: rotateX(40deg);
  @media screen and (max-width: 768px) {
    width: 1.6rem;
    height: 1.6rem;
    top: 15.26rem;
    left: 4.2rem;
  }
}
.loader .face {
  position: absolute;
  border-radius: 50%;
  border-style: solid;
  animation: animate 10s linear infinite;
}
.loader .face:nth-child(1) {
  width: 100%;
  height: 100%;
  color: rgba(255, 215, 0, 0.4);
  border-color: currentColor transparent transparent currentColor;
  border-width: 0.9rem 0.9rem 0.9rem 0em;
  --deg: -45deg;
  animation-direction: normal;
}
.loader .face .circle {
  position: absolute;
  width: 50%;
  height: 0.1em;
  top: 50%;
  left: 50%;
  background-color: transparent;
  transform: rotate(var(--deg));
  transform-origin: left;
}
.loader .face .circle::before {
  position: absolute;
  top: -0.1rem;
  right: -0.15rem;
  content: '';
  width: 0.15rem;
  height: 0.15rem;
  background-color: currentColor;
  border-radius: 50%;
}
@keyframes animate {
  to {
    transform: rotate(1turn);
  }
}

@keyframes zoomin {
  100% {
    background-position: 0% center;
  }
}
@keyframes move {
  0% {
    transform: scale(1) translateY(0px);
  }
  50% {
    transform: scale(1.06) translateY(-2px);
  }
  100% {
    transform: scale(1) translateY(0px);
  }
}
@keyframes slide-up {
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
}
</style>
