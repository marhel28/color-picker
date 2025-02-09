
const input = document.getElementById('color-choose');
const value = document.querySelector('.test');
const color_pick = document.getElementById('color-pick');
const removes = document.getElementById('color-copy');
const navbar = document.querySelector('.nav-hidden');
const navbars = document.querySelector('.navbars');
const rgb = document.getElementById('rgb');
const color_copy = document.querySelector('.color-copy');
const hsl = document.getElementById('hsl');
const background = document.getElementById('background');
const foreground = document.getElementById('foreground');
const font_foreground = foreground.nextElementSibling.querySelector('input');
const font_background = background.nextElementSibling.querySelector('input');
const component_bg = document.getElementById('component-color');
const component_fg = document.querySelectorAll('.child-component');
const counter = document.getElementById('count-color');
const color_check = document.querySelectorAll('.text-color');



// panel
const fileInput = document.getElementById("files");
    const canvas = document.getElementById("canvas");
    const ctx = canvas.getContext("2d", { willReadFrequently: true });
    const colorPanel = document.getElementById("colorPanel");
    const colorPreview = document.getElementById("colorPreview");
    const rgbValue = document.getElementById("rgbValue");
    const hexValue = document.getElementById("hexValue");
    const boxColor = document.getElementById("box-color");
    const zoomPreview = document.getElementById("zoomPreview");
    const zoomImage = document.getElementById("zoomImage");

    // Saat gambar diunggah
    fileInput.addEventListener("change", function (event) {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = function (e) {
                const img = new Image();
                img.onload = function () {
                    console.info('img :',img.width,img.height);
                    while(true){
                        if(img.width>=900 || img.height >=480){
                            if(img.width<img.height/2){
                                img.height = img.height -10;
                            }
                            else{
                                img.width = img.width - 10;
                                img.height = img.height -10;
                            }

                        }else{
                            break;
                        }
                    }
                    console.info('img :',img.width,img.height);
                    console.info('canvas :',canvas.width,canvas.height);
                    canvas.width = img.width;
                    canvas.height = img.height;
                    console.info('canvas :',canvas.width,canvas.height);
                    ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
                };
                img.src = e.target.result;
            };
            reader.readAsDataURL(file);
        }
    });

    // Event untuk zoom dan color picker
    canvas.addEventListener("mousemove", function (e) {
        const rect = canvas.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        // Ambil warna pixel di posisi kursor
        const pixel = ctx.getImageData(x, y, 1, 1).data;
        const rgb = `rgb(${pixel[0]}, ${pixel[1]}, ${pixel[2]})`;
        const hex = `#${((1 << 24) | (pixel[0] << 16) | (pixel[1] << 8) | pixel[2]).toString(16).slice(1)}`;

        colorPreview.style.backgroundColor = rgb;
        rgbValue.textContent = rgb;
        hexValue.textContent = hex;
        colorPanel.style.left = `${e.clientX + 15}px`;
        colorPanel.style.top = `${e.clientY - 40}px`;
        colorPanel.style.display = "flex";

        // Zoom Preview
        const zoomSize = 20;
        const zoomScale = 6;
        const zoomCanvas = document.createElement("canvas");
        zoomCanvas.width = zoomSize;
        zoomCanvas.height = zoomSize;
        const zoomCtx = zoomCanvas.getContext("2d");

        
        zoomCtx.drawImage(canvas, x - zoomSize / 2, y - zoomSize / 2, zoomSize, zoomSize, 0, 0, zoomSize, zoomSize);

        zoomImage.src = zoomCanvas.toDataURL();
        zoomImage.style.width = `${zoomSize * zoomScale}px`;
        zoomImage.style.height = `${zoomSize * zoomScale}px`;

 
        zoomPreview.style.left = `${e.clientX + 20}px`;
        zoomPreview.style.top = `${e.clientY + 35}px`;
        zoomPreview.style.display = "block";
    });


    canvas.addEventListener("mouseleave", function () {
        zoomPreview.style.display = "none";
        colorPanel.style.display = "none";
    });

canvas.addEventListener("click", function (event) {
    const rect = canvas.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;

    const pixel = ctx.getImageData(x, y, 1, 1).data;
    const rgb = `rgb(${pixel[0]}, ${pixel[1]}, ${pixel[2]})`;
    const hex = `#${pixel[0].toString(16).padStart(2, '0')}${pixel[1].toString(16).padStart(2, '0')}${pixel[2].toString(16).padStart(2, '0')}`;

    // Buat elemen warna baru
            
    const colorBox = document.createElement("div");
    if(boxColor.children.length<4){
        colorBox.className = "w-28 h-28 rounded  hover:scale(120)";
        let p = document.createElement('p');
        p.className = 'child-color elco';
        p.textContent = hex;
        
        let div = document.createElement('div');
        div.className = 'contents';
        div.innerHTML = '<span>copy</span>';
        colorBox.style.backgroundColor = rgb;
        colorBox.title = `RGB: ${rgb} | HEX: ${hex}`;
        colorBox.innerHTML = '';
        colorBox.appendChild(p);
        colorBox.appendChild(div);
        boxColor.appendChild(colorBox);
    } 
    });

