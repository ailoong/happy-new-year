<script setup lang="ts">
import { onMounted, ref, onUnmounted, computed, watch } from 'vue';
import useWindowResize from 'shared/hooks/useWindowResize';

import BScroll from '@better-scroll/core';
import { BScrollInstance } from '@better-scroll/core';
import Slide from '@better-scroll/slide';

import { getPosterData, getUserData } from 'shared/api';

import database from '@/assets/database.png';
import mobile from '@/assets/mobile .png';
import notebook from '@/assets/notebook.png';
import desktop from '@/assets/desktop.png';
import QRcode_zh from '@/assets/QRcode.png';
import handAi from '@/assets/hand-ai.png';
import handMan from '@/assets/hand-man.png';
import hexagon from '@/assets/hexagon.png';

const lang = ref('zh');
const screenWidth = useWindowResize();
getUserData();
watch(
  () => window.location.href,
  (val) => {
    lang.value = val.includes('/zh/') ? 'zh' : 'en';
  },
  { immediate: true }
);
const params = ref({
  community: 'opengauss',
  user: 'zhongjun2' || 'liyang0608',
  year: '2022',
});

const pageCentent: any = computed(() => {
  return {
    zh: {
      page2: {
        text: [
          `今天是openEuler的三周年庆典！`,
          `感谢你的一路相陪`,
          `在这三年的时光里，`,
          `openEuler在茁壮地成长：`,
          `社区用户<span class="active">${posterData.value.comment_num}+；</span>`,
          `社区PR数<span class="active">${posterData.value.comment_num}k；</span>`,
          `社区贡献者<span class="active">${posterData.value.comment_num}+；</span>`,
          `商用OSV<span class="active">${posterData.value.comment_num}家；</span>`,
          `企业成员<span class="active">${posterData.value.comment_num}家；</span>`,
          '......',
        ],
      },
      page3: {
        text: [
          `正是因为有许多像您这样的优秀贡献者不断参加贡献`,
          `openEuler社区才能发展得这么快`,
          `在今天这个特殊的日子里`,
          `请跟openEuler一起启动时光机`,
          `回望过去一年在openEuler社区的点滴`,
          `解锁一场时空穿越之旅`,
        ],
        bottomText: ['扫码查看', 'openEuler与你的独家记忆'],
        img: QRcode_zh,
      },
      page4: {
        text: [
          {
            value: `Hi ${params.value.user}，我们在一起2年啦！ `,
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
              posterData.value.first_time_of_enter
            )}，</span> <br> 你与社区中的${
              posterData.value.user_login_with_most_contact
            }第一次建立连接；`,
            key: posterData.value.user_login_with_most_contact,
          },
          {
            value: `<span class="active">${changeTime(
              posterData.value.first_time_of_enter
            )}，</span> <br>你第一次在社区中评论了${
              posterData.value.user_login_with_most_contact
            }；  `,
            key: posterData.value.user_login_with_most_contact,
          },
          {
            value: `<span class="active">${changeTime(
              posterData.value.first_time_of_enter
            )}，</span> <br> ${
              posterData.value.user_login_with_most_contact
            }第一个给了你温暖的评论；`,
            key: posterData.value.user_login_with_most_contact,
          },
          {
            value: `初来乍到，${posterData.value.user_login_with_most_contact}第一个解决了你的问题；`,
            key: posterData.value.user_login_with_most_contact,
          },
          {
            value: `回忆满满，你与${posterData.value.user_login_with_most_contact}联系最多`,
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
      },
      page5: {
        text: [
          {
            value: `回首2022， `,
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
      },
      page6: {
        text: [
          '在这一年里',
          `你的贡献度击败了社区 <span class="active">${posterData.value.count_rank}</span>`,
          `<span class="active bold">恭喜你获得</span>`,
        ],
      },
      page7: {
        text: [
          '你们从不同途径来到我的开源世界',
          '但却因相同的目的留了下来',
          '谢谢你们的坚持与贡献',
          '才打造出我更好的模样',
          '期待你我携手并肩，继续坚定前行！',
          '一起度过下一个周年庆！',
          'openEuler 社区呈上',
        ],
      },
    },
    en: {
      page2: {
        text: [
          `Today marks my 3rd anniversary!`,
          `I'm so grateful that you've joined me on this journey`,
          `Over the past three years, we've accomplished so much:`,
          `<span class="active">${posterData.value.comment_num}+ users</span>`,
          `<span class="active">${posterData.value.comment_num}+ PRs</span>`,
          `<span class="active">${posterData.value.comment_num}+ contributors</span>`,
          `<span class="active">${posterData.value.comment_num} commercial OSVs</span>`,
          `<span class="active">${posterData.value.comment_num}+ enterprise members</span>`,
          'And more...',
        ],
      },
      page3: {
        text: [
          `And it's only because of outstanding contributors `,
          `like you that I've been able to grow and flourish. `,
          `Let's take a trip down memory lane, `,
          `as we look at some of the highlights from the past year.`,
        ],
        bottomText: [
          'Scan the QR code',
          'to see your own openEuler milestones.',
        ],
        img: QRcode_zh,
      },
      page4: {
        text: [
          {
            value: `Hi ${params.value.user},`,
            key: posterData.value.user_login,
          },
          {
            value: `Can you believe it's been ${1} year since we first met?`,
            key: posterData.value.first_time_of_enter,
          },
          {
            value: `<span class="active">On ${changeTime(
              posterData.value.first_time_of_enter
            )},</span> <br> you took your first steps by visiting my homepage.`,
            key: posterData.value.first_time_of_enter,
          },
          {
            value: `<span class="active">On ${changeTime(
              posterData.value.first_time_of_enter
            )},</span> <br> you made your first connection with ${
              posterData.value.user_login_with_most_contact
            } in the community.`,
            key: posterData.value.first_time_of_enter,
          },
          {
            value: `<span class="active">On ${changeTime(
              posterData.value.first_time_of_enter
            )},</span> <br> you first commented on ${
              posterData.value.first_time_of_enter
            }'s post.`,
            key: posterData.value.first_commented_of_enter,
          },
          {
            value: `<span class="active">On ${changeTime(
              posterData.value.first_time_of_enter
            )},</span> <br> you received the first comment from ${
              posterData.value.user_login_with_most_contact
            }`,
            key: posterData.value.first_commented_of_enter,
          },
          {
            value: `As a newcomer, you got your first issue reply from ${posterData.value.user_login_with_most_contact}`,
            key: posterData.value.user_login_with_most_contact,
          },
          {
            value:
              'These are memories of our time together that will always be cherished.',
            key: true,
          },
        ],
      },
      page5: {
        text: [
          {
            value: `The openEuler community grew rapidly in 2022, `,
            key: true,
          },
          {
            value: `and you have been at the center of it all.`,
            key: true,
          },
          {
            value: `The openEuler community grew rapidly in 2022,`,
            key: true,
          },
          {
            value: `you submitted <span class="active">${
              posterData.value?.pr_num
            }</span> pr${posterData.value?.pr_num !== '1' ? 's' : ''}`,
            key: posterData.value.pr_num,
          },
          {
            value: `raised  <span class="active">${
              posterData.value?.issue_num
            }</span> issue${posterData.value?.issue_num !== '1' ? 's' : ''}`,
            key: posterData.value.issue_num,
          },
          {
            value: `left  <span class="active">${
              posterData.value?.comment_num
            }</span> comment${
              posterData.value?.comment_num !== '1' ? 's' : ''
            }`,
            key: posterData.value.comment_num,
          },
          {
            value: `contributed <span class="active">${posterData.value?.code_lines_add}</span> lines of code`,
            key: posterData.value.code_lines_add,
          },
          {
            value: `joined  <span class="active">${
              posterData.value?.sig_num
            }</span> SIG${posterData.value?.sig_num !== '1' ? 's' : ''}`,
            key: posterData.value.sig_num,
          },
          {
            value: `forked  <span class="active">${
              posterData.value?.fork_num
            }</span> repo${posterData.value?.fork_num !== '1' ? 's' : ''}`,
            key: posterData.value.fork_num,
          },
        ],
      },
      page6: {
        text: [
          `Your contributions place you ahead of <span class="active">${posterData.value.count_rank}</span>`,
          `<span class="active bold">Congratulations</span>`,
        ],
      },
      page7: {
        text: [
          'Thank you for exploring and contributing to my open source world.',
          'Your contributions have helped make me who I am today. ',
          'I look forward to celebrating many more anniversaries together!',
          'Best wishes,',
          'openEuler',
        ],
      },
    },
  };
});

