<template>
    <div class="container my-5">
        <div class="row justify-content-center">
            <div class="col-8">
                <router-link :to="{ name:'product.create' }" class="btn btn-primary btn-sm rounded shadow mb-3">Add
                </router-link>

                <div class="card rounded shadow">
                    <div class="card-header">
                        Product List
                    </div>
                    <div class="card-body">
                        <table class="table">
                            <thead>
                                <tr>
                                    <th>Title</th>
                                    <th>Price</th>
                                    <th>Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr v-for="(product, index) in products.data" :key="index">
                                    <td>
                                        <img :src="path + product.pict" :alt="product.pict" width="300">
                                    </td>
                                    <td>{{ product.title }}</td>
                                    <td>{{ product.price }}</td>
                                    <td>
                                        <div class="btn-group">
                                            <router-link :to="{ name:'product.edit', params:{id: product.id} }"
                                                class="btn btn-sm btn-outline-info">Edit</router-link>
                                            <button class="btn btn-sm btn-outline-danger"
                                                @click.prevent="destroy(product.id, index)">Delete</button>
                                        </div>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import axios from 'axios'
    import {
        onMounted,
        ref
    } from 'vue'

    export default {
        //reactive state
        setup() {
            let products = ref([]);
            let path = 'http://localhost:5000/'

            onMounted(() => {
                //get data from api endpoint
                axios.get('http://localhost:5000/product')
                    .then((result) => {
                        products.value = result.data
                        console.log(products.value = result.data)
                    }).catch((err) => {
                        console.log(err.response);
                    });
            });

            function destroy(id, index) {
                axios.delete(
                        `http://localhost:5000/product/${id}`
                    )
                    .then(() => {
                        products.value.data.splice(index,1)
                    }).catch((err) => {
                        validation.value = err.response.data
                    });
            }

            return {
                products, destroy, path
            }
        }
    }
</script>