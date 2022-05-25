<template>
  <b-container class="bv-example-row mt-3">
    <b-row>
      <b-col>
        <h3>로그인</h3>
      </b-col>
    </b-row>
    <b-row>
      <b-col></b-col>
      <b-col cols="6">
        <b-card
          class="text-center mt-3 card border-success"
          style="max-width: 35rem; width: 35rem"
          align="center"
        >
          <b-form class="text-left">
            <b-alert show variant="danger" v-if="isLoginError">{{
              loginErrMsg
            }}</b-alert>
            <b-form-group>
              <input
                class="tf_g"
                name="userid"
                v-model="user.userid"
                required
                :placeholder="idInputMsg"
                @focus="idInputMsg = ''"
                @blur="idInputMsg = '아이디를 입력하세요'"
                @keyup.enter="confirm"
              />
            </b-form-group>
            <b-form-group>
              <input
                class="tf_g"
                name="userpwd"
                type="password"
                v-model="user.userpwd"
                required
                :placeholder="pwdInputMsg"
                @focus="pwdInputMsg = ''"
                @blur="pwdInputMsg = '비밀번호를 입력하세요'"
                @keyup.enter="confirm"
              />
            </b-form-group>

            <div class="checkboxDiv">
              <input type="checkbox" />
              <span class="checkboxText">로그인 상태 유지</span>
            </div>
            <button class="btn_g" type="button" @click="confirm">로그인</button>

            <span class="line_or"><span class="txt_or">또는</span></span>

            <div class="socialLoginDiv">
              <a
                href="https://kauth.kakao.com/oauth/authorize?client_id=46889a8d5dfaadd88106dc2ba1745dc6&redirect_uri=http://localhost:9999/vue/user/kakao&response_type=code"
              >
                <img
                  src="@/assets/kakao_login_image.png"
                  alt=""
                  class="kakaoLogin"
                />
              </a>
              <a href="">
                <img
                  src="@/assets/naver_login_image.png"
                  alt=""
                  class="naverLogin"
                />
              </a>
            </div>
          </b-form>
        </b-card>
      </b-col>
      <b-col></b-col>
    </b-row>
  </b-container>
</template>

<script>
import { mapState, mapActions } from "vuex";
const memberStore = "memberStore";
export default {
  name: "MemberLogin",
  data() {
    return {
      idInputMsg: "아이디를 입력하세요",
      pwdInputMsg: "비밀번호를 입력하세요",
      user: {
        userid: null,
        userpwd: null,
      },
    };
  },
  computed: {
    ...mapState(memberStore, ["isLogin", "isLoginError", "loginErrMsg"]),
  },
  methods: {
    ...mapActions(memberStore, ["userConfirm", "getUserInfo"]),
    async confirm() {
      await this.userConfirm(this.user);
      //let token = sessionStorage.getItem("access-token");
      if (this.isLogin) {
        //await this.getUserInfo(token);
        this.$router.push({ name: "home" });
      }
    },
    movePage() {
      this.$router.push({ name: "signup" });
    },
  },
};
</script>

<style scoped>
.tf_g {
  width: 80%;
  height: 48px;
  border-style: solid;
  border-width: 0 0 1.5px 0;
  border-color: #ebebeb;
  padding: 11px 70px 8px 0;
  color: #252525;
  outline: 0;
  border-radius: 0;
  box-sizing: border-box;
  text-decoration: none;
  margin-bottom: 20px;
}
.btn_g {
  display: block;
  width: 80%;
  height: 50px;
  border: 0;
  border-radius: 4px;
  margin: auto;
  font-size: 18px;
  color: #191919;
  background-color: #b4e197;
  /* background-color: #f9f3ee; */
  /* background-color: #fee500; */
}

input[type="checkbox"] {
  width: 20px;
  height: 20px;
  border-radius: 50%;
  border: 1px solid #999;
  appearance: none;
  cursor: pointer;
  transition: background 0.2s;
  margin-left: 10%;
  float: left;
}

input[type="checkbox"]:checked {
  background-color: #191919;
}

.checkboxText {
  float: left;
  margin-left: 10px;
  font-size: 15px;
}

.checkboxDiv {
  margin-bottom: 40px;
}

.socialLoginDiv {
  width: 80%;
  margin: auto;
  height: 50px;
}

.kakaoLogin {
  height: 50px;
  float: left;
}

.naverLogin {
  height: 50px;
  float: right;
}

.line_or {
  position: relative;
  display: block;
  width: 80%;
  margin: auto;
  padding: 15px 0;
  font-size: 0;
  line-height: 0;
}

.line_or::before {
  display: inline-block;
  width: calc(50% - 20px);
  height: 1px;
  margin: 8px 0;
  background-color: rgba(0, 0, 0, 0.06);
  vertical-align: top;
  content: "";
}

.line_or::after {
  display: inline-block;
  width: calc(50% - 20px);
  height: 1px;
  margin: 8px 0;
  background-color: rgba(0, 0, 0, 0.06);
  vertical-align: top;
  content: "";
}

.line_or .txt_or {
  display: inline-block;
  width: 40px;
  font-size: 12px;
  line-height: 18px;
  text-align: center;
  color: rgba(0, 0, 0, 0.3);
}
</style>
