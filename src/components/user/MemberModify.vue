<template>
  <b-container class="bv-example-row mt-3">
    <b-row>
      <b-col>
        <b-alert variant="secondary" show><h3>회원정보 수정</h3></b-alert>
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
            <b-alert show variant="danger" v-if="isModifyError">
              빈 칸을 채워주세요
            </b-alert>
            <b-form-group>
              <b-form-input id="userId" v-model="user.userId"></b-form-input>
            </b-form-group>
            <b-form-group>
              <b-form-input id="userPwd" v-model="user.userPwd"></b-form-input>
            </b-form-group>
            <b-form-group>
              <b-form-input
                id="userName"
                v-model="user.userName"
              ></b-form-input>
            </b-form-group>
            <b-form-group>
              <b-form-input
                id="userEmail"
                v-model="user.userEmail"
              ></b-form-input>
            </b-form-group>
            <b-form-group>
              <b-form-input
                id="userPhoneNumber"
                v-model="user.userPhoneNumber"
              ></b-form-input>
            </b-form-group>
            <b-button
              type="button"
              variant="success"
              class="m-1"
              @click="modify"
              >확인</b-button
            >
            <b-button type="button" variant="danger" class="m-1" @click="remove"
              >회원탈퇴</b-button
            >
          </b-form>
        </b-card>
      </b-col>
    </b-row>
  </b-container>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
export default {
  name: "MemberModify",
  data() {
    return {
      isModifyError: false,
      user: {},
    };
  },
  methods: {
    ...mapActions(["modifyUser", "deleteUser"]),
    modify() {
      if (this.isBlankExists) {
        this.showAlert();
      } else {
        //axios post
        this.modifyUser(this.user);
      }
    },

    remove() {
      this.deleteUser();
    },

    showAlert() {
      this.isModifyError = true;
      setTimeout(() => {
        this.isModifyError = false;
      }, 1000);
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
    ...mapGetters([
      "userId",
      "userPwd",
      "userName",
      "userEmail",
      "userPhoneNumber",
    ]),
  },
  created() {
    this.user = {
      userId: this.userId,
      userPwd: this.userPwd,
      userName: this.userName,
      userEmail: this.userEmail,
      userPhoneNumber: this.userPhoneNumber,
    };
  },
};
</script>

<style></style>
