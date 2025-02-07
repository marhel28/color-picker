const input = document.getElementById('color-choose');
const value = document.querySelector('.test');
const color_pick = document.getElementById('color-pick');
const removes = document.getElementById('color-copy');
const navbar = document.querySelector('.nav-hidden');
const navbars = document.querySelector('.navbars');
const rgb = document.getElementById('rgb');
const color_copy = document.querySelector('.color-copy');
const hsl = document.getElementById('hsl');

let hue =0;
let saturation = 0;
let lightness =0;
let alpha = 1;
let show_hsl = document.querySelector('.show-hsla');
const copy_hsl = document.querySelector('.copy-hsl');

const trigger_hsl = document.querySelectorAll("input[type='range']");

let data = false;


class colorChange{  
    static convertToRgb(color){
        let data = color.replace(/#/g,'');
        let importan = data.split("");

        //red color
        let red = [parseInt(importan[0],16),parseInt(importan[1],16)];
        red = (red[0]*16) + (red[1]*1);

        let green = [parseInt(importan[2],16),parseInt(importan[3],16)];
        green = (green[0]*16) + (green[1]*1);

        let blue = [parseInt(importan[4],16),parseInt(importan[5],16)];
        blue = (blue[0]*16)+(blue[1]*1);
        

        let total = {
            red : red,
            green : green,
            blue : blue,
        }
        // console.info('data:',total,' ',color);
        return total;

    }
    static #convert(){
        return 'ok'
    }

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
// addEventListener('click',(event)=>{
//     if (data && !navbar.contains(event.target)) {
//         navbars.classList.add("hidden");
//         navbar.classList.remove("navbar-rotate");
//         data = false;
//     }
// })