document.addEventListener('click',(event)=>{
    if(event.target.classList.contains('elco')){
        event.target.parentNode.remove();
        event.target.remove();
    }
})




console.info(font_background);
const font = [
    'fa-solid fa-star starts text-2xl text-[#0d5f07]',
'fa-regular fa-star res'];


let hue =0;
let saturation = 0;
let lightness =0;
let alpha = 1;
let show_hsl = document.querySelector('.show-hsla');
const copy_hsl = document.querySelector('.copy-hsl');

const trigger_hsl = document.querySelectorAll("input[type='range']");

let data = false;

let data_foreground = 0;
let data_background = 0;
let colors = '[#112a46]';

class colorChange{  
    static convertToRgb(color) {
        color = color.replace(/^#/, ''); // Hapus simbol #
        
        if (color.length === 3) { 
            // Jika format warna 3 digit (#ABC), ubah ke 6 digit (#AABBCC)
            color = color.split('').map(c => c + c).join('');
        }
    
        let red = parseInt(color.substring(0, 2), 16);
        let green = parseInt(color.substring(2, 4), 16);
        let blue = parseInt(color.substring(4, 6), 16);
        let total = {
            red : red,
            green : green,
            blue : blue,
        }
        return total;
    }
    
    static #convert(){
        return 'ok'
    }

}


class Contrast {
    static count(Lterang, Lgelap) {
        let total = 0;
        console.info('terang :', Lterang, ' ', 'gelap :', Lgelap);

        Lterang = parseFloat(Lterang);
        Lgelap = parseFloat(Lgelap);

        if (Lterang === 0) Lterang = 0.0001;
        if (Lgelap === 0) Lgelap = 0.0001;
        total = (Math.max(Lterang,Lgelap)+0.05)/(Math.min(Lterang,Lgelap)+0.05);

        return total
    }

    static Luminnens(data) {
        let datas = colorChange.convertToRgb(data);
        let code_back = 0;


        for (const [key, value] of Object.entries(datas)) {
            let normalizedValue = value / 255; // Normalisasi ke 0-1

            let correctedValue =
                normalizedValue <= 0.03928
                    ? normalizedValue / 12.92
                    : Math.pow((normalizedValue + 0.055) / 1.055, 2.4);


            if (key === 'red') {
                code_back += correctedValue * 0.2126;
            } else if (key === 'green') {
                code_back += correctedValue * 0.7152;
            } else {
                code_back += correctedValue * 0.0722;
            }
        }

        return code_back;
    }
}

function luminens(){
    let luminens_bck = Contrast.Luminnens(data_background);
    let luminens_fore = Contrast.Luminnens(data_foreground);
    let data = Contrast.count(luminens_fore,luminens_bck).toFixed(2);
    counter.firstElementChild.textContent = `${Contrast.count(luminens_fore,luminens_bck).toFixed(2)} : 1`;
    console.info(background.value);
    component_bg.style.backgroundColor = `${background.value}`;

    if(data>=4.5){
        color_check.forEach(value=>{
            value.firstElementChild.style.color= '#0d5f07';
            value.style.backgroundColor = '#d2fbd0';
            let data = value.lastElementChild.querySelectorAll('i');
            for(let i=0;i<=2;i++){
                let s = data[i].className;
                    data[i].className = data[i].className.replaceAll(s, font[0]); // Simpan hasilnya kembali
                    console.info(data[i].className);
                    data[i].style.color = '#0d5f07'
                
            }


        })

    }
   if(data>=3.1 && data<=4.5){
        for(let i=0;i<=2;i++){
            if(i==2){
                color_check[i].firstElementChild.style.color = '#0d5f07'
                color_check[i].style.backgroundColor = '#d2fbd0';
                let data = color_check[i].lastElementChild.querySelectorAll('i');
                for(let i=0;i<=2;i++){
                    let s = data[i].className;
                        data[i].className = data[i].className.replaceAll(s, font[0]); 
                    data[i].style.color = '#0d5f07';
                }
                break
            }
            let data = color_check[i].lastElementChild.querySelectorAll('i');
            for(let i=0;i<=2;i++){
                let s = data[i].className;
                if(i>=1){
                    data[i].className = data[i].className.replaceAll(s, font[0]); 
                }else{
                    data[i].className = data[i].className.replaceAll(s, font[1]);
                }
                data[i].style.color = '#5f5207';
            }
            color_check[i].firstElementChild.style.color = '#5f5207'
    
            color_check[i].style.backgroundColor = '#fbf5d0';
        }
        }
    else if(data<3.1){
        color_check.forEach(value=>{
            value.style.backgroundColor = '#fbd0da';
            value.firstElementChild.style.color='#5f071c';
            let data = value.lastElementChild.querySelectorAll('i');
            for(let i=0;i<=2;i++){
                let s = data[i].className;
                if(i>0){
                    data[i].className = data[i].className.replaceAll(s, font[1]); // Simpan hasilnya kembali
                    console.info(data[i].className);
                }
                
                data[i].style.color = '#5f071c';
           
        }})
        
    }


    for(const element of component_fg){
        if(element.classList.contains('bg-component')){;
            element.style.backgroundColor = `${foreground.value}`;
            
        }
        else{
            element.style.color = `${foreground.value}`;
        }
    }
    let datalia = document.querySelector('.borders');
    datalia.style.borderBottomColor = `${foreground.value}`;

}



