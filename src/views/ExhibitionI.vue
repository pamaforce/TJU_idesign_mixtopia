<template>
  <div :class="'exhibition bg' + ($route.params.category_id || 64)">
    <img
      :src="
        require('../assets/banner' + ($route.params.category_id || 64) + '.png')
      "
      alt="back-img"
      class="mobile-back"
    />
    <div class="mobile-desc">
      <img
        :src="
          require('../assets/' +
            lang +
            ($route.params.category_id || 64) +
            '.svg')
        "
        alt="desc-img"
        class="mobile-desc-back"
      />
      <div
        :class="'btn_1 btn_type_' + ($route.params.category_id || 64)"
        @click="changeLang"
      ></div>
      <div class="btn_2" @click="changeHall(false, true)"></div>
      <div class="btn_3" @click="changeHall(true, true)"></div>
    </div>
    <div class="mobile-items">
      <div id="leftFall" ref="leftFall" v-if="subRefresh">
        <div
          v-for="(item, i) in leftList"
          :key="i"
          class="mobile-works"
          @click="toDetail(item, i)"
          v-scroll-reveal.reset="{ delay: 0 }"
        >
          <img
            :src="item.src"
            alt="cover"
            class="mobile-cover noSelect"
            :title="lang === 'en' ? item.post_title_en : item.title"
          />
          <p
            class="mobile-title"
            :title="lang === 'en' ? item.post_title_en : item.title"
          >
            {{ lang === "en" ? item.post_title_en : item.title }}
          </p>
          <p
            class="mobile-info"
            :title="
              lang === 'en'
                ? 'Authors: ' +
                  item.authors_en.join(' ') +
                  ' | Tutors: ' +
                  item.tutors_en
                : '作者：' +
                  item.authors.join(' ') +
                  ' | 指导教师：' +
                  item.tutors_zh
            "
          >
            {{
              lang === "en"
                ? "Authors: " +
                  item.authors_en.join(" ") +
                  " | Tutors: " +
                  item.tutors_en
                : "作者：" +
                  item.authors.join(" ") +
                  " | 指导教师：" +
                  item.tutors_zh
            }}
          </p>
        </div>
      </div>
      <div id="rightFall" ref="rightFall" v-if="subRefresh">
        <div
          v-for="(item, i) in rightList"
          :key="i"
          class="mobile-works"
          @click="toDetail(item, i)"
          v-scroll-reveal.reset="{ delay: 100 }"
        >
          <img
            :src="item.src"
            alt="cover"
            class="mobile-cover noSelect"
            :title="lang === 'en' ? item.post_title_en : item.title"
          />
          <p
            class="mobile-title"
            :title="lang === 'en' ? item.post_title_en : item.title"
          >
            {{ lang === "en" ? item.post_title_en : item.title }}
          </p>
          <p
            class="mobile-info"
            :title="
              lang === 'en'
                ? 'Authors: ' +
                  item.authors_en.join(' ') +
                  ' | Tutors: ' +
                  item.tutors_en
                : '作者：' +
                  item.authors.join(' ') +
                  ' | 指导教师：' +
                  item.tutors_zh
            "
          >
            {{
              lang === "en"
                ? "Authors: " +
                  item.authors_en.join(" ") +
                  " | Tutors: " +
                  item.tutors_en
                : "作者：" +
                  item.authors.join(" ") +
                  " | 指导教师：" +
                  item.tutors_zh
            }}
          </p>
        </div>
      </div>
    </div>
    <img
      :src="
        require('../assets/b-' +
          lang +
          ($route.params.category_id || 64) +
          '.svg')
      "
      @click="changeHall(false, true)"
      alt="b-icon-img"
      class="mobile-b-icon-img"
    />
    <div
      class="dialog"
      @touchmove.prevent
      @mousewheel.prevent
      @click="() => (dialog = false)"
      v-if="dialog"
      v-html="tempItem.url"
    ></div>
  </div>
