const express = require('express');
const router = express.Router()


var Flickr = require('flickr-sdk');
const axios = require("axios");

var images_from_flickr;
router.get('/:search',async (req, res) => {
const userPost = req.params.search;
var responseFromFlickr =  await CallFirstSystem(userPost);
var responseFromPixabay =  await CallSecondSystem(userPost);

res.send([{responseFromPixabay:responseFromPixabay},{responseFromFlickr:responseFromFlickr}]);
});

  function CallFirstSystem(post) {
    var flickr = new Flickr('3c39c6e7b58b1534dddc97a7059725e9');

  return new Promise(async function (resolve, reject) {
      try {
       await flickr.photos.search({
          text: post,
          per_page: 10,
          sort: "relevance"
        }).then(function (result) {
          images_from_flickr = result.body.photos.photo;
          var urls_from_flickr=[];
              images_from_flickr.forEach((element,index)=>
              {
                flickr.photos.getSizes({
                api_key :'3c39c6e7b58b1534dddc97a7059725e9',
                photo_id: element.id}).then(function(e){
                urls_from_flickr.push(e.body.sizes.size[1].source);
                if(urls_from_flickr.length===images_from_flickr.length) {
                  resolve(urls_from_flickr);
                }
              });
             });
                  })
                  .catch(function (error) {
                      console.log(error);
                  });
      } catch (err) {
          console.log(err)
      } finally {}
  }).catch((err) => {
      console.log(err)
  });
}

function CallSecondSystem(post) {
  let API_KEY = '14654885-09cdfb3dfe6eae47178da05e5';
  var URL = "https://pixabay.com/api/?key="+API_KEY+"&q="+encodeURIComponent(post)+"&per_page=10";


  return new Promise(async function (resolve, reject) {
      try {
        var pixabay_urls = [];

        await axios.get(URL)
                    .then(res=> {
                      console.log(res.data.hits.length);
                      var images_from_pixabay = res.data.hits;
                      images_from_pixabay.forEach(e=>{
                        pixabay_urls.push(e.previewURL);
                        if(pixabay_urls.length===images_from_pixabay.length) {
                          resolve(pixabay_urls);
                        }
                      })
                    })
                    .catch(err => console.error(err))
      } catch (err) {
          console.log(err)
      } finally {}
  }).catch((err) => {
      console.log(err)
  });
}

module.exports = router;
