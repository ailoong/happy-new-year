<script setup lang="ts">
import { onMounted, ref, onUnmounted, watch, computed } from 'vue';
import BScroll from '@better-scroll/core';
import { BScrollInstance } from '@better-scroll/core';
import Slide from '@better-scroll/slide';

import useWindowResize from 'shared/hooks/useWindowResize';
import { getPosterData, getMonthcount, getUserData } from 'shared/api';
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

const params = ref({
  community: 'mindspore',
  user: 'ailoooong',
  year: '2023',
});

const posterData: any = ref({});

const datastat = {
  user: '654w',
  contributor: '5,012',
  pr: '23.1K',
  issue: '7,932',
  comment: '1814K',
  member: '325',
  features: '325',
  version: '3',
  groups: ['155', '2,800'],
  xihe: ['28,765', '2,287'],
};
const msData = {
  city: 'xx',
  msg: '100',
  enterprise_developers: ['xx', 'xxx'],
  university_developers: 'xx',
  activities: 'xxx',
  internship: 'xxx',
  universities: ['xx', 'xxx', 'xxx'],
};

const monthData: any = ref({});

async function getUserDataFun() {
  await getUserData().then((res) => {
    if (res.user) {
      params.value.user = res.user;
    }
  });
}

const isContributor = ref(true);

