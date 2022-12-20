<script setup lang="ts">
import { onMounted, ref, onUnmounted } from 'vue';
import BScroll from '@better-scroll/core';
import { BScrollInstance } from '@better-scroll/core';
import Slide from '@better-scroll/slide';

const wrapper = ref<HTMLElement | null>(null);

BScroll.use(Slide);

let slide: BScrollInstance;

onMounted(() => {
  slide = new BScroll(wrapper.value as HTMLElement, {
    scrollX: false,
    scrollY: true,
    momentum: false,
    bounce: false,
    click: true,

    slide: {
      autoplay: false,
      loop: false,
      threshold: 100,
    },
    stopPropagation: true,
  });
});
function goStart() {
  slide.scrollToElement('.pg-2', 500, 0, 0);
}

onMounted(() => {
  // slide.destroy();
});
onUnmounted(() => {
  slide.destroy();
});
</script>

<template>
  <div ref="wrapper" class="slide-wrapper">
    <div class="slide-content">
      <div class="slide-page wrapper-l pg-1">
        <div class="pg1-top">
          <p class="title">2022年度贡献报告</p>
          <p>你的点滴 【openGauss】全都记得......</p>
        </div>
        <div class="pg1-buttom">
          <p>又是一年</p>
          <p>我们穿过时间的缝隙</p>
          <p>定格最特别的你</p>
          <div class="go-start" @click.stop="goStart">
            <span>生成</span> <span>报告</span>
          </div>
        </div>
      </div>
      <div class="slide-page wrapper-l pg-2">
        <div class="pg-2-top">
          <p>HI~很高兴遇见你！</p>
          <p>你的故事要从这个数字说起……</p>
          <p>XXXXX（提取多少个日夜的数据）</p>
        </div>
        <div class="pg-2-main">
          <p>那是XX年XX月XX日</p>
          <p>我第一次遇见你</p>
          <p>至今，我们已经走过了XX个日夜</p>
          <p>感谢相遇，XXX(Gitee Name)这个名字我已经铭记</p>
          <p>在openGauss的开源世界</p>
          <p>每一次相遇，每一次陪伴，一定都是双向奔赴。</p>
        </div>
      </div>
      <div class="slide-page wrapper-m pg-3">
        <div class="mask pg-3-mask">
          <div class="pg-3-main">
            <p>Hi，很高兴认识你</p>
            <p>欢迎来到openGauss 星球</p>
            <p>有些遗憾，在这之前我们错过了彼此，</p>
            <p>希望我们的故事可以从此刻开始……</p>
            <p>首先请让我为你介绍一下我自己</p>
            <p class="margin-top-h4">自2020年6月30日开源以来</p>
            <p>这里已经有超过<span class="active">10万+</span> 用户</p>
            <p>超过<span class="active">4000+</span>开发者并肩同行</p>
            <p>
              下载量遍及全球<span class="active">96个</span>国家、<span
                class="active"
                >765个</span
              >城市
            </p>
            <p>openGauss星球收到了<span class="active">8K+</span>个PR，</p>
            <p>
              <span class="active">8K+</span>个Issue，建立了<span class="active"
                >24个SIG</span
              >
            </p>
            <p>2022年，openGauss如期发布<span class="active">3个</span>版本</p>
            <p>吸引了超过<span class="active">200家</span>企业加入社区</p>
            <p>至今在国内<span class="active">14个</span>城市建立了用户组</p>
            <p>走进<span class="active">72所</span>高校</p>
            <p>
              并且举办了 openGauss <span class="active">第1次</span>开发者大会
            </p>
            <p class="margin-top-h4">我们坚信我们在做有趣且正确的事</p>
            <p>雾霾散去，奔赴光明</p>
            <p>希望未来能够有你一起同行</p>
            <p>元旦快乐。</p>
          </div>
          <div class="pg-3-bottom">
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
      <div class="slide-page wrapper-m pg-4">
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
  </div>
</template>

<style lang="scss">
$active: #fdfd19;
.active {
  color: $active;
}
.bold {
  font-weight: 700;
}
.margin-top-h1 {
  margin-top: 62px;
}
.margin-top-h2 {
  margin-top: 40px;
}
.margin-top-h3 {
  margin-top: 32px;
}
.margin-top-h4 {
  margin-top: 24px;
}
.margin-top-h7 {
  margin-top: 10px;
}
.font-size-tip {
  font-size: 12px;
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
  color: #fff;
  .slide-content {
    width: 100vw;
    .slide-page {
      width: 100vw;
      height: 100vh;
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
    @for $i from 0 through 6 {
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
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          margin: 50px 0 40px;
          background-color: rgb(242, 81, 158);
          text-align: center;
          line-height: 32px;
          letter-spacing: 12px;
          text-indent: 12px;
          border: 6px solid rgb(254, 207, 107);
          border-radius: 50%;
          height: 100px;
          width: 100px;
          font-size: 18px;
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
            font-size: 15px;
          }
        }
        .pg-3-bottom {
          display: flex;
          justify-content: space-between;
          align-items: center;
          font-size: 19px;
          &-right {
            width: 100px;
            img {
              width: 100%;
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
</style>
