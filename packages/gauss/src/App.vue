<script setup lang="ts">
import { onMounted, ref, onUnmounted, computed } from 'vue';
import useWindowResize from 'shared/hooks/useWindowResize';

import BScroll from '@better-scroll/core';
import { BScrollInstance } from '@better-scroll/core';
import Slide from '@better-scroll/slide';

import { getPosterData, getUserData } from 'shared/api';

const screenWidth = useWindowResize();
const params = ref({
  community: 'opengauss',
  user: '',
  year: '2022',
});

const wrapper = ref<HTMLElement | null>(null);

BScroll.use(Slide);
const isContributor = ref(false);
const posterData: any = ref({});
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
    page3: {
      text: [
        {
          value: `这一年，你与<span class='active'>${posterData.value.user_login_with_most_contact}</span>人建立了联系`,
          key: posterData.value.user_login_with_most_contact,
        },
        {
          value: `<span class='active'>${posterData.value.contact_users_num}</span>，一定很特别，你们沟通最多`,
          key: posterData.value.contact_users_num,
        },
        {
          value: `相信一定是志同道合的伙伴`,
          key: posterData.value.contact_users_num,
        },
      ],
    },
    page4: {
      text: [
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
          value: `你对某行代码的好奇与关注`,
          key: true,
        },
        {
          value: `对某个问题的存疑亦或是认可`,
          key: true,
        },
        {
          value: `都代表了「你」看待这个数字世界的独特视角`,
          key: true,
        },
      ],
    },
  };
});
function getPercentage(per: any) {
  if (per) {
    return per === '1' ? 1 : (1 - Number(per?.replace('%', ''))) * 100;
  }
}
function getRank(per: any) {
  const percentage = 100 - per;
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
const rankMap: any = computed(() => {
  return [
    `<p class="font-size-tip margin-top-h4">你的2022年标签</p><span class="active1">「浑然天成的当代缪斯」</span><p class='rank'>你的贡献度击败了社区 <span class="active">${getPercentage(
      posterData.value?.count_rank
    )?.toFixed(
      2
    )}%</span> 的人</p> <br>你积极思考、独到透彻、表达跳脱<br>openGauss因为有你而变得不一样！ `,

    `<p class="font-size-tip margin-top-h4">你的2022年标签</p><span class="active1">「见识非凡的探索家」</span><p class='rank'>你的贡献度击败了社区 <span class="active">${getPercentage(
      posterData.value?.count_rank
    )?.toFixed(
      2
    )}%</span> 的人</p> <br>这一年，你在openGauss收获同好，分享智慧<br>恭喜你收获了更好的自己 `,

    `<p class="font-size-tip margin-top-h4">你的2022年标签</p><span class="active1">「新知青年」</span><p class='rank'>你的贡献度击败了社区 <span class="active">${getPercentage(
      posterData.value?.count_rank
    )?.toFixed(
      2
    )}%</span> 的人</p> <br>你用好奇探索真理<br>也因认真进入无数openGauss的平行世界`,
    `<p class="font-size-tip margin-top-h4">你的2022年标签</p><span class="active1">「openGauss的萌新好友」</span><p class='rank'>你的贡献度击败了社区 <span class="active">${getPercentage(
      posterData.value?.count_rank
    )?.toFixed(
      2
    )}%</span> 的人</p> <br>都说有人不想变老就能一直年轻，秘诀是对世界保存好奇<br>请日后多多关照openGauss啦 `,
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
      try {
        const sensors = (window as any)['sensorsDataAnalytic201505'];
        sensors?.setProfile({
          user_logo: res.user,
          community: 'opengauss',
          created_at: new Date(),
        });
      } catch (error) {
        console.log(error);
      }
    }
  });
}
onMounted(async () => {
  // 必须先确定是否为贡献者
  await getUserDataFun();
  await getPosterDataFun();
  currentPage.value = 0;
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
  <div v-if="screenWidth > 1200" class="pc-post" @click="pcClick">
    <div v-if="isContributor" class="contribution none">
      <div class="container box-1">
        <div class="front"></div>
        <div class="back pg-2 wrapper-l current">
          <div class="pg-2-top">
            <p class="fade-time-1">HI~很高兴遇见你！</p>
            <p class="fade-time-2">你的故事要从这个数字说起……</p>
            <p class="fade-time-3 active">
              {{ dayTime(posterData?.first_time_of_enter) }}天
            </p>
          </div>
          <div class="pg-2-main">
            <p class="fade-time-4 active">
              那是{{ changeTime(posterData?.first_time_of_enter) }}
            </p>
            <p class="fade-time-5">我第一次遇见你</p>
            <p class="fade-time-6">
              至今，我们已经走过了{{
                dayTime(posterData?.first_time_of_enter)
              }}个日夜
            </p>
            <p class="fade-time-7">感谢相遇</p>
            <p class="fade-time-8">
              <span class="active">{{ params.user }}</span>
              这个名字我已经铭记
            </p>
            <p class="fade-time-9">在openGauss的开源世界</p>
            <p class="fade-time-10">每一次相遇，每一次陪伴，一定都是双向奔赴</p>
          </div>
        </div>
      </div>
      <div class="container box-2">
        <div class="front"></div>
        <div class="back current wrapper-m pg-6">
          <div class="mask">
            <p>
              因为有<span class="active">4000+</span>个并肩同行的小伙伴一起战斗
            </p>
            <p>openGauss如期在2022年发布<span class="active">3个</span>版本</p>
            <p>
              你们的成果被<span class="active">108个</span>国家、<span
                class="active"
                >1000个</span
              >城市下载应用
            </p>
            <p>吸引了超过<span class="active">200家</span>企业加入社区</p>
            <p>
              openGauss在国内<span class="active">15个</span>城市建立了用户组
            </p>
            <p>走进<span class="active">72所</span>高校</p>
            <p>
              并且举办了openGauss<span class="active">第1次</span>开发者大会
            </p>
            <p class="margin-top-h5">2022年</p>
            <p>已经有越来越多的人走进 openGauss 的开源世界</p>
            <p>与openGauss保持同频 分享热爱 留下宝藏</p>
            <p v-for="item in posterContent.page3.text" :key="item.value">
              <span v-if="item.key" v-html="item.value"></span>
            </p>
            <p class="bold">你一次次完成自我的深度探索，也找到了契合的同行者</p>
          </div>
        </div>
      </div>
      <div class="container box-3">
        <div class="front"></div>
        <div class="back pg-4 wrapper-m current">
          <div class="mask">
            <p class="bold">你在2022这一年的时光里</p>
            <p
              v-for="(item, index) in posterContent.page4.text"
              :key="item.value"
              :class="[
                index === 0 ? 'margin-top-h4' : '',
                `fade-time-${index}`,
              ]"
            >
              <span
                v-if="item.key && item.key !== '0'"
                v-html="item.value"
              ></span>
            </p>
          </div>
        </div>
      </div>
      <div class="container box-4">
        <div class="front"></div>
        <div class="back current wrapper-m pg-5">
          <p class="bold title">其实关于你的点滴</p>
          <p class="bold title">「openGauss」 全都记得</p>
          <p
            class="margin-top-h6"
            v-html="rankMap[getRank(getPercentage(posterData.count_rank))]"
          ></p>
          <p class="margin-top-h4">
            感谢2022年的相遇、陪伴、沟通、成长
            2023，你相信如果可能，那么美好就一定会发生的。 雾霾散去，重见光明
          </p>
          <p>愿你元旦快乐</p>
          <div class="logo-box margin-top-h4">
            <img src="@/assets/qrCode.png" alt="" />
          </div>
        </div>
      </div>
    </div>
    <div v-else class="no-contribution">
      <div class="container box-1">
        <div class="front"></div>
        <div class="back wrapper-l current pg-1">
          <div class="pg1-top">
            <p class="title">2022年度贡献报告</p>
            <p>你的点滴「openGauss」全都记得</p>
          </div>
          <div class="pg1-buttom">
            <p class="fade-time-1">又是一年</p>
            <p class="fade-time-2">我们穿过时间的缝隙</p>
            <p class="fade-time-3">定格最特别的你</p>
            <div class="go-start" @click.stop="goStart">
              <span>生成</span> <span>报告</span>
            </div>
          </div>
        </div>
      </div>
      <div class="container box-2">
        <div class="front"></div>
        <div class="back pg-3 wrapper-m current">
          <div class="mask pg-3-mask">
            <div class="pg-3-main">
              <div class="paragraph-1">
                <p class="fade-time-1">Hi，很高兴认识你</p>
                <p class="fade-time-2">欢迎来到openGauss 星球</p>
                <p class="fade-time-3">有些遗憾，在这之前我们错过了彼此，</p>
                <p class="fade-time-4">希望我们的故事可以从此刻开始……</p>
                <p class="fade-time-5">首先请让我为你介绍一下我自己</p>
              </div>
              <div class="paragraph-2 margin-top-h5">
                <p class="fade-time-6">自2020年6月30日开源以来</p>
                <p class="fade-time-7">
                  这里已经有超过<span class="active">10万+</span> 用户
                </p>
                <p class="fade-time-8">
                  超过<span class="active">4000+</span>开发者并肩同行
                </p>
                <p class="fade-time-9">
                  下载量遍及全球<span class="active">108个</span>国家、<span
                    class="active"
                    >1000个</span
                  >城市
                </p>
                <p class="fade-time-10">
                  openGauss星球收到了<span class="active">8K+</span>个PR，
                </p>
                <p class="fade-time-11">
                  <span class="active">8K+</span>个Issue，建立了<span
                    class="active"
                    >24个SIG</span
                  >
                </p>
                <p class="fade-time-12">
                  2022年，openGauss如期发布<span class="active">3个</span>版本
                </p>
                <p class="fade-time-13">
                  吸引了超过<span class="active">200家</span>企业加入社区
                </p>
                <p class="fade-time-14">
                  至今在国内<span class="active">15个</span>城市建立了用户组
                </p>
                <p class="fade-time-15">
                  走进<span class="active">72所</span>高校
                </p>
                <p class="fade-time-16">
                  并且举办了 openGauss
                  <span class="active">第1次</span>开发者大会
                </p>
              </div>
              <div class="paragraph-3 margin-top-h5">
                <p class="fade-time-17">我们坚信我们在做有趣且正确的事</p>
                <p class="fade-time-18">雾霾散去，奔赴光明</p>
                <p class="fade-time-19">希望未来能够有你一起同行</p>
                <p class="fade-time-20">元旦快乐。</p>
              </div>
            </div>
            <div class="pg-3-bottom fade-time-21">
              <div class="pg-3-bottom-left">openGauss 星球</div>
              <div class="pg-3-bottom-right">
                <img src="@/assets/qrCode.png" alt="" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>

  <div v-else ref="wrapper" class="slide-wrapper">
    <div v-if="isContributor" class="slide-content contribution">
      <div
        class="slide-page wrapper-l pg-1"
        :class="currentPage === 0 ? 'current' : ''"
      >
        <div class="pg1-top">
          <p class="title">2022年度贡献报告</p>
          <p>关于你的点滴</p>
          <p>「openGauss」全都记得</p>
        </div>
        <div class="pg1-buttom">
          <p class="fade-time-1">又是一年</p>
          <p class="fade-time-2">我们穿过时间的缝隙</p>
          <p class="fade-time-3">定格最特别的你</p>
          <div class="go-start" @click.stop="goStart">
            <span>生成</span> <span>报告</span>
          </div>
        </div>
      </div>
      <div
        class="slide-page wrapper-l pg-2"
        :class="currentPage === 1 ? 'current' : ''"
      >
        <div class="pg-2-top">
          <p class="fade-time-1">HI~很高兴遇见你！</p>
          <p class="fade-time-2">你的故事要从这个数字说起……</p>
          <p class="fade-time-3 active">
            {{ dayTime(posterData?.first_time_of_enter) }}天
          </p>
        </div>
        <div class="pg-2-main">
          <p class="fade-time-4">
            那是
            <span class="active">{{
              changeTime(posterData?.first_time_of_enter)
            }}</span>
          </p>
          <p class="fade-time-5">我第一次遇见你</p>
          <p class="fade-time-6">
            至今，我们已经走过了
            <span class="active">{{
              dayTime(posterData?.first_time_of_enter)
            }}</span>
            个日夜
          </p>
          <p class="fade-time-7">感谢相遇</p>
          <p class="fade-time-8">
            <span class="active">{{ params.user }}</span>
            这个名字我已经铭记
          </p>
          <p class="fade-time-9">在openGauss的开源世界</p>
          <p class="fade-time-10">每一次相遇，每一次陪伴，一定都是双向奔赴</p>
        </div>
      </div>
      <div
        class="slide-page wrapper-m pg-6"
        :class="currentPage === 2 ? 'current' : ''"
      >
        <div class="mask">
          <p class="fade-time-0">你一次次完成自我的深度探索</p>
          <p class="fade-time-1">也找到了契合的同行者</p>
          <p class="fade-time-2 margin-top-h6">
            因为有<span class="active">4000+</span>个并肩同行的小伙伴一起战斗
          </p>
          <p class="fade-time-3">
            openGauss如期在2022年发布<span class="active">3个</span>版本
          </p>
          <p class="fade-time-4">
            你们的成果被<span class="active">108个</span>国家、<span
              class="active"
              >1000个</span
            >城市下载应用
          </p>
          <p class="fade-time-5">
            吸引了超过<span class="active">200家</span>企业加入社区
          </p>
          <p class="fade-time-6">
            openGauss在国内<span class="active">15个</span>城市建立了用户组
          </p>
          <p class="fade-time-7">走进<span class="active">72所</span>高校</p>
          <p class="fade-time-8">
            并且举办了openGauss<span class="active">第1次</span>开发者大会
          </p>
        </div>
        <div class="mask margin-top-h7" style="padding: 16px 12px">
          <p class="fade-time-9">2022年</p>
          <p class="fade-time-10">
            已经有越来越多的人走进 openGauss 的开源世界
          </p>
          <p class="fade-time-11">与openGauss保持同频 分享热爱 留下宝藏</p>
          <p
            v-for="(item, index) in posterContent.page3.text"
            :class="`fade-time-${index + 1 + 11}`"
            :key="item.value"
          >
            <span v-if="item.key" v-html="item.value"></span>
          </p>
        </div>
      </div>
      <div
        class="slide-page wrapper-m pg-4"
        :class="currentPage === 3 ? 'current' : ''"
      >
        <div class="mask">
          <p class="bold">你在2022这一年的时光里</p>
          <p
            v-for="(item, index) in posterContent.page4.text"
            :key="item.value"
            :class="[index === 0 ? 'margin-top-h4' : '', `fade-time-${index}`]"
          >
            <span
              v-if="item.key && item.key !== '0'"
              v-html="item.value"
            ></span>
          </p>
        </div>
      </div>
      <div
        class="slide-page wrapper-m pg-5"
        :class="currentPage === 4 ? 'current' : ''"
      >
        <p class="bold title">其实关于你的点滴</p>
        <p class="bold title">「openGauss」 全都记得</p>
        <p
          class="margin-top-h6"
          v-html="rankMap[getRank(getPercentage(posterData.count_rank))]"
        ></p>
        <p class="margin-top-h4">感谢2022年的相遇、陪伴、沟通、成长</p>
        <p>2023，你相信如果可能，那么美好就一定会发生的</p>
        <p>雾霾散去，重见光明</p>
        <p>愿你元旦快乐</p>
        <div class="logo-box margin-top-h4">
          <img src="@/assets/qrCode.png" alt="" />
        </div>
      </div>
    </div>
    <div v-else class="slide-content no-contribution">
      <div
        class="slide-page wrapper-l pg-1"
        :class="currentPage === 0 ? 'current' : ''"
      >
        <div class="pg1-top">
          <p class="title">2022年度贡献报告</p>
          <p>你的点滴 「openGauss」全都记得</p>
        </div>
        <div class="pg1-buttom">
          <p class="fade-time-1">又是一年</p>
          <p class="fade-time-2">我们穿过时间的缝隙</p>
          <p class="fade-time-3">定格最特别的你</p>
          <div class="go-start" @click.stop="goStart">
            <span>生成</span> <span>报告</span>
          </div>
        </div>
      </div>
      <div
        class="slide-page wrapper-m pg-3"
        :class="currentPage === 1 ? 'current' : ''"
      >
        <div class="mask pg-3-mask">
          <div class="pg-3-main">
            <div class="paragraph-1">
              <p class="fade-time-1">Hi，很高兴认识你</p>
              <p class="fade-time-2">欢迎来到openGauss 星球</p>
              <p class="fade-time-3">有些遗憾，在这之前我们错过了彼此，</p>
              <p class="fade-time-4">希望我们的故事可以从此刻开始……</p>
              <p class="fade-time-5">首先请让我为你介绍一下我自己</p>
            </div>
            <div class="paragraph-2 margin-top-h4">
              <p class="fade-time-6">自2020年6月30日开源以来</p>
              <p class="fade-time-7">
                这里已经有超过<span class="active">10万+</span> 用户
              </p>
              <p class="fade-time-8">
                超过<span class="active">4000+</span>开发者并肩同行
              </p>
              <p class="fade-time-9">
                下载量遍及全球<span class="active">108个</span>国家、<span
                  class="active"
                  >1000个</span
                >城市
              </p>
              <p class="fade-time-10">
                openGauss星球收到了<span class="active">8K+</span>个PR，
              </p>
              <p class="fade-time-11">
                <span class="active">8K+</span>个Issue，建立了<span
                  class="active"
                  >24个SIG</span
                >
              </p>
              <p class="fade-time-12">
                2022年，openGauss如期发布<span class="active">3个</span>版本
              </p>
              <p class="fade-time-13">
                吸引了超过<span class="active">200家</span>企业加入社区
              </p>
              <p class="fade-time-14">
                至今在国内<span class="active">15个</span>城市建立了用户组
              </p>
              <p class="fade-time-15">
                走进<span class="active">72所</span>高校
              </p>
              <p class="fade-time-16">
                并且举办了 openGauss <span class="active">第1次</span>开发者大会
              </p>
            </div>
            <div class="paragraph-3 margin-top-h4">
              <p class="fade-time-17">我们坚信我们在做有趣且正确的事</p>
              <p class="fade-time-18">雾霾散去，奔赴光明</p>
              <p class="fade-time-19">希望未来能够有你一起同行</p>
              <p class="fade-time-20">元旦快乐。</p>
            </div>
          </div>
          <div class="pg-3-bottom fade-time-21">
            <div class="pg-3-bottom-left">openGauss 星球</div>
            <div class="pg-3-bottom-right">
              <img src="@/assets/qrCode.png" alt="" />
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss">
$active: #fdfd19;
$spacings: 62 40 32 24 16 12 10 8 6 4;
$bgTime: 0;

.active {
  display: inline-block;
  opacity: 0;
  color: $active;
  font-size: 14px;
}

.bold {
  font-weight: 500;
}

@each $spacing in $spacings {
  $i: index($spacings, $spacing);

  .margin-top-h#{$i} {
    margin-top: #{$spacing}px;
  }
}

