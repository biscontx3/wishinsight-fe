import Banner from "./components/Banner";

const StartPage = () => {
  const sellingList = [
    {
      title: "View Demand Dashboard",
      description:
        "Explore the dashboard to see untapped market opportunities.",
    },
    {
      title: "Create a Profile",
      description: "Sign up and list everything you have to offer.",
    },
    {
      title: "Filter and Connect",
      description:
        "Filter the demand dashboard to find users with the best business fit and message them directly.",
    },
    {
      title: "Maximize Revenue",
      description:
        "Focus on high-demand items or stick to offers you enjoy providing.",
    },
    {
      title: "Close Deals",
      description:
        "Engage with interested customers and align on transaction details for mutual economic benefit.",
    },
  ];

  const demandList = [
    {
      title: "Make a Profile",
      description:
        "Sign up and create a profile to tell the world what you're interested in.",
    },
    {
      title: "Populate Your Wishlist",
      description: "Add items to your wishlist, specifying your desired price.",
    },
    {
      title: "Demand Dashboard",
      description:
        "Your wishlist information is aggregated and displayed on our demand dashboard.",
    },
    {
      title: "Direct Connections",
      description: "Providers see your wishlist and contact you directly.",
    },
    {
      title: "Choose Your Provider",
      description:
        "Select the provider that suits your needs best and align on transaction details for mutual economic benefit.",
    },
  ];

  return (
    <section className="flex min-h-screen flex-col items-center   mt-10">
      <Banner />

      <section className="w-full flex flex-col items-center py-10 bg-gray-100">
        <h1 className="text-4xl font-bold mb-10">How it works</h1>
        <div className="w-10/12 flex flex-wrap justify-around">
          <div className="works-wrap p-5 bg-white shadow-md rounded-lg m-4 max-w-md w-full">
            <h2 className="mb-2 text-3xl font-semibold">
              I want something specific
            </h2>
            <p className="mb-5 text-gray-700">
              It&apos;s all about what you want! Tell the world exactly what
              you&apos;re interested in and set your own price. This platform
              gives you, the customer, a new way to control and influence what
              providers offer.
            </p>
            {demandList.map((item, index) => (
              <div key={index} className="mb-4">
                <h3 className="text-xl font-semibold">{item.title}</h3>
                <p className="text-gray-600">{item.description}</p>
              </div>
            ))}
          </div>
          <div className="works-wrap p-5 bg-white shadow-md rounded-lg m-4 max-w-md w-full">
            <h2 className="mb-2 text-3xl font-semibold">
              Make money with what you already have!
            </h2>
            <p className="mb-5 text-gray-700">
              Gain insight into an untapped market, identify profitable leads
              and investment opportunities. This platform gives you, the
              provider, the greatest visibility of what consumers want and how
              much they want it in dollar terms.
            </p>
            {sellingList.map((item, index) => (
              <div key={index} className="mb-4">
                <h3 className="text-xl font-semibold">{item.title}</h3>
                <p className="text-gray-600">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </section>
  );
};

export default StartPage;
