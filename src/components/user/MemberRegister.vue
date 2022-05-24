<template>
  <b-container class="bv-example-row mt-3">
    <b-row>
      <b-col>
        <h3>회원가입</h3>
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
            <b-alert show variant="danger" v-if="isRegisterError">{{
              registerErrorMsg
            }}</b-alert>
            <b-form-group>
              <input
                class="tf_g"
                name="userid"
                v-model="user.userid"
                required
                :placeholder="idInputMsg"
                @focus="idInputMsg = ''"
                @blur="idInputMsg = '아이디'"
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
                @blur="pwdInputMsg = '비밀번호'"
                @keyup.enter="confirm"
              />
            </b-form-group>
            <b-form-group>
              <input
                class="tf_g"
                name="username"
                type="text"
                v-model="user.username"
                required
                :placeholder="nameInputMsg"
                @focus="nameInputMsg = ''"
                @blur="nameInputMsg = '이름'"
                @keyup.enter="confirm"
              />
            </b-form-group>
            <b-form-group>
              <input
                class="tf_g"
                name="useremail"
                type="email"
                v-model="user.email"
                required
                :placeholder="emailInputMsg"
                @focus="emailInputMsg = ''"
                @blur="pwdInputMsg = 'E-mail'"
                @keyup.enter="confirm"
              />
            </b-form-group>

            <button class="btn_g" type="button" @click="register">
              회원가입
            </button>
          </b-form>
        </b-card>
      </b-col>
      <b-col></b-col>
    </b-row>
  </b-container>
</template>

<script>
import { mapActions } from "vuex";
const memberStore = "memberStore";
export default {
  name: "MemberRegister",
  data() {
    return {
      idInputMsg: "아이디",
      pwdInputMsg: "비밀번호",
      nameInputMsg: "이름",
      emailInputMsg: "E-mail",
      isRegisterError: false,
      registerErrorMsg: "빈 칸이 있는지 확인하세요.",
      user: {
        userid: "",
        userpwd: "",
        username: "",
        email: "",
      },
    };
  },
  methods: {
    async register() {
      if (this.isBlankExists) {
        this.showAlert();
      } else {
        let message = await this.registerUser(this.user);
        if (message === "success") {
          this.movePage();
        } else {
          this.registerErrorMsg = message;
          this.showAlert();
        }
      }
    },

    showAlert() {
      this.isRegisterError = true;
      setTimeout(() => {
        this.isRegisterError = false;
        this.registerErrorMsg = "빈 칸이 있는지 확인하세요.";
      }, 1000);
    },

    movePage() {
      this.$router.push({ name: "signIn" });
    },
    ...mapActions(memberStore, ["registerUser"]),
  },
  computed: {
    isBlankExists: function () {
      return (
        !this.user.userid ||
        !this.user.userpwd ||
        !this.user.username ||
        !this.user.email
      );
    },
  },
};
</script>

<style>
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
</style>
