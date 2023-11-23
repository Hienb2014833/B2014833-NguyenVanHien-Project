<script>
  import * as yup from "yup";
  import { Form, Field, ErrorMessage } from "vee-validate";
  import UserService from "../services/User.service";
  import toast from "../assets/js/toasts";
  import {mapActions} from "pinia";
  import { useAuthStore } from "@/stores/Auth.store";
  export default{
     props:{user:Object},
     data() {
        const userform = yup.object().shape({
            name: yup
            .string()
            .required("Tên không được để trống")
            .min(3, "Tên phải có ít nhất 3 ký tự."),
            email:yup
            .string()
            .required("Email không được để trống")
            .email("Email không hợp lệ"),
            pwd:yup
            .string()
            .required("Mật không được để trống")
            });
            return {
            userform,
            infouser:this.user,
            toasts:{
                  title:"",
                  msg:"",
                  type:"",
                  duration:0
              },
            }
    },
    components:{
      Form,
      Field,
      ErrorMessage
    },
    methods:{
        toast,
        ...mapActions(useAuthStore, ["logout"]),
        async updateUser(){
            try{
                await UserService.update(this.infouser._id,this.infouser);
                    this.toasts.title="Thành công",
                    this.toasts.msg="Đã sửa thông tin vui lòng đăng nhập lại !",
                    this.toasts.type="success",
                    this.toasts.duration=3000
                this.toast();
                setTimeout(()=>{
                    this.logout();
                    this.$router.push({name:"login"});
                },2000);
            }catch(error){
                    this.toasts.title="Không thành công",
                    this.toasts.msg="Có lỗi hoặc trùng tên người dùng",
                    this.toasts.type="error",
                    this.toasts.duration=3000
                    this.toast();
                console.log(error);
            }
        },
    },
}
</script>
<template>
 <div class="wrapper">
    <Form :validation-schema="userform">
      <div class="form-group">
        <label for="nameproduct">Tên:</label>
        <Field type="text" class="form-control" id="nameproduct" name="name" v-model="infouser.username" placeholder="Nhập tên sản phẩm" />
        <ErrorMessage name="name" class="text-danger" />
      </div>
          <div class="form-group">
        <label for="nameproduct">Email:</label>
        <Field type="text" class="form-control" id="nameproduct" name="email" v-model="infouser.email" placeholder="Nhập email" />
        <ErrorMessage name="email" class="text-danger" />
      </div>
      <button type="submit" class="btn btn-primary" @click="updateUser">Lưu</button>
      <br>
    </Form>
</div>       
</template>