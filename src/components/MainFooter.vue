<template>
  <div class="footer">
    <div class="links">
      <div class="specialGird-1 noSelect">相关网站</div>
      <div class="specialGird-2 noSelect">
        <a href="http://www.tju.edu.cn/" target="_blank">天津大学</a>
        <div>
          <a
            href="http://me.tju.edu.cn/"
            target="_blank"
            style="margin-right: 0"
            >机械工程学院</a
          >·<a href="http://idesign.tju.edu.cn/" target="_blank">工业设计</a>
        </div>
        <a href="http://arch.tju.edu.cn/" target="_blank">建筑学院</a>
        <a href="http://cic.tju.edu.cn/" target="_blank">智能与计算学部</a>
        <a
          href="javascript:void(0)"
          @mouseover="qrHover = true"
          @mouseout="qrHover = false"
          >宣怀学院</a
        >
      </div>
      <div class="specialGird-6 noSelect">历届年展</div>
      <div class="specialGird-2 specialGird-7 noSelect">
        <a href="http://idesign.tju.edu.cn/marseum" target="_blank"
          >2022·第八届</a
        ><a
          href="http://idesign.tju.edu.cn/exhibitions2021/index/index.html"
          target="_blank"
          >2021·第七届</a
        ><a
          href="http://idesign.tju.edu.cn/exhibitions/index/index.html"
          target="_blank"
          >2020·第六届</a
        ><a
          href="http://idesign.tju.edu.cn/exhibitions/index/d_show/id/5.html"
          target="_blank"
          >2019·第五届</a
        ><a
          href="http://idesign.tju.edu.cn/exhibitions/index/d_show/id/4.html"
          target="_blank"
          >2018·第四届</a
        ><a
          href="http://idesign.tju.edu.cn/exhibitions/index/d_show/id/3.html"
          target="_blank"
          >2017·第三届</a
        ><a
          href="http://idesign.tju.edu.cn/exhibitions/index/d_show/id/2.html"
          target="_blank"
          >2016·第二届</a
        ><a
          href="http://idesign.tju.edu.cn/exhibitions/index/d_show/id/1.html"
          target="_blank"
          >2015·第一届</a
        >
      </div>
      <div class="specialGird-3 noSelect">关于我们</div>
      <div class="specialGird-4">
        地址 / 中国·天津市津南区雅观路135号北洋园校区35教学楼
      </div>
      <div class="specialGird-5"></div>
      <div class="specialGird-4">电话 / 022-27402172</div>
      <div class="specialGird-4">邮箱 / idesign@tju.edu.cn</div>
      <div class="specialGird-4">邮编 / 300354</div>
    </div>
    <img
      src="../assets/qrcode.png"
      class="QR-code noSelect"
      alt="QRCode"
      v-show="qrHover"
      @dragstart.prevent
    />
    <p class="copyright noSelect">
      © 2023 天津大学机械工程学院机械工程系工业设计专业 版权所有
    </p>
  </div>
</template>
<script>
export default {
  props: ["notMobile"],
  data() {
    return {
      qrHover: false,
    };
  },
};
</script>

<style scoped>
.footer {
  position: relative;
  bottom: 0px;
  width: 100%;
  height: 460px;
  transition: all 0.7s cubic-bezier(0.16, 1.08, 0.38, 0.98);
  background: rgba(255, 255, 255, 0.36);
  box-shadow: inset -32px 32px 32px rgba(255, 255, 255, 0.158);
  backdrop-filter: blur(16px);
  padding: 0 260px;
  overflow: visible;
}
.sub-footer-icon {
  position: absolute;
  width: 285px;
  height: 50px;
  top: -25px;
  right: 150px;
  background-color: white;
}
.links {
  display: grid;
  grid-template-columns: 280px auto;
  grid-template-rows: 90px auto auto auto auto auto;
  font-size: 22px;
  color: #262626;
}
.links a {
  text-decoration: none;
  font-size: 22px;
  color: #262626;
  margin-right: 40px;
  font-weight: 300;
}
.links a:hover {
  text-decoration: underline;
}
.specialGird-1 {
  align-self: end;
  justify-self: center;
}
.specialGird-2 {
  display: flex;
  justify-content: flex-start;
  align-items: flex-end;
  flex-wrap: wrap;
}
.specialGird-6 {
  align-self: flex-start;
  justify-self: center;
  margin-top: 24px;
}
.specialGird-7 a {
  margin-top: 24px;
}
.specialGird-3 {
  align-self: end;
  justify-self: center;
  margin-top: 24px;
}
.specialGird-4 {
  justify-self: start;
  align-self: end;
  color: #262626;
  font-weight: 300;
  margin-top: 24px;
}
.specialGird-5 {
  grid-row: 4 / 7;
}
.QR-code {
  position: absolute;
  top: -150px;
  right: 510px;
  width: 200px;
  height: 210px;
}
.copyright {
  position: absolute;
  bottom: 20px;
  left: 50%;
  transform: translateX(-50%);
  font-size: 22px;
  color: #000000;
}
@media screen and (max-width: 620px) {
  .footer {
    height: 200px;
    width: 100%;
    padding: 0;
    padding-top: 25px;
    background: transparent;
  }
  .links {
    display: grid;
    grid-template-columns: 80px auto;
    grid-template-rows: 20px 20px 20px 20px 20px 20px;
    font-size: 8px;
    align-items: start;
    color: #51514f;
    overflow: visible;
  }
  .specialGird-1 {
    align-self: start;
    justify-self: center;
  }
  .specialGird-3 {
    align-self: start;
    justify-self: center;
    margin-top: 18px;
  }
  .specialGird-4 {
    justify-self: start;
    align-self: start;
  }
  .links a {
    font-size: 8px;
    color: #51514f;
    margin-right: 14px;
  }
  .specialGird-4 {
    margin-top: 18px;
  }
  .specialGird-6 {
    margin-top: 3px;
  }
  .specialGird-7 {
    margin-top: 3px;
  }
  .specialGird-7 a {
    margin-top: 0;
  }
  .copyright {
    font-size: 8px;
    color: #51514f;
  }
  .specialGird-2 {
    flex-wrap: wrap;
  }
  .footer-icon {
    position: absolute;
    width: 96px;
    height: 14px;
    top: -7px;
    right: 40px;
    background-color: white;
  }
  .sub-footer-icon {
    position: absolute;
    width: 96px;
    height: 18px;
    top: -9px;
    right: 40px;
    background-color: white;
  }
  .QR-code {
    position: absolute;
    top: 40px;
    left: 320px;
    width: 75px;
    height: 75px;
  }
}
</style>