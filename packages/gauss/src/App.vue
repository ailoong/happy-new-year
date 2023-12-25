<script setup lang="ts">
import { onMounted, ref, onUnmounted, computed } from 'vue';
import useWindowResize from 'shared/hooks/useWindowResize';

import BScroll from '@better-scroll/core';
import { BScrollInstance } from '@better-scroll/core';
import Slide from '@better-scroll/slide';

import { getPosterData, getUserData } from 'shared/api';
import arrowIcon from '@/assets/arrow.png';

const screenWidth = useWindowResize();
const params = ref({
  community: 'opengauss',
  user: 'kaede10',
  year: '2023',
});
const datastat = {
  user: '232w',
  contributor: '6000+',
  pr: '14.9K',
  issue: '15.2K',
  member: '563K',
  version: '2',
  line: 'xxx',
  comment: '248.5k',
  enterprise: '500',
  achievement: ['114', '1517'],
  groups: ['16', '72'],
};

const wrapper = ref<HTMLElement | null>(null);

BScroll.use(Slide);
const isContributor = ref(true);
const posterData: any = ref({
  comment_num: '4288',
  user_login_with_most_contact: 'panxh_purple',
  first_time_of_enter: '2020/1/2 17:37',
  first_user_of_comment: 'lyn1001',
  issue_num: '2424',
  sig_num: '70',
  star_num: '0',
  fork_num: '12',
  code_lines_delete: '7088',
  count_rank: '0.9',
  first_time_of_comment: '2022/1/4 11:30',
  user_login: 'licihua',
  code_lines_add: '8062',
  pr_num: '53',
  first_time_of_be_comment: '2022/1/4 17:31',
  first_user_of_be_comment: 'zzm_567',
  watch_num: '717',
});
function changeTime(time: string) {
  if (time) {
    const EndTime = new Date(time);
    const y = EndTime.getFullYear();
    const m = EndTime.getMonth() + 1;
    const d = EndTime.getDate();
    const all = `${y}年${m}月${d}日`;
    return all;
  }
}
function dayTime(time: string) {
  if (time) {
    const today = new Date().getTime();
    const endTime = new Date(time).getTime();
    return Math.floor((today - endTime) / 1000 / 24 / 60 / 60);
  }
}
const posterContent = computed(() => {
  return {
    page1: [
      {
        value: `HI~很高兴再次遇见你！`,
        key: true,
      },
      {
        value: `你与openGauss的故事要从这个数字说起……`,
        key: true,
      },
      {
        value: `那是<span class="active">${changeTime(
          posterData.value?.first_time_of_enter
        )}</span>`,
        key: posterData.value?.first_time_of_enter,
      },
      {
        value: `我第一次遇见你`,
        key: true,
      },
      {
        value: `至今，我们已经走过了<span class="active">${dayTime(
          posterData.value.first_time_of_enter
        )}</span>个日夜`,
        key: posterData.value.first_time_of_enter,
      },
      {
        value: `<span class='active'>${params.value.user}</span>，感谢你创造了我们的故事`,
        key: params.value.user,
      },
      {
        value: `在openGauss的开源世界里`,
        key: true,
      },
      {
        value: `每一次相遇都是浓墨重彩的一笔`,
        key: true,
      },
    ],
    page2: [
      `因为有<span class="active">${datastat.contributor}</span>个并肩同行的小伙伴一起战斗`,
      `openGauss如期在2023年发布<span class="active">${datastat.version}</span>个版本`,
      `累计贡献代码<span class="active">${datastat.line}</span>行`,
      `合并请求PR<span class="active">${datastat.pr}</span>`,
      `累计产生Issue<span class="active">${datastat.issue}</span>`,
      `评审<span class="active">${datastat.comment}</span>Comment`,
      `你们的成果被<span class="active">${datastat.achievement[0]}</span>个国家、<span class="active">${datastat.achievement[1]}</span>个城市下载应用`,
      '并在数十个关基行业应用',
      `吸引了超过<span class="active">${datastat.enterprise}</span>家企业加入社区`,
      `openGauss在国内`,
      `<span class="active">${datastat.groups[0]}</span>个城市建立了用户组`,
      `走进<span class="active">${datastat.groups[1]}</span>所高校`,
      'openGauss 这是我们一起创造的精彩',
      '感谢你在过去一年的时光里',
      '与openGauss保持同频、分享热爱',
      '希望openGauss在奔赴未来的路上',
      '依然有你相伴，依旧星河璀璨',
    ],
    page3: [
      {
        value: `凡事过往皆为序章`,
        key: true,
      },
      {
        value: `你在2023这一年的时光里`,
        key: true,
      },
      {
        value: `贡献了<span class='active'>${posterData.value.code_lines_add}</span>行代码`,
        key: posterData.value.code_lines_add,
      },
      {
        value: `提交了<span class='active'>${posterData.value.pr_num}</span>个PR`,
        key: posterData.value.pr_num,
      },
      {
        value: `提出了<span class='active'>${posterData.value.issue_num}</span>个Issue`,
        key: posterData.value.issue_num,
      },
      {
        value: `Star了<span class='active'>${posterData.value.star_num}</span>个代码仓库`,
        key: posterData.value.star_num,
      },
      {
        value: `Fork了<span class='active'>${posterData.value.fork_num}</span>个代码仓库`,
        key: posterData.value.fork_num,
      },
      {
        value: `Watch了<span class='active'>${posterData.value.watch_num}</span>个代码仓库`,
        key: posterData.value.watch_num,
      },
      {
        value: `你对某行代码的批注或贡献，对某个问题的提出或解决，`,
        key: true,
      },
      {
        value: `都代表了你对openGauss的支持与关注`,
        key: true,
      },
    ],
    page4: [
      {
        value: `这一年，你与<span class='active'>${posterData.value.user_login_with_most_contact}</span>人建立了联系`,
        key: posterData.value.user_login_with_most_contact,
      },
      {
        value: `<span class='active'>${posterData.value.user_login_with_most_contact}</span>，一定很特别`,
        key: posterData.value.user_login_with_most_contact,
      },
      {
        value: `你们沟通最多，相信一定是志同道合的伙伴`,
        key: posterData.value.user_login_with_most_contact,
      },
      {
        value: `这一年，你参与了<span class='active'>XXX</span>次会议`,
        key: posterData.value.user_login_with_most_contact,
      },
      {
        value: `<span class='active'>XXXX（SIG组名称）</span>因你的每一次参与而变得不一样`,
        key: posterData.value.user_login_with_most_contact,
      },
      {
        value: `<span class='active'>XX月XX日（最晚时间）</span>`,
        key: posterData.value.user_login_with_most_contact,
      },
      {
        value: `你睡得很晚整个世界都休息了`,
        key: true,
      },
      {
        value: `你和openGauss还在继续`,
        key: true,
      },
      {
        value: `你也曾连续<span class='active'>XXX（连续贡献）</span>天都在`,
        key: posterData.value.user_login_with_most_contact,
      },
      {
        value: `只为了心中热爱`,
        key: true,
      },
      {
        value: `这些值得铭记的瞬间，`,
        key: true,
      },
      {
        value: `都是你一次次提升自我的深度探索`,
        key: true,
      },
      {
        value: `恭喜你，也找到了更加契合的伙伴`,
        key: true,
      },
    ],
    page5: [
      'Hi，很高兴认识你',
      '欢迎来到openGauss 星球',
      '有些遗憾，在这之前我们错过了彼此，',
      '希望我们的故事可以从此刻开始……',
      '首先请让我为你介绍一下我自己',
    ],
  };
});

