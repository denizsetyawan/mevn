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
                        <form enctype="multipart/form-data" @submit.prevent="update">
                            <div class="mb-3">
                                <label for="formFileSm" class="form-label">Picture</label>
                                <input class="form-control form-control-sm" id="formFileSm" type="file"
                                    @change="selectFile">
                            </div>

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
    // import {reactive, ref, onMounted} from 'vue'
    // import {useRouter,useRoute} from 'vue-router'
    // import axios from 'axios'
    //     export default {
    //         setup() {
    //             //data binding
    //             let product = reactive({
    //                 title: '',
    //                 price: ''
    //             })

    //             const validation = ref([])

    //             const router = useRouter();
    //             const route = useRoute();

    //             onMounted(() => {
    //                 axios.get(`http://localhost:5000/product/${route.params.id}`)
    //                 .then((result) => {
    //                     product.title = result.data.data.title
    //                     product.price = result.data.data.price
    //                 }).catch((err) => {
    //                     console.log(err.response.data)
    //                 });
    //             });

    //             function update(){
    //                 axios.patch(
    //                     `http://localhost:5000/product/${route.params.id}`,
    //                     product
    //                 )
    //                 .then(() => {
    //                     router.push({
    //                         name: 'product.index'
    //                     })
    //                 }).catch((err) => {
    //                     validation.value = err.response.data
    //                 });
    //             }

    //             return {
    //                 product, validation, router, update
    //             }

    //         }
    //     }

    import axios from "axios";

    export default {
        data() {
            return {
                selectedFile: "",
                product: {}
            };
        },
        created() {
            axios
                .get(`http://localhost:5000/product/${this.$route.params.id}`)
                .then((response) => {
                    this.product.title = response.data.data.title
                    this.product.price = response.data.data.price
                    // this.product = response.data;
                    // console.log(response.data);
                });
        },
        methods: {
            selectFile(e) {
                const selectedFile = e.target.files[0]; // accessing file
                this.selectedFile = selectedFile;
            },
            update() {
                const formData = new FormData();
                formData.append("title", this.product.title); // appending data
                formData.append("price", this.product.price); // appending data
                formData.append("pict", this.selectedFile); // appending file

                // sending file to the backend
                axios
                    .patch(`http://localhost:5000/product/${this.$route.params.id}`, formData)
                    .then(res => {
                        this.$router.push({
                            name: 'product.index'
                        })
                        // console.log(res);
                    })
                    .catch(err => {
                        // console.log(err.response.status);
                        if (err.response.status === 500) {
                            alert('File yang anda masukkan bukan image')
                        } else {
                            alert('Pastikan semua terisi')
                        }
                    });
            }
        }
    };
</script>
<style lang="">

</style>