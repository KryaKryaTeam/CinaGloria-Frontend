"use client";
import GridCard from "@/ui/component/gridCards/GridCard";
import InputWithDebounce from "@/ui/component/inputs/InputWithDebounce";

function Page() {
  return (
    <section>
      <InputWithDebounce
        className="text-white"
        placeholder="Meow!"
        debounceCallback={(ev) => {
          console.log(ev.target.value);
        }}
      ></InputWithDebounce>
      <GridCard name="Meow!"></GridCard>
    </section>
  );
}

export default Page;
