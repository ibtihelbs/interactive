${(Data.replies.map(function(item){ return `<div class="score">
<button class="plus operator"><img src="images/icon-plus.svg" alt=""></button>
<button class="number-score">${item.score}</button>
<button class="minus operator"><img src="images/icon-minus.svg" alt=""></button>
</div>
<div class="comments">
<div class="thumbnail">
  <div class="image">
    <img src="./images/avatars/image-amyrobson.png" alt="hiiihi">
    <span class="name">amyrobson</span>
    <span class="date">1 month ago</span>
  </div>
  <div class="replay hundler">Replay</div>
</div>
<div class="content">
  <p>
    "Impressive! Though it seems the drag feature could be improved. But overall it looks incredible. You've nailed the design and the responsiveness at various breakpoints works really well."
  </p>
</div>
</div>
`}))}