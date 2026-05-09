const srcBtn = document.getElementById('srcbtn');
const input = document.getElementById('input');
const main = document.querySelector('.main-grid');
const icon = document.querySelector('#icon')
const loading = document.querySelector("#loading");

window.addEventListener('load',()=>{fetchNews('india')})


const date = document.getElementById('date');
date.textContent = new Date().toLocaleDateString("en-US",{timeZone: "Asia/Jakarta"});

const fetchNews = async(query)=>{;

      main.style.display = "none"
      loading.style.display ="flex";
      
     try{ 
      const data = await fetch(`https://api.nytimes.com/svc/search/v2/articlesearch.json?q=${query}&api-key=NjPy47LO9j0exVI4j9iAqOjvjhhbXy7efJUAED9MOD9wRE78`);
      const res = await data.json();
      console.log(res);
      loading.style.display ="none";
      main.style.display = "grid"
      
      const articles = res.response.docs;
      console.log(articles)
      const allArticles = articles;
      console.log(allArticles)
     
      
       renderNews('left-upper',articles.slice(0,1))
       renderNews('left-mid',articles.slice(1,3))
       renderNews('left-down',articles.slice(3,4))
       renderNews('right-up',articles.slice(4,5))
       renderNews('right-mid',articles.slice(5,7))
       renderNews('right-down',articles.slice(7,10))
       return articles;
  }
  catch(error){
    console.log('error details:',error)
    loading.style.display = "none";
    const errShow = document.getElementById('errshow')
    errShow.innerHTML = "";
    errShow.classList.add('errimg')
    errShow.innerHTML = `
       <div>
       <p>Oops... Check Your Internet Connection</p>
       </div>
    `
  }
  
}


