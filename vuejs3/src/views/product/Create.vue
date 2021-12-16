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

                        <div class="text-danger text-center mb-2" role="alert">
                            {{ validation.message }}
                        </div>

                        <form enctype="multipart/form-data" @submit.prevent="store">
                            <div class="mb-3">
                                <label for="formFileSm" class="form-label">Picture</label>
                                <input class="form-control form-control-sm" id="formFileSm" type="file"
                                    @change="selectFile" required>
                            </div>

                            <div class="mb-3">
                                <label class="form-label">Title</label>
                                <input type="text" class="form-control" v-model="product.title" required>
                            </div>
                            <div class="mb-3">
                                <label class="form-label">Price</label>
                                <input type="number" class="form-control" v-model="product.price" required>
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
    import axios from "axios";

    export default {
        data() {
            return {
                selectedFile: "",
                product: {},
                validation: {}
            };
        },
        methods: {
            selectFile(e) {
                const selectedFile = e.target.files[0]; // accessing file
                this.selectedFile = selectedFile;
            },
            store() {
                const formData = new FormData();
                formData.append("title", this.product.title); // appending data
                formData.append("price", this.product.price); // appending data
                formData.append("pict", this.selectedFile); // appending file

                // sending file to the backend
                axios
                    .post("http://localhost:5000/product", formData)
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