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
  community: 'openeuler',
  user: 'kaede10',
  year: '2023',
});

const datastat = {
  user: '212w',
  contributor: '168k',
  pr: '146.1K',
  osv: '22',
  member: '1.3K',
};

async function getUserDataFun() {
  await getUserData().then((res) => {
    if (res.user) {
      params.value.user = res.user;
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
        `在这一年社区中发生了很多有意思的事情，openEuler也`,
        `在惊喜地成长：`,
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
          value: `Hi @${params.value.user}，我们在一起${getYear(
            posterData.value?.first_time_of_enter
          )}年啦！ `,
          key: posterData.value.first_time_of_enter,
        },
        {
          value: ` <span class="active">${changeTime(
            posterData.value.first_time_of_enter
          )}，</span> <br>你第一次来到openEuler社区； `,
          key: posterData.value.first_time_of_enter,
        },
        {
          value: `<span class="active">${changeTime(
            posterData.value.first_time_of_comment
          )}，</span> <br>今年你第一次在社区中评论了 <span class="active">${
            posterData.value.first_user_of_comment
          }</span>；  `,
          key: posterData.value.first_time_of_comment,
        },
        {
          value: `初来乍到， <span class="active">${posterData.value.first_user_of_be_comment}</span> 第一个解决了你的问题；`,
          key: posterData.value.first_user_of_be_comment,
        },
        {
          value: `回忆满满，你与<span class="active">${posterData.value.user_login_with_most_contact}</span>联系最多`,
          key: posterData.value.user_login_with_most_contact,
        },
        {
          value: '时光悄然流逝，',
          key: true,
        },
        {
          value: '但这些流光溢彩的回忆，我铭记于心……',
          key: true,
        },
      ],
      page5: [
        {
          value: `回首2023， `,
          key: true,
        },
        {
          value: `迭代了22.03 LTS SP2和23.09两个版本 `,
          key: true,
        },
        {
          value: ` openEuler社区快速成长`,
          key: true,
        },
        {
          value: ` 而你在这一年中`,
          key: true,
        },
        {
          value: ` 提交了<span class="active">${posterData.value.pr_num}</span>个pr`,
          key: posterData.value.pr_num,
        },
        {
          value: ` 提交了<span class="active">${posterData.value.issue_num}</span>个issue`,
          key: posterData.value.issue_num,
        },
        {
          value: ` 提交了<span class="active">${posterData.value.comment_num}</span>条评论`,
          key: posterData.value.comment_num,
        },
        {
          value: ` 贡献了<span class="active">${posterData.value.code_lines_add}</span>行代码`,
          key: posterData.value.code_lines_add,
        },
        {
          value: ` 加入了<span class="active">${posterData.value.sig_num}</span>个sig组`,
          key: posterData.value.sig_num,
        },
        {
          value: ` 点亮了<span class="active">${posterData.value.star_num}</span>个仓库`,
          key: posterData.value.star_num,
        },
      ],
      page6: [
        '2023的每个脚印，',
        '都是开启新征途的序章！',
        '正是因为大家的支持和热爱，',
        '才打造出openEuler更好的模样',
        '期待2024年你我携手并肩，继续坚定前行！',
        '新年快乐！',
        'openEuler 社区呈上',
      ],
      page7: [
        `在这里有 <span class="active">16k+</span> 的社区 贡献者与你井肩同行`,
        `在这里有 <span class="active">100+</span> 个SIG组`,
        '相信总能找到和你志趣相投的人',
        '在这里会有遍及全球 <span class="active">150+</span> 个国家',
        '<span class="active">1900+</span> 城市的用户和你不期而遇......',
        ' ',
        '期待2024年，会有属于我们的故事发生……',
        '新年快乐！',
        'openEuler 社区呈上',
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
          value: `Hi @${params.value.user},`,
          key: posterData.value.user_login,
        },
        {
          value: `Can you believe it's been ${getYear(
            posterData.value?.first_time_of_enter
          )} year${
            getYear(posterData.value?.first_time_of_enter) || 1 > 1 ? 's' : ''
          } since we first met?`,
          key: posterData.value.first_time_of_enter,
        },
        {
          value: `On <span class="active">${changeTime(
            posterData.value.first_time_of_enter
          )},</span> <br> you first visited our homepage`,
          key: posterData.value.first_time_of_enter,
        },
        {
          value: `On <span class="active">${changeTime(
            posterData.value.first_time_of_comment
          )},</span> <br>you first said hello to <span class="active"> ${
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
          value: `Thanks to your support `,
          key: true,
        },
        {
          value: `openEuler released the version of 22.03 LTS SP2 and 23.09 on 2023`,
          key: true,
        },
        {
          value: `This year`,
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
          value: `Contributed <span class="active">${posterData.value?.code_lines_add}</span> lines of code`,
          key: posterData.value.code_lines_add,
        },
        {
          value: `Joined <span class="active">${
            posterData.value?.sig_num
          }</span> SIG${posterData.value?.sig_num !== '1' ? 's' : ''}`,
          key: posterData.value.sig_num,
        },
        {
          value: `Forked <span class="active">${posterData.value?.star_num}</span> repositories`,
          key: posterData.value.sig_num,
        },
      ],
      page6: [
        'Every step in 2023',
        'Moved us closer to our goals!',
        'We appreciate your support and passion',
        'To make openEuler what it is today,',
        'Keep working with us to build a better openEuler in 2024',
        'Happy New Year!',
        'From the openEuler community',
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

posterData.value.code_lines_add =
  Number(posterData.value.code_lines_add) +
  Number(posterData.value.code_lines_delete);

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
function getRank(per: string | number) {
  if (per) {
    const percentage = per === '1' ? 1 : Number(per) * 100;
    let rank = 0;
    if (percentage <= 20) {
      rank = 0;
    } else if (20 < percentage && percentage <= 40) {
      rank = 1;
    } else if (40 < percentage && percentage <= 60) {
      rank = 2;
    } else if (60 < percentage && percentage <= 70) {
      rank = 3;
    } else if (70 < percentage) {
      rank = 4;
    }

    return rank;
  }
}
function getYear(time: string) {
  if (time) {
    const today = new Date().getTime();
    const endTime = new Date(time).getTime();
    const year = Math.ceil((today - endTime) / 1000 / 24 / 60 / 60 / 365);
    return year > 3 ? 3 : year;
  }
}

onMounted(async () => {
  // 必须先确定是否为贡献者
  await getUserDataFun();
  await getPosterDataFun();

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
  }
  bgm.value?.addEventListener('pause', function () {
    bgmOpen.value?.classList.remove('run-bgm');
  });
  bgmOpen.value?.addEventListener('touchstart', function () {
    bgm.value?.paused ? bgm.value?.play() : bgm.value?.pause();
    bgmOpen.value.classList.add('run-bgm');
  });
});

// 背景音乐
const bgm: any = ref('bgm');
const bgmOpen: any = ref('bgmOpen');

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
    src="/bgm/openEuler_BGM_2021.mp3"
    preload="auto"
    loop
  ></audio>
  <div ref="bgmOpen" class="bgm-open">
    <img class="closebgm" src="@/assets/close.svg" alt="" />
  </div>
  <div
    :class="[
      lang === 'zh' ? 'pc-zh' : 'pc-en',
      screenWidth > 768 ? 'pc' : 'mobile',
    ]"
  >
    <!-- H5 -->
    <div ref="wrapper" class="slide-wrapper" :class="lang === 'zh' ? '' : 'en'">
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
        </div>
        <div
          class="slide-page pg-2"
          :class="currentPage === 1 ? 'current' : ''"
        >
          <div class="pg-2-main">
            <img src="@/assets/img5.png" class="img5" alt="" />
            <div class="user">
              <p class="blod active">Dear {{ params.user }}</p>
            </div>
            <div class="main-text">
              <p
                v-for="(item, index) in pageCentent[lang].page2"
                :key="item"
                :class="`fade-time-${index + 1}`"
                v-dompurify-html="item"
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
              <!-- v-if="item.key"  调试去掉的 -->
              <span v-dompurify-html="item.value"></span>
            </p>
          </div>
          <div class="img-box">
            <img src="@/assets/img6.png" class="img6 light-show" alt="" />
            <img src="@/assets/img7.png" class="img7 light-show1" alt="" />
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
        </div>
        <div
          class="slide-page pg-5"
          :class="currentPage === 5 ? 'current' : ''"
        >
          <div class="img-box main-text">
            <p class="title fade-time-0">2023</p>
            <p class="fade-time-1">
              在这一年里 你的贡献度击败了社区
              {{ getRank(posterData.count_rank) }}% 的开发者
            </p>
            <p class="fade-time-2">
              <img src="@/assets/img9.png" class="img9" alt="" />
            </p>
            <p class="fade-time-3">
              感谢你对openEuler社区的支持 期待未来与你的一路同行
            </p>
          </div>
        </div>
        <div
          class="slide-page pg-6"
          :class="currentPage === 6 ? 'current' : ''"
        >
          <div class="main-text">
            <p
              v-for="(item, index) in pageCentent[lang].page6"
              :class="`fade-time-${index}`"
              :key="item"
            >
              {{ item }}
            </p>
          </div>
          <div class="img-box">
            <img
              src="@/assets/footprint1.png"
              class="footprint1 fire-4"
              alt=""
            />
            <img
              src="@/assets/footprint2.png"
              class="footprint2 fire-3"
              alt=""
            />
            <img
              src="@/assets/footprint3.png"
              class="footprint3 fire-2"
              alt=""
            />
            <img
              src="@/assets/footprint4.png"
              class="footprint4 fire-1"
              alt=""
            />
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
              <p class="blod active">Dear {{ params.user }}</p>
            </div>
            <div class="main-text">
              <p
                v-for="(item, index) in pageCentent[lang].page2"
                :key="item"
                :class="`fade-time-${index + 1}`"
                v-dompurify-html="item"
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
          <div class="pg-7-top">
            <p
              v-for="(item, index) in pageCentent[lang].page7"
              :class="`fade-time-${index}`"
              :key="item"
              v-dompurify-html="item"
            ></p>
          </div>
          <div class="img-box">
            <img
              src="@/assets/footprint1.png"
              class="footprint1 fire-4"
              alt=""
            />
            <img
              src="@/assets/footprint2.png"
              class="footprint2 fire-3"
              alt=""
            />
            <img
              src="@/assets/footprint3.png"
              class="footprint3 fire-2"
              alt=""
            />
            <img
              src="@/assets/footprint4.png"
              class="footprint4 fire-1"
              alt=""
            />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss">
$active: #fdb329;
$lang: v-bind('lang');
.active {
  display: inline-block;
  opacity: 0;
  color: $active;
}
body {
  background: #002fa7 url('@/assets/bg.jpg') no-repeat top center/cover;
  @media screen and (max-width: 768px) {
    background: none;
  }
}
#app {
  width: 390px;
  height: 844px;
  margin: 0 auto;

  @media screen and (max-width: 768px) {
    width: 100vw;
    height: 100vh;
  }
}
.pc {
  width: 390px;
  height: 844px;
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
    height: 100vh;
  }
  position: relative;
  overflow: hidden;
  &.en {
    .title-img {
      width: 8.37rem !important;
      margin-bottom: 0.75rem !important;
    }
  }
  .slide-content {
    width: 100%;
    @media screen and (max-width: 768px) {
      width: 100vw;
    }
    color: #fff;
    .slide-page {
      display: flex;
      padding: 3rem 12px;
      flex-direction: column;
      align-items: center;
      width: 100%;
      height: 100%;
      @media screen and (max-width: 768px) {
        padding: 72px 12px;
        width: 100vw;
        height: 100vh;
      }
      overflow: hidden;
      text-align: center;
      position: relative;
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
          width: 6.87rem;
          margin-bottom: 1rem;
        }
      }
      .pg1-bottom {
        position: absolute;
        bottom: 0;
        width: 100%;
        left: 0;
        .children {
          width: 8.16rem;
          position: absolute;
          left: 10%;
          bottom: 2.87rem;
          z-index: 2;
          animation-name: card;
          animation-duration: 2s;
          animation-iteration-count: infinite;
          animation-timing-function: ease-in-out;
          @media screen and (min-width: 768px) {
            // left: -1.4rem;
          }
        }
        .clock-img {
          width: 12.8rem;
          position: absolute;
          bottom: 0;
          left: -0.5rem;
          transform: translateY(7.8rem);
          @media screen and (max-width: 768px) {
            left: -1.4rem;
          }
        }
        .clock {
          // left: 80px;
          // top: 20px;
          // width: 48px;
          // animation: slide-top1 2s infinite linear alternate;
          // z-index: 10;
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
        .active {
          font-weight: 700;
          color: $active;
          margin: 0 3px;
        }
        .user {
          color: $active;
          font-size: 16px;
          margin: 16px 0 10px;
          line-height: 24px;
        }
        .img5 {
          width: 2.2rem;
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
          width: 27.8rem;
          z-index: 3;
        }
        .img1-1 {
          width: 19.9rem;
          bottom: -9.5rem;
          right: -8rem;
          z-index: 3;
        }
        .img2 {
          top: 4rem;
          left: -0.4rem;
          width: 2rem;
        }
        .img3 {
          top: 8rem;
          right: -1.1rem;
          width: 3rem;
        }
        .img4 {
          top: 10rem;
          left: -1.35rem;
          width: 3.5rem;
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
        margin-top: 5rem;
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
      .pg-4-main {
        .active {
          font-weight: 700;
          font-size: 14px;
          color: $active;
        }
      }
      .img6 {
        position: absolute;
        width: 9.8rem;
        bottom: 2.9rem;
        left: 0.5rem;
        opacity: 0;
        @media screen and (max-width: 768px) {
          bottom: 2.6rem;
          left: 0.2rem;
        }
      }
      .img7 {
        position: absolute;
        width: 6.6rem;
        bottom: 6.6rem;
        left: 2.1rem;
        opacity: 0;
        @media screen and (max-width: 768px) {
          bottom: 6.48rem;
          left: 1.8rem;
        }
      }
    }
    .pg-5 {
      background: url('@/assets/bg5.jpg') no-repeat top center/cover;

      .active {
        padding: 0 2px;
        font-size: 14px;
        font-weight: 700;
        color: $active;
      }
      .img-box {
        background: url('@/assets/img8.png') no-repeat center/cover;
        width: 7.28rem;
        height: 9.34rem;
        padding: 0 0.71rem;
        .title {
          padding: 0.88rem 0;
          text-align: center;
          color: #fff;
          font-size: 16px;
          font-weight: bold;
        }
        .img9 {
          width: 3.5rem;
        }
      }
    }

    .pg-6 {
      background: url('@/assets/bg6.jpg') no-repeat top center/cover;
      .pg-7-top {
        .fade-time-5 {
          height: 20px;
        }
      }
      .footprint1 {
        position: absolute;
        width: 4.1rem;
        bottom: -2rem;
        right: 0rem;
        opacity: 0;
      }
      .footprint2 {
        position: absolute;
        width: 2.9rem;
        bottom: 2rem;
        left: 2.9rem;
        opacity: 0;
      }
      .footprint3 {
        position: absolute;
        width: 1.2rem;
        bottom: 4.4rem;
        left: 6.5rem;
        opacity: 0;
      }
      .footprint4 {
        position: absolute;
        width: 0.84rem;
        bottom: 5.3rem;
        left: 4.6rem;
        opacity: 0;
      }
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
    right: -9.3rem;
    transform: rotateZ(-0deg);
    opacity: 1;
  }
}
@keyframes erath-y {
  0% {
    bottom: 10rem;
  }
  100% {
    bottom: -12.8rem;
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
  bottom: 5.15rem;
  left: 4.52rem;
  transform: rotateX(40deg);
  @media screen and (max-width: 768px) {
    width: 1.6rem;
    height: 1.6rem;
    bottom: 4.78rem;
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
</style>
