<script>
import * as yup from "yup";
import { Form, Field, ErrorMessage } from "vee-validate";
export default {
  props: {
    product: { type: Object, required: true },
    resetAfterSubmit: { type: Boolean, default: false },
  }
  ,
  data() {
    const productform = yup.object().shape({
      name: yup
        .string()
        .required("Tên không được để trống")
        .min(5, "Tên phải có ít nhất 5 ký tự."),
      img: yup
        .string()
        .required("Hình ảnh không được để trống"),
      price: yup
        .string()
        .required("Giá sản phẩm không được để trống"),
      description: yup
        .string()
        .required("Mô tả sản phẩm không được để trống")
        .min(5, "Tên phải ít nhất 5 ký tự."),
      category: yup
        .string()
        .required("Loại sản phẩm không được để trống"),
    });
    return {
      productLocal: this.product,
      productform,
    }
  },
  components: {
    Form,
    Field,
    ErrorMessage
  },
  emits: ['submit:product'],
  methods: {
    addImge() {
      document.querySelector("#imgproduct2").style.display = "block";
    },
    submitproduct() {
      this.$emit('submit:product', this.productLocal);
      if (this.resetAfterSubmit) {
        this.$refs.contactForm.resetForm();
      }
    },
  }
}
</script>
<template>
  <div class="wrapper">
    <Form :validation-schema="productform" @submit="submitproduct">
      <div class="form-group">
        <label for="nameproduct">Tên</label>
        <Field type="text" class="form-control" id="nameproduct" name="name" placeholder="Vui lòng nhập tên sản phẩm"
          v-model="productLocal.title" />
        <ErrorMessage name="name" class="text-danger" />
      </div>
      <div class="form-group">
        <label for="imgproduct">Hình ảnh</label>
        <Field type="text" class="form-control" id="imgproduct" name="img" placeholder="Nhập liên kết hình ảnh sản phẩm"
          v-model="productLocal.img" />
        <ErrorMessage name="img" class="text-danger" />
      </div>
      <div class="form-group">
        <label for="priceproduct">Giá</label>
        <Field type="number" class="form-control" id="priceproduct" name="price" placeholder="Vui lòng nhập giá sản phẩm"
          v-model="productLocal.price" />
        <ErrorMessage name="price" class="text-danger" />
      </div>
      <div class="form-group">
        <label for="nameproduct">Mô tả sản phẩm</label>
        <Field type="text" class="form-control" id="nameproduct" name="description"
          placeholder="Vui lòng nhập mô tả sản phẩm" v-model="productLocal.desc" />
        <ErrorMessage name="description" class="text-danger" />
      </div>
      <div class="form-group">
        <label for="categoryproduct">Loại</label>
        <Field type="text" class="form-control" id="categoryproduct" name="category"
          placeholder="Vui lòng nhập loại sản phẩm" v-model="productLocal.categories" />
        <ErrorMessage name="category" class="text-danger" />
      </div>
      <button type="submit" class="btn btn-primary">Lưu</button>
      <router-link to="/admin" style="margin: 10px;">
        <button class="btn btn-danger">Trở về</button>
      </router-link>
      <br>
    </Form>
  </div>
</template>
<style scoped>
.wrapper {
  margin: 50px 200px;
}

.btn_img-add {
  font-size: 30px;
  color: dodgerblue;
}</style>