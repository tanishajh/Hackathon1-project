import React from "react";

function OwnItems() {
  return (
    <div className="bg-gray-50 p-10">
      <div className="bg-white shadow-lg rounded-lg overflow-hidden p-2">
        <h1 className="text-sm text-primary sm:m-5 sm:mb-0">
          Your added items
        </h1>
        <p className=" text-lg ml-5">
          Add products to get reminder 2days before they get expired
        </p>
        <div className="overflow-x-auto my-2">
          <table className="table">
            <thead>
              <tr>
                <th>No.</th>
                <th>Name</th>
                <th>EXP</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <th>1</th>
                <td>Cy Ganderton</td>
                <td>Quality Control Specialist</td>
              </tr>
              <tr className="hover">
                <th>2</th>
                <td>Hart Hagerty</td>
                <td>Desktop Support Technician</td>
              </tr>
              <tr>
                <th>3</th>
                <td>Brice Swyre</td>
                <td>Tax Accountant</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default OwnItems;
