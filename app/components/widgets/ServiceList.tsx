import { useFetcher } from "@remix-run/react";
import { useEffect } from "react";
import { ServiceDoc } from "types/service";
import { JsonPreview } from "../JsonPreview";
import { ServiceCard } from "../ServiceCard";

export const ServiceList = () => {

	const serviceFetcher = useFetcher<{ services: ServiceDoc[] }>();

  useEffect(() => {
    if (serviceFetcher.state === "idle" && serviceFetcher.data == null) {
      serviceFetcher.load("/resources/services");
    }
  }, [serviceFetcher]);

  const services = serviceFetcher.data?.services ?? [];
	return (
		<section className="container @container mx-auto">
			<div className="@4xl:grid space-y-8 @4xl:space-y-0 @4xl:mb-0 px-4 @4xl:grid-cols-2 gap-4 @4xl:gap-8 w-full">
				{services.map((service) => {
					return (
						<ServiceCard key={service._id} card={service} />
					)
				})}
			</div>

		</section>
	)
}
