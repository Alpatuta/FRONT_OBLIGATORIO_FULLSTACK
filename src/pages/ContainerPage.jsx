import { Outlet } from "react-router";

const ContainerPage = () => {
  return (
    <div className="spa-root">
      <main className="spa-stage">
        <Outlet />
      </main>
    </div>
  );
};

export default ContainerPage;
