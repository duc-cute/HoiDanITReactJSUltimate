/** @format */

const TableUser = ({
  listUser,
  handleClickUpdateUser,
  handleClickDeleteUser,
}) => {
  return (
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
  );
};

export default TableUser;
