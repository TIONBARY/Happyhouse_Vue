<template>
  <div style="height: calc(100% - 200px)">
    <div
      class="w-100 bg-white shadow-sm p-3 d-flex"
      style="min-width: max-content"
    >
      <div
        class="input-group flex-grow-1 border-0 me-2"
        style="max-width: 160px"
      >
        <b-form-select
          class="form-select"
          v-model="selected1"
          :options="options1"
          @change="changeSelect1"
        ></b-form-select>
      </div>
      <div
        class="input-group flex-grow-1 border-0 me-2"
        style="max-width: 160px"
      >
        <b-form-select
          class="form-select"
          v-model="selected2"
          :options="options2"
          @change="changeSelect2"
        ></b-form-select>
      </div>
      <div
        class="input-group flex-grow-1 border-0 me-2"
        style="max-width: 160px"
      >
        <b-form-select
          class="form-select"
          v-model="selected3"
          :options="options3"
        >
        </b-form-select>
      </div>
      <button
        class="btn rounded border-0 shadow-sm text-light"
        type="button"
        @click="search"
        style="height: 40px; background-color: #86c232"
      >
        <b-icon icon="search"></b-icon>
      </button>
      <div
        class="input-group flex-grow-1 border-0 me-2"
        style="max-width: 160px"
      >
        <img
          :src="require(`@/assets/${isOn ? on : off}`)"
          @click="voiceInput"
          style="width: 60px; padding-left: 20px"
          alt=""
        />
      </div>
      <div
        class="input-group flex-grow-1 border-0 me-2"
        style="max-width: 160px"
      >
        <b-form-select
          class="form-select"
          v-model="selectedCategory"
          :options="category"
          @change="changeCategory"
        >
        </b-form-select>
      </div>
    </div>

    <!-- Contents -->
    <div class="d-flex h-100" id="wrapper" style="height: calc(100% - 143px)">
      <!-- Sidebar-->
      <div
        class="shadow-sm bg-white px-4 py-3 h-100"
        id="sidebar-wrapper"
        style="min-width: 320px"
      >
        <div
          class="list-group list-group-flush overflow-auto"
          style="height: calc(100% - 50px)"
        >
          <!-- 데이터를 불러와서 처리하는 부분-->
          <div
            class="list-group-item list-group-item-action list-group-item-light p-3"
            v-b-modal.detailed-info
            style="cursor: pointer"
            v-for="(item, index) in items"
            :key="index"
            @click="loadDetailedInfo(index)"
          >
            <div style="font-weight: bold">{{ item.name }}</div>
            <br />
            <div>거래금액: {{ item.price }}</div>
            <div>전용면적: {{ item.area }}</div>
            <div><b-icon icon="calendar"></b-icon>{{ item.date }}</div>
          </div>
        </div>
      </div>

      <!-- sidebar end -->

      <!-- Modal -->
      <b-modal
        id="detailed-info"
        tabindex="-1"
        aria-labelledby="detailedInfoLabel"
        aria-hidden="true"
        title="상세정보"
        hide-header-close
      >
        <div class="modal-body">
          <!-- 로드되는 부분 -->
          <div style="font-weight: bold">{{ currentItem.name }}</div>
          <br />
          <div>건물정보</div>
          <br />
          <div>
            주소: {{ currentItem.city }} {{ currentItem.gu }}
            {{ currentItem.dong }} {{ currentItem.areaNumber }}
          </div>
          <div>층: {{ currentItem.floor }}층</div>
          <div>전용면적: {{ currentItem.area }}</div>
          <div>건축년도: {{ currentItem.constructedYear }}</div>
          <br />
          <div>거래정보</div>
          <br />
          <div>거래금액: {{ currentItem.price }}</div>
          <div>거래일: {{ currentItem.date }}</div>
        </div>
      </b-modal>

      <!-- Page content wrapper-->
      <div id="map-wrapper" class="w-100 h-100 position-relative">
        <div id="map" class="w-100 h-100">
          <!-- Map 동적으로 생성 -->
        </div>
        <div
          id="zoom"
          class="border-1 rounded-2 position-absolute bg-light d-flex flex-column"
          style="
            top: 20px;
            right: 20px;
            width: 36px;
            height: 80px;
            z-index: 1;
            cursor: pointer;
          "
        >
          <div
            id="zoomIn"
            class="text-center h-50 d-flex align-items-center justify-content-center"
            @click="zoomIn"
          >
            <img
              width="20px"
              src="https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/ico_plus.png"
              alt="확대"
            />
          </div>
          <hr class="m-0" style="border: solid 1px #c5c6c6" />
          <div
            id="zoomOut"
            class="text-center h-50 d-flex align-items-center justify-content-center"
            @click="zoomOut"
          >
            <img
              width="20px"
              src="https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/ico_minus.png"
              alt="축소"
            />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
