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
              <b-form-input id="userId" v-model="user.userid"></b-form-input>
            </b-form-group>
            <b-form-group>
              <b-form-input id="userPwd" v-model="user.userpwd"></b-form-input>
            </b-form-group>
            <b-form-group>
              <b-form-input
                id="userName"
                v-model="user.username"
              ></b-form-input>
            </b-form-group>
            <b-form-group>
              <b-form-input id="userEmail" v-model="user.email"></b-form-input>
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
import { mapGetters, mapActions, mapState } from "vuex";
const memberStore = "memberStore";

export default {
  name: "MemberModify",
  data() {
    return {
      isModifyError: false,
      user: {},
    };
  },
  methods: {
    ...mapActions(memberStore, [
      "modifyCurrentUser",
      "deleteCurrentUser",
      "getUserInfo",
    ]),
    modify() {
      if (this.isBlankExists) {
        this.showAlert();
      } else {
        this.modifyCurrentUser(this.user);
        this.$router.push({ name: "home" });
      }
    },

    remove() {
      this.deleteCurrentUser(this.currentUserId);
      this.$router.push({ name: "home" });
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
        !this.user.userid ||
        !this.user.userpwd ||
        !this.user.username ||
        !this.user.email
      );
    },
    ...mapGetters(memberStore, ["checkUserInfo", "checkUserId"]),
    ...mapState(memberStore, ["userInfo", "currentUserId"]),
  },
  async created() {
    if (this.currentUserId.length === 0) {
      this.$router.push({ name: "home" });
    }
    await this.getUserInfo(this.currentUserId);
    this.user = {
      userid: this.userInfo ? this.userInfo.userid : "",
      userpwd: this.userInfo ? this.userInfo.userpwd : "",
      username: this.userInfo ? this.userInfo.username : "",
      email: this.userInfo ? this.userInfo.email : "",
    };
  },
};
</script>

<style></style>