.font-size-tip {
  font-size: 12px;
}

#app {
  width: 100vw;
  height: 100vh;
  font-family: FZLTHJW--GB1-0, FZLTHJW--GB1;
}

.bgm-open {
  position: absolute;
  width: 23px;
  top: 18px;
  right: 18px;
  z-index: 999;

  @media screen and (min-width: 1200px) {
    display: none;
  }
}

.bgm-open img {
  width: 100%;
}

.run-bgm {
  animation: runBgm 4s infinite;
}

@keyframes runBgm {
  to {
    transform: rotate(360deg);
  }
}

.pc-post {
  font-size: 16px;
}

.mask {
  border-radius: 4px;
  padding: 24px 16px;
  background: rgba(108, 11, 190, 0.6);
  border: 1px solid #471d9b;
}

.wrapper-l {
  padding: 40px;
}

.wrapper-m {
  padding: 32px 24px;
}

.slide-wrapper {
  width: 100vw;
  height: 100vh;
  position: relative;
  overflow: hidden;
  color: #fff;
  background-color: #471d9b;
  overflow: hidden;

  .slide-content {
    width: 100vw;
    overflow: hidden;

    .slide-page {
      width: 100vw;
      height: 100vh;
      overflow: hidden;
      background-size: cover;
    }

    @for $i from 1 through 6 {
      .pg-#{ $i} {
        background-image: url('@/assets/bg#{$i}.png');
      }
    }

    .pg-1 {
      display: flex;
      flex-direction: column;
      justify-content: space-between;

      p {
        width: 100%;
        text-align: left;
        font-size: 18px;
        line-height: 32px;
      }

      .pg1-top {
        font-weight: 700;

        .title {
          margin-bottom: 12px;
          font-size: 26px;
        }

        p {
          margin-top: 2px;
          line-height: normal;
          font-size: 16px;
        }
      }

      .pg1-buttom {
        display: flex;
        text-align: left;
        align-items: center;
        flex-direction: column;

        p {
          font-weight: 700;
        }

        .go-start {
          position: relative;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          margin: 50px 0 40px;
          background-color: rgb(242, 81, 158);
          text-align: center;
          line-height: 26px;
          letter-spacing: 12px;
          text-indent: 12px;
          border: 6px solid rgb(254, 207, 107);
          border-radius: 50%;
          height: 100px;
          width: 100px;
          font-size: 18px;
          z-index: 10;

          &::before {
            content: '';
            display: block;
            position: absolute;
            width: 120px;
            height: 120px;
            border-radius: 999px;
            z-index: -1;
            background-color: rgba(254, 207, 107, 0.22);
            animation: halo 0.8s ease-in infinite alternate;
          }

          @media screen and (max-height: 800px) {
            margin: 40px 0 24px;
          }
        }
      }
    }

    .pg-2 {
      .pg-2-top {
        font-weight: 700;
        margin-top: 100px;

        p {
          line-height: 32px;
          font-size: 18px;
        }
      }

      .pg-2-main {
        margin-top: 55px;

        p {
          line-height: 28px;
          font-size: 12px;
        }

        .active {
          font-size: 14px;
        }
      }
    }

    .pg-3 {
      .mask {
        margin-top: 76px;
        font-size: 13px;
        line-height: 26px;

        .bold {
          font-size: 17px;
          line-height: 28px;
        }
      }
    }

    .pg-4 {
      .mask {
        margin-top: 76px;
        font-size: 13px;
        line-height: 26px;

        .bold {
          font-size: 20px;
          line-height: 34px;
        }
      }

      .active {
        padding: 0 2px;
        font-size: 14px;
      }
    }

    .pg-5 {
      display: flex;
      flex-direction: column;

      // justify-content: center;
      .title {
        margin-top: 12px;
      }

      .title:first-child {
        margin-top: 40px;
      }

      p {
        line-height: 20px;
        font-size: 13px;
      }

      .bold {
        font-size: 20px;
        line-height: 26px;
      }

      .active1 {
        display: inline-block;
        margin-top: 12px;
        color: #fdfd19;
        font-size: 20px;
        font-weight: 700;
      }

      .active {
        font-size: 20px;
      }

      .rank {
        margin: 14px 0 22px;
        font-size: 16px;
        .active {
          font-size: 18px;
        }
      }

      .logo-box {
        margin-bottom: 40px;
      }
    }

    .pg-6 {
      font-size: 12px;
      line-height: 26px;

      .mask.margin-top-h4 {
        padding: 21px 16px;
        line-height: 28px;

        p:first-child {
          font-size: 15px;
        }
      }

      .fade-time-0 {
        line-height: 32px;
        font-size: 18px;
      }

      .fade-time-1 {
        line-height: 32px;
        font-size: 18px;
      }

      .active {
        padding: 0 2px;
        font-size: 15px;
      }

      .mask:first-child {
        margin-top: 40px;
      }
    }
  }
}