const wrapper = ref<HTMLElement | null>(null);

BScroll.use(Slide);
const isContributor = ref(false);
const posterData: any = ref({
  test: 1,
});

async function getPosterDataFun() {
  await getPosterData(params.value).then((res) => {
    if (res.code === 200 && res.data.length) {
      isContributor.value = true;
      posterData.value = res.data[0];
    } else {
      isContributor.value = false;
    }
  });
}

let slide: BScrollInstance;
const currentPage = ref(0);
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
function getRank(per: any) {
  const percentage = Number(per?.replace('%', ''));
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
const rankMap: any = ref({
  zh: ['初出茅庐', '牛刀小试', '崭露头角', '达人现身', '百炼成师'],
  en: [
    'Emerging Talent',
    'Novice Contributor',
    'Rising Star',
    'Expert Developer',
    'openEuler Guru',
  ],
});
onMounted(async () => {
  // 必须先确定是否为贡献者
  await getPosterDataFun();
  pcClick();
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
onUnmounted(() => {
  if (slide) {
    slide.destroy();
  }
});
</script>

<template>
  <div
    v-if="screenWidth > 1200"
    class="pc-post"
    :class="lang === 'zh' ? 'pc-zh' : 'pc-en'"
    @click="pcClick"
  >
    <div v-if="isContributor" class="contribution none">
      <div class="container box-1">
        <div class="front">
          <div class="slide-page pg-3 current">
            <div class="pc-top">
              <div class="text"></div>
            </div>
            <div class="img-box">
              <img :src="handAi" class="hand-ai" alt="" />
              <img :src="handMan" class="hand-man" alt="" />
              <img :src="hexagon" class="hexagon" alt="" />
              <div class="hexagon-box">
                <img src="@/assets/hexagon-2.png" class="hexagon-2" alt="" />
                <img src="@/assets/hexagon-3.png" class="hexagon-3" alt="" />
                <img src="@/assets/glow.png" class="glow" alt="" />
              </div>
            </div>
          </div>
        </div>
        <div class="back">
          <div class="pg-2 contents current">
            <div class="pg-2-main">
              <div class="user">
                <p class="blod active user">
                  Dear <br />
                  {{ params.user }}
                </p>
              </div>
              <div class="main-text margin-top-h4">
                <p
                  v-for="(item, index) in pageCentent[lang].page2.text"
                  :key="item"
                  :class="`fade-time-${index + 1}`"
                  v-html="item"
                ></p>
              </div>
              <div class="img-box">
                <img :src="database" class="database" alt="" />
                <img :src="mobile" class="mobile" alt="" />
                <img :src="notebook" class="notebook" alt="" />
                <img :src="desktop" class="desktop" alt="" />
                <img src="@/assets/feather-1.png" class="feather-1" alt="" />
                <img src="@/assets/feather-2.png" class="feather-2" alt="" />
                <img src="@/assets/feather-3.png" class="feather-3" alt="" />
                <img src="@/assets/feather-4.png" class="feather-4" alt="" />
                <img src="@/assets/feather-5.png" class="feather-5" alt="" />
                <img src="@/assets/feather-6.png" class="feather-6" alt="" />
                <img src="@/assets/feather-7.png" class="feather-7" alt="" />
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="container box-2">
        <div class="front">
          <div class="slide-page pg-3 current">
            <div class="pc-top">
              <div class="text"></div>
            </div>
            <div class="img-box">
              <img :src="handAi" class="hand-ai" alt="" />
              <img :src="handMan" class="hand-man" alt="" />
              <img :src="hexagon" class="hexagon" alt="" />
              <div class="hexagon-box">
                <img src="@/assets/hexagon-2.png" class="hexagon-2" alt="" />
                <img src="@/assets/hexagon-3.png" class="hexagon-3" alt="" />
                <img src="@/assets/glow.png" class="glow" alt="" />
              </div>
            </div>
          </div>
        </div>
        <div class="back">
          <div class="contents"></div>
        </div>
      </div>
      <div class="container box-3">
        <div class="front">
          <div class="slide-page pg-3 current">
            <div class="pc-top">
              <div class="text"></div>
            </div>
            <div class="img-box">
              <img :src="handAi" class="hand-ai" alt="" />
              <img :src="handMan" class="hand-man" alt="" />
              <img :src="hexagon" class="hexagon" alt="" />
              <div class="hexagon-box">
                <img src="@/assets/hexagon-2.png" class="hexagon-2" alt="" />
                <img src="@/assets/hexagon-3.png" class="hexagon-3" alt="" />
                <img src="@/assets/glow.png" class="glow" alt="" />
              </div>
            </div>
          </div>
        </div>
        <div class="back">
          <div class="contents"></div>
        </div>
      </div>
      <div class="container box-4">
        <div class="front">
          <div class="slide-page pg-3 current">
            <div class="pc-top">
              <div class="text"></div>
            </div>
            <div class="img-box">
              <img :src="handAi" class="hand-ai" alt="" />
              <img :src="handMan" class="hand-man" alt="" />
              <img :src="hexagon" class="hexagon" alt="" />
              <div class="hexagon-box">
                <img src="@/assets/hexagon-2.png" class="hexagon-2" alt="" />
                <img src="@/assets/hexagon-3.png" class="hexagon-3" alt="" />
                <img src="@/assets/glow.png" class="glow" alt="" />
              </div>
            </div>
          </div>
        </div>
        <div class="back">
          <div class="contents"></div>
        </div>
      </div>
    </div>
    <div v-else class="no-contribution">
      <div class="container box-1">
        <div class="front"></div>
        <div class="back"></div>
      </div>
      <div class="container box-2">
        <div class="front"></div>
        <div class="back"></div>
      </div>
    </div>
  </div>

  <div v-else ref="wrapper" class="slide-wrapper">
    <div v-if="isContributor" class="slide-content contribution">
      <div class="slide-page pg-1" :class="currentPage === 0 ? 'current' : ''">
        <div class="pg1-top margin-top-h1">
          Celebrating 3 years of openEuler
        </div>
        <div class="pg1-bottom">
          <img :src="database" class="database" alt="" />
          <img :src="mobile" class="mobile" alt="" />
          <img :src="notebook" class="notebook" alt="" />
          <img :src="desktop" class="desktop" alt="" />
          <img src="@/assets/pg-1-mo.png" class="pg-1-mo" alt="" />
          <img src="@/assets/fire-1.png" class="fire-1" alt="" />
          <img src="@/assets/fire-2.png" class="fire-2" alt="" />
          <img src="@/assets/fire-3.png" class="fire-3" alt="" />
        </div>
      </div>
      <div class="slide-page pg-2" :class="currentPage === 1 ? 'current' : ''">
        <div class="pg-2-main">
          <div class="user">
            <p class="blod active user">
              Dear <br />
              {{ params.user }}
            </p>
          </div>
          <div class="main-text margin-top-h4">
            <p
              v-for="(item, index) in pageCentent[lang].page2.text"
              :key="item"
              :class="`fade-time-${index + 1}`"
              v-html="item"
            ></p>
          </div>
        </div>
        <div class="img-box">
          <img :src="database" class="database" alt="" />
          <img :src="mobile" class="mobile" alt="" />
          <img :src="notebook" class="notebook" alt="" />
          <img :src="desktop" class="desktop" alt="" />
          <img src="@/assets/feather-1.png" class="feather-1" alt="" />
          <img src="@/assets/feather-2.png" class="feather-2" alt="" />
          <img src="@/assets/feather-3.png" class="feather-3" alt="" />
          <img src="@/assets/feather-4.png" class="feather-4" alt="" />
          <img src="@/assets/feather-5.png" class="feather-5" alt="" />
          <img src="@/assets/feather-6.png" class="feather-6" alt="" />
          <img src="@/assets/feather-7.png" class="feather-7" alt="" />
        </div>
      </div>
      <div class="slide-page pg-3" :class="currentPage === 2 ? 'current' : ''">
        <div class="pg-3-main">
          <div class="main-text">
            <p v-for="item in pageCentent[lang].page3.text" :key="item">
              {{ item }}
            </p>
          </div>
          <div class="bottom-scan margin-top-h4 bold">
            <p v-for="item in pageCentent[lang].page3.bottomText" :key="item">
              {{ item }}
            </p>
            <div class="qr-box margin-top-h5">
              <img :src="pageCentent[lang].page3.img" alt="" />
            </div>
          </div>
        </div>
        <div class="img-box">
          <img :src="handAi" class="hand-ai" alt="" />
          <img :src="handMan" class="hand-man" alt="" />
          <img :src="hexagon" class="hexagon" alt="" />
          <div class="hexagon-box">
            <img src="@/assets/hexagon-2.png" class="hexagon-2" alt="" />
            <img src="@/assets/hexagon-3.png" class="hexagon-3" alt="" />
            <img src="@/assets/glow.png" class="glow" alt="" />
          </div>
        </div>
      </div>
      <div class="slide-page pg-4" :class="currentPage === 3 ? 'current' : ''">
        <div class="pg-4-main">
          <div class="main-text">
            <p
              v-for="(item, index) in pageCentent[lang].page4.text"
              :key="item.value"
              :class="`fade-time-${index + 1}`"
            >
              <span v-if="item.key" v-html="item.value"></span>
            </p>
          </div>
        </div>
        <div class="img-box"></div>
      </div>
      <div class="slide-page pg-5" :class="currentPage === 4 ? 'current' : ''">
        <div class="pg-5-main">
          <div class="main-text">
            <p
              v-for="(item, index) in pageCentent[lang].page5.text"
              :key="item.value"
              :class="`fade-time-${index}`"
            >
              <span
                v-if="item.key && item.key !== '0'"
                v-html="item.value"
              ></span>
            </p>
          </div>
        </div>
        <div class="img-box"></div>
      </div>
      <div class="slide-page pg-6" :class="currentPage === 5 ? 'current' : ''">
        <div class="pg-6-top">
          <p
            v-for="item in pageCentent[lang].page6.text"
            :key="item"
            v-html="item"
          ></p>
          <p
            :class="[
              `color-${getRank(posterData.count_rank) + 1}`,
              lang !== 'zh' ? 'rank' : '',
            ]"
          >
            {{ rankMap[lang][getRank(posterData.count_rank)] }}
          </p>
        </div>
        <div class="pg-6-main">
          <img class="round" src="@/assets/bg-6.png" alt="" />
          <img class="light" src="@/assets/pg-6-light.png" alt="" />
          <div class="circle"></div>
        </div>
        <div class="pg-6-bottom"></div>
      </div>
      <div class="slide-page pg-7" :class="currentPage === 6 ? 'current' : ''">
        <div class="pg-7-top">
          <p v-for="item in pageCentent[lang].page7.text" :key="item">
            {{ item }}
          </p>
        </div>
        <div class="pg-7-logo">
          <img src="@/assets/logo.png" alt="" />
        </div>
      </div>
    </div>
    <div v-else class="slide-content no-contribution">
      <div class="slide-page pg-1" :class="currentPage === 0 ? 'current' : ''">
        <div class="pg1-top">
          <p class="title">2022年度贡献报告</p>
          <p>你的点滴 【openGauss】全都记得......</p>
        </div>
        <div class="pg1-buttom">
          <p class="fade-time-1">又是一年</p>
          <p class="fade-time-2">我们穿过时间的缝隙</p>
          <p class="fade-time-3">定格最特别的你</p>
          <div class="go-start" @click.stop="">
            <span>生成</span> <span>报告</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss">
$active: #002fa7;
$lang: v-bind('lang');
$spacings: 62 40 32 24 16 12 10 8 6 4;
$rankColors: #ffff83 #0d8dff #6e1be8 #0d7567 #b54f00;
.active {
  display: inline-block;
  opacity: 0;
  color: $active;
}
.bold {
  font-weight: 700;
}

@each $spacing in $spacings {
  $i: index($spacings, $spacing);
  .margin-top-h#{$i} {
    margin-top: #{$spacing}px;
  }
}
@each $color in $rankColors {
  $i: index($rankColors, $color);
  .color-#{$i} {
    color: #{$color};
  }
}
@for $i from 2 through 7 {
  .pg-#{ $i} {
    background-image: url('@/assets/bg-#{$i}.png');
  }
}
#app {
  width: 100vw;
  height: 100vh;
}

