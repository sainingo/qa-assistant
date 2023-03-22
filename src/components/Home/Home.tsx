import { Link } from "react-router-dom";
import Header from "../Header/Header";

const Home = () => {
  const menuItems = [
    {
      path: "/patient-search",
      src: "src/public/search.png",
      alt: "patient search",
      title: "Patient Search",
    },
    {
      path: "",
      src: "src/public/graph.jpeg",
      alt: "data dump",
      title: "Data Dump Upload",
    },
    {
      path: "",
      src: "",
      alt: "",
      title: "",
    },
    {
      path: "",
      src: "",
      alt: "",
      title: "",
    },
    {
      path: "",
      src: "",
      alt: "",
      title: "",
    },
    {
      path: "",
      src: "",
      alt: "",
      title: "",
    },
  ];
  const cardStyle =
    "rounded-md overflow-hidden shadow-lg bg-white h-56 hover:cursor-pointer transition duration-300 ease-in-out hover:scale-110";
  const textStyle = "text-center font-bold text-xl mt-6";

  return (
    <div className="md:h-screen">
      <Header shouldRenderSearchLink={false} />
      <div className="flex items-center justify-center bg-gray-50 lg:h-full pt-3">
        <div className="flex flex-col border-2 w-3/6 h-4/6 md:h-5/6 lg:h-4/6 rounded-md shadow-lg bg-gray-200">
          <div className="text-4xl text-center mt-6 font-bold text-blue-500">
            <h1>QA Assistant</h1>
          </div>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 mt-12 h-3/4 p-10 mt-2">
            {menuItems.map((menu, index) =>
              menu.src ? (
                <div className={cardStyle} key={index}>
                  <Link to={menu.path}>
                    <img
                      className="w-3/4 h-2/4 sm:ml-10 md:ml-8 lg:ml-7 mt-8"
                      src={menu.src}
                      alt={menu.alt}
                    ></img>
                    <h1 className={textStyle}>{menu.title}</h1>
                  </Link>
                </div>
              ) : (
                <div className={cardStyle} key={index}></div>
              )
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