const mindsporeData = computed(() => {
  return {
    page1: [
      `嘿，2023，先别着急走！`,
      `暂停进度条里的好时光`,
      `看看那些不平凡的日子里`,
      `关于你的开源贡献记忆`,
    ],
    page2: [
      `眨眼间，昇思又陪您走过一年`,
      `何其幸运能在开源世界里遇到众多可爱的开发者`,
      `一起做喜欢的事`,
      `2023年，人工智能的发展给世界带来太多惊喜`,
      `这一年，你我也共同见证昇思MindSpore AI开源框架又迈上新一高阶`,
      `是开发者们无私的贡献使得昇思框架建设迅猛发展`,
      `也是开放、共享、协同的开源精神`,
      `让有趣、热爱开源的开发者汇聚在社区共同探索人工智能的无穷可能`,
      `接下来和昇思一起打开脑洞`,
      `出发去看看，属于你和我的MindSpore2023`,
    ],
    page3: [
      `这一年，在您的见证下`,
      `昇思MindSpore`,
      `发布了<span class="active">${datastat.version}</span>个新版本，推出了<span class="active">${datastat.features}</span>个实用的特性`,
      `收到了<span class="active">${datastat.issue}</span>个issue和<span class="active">${datastat.pr}</span>个pr`,
      `社区下载量突破<span class="active">${datastat.user}</span>，`,
      `超过<span class="active">${datastat.contributor}</span>开发者在社区做出贡献`,
      `遍及全球<span class="active">${datastat.groups[0]}</span>个国家，<span class="active">${datastat.groups[1]}</span>个城市`,
      `转眼间昇思大模型平台也一岁半喽！`,
      `作为首个基于国产AI算力和框架、服务全球开发者的一站式大模型平台`,
      `我们已有<span class="active">${datastat.xihe[0]}</span>名用户注册使用`,
      `其中<span class="active">${datastat.xihe[1]}</span>人为核心贡献者`,
      `今年新上线的AI实验室，支持在线训练和推理可视化，让开发者们体验全流程开发！`,
      `让小孢子们体验全流程开发`,
      `产业专区更是联合知名企业及广大开发者共同打造多领域行业案例，推动各行业与AI技术融通发展`,
      `最热门的大模型模块，已上线<span class="active">9</span>个业界知名大模型，支持预训练超大模型任务，欢迎在线体验！`,
    ],
    page4: [
      `这一年`,
      `MSG · 企业行全新升级，昇思开发者创享日从杭州出发，联合各地创新中心，打造<span class="active">300+</span>企业案例，构建繁荣的人工智能产业生态圈`,
      `MSG · 高校行开拓创新，通过MSG·暴走校园以及全新的昇思创新训练营为<span class="active">35</span>所高校，超<span class="active">1500</span>名高校开发者带来最热门的大模型赋能课程，并吸引上百名高校开发者参与开源实习，收获满满荣誉及奖励`,
      `这一年`,
      `昇思大模型平台共开展<span class="active">8</span>场AI赛事，其中科幻与创想主题AI创作大赛吸引来自全国<span class="active">260+</span>支队伍参赛，并在2023世界成都科幻大会中为<span class="active">12</span>支获奖队伍颁奖，获奖作品更是获得海外媒体报道`,
      `这一年`,
      `我们共与<span class="active">10000+</span>开发者一起，共同开展了超<span class="active">200</span>场有趣硬核的开源活动，交流了<span class="active">500+</span>个技术话题`,
    ],
    page5: [
      {
        value: `Hi~，<span class="active">@${params.value.user}</span>`,
        key: true,
      },
      {
        value: `2023年就要过去了`,
        key: true,
      },
      {
        value: `还记得吗？`,
        key: true,
      },
      {
        value: `<span class="active">${changeTime(
          posterData.value.first_time_of_enter
        )}</span>这一天`,
        key: posterData.value.first_time_of_enter,
      },
      {
        value: `是你第一次在昇思MindSpore Gitee仓做贡献`,
        key: posterData.value.first_time_of_enter,
      },
      {
        value: `转眼间你已经在这里度过了<span class="active">${dayTime(
          posterData.value.first_time_of_enter
        )}</span>天`,
        key: posterData.value.first_time_of_enter,
      },
      {
        value: `今年您一共`,
        key: true,
      },
      {
        value: `点亮了<span class="active">${posterData.value.fork_num}</span>个仓库`,
        key: posterData.value.fork_num,
      },
      {
        value: `提出了 <span class="active">${posterData.value.issue_num}</span>个issue`,
        key: posterData.value.issue_num,
      },
      {
        value: `提出了 <span class="active">${posterData.value.pr_num}</span>个pr`,
        key: posterData.value.pr_num,
      },
      {
        value: `今年您与 <span class="active">${posterData.value.user_login_with_most_contact}</span>互动最频繁`,
        key: posterData.value.user_login_with_most_contact,
      },
      {
        value: `<span class="active">${posterData.value.first_user_of_be_comment}</span>为您解决了今年第一个issue`,
        key: posterData.value.first_user_of_be_comment,
      },
      {
        value: `今年您在<span class="active">${monthData.value.month}</span>月您的贡献高达<span class="active">${monthData.value.count}</span>次`,
        key: monthData.value.month,
      },
      {
        value: `<span class="active">${formatTime(
          posterData.value.latest_controibute_at
        )}</span>时`,
        key: posterData.value.latest_controibute_at,
      },
      {
        value: `截至目前已在社区贡献了<span class="active">${posterData.value.total_days}</span>日`,
        key: posterData.value.total_days,
      },
      {
        value: `您依然奋斗在昇思社区`,
        key: true,
      },
      {
        value: `期待2024您在社区的首次活跃`,
        key: true,
      },
    ],
    page6: [
      `2023年`,
      `大家的每一次贡献`,
      `昇思MindSpore都被赋予了更深层的意义`,
      `在新的一年里`,
      `昇思MindSpore开源社区将`,
      `积极探索对外开源合作，开展更多更有趣的开源活动、赛事，与开发者们共成长`,
      `昇思MindSpore也将`,
      `继续推出更强大的版本、特性，让深度学习技术的创新与应用更简单！`,
      `2023年的昇思之旅感恩有您的参与，陪伴和支持`,
      `祝您在2024年龙腾万里，乘势而为！`,
    ],
    // 无贡献
    page7: [
      `满脑创意无处落地？`,
      `满身技术无人看到？`,
      `昇思MindSpore开源社区邀您加入2024开源贡献之旅`,
      `寻找开源贡献路上的伙伴`,
      `Hi~新朋友，相信你也是一位深度学习爱好者`,
      `虽然你我相识不久，但一定因为有着共同理想才能在这里相遇`,
      `请点击这份惊喜`,
      `让我们重新认识一下吧`,
    ],
    page8: [
      `2020年3月28日，昇思MindSpore正式开源`,
      `短短三年的时光里我们已经结识了一群好朋友`,
      `2023年里昇思MindSpore共`,
      `发布了<span class="active">${datastat.version}</span>个新版本，推出了<span class="active">${datastat.features}</span>个实用的特性`,
      `收到了<span class="active">${datastat.issue}</span>个issue和<span class="active">${datastat.pr}</span>个pr`,
      `社区下载量突破<span class="active">${datastat.user}</span>，`,
      `超过<span class="active">${datastat.contributor}</span>开发者在社区做出贡献`,
      `遍及全球<span class="active">${datastat.groups[0]}</span>个国家，<span class="active">${datastat.groups[1]}</span>个城市`,
      `转眼间昇思大模型平台也一岁半喽！`,
      `作为首个基于国产AI算力和框架、服务全球开发者的一站式大模型平台`,
      `我们已有<span class="active">${datastat.xihe[0]}</span>名用户注册使用，其中<span class="active">${datastat.xihe[1]}</span>人为核心贡献者`,
      `今年新上线的AI实验室，支持在线训练和推理可视化`,
      `让开发者们体验全流程开发`,
      `产业专区更是联合知名企业及广大开发者共同打造多领域行业案例，推动各行业与AI技术融通发展`,
      `最热门的大模型模块，已上线<span class="active">9</span>个业界知名大模型，支持预训练超大模型任务，欢迎在线体验！`,
    ],
    page9: [
      `龙腾盛世，瑞气盈门`,
      `期待2024与你会有新故事`,
      `昇思MindSpore愿你`,
      `万事兴“龙”，欣欣向“龙”`,
      `新年快乐！`,
    ],
  };
});

