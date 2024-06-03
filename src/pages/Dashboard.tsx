
const Dashboard = () => {
  return <div className="bg-white p-4 rounded-md flex gap-4 flex-col">
    <div className="grid grid-cols-4 gap-4">
      <article className="border p-4 rounded-md shadow-sm">
        <h2>Users</h2>
        <div>
          <p>Users : 10</p>
        </div>
      </article>
      <article className="border p-4 rounded-md shadow-sm">
        <h2>Orders</h2>
        <div>
          <p>Orsers : 10</p>
        </div>
      </article>
      <article className="border p-4 rounded-md shadow-sm">
        <h2>Revenue</h2>
        <div>
          <p>Revenue : $10</p>
        </div>
      </article>
      <article className="border p-4 rounded-md shadow-sm">
        <h2>Products</h2>
        <div>
          <p>Products : 10</p>
        </div>
      </article>
    </div>
    <div className="grid grid-cols-2 gap-4">
      <section className="border p-4 rounded-md shadow-sm">
        <h2>Recent Orders</h2>
        <ul className="flex flex-col gap-2">
          {
            [...Array(5)].map((val, index) => (
              <li key={index} className="p-2 border border-transparent border-b-black">{index}</li>
            ))
          }
        </ul>
      </section>
      <section className="border p-4 rounded-md shadow-sm">
        <h2>Recent Users</h2>
        <ul className="flex flex-col gap-2">
          {
            [...Array(5)].map((val, index) => (
              <li key={index} className="p-2 border border-transparent border-b-black">{index}</li>
            ))
          }
        </ul>
      </section>
    </div>
    <div className="grid grid-cols-2 gap-4">
      <section className="border p-4 rounded-md shadow-sm">
        <h2>Revenue graph</h2>
        <ul className="flex flex-col gap-2">
          {
            [...Array(5)].map((val, index) => (
              <li key={index} className="p-2 border border-transparent border-b-black">{index}</li>
            ))
          }
        </ul>
      </section>
      <section className="border p-4 rounded-md shadow-sm">
        <h2>Users graph</h2>
        <ul className="flex flex-col gap-2">
          {
            [...Array(5)].map((val, index) => (
              <li key={index} className="p-2 border border-transparent border-b-black">{index}</li>
            ))
          }
        </ul>
      </section>
    </div>
  </div>
};

export default Dashboard;
