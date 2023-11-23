<script>
import SliderShop from "@/components/SliderShop.vue";
import HeaderShop from "@/components/HeaderShop.vue";
import ProductService from "../services/Product.service";
import { mapState } from "pinia";
import { useAuthStore } from "@/stores/Auth.store";
import toastsVue from "../components/toasts.vue";
export default {
  data() {
    return {
      Products: [],
    };
  },
  components: {
    HeaderShop,
    SliderShop,
    toastsVue,
  },
  computed: {
    ...mapState(useAuthStore, {
      currentUser: "user",
    }),
  },
  methods: {
    async retrieveProduct() {
      try {
        this.Products = await ProductService.getAll();
      } catch (error) {
        console.log(error);
      }
    },
  },
  mounted() {
    this.retrieveProduct();
  },
};
</script>
<template>
  <div class="header">
    <HeaderShop></HeaderShop>
  </div>
  <toastsVue></toastsVue>
  <div class="slider">
    <SliderShop></SliderShop>
  </div>
  <div style="margin: 20px 80px">
    <div class="flex-row" style="margin: 0 80px">
      <div id="ao">
        <div style="text-align: center; margin: 30px 0" class="heading">
          <h3>Tiểu thuyết</h3>
        </div>
        <div class="d-sm-flex flex-wrap">
          <div
            class="card m-1"
            style="width: 18rem"
            v-for="item in Products"
            v-show="item.categories === 'Tiểu thuyết'"
          >
            <div class="wrapper-img">
              <div class="">
                <div class="image_item" >
                  <img :src="item.img" class="card-img-top" alt="..." />
                </div>
              </div>
            </div>
            <div class="card-body product text-center">
              <h5 class="card-title">{{ item.title }}</h5>
              <h6 style="color: red!important;" class="price">{{ item.price }} vnđ</h6>
              <router-link
                :to="{
                  name: 'details',
                  params: { id: item._id },
                }"
              >
                <button type="button" class="btn btn-outline-dark">
                  Xem chi tiết
                </button>
              </router-link>
            </div>
          </div>
        </div>
      </div>

      <div id="balo">
        <div style="text-align: center; margin: 30px 0" class="heading">
          <h3>Truyện ngắn</h3>
        </div>
        <div class="d-sm-flex flex-wrap">
          <div
            class="card m-1"
            style="width: 18rem"
            v-for="item in Products"
            v-show="item.categories === 'Truyện ngắn'"
          >
            <div class="wrapper-img">
              <div class="">
                <div class="image_item" v-for="img in item.img">
                  <img :src="img" class="card-img-top" alt="..." />
                </div>
              </div>
            </div>
            <div class="card-body product text-center">
              <h5 class="card-title">{{ item.title }}</h5>
              <h6 style="color: red!important;" class="price">{{ item.price }} vnđ</h6>
              <router-link
                :to="{
                  name: 'details',
                  params: { id: item._id },
                }"
              >
                <button
                  type="button"
                  class="btn btn-outline-dark"
                  @click="nextdetailsproduct"
                >
                  Xem chi tiết
                </button>
              </router-link>
            </div>
          </div>
        </div>
      </div>

      <div id="giay">
        <div style="text-align: center; margin: 30px 0" class="heading">
          <h3>Truyện tranh</h3>
        </div>
        <div class="d-sm-flex flex-wrap">
          <div
            class="card m-1"
            style="width: 18rem"
            v-for="item in Products"
            v-show="item.categories === 'Truyện tranh'"
          >
            <div class="wrapper-img">
              <div class="">
                <div class="image_item" v-for="img in item.img">
                  <img :src="img" class="card-img-top" alt="..." />
                </div>
              </div>
            </div>
            <div class="card-body product text-center">
              <h5 class="card-title">{{ item.title }}</h5>
              <h6 style="color: red!important;" class="price">{{ item.price }} vnđ</h6>
              <router-link
                :to="{
                  name: 'details',
                  params: { id: item._id },
                }"
              >
                <button
                  type="button"
                  class="btn btn-outline-dark"
                  @click="nextdetailsproduct"
                >
                  Xem chi tiết
                </button>
              </router-link>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  <div></div>
</template>
<style scoped>
.wrapper-img {
  width: 100%;
  height: 100%;
  overflow: hidden;
}
/* .image_slider {
  display: flex;
  transition: all 0.8s ease;
}
.image_slider:hover {
  transform: translateX(-100%);
} */
.image_item {
  flex: 1 0 100%;
}
</style>
