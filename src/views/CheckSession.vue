<template>
  <div></div>
</template>

<script>
import { checkSession } from "@/api/session.js";
import { mapMutations } from "vuex";

const memberStore = "memberStore";

export default {
  name: "CheckSession",
  async created() {
    const { data } = await checkSession();
    const token = data.kakao_token;
    this.SET_KAKAO_TOKEN(token);
    this.$router.push({ name: "home" });
  },
  methods: {
    ...mapMutations(memberStore, ["SET_KAKAO_TOKEN"]),
  },
};
</script>

<style></style>
