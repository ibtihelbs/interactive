class comments {
  constructor(){
    this.Data_app();
  }
  /*display the exiting comments */
  main_comment(data){

    return `
    <section class="comment">
    <div class="score">
      <button class="plus operator"><img src="images/icon-plus.svg" alt=""></button>
      <button class="number-score">${data.score}</button>
      <button class="minus operator"><img src="images/icon-minus.svg" alt=""></button>
    </div>
    <div class="comments" data-comment="main" data-id="${data.id}">
      <div class="thumbnail">
        <div class="image">
          <img src="${data.user.image.png}" alt="hiiihi">
          <span class="name">${data.user.username}</span>
          <span class="date">${data.createdAt}</span>
        </div>
        <div class="replay hundler">Replay</div>
      </div>
      <div class="content">
        <p>
        ${data.content}
        </p>
      </div>
    </div>
    </section>
    <div class="wrap">
    ${(data.replies.map(function(item){ return `<section class="replay-comments">
    <div class="score">
      <button class="plus operator"><img src="images/icon-plus.svg" alt=""></button>
      <button class="number-score">${item.score}</button>
      <button class="minus operator"><img src="images/icon-minus.svg" alt=""></button>
    </div>
    <div class="comments" data-comment="replies" data-id="${item.id}">
      <div class="thumbnail">
        <div class="image">
          <img src="${item.user.image.png}" alt="hiiihi">
          <span class="name">${item.user.username}</span>
          <span class="date">${item.createdAt}</span>
        </div>
        <div class="replay hundler">Replay</div>
      </div>
      <div class="content">
        <p>
        ${item.content}
        </p>
      </div>
    </div>
    </section>
`}))}
<section class="add-comment replay-comments">
<div class="comments">
  <div class="thumbnail">
    <div class="image">
      <img src="./images/avatars/image-juliusomo.png" alt="hiiihi">
    </div>
  </div>
</div>
<form class="add-post">
<textarea placeholder="add your comment..."></textarea>
<button type="submit" class="send">SEND</button>
</form>
</section>
    </div>
   `  
  }
  /**display add comment section*/
  /**add comment */
  add_comment() {
      return `<section class="add-comment comments">
    
      <div class="comments data-comment="main">
        <div class="thumbnail">
          <div class="image">
            <img src="./images/avatars/image-juliusomo.png" alt="hiiihi">
          </div>
        </div>
      </div>
      <form class="add-post">
        <textarea placeholder="add your comment..."></textarea>
        <button type="submit" class="send">SEND</button>
      </form>
    </section>`
  }
  current_user_commentRender(user,comment_handler){
    let section= document.querySelectorAll("section");
    section.forEach((e)=>{ 
     
      let comment=e.querySelector(".comments");
      let replay=e.querySelector(".replay");
      let thumbnail=e.querySelector(".thumbnail");
       if(e.innerHTML.includes(`<span class="name">${user}</span>`)==true){
        comment.classList.toggle("user-comment");
        //console.log(comment_handler,replay);
        //thumbnail.replaceChild(comment_handler,replay);
        replay.classList.toggle("comment-handler");
        replay.innerHTML=`<button class="delete">delete</button>
        <button class="edit">edit</button>`;
        replay.classList.remove("replay");
       }
    })
  }
  display_reply(){
     let wrap=document.querySelectorAll(".wrap");
     let replay=document.querySelectorAll(".replay");
     replay.forEach((item, index) => {
            item.addEventListener("click",(e)=>{
               wrap[index].style.display="flex"; 
               
            })
     })
  }
  /**edit comment */
   EditComment(){
     let editBtn=document.querySelectorAll(".edit");
       editBtn.forEach((item, index) =>{
         item.addEventListener("click",(e)=>{
           let parent=e.target.parentNode.parentNode.parentNode;
           let content=parent.querySelector("p");
          //alert(content.innerHTML);
          const form = document.createElement("form");
         
          form.innerHTML=` <textarea></textarea>
          <button type="submit" class="send">Update</button>`;
          content.replaceWith(form);
          let textarea=form.querySelector("textarea");
          textarea.value=content.innerHTML;
          form.addEventListener("submit",(e)=>{
            e.preventDefault();
            let comment=parent.parentNode.querySelector(".comments");
            let data_id=comment.getAttribute("data-id");
            
            alert(typeof(data_id));
            //return;
            fetch('https://my-json-server.typicode.com/ibtihelbs/interactive/'+data_id, {
              method: 'PATCH',
              headers: {
                'Accept': 'application/json', 
                'Content-Type': 'application/json'
              },
              body: JSON.stringify({
                content: textarea.value,
              })
            }).then((response) => response.json())
            .then((json) => console.log(json)); 
             
             //console.log();
          })
        })
       })
   }
  /**adding comment */
  submit_comment() {
    let add_post= document.querySelectorAll(".add-post");
      
       add_post.forEach(element => {
         element.addEventListener("submit",(e)=>{
          e.preventDefault();
             let parent=e.target.parentNode.parentNode;
             let data=parent.querySelector(".comments");
             //console.log(data);
             //return;
             let content=element.querySelector("textarea").value;
             //console.log(content);
             /**?author.name=typicode */
            fetch('https://my-json-server.typicode.com/ibtihelbs/interactive/comments', {
            method: 'POST',
            headers: {
              'Accept': 'application/json', 
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({
            content: content,
            createdAt: "1 month ago",
            score: 0,
            user: {
              "image": { 
                "png": "./images/avatars/image-juliusomo.png",
                "webp": "./images/avatars/image-juliusomo.webp"
              },
                "username": "juliusomo"
            },
            replies: []})
          });
        })
       });
  }
  /**delete comment */
  delete_comment() {
    let delete_comment=document.querySelectorAll(".delete");
    let delete_modal= document.querySelector(".delete-comment");
    delete_comment.forEach(element => {
      element.addEventListener("click",(e)=>{
        e.preventDefault();
        delete_modal.style.display='flex';
        delete_modal.addEventListener("click",(f)=>{
          let btn=f.target.closest('button');
          if(!btn)return;
          if(btn.classList.contains('cancel-btn')){
            delete_modal.style.display='none';
          }else{
            let parent=element.parentNode.parentNode.parentNode.parentNode;
            let comment=parent.querySelector(".comments");
            let data_id=comment.getAttribute("data-id");
            alert(data_id);
            fetch('https://my-json-server.typicode.com/ibtihelbs/interactive/comments'+data_id, {
              method: 'DELETE'
            })
              .then(res => res.json())
              .then(data => {
                // Do some stuff...
              })
              .catch(err => console.log(err));
          }
        })

      })
    })
  }
  /**remove comment */
  async Data_app() {
    const response = await fetch('db.json');
    const data = await response.json();
    let comment = data.comments;
    //console.log(comment[0])
    let current_user=data.currentUser.username;
    
    /**for main_comments data should be data.comments  */
    comment.map((item)=>{
        document.querySelector("main").innerHTML += this.main_comment(item);
      });
       document.querySelector("main").insertAdjacentHTML("beforeend",this.add_comment());
       let comment_handler=document.createElement("div");
      comment_handler.setAttribute("class", "comment-handler hundler");
      comment_handler.innerHTML=`<span class="delete">delete</span>
      <span class="edit">edit</span>`;
       this.current_user_commentRender(current_user,comment_handler);
       this.display_reply();
       this.submit_comment();
       this.EditComment();
       this.delete_comment();
  }
  
}
let comment = new comments();

