<template>
<appNavbar/>
<appCategories/>
<appItems :items="productList" />
 <appFooter/>
</template>
<script>
    
    import appItems from "@/components/Items/appItems";
    import appFooter from "@/components/appFooter"
    import appCategories from "@/components/appCategories"
    export default {
        components : {
                       appItems,
            appFooter,
            appCategories
        },
        data() {
            return {
                productList : []
            };
        },
        created(){
            this.$appAxios.get("/").then(productList_response => {
                this.productList = productList_response?.data || []
            })
        }
    }


</script>