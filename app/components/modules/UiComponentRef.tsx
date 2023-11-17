import groq from "groq";
import React, { Suspense } from "react";
import { z } from "zod";
import { BrandList } from "../widgets/BrandList";


export const uiComponentRefPropsZ = z.object({
  _type: z.literal("uiComponentRef"),
  name: z
    .enum([
      "brandList",
      "contactForm",
      "newsletterSignup",
      "serviceList",
      "projectList",
      "proposalRequestForm",
			"calBooking",
    ])
    .default("contactForm"),
  _key: z.string(),
});

export const UiComponentQuery = groq`
	_type == "uiComponentRef" => {
		_type,
		name,
		_key
	}
`;
export type UIComponentProps = z.infer<typeof uiComponentRefPropsZ>;

const uiComponentLookup = {
  brandList: BrandList ,
  contactForm: React.lazy(async () => {
    const { ContactForm: Component } = await import(
      "~/components/widgets/ContactForm"
    );
    return { default: Component };
  }),
  calBooking: React.lazy(async () => {
    const { CalBookingWidget: Component } = await import(
      "~/components/widgets/CalBookingWidget"
    );
    return { default: Component };
  }),
  newsletterSignup: React.lazy(async () => {
    const { NewsletterSignup: Component } = await import(
      "~/components/widgets/NewsletterSignup"
    );
    return {
      default: Component,
    };
  }),
  serviceList: React.lazy(async () => {
    const { ServiceList: Component } = await import(
      "~/components/widgets/ServiceList"
    );
    return {
      default: Component,
    };
  }),
  projectList: React.lazy(async () => {
    const { ProjectListing: Component } = await import(
      "~/components/widgets/ProjectList"
    );
    return {
      default: Component,
    };
  }),
  proposalRequestForm: React.lazy(async () => {
    const { ProposalRequestForm: Component } = await import(
      "~/components/widgets/ProposalRequestForm"
    );

    return {
      default: Component,
    };
  }),
} as const;

export const UiComponentRef = (props: UIComponentProps) => {
  const Component = uiComponentLookup[props.name];
  return (
    <div>
      <Suspense>
        <Component fallback={<p>Loading component...</p>} />
      </Suspense>
    </div>
  );
};
