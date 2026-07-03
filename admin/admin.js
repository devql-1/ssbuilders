(function() {
  var STORAGE_KEY = 'ssbuilders_content';
  var DEFAULTS = {
    heroTitle: "Jaipur's Most Trusted Real Estate & Property Experts",
    heroSubtitle: "Seth Sanwariya Builders - Building Dreams Into Reality with premium residential and commercial properties across Rajasthan.",
    aboutTitle: "About Us",
    aboutDesc: "We are Jaipur's most trusted real estate builders.",
    address: "1st Floor, Gangaram Nagar, New Aatish Market, Shanthi Nagar, Mansarovar, Jaipur, Rajasthan 302020",
    phone: "+91-141-234-5678",
    email: "info@ssbuilders.in",
    hours: "Monday - Saturday: 10:00 AM - 7:00 PM",
    properties: [
      {title: "Luxury 3BHK Apartment", location: "Malviya Nagar, Jaipur", price: "\u20B91.25 Crore", type: "Apartment", beds: 3, baths: 2, area: 1800, image: "images/img_1.jpg", description: "Premium 3BHK in heart of Malviya Nagar with modern amenities and clubhouse."},
      {title: "Independent Villa", location: "Vaishali Nagar, Jaipur", price: "\u20B91.08 Crore", type: "Villa", beds: 3, baths: 3, area: 2200, image: "images/img_2.jpg", description: "Spacious villa with private garden and gated community security."},
      {title: "2BHK Near Central Park", location: "C-Scheme, Jaipur", price: "\u20B995 Lakh", type: "Apartment", beds: 2, baths: 2, area: 1200, image: "images/img_3.jpg", description: "Well-ventilated 2BHK near Central Park with excellent connectivity."},
      {title: "4BHK Penthouse", location: "Mansarovar, Jaipur", price: "\u20B91.42 Crore", type: "Apartment", beds: 4, baths: 4, area: 2400, image: "images/img_4.jpg", description: "Luxury penthouse with panoramic city views and smart home features."},
      {title: "Commercial Space", location: "Jhotwara, Jaipur", price: "\u20B972 Lakh", type: "Commercial", beds: 0, baths: 2, area: 900, image: "images/img_5.jpg", description: "Prime commercial space on main road with dedicated parking."},
      {title: "Residential Plot", location: "Ajmer Road, Jaipur", price: "\u20B985 Lakh", type: "Plot", beds: 0, baths: 0, area: 1500, image: "images/img_6.jpg", description: "Gated community plot with clear title and metro corridor nearby."}
    ]
  };
  function load() { try { return JSON.parse(localStorage.getItem(STORAGE_KEY)) || DEFAULTS; } catch (e) { return DEFAULTS; } }
  function save(d) { localStorage.setItem(STORAGE_KEY, JSON.stringify(d)); }
  var data = load();
  var form = document.getElementById("adminForm");
  ["heroTitle","heroSubtitle","aboutTitle","aboutDesc","address","phone","email","hours"].forEach(function(f) {
    var el = form.querySelector('[name="'+f+'"]');
    if (el && data[f] !== undefined) el.value = data[f];
  });
  function esc(s) { var d = document.createElement("div"); d.appendChild(document.createTextNode(s)); return d.innerHTML; }
  function renderProperties() {
    var list = document.getElementById("propertiesList");
    list.innerHTML = "";
    (data.properties || []).forEach(function(p, i) {
      var card = document.createElement("div");
      card.className = "card";
      card.innerHTML = '<div class="card-body"><h6>Property #'+(i+1)+'</h6><div class="row g-2">' +
        '<div class="col-md-6"><input class="form-control" data-prop="title" value="'+esc(p.title)+'" placeholder="Title"></div>' +
        '<div class="col-md-6"><input class="form-control" data-prop="location" value="'+esc(p.location)+'" placeholder="Location"></div>' +
        '<div class="col-md-3"><input class="form-control" data-prop="price" value="'+esc(p.price)+'" placeholder="Price"></div>' +
        '<div class="col-md-3"><input class="form-control" data-prop="type" value="'+esc(p.type)+'" placeholder="Type"></div>' +
        '<div class="col-md-2"><input class="form-control" data-prop="beds" type="number" value="'+p.beds+'" placeholder="Beds"></div>' +
        '<div class="col-md-2"><input class="form-control" data-prop="baths" type="number" value="'+p.baths+'" placeholder="Baths"></div>' +
        '<div class="col-md-2"><input class="form-control" data-prop="area" type="number" value="'+p.area+'" placeholder="Area"></div>' +
        '<div class="col-12"><input class="form-control" data-prop="image" value="'+esc(p.image)+'" placeholder="Image URL (paste link)"></div>' +
        '<div class="col-12"><textarea class="form-control" data-prop="description" rows="2" placeholder="Description">'+esc(p.description)+'</textarea></div>' +
        '<div class="col-12 text-end"><button type="button" class="btn btn-sm btn-outline-danger remove-prop">Remove</button></div>' +
        '</div></div>';
      list.appendChild(card);
    });
  }
  document.getElementById("propertiesList").addEventListener("click", function(e) { if (e.target.classList.contains("remove-prop")) e.target.closest(".card").remove(); });
  document.getElementById("addPropertyBtn").addEventListener("click", function() { data.properties = data.properties || []; data.properties.push({title:"",location:"",price:"",type:"Apartment",beds:0,baths:0,area:0,image:"",description:""}); renderProperties(); });
  document.getElementById("adminTabs").addEventListener("click", function(e) {
    if (!e.target.matches("button[data-tab]")) return;
    document.querySelectorAll("#adminTabs .nav-link").forEach(function(b) { b.classList.remove("active"); });
    e.target.classList.add("active");
    document.querySelectorAll(".section-block").forEach(function(b) { b.classList.remove("active"); });
    var sec = document.querySelector('.section-block[data-section="'+e.target.dataset.tab+'"]');
    if (sec) sec.classList.add("active");
  });
  form.addEventListener("submit", function(e) {
    e.preventDefault();
    ["heroTitle","heroSubtitle","aboutTitle","aboutDesc","address","phone","email","hours"].forEach(function(f) {
      var el = form.querySelector('[name="'+f+'"]');
      if (el) data[f] = el.value;
    });
    data.properties = [];
    document.querySelectorAll("#propertiesList .card").forEach(function(card) {
      var obj = {};
      card.querySelectorAll("[data-prop]").forEach(function(input) { obj[input.dataset.prop] = input.value; });
      data.properties.push(obj);
    });
    save(data);
    var status = document.getElementById("status");
    status.innerHTML = '<div class="alert alert-success mb-0">Saved to browser storage.</div>';
    setTimeout(function() { status.innerHTML = ""; }, 3000);
  });
  document.getElementById("resetBtn").addEventListener("click", function() {
    if (confirm("Reset all content to defaults?")) { data = JSON.parse(JSON.stringify(DEFAULTS)); save(data); location.reload(); }
  });
  document.getElementById("exportBtn").addEventListener("click", function() {
    var blob = new Blob([JSON.stringify(data, null, 2)], {type: "application/json"});
    var a = document.createElement("a");
    a.href = URL.createObjectURL(blob);
    a.download = "ssbuilders-content.json";
    a.click();
  });
  document.getElementById("importInput").addEventListener("change", function(e) {
    var file = e.target.files[0];
    if (!file) return;
    var reader = new FileReader();
    reader.onload = function(ev) { try { var imported = JSON.parse(ev.target.result); if (typeof imported === "object") { data = imported; save(data); location.reload(); } } catch (err) { document.getElementById("status").innerHTML = '<div class="alert alert-danger mb-0">Invalid JSON file</div>'; } };
    reader.readAsText(file);
  });
  renderProperties();
})();
// v3
