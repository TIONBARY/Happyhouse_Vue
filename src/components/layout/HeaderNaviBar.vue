<template>
  <div>
    <b-navbar toggleable="lg" type="dark" variant="light">
      <b-navbar-brand href="#">
        <router-link to="/">
          <img
            src="@/assets/housing_logo.png"
            class="d-inline-block align-middle"
            width="100px"
            alt="ssafy"
          />
        </router-link>
      </b-navbar-brand>

      <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

      <b-collapse id="nav-collapse" is-nav>
        <b-navbar-nav>
          <b-nav-item href="#"
            ><router-link :to="{ name: 'home' }" class="link"
              >홈</router-link
            ></b-nav-item
          >
          <b-nav-item href="#"
            ><router-link :to="{ name: 'board' }" class="link">
              공지사항</router-link
            ></b-nav-item
          >
          <b-nav-item href="#"
            ><router-link :to="{ name: 'house' }" class="link">
              아파트정보</router-link
            ></b-nav-item
          >
        </b-navbar-nav>
        <b-navbar-nav class="ml-auto">
          <b-nav-item-dropdown right>
            <template #button-content>
              <b-icon
                icon="person-fill"
                font-scale="2"
                variant="success"
              ></b-icon>
            </template>
            <b-dropdown-item v-if="currentUserId" href="#"
              ><router-link :to="{ name: 'modify' }" class="link"
                ><b-icon icon="person-circle"></b-icon> 정보수정</router-link
              ></b-dropdown-item
            >
            <b-dropdown-item v-else href="#"
              ><router-link :to="{ name: 'signUp' }" class="link"
                ><b-icon icon="person-circle"></b-icon> 회원가입</router-link
              ></b-dropdown-item
            >
            <b-dropdown-item v-if="currentUserId" href="#"
              ><router-link
                @click.native="logout"
                :to="{ name: 'signIn' }"
                class="link"
                ><b-icon icon="key"></b-icon> 로그아웃
              </router-link>
            </b-dropdown-item>
            <b-dropdown-item v-else href="#"
              ><router-link :to="{ name: 'signIn' }" class="link"
                ><b-icon icon="key"></b-icon> 로그인</router-link
              ></b-dropdown-item
            >
          </b-nav-item-dropdown>
        </b-navbar-nav>
      </b-collapse>
    </b-navbar>
  </div>
</template>

<script>
import { mapActions, mapState, mapGetters } from "vuex";
const memberStore = "memberStore";
export default {
  name: "HeaderNaviBar",
  computed: {
    ...mapState(memberStore, ["currentUserId"]),
    ...mapGetters(memberStore, ["getKakaoToken"]),
  },
  methods: {
    ...mapActions(memberStore, ["signOut", "signOutKakaoUser"]),
    logout() {
      if (this.getKakaoToken) {
        this.signOutKakaoUser(this.getKakaoToken);
      } else {
        this.signOut();
      }
    },
  },
};
</script>

<style scoped>
a {
  text-decoration: none !important;
  color: rgb(40, 167, 69) !important;
}
</style>
