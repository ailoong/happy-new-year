<script setup lang="ts">
import { onMounted, ref, onUnmounted, computed, watch } from 'vue';
import BScroll from '@better-scroll/core';
import { BScrollInstance } from '@better-scroll/core';
import Slide from '@better-scroll/slide';

import useWindowResize from 'shared/hooks/useWindowResize';
import { getPosterData, getMonthcount } from 'shared/api';

const lang = ref('zh');
const screenWidth = useWindowResize();

watch(
  () => window.location.href,
  (val) => {
    lang.value = val.includes('/zh/') ? 'zh' : 'en';
    lang.value = 'zh';
  },
  { immediate: true }
);

const mindsporeData: any = computed(() => {
  return {
    zh: {
      page1: {
        id: 1,
        start: '你的故事要从这里开始',
        slide: '上滑查看下一页',
      },
      page2: {
        id: 2,
        top: [
          '操纵灵感的代码',
          '编写智慧的程序',
          '发送快捷的指令',
          '传输网络的密语',
          '便将一个个梦幻的理想变成神奇的现实',
          '2022年，小孢子你又成长了哦！',
        ],
        bottom: [
          '每一个节点的历程，都是带有温度的回忆',
          '请点击这份惊喜，出发去看看',
          '属于你和我的MindSpore2022',
        ],
        top_no: [
          '编写智慧的程序',
          '发送快捷的指令',
          '传输网络的密语',
          '便将一个个梦幻的理想变成神奇的现实',
        ],
        bottom_no: [
          'Hi~新朋友，相信你也是一位深度学习爱好者',
          '虽然你我相识不久，但不一定因为有着共同理想才能在这里',
          '相遇',
          '请点击这份惊喜',
          '让我们重新认识一下吧',
        ],
      },
      page3: {
        id: 3,
        top: ['这一年，在您的见证下：', 'MindSpore'],
        middle: [
          {
            value: `发布了<span class="active">3</span>个新版本`,
            key: '1',
          },
          {
            value: `推出了<span class="active">24</span>个实用的特性`,
            key: '1',
          },
          {
            value: `收到了<span class="active">${posterData.value.issue_num}</span>个issue和<span class="active">${posterData.value.pr_num}</span>个pr`,
            key: posterData.value.issue_num,
          },
          {
            value: `社区下载量突破<span class="active">3558682</span>`,
            key: '3558682',
          },
          {
            value: `超过<span class="active">21188</span>开发者在社区做出贡献`,
            key: '21188',
          },
          {
            value: `遍及全球<span class="active">142</span>个国家，<span class="active">1879</span>个城市`,
            key: '142',
          },
        ],
        bottom: [
          '下半年社区还开发了全新的一站式昇思大模型平台',
          '开发者可以在线体验大模型推理任务',
          `目前已经上线<span class="active">7</span>个大模型`,
          '您作为小孢子们的一份子',
          `我们共同经历<span class="active">160</span>场MSG系列活动`,
          `我们与来自<span class="active">2024</span>个企业的开发者一起`,
          `贯穿<span class="active">8</span>个行业领域的分享`,
          '很多都是首次通过MSG企业行触电AI',
          `我们与来自<span class="active">36</span>所高校的开发者一起`,
          `共同聆听了<span class="active">85</span>节课程，完成了<span class="active">300+</span>份大作业`,
          '让MSG暴走校园为大家带来欢乐和知识',
          `我们与来自<span class="active">24</span>个城市得开发者一起，`,
          `共同交流了<span class="active">72</span>个技术话题`,
          'MSG城市行与本地小孢子在交流协作间汇聚智慧',
          '每一位小孢子的加入，都是对社区的有一次充能',
        ],
        top_no: [
          '2023年3月28号，昇思MindSpore正式开源',
          '短短两年多的时光里我们已经结识了一群好朋友',
        ],
        middle_no: [
          {
            value: `2022年昇思MindSpore发布了<span class="active">3</span>个新版本`,
            key: '1',
          },
          {
            value: `推出了<span class="active">24</span>个实用的特性`,
            key: '1',
          },
          {
            value: `社区下载量突破<span class="active">3558682</span>`,
            key: '1',
          },
          {
            value: `超过<span class="active">21188</span>开发者在社区做出贡献`,
            key: '1',
          },
          {
            value: `遍及全球<span class="active">142</span>个国家，<span class="active">1879</span>个城市`,
            key: '142',
          },
        ],
        bottom_no: [
          '下半年社区还开发了全新的一站式昇思大模型平台',
          `开发者可以在线体验大模型推理任务,目前已经上线<span class="active">7</span>个`,
          '大模型',
        ],
      },
      page4: {
        id: 4,
        top: [
          `Hi~，@<span class="active">${posterData.value.user_login}</span>`,
          '截至2022年12月31日24时',
        ],
        bottom: [
          {
            value: `我们已经相识<span class="active">${transformTime(
              posterData.value.first_time_of_enter
            )}</span>天啦`,
            key: transformTime(posterData.value.first_time_of_enter),
          },
          {
            value: '今年您一共',
            key: '1',
          },
          {
            value: `点亮了<span class="active">${posterData.value.star_num}</span>个仓库`,
            key: posterData.value.star_num,
          },
          {
            value: `提出了<span class="active">${posterData.value.issue_num}</span>个issue`,
            key: posterData.value.issue_num,
          },
          {
            value: `提交了<span class="active">${posterData.value.pr_num}</span>个pr`,
            key: posterData.value.pr_num,
          },
          {
            value: '今年您与',
            key: '1',
          },
          {
            value: `<span class="active">${posterData.value.user_login_with_most_contact}</span>互动最频繁`,
            key: posterData.value.user_login_with_most_contact,
          },
          {
            value: `<span class="active">${posterData.value.first_user_of_be_comment}</span>为您解决了今年的第一个issue`,
            key: posterData.value.first_user_of_be_comment,
          },
          {
            value: `今年您在<span class="active">${monthData.value.month}</span>月的贡献高达<span class="active">${monthData.value.count}</span>次`,
            key: monthData.value.count,
          },
          {
            value: `截至目前已在社区已经贡献了<span class="active">${transformTime(
              posterData.value.first_time_of_enter
            )}</span>日`,
            key: transformTime(posterData.value.first_time_of_enter),
          },
          {
            value: `<span class="active">${registerTime.value[0]}</span>年<span class="active">${registerTime.value[1]}</span>月<span class="active">${registerTime.value[2]}</span>日您首次注册昇思大模型平台，新名字`,
            key: posterData.value.time_of_register_xihe,
          },
          {
            value: `叫<span class="active">${posterData.value.username}</span>`,
            key: posterData.value.username,
          },
          {
            value: '期待2023您在社区的首次活跃',
            key: '1',
          },
        ],
        top_no: [
          '作为头孢新朋友，带您了解下2022年的MSG系列活动',
          `我们与来自<span class="active">2042</span>个企业的开发者一起，贯穿8个行业`,
          '领域的分享',
          '很多都是首次通过MSG企业行触电AI',
          `我们与来自<span class="active">36</span>所高校的开发者一起，共同聆听了<span class="active">85</span>节课程，`,
          `完成了<span class="active">300+</span>份大作业`,
          '让MSG暴走校园为大家带来欢乐和知识',
          `我们与来自<span class="active">24</span>个城市得开发者一起，共同交流了<span class="active">72</span>个`,
          '技术话题',
        ],
        bottom_no: [
          'MSG城市行与本地小孢子在交流协作间汇聚智慧',
          '2023年希望凝聚更多开发者的力量共建社区',
          '期待未来可以与你共同成长',
        ],
      },
      page5: {
        id: 5,
        top: [
          '岁月不居，时节如流',
          '转眼一年已经结束',
          '在新的一年里',
          '昇思MindSpore社区将继续',
          '与您携手一起迎接新朋友',
          '昇思MindSpore也将',
          '继续退出更强大的新版本',
          '届时您一定要多多支持！',
        ],
        bottom: [
          '2022年的昇思之旅感恩有您的参与，陪伴与支持',
          '祝您在2023年继续“程”风破浪，快乐加“码”，',
          '再创佳绩！',
        ],
        top_no: ['金虎辞旧，玉兔迎新', '期待2023与你会有新故事'],
        bottom_no: ['昇思MindSpore愿你', '身体安康，万事顺利', '新年快乐！'],
      },
    },
    en: {
      page1: {
        id: 1,
        start: 'Your story starts here',
        slide: 'Swipe up for the next page',
      },
      page2: {
        id: 2,
        top: [
          'Hey MindSpore developers,',
          'Thanks for working with us in 2022',
          'Every line of code you’ve written has been a source of inspiration',
          'Every program you’ve built has made our world more intelligent',
          'Every instruction and every message you’ve sent has made dreams come true',
        ],
        bottom: [
          'Every stop on your journey has created new memories',
          'So why wait? ',
          'Click here to embark on this exciting journey and discover what the future holds for you and MindSpore 2022',
        ],
        top_no: [
          'Hi, there. I believe you are also a deep learning enthusiast',
          'Although we just met, it must be common interests that gather us here',
          'Every line of code we write will be a source of inspiration',
          'Every program we build will make our world more intelligent',
        ],
        bottom_no: [
          'Every instruction and every message we send will make dreams come true',
          'Click here',
          "Let's get to know each other",
        ],
      },
      page3: {
        id: 3,
        top: ['Thanks to your support', 'In 2022 MindSpore has:'],
        middle: [
          {
            value: `Released <span class="active">3</span> new versions`,
            key: '1',
          },
          {
            value: `Introduced <span class="active">24</span> new features`,
            key: '1',
          },
          {
            value: `Received <span class="active">${posterData.value.issue_num}</span> issues and <span class="active">${posterData.value.pr_num}</span> PRs`,
            key: posterData.value.pr_num,
          },
          {
            value: `Surpassed <span class="active">3558682</span> downloads`,
            key: '3558682',
          },
          {
            value: `Worked with over <span class="active">21188</span> developers`,
            key: '21188',
          },
          {
            value: `Served developers in <span class="active">142</span> countries/regions and <span class="active">1879</span> cities`,
            key: '142',
          },
        ],
        bottom: [
          'Developed a new one-stop MindSpore Foundation Model Platform,',
          'which allows developers to experience foundation model inference tasks online, with the help of the community',
          `Released <span class="active">7</span> foundation models`,
          `Initiated <span class="active">160</span> MSG series activities involving developers from <span class="active">2,042</span> enterprises and spanning <span class="active">8</span> industries, to infuse enterprises with AI`,
          `Made <span class="active">85</span> courses available, and partnered with student developers from <span class="active">36</span> universities on over <span class="active">300</span> projects with student developers, to bring MSG on campus`,
          `Discussed <span class="active">72</span> technical topics with developers from <span class="active">24</span> cities `,
          'Every new member has breathed new life into a vibrant open source community!',
        ],
        top_no: [
          'On March 28, 2020, MindSpore officially open sourced',
          "We've made lots of friends in just over two years",
        ],
        middle_no: [
          {
            value: `Released <span class="active">3</span> new versions`,
            key: '1',
          },
          {
            value: `Introduced <span class="active">24</span> new features`,
            key: '1',
          },
          {
            value: `Surpassed <span class="active">3558682</span> downloads`,
            key: '3558682',
          },
          {
            value: `Worked with over <span class="active">21188</span> developers`,
            key: '21188',
          },
          {
            value: `Served developers in <span class="active">142</span> countries/regions and <span class="active">1879</span> cities`,
            key: '142',
          },
        ],
        bottom_no: [
          'Developed a new one-stop MindSpore Foundation Model Platform,',
          'which allows developers to experience foundation model inference tasks online, with the help of the community',
          `Released <span class="active">7</span> foundation models`,
        ],
      },
      page4: {
        id: 4,
        top: [
          `Hi, <span class="active">${posterData.value.user_login}</span>, as of December 31, 2022 at 24:00`,
        ],
        bottom: [
          {
            value: `We've met for <span class="active">${transformTime(
              posterData.value.first_time_of_enter
            )}</span> days`,
            key: transformTime(posterData.value.first_time_of_enter),
          },
          {
            value: "This year, you've",
            key: '1',
          },
          {
            value: `Forked <span class="active">${posterData.value.star_num}</span> repos`,
            key: posterData.value.star_num,
          },
          {
            value: `Raised <span class="active">${posterData.value.issue_num}</span> issues`,
            key: posterData.value.issue_num,
          },
          {
            value: `Submitted <span class="active">${posterData.value.pr_num}</span> PRs`,
            key: posterData.value.pr_num,
          },
          {
            value: `This year, you've interacted the most with <span class="active">${posterData.value.user_login_with_most_contact}</span>`,
            key: posterData.value.user_login_with_most_contact,
          },
          {
            value: `<span class="active">${posterData.value.first_user_of_be_comment}</span> solved the first issue of the year for you`,
            key: posterData.value.first_user_of_be_comment,
          },
          {
            value: `You've made <span class="active">${monthData.value.count}</span> contributions in ${monthData.value.month} this year`,
            key: monthData.value.count,
          },
          {
            value: `Up to now, you've contributed <span class="active">${transformTime(
              posterData.value.first_time_of_enter
            )}</span> days to the community`,
            key: transformTime(posterData.value.first_time_of_enter),
          },
          // {
          //   value: `On <span class="active">${monthData.value.month}</span> you explored the MindSpore community until <span class="active">${monthData.value.count}</span>`,
          //   key: monthData.value.count,
          // },
          {
            value: `On date<span class="active">${posterData.value.time_of_register_xihe}</span>, you registered the MindSpore Foundation Model Platform for the first time under the new name <span class="active">${posterData.value.username}</span>`,
            key: posterData.value.username,
          },
          {
            value: 'Looking forward to seeing you again in 2023!',
            key: '1',
          },
        ],
        top_no: [
          `Initiated <span class="active">160</span> MSG series activities involving developers from <span class="active">2,042</span> enterprises and spanning <span class="active">8</span> industries, to infuse enterprises with AI`,
          `Made <span class="active">85</span> courses available, and partnered with student developers from <span class="active">36</span> universities on over <span class="active">300</span> projects with student developers, to bring MSG on campus`,
          `Discussed <span class="active">72</span> technical topics with developers from <span class="active">24</span> cities `,
        ],
        bottom_no: [
          'In 2023, we hope to gather more developers to build the community',
          'Together we can achieve more!',
        ],
      },
      page5: {
        id: 5,
        top: [
          'Time flies',
          'A year has gone by in the blink of an eye',
          'In the new year',
          'The MindSpore community will continue to grow and learn',
          'With the release of new and more powerful versions',
        ],
        bottom: [
          'We appreciate your support in 2022',
          'And can’t wait to see what 2023 will bring!',
        ],
        top_no: [
          'The old has gone, the new is here!',
          'Looking forward to 2023 with you',
        ],
        bottom_no: ['We wish you', 'Stay safe and healthy', 'Happy new year!'],
      },
    },
  };
});

