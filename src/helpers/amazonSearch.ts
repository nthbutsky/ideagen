enum EAmazonTags {
  AFFILIATE = "ideagenid-20",
  GET_IT_BY_TOMORROW = "p_90:8308922011",
  MALE = "p_n_gender_browse-bin:301386",
  FEMALE = "p_n_gender_browse-bin:301387",
}

const AMAZON_BASE_URL = "https://www.amazon.ca/";

// Amazon tags:
// s?k - query string
// rh - get it by tomorrow
// low-price - lowest price in a range
// high-price - highest price in a range
// tag - affiliate tag or others

export const handleAmazonSearch = (
  idea: string,
  lastMinuteGift: boolean,
  budget: string,
) => {
  const amazonUrl = `${AMAZON_BASE_URL}s?k=${encodeURIComponent(idea)}${
    lastMinuteGift ? `&rh=${EAmazonTags.GET_IT_BY_TOMORROW}` : ""
  }&low-price=&high-price=${budget}&tag=${EAmazonTags.AFFILIATE}`;

  // Redirect to the Amazon search URL
  window.open(amazonUrl, "_blank");
};
