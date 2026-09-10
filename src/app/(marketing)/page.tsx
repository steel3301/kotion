import { Footer } from "./_components/footer";
import { Heading } from "./_components/headings";
import { Heroes } from "./_components/heroes";

const MarketingPage = () => {
  return (
    <div className="min-h-[calc(100vh-5rem)] flex flex-col">
      <div className="flex flex-col items-center justify-center md:justify-start text-center gap-y-8 flex-1 px-6 pb-10">
        <Heading/>
        <Heroes/>
      </div>
      <Footer/>
    </div>
  );
}

export default MarketingPage