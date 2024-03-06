$(document).ready(function () {
  var currentPage = 1;
  var totalItems = 49 // Change this to the total number of items
  var selectOptions = [5, 7, 10, 40, 50]; //Change this to your desired items per page.
  var itemsPerPage = selectOptions[0];
  var totalPages = Math.ceil(totalItems / itemsPerPage);

  var selectionContent = [];
  selectOptions.forEach(option => {
    selectionContent.push(`<option value="${option}">${option}</option>`);
  });

  $("#pg-select").html(selectionContent.join(""));

  $("#pg-results").text(`Results: ${totalItems}`);

  function updatePagination() {
    $(".pg-pagination").html("");
    $(".pg-items").html("");

    if (totalPages <= 3) {
      for (var i = 1; i <= totalPages; i++) {
        $(".pg-pagination").append('<a title="' + i + '" href="#" class="' + (i === currentPage ? 'active' : '') + '">' + i + '</a>');
      }
    } else {
      //Un comment if you want the first or previous not be shown in this condition.
      //if (currentPage > 1) {
      $(".pg-pagination").append('<a title="First" href="#" class="' + (currentPage === 1 ? 'disabled' : '') + '"><<</a>');
      $(".pg-pagination").append('<a title="Previous" href="#" class="' + (currentPage === 1 ? 'disabled' : '') + '"><</a>');
      //}

      if (currentPage === 1) {
        $(".pg-pagination").append('<a title="1" href="#" class="active">1</a>');
        $(".pg-pagination").append('<a title="2" href="#">2</a>');
        $(".pg-pagination").append('<a title="3" href="#">3</a>');
        if (totalPages > 3) {
          $(".pg-pagination").append('<span>...</span>');
        }
      } else if (currentPage === totalPages) {
        if (currentPage > 2) {
          $(".pg-pagination").append('<span>...</span>');
        }
        $(".pg-pagination").append('<a title="' + (totalPages - 2) + '" href="#">' + (totalPages - 2) + '</a>');
        $(".pg-pagination").append('<a title="' + (totalPages - 1) + '" href="#">' + (totalPages - 1) + '</a>');
        $(".pg-pagination").append('<a title="' + totalPages + '" href="#" class="active">' + totalPages + '</a>');
      } else {
        if (currentPage > 2) {
          $(".pg-pagination").append('<span>...</span>');
        }
        $(".pg-pagination").append('<a title="' + (currentPage - 1) + '" href="#">' + (currentPage - 1) + '</a>');
        $(".pg-pagination").append('<a title="' + currentPage + '" href="#" class="active">' + currentPage + '</a>');
        $(".pg-pagination").append('<a title="' + (currentPage + 1) + '" href="#">' + (currentPage + 1) + '</a>');

        if (totalPages > currentPage + 1) {
          $(".pg-pagination").append('<span>...</span>');
        }
      }
      //Un comment if you want the last or next not be shown in this condition.
      //if (currentPage < totalPages) {
      $(".pg-pagination").append('<a title="Next" href="#" class="' + (currentPage === totalPages ? 'disabled' : '') + '">></a>');
      $(".pg-pagination").append('<a title="Last" href="#" class="' + (currentPage === totalPages ? 'disabled' : '') + '">>></a>');
      //}
    }
    $("#pg-pages").text(`Pages: ${totalPages}`);
    $(".pg-items").html(`Handle to show items from ${(currentPage - 1) * itemsPerPage + 1} to ${currentPage != totalPages ? currentPage * (itemsPerPage) : totalItems}`);

  }

  updatePagination();

  $(document).on("click", ".pg-pagination a", function (e) {
    e.preventDefault();

    var title = $(this).prop("title");

    if (title === "First") {
      currentPage = 1;
    } else if (title === "Last") {
      currentPage = totalPages;
    } else if (title === "Previous") {
      currentPage = Math.max(1, currentPage - 1);
    } else if (title === "Next") {
      currentPage = Math.min(totalPages, currentPage + 1);
    } else {
      currentPage = parseInt(title);
    }
    updatePagination();
  });

  $("#pg-select").on("change", function (e) {
    // Updates itemsPerPage based on the selected option
    itemsPerPage = parseInt($("#pg-select").val());

    // Recalculate totalPages based on the updated itemsPerPage
    totalPages = Math.ceil(totalItems / itemsPerPage);

    if (itemsPerPage * currentPage > totalItems) {
      currentPage = totalPages;
    }

    updatePagination();
  });

});