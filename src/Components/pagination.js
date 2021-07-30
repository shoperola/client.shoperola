import React from "react";

const Pagination = ({ postsPerPage, totalPosts, paginate, User }) => {
  const pageNumbers = [];

  for (let i = 1; i <= Math.ceil(totalPosts / postsPerPage); i++) {
    pageNumbers.push(i);
  }

  return (
    <div>
      <div className="row mt-20">
        <div className="col-sm-12 col-md-6 mb-20">
          <div
            className="dataTables_info"
            id="datatable_info"
            role="status"
            aria-live="polite"
          >
            Showing 1 to {postsPerPage} of {User.length} entries
          </div>
        </div>
        <div className="col-sm-12 col-md-6">
          <div className="dataTables_paginate paging_simple_numbers float-right">
            <ul className="pagination">
              {pageNumbers.map((number) => (
                <li className="paginate_button ">
                  <a
                    onClick={() => paginate(number)}
                    aria-controls="datatable"
                    data-dt-idx={0}
                    tabIndex={0}
                    className="page-link"
                  >
                    {number}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Pagination;
