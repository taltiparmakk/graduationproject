<template>
        <section class="py-5">
            <div class="container px-4 px-lg-5 mt-5">
                <div class="row gx-4 gx-lg-5 row-cols-2 row-cols-md-3 row-cols-xl-4 justify-content-center">

        
   <appItemlist v-for="item in items" :key="item.id" :item="item" />

        </div>
    </div>
    </section>
</template>

<script>
import appItemlist from "@/components/Items/appItemlist"

export default {
    components : {
        appItemlist
    },
    props: {
        items: {
            type: Array,
            required: true,
            default: () => []
        }
    }
}
</script>