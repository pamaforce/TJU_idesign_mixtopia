<template>
  <div :class="'graduate' + (notMobile ? ' pc-graduate' : ' m-graduate')">
    <template v-if="notMobile">
      <p class="title">工业设计班导师</p>
      <div class="g-teacher">
        <div class="card">
          <img
            src="../assets/sponsor/0/x.webp"
            class="card-img"
            alt="avatar"
            preview="1"
          />
          <div class="card-info">
            <p class="card-name">{{ $t("words_1") }}</p>
            <p
              class="card-text text-t"
              style="-webkit-box-orient: vertical"
              :title="$t('words_2')"
            >
              <span class="space"></span>{{ $t("words_2") }}
            </p>
          </div>
        </div>
        <div class="card">
          <img
            src="../assets/sponsor/0/4.webp"
            class="card-img"
            alt="avatar"
            preview="2"
          />
          <div class="card-info">
            <p class="card-name">{{ $t("words_3") }}</p>
            <p
              class="card-text text-t"
              style="-webkit-box-orient: vertical"
              :title="$t('words_4')"
            >
              <span class="space"></span>{{ $t("words_4") }}
            </p>
          </div>
        </div>
      </div>
      <p class="title">工业设计毕业生</p>
      <div class="g-teacher">
        <template v-for="(letter, i) in letters">
          <div class="card" v-for="(item, j) in num[letter]" :key="i + ' ' + j">
            <img
              :src="
                require('../assets/student/' + letter + '/' + (j + 1) + '.webp')
              "
              class="card-img"
              alt="avatar"
              preview="1"
            />
            <div class="card-info">
              <div class="card-name-line">
                <p class="card-name">{{ info[letter][j][0] }}</p>
                <p class="card-class" :title="info[letter][j][1]">
                  {{ info[letter][j][1] }}
                </p>
              </div>
              <p
                class="card-text"
                style="-webkit-box-orient: vertical"
                :title="info[letter][j][2]"
              >
                <span class="space"></span>{{ info[letter][j][2] }}
              </p>
              <p class="card-go">
                {{ info[letter][j][3] }}
              </p>
            </div>
          </div>
        </template>
      </div>
    </template>
    <template v-else>
      <div class="nav-img">
        <img src="../assets/mobile/t1.svg" />
        <div class="bt1"></div>
        <div class="bt2" @click="toSponsor"></div>
      </div>
      <div class="students">
        <template v-for="(letter, i) in letters">
          <div :key="i + 'a'" class="letter" :id="'letter' + letter">
            <img src="../assets/mobile/y.svg" />{{ letter
            }}<span>[{{ num[letter] }}]</span>
            <div class="point" :id="'letters' + letter"></div>
          </div>
          <div
            class="m-card"
            v-for="(item, j) in num[letter]"
            :key="i + ' ' + j"
          >
            <img
              :src="
                require('../assets/student/' + letter + '/' + (j + 1) + '.webp')
              "
              class="m-card-img"
              alt="avatar"
              preview="1"
            />
            <div class="m-card-info">
              <div class="m-card-name-line">
                <p class="m-card-name">{{ info[letter][j][0] }}</p>
                <p class="m-card-class" :title="info[letter][j][1]">
                  {{ info[letter][j][1] }}
                </p>
              </div>
              <p
                class="m-card-text"
                style="-webkit-box-orient: vertical"
                :title="info[letter][j][2]"
              >
                <span class="space"></span>{{ info[letter][j][2] }}
              </p>
              <p class="m-card-go">
                {{ info[letter][j][3] }}
              </p>
            </div>
          </div>
        </template>
      </div>
      <div class="letters-nav">
        <div
          v-for="item in 26"
          :key="item"
          class="letter-nav"
          :style="
            String.fromCharCode(64 + item) === nowChar
              ? 'background-color:#D36A65'
              : ''
          "
          @click="getLetter(String.fromCharCode(64 + item))"
        >
          {{ String.fromCharCode(64 + item) }}
        </div>
      </div>
    </template>
    <div class="msg-dialog" v-if="msgDialog" key="a">
      <div :class="'msg-img' + (localLang === 'en' ? ' msg-en-img' : '')">
        <div class="msg-btn" @click="hideMsg"></div>
        <div class="msg-btn-2" @click="switchLocalLang"></div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ["notMobile"],
  created() {
    if (!this.notMobile) this.showMsg();
    window.addEventListener("scroll", () => {
      if (this.auto) return;
      if (document.getElementById("letterB")) {
        let scrollTop =
          window.pageYOffset ||
          document.documentElement.scrollTop ||
          document.body.scrollTop;
        if (scrollTop < document.getElementById("letterB").offsetTop - 100) {
          this.nowChar = "A";
        } else if (
          scrollTop <
          document.getElementById("letterC").offsetTop - 100
        ) {
          this.nowChar = "B";
        } else if (
          scrollTop <
          document.getElementById("letterD").offsetTop - 100
        ) {
          this.nowChar = "C";
        } else if (
          scrollTop <
          document.getElementById("letterH").offsetTop - 100
        ) {
          this.nowChar = "D";
        } else if (
          scrollTop <
          document.getElementById("letterL").offsetTop - 100
        ) {
          this.nowChar = "H";
        } else if (
          scrollTop <
          document.getElementById("letterM").offsetTop - 100
        ) {
          this.nowChar = "L";
        } else if (
          scrollTop <
          document.getElementById("letterQ").offsetTop - 100
        ) {
          this.nowChar = "M";
        } else if (
          scrollTop <
          document.getElementById("letterS").offsetTop - 100
        ) {
          this.nowChar = "Q";
        } else if (
          scrollTop <
          document.getElementById("letterT").offsetTop - 100
        ) {
          this.nowChar = "S";
        } else if (
          scrollTop <
          document.getElementById("letterW").offsetTop - 100
        ) {
          this.nowChar = "T";
        } else if (
          scrollTop <
          document.getElementById("letterX").offsetTop - 100
        ) {
          this.nowChar = "W";
        } else if (
          scrollTop <
          document.getElementById("letterY").offsetTop - 100
        ) {
          this.nowChar = "X";
        } else if (
          scrollTop <
          document.getElementById("letterZ").offsetTop - 100
        ) {
          this.nowChar = "Y";
        } else {
          this.nowChar = "Z";
        }
      }
    });
  },
  methods: {
    toSponsor() {
      this.$router.push("/sponsor");
    },
    getLetter(letter) {
      this.$nextTick(() => {
        this.nowChar = letter;
        this.auto = true;
        setTimeout(() => {
          this.auto = false;
        }, 1200);
        if (document.getElementById("letters" + letter)) {
          window.scrollTo({
            top: document.getElementById("letters" + letter).offsetTop,
            behavior: "smooth",
          });
          document.getElementById("letters" + letter).scrollIntoView({
            behavior: "smooth",
            block: "start",
          });
        } else {
          let temp = letter;
          while (!document.getElementById("letters" + temp)) {
            temp = String.fromCharCode(temp.charCodeAt() + 1);
          }
          document.getElementById("letters" + temp).scrollIntoView({
            behavior: "smooth",
            block: "start",
          });
        }
      });
    },
    showMsg() {
      document.body.style.height = "100%";
      document.body.style.overflow = "hidden";
      document.body.style.position = "fixed";
      this.msgDialog = true;
    },
    hideMsg() {
      document.body.style.height = "";
      document.body.style.overflow = "";
      document.body.style.position = "relative";
      this.msgDialog = false;
    },
    switchLocalLang() {
      this.localLang = this.localLang === "cn" ? "en" : "cn";
    },
  },
  data() {
    return {
      nowChar: "A",
      top: [0, 100, 400],
      msgDialog: false,
      localLang: this.$i18n.locale,
      auto: false,
      letters: [
        "A",
        "B",
        "C",
        "D",
        "G",
        "H",
        "J",
        "K",
        "L",
        "M",
        "N",
        "P",
        "Q",
        "R",
        "S",
        "T",
        "W",
        "X",
        "Y",
        "Z",
      ],
      num: {
        A: 1,
        B: 1,
        C: 3,
        D: 1,
        G: 2,
        H: 4,
        J: 3,
        K: 1,
        L: 14,
        M: 1,
        N: 1,
        P: 1,
        Q: 3,
        R: 2,
        S: 2,
        T: 1,
        W: 9,
        X: 1,
        Y: 4,
        Z: 8,
      },
      info: {
        A: [
          [
            "艾力米热·鲁合曼",
            "2019工设2班",
            "总觉得来日方长，毕业遥遥可及。如今也到我执笔于此，四年的大学生活疫情就占据了一半多，也总有一些遗憾吧，可能有些想要做的事情没有做成，有些承诺没有兑现，但我很幸运在我人生中最好的时光里，一直在遇见许多不同的可爱善良的人，她们给了我最美好的人生回忆。希望我们未来的路上能享受更多的风景。",
            "",
          ],
        ],
        B: [
          [
            "白子轩",
            "2019工业设计（创新设计与卓越管理方向）",
            "在工业设计辅修的学习生涯即将结束之际，我不禁感慨万分。这段时间里，我接触到了创意的力量，体验了设计的魅力。工业设计辅修不仅丰富了我的专业知识，更开拓了我的思维和视野。感谢学院和教师们给予我宝贵的机会和指导，让我能够在这个领域里实现自我。同时，也要感谢家人和同学们的陪伴和支持，你们的鼓励让我坚持走到了最后。这段经历将成为我人生中宝贵的财富，我期待着将所学应用于未来的工作和生活中。谢谢大家！",
            "",
          ],
        ],
        C: [
          [
            "陈宸",
            "2019工设 2 班",
            "四年时光，转瞬即逝，天大的四年是美好的，充满回忆的。在这里，我遇到了有趣的同学，负责任的老师，参加了很多的比赛，提升了个人能力。四年时光很短，有很多还未曾尝试，未来继续加油，做实事求是的天大人。",
            "天津大学读研",
          ],
          [
            "陈嘉明",
            "2019工设1班",
            "一转眼就要毕业了，感谢这四年的校园生活，让我结交了许多好朋友。在这里，我收获了知识、人际关系和成长。我想对我的老师们说一声感谢，是你们传授了我宝贵的知识，也是你们在我迷茫时给了我信心。感谢我的家人和朋友们一直以来的支持和鼓励。毕业并不是终点，而是新的起点，让我们勇敢面对未来的挑战，努力追寻自己的梦想，争取早日实现人生价值。",
            "",
          ],
          [
            "陈玥如",
            "2019工设1班",
            '"大学四年：读书，行路，交友，阅己。希望在未来能继续保持。祝所有同窗好友毕业快乐，前程似锦；祝老师们工作顺利，万事如意；祝天大越来越好。"',
            "香港理工大学读研",
          ],
        ],
        D: [
          [
            "邓皓勇",
            "2019工业设计（创新设计与卓越管理方向）",
            '"为人生的意义和世界的未来而学习和创造 TO LEARN AND CREATE, FOR A MEANINGFUL LIFE AND A BETTER WORLD."',
            "同济大学",
          ],
        ],
        G: [
          [
            "高朗宸",
            "2019工设2班",
            "四年的大学生活，回首想来，虽说没有中学时的紧张忙碌感，但仍然让我体会到了心灵上的充实感，受益匪浅。相聚相守相离我们携手走过四年灿烂的青春岁月，我们相伴度过四年美丽的青春年华，我们并肩扛过四年艰辛的青春历程！在这新的人生征程，愿大家凭借骆驼般沉着、坚韧的精神，一步一个脚印永远昂首阔步，永远满怀信心！",
            "",
          ],
          [
            "顾佳奇",
            "2019工业设计（创新设计与卓越管理方向）",
            '"陌生的天花板凝视着天兵，一只船孤独地航行在海上，它既不寻求幸福，也不逃避幸福，它只是向前航行，底下是沉静碧蓝的大海，而头顶是金色的太阳。将要直面的，与已成过往的，较之深埋于它内心的皆为微沫。"',
            "纽约视觉艺术学院",
          ],
        ],
        H: [
          [
            "何鸿禧",
            "2019工设1班",
            "设计作为人类的第三种智慧，很荣幸能够在四年里通过天津大学系统的学习这一专业，与各位设计师一起共谋人类的未来。",
            "",
          ],
          [
            "何俊燊",
            "2019工设2班",
            "毕业了，青春在无形之中离开，我们即将翻开人生的另一页，感谢黄艳群导师的悉心指导，感谢杨舒涵师姐的帮助和指导，感谢答辩组评委老师们的意见和建议，感谢家人朋友们的鼓励！",
            "澳洲读研",
          ],
          [
            "何砚文",
            "2019工设2班",
            "这四年的学习生活，让我不断成长和进步，也让我明确了自己的职业方向和追求。在这里，我接触到了专业知识和技能，培养了创新思维和实践能力。老师们的悉心教导和同学们的互相鼓励，让我勇于挑战和超越自我。我参与了各种项目和比赛，通过团队合作和努力，不断突破自己的局限，取得了一次次的成就。同时，我也深感感激于天津大学为我们提供的优秀学习环境和资源。最重要的是，我要感谢我的家人和朋友们对我的支持和鼓励。正是有了他们的陪伴和帮助，我才能坚持走到毕业的终点。即将离开校园，我怀揣着对工业设计事业的热爱和信心，迎接未来的挑战。",
            "",
          ],
          [
            "黄微雯",
            "2019工设2班",
            "时光荏苒，转眼间已经到了毕业的时刻。感谢张赫晨老师在毕设过程中的悉心指导，感谢我的家人朋友们一路上的鼓励陪伴。回首大学四年，感慨万千。未来的路还很长，我会继续保持学习的热情，持续不断地探索和追求自己的梦想。",
            "",
          ],
        ],
        J: [
          [
            "江泽宇",
            "2019工设1班",
            "岁月匆匆一如晨曦中的霞光，我在工业设计的征途上驻足。凝视着未来的蓝图，终是迎来了毕业的时刻。这并非终点，而是我踏上更高峰的起点。每一次创造都是一次探险，我将不断学习与超越，用设计的艺术为人类的生活赋予温存：愿设计不仅仅是形式与功能的结合，更是情感与灵魂的流露。",
            "",
          ],
          [
            "姜昭君",
            "2019工设2班",
            "大学四年，真的很快，这一路磕磕绊绊、起起伏伏，不论是高光时刻还是暗淡时期都是我最珍贵的财富。很幸运遇到的都是群可爱的人，感谢老师们的谆谆教导，感谢朋友们的真情善良，感谢一直充满热情的自己。带着天大品格，工设精神，持续热情，延续青春！",
            "浙江大学读研",
          ],
          [
            "贾士贤",
            "2019工业设计（创新设计与卓越管理方向）",
            '"在工业设计主修的这段学习旅程即将结束之际，我想分享一些心得和感受。通过学习工业设计，我深入了解了创新设计的原理和方法，培养了对美学和功能性的敏感度。在未来，我将继续深耕机器人方向的研究。机器人技术的快速发展和广泛应用给我带来了巨大的兴趣和激情。我希望能够在研究生阶段深入研究机器人领域的设计和开发，探索机器人与人类的互动、智能控制和应用场景。工业设计的学习为我打下了坚实的基础，提供了丰富的创意思维和解决问题的能力。我相信这些技能和知识将对我在机器人领域的研究和实践产生积极影响。我将努力将设计思维和工程技术相结合，为机器人技术的发展做出贡献。在此，我要感谢所有支持和帮助过我的导师、同学和家人。你们的鼓励和指导使我成长为一个更加综合和专业的工业设计专业人才。我也要感谢工业设计专业给予我这个宝贵的机会，让我从中找到了自己的兴趣所在。"',
            "",
          ],
        ],
        K: [
          [
            "孔令妤",
            "2019工设1班",
            "你要真的流经一个又一个风景，你才会是一条河。感谢同学、感谢师长、感谢天大。",
            "丹麦科技大学读研",
          ],
        ],
        L: [
          [
            "朗加扎西",
            "2019工设1班",
            "在前进与感悟生命中我们快结束了大学生活，这里有我们珍贵的四年青春。对于我来说这四年过的很快，真的很快。在大学期间老师、同学和室友帮助我很多，很感谢遇到了你们。我们成长、感悟，这将是生命中值得回味的一段时光。往后各位各自走向了自己的路，希望你们前程似锦，得到生命的意义。",
            "国家电网西藏电力有限公司发电检修分行就业",
          ],
          [
            "李宝婷",
            "2019工设2班",
            "回望四年的工设时光，深觉自己是一个幸运的人，遇到了热情耐心的老师，遇到了给予我很多帮助的朋友，勇敢尝试了很多“第一次”，实现了一些小目标和大目标……感谢学校的培养，感谢家人、舍友、朋友的陪伴，感谢卫浩同志，让我不断成长，发现更多的可能性。感恩所有的遇见，这是终点亦是起点，愿我们不忘初心，实事求是，在各自的领域继续发光发热。毕业快乐~",
            "天津大学读研",
          ],
          [
            "李晨",
            "2019工设2班",
            "感恩这四年充满挑战和机遇的本科生涯，感谢在大学遇到的优秀老师和伙伴们的陪伴和帮助！这段时光中，我学习到了很多知识，认识到了更多的自己，更重要的是，领悟到了生活的真谛。在未来的人生旅途中不断前行、砥砺前行，迎接新的挑战。让我们一起在这里留下美好的回忆，向未来进行新的发掘！",
            "天津大学读研",
          ],
          [
            "李玉龙",
            "2019工设2班",
            "又是一个夏天，也是在北洋园最后的时光。误入了工业设计专业，度过了很有意思的四年，我可以将灵光一闪的想法设计出方案，也拥有了更多样的审美与创意。这里不定义优秀，也少有束缚，最繁琐的任务不过是分析需求、挖掘痛点。很感谢在天津大学这个工科氛围里学到了些艺术，认识了很多可爱的人。这个夏天结束，我将去体验更多的世界。",
            "",
          ],
          [
            "李哲",
            "2019工设2班",
            "四年的本科生涯让我获得了很多宝贵的经验和知识，在这里我想对我的母校和老师表示由衷的感谢。在工业设计专业的学习生涯中，我学到了很多实用的技能，同时也锻炼了我的创新和设计思维能力。毕业并不是终点，而是新的起点。我期待着未来前途不可限量的挑战和机遇，想要将我的工业设计技能转化为改善社会和生活质量的具体应用，希望为这个世界创造更多美好的事物。最后，祝我的同学们未来都能实现自己的理想和追求，相信我们一定会走的比现在更加远和更加成功。",
            "",
          ],
          [
            "梁舒瑜",
            "2019工设2班",
            "时光匆匆，转眼间我们即将迈出校园的大门，迎接人生新的篇章。毕业只是一个起点，人生的道路仍然延续着。让我们怀揣着对未来的期待和梦想，坚定地走向自己的目标，去追求更高的成就和更美好的未来。衷心祝愿所有的老师和同学们在未来的道路上一帆风顺，获得更多的成就和幸福。",
            "",
          ],
          [
            "林汉唐",
            "2019工设1班",
            "毕业了，我说是结束，你说是成熟。对的，四年的大学生活让我变得更加成熟，青春拔节生长，我们可以看到更美好的未来。感谢每位老师的指导，感谢每个同学对我在教室内外的帮助，特别是杨君宇老师，不如是课内或课外感谢您的指导。",
            "",
          ],
          [
            "刘涵",
            "2019工设2班",
            "小小一份毕设承载着四年的积累和数月的打磨，这份毕业的答卷，离不开日夜的努力，更离不开一直陪伴我的师长、家人、朋友，感谢母校的培养，感谢黄艳群老师的悉心指导，感谢杨墨涵师姐的帮助和指导，感谢答辩组评委老师们的意见和建议，感谢牛彤同志的慰勉，感谢家人朋友们的鼓励！",
            "天津大学读研",
          ],
          [
            "刘淑珊娜",
            "2019工设1班",
            "离别之际，故人难再，且踏上求知之路，心中满怀感慨。四年时间，不只是书本上的知识，还有无数次思考、探索、挫折和收获。这些经历不仅让我成长更让我明白人生真谛。感谢这座大学，让我找到自我，追寻梦想。感谢我的老师，一次次启迪我的思维，鼓励我前行。未来远望，期盼自己永不止步，继续不懈追寻我的道路。",
            "上海交通大学读研",
          ],
          [
            "刘思佳",
            "2019工设2班",
            '"这四年是讲不完的故事，是能数得过来的早饭，是二百多G的文件，是连号的电影票和车票，是还有继续同行的伙伴。感谢学校，感谢老师，感谢同学，感谢257，感谢所有遇见。祝大家都好。"',
            "天津大学读研",
          ],
          [
            "刘泽慧",
            "2019工设1班",
            "四年的工设学习让我不仅收获了专业知识、技能和经验，更重要的是遇到了各位随和热情的老师以及积极可爱的同学，让我本科学习生涯充满不一样的色彩。感谢各位老师的辛苦付出，未来我将继续留在天大，为学校为社会做出自己的贡献。",
            "天津大学读研",
          ],
          [
            "程璐明",
            "2019工业设计（创新设计与卓越管理方向）",
            "感谢相遇！凡是过往，皆为序章~",
            "新加坡国立大学",
          ],
          [
            "廖孟哲",
            "2019工业设计（创新设计与卓越管理方向）",
            "任何命运无论多么复杂漫长,实际上只反映于一个瞬间,那就是人们彻底醒悟自己究竟是谁的那一刻。",
            "阿尔托大学",
          ],
          [
            "刘一凡",
            "2019工业设计（创新设计与卓越管理方向）",
            "相遇是缘，希望我们在之后各自的路上走出灿烂星花。",
            "新加坡国立大学",
          ],
        ],
        M: [
          [
            "马子轩",
            "2019工设2班",
            "时间终是过得很快，不知不觉就要毕业了。再次感谢我的导师李擎炜老师的悉心指导，也感谢这4年来老师与同学们的帮助。因为疫情的关系，这大学4年有3年是通过网课的形式进行，很遗憾没能和同学们一起上课更加认识熟系他们，这是我这大学4年以来唯一的遗憾。希望同学朋友们，在将来能如愿完成自己的人生目标，找到喜爱的工作，哈哈哈哈。",
            "cinsoon auto parts sdn bhd就业",
          ],
        ],
        N: [
          [
            "聂岩",
            "2019工设2班",
            "四年，是一个短暂但充实的时光。在这个过程中，感谢每一位老师的言传身教以及每一位同学的陪伴和支持。工业设计专业让我们在实践和学习中掌握了专业技能，也同时拥有了广阔的视野和创新的思维。希望我们都能由设计出发，构造更美好的明天。",
            "",
          ],
        ],
        P: [
          [
            "潘馨",
            "2019工设2班",
            "怀梦而来，无悔前行，曾经的我以为四年很长，可是如今才发现时光如白驹过隙。大学时光美好而难忘，一路上有欢笑，也有成长。在这里，衷心地感谢老师们的悉心教导、感谢同学们的帮助和陪伴、感谢在四年里遇到的每一个可爱的人。最后，愿我们继续心怀热爱，奔赴下一场山海。毕业快乐！",
            "天津大学读研",
          ],
        ],
        Q: [
          [
            "郄雯文",
            "2019工设1班",
            "感谢各位在大学时光中帮助过我的人，我的作品希望能给大家带来欢乐，愿大家能够童心常驻",
            "",
          ],
          [
            "秦福祺",
            "2019工设1班",
            "在那个秋季的开头，我们来到这陌生的地方，欢欢喜喜的相遇与相识，四年里结识了许多挚友，也在许多老师的帮助下渐渐成长，点点滴滴的经历依然历历在目；在这个夏季的结尾，我们离开这熟悉的地方，依依不舍的分别，不知何时会再见，愿我们前途似锦，顶峰相见。",
            "",
          ],
          [
            "邱子悦",
            "2019工业设计（创新设计与卓越管理方向）",
            '"真的很喜欢设计！真的很喜欢和大家在一起！千言万语道不尽，只待花开再相逢。回到最初的起点：设计是什么？——让我们从今天开始，创造美好！请多来信来电！"',
            "伦敦大学学院",
          ],
        ],
        R: [
          [
            "冉渝茹",
            "2019工设2班",
            "又一年盛夏，不同的是我们。相比四年前，我们收获了太多，褪去青涩，拥抱成长。船会离岸，游子终要离开家，千言万语句不舍，都揉进一句沉甸甸的“不后悔遇见”。感恩一路走来老师们和同学们的同行，毕业既是一场告别，也是一个崭新的开始，未来哪怕不能比肩，也要各自奔向更加美好的世界，祝愿大家都有绚丽的明天！",
            "格拉斯哥",
          ],
          [
            "任冰",
            "2019工业设计（创新设计与卓越管理方向）",
            "谢谢大家，后会有期。",
            "",
          ],
        ],
        S: [
          [
            "孙诗语",
            "2019工设2班",
            "感谢四年里老师和同学们的陪伴和鼓励，让我从一个懵懂的小孩变成了能自学也掌握了很多技能的大人，在各种课程作业当中领会到了设计的魅力，感受了从不可能到可能的过程，也享受团队合作亦或是和老师交流时思维火花的碰撞。过往皆是序章，未来继续加油！",
            "香港城市大学读研",
          ],
          [
            "孙照祥",
            "2019工设2班",
            "感谢这四年的大学生活，感谢我遇到的每一个老师和同学，让我受益匪浅。很庆幸自己在这段学习时光里不断努力，不断挑战，获得了许多机会和成就。离别不舍，我会珍惜这段宝贵经历，把大学得到的知识和品质应用到未来的职场中。愿各位同学和我一起秉持一颗敬业精神，不断追求进步与创新，为社会贡献自己的力量。",
            "",
          ],
        ],
        T: [
          [
            "唐雨琛",
            "2019工业设计（创新设计与卓越管理方向）",
            "天大四年时光真的很精彩，难忘的记忆，幸运的相逢！",
            "威斯康星大学麦迪逊分校",
          ],
        ],
        W: [
          [
            "王晓桐",
            "2019工设2班",
            "好快的四年，一路跌跌撞撞撞到了毕业。在大学的四年，遇到工设，与19工设相识相知是最美好的事情啦！感谢老师们的悉心培养，感谢黄老师和竞焓学姐对毕设的指导与帮助，感谢曾一起组队共同进步的同学们的包容，感谢好朋友们！以及我超爱的257！感谢我的家人的支持与陪伴，最后，夸夸更加勇敢的wxt！毕业啦，祝大家都好，耶吼~",
            "天津大学读研",
          ],
          [
            "王奕霖",
            "2019工设2班",
            "四年的时光眨眼间过去，毕业之际最想感谢各位老师的教诲，感谢各位同学的帮助。未来前行路上我会铭记这段时光，化作动力指引自己成为一个更优秀的设计师，成为一个更优秀的人。",
            "",
          ],
          [
            "王颖蔚",
            "2019工设1班",
            "在大学的这四年里，我学到了许多东西，体验了许多未曾体验的事物，感悟了许多道理。在这期间，我结交了许多新朋友，学到了许多有关设计的知识，同时感谢所有工业设计的老师一直以来对我们的栽培和指导。毕业在即，希望我可以以坚强坚定的心态去面对未知的挑战。感谢那些我们创造的回忆，祝福大家的回忆都充满芬芳。",
            "天津大学读研",
          ],
          [
            "韦博思",
            "2019工设1班",
            "大学本科四年转眼间就到了尾声，这四年中间遇到了很多不同的人和不同的事，有趣的、艰难的、充满挑战性的，即使将来离开了学校，还是留下了很多回忆。还想借这个机会感谢老师们的用心教导、朋友们的陪伴和无私的帮助。祝福大家将来可以一切顺利。",
            "",
          ],
          [
            "王柏捷",
            "2019工业设计（创新设计与卓越管理方向）",
            "我们可能见过面，也可能没有见过面。我们都是时间中的旅行者，我们或将成为这里的故人，但这里却不会是我们的终点，下一个目的地还在等着我们。一名真正的绅士，即使明知必输无疑，也要有勇气接受挑战！所谓觉悟，就是在漆黑的荒野上开辟出一条理当前进的光明大道。",
            "东南大学",
          ],
          [
            "王利丹",
            "2019工业设计（创新设计与卓越管理方向）",
            "转眼间我们都已经准备好向着更美好的未来进发了。",
            "同济大学",
          ],
          [
            "王子悦",
            "2019工业设计（创新设计与卓越管理方向）",
            "江河入海，来日方长。",
            "",
          ],
          [
            "王梓棋",
            "2019工业设计（创新设计与卓越管理方向）",
            "阿木背着书包去荒野求生啦！感谢相遇。",
            "",
          ],
          [
            "吴昕瑶",
            "2019工业设计（创新设计与卓越管理方向）",
            "天大四年的时光，很幸运遇到认识的所有人，感谢相遇",
            "西安交通大学",
          ],
        ],
        X: [
          [
            "辛美璇",
            "2019工业设计（创新设计与卓越管理方向）",
            "向海风许愿，在山海相见",
            "浙江大学",
          ],
        ],
        Y: [
          [
            "杨保鹏",
            "2019工设1班",
            "四年了，我珍惜和同学们相处的每一分，每一秒。 希望我能永远记住大学的记忆。感谢一直以来支持和关心我的朋友们，也感谢这四年来所有教导我的老师们。 希望以后我们还可以见面。再见了所有陪伴我4年的朋友和老师。 再见了大学生活。",
            "",
          ],
          [
            "杨贵山",
            "2019工设2班",
            "大学四年的时光一晃就过去了，毕业了，多么想留住那些那些温暖的日子，但又多么渴望着能早日投进生活的洪流 。感谢老师们和同学们给予我的帮助，这些年知识的果实收获满满，线上和线下的课程是一串甜美的糖葫芦，酸酸甜甜回味无穷。",
            "",
          ],
          [
            "伊木然·热合米图拉",
            "2019工设1班",
            "离开不是离别，是启航，是去追寻我们美丽的梦想！哪怕眼含不舍，我们也要笑着上路。多年以后，当我们再回首，一定还会记得，那初夏的雨中，也曾有你我的笑脸，那和煦的阳光下，也曾映照着你我如水的年华！",
            "",
          ],
          [
            "闫冬涵",
            "2019工业设计（创新设计与卓越管理方向）",
            "感谢一切，未来相见。",
            "",
          ],
        ],
        Z: [
          [
            "张嘉怡",
            "2019工设1班",
            "有谁能挡住时光的脚步，有谁能长留青春的容颜，这一天在不知不觉中到来了，我们就要面临毕业.大学是人生一个里程碑，里程碑的周围往往有着很多很多 的叉路口，而毕业则意味着我们不得不去选择一条路继续走下去.毕业前，我们努力了;毕业时，我们流泪了;毕业后呢?让我们将感恩的心、激动的泪和深情的爱 化作虔诚的祝福，祝福每个人都能够拥有美好的明天!",
            "",
          ],
          [
            "张靖怡",
            "2019工设1班",
            "感谢学校的课程能让我在设计世界中畅游，同时让我明白，大学的意义就在于让每个人找到自己的意义。还记得大二的一门课上老师曾和我们说“设计要以人为本”，我觉得这句话不管放到什么地方都是适用的。四年时光，我在课程中学到的不光是设计方法，更是设计思维，是一种站在用户角度来思考并解决问题的模式，这是我认为最宝贵的东西。",
            "北森云计算有限公司北京分公司就业",
          ],
          [
            "张以琳",
            "2019工设1班",
            "很开心能够在天津大学工业设计度过4年的时间，伴随着三年的疫情，大学生活走入了终点。难忘所有遇见，难忘所有经历，临别之际，祝愿各位都能迎接美好的新生活。凡是过往，皆为序章。",
            "天津大学读研",
          ],
          [
            "张艺瑶",
            "2019工设2班",
            "四年的大学生活即将结束，一路走来，我遇到了很多有趣的人，交到了很多可爱的朋友，接受了很多老师的指点与帮助，终于走到了今天——站在了毕业设计的面前。由于研究生方向的选择，我本科毕设选择了一个与曾经的自己跨度很大的方向，难度较高且充满了未知的挑战。但是经历了这一路的风雨，我坚信能战胜一切困难。我想要感谢很多人——感谢老师们长久以来的培育，感谢同学在我遇到困难时对我的关心和帮助，感谢家人亲友对我的支持与鼓励，在未来我一定会继续努力，继续鉴定勇敢地走下去。",
            "天津大学读研",
          ],
          [
            "周新宇",
            "2019工设1班",
            "在宇宙的征途中，每颗星都有自己的轨迹，在生命的博弈里，每个人都有自己的棋局,高岸为谷，深谷为陵，愿我们都能遵循自己的发展时区，以梦为马，披荆斩棘。",
            "",
          ],
          [
            "张贸惟",
            "2019工业设计（创新设计与卓越管理方向）",
            '"这个辅修课程让我有机会探索和学习创新的设计方法和技巧。通过与主修专业的交叉学习，我深入了解了工业设计的原理和实践。在这里，我结识了许多优秀的同学和教师，他们的支持和鼓励对我产生了积极的影响。在团队合作的项目中，我学会了有效地与他人合作，倾听他人的意见并提供建设性的反馈。这些经历锻炼了我的沟通和领导能力。此外，通过实践项目和实习机会，我有机会将所学的理论知识应用到实际中。这让我更加了解工业设计的实际挑战，并培养了解决问题和创新思维的能力。我要感谢所有支持和帮助过我的老师、同学和家人。你们的鼓励和支持是我前进的动力。我相信，无论我未来选择什么职业道路，工业设计辅修的学习经历将成为我人生中宝贵的财富。"',
            "同济大学",
          ],
          [
            "章毓翀",
            "2019工业设计（创新设计与卓越管理方向）",
            "但为君故，Nice to!! See you..",
            "同济大学",
          ],
          [
            "周诗沁",
            "2019工业设计（创新设计与卓越管理方向）",
            "我们力求在因此而变得可贵的万物中重新找到我们的心灵曾经投射其上的反光；我们失望地发现在自然中万物仿佛失去了原先在我们的思想中由某些相近的观念所赋予的魅力；有时我们把这种精神力量全都化为光华熠熠的机敏，以影响我们明知在我们身外却又无法触及的他人。",
            "罗切斯特大学",
          ],
        ],
      },
    };
  },
};
</script>

