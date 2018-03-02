// function handleAuthorFormSubmit(event) {
//     event.preventDefault();
//     // Don't do anything if the name fields hasn't been filled out
//     if (!nameInput.val().trim().trim()) {
//       return;
//     }
//     // Calling the upsertAuthor function and passing in the value of the name input
//     upsertAuthor({
//       name: nameInput
//         .val()
//         .trim()
//     });
//   }

var categorySelect = $("#category");
getCategory();

function getCategory() {
  $.get("/api/category", renderCategoryList);
}

function renderCategoryList(data) {
  // if (!data.length) {
  //   window.location.href = "/";
  // }
  console.log(data)
  var rowsToAdd = [];
  for (var i = 0; i < data.length; i++) {
    rowsToAdd.push(createCategoryRow(data[i]));
  }
  categorySelect.empty();
  console.log(rowsToAdd);
  console.log(categorySelect);
  categorySelect.append(rowsToAdd);
  // categorySelect.val(authorId);
}


function createCategoryRow(Category) {
  var listOption = $("<option>");
  listOption.attr("value", Category.id);
  listOption.text(Category.Category);
  return listOption;
}



console.log("loaded")