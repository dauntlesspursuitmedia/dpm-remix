import { PortableText } from "@portabletext/react";
import { ServiceDoc } from "types/service";
import { components } from "~/lib/portableTextComponents";


export const ServiceCard = ({card}: {card: ServiceDoc}) => {
	return (
    <div className="max-w-max w-full p-8 bg-gray-200 border-[1px] shadow-md">
      <h3 className=" m-0 mb-4 break-words">{card?.title}</h3>
      <PortableText value={card?.description || []} components={components} />
    </div>
  );
}