function renderNews(containerId,articles){
     let container = document.getElementById(containerId);
     container.innerHTML = "";
     articles.forEach((art)=>{
        const card = document.createElement('div');
        
        date.textContent = new Date().toLocaleDateString("en-US",{timeZone: "Asia/Jakarta"});
    
        if(containerId==='left-upper'){
          

            card.classList.add('left');
           const date = new Date(art.pub_date).toLocaleDateString("en-US",{timeZone: "Asia/Jakarta"})
          card.innerHTML = `
          <div class="left-all">
            <div class="let">
            <div class="photo">
               <a href="${art.web_url}" target="_self"> <img src="${art.multimedia.default.url}" class="img"></a>
              </div>
             <div class="left-side">
             <a href="${art.web_url}" target="_blank" class="link"> <h2 class="title">${art.headline.main}</h2></a>
              <p class = "des">${art.abstract}</p>
              <p class="date"> ${art.source},  ${date} </p>
               <div class="btnBrd">
              <button class="btn-save"><i class="fa-regular fa-bookmark"></i></button>
              </div>
              </div>
          </div> 
          `;
          const saveBtn = card.querySelector(".btn-save");
               saveBtn.addEventListener('click',function(){
                    save(saveBtn,art);
         }) ;
        }
         else if(containerId==='left-mid'){
           card.classList.add('L-lower');
           const date = new Date(articles.publishedAt).toLocaleDateString()
           card.innerHTML = `
           <div class="down">
           <div class="lMid"> 
              <a href="${art.web_url}" target="_blank" class="link"> <h4>${art.headline.main}</h4></a>  
                <div class="btnBrd">
              <button class="btn-save"><i class="fa-regular fa-bookmark"></i></button>
              </div>
           </div>
             <div class="small-img">
                <a href="${art.web_url}" target="_self"> <img src="${art.multimedia.default.url}" class="img"></a>
             </div>
             </div>
              `;
              const saveBtn = card.querySelector(".btn-save");
               saveBtn.addEventListener('click',function(){
                    save(saveBtn,art);
         }) ;
        }
        else if(containerId==='left-down'){
          const date = new Date(art.publishedAt).toLocaleDateString("en-US",{timeZone: "Asia/Jakarta"})
          card.innerHTML = `
          <div class="left-all">
            <div class="let">
             <div class="left-side">
              <a href="${art.web_url}" target="_blank" class="link"> <h2 class="title">${art.headline.main}</h2></a>
              <p class = "des">${art.abstract}</p>
              <div class="photo">
               <a href="${art.web_url}" target="_self"> <img src="${art.multimedia.default.url}" class="img"></a>
              </div>
              <p class="date"> ${art.source},  ${date}</p>
              <div class="btnBrd">
              <button class="btn-save"><i class="fa-regular fa-bookmark"></i></button>
              </div>
             </div>
             
             </div> 
          </div> 
          `;
          const saveBtn = card.querySelector(".btn-save");
               saveBtn.addEventListener('click',function(){
                    save(saveBtn,art);
         }) ;
        }
        else if(containerId==='right-up'){
          card.classList.add('rightUp');
          const date = new Date(art.pub_date).toLocaleDateString("en-US",{timeZone: "Asia/Jakarta"})
          card.innerHTML=`
              <div>
                  <div>
                     <a href="${art.web_url}" target="_self"> <img src="${art.multimedia.default.url}" class="img"></a>
                  </div>
                  <a href="${art.web_url}" target="_blank" class="link"> <h2 class="title">${art.headline.main}</h2></a>
                  <p class="des">${art.abstract}</p>
                  <p class="date"> ${art.source},  ${date}</p>
                  <div class="btnBrd">
              <button class="btn-save"><i class="fa-regular fa-bookmark"></i></button>
              </div>
              </div>
          `;
          const saveBtn = card.querySelector(".btn-save");
               saveBtn.addEventListener('click',function(){
                    save(saveBtn,art);
         }) ;
        }
        else if(containerId==='right-mid'){
          card.classList.add('rightlower');
          card.innerHTML=`
                 <a href="${art.web_url}" target="_blank" class="link"> <h3>${art.headline.main}</h3></a>
             <div class="btnBrd">
              <button class="btn-save"><i class="fa-regular fa-bookmark"></i></button>
              </div>
          </div>    
          ` ; 
          const saveBtn = card.querySelector(".btn-save");
               saveBtn.addEventListener('click',function(){
                    save(saveBtn,art);
         }) ;
        }
        else if(containerId==='right-down'){
          card.classList.add('rightDown')
          
          card.innerHTML=`
          <div class="rDown">
             <a href="${art.web_url}" target="_blank" class="link"> <h4>${art.headline.main}</h4></a>
             <div class="btnBrd">
              <button class="btn-save"><i class="fa-regular fa-bookmark"></i></button>
              </div>
          </div>
             <div class="side-img">
            <a href="${art.web_url}" target="_self"> <img src="${art.multimedia.default.url}" class="img"></a>
             </div>
             `;
           const saveBtn = card.querySelector(".btn-save");
               saveBtn.addEventListener('click',function(){
                    save(saveBtn,art);
         }) 
        }
        container.appendChild(card)
     })  
} 
 function save(btn,article){
            let mySavedList = JSON.parse(localStorage.getItem("myNews"))||[];
            const isSaved = mySavedList.some(item=>item.title === article.title);
            if( isSaved){
              mySavedList = mySavedList.filter(item=>item.title!==article.title);
              btn.innerHTML=`<i class="fa-regular fa-bookmark"></i>`
            }else{
            mySavedList.push(article);
            btn.classList.add("is-saved");
            btn.innerHTML = `<i class="fa-solid fa-bookmark"></i>`;
         }
           localStorage.setItem("myNews",JSON.stringify(mySavedList));
      }

async function onNavItems(id){
     await fetchNews(id);   
}

srcBtn.addEventListener('click',()=>{
       const inputBox = input.value.trim();
       if(!inputBox){
          main.textContent = `Please type the news in the search Box`
       }
       fetchNews(inputBox)
})

icon.addEventListener('click',(e)=>{
     const tog = document.getElementById('tog')
       if(e.target.id==='icon'){
         tog.classList.toggle('hidden')
       }
})

const hambur = document.getElementById('hambur');
const navUl = document.getElementById('navUl');
const hamIcon = document.getElementById('hamIcon')
    hambur.addEventListener('click',()=>{
       navUl.classList.toggle('active');
       if(navUl.classList.contains("active")){
           hamIcon.classList.replace('fa-bars','fa-xmark');
       }else{
        hamIcon.classList.replace('fa-xmark','fa-bars');
        // navUl.style.display = "none"
       }

})