</template>
<script>
import service from "../utils/request";
export default {
  props: ["notMobile"],
  data() {
    return {
      idList: ["58", "59", "60", "63", "64", "62", "61"],
      cardList: [],
      tempList: [],
      canPre: true,
      canNext: true,
      itemList: "",
      leftList: [],
      rightList: [],
      refresh: true,
      subRefresh: true,
      dialog: false,
      tempItem: {},
    };
  },
  computed: {
    lang() {
      return this.$i18n.locale;
    },
  },
  methods: {
    toDetail(item, i) {
      if (item.id < 0) {
        this.tempItem = item;
        if (item.id > -20) this.dialog = true;
        else {
          this.$viewerApi({
            images: [item.src],
          });
        }
      } else {
        this.$router.push(
          "/exhibition/" +
            this.$route.params.category_id +
            "/" +
            item.id +
            "?list=" +
            this.itemList +
            "&current=" +
            i +
            "&from=/exhibition/" +
            this.$route.params.category_id
        );
      }
    },
    changeHall(val, type = false) {
      if (val) {
        if (type) {
          this.$router.push(
            "/exhibition/" +
              this.idList[
                this.idList.indexOf(this.$route.params.category_id) - 1 < 0
                  ? this.idList.length - 1
                  : this.idList.indexOf(this.$route.params.category_id) - 1
              ]
          );
        } else if (this.canPre) {
          this.$router.push(
            "/exhibition/" +
              this.idList[
                this.idList.indexOf(this.$route.params.category_id) - 1
              ]
          );
        }
      } else {
        if (type) {
          this.$router.push(
            "/exhibition/" +
              this.idList[
                this.idList.indexOf(this.$route.params.category_id) + 1 >
                this.idList.length - 1
                  ? 0
                  : this.idList.indexOf(this.$route.params.category_id) + 1
              ]
          );
        } else if (this.canNext) {
          this.$router.push(
            "/exhibition/" +
              this.idList[
                this.idList.indexOf(this.$route.params.category_id) + 1
              ]
          );
        }
      }
    },
    getList() {
      this.refresh = false;
      this.canPre = this.$route.params.category_id !== this.idList[0];
      this.canNext =
        this.$route.params.category_id !== this.idList[this.idList.length - 1];
      if (this.$route.params.category_id === "61") {
        this.cardList = [
          {
            src: require("../assets/cover/1.jpeg"),
            title: "《THE ROAD》",
            post_title_en: "《THE ROAD》",
            id: -2,
            keywords_en: "游戏|疗愈|RPG|亲子关系",
            keywords_zh: "游戏|疗愈|RPG|亲子关系",
            authors_en: ["范译升"],
            authors: ["范译升"],
            tutors_en: "彭志军",
            tutors_zh: "彭志军",
            intro_en:
              "《THE ROAD》是一款以亲子关系为核心的RPG游戏，通过沉浸式的角色扮演和情境体验，帮助家长和孩子增强相互理解和沟通，游戏创造了代表不同人生态度的三个季节，玩家会遭遇各种各样的角色以及不同的人生选择，旨在启发玩家思考人生的多样性和选择的自由意志，从而学会理解和尊重他人的选择。",
            intro_zh:
              "《THE ROAD》是一款以亲子关系为核心的RPG游戏，通过沉浸式的角色扮演和情境体验，帮助家长和孩子增强相互理解和沟通，游戏创造了代表不同人生态度的三个季节，玩家会遭遇各种各样的角色以及不同的人生选择，旨在启发玩家思考人生的多样性和选择的自由意志，从而学会理解和尊重他人的选择。",
            url: '<iframe src="//player.bilibili.com/player.html?aid=271696227&bvid=BV1rc411G7Fr&cid=1146932793&page=1" scrolling="no" border="0" frameborder="no" framespacing="0" allowfullscreen="true"> </iframe>',
          },
          {
            src: require("../assets/cover/2.jpeg"),
            title: "《PARADISE》",
            post_title_en: "《PARADISE》",
            id: -3,
            keywords_en: "概念|科幻|循环",
            keywords_zh: "概念|科幻|循环",
            authors_en: ["贺思琦", "赵晶晶"],
            authors: ["贺思琦", "赵晶晶"],
            tutors_en: "赵天娇",
            tutors_zh: "赵天娇",
            intro_en: "《PARADISE》— 一部科幻概念动画短片",
            intro_zh: "《PARADISE》— 一部科幻概念动画短片",
            url: '<iframe src="//player.bilibili.com/player.html?aid=954204635&bvid=BV16W4y197oh&cid=1146952122&page=1" scrolling="no" border="0" frameborder="no" framespacing="0" allowfullscreen="true"> </iframe>',
          },
          {
            src: require("../assets/cover/3.png"),
            title: "《Global mutation investigation report》",
            post_title_en: "《Global mutation investigation report》",
            id: -4,
            keywords_en: "伪录像带|惊悚|反讽",
            keywords_zh: "伪录像带|惊悚|反讽",
            authors_en: ["王善凝"],
            authors: ["王善凝"],
            tutors_en: "赵晶",
            tutors_zh: "赵晶",
            intro_en:
              "《全球突变调查报告》是一部伪录像带风格的三维动画短片，讲述了在未来架空世界，核污染严重，人类遭受到突变患者的攻击，亚太联合调查中心为此成立，并收集了攻击事件相关录像带，对此进行调查跟进的故事。",
            intro_zh:
              "《全球突变调查报告》是一部伪录像带风格的三维动画短片，讲述了在未来架空世界，核污染严重，人类遭受到突变患者的攻击，亚太联合调查中心为此成立，并收集了攻击事件相关录像带，对此进行调查跟进的故事。",
            url: '<iframe src="//player.bilibili.com/player.html?aid=954183014&bvid=BV1fs4y1T7AJ&cid=1146940432&page=1" scrolling="no" border="0" frameborder="no" framespacing="0" allowfullscreen="true"> </iframe>',
          },
          {
            src: require("../assets/cover/4.png"),
            title: "《莱莉的康复》",
            post_title_en: "《莱莉的康复》",
            id: -5,
            keywords_en: "哥特|反转|心理疾病自救",
            keywords_zh: "哥特|反转|心理疾病自救",
            authors_en: ["戴诗雨"],
            authors: ["戴诗雨"],
            tutors_en: "李兴",
            tutors_zh: "李兴",
            intro_en:
              "《莱莉的康复》是一段待创作的定格与二维结合动画短片，在低沉的故事基调上强调美术风格和人物动态，运用布料和纸料的拼贴制作实现哥特风格的美学设计表现，从而完成短片制作和研究。",
            intro_zh:
              "《莱莉的康复》是一段待创作的定格与二维结合动画短片，在低沉的故事基调上强调美术风格和人物动态，运用布料和纸料的拼贴制作实现哥特风格的美学设计表现，从而完成短片制作和研究。",
            url: '<iframe src="//player.bilibili.com/player.html?aid=401655071&bvid=BV1Xo4y1T73Q&cid=1146925263&page=1" scrolling="no" border="0" frameborder="no" framespacing="0" allowfullscreen="true"> </iframe>',
          },
          {
            src: require("../assets/cover/5.png"),
            title: "«“我”和奔向不同选择的“我”们»",
            post_title_en: "«“我”和奔向不同选择的“我”们»",
            id: -6,
            keywords_en: "二维动画与三维场景结合|剧情|热点话题",
            keywords_zh: "二维动画与三维场景结合|剧情|热点话题",
            authors_en: ["李欣彦", "杨欣然"],
            authors: ["李欣彦", "杨欣然"],
            tutors_en: "李兴",
            tutors_zh: "李兴",
            intro_en:
              "«“我”和奔向不同选择的“我”们》讲述了女孩下班回家进入了一个奇幻世界，遇到了拥有不同人生的自己。我们都在羡慕别人的生活，殊不知别人也在羡慕我们。珍惜当下的生活，一切都是最好的选择。",
            intro_zh:
              "«“我”和奔向不同选择的“我”们》讲述了女孩下班回家进入了一个奇幻世界，遇到了拥有不同人生的自己。我们都在羡慕别人的生活，殊不知别人也在羡慕我们。珍惜当下的生活，一切都是最好的选择。",
            url: "",
          },
          {
            src: require("../assets/cover/6.png"),
            title: "《心海》",
            post_title_en: "《心海》",
            id: -7,
            keywords_en: "意识流|清新|治愈",
            keywords_zh: "意识流|清新|治愈",
            authors_en: ["姚小玲"],
            authors: ["姚小玲"],
            tutors_en: "彭志军",
            tutors_zh: "彭志军",
            intro_en:
              "《心海》以意识流形式讲述在繁忙的生活和沉重的压力下难免会心情低落，甚至无缘无故的emo，在这种心情的驱使下就会向往美好平静的事物，当你低头难过时，如果能看看蓝天、看看海，或者其他美好的事物总会让人心情愉悦，面朝大海，春暖花开。",
            intro_zh:
              "《心海》以意识流形式讲述在繁忙的生活和沉重的压力下难免会心情低落，甚至无缘无故的emo，在这种心情的驱使下就会向往美好平静的事物，当你低头难过时，如果能看看蓝天、看看海，或者其他美好的事物总会让人心情愉悦，面朝大海，春暖花开。",
            url: '<iframe src="//player.bilibili.com/player.html?aid=401723540&bvid=BV15o4y1M7NB&cid=1146949522&page=1" scrolling="no" border="0" frameborder="no" framespacing="0" allowfullscreen="true"> </iframe>',
          },
          {
            src: require("../assets/cover/7.png"),
            title: "《寻海》",
            post_title_en: "《寻海》",
            id: -8,
            keywords_en: "二维动画结合横版游戏|生命教育|心理疗愈",
            keywords_zh: "二维动画结合横版游戏|生命教育|心理疗愈",
            authors_en: ["关敬一", "赵紫寒"],
            authors: ["关敬一", "赵紫寒"],
            tutors_en: "孙晗",
            tutors_zh: "孙晗",
            intro_en:
              "《寻海》主要讲述了主人公作为一个在疫情前大受欢迎的小熊软糖在时局动荡后不再受欢迎，在遭受老鼠咬破袋子等无妄之灾后毅然决然决定出逃，见识到了现实中外面的世界，并深深被几年前的时尚广告吸引，想要寻找使自己重新受欢迎的地方，在经历了一系列的冒险后明白与其寻找遥远且不知真假的乌托邦大海，不如多多珍惜自己与身边爱他的朋友的一个童话故事。",
            intro_zh:
              "《寻海》主要讲述了主人公作为一个在疫情前大受欢迎的小熊软糖在时局动荡后不再受欢迎，在遭受老鼠咬破袋子等无妄之灾后毅然决然决定出逃，见识到了现实中外面的世界，并深深被几年前的时尚广告吸引，想要寻找使自己重新受欢迎的地方，在经历了一系列的冒险后明白与其寻找遥远且不知真假的乌托邦大海，不如多多珍惜自己与身边爱他的朋友的一个童话故事。",
            url: "",
          },
          {
            src: require("../assets/cover/8.png"),
            title: "《Cloth Tiger》",
            post_title_en: "《Cloth Tiger》",
            id: -9,
            keywords_en: "寻找|爱|反转",
            keywords_zh: "寻找|爱|反转",
            authors_en: ["赵红", "王睿思"],
            authors: ["赵红", "王睿思"],
            tutors_en: "彭志军",
            tutors_zh: "彭志军",
            intro_en:
              "《Cloth Tiger》讲述了小女孩在送布老虎找老奶奶的途中发生的一系列故事",
            intro_zh:
              "《Cloth Tiger》讲述了小女孩在送布老虎找老奶奶的途中发生的一系列故事",
            url: "",
          },
          {
            src: require("../assets/cover/9.png"),
            title: "《空天地智能无人系统三维演示动画设计》",
            post_title_en: "《空天地智能无人系统三维演示动画设计》",
            id: -10,
            keywords_en: "未来城市|人工智能|无人机",
            keywords_zh: "未来城市|人工智能|无人机",
            authors_en: ["闫诗莹"],
            authors: ["闫诗莹"],
            tutors_en: "赵天娇",
            tutors_zh: "赵天娇",
            intro_en:
              "动画短片《空天地智能无人系统三维演示动画设计》是根据天津市机器学习重点实验室、天津市131创新团队对于空天地智能无人系统工作原理与工作场景的研究，以“未来城市”作为主题背景，进行科普性质的三维动画演示设计。 通过三维动画短片的科普，用直观明了的方式让观众了解无人机、无人车等智能系统是如何统一高效运作的。",
            intro_zh:
              "动画短片《空天地智能无人系统三维演示动画设计》是根据天津市机器学习重点实验室、天津市131创新团队对于空天地智能无人系统工作原理与工作场景的研究，以“未来城市”作为主题背景，进行科普性质的三维动画演示设计。 通过三维动画短片的科普，用直观明了的方式让观众了解无人机、无人车等智能系统是如何统一高效运作的。",
            url: '<iframe src="//player.bilibili.com/player.html?aid=656741068&bvid=BV1Mh4y1d7W7&cid=1146946883&page=1" scrolling="no" border="0" frameborder="no" framespacing="0" allowfullscreen="true"> </iframe>',
          },
          {
            src: require("../assets/cover/10.png"),
            title: "《流徙·欧罗巴》",
            post_title_en: "《流徙·欧罗巴》",
            id: -11,
            keywords_en: "科幻|未来|灾难|星际移民|木卫二|人类文明",
            keywords_zh: "科幻|未来|灾难|星际移民|木卫二|人类文明",
            authors_en: ["孟凡雨"],
            authors: ["孟凡雨"],
            tutors_en: "孙晗",
            tutors_zh: "孙晗",
            intro_en:
              '2053年，人类发现大犬座恒星α意外变成红巨星，这使得它的伴星β吸取的能量急剧减少，导致β星核爆炸，星体向太阳系冲去。人类发现伴星β爆炸产生的巨大动能导致其质量大幅下降。当它进入太阳系后，它会逐渐被各种天体的引力减速。然而，当它临近太阳时，太阳的引力会改变它的轨迹，使其与太阳共轭运动。在此期间，伴星β剩余的放射性物质会加速消耗，释放出大量能量。最终，伴星β将与太阳合并，成为一颗新的恒星。这颗新星被人类命名为"朝晖"。太阳无法与伴星β融合的物质，会包裹在朝晖表层，成为一个热层，并在300年内扩散到金星的轨道。在热层的影响下，金星轨道内的所有物质都将被气化，地球也将干涸。同时，远古的卫星欧巴罗，将成为人类最后的希望。',
            intro_zh:
              '2053年，人类发现大犬座恒星α意外变成红巨星，这使得它的伴星β吸取的能量急剧减少，导致β星核爆炸，星体向太阳系冲去。人类发现伴星β爆炸产生的巨大动能导致其质量大幅下降。当它进入太阳系后，它会逐渐被各种天体的引力减速。然而，当它临近太阳时，太阳的引力会改变它的轨迹，使其与太阳共轭运动。在此期间，伴星β剩余的放射性物质会加速消耗，释放出大量能量。最终，伴星β将与太阳合并，成为一颗新的恒星。这颗新星被人类命名为"朝晖"。太阳无法与伴星β融合的物质，会包裹在朝晖表层，成为一个热层，并在300年内扩散到金星的轨道。在热层的影响下，金星轨道内的所有物质都将被气化，地球也将干涸。同时，远古的卫星欧巴罗，将成为人类最后的希望。',
            url: '<iframe src="//player.bilibili.com/player.html?aid=826669179&bvid=BV16u4y1f7qq&cid=1146936821&page=1" scrolling="no" border="0" frameborder="no" framespacing="0" allowfullscreen="true"> </iframe>',
          },
        ];
        if (!this.notMobile) {
          this.tempList = [...this.cardList];
          this.leftList = [];
          this.rightList = [];
          this.$forceUpdate();
          this.$nextTick(() => {
            this.distributeList();
          });
        } else {
          this.refresh = true;
        }
      } else if (this.$route.params.category_id === "62") {
        this.cardList = [
          {
            src: "",
            title: "煎饼果子",
            post_title_en: "煎饼果子",
            id: -20,
            keywords_en: "",
            keywords_zh: "",
            authors_en: ["赵师傅"],
            authors: ["赵师傅"],
            tutors_en: "",
            tutors_zh: "",
            intro_en: "",
            intro_zh: "",
            url: "",
          },
          {
            src: require("../assets/cover/21.jpeg"),
            title: "探幽寻奇 出山入画",
            post_title_en: "探幽寻奇 出山入画",
            id: -21,
            keywords_en:
              "狮子林|传统工笔画手法|太湖石|蒙太奇|横向发展|纵向深度|古典色彩搭配|中国古典园林|长卷插画",
            keywords_zh:
              "狮子林|传统工笔画手法|太湖石|蒙太奇|横向发展|纵向深度|古典色彩搭配|中国古典园林|长卷插画",
            authors_en: ["周凌霜"],
            authors: ["周凌霜"],
            tutors_en: "赵伟 吴静子 王晶 宋佳音",
            tutors_zh: "赵伟 吴静子 王晶 宋佳音",
            intro_en:
              "该长卷风格以中国传统工笔绘画为灵感，具有现代数码化特点，为画卷注入新意；狮子林作为画面的主题，以其最具特色的假山石贯穿其中，充分展现它的美景与人文历史内涵；在画面布局上，通过对场景的划分，清晰表现出画面的横向发展和纵向深度；色彩搭配按照中国传统宣纸绘画形式，极力刻画出数字艺术下的中国美学体验，以力求表现出画面的层次感和艺术效果；合理地运用蒙太奇的手法，增加画面的变化和想象空间。",
            intro_zh:
              "该长卷风格以中国传统工笔绘画为灵感，具有现代数码化特点，为画卷注入新意；狮子林作为画面的主题，以其最具特色的假山石贯穿其中，充分展现它的美景与人文历史内涵；在画面布局上，通过对场景的划分，清晰表现出画面的横向发展和纵向深度；色彩搭配按照中国传统宣纸绘画形式，极力刻画出数字艺术下的中国美学体验，以力求表现出画面的层次感和艺术效果；合理地运用蒙太奇的手法，增加画面的变化和想象空间。",
            url: "",
          },
          {
            src: require("../assets/cover/22.jpeg"),
            title: "梦境回廊",
            post_title_en: "梦境回廊",
            id: -22,
            keywords_en:
              "逼真的中国园林场景|长廊景致的精彩呈现|线条清晰的现实主义风格|精美的写实技巧|传统与现代相结合的视觉体验|叙事三联画巧妙呈现中国园林场景|融入戏剧元素的写实数字插画|典雅而富有气息的中国园林描绘",
            keywords_zh:
              "逼真的中国园林场景|长廊景致的精彩呈现|线条清晰的现实主义风格|精美的写实技巧|传统与现代相结合的视觉体验|叙事三联画巧妙呈现中国园林场景|融入戏剧元素的写实数字插画|典雅而富有气息的中国园林描绘",
            authors_en: ["刘卓璇"],
            authors: ["刘卓璇"],
            tutors_en: "赵伟 吴静子 王晶 宋佳音",
            tutors_zh: "赵伟 吴静子 王晶 宋佳音",
            intro_en:
              "1. 这幅画卷的设计旨在将中国传统景观与现代数字插画相结合，以创造一种全新的视觉体验。 2. 叙事三联画的风格使得这幅画卷可以被视为一个整体，同时也可分为几个独立的画面，为观众带来更多想象空间。 3. 深灰色和绿色的色调相互交错，营造出一种安静朴素的氛围。 同时旨在营造宋代园林景观氛围4. 精致的植物描绘和浪漫的河景描绘形成鲜明的对比，使整幅画面更加生动饱满。 5. 戏剧描绘的元素被巧妙地融入到画中，为画卷增添一份戏剧性和动感。",
            intro_zh:
              "1. 这幅画卷的设计旨在将中国传统景观与现代数字插画相结合，以创造一种全新的视觉体验。 2. 叙事三联画的风格使得这幅画卷可以被视为一个整体，同时也可分为几个独立的画面，为观众带来更多想象空间。 3. 深灰色和绿色的色调相互交错，营造出一种安静朴素的氛围。 同时旨在营造宋代园林景观氛围4. 精致的植物描绘和浪漫的河景描绘形成鲜明的对比，使整幅画面更加生动饱满。 5. 戏剧描绘的元素被巧妙地融入到画中，为画卷增添一份戏剧性和动感。",
            url: "",
          },
          {
            src: require("../assets/cover/23.jpeg"),
            title: "游园惊梦·钗头凤",
            post_title_en: "游园惊梦·钗头凤",
            id: -23,
            keywords_en: "中国园林|钗头凤|长卷插画",
            keywords_zh: "中国园林|钗头凤|长卷插画",
            authors_en: ["李子怡"],
            authors: ["李子怡"],
            tutors_en: "王晶 吴静子 赵伟 宋佳音",
            tutors_zh: "王晶 吴静子 赵伟 宋佳音",
            intro_en:
              "该长卷的灵感来源为陆游所写的《钗头凤》。陆游和唐琬自幼青梅竹马 ，两小无猜，后待两人长大，陆母用一只凤钗定下了两人的亲事，两人也是相爱无比，但陆母担心儿子沉迷女色而耽误科举，所以逼其讲唐琬休弃，这首词是多年之后，已是物是人非之际，陆游游览沈园偶遇唐琬，包含惊喜、惆怅和相思之情提笔写下了这首词。全卷用长廊将园林的前后空间以及两人相遇到共游园再到最后分别整个故事线串联起来，共有“重逢”、“共饮”、“游园”、“离别”、“思念”五幕场景，整体的色调从两人相遇之初的较为明媚也渐渐转变为离别时的冷色。",
            intro_zh:
              "该长卷的灵感来源为陆游所写的《钗头凤》。陆游和唐琬自幼青梅竹马 ，两小无猜，后待两人长大，陆母用一只凤钗定下了两人的亲事，两人也是相爱无比，但陆母担心儿子沉迷女色而耽误科举，所以逼其讲唐琬休弃，这首词是多年之后，已是物是人非之际，陆游游览沈园偶遇唐琬，包含惊喜、惆怅和相思之情提笔写下了这首词。全卷用长廊将园林的前后空间以及两人相遇到共游园再到最后分别整个故事线串联起来，共有“重逢”、“共饮”、“游园”、“离别”、“思念”五幕场景，整体的色调从两人相遇之初的较为明媚也渐渐转变为离别时的冷色。",
            url: "",
          },
          {
            src: require("../assets/cover/24.jpeg"),
            title: "千千回·狮子林",
            post_title_en: "千千回·狮子林",
            id: -24,
            keywords_en: "苏州园林|佛教禅宗|长卷插画",
            keywords_zh: "苏州园林|佛教禅宗|长卷插画",
            authors_en: ["李依阳"],
            authors: ["李依阳"],
            tutors_en: "赵伟 吴静子 王晶 宋佳音",
            tutors_zh: "赵伟 吴静子 王晶 宋佳音",
            intro_en:
              "作品灵感来源于苏州狮子林及其典故，作者将其加以畅想和续写。狮子林是一座禅宗背景浓厚的园林，相传是为纪念天如法师，其弟子取其坐骑狻猊之名命名此园。后世代辗转多人之手直至今日被大众所喜爱。在我的畅想中，法师百年之后，其灵魂依旧留存于此，一世世的轮回把不同时代的他吸引回到这里；从王侯将相，到市井小民。每一世与狮子林和园林的相遇都让他流连忘返。沧海桑田，苏州园林仍是一个有着千年历史的精神家园。法师的转世也许仍在狮子林中穿梭，在人世间游走。我们不知道他什么时候能找到他的“禅”，只听风声雨声书声皆消散，只有庙宇钟声与青烟袅袅，佛祖拈花微笑，千年时光，不过弹指一挥间。",
            intro_zh:
              "作品灵感来源于苏州狮子林及其典故，作者将其加以畅想和续写。狮子林是一座禅宗背景浓厚的园林，相传是为纪念天如法师，其弟子取其坐骑狻猊之名命名此园。后世代辗转多人之手直至今日被大众所喜爱。在我的畅想中，法师百年之后，其灵魂依旧留存于此，一世世的轮回把不同时代的他吸引回到这里；从王侯将相，到市井小民。每一世与狮子林和园林的相遇都让他流连忘返。沧海桑田，苏州园林仍是一个有着千年历史的精神家园。法师的转世也许仍在狮子林中穿梭，在人世间游走。我们不知道他什么时候能找到他的“禅”，只听风声雨声书声皆消散，只有庙宇钟声与青烟袅袅，佛祖拈花微笑，千年时光，不过弹指一挥间。",
            url: "",
          },
          {
            src: require("../assets/cover/25.jpeg"),
            title: "幽人居",
            post_title_en: "幽人居",
            id: -25,
            keywords_en: "光与影|中国园林|山水自然",
            keywords_zh: "光与影|中国园林|山水自然",
            authors_en: ["郑涵"],
            authors: ["郑涵"],
            tutors_en: "王晶 吴静子 赵伟 宋佳音",
            tutors_zh: "王晶 吴静子 赵伟 宋佳音",
            intro_en:
              "该长卷从描绘园林的光与影出发，通过颜色表达园林中不同的光影呈现。竹林是表达光影的一个主要的出发点，长卷以隐藏在竹林中的建筑为起点，描绘了深林中幽深细微的光影，渐渐场景从深林过渡到建筑中，光影穿过池水升腾的雾气在水面形成光斑，光影在园林建筑墙面留下的光影，建筑在水中的倒影以及水反映在建筑上面的波纹等。最后以抽象的月影结尾，表现园林白天黑夜的轮转。",
            intro_zh:
              "该长卷从描绘园林的光与影出发，通过颜色表达园林中不同的光影呈现。竹林是表达光影的一个主要的出发点，长卷以隐藏在竹林中的建筑为起点，描绘了深林中幽深细微的光影，渐渐场景从深林过渡到建筑中，光影穿过池水升腾的雾气在水面形成光斑，光影在园林建筑墙面留下的光影，建筑在水中的倒影以及水反映在建筑上面的波纹等。最后以抽象的月影结尾，表现园林白天黑夜的轮转。",
            url: "",
          },
          {
            src: require("../assets/cover/26.jpeg"),
            title: "我们这十年——中国速度",
            post_title_en: "我们这十年——中国速度",
            id: -26,
            keywords_en: "科技实力|发展进步|社会制度",
            keywords_zh: "科技实力|发展进步|社会制度",
            authors_en: ["胡春怡"],
            authors: ["胡春怡"],
            tutors_en: "赵伟",
            tutors_zh: "赵伟",
            intro_en:
              "该插画设计以中国这十年不管是科技实力、发展进步还是在社会制度上为出发点，以此彰显出中国这十年在效率方面的突飞猛进。该插画选取了一些当今社会具有代表性的人物及事物，和平鸽、向日葵等加以点缀来体现当今社会的和谐稳定，以报纸的形式表现出来。“高铁”折射了科技实力的提升，通过高铁蜿蜒曲折的表现手法不仅在画面空间上得到延伸，更是将画面从左到右分割成“建设中的中国”以及“当今的中国”，以此凝聚了这十年发展进步的动力；新冠疫情的爆发，中国一次次的快速出击，防控人员坚持不懈奋斗在抗疫前线，同舟共济、守望相助的家国情怀，无不彰显当今社会制度的优势。最后在画面整体色调上利用渐变手法将画面情节进行分割，大体上展示中国这十年的效率，体现“中国速度”。",
            intro_zh:
              "该插画设计以中国这十年不管是科技实力、发展进步还是在社会制度上为出发点，以此彰显出中国这十年在效率方面的突飞猛进。该插画选取了一些当今社会具有代表性的人物及事物，和平鸽、向日葵等加以点缀来体现当今社会的和谐稳定，以报纸的形式表现出来。“高铁”折射了科技实力的提升，通过高铁蜿蜒曲折的表现手法不仅在画面空间上得到延伸，更是将画面从左到右分割成“建设中的中国”以及“当今的中国”，以此凝聚了这十年发展进步的动力；新冠疫情的爆发，中国一次次的快速出击，防控人员坚持不懈奋斗在抗疫前线，同舟共济、守望相助的家国情怀，无不彰显当今社会制度的优势。最后在画面整体色调上利用渐变手法将画面情节进行分割，大体上展示中国这十年的效率，体现“中国速度”。",
            url: "",
          },
          {
            src: require("../assets/cover/27.jpeg"),
            title: "我们这十年——人间烟火",
            post_title_en: "我们这十年——人间烟火",
            id: -27,
            keywords_en: "人间烟火|世间百态|我们这十年",
            keywords_zh: "人间烟火|世间百态|我们这十年",
            authors_en: ["张姝敏"],
            authors: ["张姝敏"],
            tutors_en: "赵伟",
            tutors_zh: "赵伟",
            intro_en:
              "海报设计以街头摄影为灵感，观察“扫街”摄影中普通人的生活百态，以不同身份、职业的人们一起吃大桌饭的场景体现我们这十年的人间烟火气。",
            intro_zh:
              "海报设计以街头摄影为灵感，观察“扫街”摄影中普通人的生活百态，以不同身份、职业的人们一起吃大桌饭的场景体现我们这十年的人间烟火气。",
            url: "",
          },
          {
            src: require("../assets/cover/28.jpeg"),
            title: "",
            post_title_en: "",
            id: -28,
            keywords_en: "",
            keywords_zh: "",
            authors_en: ["南婷妍"],
            authors: ["南婷妍"],
            tutors_en: "赵伟",
            tutors_zh: "赵伟",
            intro_en:
              "海报设计以近十年来建筑设计概念的转变和变迁为基础，以线性表现方式展现；配色上借鉴运用蒙德里安“红黄蓝”三原色为基调。将十年间的主要建筑外观形态以二维的形式串联，结合想象和未来新型设计发展趋势展开拓展。",
            intro_zh:
              "海报设计以近十年来建筑设计概念的转变和变迁为基础，以线性表现方式展现；配色上借鉴运用蒙德里安“红黄蓝”三原色为基调。将十年间的主要建筑外观形态以二维的形式串联，结合想象和未来新型设计发展趋势展开拓展。",
            url: "",
          },
          {
            src: require("../assets/cover/29.jpeg"),
            title: "我们这十年——Live and let live",
            post_title_en: "我们这十年——Live and let live",
            id: -29,
            keywords_en: "",
            keywords_zh: "",
            authors_en: ["杨童禹"],
            authors: ["杨童禹"],
            tutors_en: "赵伟",
            tutors_zh: "赵伟",
            intro_en:
              "马可·奥勒利乌斯在《沉思集》中提到，存在物就像是奔腾不息的河流，事物处于不断变化之中。人们常常说，未来已来，十年来，我们的一呼一吸见证了时代的更迭，生生不息的时间里，有不同职业不同年龄的人们在与时间同呼吸共命运。该作品将作者国家这十年的发展与变化，分别从宏观-科技创新角度、微观-平凡岗位上的工作者等两个角度用绘画语言表达出来。",
            intro_zh:
              "马可·奥勒利乌斯在《沉思集》中提到，存在物就像是奔腾不息的河流，事物处于不断变化之中。人们常常说，未来已来，十年来，我们的一呼一吸见证了时代的更迭，生生不息的时间里，有不同职业不同年龄的人们在与时间同呼吸共命运。该作品将作者国家这十年的发展与变化，分别从宏观-科技创新角度、微观-平凡岗位上的工作者等两个角度用绘画语言表达出来。",
            url: "",
          },
          {
            src: require("../assets/cover/30.jpeg"),
            title: "我们这十年——职业兴替",
            post_title_en: "我们这十年——职业兴替",
            id: -30,
            keywords_en: "",
            keywords_zh: "",
            authors_en: ["严少青"],
            authors: ["严少青"],
            tutors_en: "赵伟",
            tutors_zh: "赵伟",
            intro_en:
              "新兴职业的演替可以侧面反映一个国家政治、经济、文化的发展，该作品选取2013年-2022年最具代表性的新兴职业来反映这十年我国的所面对的机遇与挑战以及所取得的成就；",
            intro_zh:
              "新兴职业的演替可以侧面反映一个国家政治、经济、文化的发展，该作品选取2013年-2022年最具代表性的新兴职业来反映这十年我国的所面对的机遇与挑战以及所取得的成就；",
            url: "",
          },
          {
            src: "",
            title: "我们这十年——中国航天",
            post_title_en: "我们这十年——中国航天",
            id: -31,
            keywords_en: "中国航天|中国梦",
            keywords_zh: "中国航天|中国梦",
            authors_en: ["马姝帆"],
            authors: ["马姝帆"],
            tutors_en: "赵伟",
            tutors_zh: "赵伟",
            intro_en:
              "十年来，中国航天用硬核实力对古老的故事传说进行了全新诠释与精彩演绎，将古人对灿烂星河的憧憬与后人对浩瀚宇宙的探索牵连，将现代科技与传统文化完美融合，一步步让“神话”走进现实。 十年来，中国航天硕果累累；作品集中表达中国航天的实力和水平的不断提高，中国航天一次次飞跃，不断创造新高度；用航天梦托举起新时代的中国梦。",
            intro_zh:
              "十年来，中国航天用硬核实力对古老的故事传说进行了全新诠释与精彩演绎，将古人对灿烂星河的憧憬与后人对浩瀚宇宙的探索牵连，将现代科技与传统文化完美融合，一步步让“神话”走进现实。 十年来，中国航天硕果累累；作品集中表达中国航天的实力和水平的不断提高，中国航天一次次飞跃，不断创造新高度；用航天梦托举起新时代的中国梦。",
            url: "",
          },
        ];
        if (!this.notMobile) {
          this.tempList = [...this.cardList];
          this.leftList = [];
          this.rightList = [];
          this.$forceUpdate();
          this.$nextTick(() => {
            this.distributeList();
          });
        } else {
          this.refresh = true;
        }
      } else
        service(
          "/portal/api_v1/get_cates_lists?per_page=9999&current_page=1&category_id=" +
            this.$route.params.category_id
        ).then((data) => {
          this.cardList = [];
          this.itemList = "";
          for (let i = 0; i < data.data.data.length; i++) {
            let y = [],
              x = [];
            for (
              let j = 0;
              j < data.data.data[i].more.authors?.length || 0;
              j++
            ) {
              x.push(data.data.data[i].more.authors[j].en_names);
              y.push(data.data.data[i].more.authors[j].zh_names);
            }
            this.itemList += data.data.data[i].id + "_";
            this.cardList.push({
              ...data.data.data[i],
              title: data.data.data[i].post_title,
              src:
                "http://idesign.tju.edu.cn/upload/" +
                data.data.data[i].more.thumbnail,
              authors: y,
              authors_en: x,
              term: data.data.data[i].post_term,
              id: data.data.data[i].id,
              category_id: this.$route.params.category_id,
            });
          }
          if (!this.notMobile) {
            this.tempList = [...this.cardList];
            this.leftList = [];
            this.rightList = [];
            this.$forceUpdate();
            this.$nextTick(() => {
              this.distributeList();
            });
          } else {
            this.refresh = true;
          }
        });
    },
    distributeList() {
      if (this.tempList.length) {
        let heightLeft = document.getElementById("leftFall").clientHeight;
        let heightRight = document.getElementById("rightFall").clientHeight;
        if (heightLeft <= heightRight) {
          this.leftList.push(this.tempList.shift());
        } else {
          this.rightList.push(this.tempList.shift());
        }
        this.$nextTick(() => {
          this.distributeList();
        });
      } else {
        this.subRefresh = false;
        this.$nextTick(() => {
          this.subRefresh = true;
        });
      }
    },
    changeLang() {
      this.$i18n.locale = this.$i18n.locale === "cn" ? "en" : "cn";
      this.subRefresh = false;
      this.$nextTick(() => {
        this.subRefresh = true;
      });
      document.title =
        this.$i18n.locale === "cn"
          ? "2023·天津大学第九届设计年展·【融·容】"
          : "THE 8TH ANNUAL DESIGN EXHIBITION OF TIANJIN UNIVERSITY · MIXTOPIA";
    },
  },
  watch: {
    $route() {
      console.log(111);
      this.getList();
    },
    notMobile() {
      this.getList();
    },
  },
  created() {
    this.getList();
  },
};
</script>
<style scoped>
.exhibition {
  width: 100%;
  position: relative;
  padding-top: 50px;
}
.desc {
  margin-top: 90px;
  display: grid;
  grid-template-columns: 950px 300px auto;
  grid-template-rows: 200px 275px;
  overflow: visible;
}
.img-text {
  display: flex;
  justify-content: center;
}
.icon_0 {
  position: absolute;
  left: 0;
  top: 0;
  width: 1920px;
  z-index: 0;
}
.icon_00 {
  position: absolute;
  right: 705px;
  top: 95px;
  width: 6px;
  height: 268px;
}
.icon_1 {
  width: 120px;
  height: 136px;
  margin-right: 50px;
}
.icon_2 {
  width: 568px;
  height: 540px;
  margin-top: -50px;
  justify-self: center;
}
.icon_3 {
  width: 10px;
  height: 300px;
}
.icon_4 {
  position: absolute;
  left: 70px;
  top: 1200px;
  width: 280px;
  height: 320px;
}
.text_1 {
  font-size: 90px;
  font-weight: 400;
}
.space {
  grid-row: 1 / 3;
  grid-column: 2 / 3;
}
.img-text-2 {
  display: flex;
  justify-content: flex-start;
  grid-row: 1 / 3;
  grid-column: 3 / 4;
  margin-top: -20px;
}
.paragraph {
  position: absolute;
  right: 735px;
  height: 280px;
  padding-top: 10px;
  padding-left: 28px;
  padding-bottom: 10px;
  text-align: right;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}
