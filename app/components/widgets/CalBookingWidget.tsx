import Cal, { getCalApi } from "@calcom/embed-react";
import { useEffect } from "react";
export const CalBookingWidget = () => {
  useEffect(() => {
    (async function () {
      const cal = await getCalApi();
      cal("ui", {
        styles: { branding: { brandColor: "#bc0d01" } },

        hideEventTypeDetails: false,
        layout: "month_view",
      });
    })();
  }, []);
  return (
    <div className="container px-4 mx-auto">
      <h4>Let's talk!</h4>
      <Cal
        calLink="dauntlesspursuitmedia/website-consultation"
        style={{ width: "100%", height: "100%", overflow: "scroll" }}
        config={{ layout: "month_view" }}
      />
    </div>
  );
};
