// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles

(function (modules, entry, mainEntry, parcelRequireName, globalName) {
  /* eslint-disable no-undef */
  var globalObject =
    typeof globalThis !== 'undefined'
      ? globalThis
      : typeof self !== 'undefined'
      ? self
      : typeof window !== 'undefined'
      ? window
      : typeof global !== 'undefined'
      ? global
      : {};
  /* eslint-enable no-undef */

  // Save the require from previous bundle to this closure if any
  var previousRequire =
    typeof globalObject[parcelRequireName] === 'function' &&
    globalObject[parcelRequireName];

  var cache = previousRequire.cache || {};
  // Do not use `require` to prevent Webpack from trying to bundle this call
  var nodeRequire =
    typeof module !== 'undefined' &&
    typeof module.require === 'function' &&
    module.require.bind(module);

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire =
          typeof globalObject[parcelRequireName] === 'function' &&
          globalObject[parcelRequireName];
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        // Try the node require function if it exists.
        if (nodeRequire && typeof name === 'string') {
          return nodeRequire(name);
        }

        var err = new Error("Cannot find module '" + name + "'");
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;
      localRequire.cache = {};

      var module = (cache[name] = new newRequire.Module(name));

      modules[name][0].call(
        module.exports,
        localRequire,
        module,
        module.exports,
        this
      );
    }

    return cache[name].exports;

    function localRequire(x) {
      var res = localRequire.resolve(x);
      return res === false ? {} : newRequire(res);
    }

    function resolve(x) {
      var id = modules[name][1][x];
      return id != null ? id : x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;
  newRequire.register = function (id, exports) {
    modules[id] = [
      function (require, module) {
        module.exports = exports;
      },
      {},
    ];
  };

  Object.defineProperty(newRequire, 'root', {
    get: function () {
      return globalObject[parcelRequireName];
    },
  });

  globalObject[parcelRequireName] = newRequire;

  for (var i = 0; i < entry.length; i++) {
    newRequire(entry[i]);
  }

  if (mainEntry) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(mainEntry);

    // CommonJS
    if (typeof exports === 'object' && typeof module !== 'undefined') {
      module.exports = mainExports;

      // RequireJS
    } else if (typeof define === 'function' && define.amd) {
      define(function () {
        return mainExports;
      });

      // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  }
})({"4uyBp":[function(require,module,exports) {
/* eslint-disable */ var _leaflet = require("./leaflet");
var _login = require("./login");
var _updateSettings = require("./updateSettings");
var _resizeImageJs = require("./resizeImage.js");
var _signup = require("./signup");
var _stripe = require("./stripe");
// DOM ELEMENTS
const mapbox = document.getElementById("map");
const loginForm = document.getElementById("form--login");
const logOutBtn = document.querySelector(".nav__el--logout");
const userDataForm = document.getElementById("form--update");
const userPasswordForm = document.getElementById("form--password");
const pfpUploadInput = document.getElementById("photo");
const formSignUp = document.getElementById("form--signup");
const bookBtn = document.getElementById("book-tour");
// DELEGATION
if (mapbox) {
    const locations = JSON.parse(mapbox.dataset.locations);
    (0, _leaflet.displayMap)(locations);
}
if (loginForm) loginForm.addEventListener("submit", (e)=>{
    e.preventDefault();
    // Log in form values
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
    (0, _login.login)(email, password);
});
if (logOutBtn) logOutBtn.addEventListener("click", (0, _login.logout));
if (userDataForm) {
    pfpUploadInput.addEventListener("change", async (e)=>{
        const inputPic = pfpUploadInput.files[0];
        if (inputPic) {
            const userPhotoElement = document.querySelector(".form__user-photo");
            (0, _resizeImageJs.resizeImage)(inputPic, 500, 500, userPhotoElement);
        }
    });
    userDataForm.addEventListener("submit", async (e)=>{
        e.preventDefault();
        const form = new FormData();
        form.append("name", document.getElementById("name").value);
        form.append("email", document.getElementById("email").value);
        form.append("photo", document.getElementById("photo").files[0]);
        console.log(form);
        await (0, _updateSettings.updateSettings)(form, "data");
    });
}
if (userPasswordForm) userPasswordForm.addEventListener("submit", async (e)=>{
    e.preventDefault();
    document.querySelector(".btn--save-password").textContent = "Updating...";
    const passwordCurrent = document.getElementById("password-current").value;
    const password = document.getElementById("password").value;
    const passwordConfirm = document.getElementById("password-confirm").value;
    await (0, _updateSettings.updateSettings)({
        passwordCurrent,
        password,
        passwordConfirm
    }, "password");
    document.querySelector(".btn--save-password").textContent = "Save password";
    document.getElementById("password-current").value = "";
    document.getElementById("password").value = "";
    document.getElementById("password-confirm").value = "";
});
if (formSignUp) formSignUp.addEventListener("submit", (e)=>{
    e.preventDefault();
    const firstname = document.getElementById("firstname").value;
    const lastname = document.getElementById("lastname").value;
    const name = firstname + " " + lastname;
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
    const passwordConfirm = document.getElementById("password-confirm").value;
    (0, _signup.signup)(name, email, password, passwordConfirm);
});
if (bookBtn) bookBtn.addEventListener("click", (e)=>{
    e.target.textContent = "Processing...";
    const { tourId  } = e.target.dataset;
    (0, _stripe.bookTour)(tourId);
});

},{"./leaflet":"58ZVV","./login":"qZEOz","./updateSettings":"28JcJ","./resizeImage.js":"8zOTK","./signup":"cFVRQ","./stripe":"hu9K2"}],"58ZVV":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "displayMap", ()=>displayMap);
const displayMap = (locations)=>{
    const map = L.map("map", {
        zoomControl: false
    });
    // Add a tile layer to add to our map
    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(map);
    // Create icon using the image provided by Jonas
    var greenIcon = L.icon({
        iconUrl: "/img/pin.png",
        iconSize: [
            32,
            40
        ],
        iconAnchor: [
            16,
            40
        ],
        popupAnchor: [
            0,
            -50
        ]
    });
    // Add locations to the map
    const points = [];
    locations.forEach((loc)=>{
        // Create points
        points.push([
            loc.coordinates[1],
            loc.coordinates[0]
        ]);
        // Add markers
        L.marker([
            loc.coordinates[1],
            loc.coordinates[0]
        ], {
            icon: greenIcon
        }).addTo(map)// Add popup
        .bindPopup(`<p>Day ${loc.day}: ${loc.description}</p>`, {
            autoClose: false,
            className: "mapPopup"
        }).openPopup();
    });
    // Set map bounds to include current location
    const bounds = L.latLngBounds(points).pad(0.5);
    map.fitBounds(bounds);
    // Disable scroll on map
    map.scrollWheelZoom.disable();
};

},{"@parcel/transformer-js/src/esmodule-helpers.js":"5Birt"}],"5Birt":[function(require,module,exports) {
exports.interopDefault = function(a) {
    return a && a.__esModule ? a : {
        default: a
    };
};
exports.defineInteropFlag = function(a) {
    Object.defineProperty(a, "__esModule", {
        value: true
    });
};
exports.exportAll = function(source, dest) {
    Object.keys(source).forEach(function(key) {
        if (key === "default" || key === "__esModule" || dest.hasOwnProperty(key)) return;
        Object.defineProperty(dest, key, {
            enumerable: true,
            get: function() {
                return source[key];
            }
        });
    });
    return dest;
};
exports.export = function(dest, destName, get) {
    Object.defineProperty(dest, destName, {
        enumerable: true,
        get: get
    });
};

},{}],"qZEOz":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "login", ()=>login);
parcelHelpers.export(exports, "logout", ()=>logout);
/* eslint-disable */ // import axios from 'axios';
var _alerts = require("./alerts");
const login = async (email, password)=>{
    try {
        const res = await axios({
            method: "POST",
            url: "/api/v1/users/login",
            data: {
                email,
                password
            }
        });
        if (res.data.status === "success") {
            (0, _alerts.showAlert)("success", "Logged in successfully!");
            window.setTimeout(()=>{
                location.assign("/");
            }, 1500);
        }
    } catch (err) {
        (0, _alerts.showAlert)("error", err.response.data.message);
    }
};
const logout = async ()=>{
    try {
        // console.log('in');
        const res = await axios({
            method: "GET",
            url: "/api/v1/users/logout"
        });
        if (res.data.status === "success") window.setTimeout(()=>{
            location.assign("/");
        }, 1500);
    } catch (err) {
        (0, _alerts.showAlert)("error", "Error logging out! Try again.");
    }
};

},{"./alerts":"j4hQk","@parcel/transformer-js/src/esmodule-helpers.js":"5Birt"}],"j4hQk":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "hideAlert", ()=>hideAlert);
parcelHelpers.export(exports, "showAlert", ()=>showAlert);
const hideAlert = ()=>{
    const el = document.querySelector(".alert");
    if (el) el.parentElement.removeChild(el);
};
const showAlert = (type, msg)=>{
    hideAlert();
    const markup = `<div class="alert alert--${type}">${msg}</div>`;
    document.querySelector("body").insertAdjacentHTML("afterbegin", markup);
    window.setTimeout(hideAlert, 5000);
};

},{"@parcel/transformer-js/src/esmodule-helpers.js":"5Birt"}],"28JcJ":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "updateSettings", ()=>updateSettings);
/* eslint-disable */ // update data
var _alerts = require("./alerts");
const updateSettings = async (data, type)=>{
    try {
        const url = type === "password" ? "/api/v1/users/updateMyPassword" : "/api/v1/users/updateMe";
        const res = await axios({
            method: "PATCH",
            url,
            data
        });
        if (res.data.status === "success") (0, _alerts.showAlert)("success", `${type.toUpperCase()} setting successfully!`);
    } catch (err) {
        console.log(err);
        (0, _alerts.showAlert)("error", err.response.data.message);
    }
};

},{"./alerts":"j4hQk","@parcel/transformer-js/src/esmodule-helpers.js":"5Birt"}],"8zOTK":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "resizeImage", ()=>resizeImage);
const resizeImage = (image, targetWidth, targetHeight, targetElement)=>{
    let data;
    const filerdr = new FileReader();
    filerdr.onload = (evt)=>{
        const img = new Image();
        img.onload = ()=>{
            const canvas = document.createElement("canvas");
            const ctx = canvas.getContext("2d");
            canvas.width = targetWidth;
            canvas.height = targetHeight;
            let startWidth;
            let startHeight;
            let width;
            let height;
            if (img.height > img.width) {
                startWidth = 0;
                startHeight = (img.height - img.width) / 2;
                width = img.width;
                height = img.width * (targetHeight / targetWidth);
            } else {
                startWidth = (img.width - img.height) / 2;
                startHeight = 0;
                width = img.height * (targetWidth / targetHeight);
                height = img.height;
            }
            ctx.drawImage(img, startWidth, startHeight, width, height, 0, 0, targetWidth, targetHeight // Result height
            );
            data = canvas.toDataURL("image/jpeg");
            if (targetElement) targetElement.src = data;
        };
        img.src = evt.target.result;
    };
    filerdr.readAsDataURL(image);
    return data;
};

},{"@parcel/transformer-js/src/esmodule-helpers.js":"5Birt"}],"cFVRQ":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "signup", ()=>signup);
/* eslint-disable */ var _alerts = require("./alerts");
const signup = async (name, email, password, passwordConfirm)=>{
    try {
        const res = await axios({
            method: "POST",
            url: "/api/v1/users/signup",
            data: {
                name,
                email,
                password,
                passwordConfirm
            }
        });
        if (res.data.status === "success") {
            (0, _alerts.showAlert)("success", "Account created successfully!");
            window.setTimeout(()=>{
                location.assign("/");
            }, 1500);
        }
    } catch (err) {
        (0, _alerts.showAlert)("error", err.response.data.message);
    }
};

},{"@parcel/transformer-js/src/esmodule-helpers.js":"5Birt","./alerts":"j4hQk"}],"hu9K2":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "bookTour", ()=>bookTour);
/* eslint-disable */ var _alerts = require("./alerts");
const stripe = Stripe("pk_test_51Lg4wfIGwHIlOnnnUTzazEz6gRwdCEQwkogKTQSfQBHO6EB72NBzV5QChjmCS1CTANLcx7Pd1AApPFFWljgVxyKQ00K1ss2Wn9");
const bookTour = async (tourId)=>{
    try {
        // 1) get checkout session from API
        const session = await axios(`/api/v1/bookings/checkout-session/${tourId}`);
        console.log(session);
        // 2) create checkout from + charge credit card
        await stripe.redirectToCheckout({
            sessionId: session.data.session.id
        });
    } catch (err) {
        console.log(err);
        (0, _alerts.showAlert)("error", err);
    }
};

},{"@parcel/transformer-js/src/esmodule-helpers.js":"5Birt","./alerts":"j4hQk"}]},["4uyBp"], "4uyBp", "parcelRequire11c7")

//# sourceMappingURL=index.js.map
