<template>
  <b-container class="bv-example-row mt-3">
    <b-row>
      <b-col>
        <b-alert variant="secondary" show><h3>회원가입</h3></b-alert>
      </b-col>
    </b-row>
    <b-row>
      <b-col align="center">
        <b-card
          class="text-center mt-3"
          style="max-width: 40rem"
          align="center"
        >
          <b-form class="text-left">
            <b-alert show variant="danger" v-if="isRegisterError">
              빈 칸을 채워주세요
            </b-alert>
            <b-form-group>
              <b-form-input id="userId" v-model="user.userid"></b-form-input>
            </b-form-group>
            <b-form-group>
              <b-form-input
                id="userPwd"
                v-model="user.userpwd"
                type="password"
              ></b-form-input>
            </b-form-group>
            <b-form-group>
              <b-form-input
                id="username"
                v-model="user.username"
              ></b-form-input>
            </b-form-group>
            <b-form-group>
              <b-form-input
                id="userEmail"
                v-model="user.useremail"
              ></b-form-input>
            </b-form-group>
            <b-form-group>
              <b-form-input
                id="userPhoneNumber"
                v-model="user.userphone"
              ></b-form-input>
            </b-form-group>
            <b-button
              type="button"
              variant="success"
              class="m-1"
              @click="register"
              >확인</b-button
            >
          </b-form>
        </b-card>
      </b-col>
    </b-row>
  </b-container>
</template>

<script>
import { mapActions } from "vuex";
export default {
  name: "MemberRegister",
  data() {
    return {
      isRegisterError: false,
      user: {
        userId: "",
        userPwd: "",
        userName: "",
        userEmail: "",
        userPhoneNumber: "",
      },
    };
  },
  methods: {
    register() {
      if (this.isBlankExists) {
        this.showAlert();
      } else {
        //axios post
        this.registUser(this.user);
        this.movePage();
      }
    },

    showAlert() {
      this.isRegisterError = true;
      setTimeout(() => {
        this.isRegisterError = false;
      }, 1000);
    },

    movePage() {
      this.$router.push({ name: "signIn" });
    },
  },
  computed: {
    isBlankExists: function () {
      return (
        !this.user.userId ||
        !this.user.userPwd ||
        !this.user.userName ||
        !this.user.userEmail ||
        !this.user.userPhoneNumber
      );
    },
    ...mapActions(["registUser"]),
  },
};
</script>

<style></style>
