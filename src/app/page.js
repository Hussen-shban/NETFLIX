import Best from "./components/section/Best";
import Footer from "./components/section/Footer";
import Hero from "./components/section/Hero";
import Moves from "./components/section/Moves";
import Nav from "./components/section/Nav";
import Plans from "./details/[type]/[id]/Plans";

export default function Home() {
  return (
    <div>
      <Nav />
      <Hero />
      <Best />
      <Moves title={"Movies"} type={"movie"} />

      <Moves title={"TV Show"} type={"tv"} />
      <div className="bg-[#08100c] paddingx h-full flexcenter w-full ">
        <Plans />
      </div>
      <Footer/>

      


    </div>
  );
}
