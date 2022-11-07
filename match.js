window.onload = function () {
  var groot = document.getElementById("chair");
  var data = {
    terms: [
      {
        index: 0,
        text: "كرسي",
      },
      {
        index: 1,
        text: "الطاولة",
      },
      {
        index: 2,
        text: "غرفة",
      },
      {
        index: 3,
        text: "مطبخ",
      },
      {
        index: 4,
        text: "شقة",
      },
      {
        index: 5,
        text: "حمام",
      },
    ],
    definitions: [
      {
        index: 0,
        Image: "chair",
      },
      {
        index: 1,
        text: "image",
      },
      {
        index: 2,
        text: "image",
      },
      {
        index: 3,
        text: "image",
      },
      {
        index: 4,
        text: "image",
      },
      {
        index: 5,
        text: "image",
      },
    ],

    pairs: {
      0: 0,
      1: 1,
      2: 2,
      3: 3,
      4: 4,
      5: 5,
    },
  };

  var selectedTerm = null, //to make sure none is selected onload
    selectedDef = null,
    termsContainer = document.querySelector("#terms"), //list of terms
    defsContainer = document.querySelector("#defs"); //list of definitions

  //This function takes two arguments, that is one term and one def to compare if they match. It returns True or False after compairing values of the "pairs" object property.
  function isMatch(termIndex, defIndex) {
    return data.pairs[termIndex] === defIndex;
  }

  //This function adds HTML elements and content to the specified container (UL).
  function createListHTML(list, container) {
    container.innerHTML = ""; //first, clean up any existing LI elements
    for (var i = 0; i < 6; i++) {
      container.innerHTML =
        container.innerHTML +
        "<li data-index='" +
        list[i]["index"] +
        "'>" +
        "<span>" +
        list[i]["text"] +
        "</span>" +
        "</li>";
      //OR shorter version: container.innerHTML += "<li data-index='" + list[i]["index"] + "'>" + list[i]["text"] + "</li>";
    }
  }

  createListHTML(data.terms, termsContainer);
  createListHTML(data.definitions, defsContainer);

  termsContainer.addEventListener("click", function (e) {
    var target = e.target.parentNode;
    if (target.className === "score") return;
    var termIndex = Number(target.getAttribute("data-index"));

    if (selectedTerm !== null && selectedTerm !== termIndex) {
      termsContainer
        .querySelector("li[data-index='" + selectedTerm + "']")
        .removeAttribute("data-selected");
    }

    if (target.hasAttribute("data-selected")) {
      target.removeAttribute("data-selected");
      selectedTerm = null;
    } else {
      target.setAttribute("data-selected", true);
      selectedTerm = termIndex;
    }

    if (selectedTerm !== null && selectedDef !== null) {
      var term = document.querySelector(
        "#terms [data-index='" + selectedTerm + "']"
      );
      var def = document.querySelector(
        "#defs [data-index='" + selectedDef + "']"
      );
      if (isMatch(selectedTerm, selectedDef)) {
        term.className = "score";
        def.className = "score";
      }

      selectedTerm = null;
      selectedDef = null;
      term.removeAttribute("data-selected");
      def.removeAttribute("data-selected");
    }
  });

  defsContainer.addEventListener("click", function (e) {
    var target = e.target.parentNode;
    if (target.className === "score") return;
    var defIndex = Number(target.getAttribute("data-index"));

    if (selectedDef !== null && selectedDef !== defIndex) {
      defsContainer
        .querySelector("li[data-index='" + selectedDef + "']")
        .removeAttribute("data-selected");
    }

    if (target.hasAttribute("data-selected"))
      target.removeAttribute("data-selected");
    else target.setAttribute("data-selected", true);
    selectedDef = Number(target.getAttribute("data-index"));
    if (selectedTerm !== null && selectedDef !== null) {
      //var term = document.querySelector("#terms [data-index='"+selectedTerm+"']");
      var term = termsContainer.querySelector(
        "[data-index='" + selectedTerm + "']"
      );
      //var def = document.querySelector("#defs [data-index='"+selectedDef+"']");
      var def = defsContainer.querySelector(
        "[data-index='" + selectedDef + "']"
      );
      if (isMatch(selectedTerm, selectedDef)) {
        term.className = "score";
        def.className = "score";
      }
      selectedTerm = null;
      selectedDef = null;
      term.removeAttribute("data-selected");
      def.removeAttribute("data-selected");
    }
  });

  function reset() {
    var resetTerms = termsContainer.querySelectorAll("li");
    var resetDefs = defsContainer.querySelectorAll("li");
    for (var i = 0; i < resetTerms.length; i++) {
      resetTerms[i].removeAttribute("class", "score");
      resetTerms[i].removeAttribute("data-selected");
    }
    for (i = 0; i < resetDefs.length; i++) {
      resetDefs[i].removeAttribute("class", "score");
      resetDefs[i].removeAttribute("data-selected");
    }

    selectedTerm = null;
    selectedDef = null;
  }

  function shuffle() {
    randomSort(data.terms);
    randomSort(data.definitions);
    createListHTML(data.terms, termsContainer);
    createListHTML(data.definitions, defsContainer);
  }

  function randomSort(array) {
    var currentIndex = array.length,
      temporaryValue,
      randomIndex;

    // While there remain elements to shuffle...
    while (currentIndex !== 0) {
      // Pick a remaining element...
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex -= 1;

      // And swap it with the current element. SWAP
      temporaryValue = array[currentIndex];
      array[currentIndex] = array[randomIndex];
      array[randomIndex] = temporaryValue;
    }

    return array;
  }

  shuffle();
  document.querySelector("button").addEventListener("click", function () {
    reset();
    termsContainer.setAttribute("class", "fadeOut");
    defsContainer.setAttribute("class", "fadeOut");
    setTimeout(function () {
      shuffle();
      termsContainer.removeAttribute("class", "fadeOut");
      defsContainer.removeAttribute("class", "fadeOut");
    }, 450);
    //shuffle();
  });
};
