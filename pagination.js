$(document).ready(function () {
  var currentPage = 1;
  var totalPages = 10; // Change this to the total number of pages

  function updatePagination() {
    $(".pagination").html("");

    if (totalPages <= 3) {
      for (var i = 1; i <= totalPages; i++) {
        $(".pagination").append('<a title="' + i + '" href="#" class="' + (i === currentPage ? 'active' : '') + '">' + i + '</a>');
      }
    } else {

      //if (currentPage > 1) {
        $(".pagination").append('<a title="First" href="#" class="' + (currentPage === 1 ? 'disabled' : '') + '"><<</a>');
        $(".pagination").append('<a title="Previous" href="#"><</a>');
      //}

      if (currentPage === 1) {
        $(".pagination").append('<a title="1" href="#" class="active">1</a>');
        $(".pagination").append('<a title="2" href="#">2</a>');
        $(".pagination").append('<a title="3" href="#">3</a>');
        if (totalPages > 3) {
          $(".pagination").append('<span>...</span>');
        }
      } else if (currentPage === totalPages) {
        if (currentPage > 2) {
          $(".pagination").append('<span>...</span>');
        }
        $(".pagination").append('<a title="' + (totalPages - 2) + '" href="#">' + (totalPages - 2) + '</a>');
        $(".pagination").append('<a title="' + (totalPages - 1) + '" href="#">' + (totalPages - 1) + '</a>');
        $(".pagination").append('<a title="' + totalPages + '" href="#" class="active">' + totalPages + '</a>');
      } else {
        if (currentPage > 2) {
          $(".pagination").append('<span>...</span>');
        }
        $(".pagination").append('<a title="' + (currentPage - 1) + '" href="#">' + (currentPage - 1) + '</a>');
        $(".pagination").append('<a title="' + currentPage + '" href="#" class="active">' + currentPage + '</a>');
        $(".pagination").append('<a title="' + (currentPage + 1) + '" href="#">' + (currentPage + 1) + '</a>');
        if (totalPages > currentPage + 1) {
          $(".pagination").append('<span>...</span>');
        }
      }

      //if (currentPage < totalPages) {
        $(".pagination").append('<a title="Next" href="#">></a>');
        $(".pagination").append('<a title="Last" href="#" class="' + (currentPage === totalPages ? 'disabled' : '') + '">>></a>');
      //}

    }
  }

  updatePagination();

  $(document).on("click", ".pagination a", function (e) {
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
});
