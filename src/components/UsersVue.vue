<template>
    <div class="row">
        <div class="col-md-4">
            <form @submit="handleSubmit($event)" class="card card-body" >
                <div class="form-group">
                    <input
                    v-model="name"
                    type="text"
                    class="form-control mt-2"
                    placeholder="Name"
                    autoFocus
                    />
                </div>
                <div class="form-group">
                    <input
                    v-model="email"
                    type="email"
                    class="form-control mt-2"
                    placeholder="Email"
                    
                    /> 
                </div>
                <div class="form-group">
                    <input
                    v-model="password"
                    type="password"
                    class="form-control mt-2"
                    placeholder="User's Password"
                    /> 
                </div>  
                <button class="btn btn-primary btn-block mt-2">
                    {{editing ? "Update" : "Create"}}
                </button>                                       
            </form>
        </div>
        <div class="col-md-6">
            <table class="table table-striped">
                <thead>
                <tr>
                        <th>Name</th>
                        <th>email</th>
                        <th>password</th>
                        <th>Operations</th>
                </tr>    
                </thead>
                <tbody>
                    <tr v-for="(user) in users" :key=user._id>
                        <td>{{user.name}}</td>
                        <td>{{user.email}}</td>
                        <td>{{user.password}}</td>
                        <td>
                            <button
                            class="btn btn-secondary btn-sm btn-block"
                            @click="editUser(user._id)">
                                Edit
                            </button>
                            <button class="btn btn-danger btn-sm btn-block"
                            @click= "deleteUser(user._id)">
                                Delete
                            </button>
                        </td>
                    </tr>
                </tbody>
            </table>  
        </div>    
    </div>
</template>

<script>

const API = process.env.VUE_APP_API;
 
export default{

    name: "UsersVue",

    created() {
        this.getUsers();
    
    }, 

    data() {
        return {
            users: [],
            name: "",
            email:"",
            password: "",
            editing: false,
            id:"",

        }
    },

    methods: {
 
        getUsers: async function(){
            try{
                const setting = {
                   method: 'GET', 
                }
                const url = `${API}/users`
                const data = await fetch(url, setting);
                const json = await data.json();
                this.users = json;
                
            }
            catch(err){
                console.log(err)
            }
        },
        deleteUser: async function(id){
            const userResponse = window.confirm('Estas seguro que quieres eliminar este usuario?')
            if(userResponse){
                const res = await fetch(`${API}/users/${id}`,{
                method:'DELETE'
            });
            const data = await res.json();
            console.log(data)  
            this.getUsers();              
            }
        },

        handleSubmit: async function(e){    
            e.preventDefault();
            if(this.editing === false){
                const res =  await fetch(`${API}/users`,{
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },            
                    body: JSON.stringify({
                        name: this.name,
                        email: this.email,
                        password: this.password
                    })
                })                 
                const data = await res.json();
                console.log(data)
            }else{
                const res = await fetch(`${API}/users/${this.id}`,{
                    method:'PUT',
                    headers:{
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        name: this.name,
                        email: this.email,
                        password: this.password
                    }),
                });
                const data = await res.json();
                console.log(data);

                this.editing = false;
                this.id = ""; 
            
            }
            await this.getUsers();

            this.name = "",
            this.email = "",
            this.password = ""
        },
        editUser: async function(id){
            const res = await fetch(`${API}/user/${id}`)
            const data = await res.json();
            
    
            this.editing = true;
            this.id= id
            
            this.name = data.name,
            this.email= data.email
            this.password= data.password
    
            
     
         }
    },
}
    
 
</script>