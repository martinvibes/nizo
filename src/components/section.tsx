import Image from "next/image";
import dashboard from "../../public/NIZO chat bot (website).png";
interface content {
  text: string;
}

function Section(props: content) {
  return (
    <section className="flex flex-col justify-center items-center gap-10">
      <h2 className="text-center font-medium text-2xl">{props.text}</h2>
      <div className="bg-[#1A1C24] rounded-md w-full grid place-content-center sm:p-10 lg:py-10 py-4 px-4 lg:px-0">
        <Image src={dashboard} priority alt="Nizo dashbord" />
      </div>
    </section>
  );
}
export default Section;
