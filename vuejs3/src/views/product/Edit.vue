<template>
    <div class="container my-5">
        <div class="row justify-content-center">
            <div class="col-8">
                <router-link :to="{ name:'product.index' }" class="btn btn-primary btn-sm rounded shadow mb-3">Back
                </router-link>

                <div class="card rounded shadow">
                    <div class="card-header">
                        Edit Product
                    </div>
                    <div class="card-body">
                        <form @submit.prevent="update()">
                            <div class="mb-3">
                                <label class="form-label">Title</label>
                                <input type="text" class="form-control" v-model="product.title">
                                <div class="text-danger">
                                    
                                </div>
                            </div>
                            <div class="mb-3">
                                <label class="form-label">Price</label>
                                <input type="number" class="form-control" v-model="product.price">
                                <div class="text-danger">
                                    
                                </div>
                            </div>
                            <button class="btn btn-outline-primary">Submit</button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import {reactive, ref, onMounted} from 'vue'
import {useRouter,useRoute} from 'vue-router'
import axios from 'axios'
    export default {
        setup() {
            //data binding
            let product = reactive({
                title: '',
                price: ''
            })

            const validation = ref([])

            const router = useRouter();
            const route = useRoute();

            onMounted(() => {
                axios.get(`http://localhost:5000/product/${route.params.id}`)
                .then((result) => {
                    product.title = result.data.data.title
                    product.price = result.data.data.price
                }).catch((err) => {
                    console.log(err.response.data)
                });
            });

            function update(){
                axios.patch(
                    `http://localhost:5000/product/${route.params.id}`,
                    product
                )
                .then(() => {
                    router.push({
                        name: 'product.index'
                    })
                }).catch((err) => {
                    validation.value = err.response.data
                });
            }

            return {
                product, validation, router, update
            }

        }
    }
</script>
<style lang="">

</style>