<style scoped>
.graduate {
  position: relative;
}
.pc-graduate {
  background-image: url("../assets/g2.webp");
  background-size: 100%;
  background-repeat: no-repeat;
  background-attachment: fixed;
  background-position: 0 0;
  display: flex;
  align-items: center;
  flex-direction: column;
  padding-top: 200px;
  padding-bottom: 120px;
}
.m-graduate {
  padding-top: 50px;
  background-image: url("../assets/mobile/bi.webp");
  background-size: 100%;
  background-attachment: fixed;
  background-position: 0 0;
}
.title {
  font-weight: 400;
  font-size: 36px;
  color: #262626;
  margin-bottom: 60px;
}
.g-teacher {
  display: grid;
  grid-template-columns: 1fr 1fr;
  column-gap: 32px;
  row-gap: 32px;
  margin-bottom: 120px;
}
.card {
  width: 700px;
  box-sizing: border-box;
  padding: 24px;
  background-image: url("../assets/g3.webp");
  background-size: 100% 100%;
  display: flex;
}
.m-card {
  width: 360px;
  padding: 12px;
  box-sizing: border-box;
  background-image: url("../assets/g3.webp");
  background-size: 100% 100%;
  display: flex;
  margin-bottom: 9px;
}
.card-img {
  width: 272px;
  height: 272px;
  border-radius: 16px;
  object-fit: cover;
  object-position: top;
  flex-shrink: 0;
  margin-right: 32px;
}
.m-card-img {
  width: 92px;
  height: 92px;
  border-radius: 5px;
  object-fit: cover;
  object-position: top;
  flex-shrink: 0;
  margin-right: 9px;
}
.card-name-line {
  display: flex;
  margin-bottom: 6px;
  align-items: flex-end;
}
.m-card-name-line {
  display: flex;
  margin-bottom: 6px;
  align-items: flex-end;
}
.card-name {
  font-weight: 400;
  font-size: 30px;
  color: #262626;
  flex-shrink: 0;
}
.m-card-name {
  font-weight: 300;
  font-size: 14px;
  color: #262626;
  flex-shrink: 0;
}
.card-info {
  flex-grow: 2;
  height: 272px;
  display: flex;
  flex-direction: column;
}
.m-card-info {
  flex-grow: 2;
  height: 92px;
  display: flex;
  flex-direction: column;
}
.card-go {
  font-weight: 400;
  font-size: 16px;
  line-height: 24px;
  color: rgba(0, 0, 0, 0.45);
  text-align: right;
}
.m-card-go {
  font-weight: 400;
  font-size: 8px;
  line-height: 12px;
  color: rgba(0, 0, 0, 0.45);
  text-align: right;
}
.card-text {
  font-weight: 200;
  font-size: 16px;
  color: #262626;
  white-space: unset;
  text-align: justify;
  line-height: 24px;
  flex-shrink: 2;
  flex-grow: 2;
  display: -webkit-box;
  -webkit-line-clamp: 9;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
.m-card-text {
  font-weight: 200;
  font-size: 8px;
  color: #262626;
  white-space: unset;
  text-align: justify;
  line-height: 12px;
  flex-shrink: 2;
  display: -webkit-box;
  -webkit-line-clamp: 5;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
.text-t {
  -webkit-line-clamp: 10;
}
.space {
  margin-right: 2em;
}
.card-class {
  font-weight: 200;
  font-size: 20px;
  color: rgba(0, 0, 0, 0.45);
  margin-left: 10px;
  flex-grow: 2;
}
.m-card-class {
  font-weight: 200;
  font-size: 10px;
  color: rgba(0, 0, 0, 0.45);
  margin-left: 8px;
}
.nav {
  display: grid;
  width: 100%;
  height: 44px;
  grid-template-columns: 1fr 1fr;
  align-items: center;
  justify-items: center;
  margin-top: 6px;
}
.nav-1 {
  background-color: #d36a64;
  font-weight: 500;
  font-size: 14px;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
}
.nav-2 {
  font-weight: 300;
  font-size: 14px;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #d36a64;
  background-color: white;
}
.teacher {
  margin-top: 25px;
  width: 100%;
}
.teacher-title {
  margin-top: 90px;
  font-size: 36px;
  font-weight: 700;
  text-align: center;
}
.teacher-images {
  display: flex;
  justify-content: space-between;
  margin: 80px 85px;
  margin-bottom: 0px;
}
.teacher-images img {
  width: 863px;
  height: 282px;
}
.student {
  position: relative;
  margin-top: 25px;
  width: 100%;
}
.student-title {
  margin-top: 90px;
  font-size: 36px;
  font-weight: 700;
  text-align: center;
}
.student-images {
  display: grid;
  grid-template-columns: 580px 580px 580px;
  grid-template-rows: repeat(auto-fill, 190px);
  row-gap: 30px;
  margin: 80px 85px;
}
.student-images img {
  width: 580px;
  height: 190px;
}
.back_1 {
  position: absolute;
  left: 0;
  top: 0;
  width: 550px;
  height: 540px;
  z-index: -1;
}
.back_2 {
  position: absolute;
  right: 0;
  top: 0;
  width: 550px;
  height: 540px;
  z-index: -1;
}
.back_3_1 {
  position: absolute;
  left: 50%;
  top: 190px;
  transform: translateX(-50%);
  width: 695px;
  height: 24px;
}
.back_3_2 {
  position: absolute;
  left: 50%;
  top: 165px;
  transform: translateX(-50%);
  width: 695px;
  height: 24px;
}
.msg-dialog {
  position: fixed;
  left: 0;
  top: 0;
  bottom: 0;
  right: 0;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 103;
}
.nav-img {
  position: relative;
  width: 394px;
  margin: 0 auto;
}
.nav-img img {
  width: 100%;
}
.bt1 {
  position: absolute;
  left: 0;
  top: 0;
  width: 50%;
  height: 100%;
}
.bt2 {
  position: absolute;
  left: 50%;
  top: 0;
  width: 50%;
  height: 100%;
}
.msg-img {
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  width: 414px;
  height: 577px;
  background-image: url("../assets/mobile/graduate.webp");
  background-size: 414px 577px;
}
.msg-en-img {
  background-image: url("../assets/mobile/graduate-en.webp");
}
.msg-btn {
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(calc(-50% + 160px), calc(-50% - 240px));
  width: 50px;
  height: 50px;
}
.msg-btn-2 {
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(calc(-50% - 60px), calc(-50% - 145px));
  width: 40px;
  height: 40px;
}
.students {
  margin-left: 16px;
  margin-bottom: 40px;
}
.letter {
  position: relative;
  margin-top: 16px;
  margin-bottom: 7px;
  font-size: 10px;
  color: #8a8a8a;
  display: flex;
  align-items: center;
}
.point {
  position: absolute;
  top: -100px;
}
.letter span {
  font-size: 10px;
  color: #d2d1d2;
}
.letter img {
  width: 10px;
  height: 13px;
}
.student-item {
  width: 350px;
  height: 115px;
  margin: 5px 0;
}
.letters-nav {
  position: fixed;
  right: 10px;
  top: 150px;
  width: 24px;
  background: #ffffff;
  border-radius: 12px;
  padding-top: 4px;
  padding-bottom: 4px;
  z-index: 100;
}
.letter-nav {
  width: 16px;
  height: 16px;
  font-size: 10px;
  border-radius: 8px;
  display: flex;
  margin: 2px auto;
  overflow: hidden;
  align-items: center;
  justify-content: center;
  color: #e2e2e2;
}
</style>