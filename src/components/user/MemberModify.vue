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
          class="text-center mt-3 card border-success"
          style="max-width: 35rem; width: 35rem"
          align="center"
        >
          <b-form class="text-left">
            <b-alert show variant="danger" v-if="isModifyError"
              >빈 칸을 채워주세요.</b-alert
            >
            <b-form-group>
              <input class="tf_g" v-model="user.userid" />
            </b-form-group>
            <b-form-group>
              <input class="tf_g" v-model="user.userpwd" />
            </b-form-group>
            <b-form-group>
              <input class="tf_g" v-model="user.username" />
            </b-form-group>
            <b-form-group>
              <input class="tf_g" v-model="user.email" />
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
</style>