const wrapper = ref<HTMLElement | null>(null);

BScroll.use(Slide);

function dayTime(time: string) {
  if (time) {
    const today = new Date().getTime();
    const endTime = new Date(time).getTime();
    return Math.floor((today - endTime) / 1000 / 24 / 60 / 60);
  }
}

async function getPosterDataFun() {
  await getPosterData(params.value)
    .then((res) => {
      if (res.code === 200 && res.data.length) {
        isContributor.value = true;
        posterData.value = res.data[0];
      } else {
        isContributor.value = false;
      }
    })
    .catch(() => {
      isContributor.value = false;
    });
}

async function getMonthountFun() {
  await getMonthcount(params.value).then((res) => {
    if (res.code === 200 && res.data) {
      monthData.value = res.data;
    }
  });
}

let slide: BScrollInstance;
const currentPage = ref(0);

function getZero(time: number) {
  return time < 9 ? '0' + time : time;
}
function changeTime(time: string) {
  if (time) {
    const EndTime = new Date(time);
    const y = EndTime.getFullYear();
    const m = EndTime.getMonth() + 1;
    const d = EndTime.getDate();
    return `${y}年${getZero(m)}月${getZero(d)}日`;
  }
}

function formatTime(time: string) {
  if (time) {
    const EndTime = new Date(time);
    const h = EndTime.getHours();
    const m = EndTime.getMinutes();
    const all = `${getZero(h)}:${getZero(m)} ${h < 12 ? 'AM' : ''}`;
    return changeTime(time) + ' ' + all;
  }
}

