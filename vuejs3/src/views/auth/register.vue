<template>
    <div class="container">
        <div class="row">
            <div class="col-lg-6 offset-lg-3 col-sm-10 offset-sm-1">
                <form class="text-center border border-primary p-5"
                    style="margin-top:70px;height:auto;padding-top:100px !important;" @submit.prevent="registerUser">
                    <input type="text" id="name" class="form-control mb-5" placeholder="Name" v-model="register.name"
                        required />
                    <input type="email" id="email" class="form-control mb-5" placeholder="Email"
                        v-model="register.email" required />
                    <!-- Password -->
                    <input type="password" id="password" class="form-control mb-5" placeholder="Password"
                        v-model="register.password" />
                    <p>
                        Already have an account??<router-link to="/">click here</router-link>
                        <!-- Sign in button -->
                        <button class="btn btn-primary btn-block w-75 my-4" type="submit">
                            Sign in
                        </button>
                    </p>
                </form>
            </div>
        </div>
    </div>
</template>
<script>
import axios from "axios";

    export default {
        data() {
            return {
                register: {
                    name: "",
                    email: "",
                    password: ""
                }
            };
        },
        methods: {
            async registerUser() {
                try {
                    let response = await axios.post("http://localhost:5000/user/register", this.register);
                    console.log(response);
                    let token = response.data.token;
                    if (token) {
                        localStorage.setItem("jwt", token);
                        this.$router.push("/login");
                        this.$swal("Success", "Registration Was successful", "success");
                    } else {
                        this.$swal("Error", "Something Went Wrong", "error");
                    }
                } catch (err) {    
                  this.$swal("Error", err.response.data.message, "error");
                }
            }
        }
    };
</script>