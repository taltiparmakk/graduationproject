<template>
                  <!-- Modal -->
<div class="modal fade" id="exampleModalLong" tabindex="-1" role="dialog" aria-labelledby="exampleModalLongTitle" aria-hidden="true">
    <div class="modal-dialog" role="document">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="exampleModalLongTitle">Ürün Ekle</h5>
          <button type="button" class="close" data-dismiss="modal" aria-label="Close">
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
        <div class="modal-body">
      
              <div class="mb-3">
                <label for="formGroupExampleInput2" class="form-label">Ürün Adı</label>
                <input autofocus type="text" v-model="products.p_name" class="form-control" id="formGroupExampleInput2" placeholder="Ürün Adını Giriniz">
              </div>
               <select v-model="products.p_category" class="browser-default custom-select">
  
  <option  selected value="1">Cep Telefonu</option>
  <option v-for="category in categoryList" :key="category.id" :value="category.id">{{category.name}}</option>
  
</select>
             
              <div class="mb-3">
                <label for="exampleFormControlTextarea1"  class="form-label">Açıklama</label>
                <textarea v-model="products.p_description" class="form-control" placeholder="Ürün Bilgileri" id="exampleFormControlTextarea1" rows="3"></textarea>
              </div>
               <div class="mb-3">
                <label for="formGroupExampleInput2" class="form-label">Fiyatı</label>
                <input  v-model="products.p_price" type="text" class="form-control" id="formGroupExampleInput2" placeholder="Fiyatını Giriniz">
              </div>
                <div class="mb-3">
                <label for="formGroupExampleInput2" class="form-label">URL</label>
                <input v-model="products.p_url" type="text" class="form-control" id="formGroupExampleInput2" placeholder="URL">
              </div>

        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-secondary" data-dismiss="modal">Kapat</button>
          <button @click="onSave" type="button" class="btn btn-success">Ürünü Ekle</button>
        </div>
      </div>
    </div>
  </div>
</template>
 <!-- p_name p_category p_description p_price 
products -->
<script>
export default {
  data() {
    return {
      categoryList: [],
      products : {
        p_name : null,
        p_category : null,
        p_description : null,
        p_price: null,
        p_url: null,
      }
    }
  }, 
  mounted() {
    this.$appAxios.get("/").then(category_response => {
    
      this.categoryList = category_response?.data || [];
    });
  },
  methods: {
    onSave () {
      const saveData = {
        ...this.products,
        created_at: new Date()
      };
      this.$appAxios.post("/", saveData).then(save_products => {
        console.log(save_products);
       Object.keys(this.products)?.forEach(field => (this.userData[field] = null));
       this.$router.push({ name : "HomePage"})
      });
    }
  },




}


</script>