.slide-wrapper {
  width: 100vw;
  height: 100vh;
  position: relative;
  overflow: hidden;
  .slide-content {
    width: 100vw;
    background-color: $active;
    color: #fff;
    font-family: FZLTHJW--GB1-0;
    .slide-page {
      display: flex;
      padding: 0 12px;
      flex-direction: column;
      align-items: center;
      width: 100vw;
      height: 100vh;
      overflow: hidden;
      text-align: center;
      background-repeat: no-repeat;
      background-size: 100% 100%;
    }
    .pg-1 {
      display: flex;
      flex-direction: column;
      align-items: center;
      padding: 0 32px;
      .pg1-top {
        width: 230px;
        font-size: 20px;
        font-family: Milky-Han-Term-CN-Heavy-Italic, Milky-Han-Term-CN-Heavy;
        line-height: 32px;
        text-align: center;
      }
      .pg1-bottom {
        position: relative;
        width: 100%;
        height: 100%;
        > img {
          position: absolute;
        }
        .desktop {
          left: 80px;
          top: 20px;
          width: 48px;
          animation: desktop 10s infinite linear alternate;
          z-index: 10;
        }
        .mobile {
          top: 85px;
          right: 12px;
          width: 82px;
          animation: desktop 15s infinite linear alternate;
          z-index: 10;
        }
        .notebook {
          top: 144px;
          left: 38px;
          width: 86px;
          animation: desktop 20s infinite linear alternate;
          z-index: 10;
        }
        .database {
          top: 212px;
          right: 20px;
          width: 90px;
          animation: desktop 20s infinite linear alternate;
          z-index: 10;
        }
        .pg-1-mo {
          left: calc(50% + 30px);
          transform: translateX(-50%);
          bottom: 24px;
          width: 254px;
        }
        .fire-1 {
          opacity: 0;
          left: calc(50%);
          transform: translateX(-50%);
          width: 266px;
          bottom: 60px;
          z-index: 3;
        }
        .fire-2 {
          opacity: 0;
          left: calc(50%);
          transform: translateX(-50%);
          width: 266px;
          bottom: 60px;
          z-index: 2;
        }
        .fire-3 {
          opacity: 0;
          left: calc(50%);
          transform: translateX(-50%);
          width: 266px;
          bottom: 60px;
          z-index: 1;
        }
      }
    }
    .pg-2 {
      position: relative;
      display: flex;
      padding: 90px 80px;
      align-items: center;
      flex-direction: column;
      .pg-2-main {
        display: flex;
        flex-direction: column;
        align-items: center;
        max-width: 210px;
        width: 100%;
        text-align: center;
        padding: 0 12px;
        color: #000;
        z-index: 10;
        .active {
          padding: 0 2px;
          font-size: 16px;
          font-weight: 700;
          color: #406ef7;
        }
        .user {
          color: #002fa7;
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
      .feather-1,
      .feather-2,
      .feather-3,
      .feather-4,
      .feather-5,
      .feather-6,
      .feather-7 {
        opacity: 0;
        z-index: 0;
      }
      .feather-1 {
        left: 0;
        top: 0;
        width: 120px;
      }
      .feather-2 {
        right: 0;
        top: 0;
        width: 126px;
      }
      .feather-3 {
        right: 0;
        top: 140px;
        width: 103px;
      }
      .feather-4 {
        right: 0;
        bottom: 133px;
        width: 103px;
      }
      .feather-5 {
        right: 0;
        bottom: 60px;
        width: 145px;
      }
      .feather-6 {
        left: 0;
        bottom: 45px;
        width: 193px;
      }
      .feather-7 {
        left: 0;
        bottom: 55px;
        width: 138px;
      }
    }
    .pg-3 {
      position: relative;
      padding: 40px 12px 0;
      background-size: 100% auto;
      .main-text {
        font-size: 12px;
        line-height: 24px;
        text-align: center;
      }
      .bottom-scan {
        line-height: 24px;
        font-size: 14px;
        font-family: 'PangMenZhengDao';
        .qr-box {
          display: inline-block;
          padding: 8px;
          border: 1px solid rgba($color: #fff, $alpha: 0.7);
          background-color: rgba(0, 47, 167, 0.7);
          img {
            width: 95px;
          }
        }
      }
      .img-box {
        img {
          bottom: 0;
          position: absolute;
        }
        .hand-ai {
          opacity: 0;
          right: 0;
          width: calc(50% - 3px);
          z-index: -1;
        }
        .hand-man {
          opacity: 0;
          display: inline-block;
          left: 0;
          width: calc(50% - 3px);
        }
        .hexagon-box {
          position: absolute;
          height: 188px;
          left: 50%;
          bottom: 50px;
          transform: translateX(-50%);
          width: 163px;
          z-index: -1;
          > img {
            left: 50%;
            top: 50%;
            transform: translate(-50%, -50%);
          }
          .glow {
            transform: translate(-50%, -50%) scale(0);
          }
        }
        .hexagon {
          left: 50%;
          bottom: 50px;
          transform: translateX(-50%);
          width: 163px;
          z-index: -1;
        }
        .hexagon-2 {
          width: 80px;
        }
        .hexagon-3 {
          width: 33px;
        }
      }
    }
    .pg-4 {
      padding: 60px 44px;
      background-position: bottom;
      background-size: cover;
      .pg-4-main {
        font-size: 12px;
        line-height: 24px;
        .active {
          font-weight: 700;
          font-size: 14px;
          color: #feb32a;
        }
      }
    }
    .pg-5 {
      background-position: top;
      background-size: cover;
      justify-content: center;
      .pg-5-main {
        padding: 24px 75px;
        border: 1px solid #fff;
        font-size: 12px;
        line-height: 24px;
        .active {
          padding: 0 2px;
          font-size: 14px;
          font-weight: 700;
          color: #feb32a;
        }
      }
    }
    .pg-6 {
      position: relative;
      background-image: none;
      background-size: 200px;
      background-position: center 245px;
      background-color: rgb(0, 62, 214);
      .pg-6-top {
        position: relative;
        padding: 50px 0 0;
        line-height: 24px;
        font-weight: 700;
        color: #000;
        font-size: 14px;
        width: 100%;
        max-width: 360px;
        height: 100%;
        max-height: 444px;
        background-size: 100% auto;
        background-repeat: no-repeat;
        background-image: url('@/assets/bg-6-light.png');
        z-index: 9;
        .active {
          color: #406ef7;
        }
        p:last-child {
          position: absolute;
          left: 50%;
          transform: translateX(-50%);
          bottom: 150px;
          margin-top: 24px;
          font-family: PangMenZhengDao;
          font-size: 40px;
          line-height: 46px;
        }
        .rank {
          bottom: 120px !important;
        }
      }
      .pg-6-main {
        position: relative;
        margin-top: -170px;
        width: 360px;
        .round {
          position: relative;
          width: 100%;
          z-index: 0;
        }
        .light {
          width: 30px;
          left: 50%;
          top: calc(50% + 5px);
          transform: translate(-50%, -50%);
          bottom: 0;
          position: absolute;
          z-index: 10;
        }
        .circle {
          position: absolute;
          left: 50%;
          top: calc(50% + 30px);
          transform: translate(-50%, -50%);
          width: 102px;
          height: 102px;
          border-radius: 50%;
          background-color: rgba($color: #a6cbfe, $alpha: 0.6);
          animation: halo2 1.5s 0.5s ease-in-out infinite alternate;
          &::before {
            position: absolute;
            content: '';
            left: 50%;
            top: 50%;
            transform: translate(-50%, -50%);
            width: 50%;
            height: 50%;
            border-radius: 50%;
            animation: halo3 1.5s 0.5s ease-in-out infinite alternate;
            background-color: #a6cbfe;
          }
        }
      }
      .pg-6-bottom {
        top: 500px;
        height: 120px;
        position: absolute;
        width: 100%;
        background-position: center;
        background-size: 360px 100%;
        background-repeat: no-repeat;
        background-image: url('@/assets/bg-6-bottom.png');
      }
    }
    .pg-7 {
      padding-top: 52px;
      font-size: 12px;
      line-height: 24px;
      color: #000;
      .pg-7-logo {
        margin-top: 40px;
        width: 82px;
        img {
          width: 100%;
        }
      }
    }
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
  .feather-1,
  .feather-2,
  .feather-3,
  .feather-4,
  .feather-5,
  .feather-6,
  .feather-7 {
    animation: fade 0.8s 0.5s ease-in-out forwards;
  }
  .fire-1 {
    animation: fade 0.8s 1.5s ease-in-out forwards;
  }
  .fire-2 {
    animation: fade 0.8s 1s ease-in-out forwards;
  }
  .fire-3 {
    animation: fade 0.8s 0.5s ease-in-out forwards;
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
}
// ipad 适配
@media screen and (min-width: 768px) {
  html {
    font-size: 110px !important;
  }
}
@keyframes desktop {
  20% {
    transform: translate(-20px, -10px);
  }

  50% {
    transform: translate(-50px, -30px);
  }

  70% {
    transform: translate(-70px, -10px);
  }

  100% {
    transform: translate(-20px, -10px);
  }
}
@keyframes fade {
  100% {
    opacity: 1;
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
@keyframes halo1 {
  0% {
    transform: translate(-50%, -50%) scale(0.1);
  }
  100% {
    transform: translate(-50%, -50%) scale(1);
  }
}
@keyframes halo2 {
  0% {
    opacity: 0.5;
    transform: translate(-50%, -50%) scale(0.8);
  }
  100% {
    opacity: 1;
    transform: translate(-50%, -50%) scale(1.1);
  }
}
@keyframes halo3 {
  0% {
    opacity: 0.5;
    transform: translate(-50%, -50%) scale(0.8);
  }
  100% {
    opacity: 1;
    transform: translate(-50%, -50%) scale(1.2);
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
}
.pc-en {
  @for $i from 1 through 4 {
    .box-#{ $i} {
      .pc-top {
        .text {
          background-image: url('@/assets/pc-bg-#{$i}-en.png');
        }
      }
    }
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
  .pg-3 {
    width: 100%;
    height: 100%;
    background-size: 100% auto;
    .pc-top {
      max-height: 320px;
      height: 100%;
      background-position: 0 -50px;
      background-repeat: no-repeat;
      background-size: 100% 100%;
      background-image: url('@/assets/pc-bg.png');
    }
    .img-box {
      img {
        bottom: 0;
        position: absolute;
      }
      .hand-ai {
        opacity: 0;
        right: 0;
        width: calc(50% - 3px);
        z-index: -1;
      }
      .hand-man {
        opacity: 0;
        display: inline-block;
        left: 0;
        width: calc(50% - 3px);
      }
      .hexagon-box {
        position: absolute;
        height: 188px;
        left: 50%;
        bottom: 50px;
        transform: translateX(-50%);
        width: 163px;
        z-index: -1;
        > img {
          left: 50%;
          top: 50%;
          transform: translate(-50%, -50%);
        }
        .glow {
          transform: translate(-50%, -50%) scale(0);
        }
      }
      .hexagon {
        left: 50%;
        bottom: 50px;
        transform: translateX(-50%);
        width: 163px;
        z-index: -1;
      }
      .hexagon-2 {
        width: 80px;
      }
      .hexagon-3 {
        width: 33px;
      }
    }
  }
  .pg-2 {
    position: relative;
    display: flex;
    padding: 90px 80px;
    align-items: center;
    flex-direction: column;
    z-index: 5;
    .pg-2-main {
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
        color: #406ef7;
      }
      .user {
        color: #002fa7;
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
    .feather-1,
    .feather-2,
    .feather-3,
    .feather-4,
    .feather-5,
    .feather-6,
    .feather-7 {
      opacity: 0;
      z-index: 0;
    }
    .feather-1 {
      left: 0;
      top: 0;
      width: 120px;
    }
    .feather-2 {
      right: 0;
      top: 0;
      width: 126px;
    }
    .feather-3 {
      right: 0;
      top: 140px;
      width: 103px;
    }
    .feather-4 {
      right: 0;
      bottom: 133px;
      width: 103px;
    }
    .feather-5 {
      right: 0;
      bottom: 60px;
      width: 145px;
    }
    .feather-6 {
      left: 0;
      bottom: 45px;
      width: 193px;
    }
    .feather-7 {
      left: 0;
      bottom: 55px;
      width: 138px;
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
    background-color: rgb(0, 47, 156);
    z-index: 10;
    background-position: -6px -2px;
    background-repeat: no-repeat;
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
      margin-top: 62px;
      width: 106px;
      height: 87px;
      background-position: center center;
      background-size: 106px 87px;
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
    background-color: rgb(0, 47, 156);
    transform: translateZ(60px);
    background-size: 100% 100%;
  }
  .contents .page {
    position: relative;
    width: 100%;
    height: 100%;
    overflow: hidden;
  }
}
</style>
