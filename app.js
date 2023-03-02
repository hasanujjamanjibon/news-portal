const categoryContainer = document.getElementById("category-container");
const categoryBtn = document.getElementById("btn-category");
const count = document.getElementById("count");
const newsContainer = document.getElementById("news-container");
const showDetails = document.getElementById("showDetails");
const modalTitle = document.getElementById("modal-title");
const modalImage = document.getElementById("modal-image");
const modalDescription = document.getElementById("modal-description");

// fetch catagory data from api
const FetchCatagory = async () => {
  const URL = "https://openapi.programming-hero.com/api/news/categories";
  const res = await fetch(URL);
  const data = await res.json();
  loadCatagories(data.data.news_category);
};
// load catagory
const loadCatagories = (categories) => {
  // For Each Loop Process here

  categories.forEach(({ category_id, category_name }) => {
    categoryContainer.innerHTML += `
    <a id="btn-category" href="#" onclick="fetchNewsById('${category_id}')"  class="nav-link  fw-semibold text-secondary">${category_name}</a>
    `;
  });
  // For Each Loop end here
};

// fetch News Data by id when click
const fetchNewsById = async (category_id) => {
  const URL = `https://openapi.programming-hero.com/api/news/category/${category_id}`;
  const res = await fetch(URL);
  const data = await res.json();
  displayNewsById(data.data);
};

// display news by catagory Id
const displayNewsById = (news) => {
  count.innerText = news.length;
  console.log(news);
  // empty container when new news appered
  newsContainer.innerHTML = "";
  // news display start here
  news.forEach(
    ({ _id, rating, thumbnail_url, title, details, author, total_view }) => {
      newsContainer.innerHTML += `
    <div class="card mb-3 p-2">
    <div class="row g-0">
      <div class="col-md-2">
        <img
          src="${thumbnail_url}"
          class="img-fluid rounded-start h-100 w-100 rounded"
          alt=""
        />
      </div>
      <div class="col-md-10">
        <div class="card-body">
          <h5 class="card-title h3">${title}</h5>
          <p class="card-text">
          ${details}
          </p>
          <div
            class="d-flex justify-content-between align-items-center p-0 gap-3"
          >
            <!-- profile section -->
            <div class="d-flex align-items-center gap-2">
              <img
                class="person-img"
                src="${author.img}"
                alt="person"
              />
              <div>
                <span class="d-block fw-semibold text-black">${author.name}</span>
                <span class="d-block text-secondary">${author.published_date}</span>
              </div>
            </div>
            <!-- view count section -->
            <div class="d-flex align-items-center py-3 gap-2">
              <i class="fa-regular fa-eye"></i>
              <span class="fs-5 fw-semibold">${total_view}M</span>
            </div>
            <!-- rating section -->
            <div>
              <i class="fa-regular fa-star"></i>
              <i class="fa-regular fa-star"></i>
              <i class="fa-regular fa-star"></i>
              <span class="fw-semibold ">${rating.number}</span>
            </div>
            <i id="showDetails" onclick="fetchMoreDetails('${_id}')" data-bs-toggle="modal" data-bs-target="#staticBackdrop" class="fa-solid fa-arrow-right fa-2x text-primary" ></i>
          </div>
        </div>
      </div>
    </div>
  </div>
    `;
    }
  );
};
// modal open
const fetchMoreDetails = async (news_id) => {
  const URL = `https://openapi.programming-hero.com/api/news/${news_id}`;
  const res = await fetch(URL);
  const data = await res.json();
  displayMoreDetails(data.data[0]);
};
const displayMoreDetails = ({ title, image_url, details }) => {
  modalTitle.innerText = title;
  modalImage.src = image_url;
  modalDescription.innerText = details;
};

FetchCatagory();
fetchNewsById("08");