onMounted(async () => {
  // 必须先确定是否为贡献者
  await getUserDataFun();
  await getPosterDataFun();
  await getMonthountFun();

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

  if (screenWidth.value < 768) {
    bgm.value?.addEventListener('pause', function () {
      bgmOpen.value?.classList.remove('run-bgm');
    });
    bgmOpen.value?.addEventListener('touchstart', function () {
      bgm.value?.paused ? bgm.value?.play() : bgm.value?.pause();
      bgmOpen.value.classList.add('run-bgm');
    });
  }
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
    src="/bgm/MindSpore_BGM_2021.mp3"
    autoplay
    preload="auto"
    loop
  ></audio>
  <div ref="bgmOpen" class="bgm-open">
    <img class="closebgm" src="@/assets/close.svg" alt="" />
  </div>

  <div
    ref="wrapper"
    class="slide-wrapper"
    :class="screenWidth > 768 ? 'pc' : ''"
  >
    <div v-if="isContributor" class="slide-content">
      <div class="slide-page pg-1" :class="currentPage === 0 ? 'current' : ''">
        <img class="img1" src="@/assets/img1.png" alt="" />

        <div class="box">
          <div class="info">
            <p
              v-for="(item, index) in mindsporeData.page1"
              :key="item"
              :class="`fade-time-${index + 1}`"
            >
              {{ item }}
            </p>
          </div>
        </div>

        <img class="img3" src="@/assets/img3.png" alt="" />
        <div class="slide-top">
          <img :src="arrowIcon" alt="" />
        </div>
      </div>

      <div class="slide-page pg-2" :class="currentPage === 1 ? 'current' : ''">
        <p
          v-for="(item, index) in mindsporeData.page2"
          :key="item"
          :class="`fade-time-${index + 1}`"
        >
          {{ item }}
        </p>
        <div class="slide-top">
          <img :src="arrowIcon" alt="" />
        </div>
      </div>

      <div class="slide-page pg-3" :class="currentPage === 2 ? 'current' : ''">
        <p
          v-for="(item, index) in mindsporeData.page3"
          :key="item"
          v-dompurify-html="item"
          :class="`fade-time-${index + 1}`"
        ></p>
        <div class="img-box">
          <p class="fade-time-1">
            <img src="@/assets/img4.png" class="img4" />
          </p>
          <p class="fade-time-5">
            <img src="@/assets/img5.png" class="img5" />
          </p>
          <p class="fade-time-3">
            <img src="@/assets/img6.png" class="img6" />
          </p>
        </div>
        <div class="slide-top">
          <img :src="arrowIcon" alt="" />
        </div>
      </div>

      <div class="slide-page pg-4" :class="currentPage === 3 ? 'current' : ''">
        <p class="fade-time-0">作为昇思的一份子</p>
        <p class="fade-time-1">今年您见证了昇思MindSpore首届人工智能峰会</p>
        <p
          v-for="(item, index) in mindsporeData.page4"
          :key="item"
          v-dompurify-html="item"
          :class="`fade-time-${index + 2}`"
        ></p>
        <p :class="`fade-time-${mindsporeData.page4.length + 2}`">
          2023每一位新开发者的加入，都是对社区的又一次充能
        </p>
        <div class="slide-top">
          <img :src="arrowIcon" alt="" />
        </div>
      </div>

      <div class="slide-page pg-5" :class="currentPage === 4 ? 'current' : ''">
        <p
          v-for="(item, index) in mindsporeData.page5"
          :key="item.value"
          :class="`fade-time-${index + 1}`"
        >
          <span
            v-if="item.key && item.key !== '0'"
            v-dompurify-html="item.value"
          ></span>
        </p>
        <div class="slide-top">
          <img :src="arrowIcon" alt="" />
        </div>
      </div>

      <div class="slide-page pg-6" :class="currentPage === 5 ? 'current' : ''">
        <p
          v-for="(item, index) in mindsporeData.page6"
          :key="item"
          v-dompurify-html="item"
          :class="`fade-time-${index + 1}`"
        ></p>
        <img src="@/assets/qr-code.png" class="qr-code" />
      </div>
    </div>
    <!-- 无贡献 -->
    <div v-else class="slide-content">
      <div class="slide-page pg-1" :class="currentPage === 0 ? 'current' : ''">
        <img class="img1" src="@/assets/img1.png" alt="" />

        <div class="box">
          <div class="info">
            <p
              v-for="(item, index) in mindsporeData.page1"
              :key="item"
              :class="`fade-time-${index + 1}`"
            >
              {{ item }}
            </p>
          </div>
        </div>

        <img class="img3" src="@/assets/img3.png" alt="" />
        <div class="slide-top">
          <img :src="arrowIcon" alt="" />
        </div>
      </div>

      <div class="slide-page pg-2" :class="currentPage === 1 ? 'current' : ''">
        <p
          v-for="(item, index) in mindsporeData.page7"
          :key="item"
          :class="`fade-time-${index + 1}`"
        >
          {{ item }}
        </p>
        <div class="slide-top">
          <img :src="arrowIcon" alt="" />
        </div>
      </div>

      <div class="slide-page pg-3" :class="currentPage === 2 ? 'current' : ''">
        <p
          v-for="(item, index) in mindsporeData.page8"
          :key="item"
          v-dompurify-html="item"
          :class="`fade-time-${index + 1}`"
        ></p>
        <div class="img-box">
          <p class="fade-time-1">
            <img src="@/assets/img4.png" class="img4" />
          </p>
          <p class="fade-time-5">
            <img src="@/assets/img5.png" class="img5" />
          </p>
          <p class="fade-time-3">
            <img src="@/assets/img6.png" class="img6" />
          </p>
        </div>
        <div class="slide-top">
          <img :src="arrowIcon" alt="" />
        </div>
      </div>

      <div class="slide-page pg-4" :class="currentPage === 3 ? 'current' : ''">
        <p class="fade-time-0">今年我们举办了昇思MindSpore首届人工智能峰会</p>
        <p
          v-for="(item, index) in mindsporeData.page4"
          :key="item"
          v-dompurify-html="item"
          :class="`fade-time-${index + 1}`"
        ></p>
        <p :class="`fade-time-${mindsporeData.page4.length + 1}`">
          2024年希望凝聚更多开发者力量共建社区
        </p>
        <p :class="`fade-time-${mindsporeData.page4.length + 2}`">
          期待未来可以与你共同成长
        </p>
        <div class="slide-top">
          <img :src="arrowIcon" alt="" />
        </div>
      </div>

      <div class="slide-page pg-6" :class="currentPage === 4 ? 'current' : ''">
        <p
          v-for="(item, index) in mindsporeData.page9"
          :key="item"
          v-dompurify-html="item"
          :class="`fade-time-${index + 1}`"
        ></p>
        <img src="@/assets/qr-code.png" class="qr-code" />
      </div>
    </div>
  </div>
</template>

<style lang="scss">
body {
  background: #3366ff url('@/assets/bg.jpg') no-repeat top center/cover;
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
  font-size: 0;
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

// ipad 适配
@media screen and (min-width: 768px) {
  html {
    font-size: 110px !important;
  }
}

.active {
  font-size: 12px;
  font-weight: 500;
  color: rgb(252, 224, 101);
  margin: 0 4px;
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
  .slide-content {
    width: 100%;
    @media screen and (max-width: 768px) {
      width: 100vw;
    }
    .slide-page {
      width: 100%;
      height: 100%;
      padding: 72px 0.8rem;
      @media screen and (max-width: 768px) {
        width: 100vw;
        height: 100vh;
      }
      overflow: hidden;
      position: relative;
      background-size: cover;
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
    @for $i from 1 through 6 {
      .pg-#{ $i} {
        background-image: url('@/assets/bg#{$i}.jpg');
      }
    }
    .pg-1 {
      .img1 {
        width: 8rem;
        position: absolute;
        top: 1.9rem;
        left: 50%;
        transform: translate(-50%);
        z-index: 9;
      }
      .box {
        width: 6.24rem;
        height: 4rem;
        position: absolute;
        top: 6.36rem;
        left: 50%;
        transform: translateX(-50%);
        background: url('@/assets/img2.png') no-repeat top center/cover;
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 9;
      }
      .img3 {
        width: 9.8rem;
        position: absolute;
        top: 11.2rem;
        left: 1.32rem;
        z-index: 3;

        animation-name: move1;
        animation-duration: 2s;
        animation-iteration-count: infinite;
        animation-timing-function: ease-in-out;
        @media screen and (max-width: 768px) {
          top: 9.5rem;
        }
      }
    }

    .pg-2 {
      .fade-time-4,
      .fade-time-8 {
        margin-top: 16px;
      }
    }

    .pg-3 {
      .fade-time-8 {
        margin-top: 16px;
      }
      .img-box {
        position: absolute;
        top: 15rem;
        left: 50%;
        width: 4.64rem;
        height: 4.64rem;
        transform: translate(-50%);
        @media screen and (max-width: 768px) {
          top: 15rem;
        }
        .img4 {
          width: 3.97rem;
          position: absolute;
          top: 0.26rem;
          left: 0.26rem;
        }
        .img5 {
          width: 7.78rem;
          position: absolute;
          top: 1rem;
          left: -1.5rem;
          z-index: 3;
        }
        .img6 {
          width: 4.64rem;
          position: absolute;
          top: 0;
          left: 0;
          z-index: 2;
          animation-name: move;
          animation-duration: 2s;
          animation-iteration-count: infinite;
          animation-timing-function: ease-in-out;
        }
      }
    }

    .pg-4 {
      padding-top: 1.2rem !important;
      .fade-time-3,
      .fade-time-6,
      .fade-time-8 {
        margin-top: 8px;
      }
    }

    .pg-5 {
      .fade-time-4 {
        margin-top: 16px;
      }
    }
    .pg-6 {
      .fade-time-7 {
        margin-top: 16px;
      }
      .qr-code {
        width: 2.89rem;
        position: absolute;
        bottom: 0.72rem;
        left: 50%;
        transform: translate(-50%);
      }
    }
  }

  // pg1-动效
  @keyframes fade {
    0% {
      opacity: 1;
    }
    50% {
      opacity: 0;
    }
    100% {
      opacity: 1;
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
  @keyframes move1 {
    0% {
      transform: translateY(0px);
    }
    50% {
      transform: translateY(-5px);
    }
    100% {
      transform: translateY(0px);
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
}

p {
  line-height: 20px;
  font-size: 12px;
  text-align: center;
  color: #ffffff;
  opacity: 0;
}

// 滑到页面才触发动画
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
}

@keyframes fade {
  100% {
    opacity: 1;
  }
}
</style>
