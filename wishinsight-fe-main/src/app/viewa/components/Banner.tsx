"use client";
import Image from "next/image";
import Link from "next/link";
import { useAppContext } from "../../store/AppContext";

const Banner = () => {
  const { state, dispatch } = useAppContext();
  return (
    <>
      <section className="banner-wrap flex flex-col ">
        <div className="flex items-center flex-col mb-10">
          <h1 className="text-7xl mb-2 mt-8">WishInsight </h1>
          <p className="text-1xl">Where Opportunities Come to Light</p>
        </div>

        <section className="flex w-full items-between justify-evenly flex-wrap">
          <div
            className="wrap-card-startpage box-shadow-card mb-3 text-center p-3 cursor-pointer flex flex-col justify-around"
            onClick={() => {
              dispatch({
                type: "OPEN_SIGN_UP_MODAL",
                payload: true,
              });
            }}
          >
            <div className="flex justify-center items-center flex-col">
              <Image
                className="ml-2 mb-2"
                src="/wishlist.svg"
                alt="wish-list"
                height={50}
                width={50}
              />
              <h2 className="text-2xl mb-1">I want something specific</h2>
            </div>

            <p>
              Looking for something unique? Create your own wishlist and let us
              help you find it!
            </p>
          </div>
          <Link href="/items">
            <div className="wrap-card-startpage box-shadow-card mb-3 text-center p-3 cursor-pointer flex  flex-col justify-around">
              <div className="flex justify-center items-center flex-col">
                <Image
                  className="ml-2 mb-2"
                  src="/money.svg"
                  alt="wish-list"
                  height={60}
                  width={60}
                />
                <h2 className="text-2xl mb-1">I want to make money</h2>
              </div>
              <p>
                Discover the latest trends and high-demand items to boost your
                earnings. Let us show you what&apos;s on demand!
              </p>
            </div>
          </Link>
        </section>
      </section>
    </>
  );
};

export default Banner;
