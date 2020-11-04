window.onload = () => {
  const image_button = document.querySelector("main section p a");
  const secondary_button = image_button.nextSibling.nextSibling;
  image_button.addEventListener("click", loadImage);
  image_button.addEventListener("click", loadSecondaryImage);
};

const loadImage = (event) => {
  fetch("http://www.splashbase.co/api/v1/images/search?query=laptop", {
    method: "GET",
  })
    .then((response) => {
      if (response.ok) {
        return response.json();
      }
    })
    .then((body) => {
      console.log(body.images);
      const destination = document.querySelector(".album .container");
      console.log(destination);
      let card = document.createElement("div");
      card.classList.add("row");
      body.images.forEach((element) => {
        card.innerHTML += `<div class="col-md-4">
        <div class="card mb-4 shadow-sm">
            <img src="${element.url}" class="card-img-top"
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
                        <button type="button" onclick="viewImage()" class="btn btn-sm btn-outline-secondary">
                            View
                        </button>
                        <button type="button" class="btn btn-sm btn-outline-secondary">
                            Edit
                        </button>
                    </div>
                    <small class="text-muted">9 mins</small>
                </div>
            </div>
            </div>`;
      });
      destination.appendChild(card);
    })
    .catch((err) => {
      console.error(err);
    });
};
const loadSecondaryImage = () => {
  fetch("http://www.splashbase.co/api/v1/images/search?query=laptop", {
    method: "GET",
  })
    .then((response) => {
      if (response.ok) {
        return response.json();
      }
    })
    .then((body) => {
      console.log(body.images);
      const destination = document.querySelector(".album .container");
      console.log(destination);
      let card = document.createElement("div");
      card.classList.add("row");
      body.images.forEach((element) => {
        card.innerHTML += `<div class="col-md-4">
            <div class="card mb-4 shadow-sm">
                <img src="${element.url}" class="card-img-top"
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
                            <button type="button" onclick="viewImage()" class="btn btn-sm btn-outline-secondary">
                                View
                            </button>
                            <button type="button" class="btn btn-sm btn-outline-secondary">
                                Edit
                            </button>
                        </div>
                        <small class="text-muted">9 mins</small>
                    </div>
                </div>
                </div>`;
      });
      destination.appendChild(card);
    })
    .catch((err) => {
      console.error(err);
    });
};
const viewImage = () => {};
