<template>
  <b-container class="bv-example-row mt-3">
    <b-row>
      <b-col>
        <b-alert variant="secondary" show><h3>로그인</h3></b-alert>
      </b-col>
    </b-row>
    <b-row>
      <b-col></b-col>
      <b-col cols="8">
        <b-card class="text-center mt-3" style="max-width: 40rem" align="left">
          <b-form class="text-left">
            <b-alert show variant="danger" v-if="isLoginError"
              >아이디 또는 비밀번호를 확인하세요.</b-alert
            >
            <b-form-group label="아이디:" label-for="userId">
              <b-form-input
                id="userId"
                v-model="user.userId"
                required
                :placeholder="idInputMsg"
                @focus="idInputMsg = ''"
                @blur="idInputMsg = '아이디 입력'"
                @keyup.enter="confirm"
              ></b-form-input>
            </b-form-group>
            <b-form-group label="비밀번호:" label-for="userPwd">
              <b-form-input
                type="password"
                id="userPwd"
                v-model="user.userPwd"
                required
                placeholder="비밀번호 입력...."
                @keyup.enter="confirm"
              ></b-form-input>
            </b-form-group>
            <b-button
              type="button"
              variant="primary"
              class="m-1"
              @click="confirm"
              >로그인</b-button
            >
            <b-button
              type="button"
              variant="success"
              class="m-1"
              @click="movePage"
              >회원가입</b-button
            >
          </b-form>
        </b-card>
      </b-col>
      <b-col></b-col>
    </b-row>
  </b-container>
</template>

<script>
import { mapActions, mapMutations } from "vuex";
export default {
  name: "MemberLogin",
  data() {
    return {
      isLoginError: false,
      user: {
        userId: "",
        userPwd: "",
      },
      idInputMsg: "아이디 입력",
    };
  },
  methods: {
    ...mapActions(["setUser"]),
    ...mapMutations(["SET_SESSION"]),
    confirm() {
      if (this.user.userId === "ssafy" && this.user.userPwd === "1111") {
        this.$router.push({ name: "home" });
        alert("로그인!!!");
        this.setUser(this.user);
        this.SET_SESSION();
      } else {
        alert("로그인 실패");
      }
    },
    movePage() {
      this.$router.push({ name: "signUp" });
    },
  },
  computed: {},
};
</script>

<style></style>