.dialog {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.26);
  z-index: 500;
  display: flex;
  justify-content: center;
  align-items: center;
}
.paragraph p {
  font-size: 23px;
  font-weight: 900;
}
.title-bold {
  position: absolute;
  left: 1245px;
  font-size: 80px;
  font-weight: 900;
}
.title-light {
  position: absolute;
  margin-top: 7px;
  left: 1257px;
  font-size: 80px;
  font-weight: 200;
}
.content {
  display: grid;
  margin: 0 150px;
  grid-template-columns: repeat(3, 512px);
  justify-content: space-between;
  margin-top: -130px;
}
.works {
  overflow: hidden;
  cursor: pointer;
  margin-bottom: 50px;
}
.wrapper {
  overflow: hidden;
  width: 512px;
  height: 290px;
}
.cover {
  width: 512px;
  height: 290px;
  transition: all 0.6s ease;
}
.works:hover .cover {
  transform: scale(1.2);
}
.title {
  font-size: 28px;
  font-weight: 400;
  margin-top: 10px;
  white-space: unset;
}
.info {
  font-size: 18px;
  font-weight: 300;
  white-space: unset;
}
.paging {
  width: 100%;
  margin: 100px 0;
  padding: 0 150px;
  height: 22px;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  overflow: visible;
}
.pre {
  height: 18px;
  cursor: pointer;
  display: block;
}
.next {
  height: 18px;
  cursor: pointer;
  transform: rotate(180deg);
  display: block;
}
.pre-text {
  font-size: 24px;
  padding: 0 5px;
  line-height: 22px;
  cursor: pointer;
  overflow: visible;
  margin: 5px 0;
  margin-right: 20px;
}
.next-text {
  font-size: 24px;
  padding: 0 5px;
  line-height: 22px;
  cursor: pointer;
  overflow: visible;
  margin: 5px 0;
}
.color-block-1 {
  position: absolute;
  left: 0;
  top: 0;
  width: 145px;
  height: 15px;
}
.color-block-2 {
  position: absolute;
  right: 0;
  top: 0;
  width: 145px;
  height: 15px;
}
.mobile-desc {
  position: relative;
  width: 100%;
  height: max-content;
}
.btn_1 {
  position: absolute;
  top: 90px;
  left: 220px;
  width: 38px;
  height: 38px;
}
.btn_2 {
  position: absolute;
  top: 85px;
  right: 5px;
  width: 30px;
  height: 50px;
}
.btn_3 {
  position: absolute;
  top: 85px;
  left: 5px;
  width: 30px;
  height: 50px;
}
.btn_type_59 {
  top: 25px;
  left: 285px;
}
.btn_type_64 {
  top: 90px;
  left: 220px;
}
.btn_type_60 {
  top: 85px;
  left: 215px;
}
.btn_type_61 {
  top: 32px;
  left: 225px;
}
.btn_type_62 {
  top: 170px;
  left: 215px;
}
.btn_type_63 {
  top: 85px;
  left: 220px;
}
.btn_type_58 {
  top: 90px;
  left: 330px;
}
.bg64 {
  background: linear-gradient(
    179.91deg,
    rgba(46, 163, 152, 0) -5.63%,
    rgba(46, 163, 152, 0.2) 24.6%,
    rgba(46, 163, 152, 0.25) 53.74%,
    rgba(46, 163, 152, 0.2) 81.78%,
    rgba(46, 163, 152, 0) 99.92%
  );
}
.bg62 {
  background: linear-gradient(
    179.91deg,
    rgba(46, 163, 152, 0) -5.63%,
    rgba(46, 163, 152, 0.15) 24.6%,
    rgba(46, 163, 152, 0.2) 53.74%,
    rgba(46, 163, 152, 0.15) 81.78%,
    rgba(46, 163, 152, 0) 99.92%
  );
}
.bg58 {
  background: linear-gradient(
    179.91deg,
    rgba(0, 57, 255, 0) -5.63%,
    rgba(0, 57, 255, 0.2) 24.59%,
    rgba(0, 57, 255, 0.25) 53.74%,
    rgba(0, 57, 255, 0.2) 81.78%,
    rgba(0, 57, 255, 0) 99.92%
  );
}
.bg59 {
  background: linear-gradient(
    179.91deg,
    rgba(179, 76, 152, 0) -5.63%,
    rgba(179, 76, 152, 0.2) 24.6%,
    rgba(179, 76, 152, 0.25) 53.74%,
    rgba(179, 76, 152, 0.2) 81.78%,
    rgba(179, 76, 152, 0) 99.92%
  );
}
.bg61 {
  background: linear-gradient(
    179.91deg,
    rgba(179, 76, 152, 0) -5.63%,
    rgba(179, 76, 152, 0.2) 24.6%,
    rgba(179, 76, 152, 0.25) 53.74%,
    rgba(179, 76, 152, 0.2) 81.78%,
    rgba(179, 76, 152, 0) 99.92%
  );
}
.bg60 {
  background: linear-gradient(
    179.91deg,
    rgba(255, 121, 0, 0) -5.63%,
    rgba(255, 121, 0, 0.2) 24.6%,
    rgba(255, 121, 0, 0.25) 53.74%,
    rgba(255, 121, 0, 0.2) 81.78%,
    rgba(255, 121, 0, 0) 99.92%
  );
}
.bg63 {
  background: linear-gradient(
    179.91deg,
    rgba(233, 201, 28, 0) -5.63%,
    rgba(233, 201, 28, 0.2) 24.6%,
    rgba(233, 201, 28, 0.25) 53.74%,
    rgba(233, 201, 28, 0.2) 81.78%,
    rgba(233, 201, 28, 0) 99.92%
  );
}
.mobile-back {
  position: absolute;
  width: 398px;
  margin: 0 8px;
  margin-top: 50px;
  box-sizing: border-box;
  top: 0;
  left: 0;
  pointer-events: none;
}
.mobile-title {
  display: flex;
  align-items: center;
}
.mobile-title p {
  font-weight: 700;
  font-size: 32px;
  color: #000000;
  display: inline-block;
}
.icon-lang {
  width: 26px;
  height: 26px;
  margin-left: 10px;
  display: inline-block;
}
.mobile-paragraph {
  margin-top: 5px;
  font-size: 14px;
  color: #000000;
}
.mobile-paragraph p {
  white-space: unset !important;
  margin-top: 5px;
  margin-right: 10px;
}
.mobile-items {
  white-space: nowrap;
  width: 398px;
  margin: 40px 8px;
  margin-top: 8px;
  box-sizing: border-box;
}
#leftFall {
  vertical-align: top;
  display: inline-block;
  width: 195px;
  height: auto;
  margin-right: 8px;
}
#rightFall {
  vertical-align: top;
  display: inline-block;
  width: 195px;
  height: auto;
}
.mobile-works {
  background: url("../assets/g5.png");
  background-size: 100% 100%;
  background-repeat: no-repeat;
  margin: 8px 0;
  border-radius: 5px;
  padding: 7px;
}
.mobile-cover {
  width: 100%;
  min-height: 100px;
  object-fit: cover;
  border-radius: 5px;
}
.mobile-title {
  font-size: 14px;
  color: #262626;
  margin: 3px 0;
  padding: 0 3px;
  white-space: pre-line;
}
.mobile-info {
  font-size: 12px;
  color: #8a8a8a;
  padding: 0 3px;
  margin: 3px 0;
  white-space: pre-line;
}
.mobile-desc-back {
  width: 414px;
  display: inline-block;
}
.mobile-b-icon-img {
  width: 395px;
  margin: 0 auto;
}
</style>