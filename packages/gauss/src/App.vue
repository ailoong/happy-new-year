<script setup lang="ts">
import { onMounted, ref, onUnmounted } from 'vue';
import BScroll from '@better-scroll/core';
import { BScrollInstance } from '@better-scroll/core';
import Slide from '@better-scroll/slide';

const wrapper = ref<HTMLElement | null>(null);

BScroll.use(Slide);
const isContributor = ref(false);

// const pageContent = ref([]);

let slide: BScrollInstance;
const currentPage = ref(0);

onMounted(() => {
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
});
function goStart() {
  slide.scrollToElement('.pg-2', 500, 0, 0);
}

onUnmounted(() => {
  slide.destroy();
});
</script>

<template>
  <div class="pc-post"></div>

  <div ref="wrapper" class="slide-wrapper">
    <div v-if="isContributor" class="slide-content contribution">
      <div
        class="slide-page wrapper-l pg-1"
        :class="currentPage === 0 ? 'current' : ''"
      >
        <div class="pg1-top">
          <p class="title">2022年度贡献报告</p>
          <p>你的点滴 【openGauss】全都记得......</p>
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
          <p class="fade-time-3">XXXXX（提取多少个日夜的数据）</p>
        </div>
        <div class="pg-2-main">
          <p class="fade-time-4">那是XX年XX月XX日</p>
          <p class="fade-time-5">我第一次遇见你</p>
          <p class="fade-time-6">至今，我们已经走过了XX个日夜</p>
          <p class="fade-time-7">感谢相遇，XXX(Gitee Name)这个名字我已经铭记</p>
          <p class="fade-time-8">在openGauss的开源世界</p>
          <p class="fade-time-9">每一次相遇，每一次陪伴，一定都是双向奔赴。</p>
        </div>
      </div>
      <div
        class="slide-page wrapper-m pg-4"
        :class="currentPage === 2 ? 'current' : ''"
      >
        <div class="mask">
          <p>这一年，你与XXX人建立了联系</p>
          <p>XXX，一定很特别，你们沟通最多，相信一定是志同道合的伙伴</p>
          <p>这一年，你参与了XXX次会议</p>
          <p>XXXX因你的每一次参与而变得不一样</p>
          <p>XX月XX日，你睡得很晚</p>
          <p>整个世界都休息了，你和openGauss还在继续</p>
          <p>黑夜给了你黑色的眼睛，感谢你用它分享智慧的光明</p>
          <p class="bold margin-top-h4">这些值得铭记的瞬间</p>
          <p class="bold">你一次次完成自我的深度探索</p>
          <p class="bold">找到了更加契合的伙伴</p>
        </div>
      </div>
      <div class="slide-page wrapper-m pg-5">
        <div class="mask">
          <p class="bold">你在2022这一年的时光里</p>
          <p class="margin-top-h4">贡献了XX行代码，</p>
          <p>提交了XX个PR，</p>
          <p>提出了XX个Issue，</p>
          <p>Star了XX个代码仓库，</p>
          <p>Fork了XX个代码仓库，</p>
          <p>Watch了XX个代码仓库，</p>
          <p>你对某行代码的好奇与关注，</p>
          <p>对某个问题的存疑亦或是认可，</p>
          <p>都代表了「你」看待这个数字世界的独特视角。</p>
        </div>
      </div>
      <div class="slide-page wrapper-m pg-6">
        <p class="bold">其实关于你的点滴</p>
        <p class="bold">「openGauss」 全都记得</p>
        <p class="font-size-tip margin-top-h4">你的2022年标签</p>
        <p class="active bold margin-top-h7">Level4</p>
        <p class="rank">前25%</p>
        <p>
          「浑然天成的当代缪斯」你积极思考、独到透彻、表达跳脱、openGauss因为有你而变得不一样！
        </p>
        <p class="margin-top-h4">
          感谢2022年的相遇、陪伴、沟通、成长
          2023，你相信如果可能，那么美好就一定会发生的。 雾霾散去，重见光明
          愿你元旦快乐。
        </p>
        <div class="logo-box margin-top-h4">
          <img
            src="https://www.openeuler.org/assets/code-xzs.28d49899.png"
            alt=""
          />
        </div>
      </div>
      <div class="slide-page wrapper-m pg-3 contribution-last">
        <div class="mask">
          <p>
            因为有<span class="active">4000+</span>个并肩同行的小伙伴一起战斗
          </p>
          <p>openGauss如期在2022年发布<span class="active">3个</span>版本</p>
          <p>
            你们的成果被<span class="active">96个</span>国家、<span
              class="active"
              >765个</span
            >城市下载应用
          </p>
          <p>吸引了超过<span class="active">200家</span>企业加入社区</p>
          <p>openGauss在国内<span class="active">14个</span>城市建立了用户组</p>
          <p>走进<span class="active">72所</span>高校</p>
          <p>并且举办了openGauss<span class="active">第1次</span>开发者大会</p>
        </div>
        <div class="mask margin-top-h4">
          <p>这是我们一起度过的春夏秋冬</p>
          <p>春季 你最专注于XXX</p>
          <p>夏季 你最专注于XXX</p>
          <p>秋季 你最专注于XXX</p>
          <p>冬季 你最专注于XXX</p>
          <p>感谢你在四季的时光里</p>
          <p>与openGauss保持同频 分享热爱 留下宝藏</p>
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
          <p>你的点滴 【openGauss】全都记得......</p>
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
          <p class="fade-time-3">XXXXX（提取多少个日夜的数据）</p>
        </div>
        <div class="pg-2-main">
          <p class="fade-time-4">那是XX年XX月XX日</p>
          <p class="fade-time-5">我第一次遇见你</p>
          <p class="fade-time-6">至今，我们已经走过了XX个日夜</p>
          <p class="fade-time-7">感谢相遇，XXX(Gitee Name)这个名字我已经铭记</p>
          <p class="fade-time-8">在openGauss的开源世界</p>
          <p class="fade-time-9">每一次相遇，每一次陪伴，一定都是双向奔赴。</p>
        </div>
      </div>
      <div
        class="slide-page wrapper-m pg-3"
        :class="currentPage === 2 ? 'current' : ''"
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
                下载量遍及全球<span class="active">96个</span>国家、<span
                  class="active"
                  >765个</span
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
                至今在国内<span class="active">14个</span>城市建立了用户组
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
          <div class="pg-3-bottom fade fade-time-21">
            <div class="pg-3-bottom-left">openGauss 星球</div>
            <div class="pg-3-bottom-right">
              <img
                src="https://www.openeuler.org/assets/code-xzs.28d49899.png"
                alt=""
              />
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
.active {
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

.font-size-tip {
  font-size: 12px;
}

#app {
  width: 100vw;
  height: 100vh;
}
.pc-post {
  font-size: 16px;
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
      .mask {
        border-radius: 4px;
        padding: 24px 16px;
        background: rgba(108, 11, 190, 0.6);
        border: 1px solid #471d9b;
      }
    }
    .wrapper-l {
      padding: 40px;
    }
    .wrapper-m {
      padding: 32px 24px;
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
      }
    }
    .pg-3 {
      height: 100%;
      .pg-3-mask {
        display: flex;
        flex-direction: column;
        justify-content: space-between;
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
          animation-name: fade;
          animation-fill-mode: forwards;
          // animation: fade ease-in-out forwards;
          &-right {
            width: 100px;
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
    .pg-4 {
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
    .pg-5 {
      .mask {
        margin-top: 76px;
        font-size: 13px;
        line-height: 26px;
        .bold {
          font-size: 20px;
          line-height: 34px;
        }
      }
    }
    .pg-6 {
      display: flex;
      flex-direction: column;
      justify-content: center;
      p {
        line-height: 20px;
        font-size: 13px;
      }
      .bold {
        font-size: 20px;
        line-height: 26px;
      }
      .active {
        font-size: 25px;
      }
      .rank {
        margin: 14px 0 22px;
        font-size: 16px;
      }
      .logo-box {
        margin-bottom: 40px;
      }
    }
    .contribution-last {
      font-size: 13px;
      line-height: 26px;
      .mask.margin-top-h4 {
        padding: 21px 16px;
        line-height: 28px;
        p:first-child {
          font-size: 15px;
        }
      }
      .active {
        font-size: 15px;
      }
      .mask:first-child {
        margin-top: 76px;
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
}
// 动效

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
    transform: translateY(24px);
  }
  100% {
    opacity: 1;
    transform: translateY(0px);
  }
}
</style>
