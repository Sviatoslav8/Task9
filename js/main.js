//Task 1
// class Button{
//     constructor(text,border,color,backgorund){
//         this.text = text,
//         this.border = border,
//         this.color = color,
//         this.backgorund = backgorund
//     }

//     render(){
//         const containerBtn = document.querySelector(".container-btn");
//         const button = document.createElement("button");
//         button.textContent = this.text;
//         button.style.border = this.border;
//         button.style.color = this.color;
//         button.style.backgroundColor = this.backgorund;
//         button.classList.add("buttons");
//         containerBtn.append(button);
//         button.addEventListener("click",()=>{
//             console.log(`Button ${this.text} pressed. Color button - ${this.backgorund}`);
//         })
//     }
// }

// const arrBtn = [
//     new Button("Click me", "1px solid red","aqua","green"),
//     new Button("Click", "2px solid green", "white","blue"),
//     new Button("Press...", "2px solid orange", "blue","brown"),
// ]

// arrBtn.forEach(btn =>{
//     btn.render();
// })

// class RoundedButton extends Button{
//     constructor(text,border,color,backgorund,borderRadius){
//         super(text,border,color,backgorund);
//         this.borderRadius = borderRadius;
//     }
//     dropShadow(){
//         const containerBtn = document.querySelector(".container-btn");
//         const button = document.createElement("button");
//         button.textContent = this.text;
//         button.style.border = this.border;
//         button.style.color = this.color;
//         button.style.backgroundColor = this.backgorund;
//         button.classList.add("buttons");
//         containerBtn.append(button);
//         button.addEventListener("click",()=>{
//             console.log(`Button ${this.text} pressed. Color button - ${this.backgorund}`);
//         })
//         button.style.borderRadius = this.borderRadius;
//         button.addEventListener("mouseover",()=>{
//             button.style.boxShadow = `4px 4px 4px gray`;
//         })
//         button.addEventListener("mouseleave",()=>{
//             button.style.boxShadow = `none`;
//         })
//     }
// }

// const arrRoundedBtn = [
//     new RoundedButton("Click sviat", "1px solid red","aqua","green","10px"),
//     new RoundedButton("Click here", "1px solid blue","black","yellow","20px"),
//     new RoundedButton("Press here", "2px solid black","maroon","aqua","15px")
// ]

// arrRoundedBtn.forEach(btn =>{
//     btn.dropShadow();
// })

// Task 2

const products = [];

class Model{
    constructor(arr){
        this.section = document.querySelector(".section-create");
        this.closeSectionBtn = document.querySelector(".close-btn");
        this.saveBtn = document.querySelector(".create-btn");
        this.form = document.querySelector(".flex-form");
        this.container = document.querySelector(".container");
        this.arr = arr;
        this.initialize(arr);
    }

    initialize(arr){
        this.saveBtn.addEventListener("click",()=>this.validation(arr))
        this.closeSectionBtn.addEventListener("click",()=>this.close());
        this.section.addEventListener("click",(e)=>{
            if(e.target == this.container||e.target == this.header){
                this.close();
            }
        });
    }

    isHttpOrHttps(link){
        if(link.includes("http://")||link.includes("https://")){
            return true;
        }
        return false;
    }

    isDigit(number){
        if(!(isNaN(number))){
            if(number > 0){
                return true;
            }
        }
        return false;
    }

    validation(arr){
        const product = {
            name: document.getElementById("name").value,
            price: document.getElementById("price").value,
            category: document.getElementById("select-category").value,
            size: document.getElementById("size").value,
            brand: document.getElementById("brand").value,
            link: document.getElementById("link").value,
        }
        let isTrue = true;
        for(let i in product){
            if(product[i] === "" || !(this.isDigit(product.size)) || !(this.isDigit(product.price)) || !(this.isHttpOrHttps(product.link))){
                isTrue = false;
                alert("error");
                break;
            }
        }
        if(isTrue == true){
            arr.push(product);
            console.log(arr);
            this.close();
        }
        
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

app(products);