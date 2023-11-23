<script>
import HeaderShop from '@/components/HeaderShop.vue'
import ProductService from '../services/Product.service'
import CartService from '../services/Cart.service'
import toastsVue from '../components/toasts.vue'
import toastsjs from '../assets/js/toasts.js'
import { mapState } from 'pinia'
import { useAuthStore } from "@/stores/Auth.store";
export default {
    data() {
        return {
            detailproduct: [],
            cartitem: {
                userId: '',
                productId: this.$route.params.id,
                quantity: 1,
                title: "",
                img: "",
                price: "",

            },
            carts: [],
            toasts: {
                title: "Thành công",
                msg: "Thêm vào giỏ hàng thành công",
                type: "success",
                duration: 2000
            },
            sub_quantity: 1,
        }
    },
    computed: {
        ...mapState(useAuthStore, {
            currentUser: "user",
        }),
    },
    components: {
        HeaderShop,
        toastsVue
    },
    methods: {
        toastsjs,
        async getproduct() {
            try {
                this.detailproduct = await ProductService.get(this.$route.params.id);
                this.cartitem.title = this.detailproduct.title;
                this.cartitem.img = this.detailproduct.img;
                this.cartitem.price = this.detailproduct.price;

            } catch (error) {
                console.log(error);
            }
        },
        async getidcart() {            
            this.cartitem.quantity = this.sub_quantity;
            var exitcart = false;

            try {
                this.carts = await CartService.get(this.currentUser._id);
                this.cartitem.userId = this.currentUser._id;
                this.carts.map((cartproduct) => {
                    if (cartproduct.productId == this.cartitem.productId) {
                        this.cartitem.quantity += cartproduct.quantity;
                        CartService.update(cartproduct._id, this.cartitem);
                        exitcart = true;
                        this.toastsjs();
                        
                    }
                })
                if (exitcart === false) {
                    this.cartitem.userId = this.currentUser._id;
                    CartService.create(this.cartitem);
                    this.toastsjs();
                   
                }
            } catch (error) {
                this.toasts.title = "Thông điệp",
                    this.toasts.msg = "Bạn chưa đăng nhập!",
                    this.toasts.type = "warn",
                    this.toasts.duration = 3000,
                    this.toastsjs();
                console.log('erorrr ', error);
            }
        },
    },
    created() {
        this.getproduct();
    },

}
</script>
<template>
    <HeaderShop></HeaderShop>
    <toastsVue></toastsVue>

    <div class="wrapper">
        <p>Trang chủ > {{ detailproduct.categories }} > {{ detailproduct.title }}</p>
        <div class="">
            <div class="row">
                <div class="img_product col">
                    <img :src="detailproduct.img" class="d-block w-100" alt="..."
                        style="border-radius: 8px; height: 400px; width: auto;">
                </div>
                <div class="info_product col" style="margin-left: 20px;">
                    <h5 style="font-weight: 600;">{{ detailproduct.title }}</h5>
                    <p>Nhà cung cấp: NXB Trẻ</p>
                    <p>Nhà xuất bản: Trẻ</p>
                    <h4 style="font-weight: 700;" class="pricte text-danger">{{ detailproduct.price }} vnđ </h4>
                    <p>Chính sách đổi trả: 
                        Đổi trả sản phẩm trong 30 ngày
                    </p>
                    <div class="quatitly-product row align-items-center">
                        <h5 class="col-md-2 col-lg-2 col-xl-2">Số lượng</h5>
                        <div class="col-md-3 col-lg-3 col-xl-2 d-flex">
                            <input id="quantity" name="quantity" type="number" v-model="sub_quantity"
                                class="form-control form-control-sm" style="width:50px;" />
                        </div>
                    </div>

                    <div>
                        <button type="submit" class="btn btn-outline-dark btn_product" style="width:150px;"
                            @click="getidcart()">Thêm vào
                            giỏ</button>

                    </div>
                </div>
            </div>
            <div class="describe_product col">
                <h4>Mô tả sản phẩm</h4>
                <p>{{ detailproduct.desc }}
                </p>
            </div>
        </div>
    </div>
</template>
<style scoped>
.btn_product {
    margin:20px 10px 0 0;
}

.size_product,
.color_product {
    display: flex;
    flex-direction: column;
    max-width: 400px;
}

.list_btn_size,
.list_btn_color {
    margin: 0 10px;
    display: flex;
    flex-wrap: wrap;
}

.list_btn_size button,
.list_btn_color button {
    margin: 10px 5px;
}

.btn {
    width: 100px;
}

.wrapper {
    margin: 50px 100px;
}

.heading {
    margin: 0 100px;
}

.title {
    display: flex;
    justify-content: center;
    flex-direction: column;
    width: 100%;
    height: 100px;
}</style>