/** @format */

import ReactPaginate from "react-paginate";

/** @format */

const TableUserPaginate = ({
  listUser,
  handleClickUpdateUser,
  handleClickDeleteUser,
  fetchListUsersWithPaginate,
  pageCount,
  currentPage,
  setCurrentPage,
}) => {
  // Invoke when user click to request another page.
  const handlePageClick = (event) => {
    fetchListUsersWithPaginate(+event.selected + 1);
    setCurrentPage(+event.selected + 1);
    console.log(`User requested page number ${event.selected}`);
  };

  return (
    <>
      <table className="table table-hover table-bordered">
        <thead>
          <tr>
            <th scope="col">No</th>
            <th scope="col">Email</th>
            <th scope="col">Password</th>
            <th scope="col">Role</th>
            <th scope="col">Action</th>
          </tr>
        </thead>
        <tbody>
          {listUser &&
            listUser.length > 0 &&
            listUser.map((user, index) => {
              return (
                <tr key={`table-user-${index}`}>
                  <th scope="row">{user.id}</th>
                  <td>{user.email}</td>
                  <td>{user.password}</td>
                  <td>{user.role}</td>
                  <td>
                    <button className="btn btn-primary">View</button>
                    <button
                      className="btn btn-warning mx-3"
                      onClick={() => handleClickUpdateUser(user)}
                    >
                      Update
                    </button>
                    <button
                      className="btn btn-danger"
                      onClick={() => handleClickDeleteUser(user)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              );
            })}
          {listUser && listUser.length === 0 && (
            <tr>
              <td colSpan={"4"} className="text-center">
                Không có người dùng nào được thêm
              </td>
            </tr>
          )}
        </tbody>
      </table>
      <div className="d-flex justify-content-center">
        <ReactPaginate
          nextLabel="Next >"
          onPageChange={handlePageClick}
          pageRangeDisplayed={3}
          marginPagesDisplayed={2}
          pageCount={pageCount}
          previousLabel="< Prev"
          pageClassName="page-item"
          pageLinkClassName="page-link"
          previousClassName="page-item"
          previousLinkClassName="page-link"
          nextClassName="page-item"
          nextLinkClassName="page-link"
          breakLabel="..."
          breakClassName="page-item"
          breakLinkClassName="page-link"
          containerClassName="pagination"
          activeClassName="active"
          renderOnZeroPageCount={null}
          forcePage={currentPage - 1}
        />
      </div>
    </>
  );
};

export default TableUserPaginate;