/* eslint-disable */
import { getSiguList, getDongList } from "@/api/house.js";
import axios from "axios";
let map;
let infowindow;
export default {
  name: "HouseView",
  data() {
    return {
      selected1: "init",
      selected2: "init",
      selected3: "init",
      selectedCategory: "init",
      options1: [
        { value: "init", text: "도/광역시" },
        { value: "11", text: "서울특별시" },
        { value: "26", text: "부산광역시" },
        { value: "27", text: "대구광역시" },
        { value: "28", text: "인천광역시" },
        { value: "29", text: "광주광역시" },
        { value: "30", text: "대전광역시" },
        { value: "31", text: "울산광역시" },
        { value: "41", text: "경기도" },
        { value: "42", text: "강원도" },
        { value: "43", text: "충청북도" },
        { value: "44", text: "충청남도" },
        { value: "45", text: "전라북도" },
        { value: "46", text: "전라남도" },
        { value: "47", text: "경상북도" },
        { value: "48", text: "경상남도" },
        { value: "50", text: "제주도" },
      ],
      options2: [{ value: "init", text: "시/군/구" }],
      options3: [{ value: "init", text: "동" }],
      items: [],
      currentItem: {},
      map: null,
      isOn: false,
      on: "mic2.png",
      off: "mic1.png",
      searchWords: "",
      recognition: {},
      name1: "",
      name2: "",
      name3: "",
      category: [
        { value: "init", text: "카테고리" },
        { value: "MT1", text: "대형마트" },
        { value: "CS2", text: "편의점" },
        { value: "PS3", text: "어린이집" },
        { value: "SC4", text: "학교" },
        { value: "AC5", text: "학원" },
        { value: "PK6", text: "주차장" },
        { value: "OL7", text: "주유소" },
        { value: "SW8", text: "지하철역" },
        { value: "BK9", text: "은행" },
        { value: "CT1", text: "문화시설" },
        { value: "AG2", text: "중개업소" },
        { value: "PO3", text: "공공기관" },
        { value: "AT4", text: "관광명소" },
        { value: "AD5", text: "숙박" },
        { value: "FD6", text: "음식점" },
        { value: "CE7", text: "카페" },
        { value: "HP8", text: "병원" },
        { value: "PM9", text: "약국" },
      ],
    };
  },
  created() {
    this.voiceSearchReady();
  },
  mounted() {
    const script = document.createElement("script");
    const URL = `//dapi.kakao.com/v2/maps/sdk.js?autoload=false&appkey=${process.env.VUE_APP_KAKAO_KEY}&libraries=services`;
    script.src = URL;
    document.head.appendChild(script);
    /* global kakao */
    script.addEventListener("load", () => {
      kakao.maps.load(() => {
        navigator.geolocation.getCurrentPosition(
          this.locationLoadSuccess,
          this.locationLoadError
        );
      });
    });
  },
  computed: {
    selectedText1: function () {
      return this.options1.find((option) => {
        return this.selected1 === option.value;
      }).text;
    },
    selectedText2: function () {
      return this.options2.find((option) => {
        return this.selected2 === option.value;
      }).text;
    },
    selectedText3: function () {
      return this.options3.find((option) => {
        return this.selected3 === option.value;
      }).text;
    },
  },
  methods: {
    locationLoadSuccess(pos) {
      // 현재 위치 받아오기

      const container = document.getElementById("map");

      var currentPos = new kakao.maps.LatLng(
        pos.coords.latitude,
        pos.coords.longitude
      );

      let options = {
        center: currentPos,
        level: 3,
      };

      map = new window.kakao.maps.Map(container, options);

      // 지도 이동(기존 위치와 가깝다면 부드럽게 이동)
      map.panTo(currentPos);

      // 마커 생성
      var marker = new kakao.maps.Marker({
        position: currentPos,
      });

      // 기존에 마커가 있다면 제거
      marker.setMap(null);
      marker.setMap(map);
    },

    locationLoadError(pos) {
      alert("위치 정보를 가져오는데 실패했습니다.");
    },

    async changeSelect1() {
      const { data } = await getSiguList(this.selected1);

      this.options2 = [{ value: "init", text: "시/군/구" }];
      this.selected2 = "init";
      data.regcodes.forEach((item, index) => {
        let tempLocNames = item.name.split(" ");
        let currentLocName = tempLocNames[tempLocNames.length - 1];
        if (index != 0) {
          this.options2.push({
            value: item.code.slice(0, 4),
            text: currentLocName,
          });
        }
      });
    },
    async changeSelect2() {
      const { data } = await getDongList(this.selected2);
      this.options3 = [{ value: "init", text: "동" }];
      this.selected3 = "init";
      data.regcodes.forEach((item, index) => {
        let tempLocNames = item.name.split(" ");
        let currentLocName = tempLocNames[tempLocNames.length - 1];
        if (index != 0) {
          this.options3.push({
            value: { code: item.code.slice(0, 5), name: currentLocName },
            text: currentLocName,
          });
        }
      });
    },
    search() {
      if (
        this.selected1 === "init" ||
        this.selected2 === "init" ||
        this.selected3 === "init"
      ) {
        alert("값을 선택해주세요");
        return;
      }

      let code = this.selected3.code;
      this.items = [];
      this.requestAPIandLoad(code);
    },
    requestAPIandLoad(code) {
      let periods = [
        "202107",
        "202108",
        "202109",
        "202110",
        "202111",
        "202112",
        "202201",
        "202202",
      ];
      let dong = this.selectedText3;
      for (const period of periods) {
        axios
          .post(
            `http://localhost:9999/vue/search/searchByDong?code=${code}&period=${period}&dong=${dong}`
          )
          .then(({ data }) => {
            const houseDealList = data.houseDealList;
            for (const deal of houseDealList) {
              const {
                aptName,
                dealAmount,
                area,
                dealYear,
                dealMonth,
                dealDay,
                builtYear,
                dong,
                areaNumber,
                floor,
              } = deal;
              let item = {};
              item.name = aptName;
              item.price = dealAmount + "만원";
              item.area = area + "제곱미터";
              item.date = dealYear + ". " + dealMonth + ". " + dealDay;
              item.constructedYear = builtYear;
              item.dong = dong;
              item.areaNumber = areaNumber;
              item.floor = floor;
              this.items.push(item);
            }
            this.items.reverse();
            const address =
              this.selectedText1 +
              " " +
              this.selectedText2 +
              " " +
              this.selectedText3;
            this.showCenterLocation(address);
            this.showAllLocation(address);
          })
          .catch((data) => {
            console.log(data);
          });
      }
    },
    loadDetailedInfo(index) {
      let city = this.selectedText1;
      let gu = this.selectedText2;
      let item = this.items[index];
      item.city = city;
      item.gu = gu;
      this.currentItem = item;
    },
    loadMap() {
      const container = document.getElementById("map");
      let options = {
        center: new window.kakao.maps.LatLng(33.450701, 126.570667),
        level: 3,
      };

      map = new window.kakao.maps.Map(container, options);
    },
    zoomIn() {
      map.setLevel(map.getLevel() - 1);
    },
    zoomOut() {
      map.setLevel(map.getLevel() + 1);
    },
    showCenterLocation(address) {
      const geocoder = new window.kakao.maps.services.Geocoder();

      geocoder.addressSearch(address, function (result, status) {
        if (status === window.kakao.maps.services.Status.OK) {
          const coords = new window.kakao.maps.LatLng(result[0].y, result[0].x);
          // 결과값으로 받은 위치를 마커로 표시
          const marker = new window.kakao.maps.Marker({
            map: map,
            position: coords,
          });

          // 인포 윈도우로 장소에 대한 설명을 표시
          var infowindow = new window.kakao.maps.InfoWindow({
            content: `<div style="width:150px;text-align:center;padding:6px 0;border-radius:5px;">${address}</div>`,
          });
          infowindow.open(map, marker);

          // 지도의 중심을 결과값으로 받은 위치로 이동시킵니다
          map.panTo(coords);
        }
      });
    },
    showAllLocation(address) {
      const items = this.items;
      const geocoder = new window.kakao.maps.services.Geocoder();
      const imageSrc =
        "https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/markerStar.png";
      const imageSize = new window.kakao.maps.Size(24, 35);

      for (const item of items) {
        geocoder.addressSearch(
          address + " " + item.areaNumber,
          function (result, status) {
            if (status === window.kakao.maps.services.Status.OK) {
              const coords = new window.kakao.maps.LatLng(
                result[0].y,
                result[0].x
              );

              // 결과값으로 받은 위치를 마커로 표시
              const markerImage = new window.kakao.maps.MarkerImage(
                imageSrc,
                imageSize
              );

              new window.kakao.maps.Marker({
                map: map,
                position: coords,
                title: item.name,
                image: markerImage,
              });
            }
          }
        );
      }
    },
    voiceSearchReady() {
      window.SpeechRecognition =
        window.SpeechRecognition || window.webkitSpeechRecognition;
      this.recognition = new window.SpeechRecognition();
      this.recognition.interimResults = true;
      this.recognition.addEventListener("result", (e) => {
        this.searchWords = e.results[0][0].transcript;
        const words = this.searchWords.split(" ");
        this.name1 = words[0].trim();
        this.name2 = words[1].trim();
        this.name3 = words[2].trim();
      });
    },
    async voiceInput() {
      this.isOn = true;
      setTimeout(async () => {
        this.isOn = false;
        this.recognition.stop();
        console.log(this.name1, this.name2, this.name3);
        this.selected1 = this.options1.find((data) => {
          return data.text === this.name1;
        }).value;
        await this.changeSelect1();
        this.selected2 = this.options2.find((data) => {
          return data.text === this.name2;
        }).value;
        await this.changeSelect2();
        this.selected3 = this.options3.find((data) => {
          return data.text === this.name3;
        }).value;
        this.search();
      }, 5000);
      this.recognition.start();
    },
    changeCategory() {
      console.log(this.selectedCategory);
      // 마커를 클릭하면 장소명을 표출할 인포윈도우 입니다
      infowindow = new kakao.maps.InfoWindow({ zIndex: 1 });

      // 장소 검색 객체를 생성합니다
      const ps = new kakao.maps.services.Places(map);

      // 카테고리로 은행을 검색합니다
      ps.categorySearch(this.selectedCategory, this.placesSearchCB, {
        useMapBounds: true,
      });
    },
    // 키워드 검색 완료 시 호출되는 콜백함수 입니다
    placesSearchCB(data, status, pagination) {
      if (status === kakao.maps.services.Status.OK) {
        for (let i = 0; i < data.length; i++) {
          this.displayMarker(data[i]);
        }
      }
    },
    // 지도에 마커를 표시하는 함수입니다
    displayMarker(place) {
      // 마커를 생성하고 지도에 표시합니다
      const marker = new kakao.maps.Marker({
        map: map,
        position: new kakao.maps.LatLng(place.y, place.x),
      });

      // 마커에 클릭이벤트를 등록합니다
      kakao.maps.event.addListener(marker, "click", function () {
        // 마커를 클릭하면 장소명이 인포윈도우에 표출됩니다
        infowindow.setContent(
          '<div style="padding:5px;font-size:12px;">' +
            place.place_name +
            "</div>"
        );
        infowindow.open(map, marker);
      });
    },
  },
};
</script>
<style scoped>
.underline-orange {
  display: inline-block;
  background: linear-gradient(
    180deg,
    rgba(255, 255, 255, 0) 70%,
    rgba(231, 149, 27, 0.3) 30%
  );
}
</style>
