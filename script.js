let blogreq=new XMLHttpRequest();

let main=document.querySelector("main");
 let mintagsdiv=document.querySelector(".blog");

blogreq.onload=function(){
    if(blogreq.readyState==4 && blogreq.status==200){

        let blogdata=JSON.parse(blogreq.responseText);
        let posts=blogdata.posts;
        console.log(posts);
        posts.map(function(ele){
            main.innerHTML+=
            `
             <div class="blog">
                <p>${ele.body}</p>
                   <div class="minitages">
                    ${
                        ele.tags.map(function(ele){
                            return `<span>#${ele}</span>`
                        }).join('')
                    }
                   </div>
                  <div class="reactions" >

                     <div class="view">           
                        <i class="fa-solid fa-eye"> ${ele.views}</i>
                     </div>

                    <div class="like">
                       <i class="fa-solid fa-heart"> ${ele.reactions.likes}</i>
                     </div>

                    <div class="dislike">
                        <i class="fa-solid fa-thumbs-down"> ${ele.reactions.dislikes}</i>
                     </div>

                </div>
           </div>
            `
        })
    
    } 
}

blogreq.open("GET","https://dummyjson.com/posts",true);
blogreq.send();

let tagNamDiv=document.querySelector(".tagsname");
let tagnamereq=new XMLHttpRequest();
tagnamereq.onload=function(){
    if(tagnamereq.readyState==4 && tagnamereq.status==200){
        let names=JSON.parse(tagnamereq.responseText);
        names.map(function(element){
        tagNamDiv.innerHTML+=
        `
        <span onclick="changeitems('${element.slug}')">#${element.name}</span>
        `
       })
  

    }
}

function changeitems(slug){

    main.innerHTML="";
    blogreq.open("GET",`https://dummyjson.com/posts/tag/${slug}`,true);
    blogreq.send();

}

tagnamereq.open("GET","https://dummyjson.com/posts/tags",true);
tagnamereq.send();


function search(word){
    main.innerHTML="";
    blogreq.open("GET",`https://dummyjson.com/posts/search?q=${word}`,true);
    blogreq.send();

}

let holdinput=document.querySelector(".inputsearch");
holdinput.addEventListener("keypress",()=>{
    search(holdinput.value);
})
