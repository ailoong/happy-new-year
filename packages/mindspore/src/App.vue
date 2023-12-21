<script setup lang="ts">
import { onMounted, ref, onUnmounted, watch } from 'vue';
import BScroll from '@better-scroll/core';
import { BScrollInstance } from '@better-scroll/core';
import Slide from '@better-scroll/slide';

import useWindowResize from 'shared/hooks/useWindowResize';
import { getPosterData, getMonthcount, getUserData } from 'shared/api';

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
  count_rank: '0.0001',
  first_time_of_comment: '2022/1/4 11:30',
  user_login: 'licihua',
  code_lines_add: '8062',
  pr_num: '53',
  first_time_of_be_comment: '2022/1/4 17:31',
  first_user_of_be_comment: 'zzm_567',
  watch_num: '717',
});

const datastat = {
  user: '650w',
  contributor: '249k',
  pr: '85K',
  issue: '35.9K',
  comment: '1814K',
  member: '325',
  features: '325',
  version: '3',
  groups: ['16', '72'],
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

const registerTime: any = ref([]);

const mindsporeData = {
  page1: [
    `嘿，2023，先别着急走！`,
    `暂停进度条里的好时光`,
    `看看那些不平凡的日子里`,
    `关于你的开源贡献记忆`,
  ],
  page2: [
    `眨眼间，头孢又陪您走过一年`,
    `何其幸运能在开源世界里遇到众多可爱的小孢子`,
    `一起做喜欢的事`,
    `2023年，你我共同见证昇思MindSpore AI开源框架又迈上新一高阶`,
    `是小孢子们无私的开源贡献使得昇思框架建设迅猛发展`,
    `也是开放、共享、协同的开源精神`,
    `让有趣、热爱开源的开发者汇聚在社区共同探索开源魅力`,
    `接下来和头孢一起打开脑洞`,
    `出发去看看，属于你和我的MindSpore2023`,
  ],
  page3: [
    `这一年，在您的见证下`,
    `MindSpore`,
    `发布了<span class="active">${datastat.version}</span>个新版本，推出了<span class="active">${datastat.features}</span>个实用的特性`,
    `收到了<span class="active">${datastat.issue}</span>个issue和<span class="active">${datastat.pr}</span>个pr`,
    `社区下载量突破<span class="active">${datastat.user}</span>，`,
    `超过<span class="active">${datastat.contributor}</span>开发者在社区做出贡献`,
    `遍及全球<span class="active">${datastat.groups[0]}</span>个国家，<span class="active">${datastat.groups[1]}</span>个城市`,
    `转眼间昇思大模型平台也一岁喽！`,
    `目前平台已有<span class="active">${datastat.contributor}</span>用户注册使用`,
    `其中<span class="active">${datastat.contributor}</span>人为核心贡献者`,
    `今年新上线的AI实验室，支持在线训练和推理可视化`,
    `让小孢子们体验全流程开发`,
    `产业专区更是联合知名企业及广大开发者共同打造多领域行业案例，推动各行业与AI技术融通发展`,
    `最热门的大模型模块，已上线<span class="active">${datastat.contributor}个业界知名大模型，支持预训练超大模型任务，欢迎在线体验`,
  ],
  page4: [
    `您作为小孢子们的一份子`,
    `见证了昇思MindSpore首届人工智能峰会`,
    `我们在<span class="active">${posterData.value.comment_num}</span>个城市，共同经历了xx场MSG系列活动`,
    `我们与<span class="active">${posterData.value.comment_num}</span>个企业开发者一起`,
    `共同交流了<span class="active">${posterData.value.comment_num}</span>个技术话题`,
    `我们通过MindSpore TechDay`,
    `AI大赛、开源实习与开发者交流协作汇聚智慧`,
    `我们与<span class="active">${posterData.value.comment_num}</span>位高校开发者`,
    `共同开展了<span class="active">${posterData.value.comment_num}</span>场有趣硬核的开源活动`,
    `我们通过全新的昇思创新训练营活动为<span class="active">${posterData.value.comment_num}</span>所高校带来最热门的大模型赋能课程`,
    `<span class="active">${posterData.value.comment_num}</span>名同学贡献<span class="active">${posterData.value.comment_num}</span>份昇思项目案例`,
    `上千名高校开发者参与开源实习`,
    `<span class="active">${posterData.value.comment_num}</span>名优秀高校开发者荣获社区开源实习offer，收获满满荣誉及奖励`,
    `2023每一位新孢子的加入，都是对社区的又一次充能`,
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
      value: `<span class="active">${posterData.value.comment_num}</span>这一天`,
      key: true,
    },
    {
      value: `是你第一次在昇思MindSpore Gite仓做贡献`,
      key: true,
    },
    {
      value: `转眼间你已经在这里度过了<span class="active">${posterData.value.comment_num}</span>天`,
      key: true,
    },
    {
      value: `今年您一共点亮了<span class="active">${posterData.value.fork_num}</span>个仓库`,
      key: true,
    },
    {
      value: `提出了 <span class="active">${posterData.value.issue_num}</span>个issue`,
      key: posterData.value.first_time_of_enter,
    },
    {
      value: `提出了 <span class="active">${posterData.value.pr_num}</span>个pr`,
      key: posterData.value.first_time_of_enter,
    },
    {
      value: `今年您与 <span class="active">${posterData.value.user_login_with_most_contact}</span>互动最频繁`,
      key: posterData.value.first_time_of_enter,
    },
    {
      value: `<span class="active">${posterData.value.first_user_of_be_comment}</span>为您解决了今年第一个issue`,
      key: posterData.value.first_time_of_enter,
    },
    {
      value: `今年您在<span class="active">${posterData.value.fork_num}</span>月您的贡献高达xx次`,
      key: posterData.value.first_time_of_enter,
    },
    {
      value: `<span class="active">${posterData.value.fork_num}</span>深夜xx时`,
      key: true,
    },
    {
      value: `截至目前已在社区贡献了<span class="active">${posterData.value.fork_num}</span>日`,
      key: true,
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
    `2023年小孢子的每一次贡献`,
    `昇思MindSpore都被赋予了更深层的意义`,
    `在新的一年里`,
    `昇思MindSpore社区将积极探索对外开源合作，开展更多更有趣的开源活动、赛事`,
    `与小孢子们共成长`,
    `昇思MindSpore也将继续推出更强大的版本、特性，让深度学习技术的创新与应用更简单！`,
    `2023年的昇思之旅感恩有您的参与，陪伴和支持`,
    `祝您在2024年龙腾万里，乘势而为！`,
  ],
  // 无贡献
  page7: [
    `满脑创意无处落地？`,
    `满身技术无人看到？`,
    `昇思MindSpore开源社区邀你加入2024开源贡献之旅`,
    `寻找开源贡献路上的partner`,
    `Hi~新朋友，相信你也是一位深度学习爱好者`,
    `虽然你我相识不久，但一定因为有着共同理想才能在这里相遇`,
    `请点击这份惊喜`,
    `让我们重新认识一下吧`,
  ],
  page8: [
    `2020年3月28日，昇思MindSpore正式开源`,
    `短短三年的时光里我们已经结识了一群好朋友`,
    `2023年昇思MindSpore`,
    `发布了<span class="active">${datastat.version}</span>个新版本，推出了<span class="active">${datastat.features}</span>个实用的特性`,
    `收到了<span class="active">${datastat.issue}</span>个issue和<span class="active">${datastat.pr}</span>个pr`,
    `社区下载量突破<span class="active">${datastat.user}</span>，`,
    `超过<span class="active">${datastat.contributor}</span>开发者在社区做出贡献`,
    `遍及全球<span class="active">${datastat.groups[0]}</span>个国家，<span class="active">${datastat.groups[1]}</span>个城市`,
    `转眼间昇思大模型平台也一岁喽！`,
    `目前平台已有<span class="active">${datastat.contributor}</span>用户注册使用`,
    `其中<span class="active">${datastat.contributor}</span>人为核心贡献者`,
    `今年新上线的AI实验室，支持在线训练和推理可视化`,
    `让小孢子们体验全流程开发`,
    `产业专区更是联合知名企业及广大开发者共同打造多领域行业案例，推动各行业与AI技术融通发展`,
    `最热门的大模型模块，已上线<span class="active">${datastat.contributor}个业界知名大模型，支持预训练超大模型任务，欢迎在线体验`,
  ],
  page9: [
    `龙腾盛世，瑞气盈门`,
    `期待2024与你会有新故事`,
    `昇思MindSpore愿你`,
    `万事兴“龙”，欣欣向“龙”`,
    `新年快乐！`,
  ],
};

const wrapper = ref<HTMLElement | null>(null);

BScroll.use(Slide);

async function getPosterDataFun() {
  await getPosterData(params.value)
    .then((res) => {
      if (res.code === 200 && res.data.length) {
        isContributor.value = true;
        posterData.value = res.data[0];
        if (res.data[0].time_of_register_xihe) {
          registerTime.value = getYMD(res.data[0].time_of_register_xihe);
        }
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

function transformTime(time: string) {
  const date = new Date(time);
  const lastTime = date.valueOf();
  const currentTime = new Date().valueOf();
  const days = Math.floor((currentTime - lastTime) / (1000 * 60 * 60 * 24));

  return days;
}

function getYMD(data: any) {
  const list1 = data.split('T');
  const list2 = list1[0].split('-');
  return list2;
}

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

function timesDiff(timesData: string) {
  const dateBegin = new Date(); //获取当前时间
  const dateEnd = new Date(timesData); //将-转化为/，使用new Date
  const dateDiff = dateEnd.getTime() - dateBegin.getTime(); //时间差的毫秒数
  const days = -Math.floor(dateDiff / (24 * 3600 * 1000)); //计算出相差天数
  const leave1 = dateDiff % (24 * 3600 * 1000); //计算天数后剩余的毫秒数
  const hours = Math.floor(leave1 / (3600 * 1000)); //计算出小时数
  const leave2 = leave1 % (3600 * 1000); //计算小时数后剩余的毫秒数
  const minutes = Math.floor(leave2 / (60 * 1000)); //计算相差分钟数
  const diffObj = {
    days: 0,
    hours: 0,
    minutes: 0,
  };

  if (days !== 0) {
    diffObj.days = days - 1;
  } else if (days === 0 && hours !== 0) {
    diffObj.hours = hours;
  } else if (days === 0 && hours === 0) {
    diffObj.minutes = minutes;
  }

  return diffObj;
}

onMounted(async () => {
  // 必须先确定是否为贡献者
  // await getUserDataFun();
  // await getPosterDataFun();
  // await getMonthountFun();

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
          <img src="@/assets/arrow.png" alt="" />
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
      </div>

      <div class="slide-page pg-3" :class="currentPage === 2 ? 'current' : ''">
        <p
          v-for="(item, index) in mindsporeData.page3"
          :key="item"
          :class="`fade-time-${index + 1}`"
          v-dompurify-html="item"
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
      </div>

      <div class="slide-page pg-4" :class="currentPage === 3 ? 'current' : ''">
        <p
          v-for="(item, index) in mindsporeData.page4"
          :key="item"
          :class="`fade-time-${index + 1}`"
          v-dompurify-html="item"
        ></p>
      </div>

      <div class="slide-page pg-5" :class="currentPage === 4 ? 'current' : ''">
        <p
          v-for="(item, index) in mindsporeData.page5"
          :key="item.value"
          :class="`fade-time-${index + 1}`"
          v-dompurify-html="item.value"
        ></p>
      </div>

      <div class="slide-page pg-6" :class="currentPage === 5 ? 'current' : ''">
        <p
          v-for="(item, index) in mindsporeData.page6"
          :key="item"
          :class="`fade-time-${index + 1}`"
          v-dompurify-html="item"
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
          <img src="@/assets/arrow.png" alt="" />
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
      </div>

      <div class="slide-page pg-3" :class="currentPage === 2 ? 'current' : ''">
        <p
          v-for="(item, index) in mindsporeData.page8"
          :key="item"
          :class="`fade-time-${index + 1}`"
          v-dompurify-html="item"
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
      </div>

      <div class="slide-page pg-4" :class="currentPage === 3 ? 'current' : ''">
        <p
          v-for="(item, index) in mindsporeData.page4"
          :key="item"
          :class="`fade-time-${index + 1}`"
          v-dompurify-html="item"
        ></p>
      </div>

      <div class="slide-page pg-6" :class="currentPage === 4 ? 'current' : ''">
        <p
          v-for="(item, index) in mindsporeData.page9"
          :key="item"
          :class="`fade-time-${index + 1}`"
          v-dompurify-html="item"
        ></p>
        <img src="@/assets/qr-code.png" class="qr-code" />
      </div>
    </div>
  </div>
</template>

<style lang="scss">
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
        top: 9rem;
        left: 1.32rem;
        z-index: 3;

        animation-name: move;
        animation-duration: 2s;
        animation-iteration-count: infinite;
        animation-timing-function: ease-in-out;
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

    .pg-2 {
      .fade-time-4,
      .fade-time-8 {
        margin-top: 16px;
      }
    }

    .pg-3 {
      .fade-time-9 {
        margin-top: 16px;
      }
      .img-box {
        position: absolute;
        bottom: 2.4rem;
        left: 50%;
        width: 4.64rem;
        height: 4.64rem;
        transform: translate(-50%);
        @media screen and (max-width: 768px) {
          bottom: 2.4rem;
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
      .fade-time-8 {
        margin-top: 16px;
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