.slide-wrapper {
  .no-contribution {
    .pg-3 {
      height: 100%;
      background-image: url('@/assets/bg6.png');

      .pg-3-mask {
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        margin-top: 0;
        height: 100%;

        .pg-3-main {
          line-height: 24px;
          font-size: 13px;

          .active {
            display: inline-block;
            font-size: 15px;
          }
        }

        .pg-3-bottom {
          display: flex;
          justify-content: space-between;
          align-items: center;
          font-size: 19px;
          opacity: 0;

          &-right {
            width: 82px;
            padding: 3px;
            background-color: #a865eb;

            img {
              width: 100%;
            }
          }
        }
      }

      @media screen and (max-height: 820px) {
        .pg-3-mask {
          .pg-3-main {
            line-height: 22px;
            font-size: 12px;
            justify-content: space-between;

            .margin-top-h4 {
              margin-top: 0;
            }
          }
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

  ///
  .pg-3-bottom {
    animation-duration: 0.8s;
    animation-name: fade;
    animation-fill-mode: forwards;
  }
}

// 动效
// .current.slide-page {
//   @for $i from 0 through 22 {
//     .fade-time-#{ $i} {
//       animation-delay: #{$i * 0.5}s;
//       .active {
//         animation-delay: #{$i * 0.5 + 0.5}s;
//       }
//     }
//   }
// }
.current.slide-page {
  animation: zoomin 5s linear forwards;
}
.slide-page {
  background-position: 100% center;
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

.pc-post {
  @for $i from 1 through 4 {
    .box-#{ $i} {
      .front {
        background-image: url('@/assets/pc-bg-#{$i}.jpg');
      }
    }
  }

  .no-contribution {
    @for $i from 1 through 2 {
      .box-#{ $i} {
        .front {
          background-image: url('@/assets/pc-bg-no-#{$i}.jpg');
        }
      }
    }
  }
}

.logo-box {
  padding: 5px;
  width: 105px;
  background-color: #a865eb;

  img {
    width: 100%;
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

  @media screen and (max-width: 1620px) {
    padding: 24px;
  }

  .box-1 {
    .back {
      background-image: url('@/assets/bg2.png');
    }
  }

  .box-2 {
    .back {
      background-image: url('@/assets/bg6.png');
    }
  }

  .box-3 {
    .back {
      background-image: url('@/assets/bg4.png');
    }
  }

  .box-4 {
    .back {
      background-image: url('@/assets/bg5.png');
    }
  }

  .no-contribution {
    .box-1 {
      .back {
        justify-content: space-between;
        background-image: url('@/assets/bg1.png');

        .go-start {
          opacity: 0;
        }
      }
    }

    .box-2 {
      .pg-3-mask {
        .active {
          font-size: 14px;
        }

        margin-top: 0;

        .pg-3-bottom {
          display: flex;
          justify-content: space-between;
          align-items: center;
          font-size: 19px;
          opacity: 0;

          p {
            opacity: 1;
          }

          &-right {
            width: 82px;
            padding: 3px;
            background-color: #a865eb;

            img {
              width: 100%;
            }
          }
        }
      }
    }
  }

  .contribution,
  .no-contribution {
    display: flex;
    margin: 0 auto;
    width: 100%;
    align-items: center;
    justify-content: space-between;
  }

  .pg-1 {
    display: flex;
    flex-direction: column;
    justify-content: space-between;

    p {
      width: 100%;
      text-align: left;
      font-size: 18px;
      line-height: 32px;
    }

    .pg1-top {
      font-weight: 700;

      .title {
        margin-bottom: 12px;
        font-size: 26px;
      }

      p {
        line-height: normal;
        font-size: 16px;
      }
    }

    .pg1-buttom {
      display: flex;
      text-align: left;
      align-items: center;
      flex-direction: column;

      p {
        font-weight: 700;
      }

      .go-start {
        position: relative;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        margin: 50px 0 40px;
        background-color: rgb(242, 81, 158);
        text-align: center;
        line-height: 26px;
        letter-spacing: 12px;
        text-indent: 12px;
        border: 6px solid rgb(254, 207, 107);
        border-radius: 50%;
        height: 100px;
        width: 100px;
        font-size: 18px;
        z-index: 10;

        &::before {
          content: '';
          display: block;
          position: absolute;
          width: 120px;
          height: 120px;
          border-radius: 999px;
          z-index: -1;
          background-color: rgba(254, 207, 107, 0.22);
          animation: halo 0.8s ease-in infinite alternate;
        }
      }
    }
  }

  .pg-2 {
    .pg-2-top {
      margin-top: 100px;

      p {
        line-height: 32px;
        font-size: 18px;
      }
    }

    .pg-2-main {
      margin-top: 55px;

      p {
        line-height: 28px;
        font-size: 12px;
      }

      .active {
        font-size: 14px;
      }
    }
  }

  .pg-3 {
    .mask {
      margin-top: 76px;
      font-size: 13px;
      line-height: 26px;

      .bold {
        font-size: 17px;
        line-height: 28px;
      }
    }
  }

  .pg-4 {
    .mask {
      margin-top: 76px;
      font-size: 13px;
      line-height: 26px;

      .bold {
        font-size: 20px;
        line-height: 34px;
      }

      .active {
        padding: 0 2px;
        font-size: 14px;
      }
    }
  }

  .pg-5 {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: center !important;

    .title {
      margin-top: 12px;
    }

    p {
      line-height: 20px;
      font-size: 13px;
    }

    .bold {
      font-size: 20px;
      line-height: 26px;
    }

    .active1 {
      display: inline-block;
      margin-top: 12px;
      color: #fdfd19;
      font-size: 20px;
      font-weight: 700;
    }

    .active {
      font-size: 20px;
    }

    .rank {
      margin: 14px 0 22px;
      font-size: 16px;
      .active {
        font-size: 18px;
      }
    }

    .logo-box {
      margin-bottom: 40px;
    }
  }

  .pg-6 {
    font-size: 12px;
    line-height: 26px;

    .mask.margin-top-h4 {
      padding: 21px 16px;
      line-height: 28px;

      p:first-child {
        font-size: 15px;
      }
    }

    .active {
      padding: 0 2px;
      font-size: 14px;
    }

    .mask:first-child {
      // margin-top: 76px;
    }
  }

  .no-contribution {
    .pg-7 {
      display: flex;
      flex-direction: column;
      align-items: center;
      padding-top: 52px;
      font-size: 12px;
      line-height: 24px;
      color: #000;
      text-align: center;
      border: 1px solid rgba($color: #fff, $alpha: 0.7);

      .pg-7-logo {
        margin-top: 40px;
        width: 82px;

        img {
          width: 100%;
        }
      }
    }
  }

  .container {
    position: relative;
    max-width: 360px;
    width: 100%;
    max-height: 780px;
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
    background-color: #471d9b;
    justify-content: center;
    transform-style: preserve-3d;
    backface-visibility: hidden;
    transition: transform 0.7s ease-in-out;
  }

  .front {
    z-index: 10;
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
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    color: #fff;
    background-image: url('@/assets/bg1.png');
    transform: rotateY(180deg);
  }

  .pc-top {
    display: flex;
    justify-content: center;
    z-index: 5;

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

@keyframes zoomin {
  100% {
    background-position: 0% center;
  }
}
</style>