function getRank(per: string) {
  let rank = 3;
  if (per) {
    const num = per === '1' ? 1 : (1 - Number(per?.replace('%', ''))) * 100;
    const percentage = 100 - num;
    if (percentage <= 25) {
      rank = 0;
    } else if (25 < percentage && percentage <= 50) {
      rank = 1;
    } else if (50 < percentage && percentage <= 75) {
      rank = 2;
    } else if (75 < percentage) {
      rank = 3;
    }
  }
  return rank;
}
const rankMap: any = computed(() => {
  return [
    `<p class="level fade-time-3">Level1</p><p class="title fade-time-4">「卓越贡献家」</p>
    <p class="text fade-time-5">你时常贡献、深度参与<br />openGauss因为有你更卓越</p>
    <p class="tips fade-time-6">恭喜你，获得社区新年大礼包</p>`,

    `<p class="level fade-time-3">Level2</p><p class="title  fade-time-4">「非凡贡献者」</p>
    <p class="text  fade-time-5">你积极贡献，探索研究，<br />openGauss因为有你更璀璨</p>`,

    `<p class="level fade-time-3">Level3</p><p class="title  fade-time-4">「新知青年」</p>
    <p class="text  fade-time-5">你探索真理，分享智慧，<br />openGauss因为有你更有力量</p>`,

    `<p class="level fade-time-3">openGauss</p><p class="title fade-time-3">「萌新好友」</p>
    <p class="text  fade-time-5">你因好奇来到openGauss世界<br />留下点点痕迹<br />openGauss未来欢迎你</p>`,
  ];
});
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
async function getUserDataFun() {
  await getUserData().then((res) => {
    if (res.user) {
      params.value.user = res.user;
    }
  });
}
onMounted(async () => {
  // 必须先确定是否为贡献者
  // await getUserDataFun();
  // await getPosterDataFun();
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

function goStart() {
  const nextPage = isContributor.value ? '.pg-2' : '.pg-3';
  slide.scrollToElement(nextPage, 500, 0, 0);
  try {
    bgmOpen.value.classList.add('run-bgm');
    bgm.value?.play();
  } catch (error) {
    console.log(error);
  }
}

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
  <audio id="bgm" ref="bgm" src="/bgm/BGM_2021.mp3" preload="auto" loop></audio>
  <div ref="bgmOpen" class="bgm-open">
    <img class="closebgm" src="@/assets/close.svg" alt="" />
  </div>

  <div
    ref="wrapper"
    class="slide-wrapper"
    :class="screenWidth > 768 ? 'pc' : ''"
  >
    <div v-if="isContributor" class="slide-content contribution">
      <div
        class="slide-page wrapper-l pg-1"
        :class="currentPage === 0 ? 'current' : ''"
      >
        <div class="pg1-top">
          <p class="name">openGauss</p>
          <p class="title">2023年度贡献报告</p>
          <p>岁序更新，华章日新</p>
          <p>你在「openGauss」的点滴已全被铭记</p>
          <p>我们在星河绚烂的宇宙里，定格最特别的你</p>
        </div>
        <div class="pg1-buttom">
          <div class="go-start" @click.stop="goStart">
            <img src="@/assets/btn.png" />
          </div>
          <label class="authorize">
            <input type="checkbox" /> 我已阅读并同意用户授权协议
          </label>
        </div>
        <div class="slide-top">
          <img :src="arrowIcon" alt="" />
        </div>
      </div>
      <div
        class="slide-page wrapper-l pg-2"
        :class="currentPage === 1 ? 'current' : ''"
      >
        <div class="pg-2-main">
          <p
            v-for="(item, index) in posterContent.page1"
            :key="item.value"
            :class="`fade-time-${index + 1}`"
          >
            <!-- v-if="item.key"  调试去掉的 -->
            <span v-dompurify-html="item.value"></span>
          </p>
        </div>
        <div class="slide-top">
          <img :src="arrowIcon" alt="" />
        </div>
      </div>
      <div
        class="slide-page wrapper-l pg-3"
        :class="currentPage === 2 ? 'current' : ''"
      >
        <p
          v-for="(item, index) in posterContent.page2"
          :class="`fade-time-${index + 1}`"
          :key="item"
          v-dompurify-html="item"
        ></p>
        <div class="img-box">
          <p class="fade-time-1">
            <img src="@/assets/img1.png" class="img1" />
          </p>
          <p class="fade-time-5">
            <img src="@/assets/img7.png" class="img7" />
          </p>
          <p class="fade-time-3">
            <img src="@/assets/img2.png" class="img2" />
          </p>
        </div>
        <div class="slide-top">
          <img :src="arrowIcon" alt="" />
        </div>
      </div>
      <div
        class="slide-page wrapper-l pg-4"
        :class="currentPage === 3 ? 'current' : ''"
      >
        <p
          v-for="(item, index) in posterContent.page3"
          :key="item.value"
          :class="`fade-time-${index + 1}`"
        >
          <!-- v-if="item.key"  调试去掉的 -->
          <span v-dompurify-html="item.value"></span>
        </p>
        <div class="slide-top">
          <img :src="arrowIcon" alt="" />
        </div>
      </div>
      <div
        class="slide-page wrapper-l pg-5"
        :class="currentPage === 4 ? 'current' : ''"
      >
        <p
          v-for="(item, index) in posterContent.page4"
          :key="item.value"
          :class="`fade-time-${index + 1}`"
        >
          <!--  v-if="item.key" 调试去掉的 -->
          <span v-dompurify-html="item.value"></span>
        </p>
        <div class="slide-top">
          <img :src="arrowIcon" alt="" />
        </div>
      </div>
      <div
        class="slide-page wrapper-l pg-6"
        :class="currentPage === 5 ? 'current' : ''"
      >
        <p class="title fade-time-1">其实关于你的点滴「openGauss」全都记得</p>
        <p class="title fade-time-2">请点击生成你的2023年度标签</p>
        <div class="img-box">
          <div
            class="info"
            :class="getRank(posterData.count_rank) === 0 ? 'one' : ''"
            v-dompurify-html="rankMap[getRank(posterData.count_rank)]"
          ></div>
          <!-- <img src="@/assets/img3.png" class="img3" /> -->
          <img src="@/assets/img4.png" class="img4" />
          <p v-if="getRank(posterData.count_rank) === 0" class="fade-time-7">
            <a href="https://www.wjx.top/vm/ecgh5fs.aspx#" target="_blank"
              ><img src="@/assets/img5.png" class="img5"
            /></a>
          </p>
        </div>
        <div class="logo-box">
          <img src="@/assets/img6.png" class="img6" alt="" />
          <img src="@/assets/qrCode.png" class="qrCode" alt="" />
        </div>
      </div>
    </div>
    <div v-else class="slide-content no-contribution">
      <div
        class="slide-page wrapper-l pg-1"
        :class="currentPage === 0 ? 'current' : ''"
      >
        <div class="pg1-top">
          <p class="name">openGauss</p>
          <p class="title">2023年度贡献报告</p>
          <p>岁序更新，华章日新</p>
          <p>你在「openGauss」的点滴已全被铭记</p>
          <p>我们在星河绚烂的宇宙里，定格最特别的你</p>
        </div>
        <div class="pg1-buttom">
          <div class="go-start" @click.stop="goStart">
            <img src="@/assets/btn.png" />
          </div>
          <label class="authorize">
            <input type="checkbox" /> 我已阅读并同意用户授权协议
          </label>
        </div>
        <div class="slide-top">
          <img :src="arrowIcon" alt="" />
        </div>
      </div>
      <div
        class="slide-page wrapper-l pg-2"
        :class="currentPage === 1 ? 'current' : ''"
      >
        <div class="pg-2-main">
          <p
            v-for="(item, index) in posterContent.page5"
            :class="`fade-time-${index + 1}`"
            :key="item"
          >
            {{ item }}
          </p>
        </div>
        <div class="slide-top">
          <img :src="arrowIcon" alt="" />
        </div>
      </div>
      <div
        class="slide-page wrapper-l pg-3"
        :class="currentPage === 2 ? 'current' : ''"
      >
        <p
          v-for="(item, index) in posterContent.page2"
          :class="`fade-time-${index + 1}`"
          :key="item"
          v-dompurify-html="item"
        ></p>
        <div class="img-box">
          <p class="fade-time-1">
            <img src="@/assets/img1.png" class="img1" />
          </p>
          <p class="fade-time-5">
            <img src="@/assets/img7.png" class="img7" />
          </p>
          <p class="fade-time-3">
            <img src="@/assets/img2.png" class="img2" />
          </p>
        </div>
        <div class="slide-top">
          <img :src="arrowIcon" alt="" />
        </div>
      </div>
      <div
        class="slide-page wrapper-l pg-6"
        :class="currentPage === 3 ? 'current' : ''"
      >
        <p class="title fade-time-1">新年伊始，万事胜意</p>
        <p class="title fade-time-2">希望未来能够有你一起同行</p>
        <p class="title fade-time-3">openGauss祝你元旦快乐！</p>
        <div class="img-box">
          <img src="@/assets/img3.png" class="img3" />
          <img src="@/assets/img4.png" class="img4" />
          <img src="@/assets/qrCode.png" class="qrCode" alt="" />
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss">
$active: #bd72ff;
$bgTime: 0;
body {
  background: #7d32ea url('@/assets/bg.jpg') no-repeat bottom center/cover;
  height: 100%;
  @media screen and (max-width: 768px) {
    background: none;
  }
}
.active {
  display: inline-block;
  opacity: 0;
  color: $active;
  font-size: 16px;
  padding: 0 3px;
}

.bold {
  font-weight: 500;
}

.font-size-tip {
  font-size: 12px;
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
.slide-wrapper.pc {
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

.wrapper-l {
  padding: 40px;
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
  color: #fff;
  background-color: #471d9b;
  overflow: hidden;

  .slide-content {
    width: 100%;
    @media screen and (max-width: 768px) {
      width: 100vw;
    }
    overflow: hidden;

    .slide-page {
      width: 100%;
      height: 100%;
      @media screen and (max-width: 768px) {
        padding: 72px 12px;
        width: 100vw;
        height: 100vh;
      }
      position: relative;
      overflow: hidden;
      background-size: cover;
      text-align: center;
      font-size: 12px;
      line-height: 22px;
    }

    @for $i from 1 through 6 {
      .pg-#{ $i} {
        background-image: url('@/assets/bg#{$i}.jpg');
      }
    }

    .pg-1 {
      display: flex;
      flex-direction: column;
      justify-content: space-between;

      .pg1-top {
        .title {
          margin-bottom: 30px;
          font-size: 32px;
          text-shadow: 3px 0px 0px #300367;
          font-weight: bold;
        }

        .name {
          font-size: 18px;
          margin-bottom: 16px;
        }
      }

      .pg1-buttom {
        display: flex;
        align-items: center;
        flex-direction: column;

        .go-start {
          position: relative;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          margin: 16px auto;
          width: 4.4rem;
          img {
            width: 100%;
          }
        }
        .authorize {
          font-size: 12px;
          display: flex;
          align-items: center;

          input {
            width: 0.42rem;
            height: 0.42rem;
            margin-right: 0.04rem;
          }
        }
      }
    }

    .pg-2 {
      .fade-time-3 {
        margin-top: 16px;
      }
    }

    .pg-3 {
      position: relative;
      .fade-time-10 {
        margin-top: 16px;
      }
      p {
        position: relative;
        z-index: 2;
        line-height: 20px;
      }
      .img-box {
        position: absolute;
        top: 13.6rem;
        left: 50%;
        width: 4.92rem;
        height: 4.92rem;
        transform: translate(-50%);
        @media screen and (max-width: 768px) {
          top: 12.3rem;
        }
        .img1 {
          width: 4.92rem;
          position: absolute;
          top: 0;
          left: 0;
        }
        .img2 {
          width: 4.6rem;
          position: absolute;
          top: 0.1rem;
          left: 0.1rem;
          z-index: 3;
        }
        .img7 {
          width: 5.4rem;
          position: absolute;
          top: 0.1rem;
          left: -0.2rem;
          z-index: 2;
          animation-name: fade-toggle;
          animation-duration: 2s;
          animation-iteration-count: infinite;
          animation-timing-function: ease-in-out;
        }
      }
    }

    .pg-4 {
      .fade-time-3 {
        margin-top: 16px;
      }
    }

    .pg-5 {
      display: flex;
      flex-direction: column;

      .fade-time-4 {
        margin-top: 16px;
      }
    }
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
    .pg-6 {
      position: relative;

      .img-box {
        position: absolute;
        top: 7.8rem;
        height: 8.5rem;
        text-align: center;
        left: 0;
        width: 100%;
        img {
          left: 50%;
          transform: translate(-50%);
          position: absolute;
        }
        @media screen and (max-width: 768px) {
          top: 7rem;
          height: 8.2rem;
        }
        .img3 {
          width: 5.92rem;
          top: 0;
        }
        .img4 {
          width: 6.77rem;
          bottom: 0;
        }
        .img5 {
          width: 3.81rem;
          bottom: 0;
        }
        .qrCode {
          width: 3.2rem;
          z-index: 3;
          bottom: 1rem;
        }
      }
      .info {
        padding: 1rem 0;
        &.one {
          padding: 0.3rem 0;
        }

        .title {
          font-size: 20px;
          text-shadow: 2px 0px 0px #300367;
          margin: 0.1rem 0 0.4rem;
        }
        .tips {
          margin-top: 1rem;
        }
      }
    }
  }
}

// ipad 适配
@media screen and (min-width: 768px) {
  html {
    font-size: 110px !important;
  }
}

p {
  opacity: 0;
}

.current {
  p {
    animation: fade 0.8s ease-in-out forwards;

    .active {
      animation: slide-top 0.8s ease-in-out forwards;
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

  .pg-3-bottom {
    animation-duration: 0.8s;
    animation-name: fade;
    animation-fill-mode: forwards;
  }
}

// .current.slide-page {
//   animation: zoomin 5s linear forwards;
// }
// .slide-page {
//   background-position: 100% center;
// }

@keyframes fade {
  100% {
    opacity: 1;
  }
}
@keyframes fade-toggle {
  0% {
    opacity: 0;
  }
  50% {
    opacity: 1;
  }
  100% {
    opacity: 0;
  }
}

@keyframes halo {
  0% {
    transform: scale(1);
  }

  100% {
    transform: scale(0.81);
  }
}

@keyframes slide-top {
  0% {
    opacity: 0;
    transform: translateY(10px);
  }

  100% {
    opacity: 1;
    transform: translateY(0px);
  }
}

.logo-box {
  position: absolute;
  bottom: 1rem;
  left: 0;
  width: 100%;
  text-align: center;
  .img6 {
    width: 5.95rem;
    display: block;
    margin: 0 auto 0.3rem;
  }
  .qrCode {
    width: 3.2rem;
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
