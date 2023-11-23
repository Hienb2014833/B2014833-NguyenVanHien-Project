<script>
import HeaderShop from '@/components/HeaderShop.vue';
import CartService from '../services/Cart.service';
import toastsVue from '../components/toasts.vue';
import toastsjs from '../assets/js/toasts.js'
import CartItem from "../components/CartItem.vue";
export default{
    data(){
      return{
          carts:[],
          toasts:{
              title:"",
              msg:"",
              type:"",
              duration:0
              },
      }
    },
    components:{
         HeaderShop,
         toastsVue,
         CartItem
     },
     methods:{
        getiduser(){
          const user =  JSON.parse(localStorage.getItem("user"));
          return user._id;
        },
        async getcarts(){
          try{
          this.carts = await CartService.get(this.getiduser());
          }catch(error){
            console.log(error);
          }
        },
        async delcart(index){
              this.toasts.title="Đã xoá",
              this.toasts.msg="Đã xóa sản phẩm thành công",
              this.toasts.type="error",
              this.toasts.duration=2000
              this.toastsjs(); 
              await CartService.delete(this.carts[index]._id)
              this.refeshlistcart();  
        },
       toastsjs,
       refeshlistcart(){
         this.getcarts();
       },
       registerproduct(){
         if(this.carts.length > 0){
          this.toasts.title = "Thành công",
          this.toasts.msg = "Đã thành toán",
          this.toasts.type = "success",
          this.toasts.duration=2000,
          this.toastsjs();
         }else{
              this.toasts.title = "Thất bại",
              this.toasts.msg = "Bạn chưa có sản phẩm",
              this.toasts.type = "error",
              this.toasts.duration=2000,
              this.toastsjs();
         }
       },  
         total(){
           var total=0;
           for(var i in this.carts){
              total+=(this.carts[i].price*this.carts[i].quantity);
           }
            return total;
        }   
     },
      created(){
        this.refeshlistcart();
     },
}
</script>
<template>
  <HeaderShop></HeaderShop>
  <toastsVue></toastsVue>
    <section class="h-100 h-custom" style="background-color: rgb(234,232,232);">
  <div class="container py-5 h-100">
    <div class="row d-flex justify-content-center align-items-center h-100">
      <div class="col-12">
        <div class="card card-registration card-registration-2" style="border-radius: 15px;">
          <div class="card-body p-0">
            <div class="row g-0">
              <div class="col-lg-8">
                <div class="p-5">
                  <div class="d-flex justify-content-between align-items-center mb-5">
                    <h3 class="fw-bold mb-0 text-black">Giỏ Hàng</h3>
                    <h6 class="mb-0 text-muted">{{carts.length}} mục</h6>
                  </div>
                  <hr class="my-4">
                  <CartItem :refeshlistcart="refeshlistcart" :carts="carts" @deleted:cartIndex="delcart"></CartItem>
                  
                </div>
              </div>
              
              <div class="col-lg-4" style="background-color: white;">              
                <div class="p-5" style="border: 1px solid rgb(199, 199, 199); border-radius: 10px;">      
                  <div class="d-flex justify-content-between mb-2">
                    <h5 class="text-uppercase">Tổng giá</h5>
                    <h5>{{total()}}<span> vnđ</span></h5>
                  </div>
                  <hr class="my-4">

                  <button type="button" class="btn btn-outline-dark btn-block btn-lg "
                    data-mdb-ripple-color="dark" @click="registerproduct()">Thanh toán</button>

                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</section>
</template>
<style scoped>
@media (min-width: 1025px) {
.h-custom {
height: 100%;
background-color: white !important;
}
}

.card-registration .select-input.form-control[readonly]:not([disabled]) {
font-size: 1rem;
line-height: 2.15;
padding-left: .75em;
padding-right: .75em;
}

.card-registration .select-arrow {
top: 13px;
}

.bg-grey {
background-color: #eae8e8;
}

@media (min-width: 992px) {
.card-registration-2 .bg-grey {
border-top-right-radius: 16px;
border-bottom-right-radius: 16px;
}
}

@media (max-width: 991px) {
.card-registration-2 .bg-grey {
border-bottom-left-radius: 16px;
border-bottom-right-radius: 16px;
}
}
</style>