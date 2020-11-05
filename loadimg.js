window.onload = () => {
  const image_button = document.querySelector("main section p a");
  const secondary_button = image_button.nextSibling.nextSibling;
  image_button.addEventListener("click", loadImage);
  secondary_button.addEventListener("click", loadSecondaryImage);
  modal();

  carousel();
};
const alertImages = (num_image) => {
  let messege = document.createElement("span");
  num_image !== 0 ? ((messege.innerText = num_image + " images are loading..."), messege.classList.add("alertmsg")) : ((messege.innerText = "NO IMAGES FOUND"), messege.classList.add("errormsg"));
  let destination = document.getElementsByTagName("header")[0];
  destination.appendChild(messege);
  setTimeout(() => messege.remove(), 5000);
};
const loadImage = (event) => {
  let end_point = "old+car";
  fetch("http://www.splashbase.co/api/v1/images/search?query=" + end_point, {
    method: "GET",
  })
    .then((response) => {
      if (response.ok) {
        return response.json();
      }
    })
    .then((body) => {
      const destination = document.querySelector(".album .container");
      destination.innerHTML = "";
      let card = document.createElement("div");
      card.classList.add("row");
      alertImages(body.images.length);
      body.images.forEach((element) => {
        card.innerHTML += `<div class="col-md-4">
        <div class="card mb-4 shadow-sm">
            <img src="${element.url}" class="card-img-top" height=200px
                focusable="false">
            </img>
            <div class="card-body">
                <p class="card-text">
                    This is a wider card with supporting text below as a natural
                    lead-in to additional content. This content is a little bit
                    longer.
                </p>
                <div class="d-flex justify-content-between align-items-center">
                    <div class="btn-group">
                        <button type="button" onclick="viewImage(event)" class="btn btn-sm btn-outline-secondary">
                            View
                        </button>
                        <button type="button" class="btn btn-sm btn-outline-secondary" onclick="hideCard(event)">
                            Hide
                        </button>
                    </div>
                    <small class="text-muted">${element.id}</small>
                </div>
            </div>
            </div>`;
      });
      destination.appendChild(card);
    })
    .catch((err) => {
      alert("AN ERROR HAS OCCURRED  " + err);
      console.error(err);
    });
};

const loadSecondaryImage = () => {
  let search = document.querySelector(".jumbotron input");
  let end_point = search.value != "" ? search.value : "laptop";
  fetch("http://www.splashbase.co/api/v1/images/search?query=" + end_point, {
    method: "GET",
  })
    .then((response) => {
      if (response.ok) {
        return response.json();
      }
    })
    .then((body) => {
      const destination = document.querySelectorAll(".album .container img");
      const ids = document.querySelectorAll(".card small");
      //get urls from response
      let Allurls = body.images.map((element) => element.url);
      console.log(Allurls);
      alertImages(body.images.length);
      body.images.forEach((element, index) => {
        if (index < destination.length) {
          destination[index].src = element.url;
          ids[index].innerText = element.id;
        }
      });
    })
    .catch((err) => {
      alert("AN ERROR HAS OCCURRED", err);
      console.error(err);
    });
};
const viewImage = (event) => {
  let img_src = event.target.parentNode.parentNode.parentNode.previousElementSibling.src;
  let modal = document.querySelector(".modal");
  modal.style.display = "block";
  let img = modal.querySelector("img");
  img.src = img_src;
};
const hideCard = (event) => {
  let card = event.target.parentNode.parentNode.parentNode.parentNode;
  card.classList.add("loadoff");
  setTimeout(() => card.remove(), 1000);
};
/*CREATE MODAL */
const modal = () => {
  let modal = document.createElement("div");
  modal.classList.add("modal");
  modal.tabIndex = -1;
  modal.innerHTML = `  <div class="modal-dialog modal-dialog-centered">
  <div class="modal-content">
    <img src="" class="card-img-top" height=200px
    focusable="false">
    <button type="button" class="close m-0" data-dismiss="modal"  aria-label="Close">
    <span aria-hidden="true">&times;</span>
  </button>
    </div>
</div>`;
  document.body.appendChild(modal);
  modal.style.display = "none";
  span = document.getElementsByClassName("close")[0];
  span.onclick = function () {
    modal.style.display = "none";
  };
};
/*** CREATE CAROUSEL***/
const carousel = () => {
  let end_point = "forest";
  fetch("http://www.splashbase.co/api/v1/images/search?query=" + end_point, {
    method: "GET",
  })
    .then((response) => {
      if (response.ok) {
        return response.json();
      }
    })
    .then((body) => {
      const destination = document.getElementById("carouselforest");
      let img = document.createElement("div");
      img.classList.add("carousel-inner");
      /****** GET ONLY IMAGES WITH SOURCE DIFFERENT THE UNSPLASH ******/
      const images = body.images.filter((el) => !el.url.includes("unsplash"));
      const sumID = images.map((el) => el.id).reduce((accumulator, id) => accumulator + id);
      console.log(sumID);
      images.forEach((element, index) => {
        img.innerHTML +=
          index === 0
            ? `<div class="carousel-item active">
          <img src="${element.url}" class="d-block w-100" alt="...">
        </div>`
            : `<div class="carousel-item">
        <img src="${element.url}" class="d-block w-100" alt="...">
      </div>`;
      });
      destination.insertBefore(img, destination.firstChild);
      console.log(img, destination);
    })
    .catch((err) => {
      alert("AN ERROR HAS OCCURRED  " + err);
      console.error(err);
    });
};
