<template>
  <b-container class="bv-example-row mt-3 text-center">
    <img src="@/assets/housing_logo_white.png" width="100px" />
    <hr />
    <div
      id="banner"
      class="mb-4 bg-dark container-2xl position-relative"
      style="height: 430px"
    >
      <!-- Image -->
      <div class="container-lg">
        <img src="" alt="" />
      </div>
      <div
        class="position-absolute top-50 start-50 translate-middle"
        style="min-width: max-content"
      >
        <div class="my-3 d-flex flex-column">
          <span class="text-white h2 fw-bolder m-0"
            >어떤 집에서 살고 싶으신가요?&nbsp;&nbsp;&nbsp;&nbsp;</span
          >
          <span class="text-white h5 fw-normal my-2"
            >원하는 집의 실거래가를 확인하세요.</span
          >
        </div>

        <div class="d-flex">
          <div class="input-group flex-grow-1 border-0 me-2">
            <select class="form-select" name="category1" id="category1">
              <option selected>도/광역시</option>
              <option value="1">서울특별시</option>
              <option value="2">경기도</option>
              <option value="3">제주도</option>
            </select>
          </div>
          <div class="input-group flex-grow-1 border-0 me-2">
            <select class="form-select" name="category2" id="category2">
              <option selected>시/군/구</option>
              <option value="1">강남구</option>
              <option value="2">강동구</option>
              <option value="3">광진구</option>
            </select>
          </div>
          <b-button><b-icon icon="search"></b-icon></b-button>
        </div>
      </div>
    </div>
  </b-container>
</template>

<script>
export default {
  name: "HomeView",
  props: {
    msg: String,
  },
};
</script>

<style scoped>
.underline-steelblue {
  display: inline-block;
  background: linear-gradient(
    180deg,
    rgba(255, 255, 255, 0) 70%,
    rgba(72, 190, 233, 0.3) 30%
  );
}
</style>
