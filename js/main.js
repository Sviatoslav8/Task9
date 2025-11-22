class Model{
    constructor(arrProduct){
        this.section = document.querySelector(".section-create");
        this.closeSectionBtn = document.querySelector(".close-btn");
        this.saveBtn = document.querySelector(".create-btn");
        this.form = document.querySelector(".flex-form");
        this.container = document.querySelector(".container");
        this.arr = arrProduct;
        this.initialize();
        this.initializeValidation();
    }

    initialize(){
        this.saveBtn.addEventListener("click",(e)=>this.validation(e))
        this.closeSectionBtn.addEventListener("click",()=>this.close());
        this.section.addEventListener("click",(e)=>{
            if(e.target == this.container){
                this.close();
            }
        });
    }

    initializeValidation(){
        const fields = document.querySelectorAll("input");

        fields.forEach(field =>{
            field.addEventListener("input", ()=> this.customValidity(field));
            field.addEventListener("blur", ()=> this.customValidity(field));
        })
    }

    customValidity(field){
        field.setCustomValidity("");

        const value = field.value;
        if(field.id === "name"){
            if(/^\d/.test(value)){
                field.setCustomValidity("Ім'я має починатися з букви");
            }
        }

        if(field.id === "price"){
            if(value < 1){
                field.setCustomValidity("Ціна не може бути 0 і менше");
            }
        }

        if(field.id ==="brand"){
            if(/^\s|\d/.test(value)){
                field.setCustomValidity("Бренд має починатися з букви");
            }
        }
        if(field.id === "link"){
            if(!(/^https?:\/\//).test(value)){
                field.setCustomValidity("Не правильне посилання");
            }
        }
        if(field.id === "size"){
            if(/^\d|\s/.test(value)){
                field.setCustomValidity("Розмір лише з букви");
            }
        }

        const span = field.parentElement.querySelector(".error-message");
        if(!field.checkValidity()){
            span.textContent = this.errorMessage(field);
        }
        else{
            span.textContent = "";
        }
        return field.checkValidity();
    }

    errorMessage(field){
        const validity = field.validity;
        if(validity.valueMissing)
            return "Поле потрібно заповнити";
        if(validity.tooShort)
            return `Мінімальна довжина - ${field.minLength} символів`;
        if(validity.rangeUnderflow)
            return `Мінімальне значення - ${field.min}`;
        return "Не коректно заповнене поле";
    }

    validation(e){
        e.preventDefault();
        if (!this.form.checkValidity()) {
            const fields = this.form.querySelectorAll("input");
            fields.forEach(field => this.customValidity(field));
            return;
        }
        const product = {
            name: document.getElementById("name").value,
            price: document.getElementById("price").value,
            category: document.getElementById("select-category").value,
            size: document.getElementById("size").value,
            brand: document.getElementById("brand").value,
            link: document.getElementById("link").value,
        };
        this.arr.push(product);
        localStorage.setItem("products",JSON.stringify(this.arr));
        this.close();
    }

    open(){ 
        this.section.classList.add("section-open");
    }

    close(){
        this.form.reset();
        this.section.classList.remove("section-open");
    }
}

function app(arr){
    const modal = new Model(arr);
    const create = document.querySelector(".create-product-btn-header");
    create.addEventListener("click",()=>{
        modal.open();
    })

};
const checkProducts = JSON.parse(localStorage.getItem("products")) || [];
const products = [];
if(checkProducts.length !== 0){
    checkProducts.forEach(product =>{
        products.push(product);
    });
    
    app(products);
}
else{
    app(checkProducts);
}
