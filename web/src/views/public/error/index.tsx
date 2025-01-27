import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

import { Meta } from "../../../shared/components/head";

export const Error404 = React.memo(() => {
  const [handleTime, setTIme] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      setTIme(true);
    }, 7000);
  }, []);

  return (
    <div className="min-w-full container grid place-items-center">
      <Meta
        title="Página não escontrada"
        description="Página não escontrada"
        robots="noindex, nofollow"
        news="noindex, nofollow"
        google="noindex, nofollow"
        url="/page-not-found"
      />

      {!handleTime && (
        <div className="w-full h-screen flex items-center justify-center bg-info">
          <p className="text-2xl text-center font-semibold text-white underline decoration-wavy">
            Carregando
          </p>
        </div>
      )}

      {handleTime && (
        <>
          <main
            role="main"
            className="w-full h-screen bg-orange-300 py-10 px-5 grid md:grid-cols-12 md:place-items-center"
          >
            <div className="col-span-12 w-full md:max-w-[820px] lg:max-w-[1024px] xl:max-w-[1280px]  px-5  flex flex-col items-center justify-center">
              <span className="text-5xl md:text-8xl text-info font-bold -rotate-12 text-center">
                <span className="font-thin text-white">
                  Er<span className="bg-dark pt-0 pt-1 px-2 text-white">r</span>
                  o
                </span>
                404
              </span>
              <div className="w-[90%] md:w-[60%] h-2 bg-dark mb-20 mt-3 md:mt-6"></div>
              <p className="text-white text-4xl mb-4 text-center">
                Algo errado não esta certo
              </p>
              <p className="text-white text-xl text-center">
                Volte para o{" "}
                <Link to="/">
                  <span className="bg-dark pt-0 pt-1 pb-1 px-2 text-secondary underline">
                    Início
                  </span>
                </Link>
              </p>
            </div>
          </main>
        </>
      )}
    </div>
  );
});