copy_hsl.addEventListener('click',()=>{
    navigator.clipboard.writeText(copy_hsl.textContent).then(
        ()=>{
            console.info('test');
            let data = document.querySelector('.alert_hsla');
            data.classList.remove('hidden');
            setTimeout(()=>{
                data.classList.add('hidden');
            },500);
        }
    )
})



background.addEventListener('input',()=>{
    let color = background.value;
    data_background = color;
    data_foreground = foreground.value;
    font_background.value = color;
    luminens();

})

foreground.addEventListener('input',()=>{
    let color = foreground.value;
    data_foreground = color;
    data_background = background.value;
    
    font_foreground.value = color;
    luminens();
})

font_background.addEventListener('input',()=>{
    let color = font_background.value;
    data_background = color;
    data_foreground = foreground.value;
    
    background.value = color
    luminens();
})
font_foreground.addEventListener('input',()=>{
    let color = font_foreground.value;
    data_foreground = color;
    data_background = background.value;
    

    foreground.value = color
    luminens();
})

color_copy.addEventListener('click',()=>{
    navigator.clipboard.writeText(color_copy.textContent).then(
        ()=>{
            let data = rgb.querySelector('.alert');
            data.classList.remove('hidden');
            setTimeout(()=>{
                data.classList.add('hidden');
            },500);
        }
    );
})


trigger_hsl.forEach(element => {
    element.addEventListener('input',function(event){
        switch(element.id){
            case 'hue':
                hue = event.target.value;
                let span_hue = element.nextElementSibling;
                span_hue.textContent = hue;
                break
            case 'saturation':
                saturation = event.target.value;
                let span_saturaton = element.nextElementSibling;
                span_saturaton.textContent = `${saturation}%`;
                break
            case 'lightness':
                lightness = event.target.value;
                let span_lightness = element.nextElementSibling;
                span_lightness.textContent = `${lightness}%`;
                break;
            case 'alpha':
                alpha = (parseInt(event.target.value)/10);
                let span_alpha = element.nextElementSibling;
                span_alpha.textContent = `${alpha}`

            default:
                break;
        }

        copy_hsl.textContent = `hsla(${hue},${saturation}%,${lightness}%,${alpha})`
        show_hsl.style.backgroundColor = `hsla(${hue} ,${saturation}% ,${lightness}% ,${alpha})`;
    })
});


input.addEventListener('input',function(event){
    let data = colorChange.convertToRgb(input.value);
    let red = rgb.querySelector('#red p');
    let green = rgb.querySelector('#green p');
    let blue = rgb.querySelector('#blue p')
    let total = rgb.querySelector('.total');
    console.info(red.textContent);
    red.textContent = data.red;
    green.textContent = data.green;
    blue.textContent = data.blue;

    console.info(total);
    total.textContent = `(${red.textContent},${green.textContent},${blue.textContent})`;
    value.style.backgroundColor = input.value;
    color_pick.textContent = input.value;
})
color_pick.addEventListener('click',()=>{
    navigator.clipboard.writeText(color_pick.textContent).then(()=>{
        console.info("ok");
        removes.classList.remove('opacity-0');
        setTimeout(()=>{
            removes.classList.add('opacity-0');
        },500)
    })
})
navbar.addEventListener('click',()=>{
    if(navbar.classList.contains('navbar-rotate')){
        data = false;
        navbars.classList.add('hidden');
        navbar.classList.remove('navbar-rotate');
        
    }else{
        data = true;
        navbars.classList.remove('hidden');
        navbar.classList.add('navbar-rotate');
    }
})
addEventListener('click',(event)=>{
    if (data && !navbar.contains(event.target)) {
        navbars.classList.add("hidden");
        navbar.classList.remove("navbar-rotate");
        data = false;
    }
})
