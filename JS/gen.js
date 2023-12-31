// Get the variables from local storage and parse them
const storedP_hole = JSON.parse(localStorage.getItem('P_hole'));
const storedP_bg = JSON.parse(localStorage.getItem('P_bg'));
const storedP_upon = JSON.parse(localStorage.getItem('P_upon'));
const userImage = JSON.parse(localStorage.getItem('userImage'));

// Instantiate the variables in your new JavaScript file
const P_hole = storedP_hole || { condition: '', func: '' };
const P_bg = storedP_bg || { locale: '', placement: '' };
const P_upon = storedP_upon || { visitor: [],underneath:'' };


var finalBg ='';
var finalHole ='';
var finalItem ='';
var finalVisitor ='';
var finalUnderground ='';


    finalVisitor = 'bird,human,car,tree';



    finalUnderground ='???';




var filteredHole =hole;
var filteredBg = background;
var filteredItem = items;
var filteredSound = sound;
var voice ='';


function addImage(imagesrc, zindex,isUser, className) {
    const bg2 = document.createElement('img');
    const content = document.querySelector(".forHover");
    bg2.src = imagesrc;
    bg2.classList.add("content");

    if (className) {
        bg2.classList.add(className);
    }

    // Apply opacity transition
    bg2.style.opacity = 0; // Start with 0 opacity
    bg2.style.transition = 'opacity 0.3s ease'; // Transition opacity with a 0.3s ease effect

    // Append the image to the document
    if(isUser){
        bg2.classList.add(".hole");
    }
    content.appendChild(bg2);
    setTimeout(() => {
        bg2.style.opacity = 1;
    }, 10);
}

function generate(){
    if(P_hole.condition !=''){
    filteredHole = hole.filter((dict) => dict.condition === P_hole.condition);}
    if(P_hole.func !=''){
        filteredHole = filteredHole.filter((dict) => dict.func === P_hole.func);}

    if(P_bg.locale!=''){
        filteredBg = filteredBg.filter((dict) => dict.street === P_bg.locale);
    }
    if(P_bg.placement!=''){
        filteredBg = filteredBg.filter((dict) => dict.placement === P_bg.placement);
    }
    // if(P_upon.visitor!=''){
    //     filteredItem = filteredItem.filter
    //     ((dict) => dict.visitor.every(element => P_upon.visitor.includes(element)));
    // }
    // if(P_upon.underneath!=''){
    //     filteredSound = filteredSound.filter
    //     ((dict) =>dict.underground === P_upon.underneath);
    // }


    const randomIndex = Math.floor(Math.random() * filteredBg.length);
    // Get the image object at the random index
    // Set the background image using CSS
    document.body.style.backgroundColor = "black";

    // Set the background
    const random = Math.floor(Math.random() * filteredBg.length);
    finalBg = filteredBg[random];
    setTimeout(() => {
        addImage(filteredBg[random].image,20,false);
      }, 300);

    const randomh = Math.floor(Math.random() * filteredHole.length);
    finalHole =filteredHole[randomh];
      setTimeout(() => {
        addImage(filteredHole[randomh].image, 30, true, "hoverItem");
    }, 600);
    

    setTimeout(() => {
        for (let i = 0; i < Math.floor(Math.random() * filteredItem.length); i++) {
            addImage(filteredItem[Math.floor(Math.random() * filteredItem.length)].image, 40, true, "hoverItem");
        }
    }, 900);
    
    const randomv = Math.floor(Math.random() * filteredSound.length);
    console.log(randomv);
    console.log(filteredSound.length);
    if(filteredSound[randomv].path){
        voice = filteredSound[randomv].path;
    }
    else{
        voice = filteredSound[1];
    }
    
}

function input(category,label){
    
    if(category=== 'condition'){P_hole.condition = label;}
    else if(category=== 'func'){ P_hole.func = label;}
    else if(category ==="locale"){  P_bg.locale = label;}
    else if(category ==="placement"){  P_bg.placement = label;}
    else if(category === "visitor"){ P_upon.visitor.push(label);}
    else if(category === "underneath") {P_upon.underneath = label;}
    else{
        console.log('input not success');
    }
}

generate(); 



function moveItem() {
    const hoverTrigger = document.getElementById('hoverTrigger');
    const hoverItems = document.querySelectorAll('.hoverItem');
    
    hoverItems.forEach(item => {
        const audio = new Audio(`${voice}`);
        audio.play();
        audio.addEventListener('ended', () => {
            audio.pause();
        });

        item.style.transition = 'transform 2s ease'; // Add a smooth transition
        item.style.transform = 'translateX(-500px)';
    });
}

function restoreItem() {
    const hoverTrigger = document.getElementById('hoverTrigger');
    const hoverItems = document.querySelectorAll('.hoverItem');

    hoverItems.forEach(item => {
        item.style.transition = 'transform 0.3s ease'; // Add a smooth transition
        item.style.transform = 'translateX(0px)';
    });
}

console.log(finalBg);
document.querySelector('.main').innerHTML=
`      <div class="heading"> Providence Manhole Certificate</div>
<div>
  <div class="big">
    NOTES
  </div>
  <div>
    1. Located on ${finalBg.street} <br>
    2. Placed on ${finalBg.placement} <br>
    3. For ${finalHole.func} <br>
    4. In ${finalHole.condition} condition <br>
    5. Visited by ${finalVisitor}<br>
    6. Something ${finalUnderground} is underneath <br>
  </div>

  <div class="big">
    LOCATION
  </div>
  <div>
    The REAL manhole used in your generation is located on <br>${finalHole.coord}
  </div>
  <div>
    The REAL background used in your generation is located on <br>${finalBg.street} ${finalBg.coord}
  </div>
</div>`

const doodle_path = doodle[Math.floor(Math.random() * doodle.length)].img;
console.log(doodle_path);
document.querySelector('.doodle-container').innerHTML=
`
<img class="doodle" src="${doodle_path}">
`