// const params = ref({
//   community: 'opengauss',
//   user: 'zhongjun2' || 'liyang0608',
//   year: '2022',
// });
const params = ref({
  community: 'opengauss',
  user: 'liyang0608',
  year: '2022',
});

const wrapper = ref<HTMLElement | null>(null);

BScroll.use(Slide);

const isContributor = ref(true);
const posterData: any = ref({});
const monthData: any = ref({});
const registerTime = ref([]);

async function getPosterDataFun() {
  await getPosterData(params.value).then((res) => {
    if (res.code === 200 && res.data.length) {
      isContributor.value = true;
      posterData.value = res.data[0];
      if (res.data[0].time_of_register_xihe) {
        registerTime.value = splitTime(res.data[0].time_of_register_xihe);
      }
    } else {
      isContributor.value = false;
    }
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
const clickCount = ref(0);

function transformTime(time: string) {
  const date = new Date(time);
  const lastTime = date.valueOf();
  const currentTime = new Date().valueOf();
  const days = Math.floor((currentTime - lastTime) / (1000 * 60 * 60 * 24));

  return days;
}

function splitTime(data: any) {
  const d1 = data.split(' ');
  const d2 = d1[0].split('/');
  return d2;
}

onMounted(async () => {
  // 必须先确定是否为贡献者
  await getPosterDataFun();
  getMonthountFun();

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

function goStart() {
  slide.scrollToElement('.pg-3', 500, 0, 0);
}
const isShowStar = ref(false);

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
  clickCount.value++;
  if (clickCount.value > 1) {
    isShowStar.value = !isShowStar.value;
  }
}

onUnmounted(() => {
  if (slide) {
    slide.destroy();
  }
});
</script>

<template>
  <div v-if="screenWidth > 1200" class="pc-post" @click="pcClick">
    <div class="contribution">
      <div class="container box-1">
        <div class="front">
          <img class="bg-imgage" src="@/assets/pc-bg1.png" alt="" />
        </div>

        <div class="back">
          <div class="content-1 pg-2" :class="clickCount > 1 ? 'current' : ''">
            <img class="star-1" src="@/assets/star.png" alt="" />
            <img class="ship-pc" src="@/assets/ship.png" alt="" />
            <img
              v-if="isShowStar"
              class="star-2"
              src="@/assets/star2.png"
              alt=""
            />
            <img class="blue-halo" src="@/assets/blue-halo.png" alt="" />

            <div v-if="isContributor" class="pg2-main">
              <div class="pg2-top">
                <p v-for="item in mindsporeData[lang].page2.top" :key="item">
                  {{ item }}
                </p>
              </div>

              <div class="pg2-bottom">
                <p v-for="item in mindsporeData[lang].page2.bottom" :key="item">
                  {{ item }}
                </p>
              </div>
            </div>

            <div v-else class="pg2-main">
              <div class="pg2-top">
                <p v-for="item in mindsporeData[lang].page2.top_no" :key="item">
                  {{ item }}
                </p>
              </div>

              <div class="pg2-bottom">
                <p
                  v-for="item in mindsporeData[lang].page2.bottom_no"
                  :key="item"
                >
                  {{ item }}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="container box-2">
        <div class="front">
          <img class="bg-imgage" src="@/assets/pc-bg2.png" alt="" />
        </div>
        <div class="back">
          <div class="content-2 pg-3" :class="clickCount > 1 ? 'current' : ''">
            <img class="earth-pc" src="@/assets/earth.png" alt="" />
            <img class="earth-circle" src="@/assets/earth-circle.png" alt="" />
            <img class="point-1" src="@/assets/point-1.png" alt="" />
            <img class="point-2" src="@/assets/point-2.png" alt="" />
            <img class="point-3" src="@/assets/point-3.png" alt="" />
            <img class="point-4" src="@/assets/point-4.png" alt="" />

            <div v-if="isContributor" class="pg3-main">
              <div class="pg3-main-top">
                <p v-for="item in mindsporeData[lang].page3.top" :key="item">
                  {{ item }}
                </p>
              </div>

              <div class="pg3-main-middle">
                <p
                  v-for="item in mindsporeData[lang].page3.middle"
                  :key="item.value"
                >
                  <span
                    v-if="item.key && item.key !== '0'"
                    v-html="item.value"
                  ></span>
                </p>
              </div>

              <div class="pg3-main-bottom">
                <p
                  v-for="item in mindsporeData[lang].page3.bottom"
                  :key="item"
                  v-html="item"
                ></p>
              </div>
            </div>

            <div v-else class="pg3-main">
              <div class="pg3-main-top">
                <p v-for="item in mindsporeData[lang].page3.top_no" :key="item">
                  {{ item }}
                </p>
              </div>

              <div class="pg3-main-middle">
                <p
                  v-for="item in mindsporeData[lang].page3.middle_no"
                  :key="item.value"
                >
                  <span
                    v-if="item.key && item.key !== '0'"
                    v-html="item.value"
                  ></span>
                </p>
              </div>

              <div class="pg3-main-bottom">
                <p
                  v-for="item in mindsporeData[lang].page3.bottom_no"
                  :key="item"
                  v-html="item"
                ></p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="container box-3">
        <div class="front">
          <img class="bg-imgage" src="@/assets/pc-bg3.png" alt="" />
        </div>
        <div class="back">
          <div class="content-3 pg-4" :class="clickCount > 1 ? 'current' : ''">
            <img
              class="pg4-architecture"
              src="@/assets/architecture.png"
              alt=""
            />
            <img class="pg4-people" src="@/assets/people.png" alt="" />
            <img
              class="pg4-architecture-light"
              src="@/assets/architecture-light.png"
              alt=""
            />
            <img
              class="pg4-door-light-1"
              src="@/assets/door-light-1.png"
              alt=""
            />
            <img
              class="pg4-door-light-2"
              src="@/assets/door-light-2.png"
              alt=""
            />
            <img class="pg4-door-num-1" src="@/assets/door-num-1.png" alt="" />
            <img class="pg4-door-num-2" src="@/assets/door-num-2.png" alt="" />
            <img class="pg4-people-bg2" src="@/assets/people-bg2.png" alt="" />
            <img class="pg4-people-bg1" src="@/assets/people-bg1.png" alt="" />

            <div class="pg4-track-left">
              <img
                class="pg4-track-left-1"
                src="@/assets/track-left.png"
                alt=""
              />
            </div>

            <div class="pg4-track-right">
              <img
                class="pg4-track-right-1"
                src="@/assets/track-right.png"
                alt=""
              />
            </div>

            <div v-if="isContributor" class="pg4-main">
              <div class="pg4-main-top">
                <p v-for="item in mindsporeData[lang].page4.top" :key="item">
                  <span v-html="item"></span>
                </p>
              </div>
              <div class="pg4-main-bottom">
                <p
                  v-for="item in mindsporeData[lang].page4.bottom"
                  :key="item.value"
                >
                  <span
                    v-if="item.key && item.key !== '0'"
                    v-html="item.value"
                  ></span>
                </p>
              </div>
            </div>

            <div v-else class="pg4-main">
              <div class="pg4-main-top">
                <p
                  v-for="item in mindsporeData[lang].page4.top_no"
                  :key="item"
                  v-html="item"
                ></p>
              </div>

              <div class="pg4-main-bottom">
                <p
                  v-for="item in mindsporeData[lang].page4.bottom_no"
                  :key="item"
                  v-html="item"
                ></p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="container box-4">
        <div class="front">
          <img class="bg-imgage" src="@/assets/pc-bg4.png" alt="" />
        </div>
        <div class="back">
          <div class="content-4 pg-5" :class="clickCount > 1 ? 'current' : ''">
            <img class="pg5-clock" src="@/assets/clock.png" alt="" />
            <img class="pg5-sun" src="@/assets/sun.png" alt="" />
            <img class="pg5-sunshine" src="@/assets/sunshine.png" alt="" />
            <img class="pg5-cloud-left" src="@/assets/cloud-left.png" alt="" />
            <img
              class="pg5-cloud-right"
              src="@/assets/cloud-right.png"
              alt=""
            />
            <div v-if="isContributor" class="pg5-main">
              <div class="pg5-main-top">
                <p
                  v-for="item in mindsporeData[lang].page5.top"
                  :key="item"
                  v-html="item"
                ></p>
              </div>

              <div class="pg5-main-bottom">
                <p
                  v-for="item in mindsporeData[lang].page5.bottom"
                  :key="item"
                  v-html="item"
                ></p>
              </div>
            </div>

            <div v-else class="pg5-main">
              <div class="pg5-main-top">
                <p
                  v-for="item in mindsporeData[lang].page5.top_no"
                  :key="item"
                  v-html="item"
                ></p>
              </div>

              <div class="pg5-main-bottom">
                <p
                  v-for="item in mindsporeData[lang].page5.bottom_no"
                  :key="item"
                  v-html="item"
                ></p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>

  <div v-else ref="wrapper" class="slide-wrapper">
    <div class="slide-content">
      <div class="slide-page pg-1" :class="currentPage === 0 ? 'current' : ''">
        <img
          v-if="lang === 'zh'"
          class="title"
          src="@/assets/title.png"
          alt=""
        />
        <img v-else class="title" src="@/assets/title-en.png" alt="" />

        <img class="light" src="@/assets/light.png" alt="" />

        <img
          v-if="lang === 'zh'"
          class="machine"
          src="@/assets/machine.png"
          alt=""
        />
        <img v-else class="machine" src="@/assets/machine-en.png" alt="" />

        <p class="start-intro">{{ mindsporeData[lang].page1.start }}</p>

        <img class="glass" src="@/assets/glass.png" alt="" />
        <img class="card" src="@/assets/card.png" alt="" />
        <img class="middle-light" src="@/assets/middle-light.png" alt="" />
        <img class="middle-block" src="@/assets/middle-block.png" alt="" />

        <div class="slide-top">
          <img src="@/assets/arrow.png" alt="" />
          <p>{{ mindsporeData[lang].page1.slide }}</p>
        </div>
      </div>

      <div class="slide-page pg-2" :class="currentPage === 1 ? 'current' : ''">
        <img class="star-1" src="@/assets/star.png" alt="" />
        <img class="ship" src="@/assets/ship.png" alt="" />
        <img class="star-2" src="@/assets/star2.png" alt="" />
        <img class="blue-halo" src="@/assets/blue-halo.png" alt="" />
        <img
          v-if="lang === 'zh'"
          class="start-btn"
          src="@/assets/start-btn.png"
          alt=""
          @click.stop="goStart"
        />
        <img
          v-else
          class="start-btn"
          src="@/assets/start-btn-en.png"
          alt=""
          @click.stop="goStart"
        />

        <img class="ship-light-1" src="@/assets/ship-light01.png" alt="" />
        <img class="ship-light-2" src="@/assets/ship-light02.png" alt="" />

        <div v-if="isContributor" class="pg2-main">
          <div class="pg2-top">
            <p v-for="item in mindsporeData[lang].page2.top" :key="item">
              {{ item }}
            </p>
          </div>

          <div class="pg2-bottom">
            <p v-for="item in mindsporeData[lang].page2.bottom" :key="item">
              {{ item }}
            </p>
          </div>
        </div>

        <div v-else class="pg2-main">
          <div class="pg2-top">
            <p v-for="item in mindsporeData[lang].page2.top_no" :key="item">
              {{ item }}
            </p>
          </div>

          <div class="pg2-bottom">
            <p v-for="item in mindsporeData[lang].page2.bottom_no" :key="item">
              {{ item }}
            </p>
          </div>
        </div>
      </div>

      <div class="slide-page pg-3" :class="currentPage === 2 ? 'current' : ''">
        <img class="earth" src="@/assets/earth.png" alt="" />
        <img class="earth-circle" src="@/assets/earth-circle.png" alt="" />
        <img class="point-1" src="@/assets/point-1.png" alt="" />
        <img class="point-2" src="@/assets/point-2.png" alt="" />
        <img class="point-3" src="@/assets/point-3.png" alt="" />
        <img class="point-4" src="@/assets/point-4.png" alt="" />

        <div v-if="isContributor" class="pg3-main">
          <div class="pg3-main-top">
            <p v-for="item in mindsporeData[lang].page3.top" :key="item">
              {{ item }}
            </p>
          </div>

          <div class="pg3-main-middle">
            <p
              v-for="item in mindsporeData[lang].page3.middle"
              :key="item.value"
            >
              <span
                v-if="item.key && item.key !== '0'"
                v-html="item.value"
              ></span>
            </p>
          </div>

          <div class="pg3-main-bottom">
            <p
              v-for="item in mindsporeData[lang].page3.bottom"
              :key="item"
              v-html="item"
            ></p>
          </div>
        </div>

        <div v-else class="pg3-main">
          <div class="pg3-main-top">
            <p v-for="item in mindsporeData[lang].page3.top_no" :key="item">
              {{ item }}
            </p>
          </div>

          <div class="pg3-main-middle">
            <p
              v-for="item in mindsporeData[lang].page3.middle_no"
              :key="item.value"
            >
              <span
                v-if="item.key && item.key !== '0'"
                v-html="item.value"
              ></span>
            </p>
          </div>

          <div class="pg3-main-bottom">
            <p
              v-for="item in mindsporeData[lang].page3.bottom_no"
              :key="item"
              v-html="item"
            ></p>
          </div>
        </div>

        <div class="pg3-slide">
          <img src="@/assets/arrow.png" alt="" />
          <p>{{ mindsporeData[lang].page1.slide }}</p>
        </div>
      </div>

      <div class="slide-page pg-4" :class="currentPage === 3 ? 'current' : ''">
        <img class="pg4-architecture" src="@/assets/architecture.png" alt="" />
        <img class="pg4-people" src="@/assets/people.png" alt="" />
        <img
          class="pg4-architecture-light"
          src="@/assets/architecture-light.png"
          alt=""
        />
        <img class="pg4-door-light-1" src="@/assets/door-light-1.png" alt="" />
        <img class="pg4-door-light-2" src="@/assets/door-light-2.png" alt="" />
        <img class="pg4-door-num-1" src="@/assets/door-num-1.png" alt="" />
        <img class="pg4-door-num-2" src="@/assets/door-num-2.png" alt="" />
        <img class="pg4-people-bg2" src="@/assets/people-bg2.png" alt="" />
        <img class="pg4-people-bg1" src="@/assets/people-bg1.png" alt="" />

        <div class="pg4-track-left">
          <img class="pg4-track-left-1" src="@/assets/track-left.png" alt="" />
        </div>

        <div class="pg4-track-right">
          <img
            class="pg4-track-right-1"
            src="@/assets/track-right.png"
            alt=""
          />
        </div>

        <div class="pg4-slide">
          <img src="@/assets/arrow.png" alt="" />
          <p>{{ mindsporeData[lang].page1.slide }}</p>
        </div>

        <div v-if="isContributor" class="pg4-main">
          <div class="pg4-main-top">
            <p v-for="item in mindsporeData[lang].page4.top" :key="item">
              <span v-html="item"></span>
            </p>
          </div>
          <div class="pg4-main-bottom">
            <p
              v-for="item in mindsporeData[lang].page4.bottom"
              :key="item.value"
            >
              <span
                v-if="item.key && item.key !== '0'"
                v-html="item.value"
              ></span>
            </p>
          </div>
        </div>

        <div v-else class="pg4-main">
          <div class="pg4-main-top">
            <p
              v-for="item in mindsporeData[lang].page4.top_no"
              :key="item"
              v-html="item"
            ></p>
          </div>

          <div class="pg4-main-bottom">
            <p
              v-for="item in mindsporeData[lang].page4.bottom_no"
              :key="item"
              v-html="item"
            ></p>
          </div>
        </div>
      </div>

      <div class="slide-page pg-5" :class="currentPage === 4 ? 'current' : ''">
        <img class="pg5-clock" src="@/assets/clock.png" alt="" />
        <img class="pg5-sun" src="@/assets/sun.png" alt="" />
        <img class="pg5-sunshine" src="@/assets/sunshine.png" alt="" />
        <img class="pg5-cloud-left" src="@/assets/cloud-left.png" alt="" />
        <img class="pg5-cloud-right" src="@/assets/cloud-right.png" alt="" />

        <div v-if="isContributor" class="pg5-main">
          <div class="pg5-main-top">
            <p
              v-for="item in mindsporeData[lang].page5.top"
              :key="item"
              v-html="item"
            ></p>
          </div>

          <div class="pg5-main-bottom">
            <p
              v-for="item in mindsporeData[lang].page5.bottom"
              :key="item"
              v-html="item"
            ></p>
          </div>
        </div>

        <div v-else class="pg5-main">
          <div class="pg5-main-top">
            <p
              v-for="item in mindsporeData[lang].page5.top_no"
              :key="item"
              v-html="item"
            ></p>
          </div>

          <div class="pg5-main-bottom">
            <p
              v-for="item in mindsporeData[lang].page5.bottom_no"
              :key="item"
              v-html="item"
            ></p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss">
#app {
  width: 100vw;
  height: 100vh;
}

// ipad 适配
@media screen and (min-width: 768px) {
  html {
    font-size: 110px !important;
  }
}

p {
  line-height: 24px;
  font-size: 12px;
  text-align: center;
  color: #ffffff;
}

.active {
  font-size: 12px;
  font-weight: 500;
  color: rgb(252, 224, 101);
  margin: 0 4px;
}

// 滑到页面才触发动画
.current {
  // pg-2
  .ship {
    // :TODO:调整速度
    animation: to-right 1s 0.4s 1 linear,
      to-top 1s 0.4s 1 cubic-bezier(0.23, 0.88, 0.67, 0.26);
    animation-fill-mode: forwards;
  }

  .ship-pc {
    animation: to-right 1s 0.4s 1 linear,
      to-top1 1s 0.4s 1 cubic-bezier(0.23, 0.88, 0.67, 0.26);
    animation-fill-mode: forwards;
  }

  .star-1 {
    animation-name: appear;
    animation-delay: 1.5s;
    animation-timing-function: ease-in-out;
    animation-iteration-count: 1;
    animation-duration: 1s;
    animation-fill-mode: forwards;
  }

  .start-btn {
    animation-name: appear;
    animation-delay: 4s;
    animation-duration: 1s;
    animation-iteration-count: 1;
    animation-timing-function: ease-in-out;
    animation-fill-mode: forwards;
    z-index: 9;
  }

  .ship-light-1,
  .ship-light-2 {
    animation-name: appear;
    animation-delay: 1.5s;
    animation-duration: 0.5s;
    animation-fill-mode: forwards;
  }

  .pg2-top {
    animation-name: appear;
    animation-delay: 2s;
    animation-duration: 1s;
    animation-timing-function: linear;
    animation-fill-mode: forwards;
  }

  .pg2-bottom {
    animation-name: appear;
    animation-delay: 3s;
    animation-duration: 1s;
    animation-timing-function: linear;
    animation-fill-mode: forwards;
  }

  .earth {
    animation: erath-x 1s 0.4s 1 ease-in, erath-y 1s 0.4s 1 linear;
    animation-fill-mode: forwards;
  }
  .earth-pc {
    animation: erath-x1 1s 0.4s 1 ease-in, erath-y1 1s 0.4s 1 linear;
    animation-fill-mode: forwards;
  }

  .earth-circle {
    animation-name: appear;
    animation-delay: 1.5s;
    animation-duration: 0.5s;
    animation-timing-function: ease-in;
    animation-iteration-count: 1;
    animation-fill-mode: forwards;
  }

  .point-1 {
    animation-name: appear;
    animation-delay: 2s;
    animation-duration: 1s;
    animation-timing-function: ease-in;
    animation-iteration-count: 1;
    animation-fill-mode: forwards;
  }

  .point-2 {
    animation-name: appear;
    animation-delay: 3s;
    animation-duration: 1s;
    animation-timing-function: ease-in;
    animation-iteration-count: 1;
    animation-fill-mode: forwards;
  }

  .point-3 {
    animation-name: appear;
    animation-delay: 4s;
    animation-duration: 1s;
    animation-timing-function: ease-in;
    animation-iteration-count: 1;
    animation-fill-mode: forwards;
  }

  .point-4 {
    animation-name: appear;
    animation-delay: 5s;
    animation-duration: 1s;
    animation-timing-function: ease-in;
    animation-iteration-count: 1;
    animation-fill-mode: forwards;
  }

  .pg3-main-top {
    animation-name: appear;
    animation-delay: 2s;
    animation-duration: 1s;
    animation-timing-function: ease;
    animation-fill-mode: forwards;
  }

  .pg3-main-middle {
    animation-name: appear;
    animation-delay: 3s;
    animation-duration: 1s;
    animation-timing-function: ease;
    animation-fill-mode: forwards;
  }

  .pg3-main-bottom {
    animation-name: appear;
    animation-delay: 4s;
    animation-duration: 1s;
    animation-timing-function: ease;
    animation-fill-mode: forwards;
  }

  .pg3-slide,
  .pg4-slide {
    img {
      animation-name: move;
      animation-duration: 1.5s;
      animation-iteration-count: infinite;
      animation-timing-function: ease-in-out;
    }
  }

  // pg-4
  .pg4-main-top {
    animation-name: appear;
    animation-duration: 1s;
    animation-delay: 2s;
    animation-iteration-count: 1;
    animation-timing-function: linear;
    animation-fill-mode: forwards;
  }

  .pg4-main-bottom {
    animation-name: appear;
    animation-duration: 1s;
    animation-delay: 3s;
    animation-iteration-count: 1;
    animation-timing-function: linear;
    animation-fill-mode: forwards;
  }

  .pg4-architecture,
  .pg4-people {
    animation-name: appear;
    animation-duration: 1s;
    animation-iteration-count: 1;
    animation-timing-function: ease-in;
    animation-fill-mode: forwards;
  }
  .pg4-architecture-light {
    animation-name: appear-pg3;
    animation-delay: 1s;
    animation-duration: 2s;
    animation-iteration-count: 1;
    animation-timing-function: ease-in-out;
    animation-fill-mode: forwards;
  }
  .pg4-door-light-1,
  .pg4-door-light-2 {
    animation-name: appear;
    animation-delay: 1s;
    animation-duration: 1s;
    animation-iteration-count: 1;
    animation-timing-function: ease-in-out;
    animation-fill-mode: forwards;
  }

  .pg4-door-num-1,
  .pg4-door-num-2 {
    animation-name: appear;
    animation-delay: 1.3s;
    animation-duration: 1s;
    animation-iteration-count: 1;
    animation-timing-function: ease-in-out;
    animation-fill-mode: forwards;
  }

  .pg4-people-bg1 {
    animation-name: appear;
    animation-duration: 1s;
    animation-delay: 0.5s;
    animation-iteration-count: 1;
    animation-timing-function: ease-in;
    animation-fill-mode: forwards;
  }

  .pg4-people-bg2 {
    animation-name: appear;
    animation-duration: 1s;
    animation-delay: 1s;
    animation-iteration-count: 1;
    animation-timing-function: ease-in;
    animation-fill-mode: forwards;
  }

  .pg4-track-left-1 {
    animation: track1-right 3s 2s 1 linear, track1-top 3s 2s 1 linear;
    animation-fill-mode: forwards;
  }

  .pg4-track-right {
    animation-name: appear;
    animation-duration: 1s;
    animation-timing-function: ease-in-out;
    animation-fill-mode: forwards;
  }

  .pg4-track-right-1 {
    animation: track2-left 3s 2s 1 linear, track2-top 3s 2s 1 linear;
    animation-fill-mode: forwards;
  }

  // pg-5
  .pg5-clock {
    animation: clock-left 1s 1s 1 ease-in, clock-top 1s 1s 1 ease-in;
    animation-fill-mode: forwards;
  }

  .pg5-sun {
    animation: sun-left 1s 0s 1 cubic-bezier(0.15, 0.76, 0.25, 0.86),
      sun-top 1s 0s 1 linear;
    animation-fill-mode: forwards;
  }

  .pg5-sunshine {
    animation: appear 1s 2s 1 ease-in;
    animation-fill-mode: forwards;
  }

  .pg5-cloud-left {
    animation-name: colud-right;
    animation-duration: 1s;
    animation-delay: 3s;
    animation-iteration-count: 1;
    animation-timing-function: ease-in;
    animation-fill-mode: forwards;
  }

  .pg5-cloud-right {
    animation-name: colud-left;
    animation-duration: 1s;
    animation-delay: 3s;
    animation-iteration-count: 1;
    animation-timing-function: ease-in;
    animation-fill-mode: forwards;
  }

  .pg5-main-top {
    animation-name: appear;
    animation-duration: 1s;
    animation-delay: 2s;
    animation-iteration-count: 1;
    animation-timing-function: linear;
    animation-fill-mode: forwards;
  }

  .pg5-main-bottom {
    animation-name: appear;
    animation-duration: 1s;
    animation-delay: 3s;
    animation-iteration-count: 1;
    animation-timing-function: linear;
    animation-fill-mode: forwards;
  }
}
.slide-wrapper {
  width: 100vw;
  height: 100vh;
  position: relative;
  overflow: hidden;
  .slide-content {
    width: 100vw;
    .slide-page {
      width: 100vw;
      height: 100vh;
      overflow: hidden;
      background-size: cover;
    }
    @for $i from 1 through 5 {
      .pg-#{ $i} {
        background-image: url('@/assets/bg#{$i}.jpg');
      }
    }
    .pg-1 {
      position: relative;
      .title {
        width: 247px;
        height: 78px;
        position: absolute;
        top: 75px;
        left: 50%;
        transform: translateX(-50%);
        z-index: 9;
      }
      .machine {
        width: 390px;
        position: absolute;
        bottom: 0;
        left: -15px;
        @media screen and (min-width: 768px) {
          left: 50%;
          transform: translateX(-50%);
        }
        @media screen and (max-height: 738px) {
          bottom: -100px;
        }
      }
      .light {
        width: 312px;
        position: absolute;
        bottom: 124px;
        left: 18px;
        animation-name: fade;
        animation-duration: 2s;
        animation-iteration-count: infinite;
        animation-timing-function: ease-in;
        @media screen and (min-width: 768px) {
          left: 49%;
          transform: translateX(-50%);
        }
        @media screen and (max-height: 738px) {
          bottom: 24px;
        }
      }
      .start-intro {
        font-size: 16px;
        font-weight: 500;
        color: #ffffff;
        height: 16px;
        position: absolute;
        bottom: 108px;
        left: 50%;
        transform: translateX(-50%);
        z-index: 9;
      }
      .slide-top {
        position: absolute;
        bottom: 32px;
        left: 50%;
        transform: translateX(-50%);
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        opacity: 0;
        animation-name: slide-up;
        animation-duration: 1.5s;
        animation-delay: 2s;
        animation-timing-function: ease-in-out;
        animation-fill-mode: forwards;
        img {
          width: 20px;
          height: 25px;
          animation-name: move;
          animation-delay: 3.5s;
          animation-duration: 1.5s;
          animation-iteration-count: infinite;
          animation-timing-function: ease-in-out;
        }
        p {
          font-size: 12px;
          font-weight: 400;
          margin-top: 10px;
          color: #ffffff;
        }
      }
      .glass {
        position: absolute;
        bottom: 352px;
        left: 50%;
        transform: translateX(-50%);
        width: 228px;
        opacity: 0.3;
        @media screen and (max-height: 738px) {
          bottom: 250px;
        }
      }
      .card {
        width: 327px;
        position: absolute;
        bottom: 410px;
        left: calc(50vw - 163.5px);
        animation-name: card;
        animation-duration: 2s;
        animation-iteration-count: infinite;
        animation-timing-function: ease-in-out;
        @media screen and (max-height: 738px) {
          bottom: 300px;
        }
      }
      .middle-light {
        width: 90px;
        opacity: 0;
        position: absolute;
        bottom: 200px;
        left: 50%;
        transform: translateX(-50%);
        animation-name: middle-light;
        animation-duration: 2s;
        animation-iteration-count: infinite;
        @media screen and (max-height: 738px) {
          bottom: 100px;
        }
      }
      .middle-block {
        width: 24px;
        position: absolute;
        bottom: 206px;
        left: 50%;
        transform: translateX(-50%);
        @media screen and (max-height: 738px) {
          bottom: 106px;
        }
      }
    }

    .pg-2 {
      position: relative;
      .ship {
        width: 296px;
        height: 296px;
        position: absolute;
        left: -400px;
        bottom: 0;
        z-index: 9;
      }
      .star-1 {
        width: 84px;
        position: absolute;
        top: -16px;
        left: -16px;
        opacity: 0;
      }
      .star-2 {
        width: 156px;
        position: absolute;
        bottom: 358px;
        right: -64px;
        animation-name: star-rotate;
        animation-timing-function: cubic-bezier(0.57, 0.53, 0.66, 0.66);
        animation-duration: 2.5s;
        animation-iteration-count: infinite;
      }
      .blue-halo {
        width: 263px;
        position: absolute;
        right: -105px;
        bottom: 377px;
      }
      .start-btn {
        width: 173px;
        opacity: 0;
        position: absolute;
        bottom: 60px;
        left: 50%;
        transform: translateX(-50%);
      }
      .ship-light-1 {
        width: 176px;
        opacity: 0;
        position: absolute;
        bottom: 0px;
        left: -60px;
      }
      .ship-light-2 {
        width: 60px;
        opacity: 0;
        position: absolute;
        bottom: 150px;
        left: 155px;
      }

      .pg2-main {
        width: 100%;
        position: absolute;
        top: 49px;
        left: 50%;
        transform: translateX(-50%);
        z-index: 10;
        padding: 0 16px;
      }
      .pg2-top,
      .pg2-bottom {
        opacity: 0;
        p {
          line-height: 24px;
          font-size: 12px;
          text-align: center;
          color: #ffffff;
        }
      }
      .pg2-bottom {
        margin-top: 26px;
      }
    }

    .pg-3 {
      position: relative;
      .earth {
        width: 390px;
        position: absolute;
        bottom: 200px;
        right: -390px;
        transform: rotateZ(90deg);
      }
      .earth-circle {
        width: 510px;
        position: absolute;
        bottom: -200px;
        left: 50%;
        transform: translateX(-50%);
        opacity: 0;
      }
      .point-1 {
        width: 190px;
        position: absolute;
        bottom: 26px;
        left: 92px;
        opacity: 0;
        @media screen and (min-width: 768px) {
          left: 51%;
          transform: translateX(-50%);
        }
      }
      .point-2 {
        width: 297px;
        position: absolute;
        bottom: 62px;
        left: 28px;
        opacity: 0;
        @media screen and (min-width: 768px) {
          left: 49%;
          transform: translateX(-50%);
        }
      }
      .point-3 {
        width: 207px;
        position: absolute;
        bottom: 8px;
        left: 118px;
        opacity: 0;
        @media screen and (min-width: 768px) {
          left: 57%;
          transform: translateX(-50%);
        }
      }
      .point-4 {
        width: 297px;
        position: absolute;
        bottom: -48px;
        left: 38px;
        opacity: 0;
        @media screen and (min-width: 768px) {
          left: 51%;
          transform: translateX(-50%);
        }
      }
      .pg3-main {
        width: 100%;
        position: absolute;
        top: 50px;
        left: 50%;
        transform: translateX(-50%);
        padding: 0 16px;
        @media screen and (min-height: 375px) {
          // top: 30px;
          p {
            line-height: 21px;
          }
        }
        &-top {
          opacity: 0;
        }
        &-middle {
          opacity: 0;
          margin-top: 20px;
          @media screen and (min-height: 375px) {
            margin-top: 10px;
          }
        }
        &-bottom {
          opacity: 0;
          margin-top: 20px;
          @media screen and (min-height: 375px) {
            margin-top: 10px;
          }
        }
      }
      .pg3-slide {
        position: absolute;
        bottom: 24px;
        left: 50%;
        transform: translateX(-50%);
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        img {
          width: 22px;
          margin-bottom: 8px;
        }
      }
    }

    .pg-4 {
      position: relative;
      .pg4-main {
        width: 100%;
        padding: 0 16px;
        position: absolute;
        top: 51px;
        &-bottom {
          margin-top: 24px;
          opacity: 0;
        }

        &-top {
          opacity: 0;
        }
      }

      .pg4-architecture {
        width: 360px;
        position: absolute;
        bottom: -118px;
        opacity: 0;
        @media screen and (min-width: 768px) {
          left: 50%;
          transform: translateX(-50%);
        }
      }

      .pg4-people {
        width: 15px;
        position: absolute;
        bottom: 26px;
        left: 104px;
        opacity: 0;
        z-index: 9;
        @media screen and (min-width: 768px) {
          left: 220px;
          bottom: 26px;
        }
      }

      .pg4-architecture-light {
        width: 360px;
        position: absolute;
        bottom: 216px;
        opacity: 0;
        @media screen and (min-width: 768px) {
          left: 50%;
          transform: translateX(-50%);
        }
      }

      .pg4-door-light-1 {
        width: 13px;
        position: absolute;
        bottom: 42px;
        right: 66px;
        opacity: 0;
        @media screen and (min-width: 768px) {
          right: 189px;
          bottom: 43px;
        }
      }

      .pg4-door-light-2 {
        width: 54px;
        position: absolute;
        bottom: 22px;
        right: 66px;
        opacity: 0;
        @media screen and (min-width: 768px) {
          right: 189px;
          bottom: 22px;
        }
      }

      .pg4-door-num-1 {
        width: 37px;
        position: absolute;
        bottom: 40px;
        right: 66px;
        opacity: 0;
        @media screen and (min-width: 768px) {
          right: 189px;
          bottom: 42px;
        }
      }
      .pg4-door-num-2 {
        width: 24px;
        position: absolute;
        bottom: 50px;
        right: 66px;
        opacity: 0;
        @media screen and (min-width: 768px) {
          right: 189px;
          bottom: 52px;
        }
      }

      .pg4-people-bg2,
      .pg4-people-bg1 {
        width: 27px;
        position: absolute;
        left: 84px;
        bottom: 45px;
        opacity: 0;
        @media screen and (min-width: 768px) {
          left: 206px;
          bottom: 46px;
        }
      }

      .pg4-slide {
        position: absolute;
        bottom: 24px;
        left: 50%;
        transform: translateX(-50%);
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        img {
          width: 22px;
          margin-bottom: 8px;
        }
      }
      .pg4-track-left {
        position: absolute;
        width: 30px;
        height: 30px;
        bottom: 112px;
        left: 118px;
        overflow: hidden;
        @media screen and (min-width: 768px) {
          bottom: 110px;
          left: 241px;
        }
        &-1 {
          width: 38px;
          position: absolute;
          left: -38px;
          bottom: -16px;
        }
      }
      .pg4-track-right {
        position: absolute;
        width: 56px;
        height: 56px;
        right: 96px;
        bottom: 100px;
        overflow: hidden;
        opacity: 0;
        @media screen and (min-width: 768px) {
          right: 217px;
          bottom: 100px;
        }
        &-1 {
          width: 38px;
          position: absolute;
          left: 24px;
          bottom: 0;
        }
      }
    }

    .pg-5 {
      position: relative;
      .pg5-main {
        width: 100%;
        padding: 0 16px;
        position: absolute;
        top: 51px;
        z-index: 20;
        &-bottom {
          margin-top: 24px;
          opacity: 0;
        }
        &-top {
          opacity: 0;
        }
      }

      .pg5-clock {
        width: 450px;
        position: absolute;
        bottom: -268px;
        right: -450px;
        @media screen and (min-width: 768px) {
        }
      }

      .pg5-sun {
        height: 128px;
        position: absolute;
        right: -240px;
        bottom: -90px;
      }

      .pg5-sunshine {
        width: 360px;
        height: 100%;
        position: absolute;
        right: 0;
        z-index: 1;
        opacity: 0;
        @media screen and (min-width: 768px) {
          width: 100%;
        }
      }

      .pg5-cloud-left {
        height: 134px;
        position: absolute;
        left: -150px;
        top: 260px;
        opacity: 0;
      }

      .pg5-cloud-right {
        height: 74px;
        position: absolute;
        right: -80px;
        top: 68px;
        opacity: 0;
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
      transform: scale(1.2) translateY(-3px);
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

  @keyframes card {
    0% {
      transform: translateY(0px);
    }
    50% {
      transform: translateY(20px);
    }
    100% {
      transform: translateY(0px);
    }
  }

  @keyframes middle-light {
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

  @keyframes display-star {
    0% {
      display: none;
    }
    100% {
      display: block;
    }
  }
  // pg2
  @keyframes to-top {
    0% {
      bottom: 0px;
    }
    100% {
      bottom: 139px;
    }
  }

  @keyframes to-right {
    0% {
      left: -400px;
    }
    100% {
      left: -56px;
    }
  }

  @keyframes to-top1 {
    0% {
      bottom: 0px;
    }
    100% {
      bottom: 50px;
    }
  }

  @keyframes appear-pg3 {
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

  @keyframes appear {
    0% {
      opacity: 0;
    }
    100% {
      opacity: 1;
    }
  }

  @keyframes star-rotate {
    0% {
      transform: rotateZ(0deg);
    }

    100% {
      transform: rotateZ(360deg);
    }
  }

  // pg3
  @keyframes erath-x {
    //地球水平平移
    0% {
      right: -390px;
      transform: rotateZ(90deg);
    }
    100% {
      right: calc(50% - 195px);
      transform: rotateZ(-0deg);
    }
  }

  @keyframes erath-y {
    0% {
      bottom: 220px;
    }
    100% {
      bottom: -210px;
    }
  }
  @keyframes erath-x1 {
    //地球水平平移
    0% {
      right: -390px;
      transform: rotateZ(90deg);
    }
    100% {
      right: calc(50% - 142px);
      transform: rotateZ(-0deg);
    }
  }
  @keyframes erath-y1 {
    0% {
      bottom: 220px;
    }
    100% {
      bottom: -155px;
    }
  }

  // pg4
  @keyframes track1-right {
    0% {
      left: -38px;
    }
    100% {
      left: 14px;
    }
  }

  @keyframes track1-top {
    0% {
      bottom: -16px;
    }
    100% {
      bottom: 14px;
    }
  }

  @keyframes track2-left {
    0% {
      left: 24px;
    }
    100% {
      left: -20px;
    }
  }

  @keyframes track2-top {
    0% {
      bottom: 0px;
    }
    100% {
      bottom: 24px;
    }
  }

  // pg5
  @keyframes clock-left {
    0% {
      bottom: -268px;
    }
    100% {
      bottom: -94px;
    }
  }

  @keyframes clock-top {
    0% {
      right: -355px;
    }
    100% {
      right: 90px;
    }
  }

  @keyframes sun-left {
    0% {
      right: -240px;
    }

    100% {
      right: -130px;
    }
  }

  @keyframes sun-top {
    0% {
      bottom: -90px;
    }

    100% {
      bottom: 260px;
    }
  }

  @keyframes colud-right {
    0% {
      left: -150px;
      opacity: 0;
    }
    100% {
      left: -120px;
      opacity: 1;
    }
  }

  @keyframes colud-left {
    0% {
      right: -80px;
      opacity: 0;
    }
    100% {
      right: -60px;
      opacity: 1;
    }
  }
}
@for $i from 1 through 4 {
  .content-#{ $i} {
    width: 100%;
    height: 100%;
    background-image: url('@/assets/bg#{$i + 1}.jpg');
    background-size: cover;
  }
}
// pc端
.pc-post {
  height: 100vh;
  padding: 50px;
  @media screen and (max-width: 1460px) {
    padding: 24px;
  }

  p {
    font-size: 12px;
    line-height: 20px;
  }

  .pg-2 {
    position: relative;
    .ship-pc {
      width: 296px;
      height: 296px;
      position: absolute;
      left: -400px;
      bottom: 0;
      z-index: 9;
    }
    .star-1 {
      width: 84px;
      position: absolute;
      top: -16px;
      left: -16px;
      opacity: 0;
    }
    .star-2 {
      width: 156px;
      position: absolute;
      bottom: 358px;
      right: -64px;
      animation-name: star-rotate;
      animation-timing-function: cubic-bezier(0.57, 0.53, 0.66, 0.66);
      animation-duration: 2.5s;
      animation-iteration-count: infinite;
    }
    .blue-halo {
      width: 263px;
      position: absolute;
      right: -105px;
      bottom: 377px;
    }
    .start-btn {
      width: 173px;
      opacity: 0;
      position: absolute;
      bottom: 60px;
      left: 50%;
      transform: translateX(-50%);
    }
    .ship-light-1 {
      width: 176px;
      opacity: 0;
      position: absolute;
      bottom: -10px;
      left: -60px;
    }
    .ship-light-2 {
      width: 60px;
      opacity: 0;
      position: absolute;
      bottom: 140px;
      left: 155px;
    }

    .pg2-main {
      width: 100%;
      position: absolute;
      top: 49px;
      left: 50%;
      transform: translateX(-50%);
      z-index: 10;
      padding: 0 16px;
    }
    .pg2-top,
    .pg2-bottom {
      opacity: 0;
      p {
        line-height: 24px;
        font-size: 12px;
        text-align: center;
        color: #ffffff;
      }
    }
    .pg2-bottom {
      margin-top: 26px;
    }
  }

  .pg-3 {
    position: relative;
    .earth-pc {
      width: 390px;
      position: absolute;
      bottom: 200px;
      right: -390px;
      transform: rotateZ(90deg);
    }
    .earth-circle {
      width: 510px;
      position: absolute;
      bottom: -200px;
      left: -74px;
      // left: 50%;
      // transform: translateX(-50%);
      opacity: 0;
    }
    .point-1 {
      width: 190px;
      position: absolute;
      bottom: 26px;
      left: 92px;
      opacity: 0;
    }
    .point-2 {
      width: 297px;
      position: absolute;
      bottom: 62px;
      left: 28px;
      opacity: 0;
    }
    .point-3 {
      width: 207px;
      position: absolute;
      bottom: 8px;
      left: 118px;
      opacity: 0;
    }
    .point-4 {
      width: 297px;
      position: absolute;
      bottom: -48px;
      left: 38px;
      opacity: 0;
    }
    .pg3-main {
      width: 100%;
      position: absolute;
      top: 50px;
      left: 50%;
      transform: translateX(-50%);
      padding: 0 16px;

      &-top {
        opacity: 0;
      }
      &-middle {
        opacity: 0;
        margin-top: 20px;
      }
      &-bottom {
        opacity: 0;
        margin-top: 20px;
      }
    }
  }

  .pg-4 {
    position: relative;
    .pg4-main {
      width: 100%;
      padding: 0 16px;
      position: absolute;
      top: 51px;
      &-bottom {
        margin-top: 24px;
        opacity: 0;
      }

      &-top {
        opacity: 0;
      }
    }

    .pg4-architecture {
      width: 360px;
      position: absolute;
      bottom: -118px;
      opacity: 0;
    }

    .pg4-people {
      width: 15px;
      position: absolute;
      bottom: 26px;
      left: 104px;
      opacity: 0;
      z-index: 9;
    }

    .pg4-architecture-light {
      width: 360px;
      position: absolute;
      bottom: 216px;
      opacity: 0;
    }

    .pg4-door-light-1 {
      width: 13px;
      position: absolute;
      bottom: 42px;
      right: 66px;
      opacity: 0;
    }

    .pg4-door-light-2 {
      width: 54px;
      position: absolute;
      bottom: 22px;
      right: 66px;
      opacity: 0;
    }

    .pg4-door-num-1 {
      width: 37px;
      position: absolute;
      bottom: 40px;
      right: 66px;
      opacity: 0;
    }
    .pg4-door-num-2 {
      width: 24px;
      position: absolute;
      bottom: 50px;
      right: 66px;
      opacity: 0;
    }

    .pg4-people-bg2,
    .pg4-people-bg1 {
      width: 27px;
      position: absolute;
      left: 84px;
      bottom: 45px;
      opacity: 0;
    }

    .pg4-track-left {
      position: absolute;
      width: 30px;
      height: 30px;
      bottom: 112px;
      left: 118px;
      overflow: hidden;

      &-1 {
        width: 38px;
        position: absolute;
        left: -38px;
        bottom: -16px;
      }
    }
    .pg4-track-right {
      position: absolute;
      width: 56px;
      height: 56px;
      right: 96px;
      bottom: 100px;
      overflow: hidden;
      opacity: 0;
      &-1 {
        width: 38px;
        position: absolute;
        left: 24px;
        bottom: 0;
      }
    }
  }

  .pg-5 {
    position: relative;
    .pg5-main {
      width: 100%;
      padding: 0 16px;
      position: absolute;
      top: 51px;
      z-index: 20;
      &-bottom {
        margin-top: 24px;
        opacity: 0;
      }
      &-top {
        opacity: 0;
      }
    }

    .pg5-clock {
      width: 450px;
      position: absolute;
      bottom: -268px;
      right: -450px;
    }

    .pg5-sun {
      height: 128px;
      position: absolute;
      right: -240px;
      bottom: -90px;
    }

    .pg5-sunshine {
      width: 360px;
      height: 100%;
      position: absolute;
      right: 0;
      z-index: 1;
      opacity: 0;
    }

    .pg5-cloud-left {
      height: 134px;
      position: absolute;
      left: -150px;
      top: 260px;
      opacity: 0;
    }

    .pg5-cloud-right {
      height: 74px;
      position: absolute;
      right: -80px;
      top: 68px;
      opacity: 0;
    }
  }

  .contribution,
  .no-contribution {
    display: flex;
    margin: 0 auto;
    width: 100%;
    align-items: center;
    justify-content: space-between;
    height: 100%;
  }

  .container {
    position: relative;
    max-width: 360px;
    width: 100%;
    max-height: 640px;
    height: 100%;
    overflow: hidden;
    .bg-imgage {
      width: 100%;
      max-height: 640px;
    }
  }

  .back {
    transform: rotateY(180deg);
    overflow: hidden;
  }
  .front {
    background-color: rgb(0, 47, 156);
    z-index: 10;
    background-position: -6px -2px;
    background-repeat: no-repeat;
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

  body {
    overflow: hidden;
    width: 100%;
    height: 100%;
    text-align: center;
    font-size: 14px;
    color: white;
    background-color: white;
  }
}
</style>
