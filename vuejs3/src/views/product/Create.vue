<template>
    <div class="container my-5">
        <div class="row justify-content-center">
            <div class="col-8">
                <router-link :to="{ name:'product.index' }" class="btn btn-primary btn-sm rounded shadow mb-3">Back
                </router-link>

                <div class="card rounded shadow">
                    <div class="card-header">
                        Create Product
                    </div>
                    <div class="card-body">
                        <form @submit.prevent="store()">
                            <div class="mb-3">
                                <label class="form-label">Title</label>
                                <input type="text" class="form-control" v-model="product.title">
                                <div v-if="validation.title" class="text-danger">
                                    
                                </div>
                            </div>
                            <div class="mb-3">
                                <label class="form-label">Price</label>
                                <input type="number" class="form-control" v-model="product.price">
                                <div v-if="validation.amount" class="text-danger">
                                    
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
    import {
        reactive,
        ref
    } from 'vue'
    import {
        useRouter
    } from 'vue-router'
    import axios from 'axios'
    export default {
        setup() {
            //data binding
            const product = reactive({
                title: '',
                price: ''
            })

            const validation = ref([])

            const router = useRouter();

            function store() {
                axios.post(
                        'http://localhost:5000/product',
                        product
                    )
                    .then(() => {
                        router.push({
                            name: 'product.index'
                        })
                    }).catch((err) => {
                        console.log(validation.value = err.response.data.message)
                    });
            }

            return {
                product,
                validation,
                router,
                store
            }

        }
    }
</script>
<style lang="">

</style>